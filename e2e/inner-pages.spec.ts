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

for (const [path, sections] of [
  ["/services/automated-testing/", 6],
  ["/es/services/automated-testing/", 5],
] as const) {
  test(`${path} numbers its sections like the home`, async ({ page }) => {
    await page.goto(path);
    const labels = await page.locator("main [data-section-index]").evaluateAll((els) => els.map((el) => el.getAttribute("data-section-index")));
    expect(labels).toEqual(Array.from({ length: sections }, (_, i) => String(i + 1).padStart(2, "0")));
    await expect(page.locator("[data-steps] [data-step]")).toHaveCount(4);
    await expect(page.locator("[data-marquee]")).toHaveCount(1);
    expect(await page.locator("[data-glow-card]").count()).toBeGreaterThanOrEqual(3);
  });
}

const VISUALS = [
  ["/services/automated-testing/", "run"],
  ["/services/performance-audit/", "audit"],
  ["/services/security-review/", "audit"],
  ["/services/code-quality/", "audit"],
  ["/services/manual-qa-testing/", "checklist"],
  ["/services/dedicated-qa-engineers/", "sprint"],
  ["/services/ai-qa-agent/", "pr"],
  ["/services/mobile-app-testing/", "phone"],
  ["/services/api-testing/", "api"],
  ["/es/services/automated-testing/", "run"],
  ["/es/services/code-quality/", "audit"],
] as const;

for (const [path, kind] of VISUALS) {
  test(`${path} shows its ${kind} visual in the hero`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator(`main section:first-of-type [data-visual="${kind}"]`)).toHaveCount(1);
  });
}

for (const path of ["/services/manual-qa-testing/", "/services/dedicated-qa-engineers/", "/services/mobile-app-testing/", "/services/api-testing/"]) {
  test(`${path} animates its visual`, async ({ page }) => {
    await page.goto(path);
    const visual = page.locator("[data-visual]");
    await visual.scrollIntoViewIfNeeded(); // visuals pause off screen, which on phones is below the hero text
    await page.waitForTimeout(300);
    const first = await visual.getAttribute("data-step");
    // A loop holds its last step for a pause, so wait up to one full cycle for the next step.
    await expect.poll(() => visual.getAttribute("data-step"), { timeout: 5000 }).not.toBe(first);
  });
}
