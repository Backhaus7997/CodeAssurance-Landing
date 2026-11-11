import type { ReactNode } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

/** A dark card whose border lights up near the cursor, like the plan tiers on the home. */
export function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-glow-card="" className={`relative bg-ink ${className}`}>
      <GlowingEffect disabled={false} proximity={48} spread={30} inactiveZone={0.01} borderWidth={1} />
      {children}
    </div>
  );
}
