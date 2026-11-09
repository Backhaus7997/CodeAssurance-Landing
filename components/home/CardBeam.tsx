"use client";

import { useReducedMotion } from "motion/react";
import { BorderBeam } from "@/components/ui/border-beam";

// The beam is a loop: it is not rendered at all for people who asked for less motion.
export function CardBeam() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  // The moving square is masked but still takes layout space: clip it so it can't widen the page.
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <BorderBeam size={90} duration={6} colorFrom="#67d69e" colorTo="#84e4b5" />
    </div>
  );
}
