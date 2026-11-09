"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useLiveMotion } from "@/hooks/use-live-motion";

// A loop: rendered only while its card is on screen, and never for people who asked for less motion.
// The moving square is masked but still takes layout space, so the wrapper clips it.
export function CardBeam() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLiveMotion();
  const inView = useInView(ref);
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {live && inView && <BorderBeam size={90} duration={6} colorFrom="#67d69e" colorTo="#84e4b5" />}
    </div>
  );
}
