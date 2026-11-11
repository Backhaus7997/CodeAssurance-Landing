import { expect, test, type Page } from "@playwright/test";
import { indexablePages } from "../lib/routes";

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

// One test per page, so each gets its own timeout and they run in parallel as the site grows.
const PAGES = [...indexablePages().map((p) => p.path), "/how-we-work/"];

for (const path of PAGES) {
  test(`${path} is clean: real links, no banned terms, privacy linked in its language`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('a[href="#"], a[href=""]')).toHaveCount(0);
    const text = await page.locator("body").innerText();
    for (const re of BANNED) expect(text, `${re}`).not.toMatch(re);
    const privacy = path.startsWith("/es/") ? "/es/privacy/" : "/privacy/";
    await expect(page.locator(`footer a[href="${privacy}"]`)).toHaveCount(1);
  });

  for (const width of [375, 1280]) {
    test(`${path} doesn't scroll sideways at ${width}px, even after scrolling to the end`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      await scrollToEnd(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}
