import { expect, test } from "@playwright/test";

test.describe("hero and coverage map", () => {
  for (const [path, sentence] of [
    ["/", "QA built around your product, not a template"],
    ["/es/", "QA a medida de tu producto, no de una plantilla"],
  ]) {
    test(`the exported h1 of ${path} says the sentence once`, async ({ request }) => {
      const html = await (await request.get(path)).text();
      const inner = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";
      const text = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").replace(/\s+,/g, ",").trim();
      expect(text).toBe(sentence);
    });
  }

  test("states the offer with 'product' as the accessible word", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /QA built around your\s*product\s*, not a template/ })).toBeVisible();
  });

  test("shows the refunds finding by default", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("map-detail")).toContainText("A partial refund leaves the order total unchanged");
  });

  test("selecting a module shows what the agent found", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /auth\/password-reset/ }).click();
    await expect(page.getByTestId("map-detail")).toContainText("7 added");
    await expect(page.getByRole("button", { name: /auth\/password-reset/ })).toHaveAttribute("aria-pressed", "true");
  });

  test("modules work with the keyboard and show focus", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "Safari tabs only between form fields unless Option+Tab is used");
    await page.goto("/");
    await page.getByRole("button", { name: /checkout\/cart/ }).focus();
    await page.keyboard.press("Tab");
    const payment = page.getByRole("button", { name: /checkout\/payment/ });
    await expect(payment).toBeFocused();
    expect(await payment.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("map-detail")).toContainText("awaiting your approval");
  });

  test("the Spanish home maps the same modules", async ({ page }) => {
    await page.goto("/es/");
    await expect(page.getByRole("heading", { level: 1, name: /QA a medida de tu\s*producto\s*, no de una plantilla/ })).toBeVisible();
    await expect(page.getByTestId("map-detail")).toContainText("reembolso parcial");
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the hero and real map numbers are visible", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    expect(await h1.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
    const login = page.getByRole("button", { name: /auth\/login/ });
    await expect(login).toContainText("18");
    expect(await login.locator("[data-ticker]").evaluate((el) => getComputedStyle(el).visibility)).toBe("visible");
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nothing animates and the grid draws one still frame", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
    await expect(page.locator('canvas[data-animating="false"]')).toHaveCount(1);
  });

  test("the headline stays on 'product'", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3000);
    const word = page.getByTestId("hero-rotating");
    await expect(word).toHaveAttribute("data-word", "product,");
    expect((await word.boundingBox())?.width ?? 0).toBeGreaterThan(0);
  });
});
