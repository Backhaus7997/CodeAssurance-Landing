import type { FieldError } from "@/lib/contact";

export type Locale = "en" | "es";

export type ServiceSlug = "automated-testing" | "performance-audit" | "security-review" | "code-quality";

export const SERVICE_SLUGS: ServiceSlug[] = ["automated-testing", "performance-audit", "security-review", "code-quality"];

/** Service pages that exist only in English (SEO spec, 3.1). */
export type EnOnlyServiceSlug = "manual-qa-testing" | "dedicated-qa-engineers" | "ai-qa-agent" | "mobile-app-testing" | "api-testing";

export const EN_ONLY_SERVICE_SLUGS: EnOnlyServiceSlug[] = ["manual-qa-testing", "dedicated-qa-engineers", "ai-qa-agent", "mobile-app-testing", "api-testing"];

export type AnyServiceSlug = ServiceSlug | EnOnlyServiceSlug;

export const EN_SERVICE_SLUGS: AnyServiceSlug[] = [...SERVICE_SLUGS, ...EN_ONLY_SERVICE_SLUGS];

/** Anchor ids of the home sections, shared by the header and the footer. */
export type SectionId = "agent" | "process" | "plans" | "audits";

export type SectionIntro = { index: string; label: string; title: string; description: string };

export type NavItem = { label: string; section: SectionId };

/** A link to another page of the site (not a section of the home). */
export type PageLink = { label: string; href: string };

export type ModuleStatus = "covered" | "added" | "bug" | "pending" | "gap";

export type MapModule = { id: string; path: string; tests: number; status: ModuleStatus; note: string };

export type RunLine = { stage: string; detail: string; flags?: { bugs?: string; wait?: string } };

export type Tone = "bug" | "wait";

export type PullRequestContent = {
  title: string;
  ticket: string;
  badge: string;
  branch: string;
  status: string;
  summary: { text: string; tone?: Tone }[];
  files: { path: string; added: number }[];
  checks: string[];
  caption: string;
};

export type TriageContent = {
  label: string;
  bug: { test: string; verdict: string; error: string; explanation: string; outcome: string };
  locator: {
    test: string;
    pendingVerdict: string;
    fixedVerdict: string;
    error: string;
    explanation: string;
    removed: string;
    added: string;
    approve: string;
    approveHint: string;
    applied: string;
    undo: string;
  };
};

export type StackContent = {
  title: string;
  description: string;
  rows: { label: string; value: string }[];
  diagram: { label: string; inputs: [string, string, string]; outputs: [string, string, string] };
  marquee: { tools: string[]; languages: string[] };
};

export type StartingPoint = { tag?: string; tone: "mint" | "wait" | "muted"; title: string; text: string };

export type Tier = { name: string; size: string; scope: string; team: string };

export type Package = { name: string; tagline: string; summary: string; tiers: Tier[] };

export type Step = { title: string; summary: string; deliverables: string[] };

export type AuditVisualKind = "latency" | "endpoints" | "debt" | "suites";

export type Audit = { title: string; summary: string; slug: ServiceSlug; visual: AuditVisualKind; cta: string };

export type StartStep = { title: string; text: string };

export type TeamContent = {
  index: string;
  label: string;
  title: string;
  statement: string;
  location?: string;
  trackRecordLabel: string;
  trackRecord: string;
};

export type StartContent = SectionIntro & { steps: StartStep[]; primaryCta: string; emailCta: string };

export type FormContent = {
  label: string;
  fields: { name: string; email: string; company: string; phone: string; optional: string; message: string; messagePlaceholder: string };
  submit: string;
  sending: string;
  sentTitle: string;
  sentText: string;
  errors: Record<FieldError | "rejected" | "network", string>;
  fallback: string;
};

export type SiteContent = {
  locale: Locale;
  meta: { title: string; description: string; ogAlt: string; updated: string };
  header: { pages: PageLink[]; nav: NavItem[]; book: string; contact: string; switchLabel: string; switchTo: string };
  hero: {
    label: string;
    titleBefore: string;
    rotatingWords: string[];
    titleAfter: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    emailCta: string;
    emailPrefix: string;
  };
  map: {
    label: string;
    labelNote: string;
    legend: Record<ModuleStatus, string>;
    statusLabel: Record<ModuleStatus, string>;
    modules: MapModule[];
    defaultModule: string;
    totals: string;
    firstDeliverable: string;
  };
  agent: SectionIntro & {
    run: { title: string; command: string; lines: RunLine[]; done: string };
    pr: PullRequestContent;
    triage: TriageContent;
    stack: StackContent;
    startingPoints: StartingPoint[];
  };
  process: SectionIntro & { deliverablesLabel: string; steps: Step[] };
  plans: SectionIntro & { packages: Package[] };
  audits: SectionIntro & { exampleLabel: string; items: Audit[] };
  team: TeamContent;
  start: StartContent;
  form: FormContent;
  footer: { tagline: string; nav: NavItem[]; groups: { title: string; links: PageLink[] }[]; privacy: string; rights: string };
  notFound: { title: string; text: string; homeEn: string; homeEs: string };
  privacy: {
    meta: { title: string; description: string; updated: string };
    title: string;
    updated: string;
    sections: { heading: string; body: string[] }[];
  };
};

export type HowWeWorkContent = {
  meta: { title: string; description: string };
  hero: { title: string; lead: string; primaryCta: string; secondaryCta: string; emailCta: string; emailPrefix: string };
  pr: PullRequestContent;
  stack: SectionIntro & StackContent;
  agent: SectionIntro & {
    stages: { name: string; description: string }[];
    startingPoints: StartingPoint[];
    extrasLabel: string;
    extras: { title: string; text: string }[];
    triage: TriageContent;
  };
  plans: SectionIntro & { packages: Package[]; specialists: string };
  team: TeamContent;
  start: StartContent;
};
