import { describe, expect, it } from "vitest";
import { AI_CRAWLERS, robotsConfig } from "./robots";

describe("robotsConfig", () => {
  const config = robotsConfig();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

  it("allows every crawler", () => {
    expect(rules).toContainEqual({ userAgent: "*", allow: "/" });
  });

  it("names the search and AI crawlers explicitly", () => {
    expect(AI_CRAWLERS).toEqual([
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
    ]);
    expect(rules).toContainEqual({ userAgent: [...AI_CRAWLERS], allow: "/" });
  });

  it("blocks nothing", () => {
    expect(rules.every((rule) => !("disallow" in rule))).toBe(true);
  });

  it("points to the sitemap", () => {
    expect(config.sitemap).toBe("https://www.code-assurance.com/sitemap.xml");
  });
});
