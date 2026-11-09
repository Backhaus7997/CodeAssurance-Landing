import type { SiteContent } from "@/content/types";
import { Hero } from "./Hero";

export function HomePage({ content }: { content: SiteContent }) {
  return (
    <>
      <Hero content={content} />
    </>
  );
}
