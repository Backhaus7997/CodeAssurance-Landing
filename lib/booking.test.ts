import { describe, expect, it } from "vitest";
import { parseBookingUrl } from "./booking";

describe("parseBookingUrl", () => {
  it("returns null when the variable is missing", () => {
    expect(parseBookingUrl(undefined)).toBeNull();
  });

  it("returns null when the variable is blank", () => {
    expect(parseBookingUrl("  ")).toBeNull();
  });

  it("returns the URL when it is https", () => {
    expect(parseBookingUrl("https://cal.com/code-assurance/15min")).toBe("https://cal.com/code-assurance/15min");
  });

  it("rejects a URL without a scheme, naming the variable", () => {
    expect(() => parseBookingUrl("cal.com/x")).toThrow(/NEXT_PUBLIC_BOOKING_URL/);
  });

  it("rejects a plain http URL", () => {
    expect(() => parseBookingUrl("http://cal.com/x")).toThrow(/NEXT_PUBLIC_BOOKING_URL/);
  });
});
