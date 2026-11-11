import { AgentRun } from "@/components/home/AgentRun";
import { AuditVisual } from "@/components/home/AuditVisual";
import { DraftPullRequest } from "@/components/home/DraftPullRequest";
import { Reveal } from "@/components/ui/reveal";
import type { ServiceVisual as Visual } from "@/content/services/types";
import type { SiteContent } from "@/content/types";
import { ApiContract } from "./visuals/ApiContract";
import { ChecklistRun } from "./visuals/ChecklistRun";
import { PhoneTests } from "./visuals/PhoneTests";
import { SprintBoard } from "./visuals/SprintBoard";

/** Picks the hero visual a service declares in its content. */
export function ServiceVisual({ visual, site }: { visual: Visual; site: SiteContent }) {
  switch (visual.kind) {
    case "run":
      return (
        <div data-visual="run" aria-hidden="true">
          <AgentRun run={site.agent.run} />
        </div>
      );
    case "pr":
      return (
        <div data-visual="pr" aria-hidden="true">
          <DraftPullRequest pr={site.agent.pr} />
        </div>
      );
    case "audit":
      return (
        // Reveal gives the illustration its animate-in, as on the home's audit cards.
        <div data-visual="audit" aria-hidden="true" className="rounded-[6px] border border-edge bg-surface/95 p-5">
          <Reveal>
            <AuditVisual kind={visual.audit} exampleLabel={site.audits.exampleLabel} text={site.audits.visualText} />
          </Reveal>
        </div>
      );
    case "checklist":
      return <ChecklistRun {...visual} />;
    case "sprint":
      return <SprintBoard {...visual} />;
    case "phone":
      return <PhoneTests {...visual} />;
    case "api":
      return <ApiContract {...visual} />;
  }
}
