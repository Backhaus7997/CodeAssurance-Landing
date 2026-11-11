"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useLiveMotion } from "@/hooks/use-live-motion";
import { useStepper } from "@/hooks/use-stepper";

/** Step of a looping visual: runs only with motion allowed and while on screen; otherwise the final state. */
export function useVisualStep(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLiveMotion();
  const inView = useInView(ref);
  const step = useStepper(count, live && inView);
  return { ref, step };
}
