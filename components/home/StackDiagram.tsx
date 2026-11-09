"use client";

import { useReducedMotion } from "motion/react";
import { forwardRef, useRef, type ReactNode } from "react";
import { Logo } from "@/components/site/Logo";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import type { StackContent } from "@/content/types";

const Node = forwardRef<HTMLSpanElement, { children: ReactNode }>(function Node({ children }, ref) {
  return (
    <span
      ref={ref}
      className="relative z-10 rounded-[2px] border border-edge bg-ink px-2.5 py-1 font-mono text-[clamp(10.5px,1.8vw,12px)] whitespace-nowrap text-soft"
    >
      {children}
    </span>
  );
});

const BEAM_STYLE = {
  pathColor: "#252a26",
  pathOpacity: 1,
  pathWidth: 1.5,
  gradientStartColor: "#67d69e",
  gradientStopColor: "#84e4b5",
  duration: 2.8,
};

export function StackDiagram({ diagram }: { diagram: StackContent["diagram"] }) {
  const still = useReducedMotion() ?? false;
  const container = useRef<HTMLDivElement>(null);
  const agent = useRef<HTMLSpanElement>(null);
  const in0 = useRef<HTMLSpanElement>(null);
  const in1 = useRef<HTMLSpanElement>(null);
  const in2 = useRef<HTMLSpanElement>(null);
  const out0 = useRef<HTMLSpanElement>(null);
  const out1 = useRef<HTMLSpanElement>(null);
  const out2 = useRef<HTMLSpanElement>(null);
  const [i0, i1, i2] = diagram.inputs;
  const [o0, o1, o2] = diagram.outputs;

  return (
    <div
      ref={container}
      role="img"
      aria-label={`${diagram.label}: ${diagram.inputs.join(", ")} → ${diagram.outputs.join(", ")}`}
      className="relative mx-auto grid aspect-[620/300] w-full max-w-[620px] grid-cols-[1fr_auto_1fr] items-center"
    >
      <div className="flex h-full flex-col items-start justify-around">
        <Node ref={in0}>{i0}</Node>
        <Node ref={in1}>{i1}</Node>
        <Node ref={in2}>{i2}</Node>
      </div>
      <span
        ref={agent}
        className="relative z-10 flex h-[clamp(56px,11vw,72px)] w-[clamp(56px,11vw,72px)] items-center justify-center rounded-[4px] border border-mint bg-ink shadow-[0_0_0_6px_rgba(103,214,158,0.08)]"
      >
        <Logo size={30} wordmark={false} />
      </span>
      <div className="flex h-full flex-col items-end justify-around">
        <Node ref={out0}>{o0}</Node>
        <Node ref={out1}>{o1}</Node>
        <Node ref={out2}>{o2}</Node>
      </div>
      <AnimatedBeam {...BEAM_STYLE} still={still} containerRef={container} fromRef={in0} toRef={agent} curvature={40} delay={0} />
      <AnimatedBeam {...BEAM_STYLE} still={still} containerRef={container} fromRef={in1} toRef={agent} curvature={0} delay={0.45} />
      <AnimatedBeam {...BEAM_STYLE} still={still} containerRef={container} fromRef={in2} toRef={agent} curvature={-40} delay={0.9} />
      <AnimatedBeam {...BEAM_STYLE} still={still} containerRef={container} fromRef={agent} toRef={out0} curvature={40} delay={1.4} />
      <AnimatedBeam {...BEAM_STYLE} still={still} containerRef={container} fromRef={agent} toRef={out1} curvature={0} delay={1.85} />
      <AnimatedBeam {...BEAM_STYLE} still={still} containerRef={container} fromRef={agent} toRef={out2} curvature={-40} delay={2.3} />
    </div>
  );
}
