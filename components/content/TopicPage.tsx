import type { ReactNode } from "react";
import type { PageCopy } from "@/content/pages/types";
import type { SiteContent } from "@/content/types";
import { CtaBand } from "./CtaBand";
import type { Crumb } from "./Breadcrumbs";
import { ContentSections, sectionId } from "./ContentSections";
import { ReadingProgress } from "./ReadingProgress";
import { ShortAnswer } from "./ShortAnswer";
import { TableOfContents } from "./TableOfContents";
import { Block } from "./Block";
import { Faq } from "./Faq";
import { StepsTimeline } from "./StepsTimeline";
import { PageHero } from "./PageHero";
import { RelatedLinks } from "./RelatedLinks";

type Props = {
  copy: PageCopy;
  breadcrumbs: Crumb[];
  relatedTitle: string;
  faqTitle: string;
  /** Heading of the steps band, when the copy has steps. */
  stepsTitle?: string;
  /** Guides: short-answer box, numbered sections, table of contents and reading progress. */
  guide?: { shortAnswerLabel: string };
  site: SiteContent;
  /** Shown between the answer and the sections (the guides put their byline here). */
  children?: ReactNode;
};

/** A text page built to be quoted: h1, direct answer, sections, FAQs, related pages and the call to action. */
const pad = (n: number) => String(n).padStart(2, "0");

export function TopicPage({ copy, breadcrumbs, relatedTitle, faqTitle, stepsTitle = "How it works", guide, site, children }: Props) {
  // Numbering runs through the whole page: steps, then each text section, then FAQs and related pages.
  const afterSteps = copy.steps ? 2 : 1;
  const afterSections = afterSteps + copy.sections.length;
  return (
    <>
      <article>
        {guide && <ReadingProgress />}
        <PageHero breadcrumbs={breadcrumbs} eyebrow={copy.eyebrow} h1={copy.h1} answer={guide ? undefined : copy.answer}>
          {children}
          {guide && <ShortAnswer label={guide.shortAnswerLabel} text={copy.answer} />}
        </PageHero>
        {copy.steps && (
          <Block title={stepsTitle} index="01">
            <StepsTimeline steps={copy.steps} />
          </Block>
        )}
        {guide ? (
          <div className="container-page grid grid-cols-1 gap-14 py-[clamp(48px,6vw,80px)] min-[900px]:grid-cols-[220px_minmax(0,1fr)]">
            <TableOfContents items={copy.sections.map((s, i) => ({ id: sectionId(i + 1), label: s.heading }))} />
            <ContentSections sections={copy.sections} numbered />
          </div>
        ) : (
          <div className="container-page max-w-[880px] py-[clamp(48px,6vw,80px)]">
            <ContentSections sections={copy.sections} numbered start={afterSteps} />
          </div>
        )}
      </article>
      <Faq title={faqTitle} items={copy.faq} index={pad(afterSections)} />
      <RelatedLinks title={relatedTitle} hrefs={copy.related} index={pad(afterSections + 1)} />
      <CtaBand start={site.start} />
    </>
  );
}
