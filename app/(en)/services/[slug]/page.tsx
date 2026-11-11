import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { ServicePage } from "@/components/services/ServicePage";
import { en } from "@/content/en";
import { LABELS } from "@/content/pages/labels";
import { serviceEyebrowEn, servicesEn } from "@/content/services/en";
import { EN_SERVICE_SLUGS, SERVICE_SLUGS, type AnyServiceSlug, type ServiceSlug } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: AnyServiceSlug }> };

/** The Spanish version of a service page, when there is one (English-only services have none). */
function spanishPath(slug: AnyServiceSlug): string | undefined {
  return (SERVICE_SLUGS as AnyServiceSlug[]).includes(slug) ? `/es/services/${slug as ServiceSlug}/` : undefined;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return EN_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesEn[slug];
  return pageMetadata({
    locale: "en",
    path: `/services/${slug}/`,
    alternatePath: spanishPath(slug),
    title: service.meta.title,
    description: service.meta.description,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = servicesEn[slug];
  const path = `/services/${slug}/`;
  return (
    <PageShell locale="en" alternateHref={spanishPath(slug) ?? "/es/"}>
      <ServicePage
        service={service}
        site={en}
        eyebrow={`${serviceEyebrowEn} / ${String(EN_SERVICE_SLUGS.indexOf(slug) + 1).padStart(2, "0")}`}
        path={path}
        breadcrumbs={[
          { name: LABELS.en.home, path: "/" },
          { name: LABELS.en.services, path: "/services/" },
          { name: service.title, path },
        ]}
        relatedTitle={LABELS.en.related}
      />
    </PageShell>
  );
}
