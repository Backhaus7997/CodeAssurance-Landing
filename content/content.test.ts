import { describe, expect, it } from "vitest";
import { en } from "./en";
import { es } from "./es";
import { howWeWork } from "./how-we-work";
import { servicesEn } from "./services/en";
import { servicesEs } from "./services/es";

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

describe.each(Object.entries(sources))("%s content", (_name, source) => {
  const leaves = strings(source);

  it("has no banned terms", () => {
    const hits = leaves.flatMap((l) => BANNED.filter((re) => re.test(l.value)).map((re) => `${l.path}: ${re} in "${l.value}"`));
    expect(hits).toEqual([]);
  });

  it("has no empty or placeholder links", () => {
    const bad = leaves.filter((l) => l.key === "href" && (l.value.trim() === "" || l.value.trim() === "#"));
    expect(bad).toEqual([]);
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
    expect(Object.keys(servicesEs).sort()).toEqual(Object.keys(servicesEn).sort());
    expect(Object.keys(servicesEn).sort()).toEqual(["automated-testing", "code-quality", "performance-audit", "security-review"]);
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
    for (const slug of Object.keys(servicesEn) as (keyof typeof servicesEn)[]) {
      expect(shape(servicesEs[slug])).toEqual(shape(servicesEn[slug]));
      expect(servicesEn[slug].faqs).toHaveLength(8);
    }
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
