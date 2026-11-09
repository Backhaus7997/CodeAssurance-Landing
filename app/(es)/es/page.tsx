import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
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
      <HomePage content={es} />
    </PageShell>
  );
}
