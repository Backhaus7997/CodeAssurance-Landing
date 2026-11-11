"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import TextRotate from "@/components/fancy/text/text-rotate";
import { useLiveMotion } from "@/hooks/use-live-motion";

// Decorative: the heading carries the first word as screen-reader text. Every word is stacked
// invisibly in the same grid cell, so the box is always as big as the longest one and the hero
// never reflows when the word changes. It only rotates while on screen.
// The stacked words (and the still word without motion) are drawn by ::before from data-word, so
// they are not text in the document: crawlers read the h1 sentence once (SEO spec, 4.4).
export function RotatingWord({ words, suffix }: { words: string[]; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const live = useLiveMotion();
  const inView = useInView(ref);
  // The suffix travels inside each animated word, so a long word wraps exactly like its sizer.
  const texts = words.map((word) => `${word}${suffix}`);
  return (
    // No kerning or ligatures, so the plain-text sizers measure exactly like the letter-by-letter animation.
    <span ref={ref} aria-hidden="true" className="grid text-mint [font-kerning:none] [font-variant-ligatures:none]">
      {texts.map((text) => (
        <span key={text} data-word={text} className="ghost-word invisible col-start-1 row-start-1" />
      ))}
      {live ? (
        <span data-testid="hero-rotating" className="col-start-1 row-start-1">
          <TextRotate
            texts={texts}
            as="span"
            auto={inView}
            rotationInterval={2600}
            animatePresenceMode="popLayout"
            staggerDuration={0.022}
            mainClassName="inline-flex"
            elementLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          />
        </span>
      ) : (
        <span data-testid="hero-rotating" data-word={texts[0]} className="ghost-word col-start-1 row-start-1" />
      )}
    </span>
  );
}
