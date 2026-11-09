import { TextReveal } from "@/components/ui/text-reveal";
import type { TeamContent } from "@/content/types";

export function Team({ team }: { team: TeamContent }) {
  return (
    <section id="team" className="border-t border-line">
      <div className="container-page py-[clamp(56px,8vw,104px)]">
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <p className="eyebrow m-0 flex-[0_0_160px]">
            {team.index} / {team.label}
          </p>
          <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-7">
            <h2 className="display m-0 text-[clamp(27px,3.4vw,42px)] leading-none">{team.title}</h2>
            <div data-testid="team-statement">
              <TextReveal textClassName="max-w-[34ch] text-[clamp(22px,2.5vw,32px)] leading-[1.3] font-medium">{team.statement}</TextReveal>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {team.location && <p className="m-0 flex-[1_1_300px] text-soft">{team.location}</p>}
              <div className="flex flex-[1_1_300px] flex-col gap-2 border-t border-line pt-3.5">
                <p className="eyebrow m-0">{team.trackRecordLabel}</p>
                <p className="m-0 text-paper">{team.trackRecord}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
