import type { ServiceSlug } from "../types";

export type ServiceContent = {
  slug: ServiceSlug;
  meta: { title: string; description: string };
  /** ISO date of the last change to this page's text. */
  updated: string;
  title: string;
  summary: string;
  promiseLabel: string;
  promise: string[];
  headings: { deliverables: string; howItWorks: string; evidence: string; tools: string; faqs: string };
  deliverables: { title: string; detail: string }[];
  howItWorks: { title: string; bullets: string[] }[];
  evidence: string[];
  evidenceNote: string;
  tools: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
};
