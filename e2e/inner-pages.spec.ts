import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { expect, test } from "@playwright/test";
import { indexablePages } from "../lib/routes";

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

test("/pricing/ animates how a quote comes together", async ({ page }) => {
  await page.goto("/pricing/");
  await expect(page.locator("[data-steps] [data-step]")).toHaveCount(4);
  await expect(page.locator('[data-section-index="01"]')).toContainText("How it works");
});

for (const [path, items] of [
  ["/services/", 9],
  ["/guides/", 4],
] as const) {
  test(`${path} shows numbered cards that glow`, async ({ page }) => {
    await page.goto(path);
    const cards = page.getByTestId("hub-list").locator("[data-glow-card]");
    await expect(cards).toHaveCount(items);
    await expect(cards.first()).toContainText("01");
  });
}

test("a guide shows reading progress and a table of contents that follows the reader", async ({ page, isMobile }) => {
  test.skip(isMobile, "the table of contents is a desktop feature; the phone test is below");
  await page.goto("/guides/how-to-hire-a-qa-company/");
  const toc = page.getByRole("navigation", { name: "On this page" });
  const sections = await page.locator('[id^="section-"]').count();
  expect(sections).toBeGreaterThan(3);
  await expect(toc.locator("a")).toHaveCount(sections);
  await expect(page.getByTestId("short-answer")).toBeVisible();
  await page.locator("#section-3").scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 120);
  await expect(toc.locator('a[aria-current="true"]')).toHaveAttribute("href", "#section-3");
  const scale = await page.locator("[data-reading-progress]").evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
  expect(scale).toBeGreaterThan(0);
});

test("on a phone the guide hides the table of contents", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/guides/qa-outsourcing-cost/");
  await expect(page.getByRole("navigation", { name: "On this page" })).toBeHidden();
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  for (const path of ["/services/manual-qa-testing/", "/guides/how-to-hire-a-qa-company/"]) {
    test(`${path} stays still and shows everything`, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(1500);
      expect(await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length)).toBe(0);
      const visual = page.locator("[data-visual]");
      if (await visual.count()) await expect(visual).toContainText(/\w/);
    });
  }
});

// Spec criterion 9: no inner page loads more JavaScript up front than the home.
const OUT = join(__dirname, "..", "out");
function firstLoadJs(path: string): number {
  const html = readFileSync(join(OUT, path, "index.html"), "utf8");
  const sources = [...new Set([...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]))];
  return sources.reduce((sum, src) => sum + gzipSync(readFileSync(join(OUT, src.split("?")[0]))).length, 0);
}

test("no inner page loads more JavaScript than the home", () => {
  const home = firstLoadJs("/");
  const heavier = indexablePages()
    .filter((p) => p.section !== "home")
    .map((p) => ({ path: p.path, bytes: firstLoadJs(p.path) }))
    .filter((p) => p.bytes > home);
  expect(heavier).toEqual([]);
});
