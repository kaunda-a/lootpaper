import { test, expect } from "@playwright/test";

test.describe("GitHub SEO Analyzer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/seo", { waitUntil: "load" });
  });

  test("analyzes a valid GitHub repo", async ({ page }) => {
    await page.locator("#repo-input").fill("https://github.com/kaunda-a/lootpaper");
    await page.locator("#analyze-btn").click();
    await expect(page.locator("#results")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#score-value")).toBeVisible();
  });

  test("shows error for invalid repo", async ({ page }) => {
    await page
      .locator("#repo-input")
      .fill("https://github.com/nonexistent-user-12345/nonexistent-repo-67890");
    await page.locator("#analyze-btn").click();
    await expect(page.locator("#error")).toBeVisible({ timeout: 15000 });
  });
});

test.describe("GitHub Profile Analyzer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/github-profile", { waitUntil: "load" });
  });

  test("looks up a GitHub user", async ({ page }) => {
    await page.locator("#username-input").fill("kaunda-a");
    await page.locator("#profile-btn").click();
    await expect(page.locator("#result")).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#name")).toBeVisible();
  });
});

test.describe("GitHub Repo Compare", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/compare-repos", { waitUntil: "load" });
  });

  test("compares two repos", async ({ page }) => {
    await page.locator("#repo1-input").fill("kaunda-a/lootpaper");
    await page.locator("#repo2-input").fill("facebook/react");
    await page.locator("#compare-btn").click();
    await expect(page.locator("#result")).toBeVisible({ timeout: 15000 });
  });
});
