import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { es } from "@/content/es";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/",
  alternatePath: "/",
  title: es.meta.title,
  description: es.meta.description,
  ogAlt: es.meta.ogAlt,
});

export default function Page() {
  return (
    <PageShell locale="es" alternateHref="/">
      <section className="container-page py-20">
        <h1 className="display text-[clamp(31px,4.9vw,62px)] leading-[0.98]">
          {es.hero.titleBefore} {es.hero.rotatingWords[0]}
          {es.hero.titleAfter}
        </h1>
      </section>
    </PageShell>
  );
}
