import { test, expect } from "@playwright/test";

test.describe("Currency Converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/currency-converter", { waitUntil: "load" });
  });

  test("page loads with converter elements", async ({ page }) => {
    await expect(page.locator("#amount")).toBeVisible();
    await expect(page.locator("#convert-btn")).toBeVisible();
  });
});

test.describe("IP Lookup", () => {
  test("page loads with lookup button", async ({ page }) => {
    await page.goto("/ip-lookup", { waitUntil: "load" });
    await expect(page.locator("#lookup-btn")).toBeVisible();
  });
});

test.describe("Favicon Finder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/favicon-finder", { waitUntil: "load" });
  });

  test("page loads with finder elements", async ({ page }) => {
    await expect(page.locator("#domain-input")).toBeVisible();
    await expect(page.locator("#fetch-btn")).toBeVisible();
  });
});

test.describe("URL Shortener", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/url-shortener", { waitUntil: "load" });
  });

  test("page loads with shorten elements", async ({ page }) => {
    await expect(page.locator("#url-input")).toBeVisible();
    await expect(page.locator("#shorten-btn")).toBeVisible();
  });
});
