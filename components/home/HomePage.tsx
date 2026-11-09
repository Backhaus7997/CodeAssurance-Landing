import type { SiteContent } from "@/content/types";
import { AgentSection } from "./AgentSection";
import { Hero } from "./Hero";

export function HomePage({ content }: { content: SiteContent }) {
  return (
    <>
      <Hero content={content} />
      <AgentSection content={content} />
    </>
  );
}
