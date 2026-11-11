import type { Crumb } from "@/components/content/Breadcrumbs";
import { PageHero } from "@/components/content/PageHero";
import type { SiteContent } from "@/content/types";

export function PrivacyPage({ privacy, breadcrumbs }: { privacy: SiteContent["privacy"]; breadcrumbs: Crumb[] }) {
  return (
    <>
      <PageHero breadcrumbs={breadcrumbs} eyebrow={privacy.updated} h1={privacy.title} />
      <article className="container-page max-w-[880px] pt-[clamp(36px,6vw,64px)] pb-[clamp(56px,8vw,104px)]">
      <div className="flex flex-col border-t border-line">
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
    </>
  );
}
