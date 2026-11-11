import type { Guide } from "@/content/pages/types";
import type { SiteContent } from "@/content/types";
import { articleLd } from "@/lib/jsonld";
import { Byline } from "./Byline";
import type { Crumb } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { TopicPage } from "./TopicPage";

/** A guide: a topic page with its authors, dates and Article data. */
export function GuidePage({ guide, path, breadcrumbs, relatedTitle, site }: { guide: Guide; path: string; breadcrumbs: Crumb[]; relatedTitle: string; site: SiteContent }) {
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: guide.h1,
          description: guide.seo.description,
          path,
          authors: guide.authors,
          published: guide.published,
          updated: guide.updated,
        })}
      />
      <TopicPage copy={guide} breadcrumbs={breadcrumbs} relatedTitle={relatedTitle} faqTitle="FAQs" site={site} guide={{ shortAnswerLabel: "Short answer" }}>
        <Byline authors={guide.authors} published={guide.published} updated={guide.updated} />
      </TopicPage>
    </>
  );
}
