import { expect, test } from "@playwright/test";

const STAGES: [string, string][] = [
  ["scan", "Detects your framework, language and what can be tested."],
  ["map", "Builds a working model of your codebase"],
  ["research", "Checks current docs for your testing stack"],
  ["analyze", "Ranks risk and defines the test inventory"],
  ["plan", "Groups test cases by feature"],
  ["generate", "Writes tests, page objects and fixtures"],
  ["validate", "separates real application bugs from test mistakes"],
  ["deliver", "Opens a draft pull request"],
];
// Only Quality Squad is offered as a plan (user decision, 2026-11-11); everything else is quoted after an assessment.
const TIERS = ["Part-time", "Full-time"];
const RETIRED = ["Quality Check", "Quality Booster", "Kickstart Basic", "Premium"];

test("is a campaign page kept out of search results", async ({ page }) => {
  const res = await page.goto("/how-we-work/");
  expect(res?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("carries the approved one-pager content", async ({ page }) => {
  await page.goto("/how-we-work/");
  await expect(page.locator("h1")).toHaveText("QA built around your product, not a template");
  await expect(page.getByText("Nothing is merged until your team approves it.")).toBeVisible();
  const stages = page.getByTestId("stage");
  await expect(stages).toHaveCount(8);
  for (const [name, description] of STAGES) {
    await expect(stages.filter({ has: page.getByText(name, { exact: true }) })).toContainText(description);
  }
  for (const extra of ["From ticket to tests", "Broken locators, fixed with approval", "Audits with a score"]) {
    await expect(page.getByRole("heading", { name: extra })).toBeVisible();
  }
  for (const tier of TIERS) {
    await expect(page.locator("#plans").getByText(tier, { exact: true })).toBeVisible();
  }
  for (const name of RETIRED) await expect(page.locator("#plans").getByText(name, { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Month-to-month, no long contract" })).toBeVisible();
  await expect(page.locator('a[href="mailto:martin.backhaus@code-assurance.com"]').first()).toBeVisible();
});

test("the language switch leads to the Spanish home", async ({ page }) => {
  await page.goto("/how-we-work/");
  await expect(page.locator("header").getByRole("link", { name: "Ver en español" })).toHaveAttribute("href", "/es/");
});

for (const width of [375, 1280]) {
  test(`has no horizontal scroll at ${width}px, even after scrolling`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/how-we-work/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });
}
