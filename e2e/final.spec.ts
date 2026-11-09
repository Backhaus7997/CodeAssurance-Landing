import { expect, test, type Page } from "@playwright/test";

const BANNED = [/\bnpm\b/i, /\bnpx\b/i, /\bpackages?\b/i, /\bpaquetes?\b/i, /qaa[-\s]?agent/i, /99\.9/, /\b10x\b/i, /zero downtime/i];

async function sitemapPaths(page: Page): Promise<string[]> {
  const res = await page.request.get("/sitemap.xml");
  expect(res.ok()).toBe(true);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>https:\/\/www\.code-assurance\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
  return [...paths, "/how-we-work/"];
}

async function scrollToEnd(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1200);
}

test("the privacy pages explain the contact form in both languages", async ({ page }) => {
  for (const path of ["/privacy/", "/es/privacy/"]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("main")).toContainText("Formspree");
    await expect(page.locator("main")).toContainText("martin.backhaus@code-assurance.com");
  }
});

test("the sitemap lists every public page, privacy included", async ({ page }) => {
  const paths = await sitemapPaths(page);
  expect(paths).toEqual(expect.arrayContaining(["/", "/es/", "/privacy/", "/es/privacy/", "/services/performance-audit/", "/es/services/code-quality/"]));
});

test("every page is clean: real links, no banned terms, privacy linked in its language", async ({ page }) => {
  test.setTimeout(120_000); // walks every page in the sitemap
  for (const path of await sitemapPaths(page)) {
    await page.goto(path);
    await expect(page.locator('a[href="#"], a[href=""]'), path).toHaveCount(0);
    const text = await page.locator("body").innerText();
    for (const re of BANNED) expect(text, `${path} ${re}`).not.toMatch(re);
    const privacy = path.startsWith("/es/") ? "/es/privacy/" : "/privacy/";
    await expect(page.locator(`footer a[href="${privacy}"]`), path).toHaveCount(1);
  }
});

for (const width of [375, 1280]) {
  test(`no page scrolls sideways at ${width}px, even after scrolling to the end`, async ({ page }) => {
    test.setTimeout(120_000); // walks every page in the sitemap
    await page.setViewportSize({ width, height: 800 });
    for (const path of await sitemapPaths(page)) {
      await page.goto(path);
      await scrollToEnd(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
}

test("on an iPhone every section heading is visible after scrolling", async ({ page, browserName }) => {
  test.skip(browserName !== "webkit", "iPhone check runs on the WebKit project");
  for (const path of ["/", "/how-we-work/"]) {
    await page.goto(path);
    await scrollToEnd(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), path).toBeLessThanOrEqual(0);
    const opacities = await page.locator("main h2").evaluateAll((els) =>
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
    expect(opacities.length, path).toBeGreaterThan(3);
    expect(opacities.every((o) => o > 0.99), `${path} ${opacities.join(",")}`).toBe(true);
  }
});
