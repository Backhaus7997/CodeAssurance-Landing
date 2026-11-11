import type { Metadata } from "next";
import { GuidePage } from "@/components/content/GuidePage";
import { PageShell } from "@/components/site/PageShell";
import { en } from "@/content/en";
import { guideBySlug, guides } from "@/content/guides";
import { LABELS } from "@/content/pages/labels";
import type { GuideSlug } from "@/content/pages/types";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: GuideSlug }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  return pageMetadata({
    locale: "en",
    path: `/guides/${slug}/`,
    title: guide.seo.title,
    description: guide.seo.description,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  const path = `/guides/${slug}/`;
  return (
    <PageShell locale="en" alternateHref="/es/">
      <GuidePage
        guide={guide}
        path={path}
        site={en}
        relatedTitle={LABELS.en.related}
        breadcrumbs={[
          { name: LABELS.en.home, path: "/" },
          { name: LABELS.en.guides, path: "/guides/" },
          { name: guide.h1, path },
        ]}
      />
    </PageShell>
  );
}
