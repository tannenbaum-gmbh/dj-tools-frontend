# Playwright E2E Tests — Azure Playwright Workspaces Setup

This guide explains how to configure the end-to-end test infrastructure so that Playwright tests run on [Microsoft Azure Playwright Workspaces](https://learn.microsoft.com/en-us/azure/playwright-testing/overview-what-is-microsoft-playwright-testing) via the CI workflow in `.github/workflows/playwright-azure.yml`.

---

## How it works

| Component | Role |
|-----------|------|
| `playwright.config.ts` | Base Playwright config: Chromium / Firefox / WebKit, test directory, base URL |
| `playwright.service.config.ts` | Extends the base config; routes browser execution to the Azure Playwright Workspaces fleet |
| `tests/home.spec.ts` | Example specs (extend with your own tests) |
| `.github/workflows/playwright-azure.yml` | CI workflow — authenticates to Azure with OIDC and runs tests on every push / PR / manual dispatch |

The CI workflow uses **Workload Identity Federation** (OIDC) so no client secret ever needs to be stored in GitHub Secrets. GitHub issues a short-lived OIDC token; the `azure/login@v2` action exchanges it for an Azure access token, which `DefaultAzureCredential` inside `playwright.service.config.ts` picks up automatically.

---

## Prerequisites

- Node.js 20+
- An Azure subscription
- Permission to create App Registrations in Azure AD

---

## Step 1 — Create an Azure Playwright Workspaces instance

1. In the [Azure Portal](https://portal.azure.com), search for **Playwright Testing** and create a new workspace.
2. Copy the **endpoint URL** — it looks like:
   ```
   wss://<region>.api.playwright.microsoft.com/playwrightworkspaces/<workspace-id>/browsers
   ```
   This value becomes the `PLAYWRIGHT_SERVICE_URL` GitHub secret.

---

## Step 2 — Create an App Registration with Workload Identity Federation

1. In Azure AD (Entra ID), go to **App registrations → New registration**.  
   Name it something like `dj-tools-playwright-ci`.
2. After creation, note the **Application (client) ID** and **Directory (tenant) ID**.
3. Navigate to **Certificates & secrets → Federated credentials → Add credential**.
4. Select **GitHub Actions deploying Azure resources** and fill in:

   | Field | Value |
   |-------|-------|
   | Organisation | `tannenbaum-gmbh` |
   | Repository | `dj-tools-frontend` |
   | Entity type | **Branch** |
   | Branch | `main` |

   This creates a federated credential with:
   - Issuer: `https://token.actions.githubusercontent.com`
   - Subject: `repo:tannenbaum-gmbh/dj-tools-frontend:ref:refs/heads/main`

   > **Tip:** Repeat this step for other branches (e.g. `feature/*`) if you want OIDC authentication on those branches too.

5. Grant the App Registration the **Playwright Testing Contributor** role on the Playwright Workspace resource (or at the resource group / subscription level).

---

## Step 3 — Add GitHub Secrets

Go to the repository **Settings → Secrets and variables → Actions** and add the following secrets:

| Secret name | Where to find the value |
|-------------|------------------------|
| `AZURE_CLIENT_ID` | App Registration → Overview → Application (client) ID |
| `AZURE_TENANT_ID` | App Registration → Overview → Directory (tenant) ID |
| `AZURE_SUBSCRIPTION_ID` | Azure Portal → Subscriptions |
| `PLAYWRIGHT_SERVICE_URL` | Playwright Workspaces → Overview → WSS endpoint (see Step 1) |
| `PLAYWRIGHT_BASE_URL` | URL of the deployed app under test, e.g. `https://staging.example.com` |

---

## Step 4 — Running tests locally

Install dependencies:

```bash
npm ci
npx playwright install --with-deps
```

Run against a local dev server (default `http://localhost:3000`):

```bash
# Start the dev server in one terminal
npm run dev

# Run tests in another terminal
npx playwright test
```

Run against a specific URL:

```bash
PLAYWRIGHT_BASE_URL=https://staging.example.com npx playwright test
```

Run on Azure Playwright Workspaces from your local machine (requires `az login` first):

```bash
az login
PLAYWRIGHT_SERVICE_URL=<wss-endpoint> \
PLAYWRIGHT_BASE_URL=<app-url> \
npx playwright test --config=playwright.service.config.ts
```

---

## Step 5 — CI triggers

The workflow (`.github/workflows/playwright-azure.yml`) runs automatically on:

| Event | Condition |
|-------|-----------|
| `push` | `main` branch or any `category/name` feature branch (`*/*`) |
| `pull_request` | PRs targeting `main` |
| `workflow_dispatch` | Manual trigger via the GitHub Actions UI (useful for demos) |

---

## Viewing test results

After each CI run, the HTML report is uploaded as a workflow artifact named **`playwright-report`** (retained for 30 days).

To download:
1. Open the GitHub Actions run.
2. Scroll to **Artifacts** at the bottom.
3. Download `playwright-report` and open `index.html` in a browser.
