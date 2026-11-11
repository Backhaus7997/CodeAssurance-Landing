import type { ReactNode } from "react";
import type { PageCopy } from "@/content/pages/types";
import type { SiteContent } from "@/content/types";
import { CtaBand } from "./CtaBand";
import type { Crumb } from "./Breadcrumbs";
import { ContentSections } from "./ContentSections";
import { Faq } from "./Faq";
import { PageHero } from "./PageHero";
import { RelatedLinks } from "./RelatedLinks";

type Props = {
  copy: PageCopy;
  breadcrumbs: Crumb[];
  relatedTitle: string;
  faqTitle: string;
  site: SiteContent;
  /** Shown between the answer and the sections (the guides put their byline here). */
  children?: ReactNode;
};

/** A text page built to be quoted: h1, direct answer, sections, FAQs, related pages and the call to action. */
export function TopicPage({ copy, breadcrumbs, relatedTitle, faqTitle, site, children }: Props) {
  return (
    <>
      <article>
        <PageHero breadcrumbs={breadcrumbs} eyebrow={copy.eyebrow} h1={copy.h1} answer={copy.answer}>
          {children}
        </PageHero>
        <ContentSections sections={copy.sections} />
      </article>
      <Faq title={faqTitle} items={copy.faq} />
      <RelatedLinks title={relatedTitle} hrefs={copy.related} />
      <CtaBand start={site.start} />
    </>
  );
}
