import type { Author, FaqItem } from "@/content/pages/types";
import { BRAND, CONTACT_EMAIL, LEGAL_ENTITY, SAME_AS, SITE_URL } from "@/content/site";

// Structured data for search engines and AI assistants (spec, 6.1). Only facts visible on the page;
// never reviews or ratings.
export type Ld = Record<string, unknown>;

export const ORG_ID = `${SITE_URL}/#organization`;
const CONTEXT = "https://schema.org";
const US = { "@type": "Country", name: "United States" };

const url = (path: string) => `${SITE_URL}${path}`;

export function organizationLd(): Ld {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND,
    legalName: LEGAL_ENTITY,
    url: SITE_URL,
    logo: url("/apple-icon.png"),
    email: CONTACT_EMAIL,
    areaServed: US,
    availableLanguage: ["en", "es"],
    knowsAbout: [
      "Software quality assurance",
      "Test automation",
      "Manual testing",
      "Performance testing",
      "Security testing",
      "API testing",
      "Mobile app testing",
    ],
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  };
}

export function websiteLd(): Ld {
  return { "@context": CONTEXT, "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: BRAND, url: SITE_URL, publisher: { "@id": ORG_ID } };
}

export function serviceLd(s: { name: string; description: string; path: string; serviceType: string }): Ld {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.serviceType,
    url: url(s.path),
    provider: { "@id": ORG_ID },
    areaServed: US,
  };
}

export function articleLd(a: { headline: string; description: string; path: string; author: Author; published: string; updated: string }): Ld {
  return {
    "@context": CONTEXT,
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: url(a.path),
    mainEntityOfPage: url(a.path),
    author: { "@type": "Person", name: a.author.name, jobTitle: a.author.role, worksFor: { "@id": ORG_ID } },
    publisher: { "@id": ORG_ID },
    datePublished: a.published,
    dateModified: a.updated,
  };
}

export function faqLd(items: FaqItem[]): Ld {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]): Ld {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({ "@type": "ListItem", position: i + 1, name: step.name, item: url(step.path) })),
  };
}

export function itemListLd(items: { name: string; path: string }[]): Ld {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: url(item.path) })),
  };
}

/** JSON for a <script> tag: "<" is escaped so no text can close the tag early. */
export function serializeJsonLd(data: Ld | Ld[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
