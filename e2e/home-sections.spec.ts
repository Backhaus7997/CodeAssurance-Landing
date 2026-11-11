import { expect, test } from "@playwright/test";

// Only Quality Squad is offered as a plan (user decision, 2026-11-11); everything else is quoted after an assessment.
const TIERS = ["Part-time", "Full-time"];
const RETIRED = ["Quality Check", "Quality Booster", "Kickstart Basic", "Premium"];
const SLUGS = ["performance-audit", "security-review", "code-quality", "automated-testing"];

test.describe("process, plans, audits and team", () => {
  test("the process has four steps, each with three deliverables", async ({ page }) => {
    await page.goto("/");
    const steps = page.locator("#process").getByTestId("process-step");
    await expect(steps).toHaveCount(4);
    for (const step of await steps.all()) {
      await expect(step.locator("li")).toHaveCount(3);
    }
  });

  test("every plan tier is visible at once, without tabs", async ({ page }) => {
    await page.goto("/");
    const plans = page.locator("#plans");
    await expect(plans.getByRole("tab")).toHaveCount(0);
    for (const tier of TIERS) {
      await expect(plans.getByText(tier, { exact: true })).toBeVisible();
    }
    for (const name of RETIRED) await expect(plans.getByText(name, { exact: true })).toHaveCount(0);
  });

  test("each audit links to its service page in English", async ({ page }) => {
    await page.goto("/");
    for (const slug of SLUGS) {
      await expect(page.locator(`#audits a[href="/services/${slug}/"]`)).toHaveCount(1);
    }
  });

  test("each audit links to its service page in Spanish", async ({ page }) => {
    await page.goto("/es/");
    for (const slug of SLUGS) {
      await expect(page.locator(`#audits a[href="/es/services/${slug}/"]`)).toHaveCount(1);
    }
  });

  test("the team section names the track record", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#team")).toContainText("Disney, FIFA, PayPal, Royal Caribbean, Deloitte, Globant and Numerade");
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the team statement and the process steps are fully visible", async ({ page }) => {
    await page.goto("/");
    const statement = page.getByTestId("team-statement");
    await expect(statement).toContainText("A QA engineer with 8+ years of experience");
    expect(await statement.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
    const steps = page.locator("#process").getByTestId("process-step");
    const opacities = await steps.evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
    expect(opacities).toEqual(["1", "1", "1", "1"]);
  });
});
