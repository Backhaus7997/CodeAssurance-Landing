"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useLiveMotion } from "@/hooks/use-live-motion";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

// Adapted from Aceternity UI's Timeline: no demo header, site tokens, the beam grows with scaleY
// (a transform) instead of height, and without JavaScript or with reduced motion the line is full.
export const Timeline = ({ data, className }: { data: TimelineEntry[]; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLiveMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div aria-hidden="true" className="absolute top-2.5 bottom-10 left-[7px] w-0.5 bg-line" />
      <motion.div
        aria-hidden="true"
        style={live ? { scaleY } : undefined}
        className="absolute top-2.5 bottom-10 left-[7px] w-0.5 origin-top bg-mint"
      />
      {data.map((item) => (
        <div key={item.id} className="relative flex flex-wrap gap-x-12 gap-y-3.5 pb-16 pl-12 last:pb-6">
          <TimelineDot live={live} />
          <div className="min-w-0 flex-[1_1_260px] self-start md:sticky md:top-24">{item.title}</div>
          <div className="min-w-0 flex-[2_1_420px]">{item.content}</div>
        </div>
      ))}
    </div>
  );
};

function TimelineDot({ live }: { live: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reached = useInView(ref, { margin: "0px 0px -35% 0px" });
  const on = !live || reached;
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute top-1.5 left-0 h-4 w-4 rounded-full border-[3px] border-ink transition-[background-color,box-shadow] duration-300",
        on ? "bg-mint shadow-[0_0_0_5px_rgba(103,214,158,0.16)]" : "bg-line",
      )}
    />
  );
}
