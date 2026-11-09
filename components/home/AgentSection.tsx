import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/content/types";
import { AgentRun } from "./AgentRun";
import { DraftPullRequest } from "./DraftPullRequest";
import { StackDiagram } from "./StackDiagram";
import { StackMarquee } from "./StackMarquee";
import { StartingPoints } from "./StartingPoints";
import { TriageDemo } from "./TriageDemo";

export function AgentSection({ content }: { content: SiteContent }) {
  const { agent } = content;
  return (
    <section id="agent" className="border-t border-line">
      <div className="container-page py-[clamp(56px,8vw,104px)]">
        <SectionHeader index={agent.index} label={agent.label} title={agent.title} description={agent.description} />

        <div className="flex flex-wrap items-stretch gap-8">
          <AgentRun run={agent.run} className="min-w-0 flex-[1_1_460px]" />
          <DraftPullRequest pr={agent.pr} className="min-w-0 flex-[1_1_520px]" />
        </div>

        <Reveal className="mt-16">
          <p className="eyebrow m-0 mb-4">{agent.triage.label}</p>
          <TriageDemo triage={agent.triage} />
        </Reveal>

        <div className="mt-20 flex flex-wrap items-center gap-x-14 gap-y-8">
          <Reveal className="flex min-w-0 flex-[1_1_340px] flex-col gap-3.5">
            <h3 className="m-0 text-[24px] leading-[1.2] font-semibold">{agent.stack.title}</h3>
            <p className="m-0 text-soft">{agent.stack.description}</p>
            <dl className="m-0 mt-1.5 flex flex-col border-t border-line">
              {agent.stack.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-line py-2.5">
                  <dt className="eyebrow pt-0.5">{row.label}</dt>
                  <dd className="m-0 text-[15px] text-soft">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="min-w-0 flex-[1_1_420px]">
            <StackDiagram diagram={agent.stack.diagram} />
          </div>
        </div>

        <StackMarquee marquee={agent.stack.marquee} label={agent.stack.diagram.label} />

        <StartingPoints items={agent.startingPoints} className="mt-14" />
      </div>
    </section>
  );
}
