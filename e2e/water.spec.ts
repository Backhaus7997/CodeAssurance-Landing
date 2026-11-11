import { expect, test } from "@playwright/test";

const PAGES = ["/", "/es/", "/pricing/", "/guides/how-to-hire-a-qa-company/", "/es/services/automated-testing/"];

for (const path of PAGES) {
  test(`${path} has the water background behind everything`, async ({ page }) => {
    await page.goto(path);
    const water = page.locator("canvas[data-water]");
    await expect(water).toHaveCount(1);
    await expect(water).toHaveAttribute("aria-hidden", "true");
    const style = await water.evaluate((el) => {
      const s = getComputedStyle(el);
      return { position: s.position, pointerEvents: s.pointerEvents, zIndex: Number(s.zIndex) };
    });
    expect(style.position).toBe("fixed");
    expect(style.pointerEvents).toBe("none");
    expect(style.zIndex).toBeLessThan(0);
  });
}

test("the water never takes clicks: the hero buttons stay on top", async ({ page }) => {
  await page.goto("/");
  const cta = page.locator("main a").first();
  const box = (await cta.boundingBox())!;
  const topTag = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.tagName, { x: box.x + box.width / 2, y: box.y + box.height / 2 });
  expect(topTag).not.toBe("CANVAS");
});

test("the water stops while the tab is hidden", async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __raf: number };
    w.__raf = 0;
    const original = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => {
      w.__raf++;
      return original(cb);
    };
  });
  // Mid-way through a long guide neither the hero grid nor the footer wordmark is on screen (both pause
  // off screen), so the only loop left is the water's.
  await page.goto("/guides/how-to-improve-qa-in-your-company/");
  await page.locator("#section-5").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
    document.dispatchEvent(new Event("visibilitychange"));
    (window as unknown as { __raf: number }).__raf = 0;
  });
  await page.waitForTimeout(1000);
  expect(await page.evaluate(() => (window as unknown as { __raf: number }).__raf)).toBeLessThan(3);
});

test("the water moves when motion is allowed", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("canvas[data-water]")).toHaveAttribute("data-animating", "true");
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the water draws one still frame", async ({ page }) => {
    await page.goto("/");
    const water = page.locator("canvas[data-water]");
    await expect(water).toHaveAttribute("data-animating", "false");
    await page.waitForTimeout(300);
    const first = await water.evaluate((el: HTMLCanvasElement) => el.toDataURL());
    await page.mouse.move(400, 400, { steps: 8 });
    await page.waitForTimeout(500);
    const second = await water.evaluate((el: HTMLCanvasElement) => el.toDataURL());
    expect(second).toBe(first);
  });
});
