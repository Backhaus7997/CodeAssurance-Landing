import type { Metadata } from "next";
import { TopicPage } from "@/components/content/TopicPage";
import { PageShell } from "@/components/site/PageShell";
import { en } from "@/content/en";
import { LABELS } from "@/content/pages/labels";
import { pricing } from "@/content/pricing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/pricing/",
  title: pricing.seo.title,
  description: pricing.seo.description,
});

export default function Page() {
  return (
    <PageShell locale="en" alternateHref="/es/">
      <TopicPage
        copy={pricing}
        site={en}
        faqTitle="FAQs"
        relatedTitle={LABELS.en.related}
        breadcrumbs={[
          { name: LABELS.en.home, path: "/" },
          { name: pricing.h1, path: "/pricing/" },
        ]}
      />
    </PageShell>
  );
}
