"use client";

import { useEffect, useState } from "react";

/** The guide's sections, fixed beside the text on wide screens; marks the one being read. */
export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const update = () => {
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [items]);
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden self-start min-[900px]:flex min-[900px]:flex-col">
      {items.map((item, i) => {
        const on = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={on ? "true" : undefined}
            className={`flex gap-2.5 border-l-2 py-1.5 pl-3 text-[14px] no-underline transition-colors duration-200 ${
              on ? "border-mint text-paper" : "border-line text-muted hover:text-paper"
            }`}
          >
            <span className={`font-mono text-[12px] ${on ? "text-mint" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
