import { expect, test } from "@playwright/test";

const PAGES = [
  ["/services/automated-testing/", "en", "Automated Testing for release confidence"],
  ["/services/performance-audit/", "en", "Performance Audit for predictable speed"],
  ["/services/security-review/", "en", "Security Review for high-visibility releases"],
  ["/services/code-quality/", "en", "Code Quality that prevents regressions"],
  ["/es/services/automated-testing/", "es", "Testing Automatizado para confianza en releases"],
  ["/es/services/performance-audit/", "es", "Auditoría de Performance para velocidad predecible"],
  ["/es/services/security-review/", "es", "Revisión de Seguridad para releases de alta visibilidad"],
  ["/es/services/code-quality/", "es", "Calidad de Código que previene regresiones"],
] as const;

for (const [path, lang, title] of PAGES) {
  test(`${path} renders its service page`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(title);
    await expect(page.getByTestId("service-faq").locator("details")).toHaveCount(8);
  });
}

test("how it works opens with the keyboard", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Safari tabs only between form fields unless Option+Tab is used");
  await page.goto("/services/performance-audit/");
  const first = page.getByTestId("service-how").locator("details").nth(1);
  await first.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("open", "");
});

test("tools are presented as examples", async ({ page }) => {
  await page.goto("/services/automated-testing/");
  await expect(page.getByRole("heading", { name: "Tools we often use (examples)" })).toBeVisible();
});
