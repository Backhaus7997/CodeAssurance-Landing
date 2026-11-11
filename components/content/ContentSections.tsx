import { Reveal } from "@/components/ui/reveal";
import type { ContentSection } from "@/content/pages/types";

/** id of the n-th section (1-based); the guides' table of contents links to it. */
export const sectionId = (n: number) => `section-${n}`;

/**
 * The body of a text page: each section is an h2 with its paragraphs and an optional list. `numbered` (guides)
 * adds a mono number beside each section, an id for the table of contents and the section's pull quote.
 */
export function ContentSections({ sections, numbered = false }: { sections: ContentSection[]; numbered?: boolean }) {
  return (
    <div className={`flex flex-col gap-[clamp(36px,5vw,56px)] ${numbered ? "" : "container-page max-w-[820px] py-[clamp(48px,6vw,80px)]"}`}>
      {sections.map((section, i) => (
        <section
          key={section.heading}
          id={numbered ? sectionId(i + 1) : undefined}
          className={numbered ? "grid scroll-mt-28 grid-cols-[44px_minmax(0,1fr)] gap-x-4" : "flex flex-col gap-4"}
        >
          {numbered && <span className="pt-1.5 font-mono text-[14px] text-mint">{String(i + 1).padStart(2, "0")}</span>}
          <Reveal className="flex flex-col gap-4">
            <h2 className="display m-0 text-[clamp(22px,2.6vw,30px)] leading-[1.05]">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="m-0 max-w-[68ch] text-[17px] leading-[1.6] text-soft">
                {paragraph}
              </p>
            ))}
            {numbered && section.pull && (
              <p className="m-0 max-w-[32ch] border-l-2 border-mint py-3 pl-5 text-[22px] leading-[1.4] font-semibold text-paper">{section.pull}</p>
            )}
            {section.bullets && (
              <ul className="m-0 flex max-w-[68ch] list-none flex-col gap-2.5 p-0">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[17px] leading-[1.55] text-soft">
                    <span aria-hidden="true" className="mt-[10px] inline-block h-2 w-2 shrink-0 bg-mint" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </section>
      ))}
    </div>
  );
}
