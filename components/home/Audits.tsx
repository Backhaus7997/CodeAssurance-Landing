import { SectionHeader } from "@/components/site/SectionHeader";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/content/types";
import { AuditVisual } from "./AuditVisual";

export function Audits({ audits, servicesBase }: { audits: SiteContent["audits"]; servicesBase: "/services" | "/es/services" }) {
  return (
    <section id="audits" className="border-t border-line">
      <div className="container-page py-[clamp(56px,8vw,104px)]">
        <SectionHeader index={audits.index} label={audits.label} title={audits.title} description={audits.description} />
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {audits.items.map((audit, i) => (
            // The cell stays opaque so the 1px grid lines never show through while its content reveals.
            <div key={audit.slug} className="relative flex flex-col bg-ink">
              <GlowingEffect disabled={false} proximity={64} spread={36} inactiveZone={0.01} borderWidth={1} />
              <Reveal delay={i * 80} className="flex flex-1 flex-col">
                <AuditVisual kind={audit.visual} exampleLabel={audits.exampleLabel} />
                <div className="flex flex-1 flex-col gap-2.5 px-5 pt-5 pb-[22px]">
                  <h3 className="m-0 text-[20px] font-semibold">{audit.title}</h3>
                  <p className="m-0 text-[15.5px] text-soft">{audit.summary}</p>
                  <a
                    href={`${servicesBase}/${audit.slug}/`}
                    className="group mt-auto inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-mint no-underline"
                  >
                    {audit.cta}
                    <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
