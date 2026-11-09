import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/content/site";
import type { Locale } from "@/content/types";

type PageMetadataOptions = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** The same page in the other language; omitted for single-language pages. */
  alternatePath?: string;
  noindex?: boolean;
  ogAlt?: string;
};

export function pageMetadata({ locale, path, title, description, alternatePath, noindex, ogAlt }: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const enPath = locale === "en" ? path : alternatePath;
  const esPath = locale === "es" ? path : alternatePath;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      ...(alternatePath && enPath && esPath
        ? { languages: { en: `${SITE_URL}${enPath}`, es: `${SITE_URL}${esPath}`, "x-default": `${SITE_URL}${enPath}` } }
        : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      url,
      siteName: BRAND,
      title,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ogAlt ?? title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
  };
}
