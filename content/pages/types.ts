export type FaqItem = { q: string; a: string };

export type Author = { name: string; role: string };

export type ContentSection = { heading: string; paragraphs: string[]; bullets?: string[] };

/** A text page built to be quoted: one h1, a direct answer, sections, FAQs and related links (SEO spec, 5.1). */
export type PageCopy = {
  seo: { title: string; description: string };
  eyebrow: string;
  h1: string;
  /** 40 to 70 words that answer the page's question directly. */
  answer: string;
  sections: ContentSection[];
  faq: FaqItem[];
  /** Internal paths with a trailing slash, each one an indexable page. */
  related: string[];
  /** ISO date of the last change to the text. */
  updated: string;
  /** Optional steps shown on the home timeline before the sections (pricing). */
  steps?: { title: string; text: string }[];
};

export type HubCopy = Pick<PageCopy, "seo" | "eyebrow" | "h1" | "answer" | "updated">;

export type GuideSlug = "how-to-hire-a-qa-company" | "qa-outsourcing-vs-in-house-qa" | "how-to-improve-qa-in-your-company" | "qa-outsourcing-cost";

export type Guide = PageCopy & { slug: GuideSlug; authors: Author[]; published: string };
