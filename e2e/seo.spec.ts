import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { expect, test, type APIRequestContext } from "@playwright/test";
import { AI_CRAWLERS } from "../lib/robots";

// Several tests visit every page in the sitemap; WebKit needs more than the default 30 s for that.
test.describe.configure({ timeout: 120_000 });

const SITE = "https://www.code-assurance.com";
const OUT = join(__dirname, "..", "out");

/** Every exported page, as a site path with a trailing slash. */
function exportedPages(): { path: string; html: string }[] {
  const pages: { path: string; html: string }[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") {
        const rel = relative(OUT, dir).split(sep).join("/");
        pages.push({ path: rel ? `/${rel}/` : "/", html: readFileSync(full, "utf8") });
      }
    }
  };
  walk(OUT);
  return pages;
}

async function sitemapPaths(request: APIRequestContext): Promise<string[]> {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
}

test("sitemap lists exactly the indexable exported pages", async ({ request }) => {
  const indexable = exportedPages()
    .filter(({ path }) => !path.startsWith("/404/") && !path.startsWith("/_not-found/"))
    .filter(({ html }) => !/<meta name="robots" content="noindex/.test(html))
    .map(({ path }) => path)
    .sort();
  expect((await sitemapPaths(request)).sort()).toEqual(indexable);
});

test("robots.txt names every AI crawler and the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const text = await res.text();
  for (const bot of AI_CRAWLERS) expect(text, bot).toContain(`User-Agent: ${bot}`);
  expect(text).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  expect(text).not.toMatch(/Disallow:\s*\S/);
});

/** Every @type declared in the page's JSON-LD scripts (throws if any script is not valid JSON). */
async function jsonLdTypes(page: import("@playwright/test").Page): Promise<string[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types: string[] = [];
  const collect = (node: unknown) => {
    if (Array.isArray(node)) node.forEach(collect);
    else if (node && typeof node === "object") {
      const t = (node as Record<string, unknown>)["@type"];
      if (typeof t === "string") types.push(t);
      Object.values(node).forEach(collect);
    }
  };
  for (const block of blocks) collect(JSON.parse(block));
  return types;
}

test("every indexable page has valid organization data", async ({ page, request }) => {
  for (const path of await sitemapPaths(request)) {
    await page.goto(path);
    const types = await jsonLdTypes(page);
    expect(types, path).toContain("Organization");
    expect(types, path).toContain("WebSite");
  }
});

test("every indexable page has one h1", async ({ page, request }) => {
  for (const path of await sitemapPaths(request)) {
    await page.goto(path);
    await expect(page.locator("h1"), path).toHaveCount(1);
  }
});

test("no indexable page scrolls sideways", async ({ page, request }) => {
  for (const path of await sitemapPaths(request)) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test("every hreflang target exists", async ({ page, request }) => {
  for (const path of await sitemapPaths(request)) {
    await page.goto(path);
    const targets = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) => links.map((l) => l.getAttribute("href") ?? ""));
    for (const href of targets) {
      const res = await request.get(href.replace(SITE, ""));
      expect(res.status(), `${path} → ${href}`).toBe(200);
    }
  }
});

test("/pricing/ answers how pricing works", async ({ page }) => {
  const res = await page.goto("/pricing/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("How pricing works");
  await expect(page.getByTestId("answer")).toBeVisible();
  expect(await page.getByTestId("faq").locator("details").count()).toBeGreaterThanOrEqual(4);
  const types = await jsonLdTypes(page);
  expect(types).toEqual(expect.arrayContaining(["FAQPage", "BreadcrumbList"]));
});

const GUIDES = [
  "/guides/how-to-hire-a-qa-company/",
  "/guides/qa-outsourcing-vs-in-house-qa/",
  "/guides/how-to-improve-qa-in-your-company/",
  "/guides/qa-outsourcing-cost/",
];

test("/guides/ lists the four guides", async ({ page }) => {
  const res = await page.goto("/guides/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("QA guides");
  const hrefs = await page.getByTestId("hub-list").locator("a").evaluateAll((links) => links.map((a) => a.getAttribute("href")));
  expect(hrefs.sort()).toEqual([...GUIDES].sort());
});

for (const path of GUIDES) {
  test(`${path} is a signed, dated article`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByTestId("byline")).toContainText("Martin Backhaus");
    await expect(page.getByTestId("byline").locator("time[datetime]").first()).toBeVisible();
    const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((b) => JSON.parse(b));
    const article = blocks.flat().find((node: { "@type": string }) => node["@type"] === "Article");
    expect(article?.author?.name).toBe("Martin Backhaus");
    const types = await jsonLdTypes(page);
    expect(types).toEqual(expect.arrayContaining(["FAQPage", "BreadcrumbList"]));
  });
}

test("every page except the home has breadcrumbs", async ({ page, request }) => {
  for (const path of await sitemapPaths(request)) {
    if (path === "/" || path === "/es/") continue;
    await page.goto(path);
    expect(await jsonLdTypes(page), path).toContain("BreadcrumbList");
  }
});
