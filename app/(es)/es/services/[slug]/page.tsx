import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { ServicePage } from "@/components/services/ServicePage";
import { es } from "@/content/es";
import { serviceEyebrowEs, servicesEs } from "@/content/services/es";
import { SERVICE_SLUGS, type ServiceSlug } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: ServiceSlug }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesEs[slug];
  return pageMetadata({
    locale: "es",
    path: `/es/services/${slug}/`,
    alternatePath: `/services/${slug}/`,
    title: service.meta.title,
    description: service.meta.description,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <PageShell locale="es" alternateHref={`/services/${slug}/`}>
      <ServicePage service={servicesEs[slug]} site={es} eyebrow={serviceEyebrowEs} />
    </PageShell>
  );
}
