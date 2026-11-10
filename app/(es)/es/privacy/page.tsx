import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { PrivacyPage } from "@/components/site/PrivacyPage";
import { es } from "@/content/es";
import { LABELS } from "@/content/pages/labels";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  path: "/es/privacy/",
  alternatePath: "/privacy/",
  title: es.privacy.meta.title,
  description: es.privacy.meta.description,
});

export default function Page() {
  return (
    <PageShell locale="es" alternateHref="/privacy/">
      <PrivacyPage
        privacy={es.privacy}
        breadcrumbs={[
          { name: LABELS.es.home, path: "/es/" },
          { name: es.privacy.title, path: "/es/privacy/" },
        ]}
      />
    </PageShell>
  );
}
