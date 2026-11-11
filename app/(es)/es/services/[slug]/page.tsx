import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { ServicePage } from "@/components/services/ServicePage";
import { es } from "@/content/es";
import { LABELS } from "@/content/pages/labels";
import { serviceEyebrowEs, servicesEs } from "@/content/services/es";
import { EN_SERVICE_SLUGS, SERVICE_SLUGS, type ServiceSlug } from "@/content/types";
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
  const service = servicesEs[slug];
  const path = `/es/services/${slug}/`;
  return (
    <PageShell locale="es" alternateHref={`/services/${slug}/`}>
      <ServicePage
        service={service}
        site={es}
        eyebrow={`${serviceEyebrowEs} / ${String(EN_SERVICE_SLUGS.indexOf(slug) + 1).padStart(2, "0")}`}
        path={path}
        breadcrumbs={[
          { name: LABELS.es.home, path: "/es/" },
          { name: service.title, path },
        ]}
        relatedTitle={LABELS.es.related}
      />
    </PageShell>
  );
}
