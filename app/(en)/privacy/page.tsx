import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { PrivacyPage } from "@/components/site/PrivacyPage";
import { en } from "@/content/en";
import { LABELS } from "@/content/pages/labels";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/privacy/",
  alternatePath: "/es/privacy/",
  title: en.privacy.meta.title,
  description: en.privacy.meta.description,
});

export default function Page() {
  return (
    <PageShell locale="en" alternateHref="/es/privacy/">
      <PrivacyPage
        privacy={en.privacy}
        breadcrumbs={[
          { name: LABELS.en.home, path: "/" },
          { name: en.privacy.title, path: "/privacy/" },
        ]}
      />
    </PageShell>
  );
}
