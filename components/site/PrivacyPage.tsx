import type { SiteContent } from "@/content/types";

export function PrivacyPage({ privacy }: { privacy: SiteContent["privacy"] }) {
  return (
    <article className="container-page max-w-[880px] pt-[clamp(36px,6vw,80px)] pb-[clamp(56px,8vw,104px)]">
      <h1 className="display m-0 text-[clamp(30px,4.4vw,52px)] leading-none">{privacy.title}</h1>
      <p className="eyebrow m-0 mt-4">{privacy.updated}</p>
      <div className="mt-10 flex flex-col border-t border-line">
        {privacy.sections.map((section) => (
          <section key={section.heading} className="flex flex-wrap gap-x-10 gap-y-3 border-b border-line py-6">
            <h2 className="m-0 flex-[0_0_220px] text-[17px] font-semibold">{section.heading}</h2>
            <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3 text-soft">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="m-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
