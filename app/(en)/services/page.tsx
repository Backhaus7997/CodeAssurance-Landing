import type { Metadata } from "next";
import { HubPage } from "@/components/content/HubPage";
import { PageShell } from "@/components/site/PageShell";
import { en } from "@/content/en";
import { servicesHub } from "@/content/hubs";
import { LABELS } from "@/content/pages/labels";
import { servicesEn } from "@/content/services/en";
import { EN_SERVICE_SLUGS } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/services/",
  title: servicesHub.seo.title,
  description: servicesHub.seo.description,
});

export default function Page() {
  const items = EN_SERVICE_SLUGS.map((slug) => ({
    label: servicesEn[slug].title,
    href: `/services/${slug}/`,
    description: servicesEn[slug].meta.description,
  }));
  return (
    <PageShell locale="en" alternateHref="/es/">
      <HubPage
        hub={servicesHub}
        items={items}
        site={en}
        breadcrumbs={[
          { name: LABELS.en.home, path: "/" },
          { name: LABELS.en.services, path: "/services/" },
        ]}
      />
    </PageShell>
  );
}
