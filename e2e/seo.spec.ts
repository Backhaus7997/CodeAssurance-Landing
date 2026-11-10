import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { expect, test, type APIRequestContext } from "@playwright/test";
import { AI_CRAWLERS } from "../lib/robots";

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
