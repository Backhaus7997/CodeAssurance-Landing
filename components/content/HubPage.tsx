import type { HubCopy } from "@/content/pages/types";
import type { SiteContent } from "@/content/types";
import { CtaBand } from "./CtaBand";
import { itemListLd } from "@/lib/jsonld";
import { AnswerLead } from "./AnswerLead";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";

export type HubItem = { label: string; href: string; description: string };

/** An index page: h1, direct answer and a list of the pages in its section. */
export function HubPage({ hub, items, breadcrumbs, site }: { hub: HubCopy; items: HubItem[]; breadcrumbs: Crumb[]; site: SiteContent }) {
  return (
    <>
      <JsonLd data={itemListLd(items.map((item) => ({ name: item.label, path: item.href })))} />
      <section className="container-page pt-[clamp(28px,5vw,72px)] pb-[clamp(40px,5vw,64px)]">
        <Breadcrumbs trail={breadcrumbs} className="mb-[clamp(20px,3vw,36px)]" />
        <div className="flex max-w-[860px] flex-col gap-5">
          <p className="eyebrow m-0">{hub.eyebrow}</p>
          <h1 className="display m-0 text-[clamp(32px,5vw,64px)] leading-[0.98]">{hub.h1}</h1>
          <AnswerLead text={hub.answer} />
        </div>
      </section>
      <section className="border-t border-line">
        <ul data-testid="hub-list" className="container-page m-0 grid list-none grid-cols-1 gap-px bg-line p-0 py-px md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.href} className="bg-ink">
              <a href={item.href} className="flex h-full flex-col gap-2.5 px-5 py-6 no-underline transition-colors hover:bg-surface">
                <h2 className="m-0 text-[19px] font-semibold text-paper">{item.label} →</h2>
                <p className="m-0 text-[15.5px] text-soft">{item.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand start={site.start} />
    </>
  );
}
