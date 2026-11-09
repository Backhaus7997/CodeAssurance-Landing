import { SectionHeader } from "@/components/site/SectionHeader";
import { Timeline } from "@/components/ui/timeline";
import type { SiteContent } from "@/content/types";

export function ProcessTimeline({ process }: { process: SiteContent["process"] }) {
  const data = process.steps.map((step, i) => ({
    id: step.title,
    title: (
      <div className="flex items-baseline gap-3.5">
        <span className="font-mono text-[13px] text-mint">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="display m-0 text-[clamp(26px,3vw,40px)] leading-none">{step.title}</h3>
      </div>
    ),
    content: (
      <div data-testid="process-step" className="flex flex-col gap-3">
        <p className="m-0 text-[18px] text-paper">{step.summary}</p>
        <p className="eyebrow m-0 mt-1.5">{process.deliverablesLabel}</p>
        <ul className="m-0 flex list-disc flex-col gap-1.5 pl-[18px] text-soft marker:text-dim">
          {step.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="process" className="border-t border-line">
      <div className="container-page py-[clamp(56px,8vw,104px)]">
        <SectionHeader index={process.index} label={process.label} title={process.title} description={process.description} />
        <Timeline data={data} className="mt-14" />
      </div>
    </section>
  );
}
