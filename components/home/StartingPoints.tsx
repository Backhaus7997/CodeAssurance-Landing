import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { StartingPoint } from "@/content/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const TONE = { mint: "text-mint", wait: "text-wait", muted: "text-muted" } as const;

export function StartingPoints({ items, className }: { items: StartingPoint[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3", className)}>
      {items.map((item, i) => (
        // The cell stays opaque so the 1px grid lines never show through while its content reveals.
        <div key={item.title} className="relative bg-ink px-5 pt-[22px] pb-6">
          <GlowingEffect disabled={false} proximity={64} spread={36} inactiveZone={0.01} borderWidth={1} />
          <Reveal delay={i * 80} className="flex flex-col gap-2">
            {item.tag && <span className={cn("font-mono text-[12px]", TONE[item.tone])}>{item.tag}</span>}
            <h3 className="m-0 text-[19px] font-semibold">{item.title}</h3>
            <p className="m-0 text-[15.5px] text-soft">{item.text}</p>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
