// Pure checks behind the content tests (SEO spec, 5.3).

const BRANDS = ["Disney", "FIFA", "PayPal", "Royal Caribbean", "Numerade", "Deloitte", "Globant"];
const CLIENT_WORDS = /\b(clients?|customers?|partners?|partnered|partnering)\b/i;

function words(text: string): string[] {
  return text.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’+-]*/gu) ?? [];
}

export function wordCount(text: string): number {
  return words(text).length;
}

/** Sequences of n consecutive words, lowercased and without punctuation. */
export function shingles(text: string, n = 5): Set<string> {
  const list = words(text);
  const out = new Set<string>();
  for (let i = 0; i + n <= list.length; i++) out.add(list.slice(i, i + n).join(" "));
  return out;
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let shared = 0;
  for (const item of a) if (b.has(item)) shared++;
  return shared / (a.size + b.size - shared);
}

export function sentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
}

/** Currency amounts and rates: no prices are published (SEO spec, section 2). */
export function hasPriceFigure(text: string): boolean {
  return (
    /(?:US)?[$€£]\s?\d/.test(text) ||
    /\b(?:USD|EUR|ARS)\s?\d/.test(text) ||
    /\d[\d.,]*\s?(?:USD|EUR|ARS)\b/.test(text) ||
    /\d[\d.,]*\s?(?:\/|per\s)\s?(?:hour|hr|month)\b/i.test(text)
  );
}

/** The first sentence that names a brand from the team's experience next to client/customer/partner. */
export function brandNearClient(text: string): string | null {
  return sentences(text).find((s) => BRANDS.some((brand) => s.includes(brand)) && CLIENT_WORDS.test(s)) ?? null;
}
