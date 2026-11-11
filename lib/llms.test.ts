import { describe, expect, it } from "vitest";
import { guides } from "@/content/guides";
import { pricing } from "@/content/pricing";
import { servicesEn } from "@/content/services/en";
import { buildLlmsFullTxt, buildLlmsTxt } from "./llms";
import { indexablePages } from "./routes";

const SITE = "https://www.code-assurance.com";

describe("buildLlmsTxt", () => {
  const withBooking = buildLlmsTxt({ bookingUrl: "https://cal.com/example/15min", email: "hello@example.com" });
  const withEmail = buildLlmsTxt({ bookingUrl: null, email: "hello@example.com" });

  it("follows the llms.txt layout: title, then a one-line summary", () => {
    expect(withBooking.startsWith("# Code Assurance\n\n> ")).toBe(true);
  });

  it("has the expected sections", () => {
    for (const heading of ["## Company", "## Services", "## Pricing", "## Guides", "## Optional"]) {
      expect(withBooking).toContain(`\n${heading}\n`);
    }
  });

  it("links every English indexable page and nothing else from the registry", () => {
    for (const page of indexablePages().filter((p) => p.locale === "en")) {
      expect(withBooking, page.path).toContain(`](${SITE}${page.path})`);
    }
    expect(withBooking).not.toContain(`${SITE}/es/`);
    expect(withBooking).not.toContain("/how-we-work/");
  });

  it("names the booking link when there is one, and the email otherwise", () => {
    expect(withBooking).toContain("https://cal.com/example/15min");
    expect(withEmail).not.toContain("cal.com");
    expect(withEmail).toContain("hello@example.com");
  });

  it("says prices are not published and quotes follow an assessment", () => {
    expect(withBooking).toMatch(/no published prices|prices are not published/i);
    expect(withBooking).toMatch(/assessment/i);
  });
});

describe("buildLlmsFullTxt", () => {
  const full = buildLlmsFullTxt();
  const copies = [...Object.values(servicesEn).map((s) => ({ answer: s.answer, questions: s.faqs.map((f) => f.q) })), ...[pricing, ...guides].map((p) => ({ answer: p.answer, questions: p.faq.map((f) => f.q) }))];

  it("contains the direct answer and every question of each English service, pricing and guide", () => {
    for (const copy of copies) {
      expect(full).toContain(copy.answer);
      for (const q of copy.questions) expect(full).toContain(`### ${q}`);
    }
  });

  it("gives each page its URL", () => {
    for (const guide of guides) expect(full).toContain(`URL: ${SITE}/guides/${guide.slug}/`);
    expect(full).toContain(`URL: ${SITE}/pricing/`);
  });
});
