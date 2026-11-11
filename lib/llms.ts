import { guides } from "@/content/guides";
import type { PageCopy } from "@/content/pages/types";
import { pricing } from "@/content/pricing";
import { servicesEn } from "@/content/services/en";
import type { ServiceContent } from "@/content/services/types";
import { SITE_URL } from "@/content/site";
import { EN_SERVICE_SLUGS } from "@/content/types";
import { type IndexablePage, indexablePages } from "./routes";

// llms.txt (llmstxt.org) and its full-text companion: a plain summary of the site for AI assistants
// (SEO spec, 6.4). Built from the same content as the pages, so they never drift.

const SUMMARY =
  "Code Assurance is a software QA company: senior QA engineers and an AI QA agent that work inside your repositories, tickets and test framework. It provides test automation, manual QA, dedicated QA engineers, and mobile, API, performance and security testing for product teams in the United States.";

const link = (page: IndexablePage) => `- [${page.label}](${SITE_URL}${page.path}): ${page.description}`;

export function buildLlmsTxt(contact: { bookingUrl: string | null; email: string }): string {
  const english = indexablePages().filter((p) => p.locale === "en");
  const section = (s: IndexablePage["section"]) => english.filter((p) => p.section === s).map(link);
  const reach = contact.bookingUrl ? `Book a 15-minute call at ${contact.bookingUrl} or write to ${contact.email}.` : `Write to ${contact.email}.`;

  return [
    "# Code Assurance",
    "",
    `> ${SUMMARY}`,
    "",
    "How to work with Code Assurance: every engagement starts with a short call and an assessment of your product. Prices are not published; each engagement is quoted after the assessment, runs month-to-month with no long contract, and if the first month doesn't work for the client, it stops there. The team works in English or Spanish from Argentina (UTC−3), overlapping most of the US working day. Our AI QA agent is an add-on to any engagement, and a senior QA engineer reviews everything it produces.",
    "",
    reach,
    "",
    "## Company",
    "",
    ...section("home"),
    "",
    "## Services",
    "",
    ...section("services"),
    "",
    "## Pricing",
    "",
    ...section("pricing"),
    "",
    "## Guides",
    "",
    ...section("guides"),
    "",
    "## Optional",
    "",
    ...section("privacy"),
    "",
  ].join("\n");
}

function list(items: string[]): string[] {
  return items.map((item) => `- ${item}`);
}

function serviceMarkdown(slug: string, s: ServiceContent): string[] {
  return [
    `# ${s.title}`,
    "",
    `URL: ${SITE_URL}/services/${slug}/`,
    "",
    s.answer,
    "",
    `## ${s.headings.deliverables}`,
    "",
    ...list(s.deliverables.map((d) => `${d.title}: ${d.detail}`)),
    "",
    `## ${s.headings.howItWorks}`,
    "",
    ...s.howItWorks.flatMap((card) => [`### ${card.title}`, "", ...list(card.bullets), ""]),
    `## ${s.headings.evidence}`,
    "",
    ...list(s.evidence),
    "",
    `## ${s.headings.tools}`,
    "",
    ...list(s.tools.map((t) => `${t.title}: ${t.detail}`)),
    "",
    `## ${s.headings.faqs}`,
    "",
    ...s.faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
}

function copyMarkdown(path: string, copy: PageCopy): string[] {
  return [
    `# ${copy.h1}`,
    "",
    `URL: ${SITE_URL}${path}`,
    "",
    copy.answer,
    "",
    ...copy.sections.flatMap((section) => [`## ${section.heading}`, "", ...section.paragraphs.flatMap((p) => [p, ""]), ...(section.bullets ? [...list(section.bullets), ""] : [])]),
    "## FAQs",
    "",
    ...copy.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
}

export function buildLlmsFullTxt(): string {
  const pages = [
    ...EN_SERVICE_SLUGS.map((slug) => serviceMarkdown(slug, servicesEn[slug])),
    copyMarkdown("/pricing/", pricing),
    ...guides.map((guide) => copyMarkdown(`/guides/${guide.slug}/`, guide)),
  ];
  return [`# Code Assurance: full text`, "", `> ${SUMMARY}`, "", ...pages.flatMap((page) => ["---", "", ...page])].join("\n");
}
