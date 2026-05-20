import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("has DJ Tools heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /DJ Tools/i })).toBeVisible();
  });

  test("has navigation links to tutorials and products", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /Start Learning/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Browse Products/i })).toBeVisible();
  });

  test("displays feature cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Premium Equipment")).toBeVisible();
    await expect(page.getByText("Learning Center")).toBeVisible();
    await expect(page.getByText("AI Recommendations")).toBeVisible();
  });
});
