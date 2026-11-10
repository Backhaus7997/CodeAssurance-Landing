import { describe, expect, it } from "vitest";
import { parseVerificationToken, siteVerification } from "./verification";

const GOOGLE = "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION";
const BING = "NEXT_PUBLIC_BING_SITE_VERIFICATION";

describe("parseVerificationToken", () => {
  it("returns null when the variable is missing or blank", () => {
    expect(parseVerificationToken(GOOGLE, undefined)).toBeNull();
    expect(parseVerificationToken(GOOGLE, "   ")).toBeNull();
  });

  it("returns the trimmed code", () => {
    expect(parseVerificationToken(GOOGLE, " abc-123_XYZ ")).toBe("abc-123_XYZ");
  });

  it("rejects a pasted meta tag, naming the variable", () => {
    expect(() => parseVerificationToken(GOOGLE, '<meta name="google-site-verification" content="abc">')).toThrow(GOOGLE);
  });

  it("rejects a value with spaces inside", () => {
    expect(() => parseVerificationToken(BING, "abc def")).toThrow(BING);
  });
});

describe("siteVerification", () => {
  it("is undefined when no code is set", () => {
    expect(siteVerification({})).toBeUndefined();
  });

  it("maps Google and Bing codes to their meta names", () => {
    expect(siteVerification({ [GOOGLE]: "g-1", [BING]: "B2" })).toEqual({ google: "g-1", other: { "msvalidate.01": "B2" } });
  });

  it("sets only the code that exists", () => {
    expect(siteVerification({ [BING]: "B2" })).toEqual({ other: { "msvalidate.01": "B2" } });
  });
});
