import type { Metadata } from "next";
import { HubPage } from "@/components/content/HubPage";
import { PageShell } from "@/components/site/PageShell";
import { en } from "@/content/en";
import { guidesByUpdated } from "@/content/guides";
import { guidesHub } from "@/content/hubs";
import { LABELS } from "@/content/pages/labels";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/guides/",
  title: guidesHub.seo.title,
  description: guidesHub.seo.description,
});

export default function Page() {
  const items = guidesByUpdated().map((guide) => ({
    label: guide.h1,
    href: `/guides/${guide.slug}/`,
    description: guide.seo.description,
  }));
  return (
    <PageShell locale="en" alternateHref="/es/">
      <HubPage
        hub={guidesHub}
        items={items}
        site={en}
        breadcrumbs={[
          { name: LABELS.en.home, path: "/" },
          { name: LABELS.en.guides, path: "/guides/" },
        ]}
      />
    </PageShell>
  );
}
