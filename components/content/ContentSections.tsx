import type { ContentSection } from "@/content/pages/types";

/** The body of a text page: each section is an h2 with its paragraphs and an optional list. */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="container-page flex max-w-[820px] flex-col gap-[clamp(36px,5vw,56px)] py-[clamp(48px,6vw,80px)]">
      {sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-4">
          <h2 className="display m-0 text-[clamp(22px,2.6vw,30px)] leading-[1.05]">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0 text-[17px] leading-[1.6] text-soft">
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[17px] leading-[1.55] text-soft">
                  <span aria-hidden="true" className="mt-[10px] inline-block h-2 w-2 shrink-0 bg-mint" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
