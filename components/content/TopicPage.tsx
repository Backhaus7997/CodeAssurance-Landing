import type { ReactNode } from "react";
import type { PageCopy } from "@/content/pages/types";
import type { SiteContent } from "@/content/types";
import { CtaBand } from "./CtaBand";
import { AnswerLead } from "./AnswerLead";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { ContentSections } from "./ContentSections";
import { Faq } from "./Faq";
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
        <header className="container-page pt-[clamp(28px,5vw,72px)] pb-[clamp(8px,2vw,16px)]">
          <Breadcrumbs trail={breadcrumbs} className="mb-[clamp(20px,3vw,36px)]" />
          <div className="flex max-w-[860px] flex-col gap-5">
            <p className="eyebrow m-0">{copy.eyebrow}</p>
            <h1 className="display m-0 text-[clamp(32px,5vw,60px)] leading-[0.98]">{copy.h1}</h1>
            <AnswerLead text={copy.answer} />
            {children}
          </div>
        </header>
        <ContentSections sections={copy.sections} />
      </article>
      <Faq title={faqTitle} items={copy.faq} />
      <RelatedLinks title={relatedTitle} hrefs={copy.related} />
      <CtaBand start={site.start} />
    </>
  );
}
