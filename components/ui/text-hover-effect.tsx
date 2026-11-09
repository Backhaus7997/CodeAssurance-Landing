"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Adapted from Aceternity UI's TextHoverEffect: a wide viewBox that fits the wordmark, the mint
// palette, unique SVG ids, the outline drawn once when it scrolls into view (skipped with reduced
// motion), and the mask position set from the pointer without an effect.
export const TextHoverEffect = ({ text, className }: { text: string; className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [mask, setMask] = useState({ cx: "50%", cy: "50%" });
  const uid = useId().replace(/:/g, "");
  const gradientId = `ca-wm-gradient-${uid}`;
  const revealId = `ca-wm-reveal-${uid}`;
  const maskId = `ca-wm-mask-${uid}`;

  const textProps = {
    x: "50%",
    y: "54%",
    textAnchor: "middle" as const,
    dominantBaseline: "middle" as const,
    strokeWidth: 0.6,
    style: { fontStretch: "125%" },
    className: "fill-transparent font-sans text-[104px] font-extrabold uppercase",
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 130"
      aria-hidden="true"
      className={cn("block w-full select-none", className)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMask({
          cx: `${((e.clientX - rect.left) / rect.width) * 100}%`,
          cy: `${((e.clientY - rect.top) / rect.height) * 100}%`,
        });
      }}
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#84e4b5" />
          <stop offset="50%" stopColor="#67d69e" />
          <stop offset="100%" stopColor="#4cbd85" />
        </linearGradient>
        <motion.radialGradient
          id={revealId}
          gradientUnits="userSpaceOnUse"
          r="18%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={mask}
          transition={{ duration: 0 }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${revealId})`} />
        </mask>
      </defs>
      <motion.text
        {...textProps}
        stroke="#3a403b"
        initial={reduce ? false : { strokeDashoffset: 1600, strokeDasharray: 1600 }}
        animate={inView || reduce ? { strokeDashoffset: 0, strokeDasharray: 1600 } : undefined}
        transition={{ duration: 2.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {text}
      </motion.text>
      <text {...textProps} stroke={`url(#${gradientId})`} mask={`url(#${maskId})`} opacity={hovered ? 1 : 0}>
        {text}
      </text>
    </svg>
  );
};
