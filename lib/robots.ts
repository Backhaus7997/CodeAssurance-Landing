import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

// Named explicitly so the policy toward search and AI assistants is visible, not implied by "*" (spec, 6.2).
export const AI_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
] as const;

export function robotsConfig(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...AI_CRAWLERS], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
