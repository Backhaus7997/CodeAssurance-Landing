import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { StartingPoint } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const TONE = { mint: "text-mint", wait: "text-wait", muted: "text-muted" } as const;

export function StartingPoints({ items, className }: { items: StartingPoint[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-px border border-line bg-line", className)}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 80} className="relative flex flex-col gap-2 bg-ink px-5 pt-[22px] pb-6">
          <GlowingEffect disabled={false} proximity={64} spread={36} inactiveZone={0.01} borderWidth={1} />
          {item.tag && <span className={cn("font-mono text-[12px]", TONE[item.tone])}>{item.tag}</span>}
          <h3 className="m-0 text-[19px] font-semibold">{item.title}</h3>
          <p className="m-0 text-[15.5px] text-soft">{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
