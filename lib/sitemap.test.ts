import { describe, expect, it } from "vitest";
import { indexablePages } from "./routes";
import { sitemapEntries } from "./sitemap";

describe("sitemapEntries", () => {
  const entries = sitemapEntries();
  const pages = indexablePages();

  it("has one absolute entry per indexable page", () => {
    expect(entries.map((e) => e.url).sort()).toEqual(pages.map((p) => `https://www.code-assurance.com${p.path}`).sort());
  });

  it("dates each entry with the page's last update", () => {
    for (const page of pages) {
      const entry = entries.find((e) => e.url === `https://www.code-assurance.com${page.path}`);
      expect(entry?.lastModified, page.path).toBe(page.updated);
    }
  });

  it("declares both languages only where an alternate exists", () => {
    for (const page of pages) {
      const entry = entries.find((e) => e.url === `https://www.code-assurance.com${page.path}`)!;
      if (page.alternatePath) {
        const en = page.locale === "en" ? page.path : page.alternatePath;
        const es = page.locale === "es" ? page.path : page.alternatePath;
        expect(entry.alternates?.languages, page.path).toEqual({
          en: `https://www.code-assurance.com${en}`,
          es: `https://www.code-assurance.com${es}`,
        });
      } else {
        expect(entry.alternates, page.path).toBeUndefined();
      }
    }
  });
});
