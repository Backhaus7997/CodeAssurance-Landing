"use client";

import { useReducedMotion } from "motion/react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function HeroGrid() {
  const reduce = useReducedMotion();
  return (
    <FlickeringGrid
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_75%_20%,#000_20%,transparent_72%)]"
      squareSize={3}
      gridGap={7}
      color="#67d69e"
      maxOpacity={0.28}
      flickerChance={0.12}
      animate={!reduce}
    />
  );
}
