import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  alternatePath: "/es/",
  title: en.meta.title,
  description: en.meta.description,
  ogAlt: en.meta.ogAlt,
});

export default function Page() {
  return (
    <PageShell locale="en" alternateHref="/es/">
      <section className="container-page py-20">
        <h1 className="display text-[clamp(31px,4.9vw,62px)] leading-[0.98]">
          {en.hero.titleBefore} {en.hero.rotatingWords[0]}
          {en.hero.titleAfter}
        </h1>
      </section>
    </PageShell>
  );
}
