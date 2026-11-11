import { expect, test, type Page } from "@playwright/test";

// Only the JavaScript chunks: blocking the CSS too would hide the problem (no styles, nothing hidden).
const JS_CHUNKS = (url: URL) => url.pathname.startsWith("/_next/static/chunks/") && url.pathname.endsWith(".js");

async function effectiveOpacities(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((els) =>
    els.map((el) => {
      let node: Element | null = el;
      let opacity = 1;
      while (node) {
        opacity *= Number(getComputedStyle(node).opacity);
        node = node.parentElement;
      }
      return opacity;
    }),
  );
}

async function expectContentVisible(page: Page) {
  const headings = await effectiveOpacities(page, "main h2");
  expect(headings.length).toBeGreaterThan(4);
  expect(headings.every((o) => o > 0.99), headings.join(",")).toBe(true);
  const steps = await effectiveOpacities(page, "#start li");
  expect(steps.every((o) => o > 0.99), steps.join(",")).toBe(true);
  const ticker = page.getByRole("button", { name: /auth\/login/ }).locator("[data-ticker]");
  expect(await ticker.evaluate((el) => getComputedStyle(el).visibility)).toBe("visible");
}

test.describe("when JavaScript is slow or fails", () => {
  test("content shows within a few seconds while scripts are still loading", async ({ page }) => {
    await page.route(JS_CHUNKS, async (route) => {
      await new Promise((r) => setTimeout(r, 8000));
      await route.continue().catch(() => {});
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    await expectContentVisible(page);
  });

  test("content shows when the scripts never load", async ({ page }) => {
    await page.route(JS_CHUNKS, (route) => route.abort());
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3500);
    await expectContentVisible(page);
  });

  test("the form posts to Formspree instead of putting the data in the URL", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.route("https://formspree.io/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "<p>ok</p>" }));
    await page.goto("/");
    const form = page.getByTestId("contact-form");
    await form.getByLabel("Name").fill("Dana Lee");
    await form.getByLabel("Work email").fill("cto@acme.com");
    await form.getByLabel("What do you need?").fill("We need regression coverage before launch.");
    const [request] = await Promise.all([page.waitForRequest("https://formspree.io/**"), form.getByRole("button", { name: "Send message" }).click()]);
    expect(request.method()).toBe("POST");
    expect(request.postData() ?? "").toContain("cto%40acme.com");
    expect(request.url()).not.toContain("cto");
    await context.close();
  });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("pages hydrate without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of ["/", "/how-we-work/", "/services/automated-testing/", "/es/"]) {
      await page.goto(path);
      await page.waitForTimeout(800);
    }
    expect(errors).toEqual([]);
  });

  test("no JavaScript animation loop keeps running", async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { __raf: number };
      w.__raf = 0;
      const original = window.requestAnimationFrame.bind(window);
      window.requestAnimationFrame = (cb) => {
        w.__raf++;
        return original(cb);
      };
    });
    await page.goto("/");
    await page.locator("#agent").scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    await page.evaluate(() => ((window as unknown as { __raf: number }).__raf = 0));
    await page.waitForTimeout(1000);
    expect(await page.evaluate(() => (window as unknown as { __raf: number }).__raf)).toBeLessThan(5);
  });
});

test("animated loops pause when they are offscreen", async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    const w = window as unknown as { __raf: number };
    w.__raf = 0;
    const original = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => {
      w.__raf++;
      return original(cb);
    };
  });
  const framesPerSecond = async () => {
    await page.evaluate(() => ((window as unknown as { __raf: number }).__raf = 0));
    await page.waitForTimeout(1000);
    return page.evaluate(() => (window as unknown as { __raf: number }).__raf);
  };
  // The water background is fixed and always on screen, so it animates whenever the tab is visible.
  // Measure it alone on a page with no other animation, then compare.
  await page.goto("/privacy/");
  await page.waitForTimeout(1500);
  const water = await framesPerSecond();

  await page.goto("/");
  await page.locator("#agent").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.locator("#plans").scrollIntoViewIfNeeded();
  // The terminal's typing sequence is finite and may finish offscreen (a few seconds); loops must not.
  await page.waitForTimeout(6500);
  expect((await framesPerSecond()) - water).toBeLessThan(10);
});

for (const width of [375, 1280]) {
  test(`the rotating word does not move the hero at ${width}px`, async ({ page }) => {
    test.setTimeout(60_000); // samples the hero for 13.5 s; under a full parallel run the default 30 s is too tight
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const heights = new Set<number>();
    // 45 × 300 ms covers all five words (one every 2.6 s).
    for (let i = 0; i < 45; i++) {
      heights.add(await page.locator("h1").evaluate((el) => Math.round(el.getBoundingClientRect().height)));
      await page.waitForTimeout(300);
    }
    expect([...heights]).toHaveLength(1);
  });
}

test("form fields show a visible focus ring", async ({ page }) => {
  await page.goto("/");
  const email = page.locator("#contact-email");
  await email.focus();
  expect(await email.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
});

test("approving the fix keeps keyboard focus on the control", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Approve fix" }).focus();
  await page.keyboard.press("Space");
  await expect(page.getByRole("button", { name: "Undo" })).toBeFocused();
  await page.keyboard.press("Space");
  await expect(page.getByRole("button", { name: "Approve fix" })).toBeFocused();
});
