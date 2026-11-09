"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useLiveMotion } from "@/hooks/use-live-motion";

export function HeroGrid() {
  const live = useLiveMotion();
  return (
    <FlickeringGrid
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_75%_20%,#000_20%,transparent_72%)]"
      squareSize={3}
      gridGap={7}
      color="#67d69e"
      maxOpacity={0.28}
      flickerChance={0.12}
      animate={live}
    />
  );
}
