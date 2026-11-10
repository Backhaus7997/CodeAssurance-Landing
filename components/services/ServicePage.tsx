import { AnswerLead } from "@/components/content/AnswerLead";
import { Block } from "@/components/content/Block";
import { Breadcrumbs, type Crumb } from "@/components/content/Breadcrumbs";
import { Faq } from "@/components/content/Faq";
import { JsonLd } from "@/components/content/JsonLd";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { Start } from "@/components/home/Start";
import { PrimaryCta } from "@/components/site/PrimaryCta";
import { Reveal } from "@/components/ui/reveal";
import type { ServiceContent } from "@/content/services/types";
import type { SiteContent } from "@/content/types";
import { serviceLd } from "@/lib/jsonld";

const DETAILS =
  "group border-b border-line [&_summary::-webkit-details-marker]:hidden";
const SUMMARY =
  "flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 py-3.5 text-[17px] font-semibold";

type Props = {
  service: ServiceContent;
  site: SiteContent;
  eyebrow: string;
  path: string;
  breadcrumbs: Crumb[];
  relatedTitle: string;
};

export function ServicePage({ service, site, eyebrow, path, breadcrumbs, relatedTitle }: Props) {
  return (
    <>
      <JsonLd data={serviceLd({ name: service.title, description: service.meta.description, path, serviceType: service.title })} />
      <section className="container-page pt-[clamp(28px,5vw,72px)] pb-[clamp(40px,5vw,64px)]">
        <Breadcrumbs trail={breadcrumbs} className="mb-[clamp(20px,3vw,36px)]" />
        <div className="flex flex-wrap items-end gap-x-14 gap-y-8">
          <div className="flex min-w-0 flex-[2_1_520px] flex-col gap-5">
            <p className="eyebrow m-0">{eyebrow}</p>
            <h1 className="display m-0 text-[clamp(30px,4.4vw,56px)] leading-[0.98]">{service.title}</h1>
            <AnswerLead text={service.answer} />
            <div>
              <PrimaryCta bookLabel={site.start.primaryCta} emailLabel={site.start.emailCta} />
            </div>
          </div>
          <Reveal className="min-w-0 flex-[1_1_340px] rounded-[4px] border border-line bg-surface px-5 py-5">
            <p className="eyebrow m-0 mb-3">{service.promiseLabel}</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {service.promise.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15.5px] text-soft">
                  <span aria-hidden="true" className="mt-[7px] inline-block h-2 w-2 shrink-0 bg-mint" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Block title={service.headings.deliverables}>
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {service.deliverables.map((item, i) => (
            <div key={item.title} className="bg-ink px-5 py-6">
              <Reveal delay={i * 80} className="flex flex-col gap-2.5">
                <span className="font-mono text-[12px] text-mint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 text-[19px] font-semibold">{item.title}</h3>
                <p className="m-0 text-[15.5px] text-soft">{item.detail}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Block>

      <Block title={service.headings.howItWorks} testId="service-how">
        <div className="border-t border-line">
          {service.howItWorks.map((card, i) => (
            <details key={card.title} open={i === 0} className={DETAILS}>
              <summary className={SUMMARY}>
                <span>{card.title}</span>
                <span aria-hidden="true" className="font-mono text-[22px] leading-none text-mint transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="m-0 flex list-disc flex-col gap-2 pb-5 pl-5 text-soft marker:text-dim">
                {card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Block>

      <Block title={service.headings.evidence}>
        <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-3 p-0 md:grid-cols-2">
          {service.evidence.map((item) => (
            <li key={item} className="flex items-start gap-3 font-mono text-[14px] text-soft">
              <span aria-hidden="true" className="mt-[7px] inline-block h-2 w-2 shrink-0 bg-mint/70" />
              {item}
            </li>
          ))}
        </ul>
        {service.evidenceNote && <p className="m-0 mt-8 font-semibold text-paper">{service.evidenceNote}</p>}
      </Block>

      <Block title={service.headings.tools}>
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {service.tools.map((tool) => (
            <div key={tool.title} className="flex flex-col gap-2 bg-ink px-5 py-5">
              <h3 className="m-0 text-[17px] font-semibold">{tool.title}</h3>
              <p className="m-0 text-[15px] text-soft">{tool.detail}</p>
            </div>
          ))}
        </div>
      </Block>

      <Faq title={service.headings.faqs} items={service.faqs} />

      <RelatedLinks title={relatedTitle} hrefs={service.related} />

      <Start start={site.start} form={site.form} />
    </>
  );
}
