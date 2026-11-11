import type { HubCopy } from "@/content/pages/types";
import type { SiteContent } from "@/content/types";
import { CtaBand } from "./CtaBand";
import { itemListLd } from "@/lib/jsonld";
import type { Crumb } from "./Breadcrumbs";
import { PageHero } from "./PageHero";
import { JsonLd } from "./JsonLd";

export type HubItem = { label: string; href: string; description: string };

/** An index page: h1, direct answer and a list of the pages in its section. */
export function HubPage({ hub, items, breadcrumbs, site }: { hub: HubCopy; items: HubItem[]; breadcrumbs: Crumb[]; site: SiteContent }) {
  return (
    <>
      <JsonLd data={itemListLd(items.map((item) => ({ name: item.label, path: item.href })))} />
      <PageHero breadcrumbs={breadcrumbs} eyebrow={hub.eyebrow} h1={hub.h1} answer={hub.answer} />
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
