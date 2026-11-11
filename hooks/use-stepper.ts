"use client";

import { useEffect, useState } from "react";
import { stepAt } from "@/lib/stepper";

/** Loops 0…count while `running`; returns `count` (the finished state) when it isn't. */
export function useStepper(count: number, running: boolean, stepMs = 520, pauseMs = 1800): number {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    const id = window.setInterval(() => setStep(stepAt(performance.now() - start, count, stepMs, pauseMs)), 120);
    return () => window.clearInterval(id);
  }, [running, count, stepMs, pauseMs]);
  return running ? step : count;
}
