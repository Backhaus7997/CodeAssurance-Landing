import { DraftPullRequest } from "@/components/home/DraftPullRequest";
import { HeroGrid } from "@/components/home/HeroGrid";
import { Plans } from "@/components/home/Plans";
import { StackDiagram } from "@/components/home/StackDiagram";
import { StackMarquee } from "@/components/home/StackMarquee";
import { Start } from "@/components/home/Start";
import { StartingPoints } from "@/components/home/StartingPoints";
import { Team } from "@/components/home/Team";
import { TriageDemo } from "@/components/home/TriageDemo";
import { PrimaryCta } from "@/components/site/PrimaryCta";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL } from "@/content/site";
import type { HowWeWorkContent } from "@/content/types";

const SECTION = "container-page py-[clamp(56px,8vw,104px)]";

export function HowWeWorkPage({ content }: { content: HowWeWorkContent }) {
  const { hero, pr, stack, agent, plans } = content;
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroGrid />
        <div className="container-page relative flex flex-wrap items-start gap-x-14 gap-y-10 pt-[clamp(36px,6vw,80px)] pb-[clamp(48px,6vw,88px)]">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
            <h1 className="display m-0 text-[clamp(31px,4.4vw,56px)] leading-[0.98]">{hero.title}</h1>
            <p className="m-0 max-w-[46ch] text-[18px] text-soft">{hero.lead}</p>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryCta bookLabel={hero.primaryCta} emailLabel={hero.emailCta} />
              <a
                href="#stack"
                className="press inline-flex min-h-[50px] items-center rounded-[2px] border border-line bg-black/60 px-5 font-semibold text-paper no-underline hover:border-muted"
              >
                {hero.secondaryCta}
              </a>
            </div>
            <p className="m-0 text-[15px] text-muted">
              {hero.emailPrefix}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <DraftPullRequest pr={pr} className="min-w-0 flex-[1_1_460px]" />
        </div>
      </section>

      <section id="stack" className="border-t border-line">
        <div className={SECTION}>
          <SectionHeader index={stack.index} label={stack.label} title={stack.title} description={stack.description} />
          <div className="flex flex-wrap items-center gap-x-14 gap-y-10">
            <dl className="m-0 flex min-w-0 flex-[1_1_420px] flex-col border-t border-line">
              {stack.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-b border-line py-3">
                  <dt className="eyebrow pt-0.5">{row.label}</dt>
                  <dd className="m-0 text-[15.5px] text-soft">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="min-w-0 flex-[1_1_420px]">
              <StackDiagram diagram={stack.diagram} />
            </div>
          </div>
          <StackMarquee marquee={stack.marquee} label={stack.diagram.label} />
        </div>
      </section>

      <section id="agent" className="border-t border-line">
        <div className={SECTION}>
          <SectionHeader index={agent.index} label={agent.label} title={agent.title} description={agent.description} />
          <ol className="m-0 grid list-none grid-cols-1 gap-px border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
            {agent.stages.map((stage, i) => (
              <li key={stage.name} data-testid="stage" className="bg-ink px-[18px] pt-[18px] pb-5">
                <Reveal delay={(i % 4) * 70} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[12px] text-mint">{String(i + 1).padStart(2, "0")}</span>
                  <b className="font-mono text-[15px] font-medium">{stage.name}</b>
                  <span className="text-[15px] leading-[1.45] text-muted">{stage.description}</span>
                </Reveal>
              </li>
            ))}
          </ol>

          <StartingPoints items={agent.startingPoints} className="mt-14" />

          <p className="eyebrow m-0 mt-16 mb-4">{agent.extrasLabel}</p>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
            {agent.extras.map((extra, i) => (
              <Reveal key={extra.title} delay={i * 80} className="flex flex-col gap-1.5 border-t border-line pt-4">
                <h3 className="m-0 text-[19px] font-semibold">{extra.title}</h3>
                <p className="m-0 text-[15.5px] text-soft">{extra.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <p className="eyebrow m-0 mb-4">{agent.triage.label}</p>
            <TriageDemo triage={agent.triage} />
          </Reveal>
        </div>
      </section>

      <section id="plans" className="border-t border-line">
        <div className={SECTION}>
          <SectionHeader index={plans.index} label={plans.label} title={plans.title} description={plans.description} />
          <Plans packages={plans.packages} />
          <p className="m-0 mt-8 max-w-[70ch] text-soft">{plans.specialists}</p>
        </div>
      </section>

      <Team team={content.team} />
      <Start start={content.start} />
    </>
  );
}
