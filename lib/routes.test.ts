import { describe, expect, it } from "vitest";
import { NOINDEX_PATHS, indexablePages, pageByPath } from "./routes";

describe("indexablePages", () => {
  it("lists the pages that exist today", () => {
    expect(
      indexablePages()
        .map((p) => p.path)
        .sort(),
    ).toEqual([
      "/",
      "/es/",
      "/es/privacy/",
      "/es/services/automated-testing/",
      "/es/services/code-quality/",
      "/es/services/performance-audit/",
      "/es/services/security-review/",
      "/privacy/",
      "/services/",
      "/services/ai-qa-agent/",
      "/services/api-testing/",
      "/services/automated-testing/",
      "/services/code-quality/",
      "/services/dedicated-qa-engineers/",
      "/services/manual-qa-testing/",
      "/services/mobile-app-testing/",
      "/services/performance-audit/",
      "/services/security-review/",
    ]);
  });

  it("never lists a noindex page", () => {
    expect(indexablePages().some((p) => NOINDEX_PATHS.includes(p.path))).toBe(false);
  });

  it("pairs every alternate with a listed page that points back", () => {
    for (const page of indexablePages().filter((p) => p.alternatePath)) {
      const other = pageByPath(page.alternatePath!);
      expect(other, page.path).toBeDefined();
      expect(other!.alternatePath).toBe(page.path);
      expect(other!.locale).not.toBe(page.locale);
    }
  });

  it("uses ISO dates", () => {
    for (const page of indexablePages()) expect(page.updated, page.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("lists each path once", () => {
    const paths = indexablePages().map((p) => p.path);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
