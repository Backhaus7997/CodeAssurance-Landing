import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { brandNearClient, hasPriceFigure, wordCount } from "@/lib/content-checks";
import { indexablePages } from "@/lib/routes";
import { en } from "./en";
import { es } from "./es";
import { howWeWork } from "./how-we-work";
import { servicesEn } from "./services/en";
import { guides } from "./guides";
import { guidesHub, servicesHub } from "./hubs";
import type { PageCopy } from "./pages/types";
import { pricing } from "./pricing";
import { servicesEs } from "./services/es";
import { EN_SERVICE_SLUGS, SERVICE_SLUGS } from "./types";

// Terms that must never reach the public site (see the spec, section 6).
const BANNED = [
  /\bnpm\b/i,
  /\bnpx\b/i,
  /\bpackages?\b/i,
  /\bpaquetes?\b/i,
  /qaa[-\s]?agent/i,
  /99\.9/,
  /\b10x\b/i,
  /zero downtime/i,
];

type Leaf = { path: string; key: string; value: string };

function strings(node: unknown, path = "$"): Leaf[] {
  if (typeof node === "string") return [{ path, key: path.split(".").pop() ?? "", value: node }];
  if (Array.isArray(node)) return node.flatMap((item, i) => strings(item, `${path}.${i}`));
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) => strings(v, `${path}.${k}`));
  }
  return [];
}

const sources = { en, es, howWeWork, servicesEn, servicesEs };

/** Collections added by the SEO work (services, pricing, guides). Every rule below runs on them too. */
const PAGES: { name: string; copy: PageCopy }[] = [{ name: "pricing", copy: pricing }, ...guides.map((g) => ({ name: `guide ${g.slug}`, copy: g }))];

const COPY: { name: string; copy: unknown }[] = [...PAGES, { name: "servicesHub", copy: servicesHub }, { name: "guidesHub", copy: guidesHub }];

const allSources: [string, unknown][] = [...Object.entries(sources), ...COPY.map((c): [string, unknown] => [c.name, c.copy])];

describe.each(allSources)("%s content", (_name, source) => {
  const leaves = strings(source);

  it("has no banned terms", () => {
    const hits = leaves.flatMap((l) => BANNED.filter((re) => re.test(l.value)).map((re) => `${l.path}: ${re} in "${l.value}"`));
    expect(hits).toEqual([]);
  });

  it("has no empty or placeholder links", () => {
    const bad = leaves.filter((l) => l.key === "href" && (l.value.trim() === "" || l.value.trim() === "#"));
    expect(bad).toEqual([]);
  });
  it("publishes no prices", () => {
    expect(leaves.filter((l) => hasPriceFigure(l.value)).map((l) => `${l.path}: "${l.value}"`)).toEqual([]);
  });

  it("names the team's past employers only in the approved sentence", () => {
    const brands = /Disney|FIFA|PayPal|Royal Caribbean|Numerade|Deloitte|Globant/i;
    const approved = /have delivered QA on teams at|hicieron QA en equipos de/;
    const hits = leaves.filter((l) => brands.test(l.value) && !approved.test(l.value)).map((l) => `${l.path}: "${l.value}"`);
    expect(hits).toEqual([]);
  });

  it("never presents the team's past employers as clients", () => {
    const hits = leaves.flatMap((l) => {
      const sentence = brandNearClient(l.value);
      return sentence ? [`${l.path}: "${sentence}"`] : [];
    });
    expect(hits).toEqual([]);
  });
});

describe("search titles and descriptions", () => {
  const pages = indexablePages();

  it.each(pages.map((p) => [p.path, p.title] as const))("%s has a title of at most 60 characters", (_path, title) => {
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it("are unique across the site", () => {
    const titles = pages.map((p) => p.title);
    expect(titles.filter((t, i) => titles.indexOf(t) !== i)).toEqual([]);
  });

  it.each(pages.map((p) => [p.path, p.description] as const))("%s has a description of 120 to 160 characters", (_path, description) => {
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(160);
  });
});

describe("English and Spanish have the same structure", () => {
  it("maps the same modules", () => {
    expect(es.map.modules.map((m) => [m.id, m.path, m.tests, m.status])).toEqual(
      en.map.modules.map((m) => [m.id, m.path, m.tests, m.status]),
    );
  });

  it("has the same process steps", () => {
    expect(es.process.steps.map((s) => s.deliverables.length)).toEqual(en.process.steps.map((s) => s.deliverables.length));
  });

  it("has the same plans and tiers", () => {
    expect(es.plans.packages.map((p) => [p.name, p.tiers.map((t) => t.name)])).toEqual(
      en.plans.packages.map((p) => [p.name, p.tiers.map((t) => t.name)]),
    );
  });

  it("links the same audits", () => {
    expect(es.audits.items.map((a) => a.slug)).toEqual(en.audits.items.map((a) => a.slug));
  });

  it("has the same number of agent run lines", () => {
    expect(es.agent.run.lines.length).toBe(en.agent.run.lines.length);
  });
});

describe("the example coverage map adds up", () => {
  const modules = en.map.modules;
  const sum = (statuses: string[]) => modules.filter((m) => statuses.includes(m.status)).reduce((n, m) => n + m.tests, 0);

  it("has 14 modules", () => expect(modules).toHaveLength(14));
  it("adds 31 tests", () => expect(sum(["added", "bug"])).toBe(31));
  it("flags 2 application bugs", () => expect(modules.filter((m) => m.status === "bug")).toHaveLength(2));
  it("has 1 fix awaiting approval", () => expect(modules.filter((m) => m.status === "pending")).toHaveLength(1));
  it("found 120 existing tests", () => expect(sum(["covered", "pending"])).toBe(120));
  it("defaults to a module that exists", () => {
    expect(modules.some((m) => m.id === en.map.defaultModule)).toBe(true);
  });
});

describe("the hero rotates words", () => {
  it("starts with the accessible word in both languages", () => {
    expect(en.hero.rotatingWords[0]).toBe("product");
    expect(es.hero.rotatingWords.length).toBeGreaterThan(1);
  });
});

describe("service pages", () => {
  it("exist for the same four slugs in both languages", () => {
    expect(Object.keys(servicesEs).sort()).toEqual(["automated-testing", "code-quality", "performance-audit", "security-review"]);
    expect(Object.keys(servicesEn).sort()).toEqual([...EN_SERVICE_SLUGS].sort());
  });

  it("have the same number of blocks and FAQs in both languages", () => {
    const shape = (s: (typeof servicesEn)[keyof typeof servicesEn]) => [
      s.promise.length,
      s.deliverables.length,
      s.howItWorks.map((h) => h.bullets.length),
      s.evidence.length,
      s.tools.length,
      s.faqs.length,
    ];
    for (const slug of SERVICE_SLUGS) {
      expect(shape(servicesEs[slug])).toEqual(shape(servicesEn[slug]));
      expect(servicesEn[slug].faqs).toHaveLength(8);
    }
  });
});

describe("service pages answer directly", () => {
  const paths = new Set(indexablePages().map((p) => p.path));
  const all = [
    ...Object.values(servicesEn).map((s) => ["en", s] as const),
    ...Object.values(servicesEs).map((s) => ["es", s] as const),
  ];

  it.each(all.map(([lang, s]) => [`${lang} ${s.slug}`, s] as const))("%s has a 40 to 70 word answer", (_name, s) => {
    expect(wordCount(s.answer)).toBeGreaterThanOrEqual(40);
    expect(wordCount(s.answer)).toBeLessThanOrEqual(70);
  });

  it.each(all.map(([lang, s]) => [`${lang} ${s.slug}`, s] as const))("%s has at least three FAQs", (_name, s) => {
    expect(s.faqs.length).toBeGreaterThanOrEqual(3);
  });

  it.each(all.map(([lang, s]) => [`${lang} ${s.slug}`, s] as const))("%s links only to indexable pages", (_name, s) => {
    expect(s.related.filter((href) => !paths.has(href))).toEqual([]);
  });
});

describe.each(PAGES.map((p) => [p.name, p.copy] as const))("%s page", (_name, copy) => {
  const paths = new Set(indexablePages().map((p) => p.path));

  it("has a 40 to 70 word answer", () => {
    expect(wordCount(copy.answer)).toBeGreaterThanOrEqual(40);
    expect(wordCount(copy.answer)).toBeLessThanOrEqual(70);
  });

  it("has at least three FAQs", () => expect(copy.faq.length).toBeGreaterThanOrEqual(3));

  it("links only to indexable pages", () => expect(copy.related.filter((href) => !paths.has(href))).toEqual([]));

  it("is dated", () => expect(copy.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/));
});

describe.each(guides.map((g) => [g.slug, g] as const))("guide %s", (_slug, guide) => {
  const text = [
    guide.answer,
    ...guide.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...guide.faq.flatMap((f) => [f.q, f.a]),
  ].join(" ");

  it("has at least 1,000 words", () => expect(wordCount(text)).toBeGreaterThanOrEqual(1000));

  it("is signed by both founders", () => {
    expect(guide.authors.map((a) => [a.name, a.role])).toEqual([
      ["Martin Backhaus", "Founder"],
      ["Mariano Backhaus", "Founder"],
    ]);
  });

  it("was updated on or after it was published", () => {
    expect(guide.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(guide.updated >= guide.published).toBe(true);
  });
});

describe.each([
  ["servicesHub", servicesHub],
  ["guidesHub", guidesHub],
] as const)("%s", (_name, hub) => {
  it("has a 40 to 70 word answer", () => {
    expect(wordCount(hub.answer)).toBeGreaterThanOrEqual(40);
    expect(wordCount(hub.answer)).toBeLessThanOrEqual(70);
  });
});

describe("header and footer links", () => {
  const paths = new Set(indexablePages().map((p) => p.path));

  it.each([
    ["en", en],
    ["es", es],
  ] as const)("%s links only to indexable pages", (_lang, site) => {
    const hrefs = [...site.header.pages, ...site.footer.groups.flatMap((g) => g.links)].map((l) => l.href);
    expect(hrefs.filter((href) => !paths.has(href))).toEqual([]);
  });

  it("the English footer lists every English service", () => {
    const hrefs = en.footer.groups.flatMap((g) => g.links).map((l) => l.href);
    for (const slug of EN_SERVICE_SLUGS) expect(hrefs).toContain(`/services/${slug}/`);
  });
});

describe("privacy pages", () => {
  it("name the company responsible for the data in both languages", () => {
    for (const site of [en, es]) {
      const text = site.privacy.sections.flatMap((section) => section.body).join(" ");
      expect(text).toContain("Backhaustin S.A.S.");
      expect(text).toContain("30-71929587-4");
    }
  });
});

describe("IndexNow", () => {
  // The key is public by design: search engines read it at https://www.code-assurance.com/<key>.txt.
  // The file in public/ is its only copy; scripts/indexnow.mjs finds it the same way.
  const dir = new URL("../public/", import.meta.url);
  const keyFiles = readdirSync(dir).filter((name) => /^[0-9a-f]{32}\.txt$/.test(name));

  it("has exactly one key file at the site root", () => expect(keyFiles).toHaveLength(1));

  it("whose content is its own name", () => {
    expect(readFileSync(new URL(keyFiles[0], dir), "utf8").trim()).toBe(keyFiles[0].slice(0, -4));
  });
});
