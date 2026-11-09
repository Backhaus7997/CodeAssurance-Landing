import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";
import type { SiteContent } from "@/content/types";

type Run = SiteContent["agent"]["run"];

const LINE = "grid grid-cols-[76px_minmax(0,1fr)] gap-2.5";

export function AgentRun({ run, className }: { run: Run; className?: string }) {
  return (
    <Terminal title={run.title} className={className}>
      <span data-testid="run-line" className="text-paper">
        <span className="text-mint">› </span>
        <TypingAnimation duration={28}>{run.command}</TypingAnimation>
      </span>
      {run.lines.map((line) => (
        <AnimatedSpan key={line.stage} data-testid="run-line" className={LINE}>
          <span className="text-mint">{line.stage}</span>
          <span className="text-soft">
            {line.detail}
            {line.flags?.bugs && (
              <>
                {" · "}
                <span className="text-bug">{line.flags.bugs}</span>
              </>
            )}
            {line.flags?.wait && (
              <>
                {" · "}
                <span className="text-wait">{line.flags.wait}</span>
              </>
            )}
          </span>
        </AnimatedSpan>
      ))}
      <AnimatedSpan className="mt-1.5 text-mint">✓ {run.done}</AnimatedSpan>
    </Terminal>
  );
}
