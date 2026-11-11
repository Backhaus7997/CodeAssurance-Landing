import { expect, test } from "@playwright/test";

// The inner pages share the home's design (spec 2026-11-11-inner-pages-design.md).
const HEROES = [
  ["/services/automated-testing/", "Test automation services"],
  ["/es/services/code-quality/", "Servicios de revisión de calidad de código"],
  ["/services/mobile-app-testing/", "Mobile app testing services for Android and iOS"],
  ["/services/", "QA services"],
  ["/pricing/", "How pricing works"],
  ["/guides/", "QA guides"],
  ["/guides/how-to-hire-a-qa-company/", "How to hire a QA company: a buyer's checklist"],
  ["/privacy/", "Privacy policy"],
] as const;

for (const [path, h1] of HEROES) {
  test(`${path} opens with the home hero`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main [data-hero-grid]")).toHaveCount(1);
    const heading = page.locator("h1");
    await expect(heading).toHaveCount(1);
    await expect(heading).toHaveText(h1);
    await expect(heading.locator("span.text-mint")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
}
