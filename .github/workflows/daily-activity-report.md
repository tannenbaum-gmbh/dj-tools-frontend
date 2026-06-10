---
emoji: 📊
description: Daily report on recent repository activity, delivered as a GitHub issue.
on:
  schedule: daily around 07:00
  skip-if-match: 'is:issue is:open in:title "[daily-activity-report] "'
permissions:
  contents: read
  issues: read
  pull-requests: read
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  create-issue:
    title-prefix: "[daily-activity-report] "
    labels: [activity-report]
    close-older-issues: true
    expires: 7
---

# Daily Activity Report

## Task

Generate a concise daily activity report for this repository covering the last 24 hours.

Use `gh` commands to gather the following data:

1. **Recently merged pull requests** – list PRs merged in the last 24 hours (number, title, author, merged-at).
2. **Newly opened issues** – list issues opened in the last 24 hours (number, title, author, created-at).
3. **Closed issues** – list issues closed in the last 24 hours (number, title, closed-at).
4. **Recent commits on the default branch** – list commits pushed in the last 24 hours (sha short, message, author).
5. **Open pull requests** – current count of open PRs.
6. **Open issues** – current count of open issues.

Format the report in GitHub-flavored markdown:

- Use `### <Section Title>` for each section heading.
- Use a markdown table or bulleted list for items.
- If a section has no items, write "No activity in the last 24 hours."
- Keep the body between 20 and 2000 characters.
- Do not include any personally identifiable information beyond GitHub usernames.

## Safe Outputs

- Use `create-issue` to publish the report as a GitHub issue.
- Use `noop` with the explanation "No notable activity in the last 24 hours" if all sections are empty.
