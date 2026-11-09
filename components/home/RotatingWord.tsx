"use client";

import { useReducedMotion } from "motion/react";
import TextRotate from "@/components/fancy/text/text-rotate";

// Decorative: the heading carries the first word as screen-reader text.
export function RotatingWord({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  return (
    <span aria-hidden="true" data-testid="hero-rotating" className="text-mint">
      {reduce ? (
        words[0]
      ) : (
        <TextRotate
          texts={words}
          as="span"
          rotationInterval={2600}
          staggerDuration={0.022}
          mainClassName="inline-flex"
          elementLevelClassName="overflow-hidden"
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
        />
      )}
    </span>
  );
}
