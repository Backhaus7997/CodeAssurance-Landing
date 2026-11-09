import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { ServicePage } from "@/components/services/ServicePage";
import { en } from "@/content/en";
import { serviceEyebrowEn, servicesEn } from "@/content/services/en";
import { SERVICE_SLUGS, type ServiceSlug } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: ServiceSlug }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesEn[slug];
  return pageMetadata({
    locale: "en",
    path: `/services/${slug}/`,
    alternatePath: `/es/services/${slug}/`,
    title: service.meta.title,
    description: service.meta.description,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <PageShell locale="en" alternateHref={`/es/services/${slug}/`}>
      <ServicePage service={servicesEn[slug]} site={en} eyebrow={serviceEyebrowEn} />
    </PageShell>
  );
}
