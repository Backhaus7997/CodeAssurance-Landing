import { describe, expect, it } from "vitest";
import { brandNearClient, hasPriceFigure, jaccard, sentences, shingles, wordCount } from "./content-checks";

describe("wordCount", () => {
  it("counts words, not punctuation or dashes", () => {
    expect(wordCount("Hello,  world — again")).toBe(3);
    expect(wordCount("")).toBe(0);
  });
});

describe("shingles and jaccard", () => {
  const text = "We map your codebase and find the flows that have no tests at all";

  it("is 1 for the same text", () => {
    expect(jaccard(shingles(text), shingles(text))).toBe(1);
  });

  it("is 0 for texts with no five-word sequence in common", () => {
    expect(jaccard(shingles(text), shingles("Load testing shows where latency grows under real traffic patterns"))).toBe(0);
  });

  it("ignores case and punctuation", () => {
    expect(jaccard(shingles("One two three four five."), shingles("one, TWO three four five"))).toBe(1);
  });
});

describe("sentences", () => {
  it("splits on sentence punctuation", () => {
    expect(sentences("First one. Second one? Third!")).toEqual(["First one.", "Second one?", "Third!"]);
  });
});

describe("hasPriceFigure", () => {
  it.each(["from $4,000/month", "USD 30", "$25–49 per hour", "30 USD/hr", "€90 per hour", "US$ 5,000"])("flags %s", (text) => {
    expect(hasPriceFigure(text)).toBe(true);
  });

  it.each(["8+ years of experience", "UTC−3", "14 modules mapped", "first month", "a 15-minute call"])("allows %s", (text) => {
    expect(hasPriceFigure(text)).toBe(false);
  });
});

describe("brandNearClient", () => {
  it("returns the sentence that presents a brand as a client", () => {
    expect(brandNearClient("We test well. Our clients include PayPal and FIFA. Book a call.")).toBe("Our clients include PayPal and FIFA.");
  });

  it("allows team experience at those brands", () => {
    expect(brandNearClient("Our engineers have delivered QA on teams at PayPal, Disney and FIFA.")).toBeNull();
  });

  it("catches customers and partners too", () => {
    expect(brandNearClient("Disney is a customer.")).not.toBeNull();
    expect(brandNearClient("We partner with Deloitte.")).not.toBeNull();
  });
});
