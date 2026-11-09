import { SectionHeader } from "@/components/site/SectionHeader";
import type { SiteContent } from "@/content/types";
import { AgentSection } from "./AgentSection";
import { Audits } from "./Audits";
import { Hero } from "./Hero";
import { Plans } from "./Plans";
import { ProcessTimeline } from "./ProcessTimeline";
import { Team } from "./Team";

export function HomePage({ content }: { content: SiteContent }) {
  const { plans } = content;
  return (
    <>
      <Hero content={content} />
      <AgentSection content={content} />
      <ProcessTimeline process={content.process} />
      <section id="plans" className="border-t border-line">
        <div className="container-page py-[clamp(56px,8vw,104px)]">
          <SectionHeader index={plans.index} label={plans.label} title={plans.title} description={plans.description} />
          <Plans packages={plans.packages} />
        </div>
      </section>
      <Audits audits={content.audits} servicesBase={content.locale === "en" ? "/services" : "/es/services"} />
      <Team team={content.team} />
    </>
  );
}
