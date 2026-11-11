import type { Metadata } from "next";

// Search Console and Bing Webmaster verification codes, read at build time (static export).
// Empty means the owner verified another way (DNS) or hasn't yet: no meta tag is printed.
export function parseVerificationToken(envName: string, raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error(`${envName} must be the bare verification code, not a whole tag or URL (got "${value}")`);
  }
  return value;
}

export function siteVerification(env: Record<string, string | undefined> = process.env): Metadata["verification"] | undefined {
  const google = parseVerificationToken("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION", env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);
  const bing = parseVerificationToken("NEXT_PUBLIC_BING_SITE_VERIFICATION", env.NEXT_PUBLIC_BING_SITE_VERIFICATION);
  if (!google && !bing) return undefined;
  return { ...(google ? { google } : {}), ...(bing ? { other: { "msvalidate.01": bing } } : {}) };
}
