import { Block } from "@/components/content/Block";
import type { Crumb } from "@/components/content/Breadcrumbs";
import { PageHero } from "@/components/content/PageHero";
import { Faq } from "@/components/content/Faq";
import { JsonLd } from "@/components/content/JsonLd";
import { EvidenceList } from "@/components/content/EvidenceList";
import { GlowCard } from "@/components/content/GlowCard";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { StepsTimeline } from "@/components/content/StepsTimeline";
import { StackMarquee } from "@/components/home/StackMarquee";
import { Start } from "@/components/home/Start";
import { Reveal } from "@/components/ui/reveal";
import type { ServiceContent } from "@/content/services/types";
import type { SiteContent } from "@/content/types";
import { serviceLd } from "@/lib/jsonld";


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
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={eyebrow}
        h1={service.title}
        answer={service.answer}
        cta={{ bookLabel: site.start.primaryCta, emailLabel: site.start.emailCta }}
        secondary={{ label: service.headings.howItWorks, href: "#how" }}
      />

      <Block title={service.headings.deliverables} index="01">
        <Reveal className="mb-6 rounded-[4px] border border-line bg-surface px-5 py-5">
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
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {service.deliverables.map((item, i) => (
            <GlowCard key={item.title} className="px-5 py-6">
              <Reveal delay={i * 80} className="flex flex-col gap-2.5">
                <span className="font-mono text-[12px] text-mint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 text-[19px] font-semibold">{item.title}</h3>
                <p className="m-0 text-[15.5px] text-soft">{item.detail}</p>
              </Reveal>
            </GlowCard>
          ))}
        </div>
      </Block>

      <Block title={service.headings.howItWorks} testId="service-how" id="how" index="02">
        <StepsTimeline
          steps={service.howItWorks.map((card) => ({
            title: card.title.replace(/^Add-on:\s*/i, ""),
            bullets: card.bullets,
            badge: /^Add-on/i.test(card.title) ? "Add-on" : undefined,
          }))}
        />
      </Block>

      <Block title={service.headings.evidence} index="03">
        <EvidenceList items={service.evidence} />
        {service.evidenceNote && <p className="m-0 mt-8 font-semibold text-paper">{service.evidenceNote}</p>}
      </Block>

      <Block title={service.headings.tools} index="04">
        <div data-marquee="">
          <StackMarquee marquee={{ tools: service.tools.map((tool) => tool.title), languages: [] }} label={service.headings.tools} />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {service.tools.map((tool) => (
            <GlowCard key={tool.title} className="flex flex-col gap-2 px-5 py-5">
              <h3 className="m-0 text-[17px] font-semibold">{tool.title}</h3>
              <p className="m-0 text-[15px] text-soft">{tool.detail}</p>
            </GlowCard>
          ))}
        </div>
      </Block>

      <Faq title={service.headings.faqs} items={service.faqs} index="05" />

      <RelatedLinks title={relatedTitle} hrefs={service.related} index="06" />

      <Start start={site.start} form={site.form} />
    </>
  );
}
