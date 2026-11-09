import { expect, test } from "@playwright/test";

const STAGES = ["scan", "map", "research", "analyze", "plan", "generate", "validate", "deliver"];

test.describe("agent section", () => {
  test("shows the eight stages of the run and the review hand-off", async ({ page }) => {
    await page.goto("/");
    const agent = page.locator("#agent");
    await agent.scrollIntoViewIfNeeded();
    for (const stage of STAGES) {
      await expect(agent.getByTestId("run-line").filter({ has: page.getByText(stage, { exact: true }) })).toHaveCount(1);
    }
    await expect(agent.getByText("waiting for your review").first()).toBeVisible();
  });

  test("approving the locator fix applies it, and undo restores it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Approve fix" }).click();
    await expect(page.getByText("Applied in the draft PR. Re-run passed.")).toBeVisible();
    await page.getByRole("button", { name: "Undo" }).click();
    await expect(page.getByRole("button", { name: "Approve fix" })).toBeVisible();
  });

  test("the fix can be approved with the keyboard", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "Safari tabs only between form fields unless Option+Tab is used");
    await page.goto("/");
    await page.getByRole("button", { name: "Approve fix" }).focus();
    await page.keyboard.press("Space");
    await expect(page.getByText("Applied in the draft PR. Re-run passed.")).toBeVisible();
  });

  test("the diff shows the proposed locator", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("locator-diff")).toContainText("getByRole('button', { name: 'Place order' })");
  });

  test("on a phone the diff scrolls inside its box, not the page", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const diff = page.getByTestId("locator-diff");
    expect(await diff.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });

  test("the Spanish home has the same run and demo", async ({ page }) => {
    await page.goto("/es/");
    await expect(page.locator("#agent").getByTestId("run-line")).toHaveCount(STAGES.length + 1);
    await expect(page.getByRole("button", { name: "Aprobar arreglo" })).toBeVisible();
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every terminal line is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("run qa agent · acme/web")).toBeVisible();
    const lines = page.locator("#agent").getByTestId("run-line");
    await expect(lines).toHaveCount(STAGES.length + 1);
    const opacities = await lines.evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
    expect(opacities.every((o) => o === "1")).toBe(true);
  });
});
