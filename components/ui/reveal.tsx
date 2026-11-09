"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealTag = "div" | "section" | "article" | "li" | "p" | "figure";

// Blur-fade on first scroll into view (adapted from Magic UI's BlurFade).
// The server markup stays visible: globals.css hides [data-reveal] only under html.js, so
// content never depends on JavaScript, and it shows once data-in is set.
export function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  children,
}: {
  as?: RevealTag;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Typed as "div" so one ref type fits every tag; only block elements are allowed in RevealTag.
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.setAttribute("data-in", "");
    if (!("IntersectionObserver" in window)) return show();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}>
      {children}
    </Tag>
  );
}
