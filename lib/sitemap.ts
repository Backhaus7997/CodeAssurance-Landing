import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";
import { indexablePages } from "./routes";

export function sitemapEntries(): MetadataRoute.Sitemap {
  return indexablePages().map((page) => {
    const entry: MetadataRoute.Sitemap[number] = { url: `${SITE_URL}${page.path}`, lastModified: page.updated };
    if (page.alternatePath) {
      const en = page.locale === "en" ? page.path : page.alternatePath;
      const es = page.locale === "es" ? page.path : page.alternatePath;
      entry.alternates = { languages: { en: `${SITE_URL}${en}`, es: `${SITE_URL}${es}` } };
    }
    return entry;
  });
}
