"use client";

import { useEffect, useRef } from "react";

/** A thin mint bar at the top that grows as the guide is read. Decorative. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      ref={ref}
      data-reading-progress=""
      aria-hidden="true"
      className="fixed top-0 left-0 z-40 h-[2px] w-full origin-left bg-mint"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
