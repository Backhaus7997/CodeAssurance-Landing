import type { AnyServiceSlug, AuditVisualKind } from "../types";

export type ServiceContent = {
  slug: AnyServiceSlug;
  meta: { title: string; description: string };
  /** ISO date of the last change to this page's text. */
  updated: string;
  /** The h1: the phrase people search for. */
  title: string;
  /** 40 to 70 words that answer what the service is, right under the h1. */
  answer: string;
  /** Internal paths with a trailing slash, each one an indexable page. */
  related: string[];
  promiseLabel: string;
  promise: string[];
  headings: { deliverables: string; howItWorks: string; evidence: string; tools: string; faqs: string };
  deliverables: { title: string; detail: string }[];
  howItWorks: { title: string; bullets: string[] }[];
  evidence: string[];
  evidenceNote: string;
  tools: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
  visual: ServiceVisual;
};

/** The animated visual in a service page's hero (spec 2026-11-11, 4.2). Text lives here, never in components. */
export type ServiceVisual =
  | { kind: "run" }
  | { kind: "pr" }
  | { kind: "audit"; audit: AuditVisualKind }
  | { kind: "checklist"; title: string; items: { text: string; bug?: string }[] }
  | { kind: "sprint"; columns: [string, string, string, string]; cards: { title: string; start: 0 | 1 | 2 }[] }
  | { kind: "phone"; devices: string[]; rows: string[] }
  | { kind: "api"; request: string[]; response: string[]; checks: string[] };
