import { test, expect } from "@playwright/test";

test.describe("All pages load successfully", () => {
  const PAGES: { path: string; title: string }[] = [
    { path: "/", title: "Lootpaper — Free Marketing Tools, Daily Deals & Resources" },
    { path: "/tools", title: "Free Marketing Tools — Lootpaper" },
    { path: "/seo", title: "GitHub Repo SEO Analyzer — Lootpaper" },
    { path: "/github-profile", title: "GitHub Profile Analyzer — Lootpaper" },
    { path: "/compare-repos", title: "GitHub Repo Compare — Lootpaper" },
    { path: "/currency-converter", title: "Currency Converter — Lootpaper" },
    { path: "/favicon-finder", title: "Favicon Finder — Lootpaper" },
    { path: "/url-shortener", title: "URL Shortener — Lootpaper" },
    { path: "/color-converter", title: "Color Converter — Lootpaper" },
    { path: "/email-validator", title: "Email Validator — Lootpaper" },
    { path: "/password-generator", title: "Password Generator — Lootpaper" },
    { path: "/uuid-generator", title: "UUID Generator — Lootpaper" },
    { path: "/word-counter", title: "Word Counter — Lootpaper" },
    { path: "/json-formatter", title: "JSON Formatter — Lootpaper" },
    { path: "/base64-encoder", title: "Base64 Encoder / Decoder — Lootpaper" },
    { path: "/url-encoder", title: "URL Encoder / Decoder — Lootpaper" },
    { path: "/case-converter", title: "Case Converter — Lootpaper" },
    { path: "/qr-generator", title: "QR Code Generator — Lootpaper" },
    { path: "/ip-lookup", title: "IP Address Lookup — Lootpaper" },
    { path: "/lorem-ipsum", title: "Lorem Ipsum Generator — Lootpaper" },
    { path: "/hash-generator", title: "Hash Generator — Lootpaper" },
    { path: "/number-base", title: "Number Base Converter — Lootpaper" },
    { path: "/about", title: "About — Lootpaper" },
    { path: "/contact", title: "Contact — Lootpaper" },
    { path: "/deals", title: "Best Marketing Tool Deals — Lootpaper" },
    { path: "/blog", title: "Blog — Lootpaper" },
  ];

  for (const { path, title } of PAGES) {
    test(`${path} loads with correct title`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "load" });
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
    });
  }
});

test.describe("Page content checks", () => {
  test("landing page has hero section", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await expect(page.locator("h1")).toContainText("best deals");
    await expect(page.locator('a[href="/seo"]').first()).toBeVisible();
  });

  test("tools page lists tool cards", async ({ page }) => {
    await page.goto("/tools", { waitUntil: "load" });
    await expect(page.locator("h1")).toContainText("Tools");
    const cards = page.locator("a[href*='/']").filter({ has: page.locator("h3") });
    expect(await cards.count()).toBeGreaterThanOrEqual(15);
  });

  test("blog index shows post list", async ({ page }) => {
    await page.goto("/blog", { waitUntil: "load" });
    await expect(page.locator("h1")).toContainText("Guides");
  });

  test("blog posts load and have content", async ({ page }) => {
    const slugs = [
      "marketing-on-a-shoestring-budget",
      "improve-github-repo-seo",
      "why-open-source-projects-need-seo",
    ];
    for (const slug of slugs) {
      const response = await page.goto(`/blog/${slug}`, { waitUntil: "load" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
    }
  });

  test("contact page has form elements", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "load" });
    await expect(page.locator("h1")).toContainText("Get in Touch");
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#subject")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();
  });

  test("404 page returns 404", async ({ page }) => {
    const response = await page.goto("/nonexistent-page", { waitUntil: "load" });
    expect(response?.status()).toBe(404);
  });
});
