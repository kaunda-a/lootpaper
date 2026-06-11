import { test, expect } from "@playwright/test";

test.describe("Password Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/password-generator", { waitUntil: "load" });
  });

  test("generates a password on load", async ({ page }) => {
    const output = page.locator("#password-output");
    await expect(output).not.toHaveValue("");
  });

  test("generates a new password on button click", async ({ page }) => {
    const output = page.locator("#password-output");
    const first = await output.inputValue();
    await page.locator("#generate-btn").click();
    await expect(output).not.toHaveValue("");
    const second = await output.inputValue();
    expect(first).not.toBe(second);
  });

  test("toggling symbols includes them in password", async ({ page }) => {
    await page.locator("#chk-symbols").check();
    await page.locator("#generate-btn").click();
    const password = await page.locator("#password-output").inputValue();
    expect(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)).toBe(true);
  });

  test("unchecking all sets does nothing (silent return)", async ({ page }) => {
    await page.locator("#chk-upper").uncheck();
    await page.locator("#chk-lower").uncheck();
    await page.locator("#chk-digits").uncheck();
    const before = await page.locator("#password-output").inputValue();
    await page.locator("#generate-btn").click();
    const after = await page.locator("#password-output").inputValue();
    expect(after).toBe(before);
  });

  test("changing length produces longer password", async ({ page }) => {
    await page.locator("#length-input").fill("32");
    await page.locator("#generate-btn").click();
    const pw = await page.locator("#password-output").inputValue();
    expect(pw.length).toBeGreaterThanOrEqual(24);
  });
});

test.describe("UUID Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/uuid-generator", { waitUntil: "load" });
  });

  test("generates UUID v4 on load", async ({ page }) => {
    const val = await page.locator("#uuid-output").inputValue();
    expect(val).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  test("generates a new UUID on click", async ({ page }) => {
    const output = page.locator("#uuid-output");
    const first = await output.inputValue();
    await page.locator("#generate-btn").click();
    const second = await output.inputValue();
    expect(first).not.toBe(second);
    expect(second).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    );
  });

  test("session counter increments", async ({ page }) => {
    await expect(page.locator("#count")).toBeVisible();
    await page.locator("#generate-btn").click();
    await expect(page.locator("#count")).toContainText("2");
  });
});

test.describe("Hash Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hash-generator", { waitUntil: "load" });
  });

  test("generates MD5 hash", async ({ page }) => {
    await page.locator("#input-text").fill("hello");
    await page.locator("#hash-btn").click();
    await expect(page.locator("#output")).toHaveValue("5d41402abc4b2a76b9719d911017c592");
  });

  test("generates SHA-256 hash", async ({ page }) => {
    await page.locator("#input-text").fill("hello");
    await page.locator("#algo-select").selectOption("SHA-256");
    await page.locator("#hash-btn").click();
    await expect(page.locator("#output")).toHaveValue(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    );
  });

  test("generates SHA-512 hash", async ({ page }) => {
    await page.locator("#input-text").fill("hello");
    await page.locator("#algo-select").selectOption("SHA-512");
    await page.locator("#hash-btn").click();
    await expect(page.locator("#output")).toHaveValue(
      "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043"
    );
  });
});

test.describe("Word Counter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/word-counter", { waitUntil: "load" });
  });

  test("updates stats as user types", async ({ page }) => {
    const textarea = page.locator("#text-input");
    await textarea.fill("Hello world. This is a test sentence!");
    await expect(page.locator("#words")).toHaveText("7");
    await expect(page.locator("#chars")).toHaveText("37");
    await expect(page.locator("#sentences")).toHaveText("2");
  });
});

test.describe("JSON Formatter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/json-formatter", { waitUntil: "load" });
  });

  test("formats JSON", async ({ page }) => {
    await page.locator("#json-input").fill('{"name":"test","value":123}');
    await page.locator("#format-btn").click();
    const output = await page.locator("#json-output").inputValue();
    expect(output).toContain('"name"');
    expect(output).toContain('"test"');
  });

  test("minifies JSON", async ({ page }) => {
    await page.locator("#json-input").fill('{\n  "name": "test",\n  "value": 123\n}');
    await page.locator("#minify-btn").click();
    await expect(page.locator("#json-output")).toHaveValue('{"name":"test","value":123}');
  });

  test("validates correct JSON", async ({ page }) => {
    await page.locator("#json-input").fill('{"key":"value"}');
    await page.locator("#validate-btn").click();
    await expect(page.locator("#error")).toContainText("Valid JSON");
  });

  test("shows error for invalid JSON", async ({ page }) => {
    await page.locator("#json-input").fill("{invalid}");
    await page.locator("#validate-btn").click();
    await expect(page.locator("#error")).toContainText("Invalid");
  });
});

test.describe("Base64 Encoder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/base64-encoder", { waitUntil: "load" });
  });

  test("encodes text to base64", async ({ page }) => {
    await page.locator("#input-text").fill("hello");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output-text")).toHaveValue("aGVsbG8=");
  });

  test("decodes base64 to text", async ({ page }) => {
    await page.locator("#mode-select").selectOption("decode");
    await page.locator("#input-text").fill("aGVsbG8=");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output-text")).toHaveValue("hello");
  });
});

test.describe("URL Encoder", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/url-encoder", { waitUntil: "load" });
  });

  test("encodes URL", async ({ page }) => {
    await page.locator("#mode-select").selectOption("encode");
    await page.locator("#input-text").fill("hello world");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output-text")).toHaveValue("hello%20world");
  });

  test("decodes URL", async ({ page }) => {
    await page.locator("#mode-select").selectOption("decode");
    await page.locator("#input-text").fill("hello%20world");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output-text")).toHaveValue("hello world");
  });
});

test.describe("Case Converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/case-converter", { waitUntil: "load" });
  });

  test("converts to uppercase", async ({ page }) => {
    await page.locator("#input-text").fill("Hello World");
    await page.locator("#case-select").selectOption("upper");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output-text")).toHaveValue("HELLO WORLD");
  });

  test("converts to camelCase", async ({ page }) => {
    await page.locator("#input-text").fill("hello world");
    await page.locator("#case-select").selectOption("camel");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output-text")).toHaveValue("helloWorld");
  });

  test("converts to snake_case", async ({ page }) => {
    await page.locator("#input-text").fill("Hello World");
    await page.locator("#case-select").selectOption("snake");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output-text")).toHaveValue("hello_world");
  });
});

test.describe("Color Converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/color-converter", { waitUntil: "load" });
  });

  test("converts HEX to RGB and HSL", async ({ page }) => {
    await page.locator("#color-input").fill("#D76D77");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#hex-val")).toHaveValue("#D76D77");
    await expect(page.locator("#rgb-val")).toHaveValue("rgb(215, 109, 119)");
    await expect(page.locator("#hsl-val")).toHaveValue("hsl(354, 57%, 64%)");
  });

  test("converts RGB to HEX", async ({ page }) => {
    await page.locator("#color-input").fill("rgb(215, 109, 119)");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#hex-val")).toHaveValue("#D76D77");
  });
});

test.describe("Email Validator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/email-validator", { waitUntil: "load" });
  });

  test("validates a valid email", async ({ page }) => {
    await page.locator("#email-input").fill("user@example.com");
    await page.locator("#validate-btn").click();
    await expect(page.locator("#status-text")).toContainText("valid");
  });

  test("shows invalid for bad email", async ({ page }) => {
    await page.locator("#email-input").fill("not-an-email");
    await page.locator("#validate-btn").click();
    await expect(page.locator("#status-text")).toContainText("invalid");
  });
});

test.describe("Number Base Converter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/number-base", { waitUntil: "load" });
  });

  test("converts decimal to hex", async ({ page }) => {
    await page.locator("#num-input").fill("42");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output")).toHaveValue("2A");
  });

  test("converts decimal to binary", async ({ page }) => {
    await page.locator("#from-base").selectOption("10");
    await page.locator("#to-base").selectOption("2");
    await page.locator("#num-input").fill("42");
    await page.locator("#convert-btn").click();
    await expect(page.locator("#output")).toHaveValue("101010");
  });
});

test.describe("QR Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/qr-generator", { waitUntil: "load" });
  });

  test("generates a QR code image", async ({ page }) => {
    await page.locator("#qr-input").fill("https://lootpaper.com");
    await page.locator("#generate-btn").click();
    await expect(page.locator("#result")).toBeVisible({ timeout: 5000 });
    const src = await page.locator("#qr-image").getAttribute("src");
    expect(src).toContain("lootpaper.com");
  });
});

test.describe("Lorem Ipsum Generator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lorem-ipsum", { waitUntil: "load" });
  });

  test("generates paragraphs by default", async ({ page }) => {
    await page.locator("#generate-btn").click();
    const output = await page.locator("#output").inputValue();
    expect(output.length).toBeGreaterThan(0);
    expect(output.toLowerCase()).toContain("lorem");
  });
});
