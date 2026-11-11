"use client";

import type { ServiceVisual } from "@/content/services/types";
import { Frame } from "./Frame";
import { useVisualStep } from "./useVisualStep";

type Props = Extract<ServiceVisual, { kind: "sprint" }>;

/** A sprint board where every card passes through the QA column on its way to Done. */
export function SprintBoard({ columns, cards }: Props) {
  const { ref, step } = useVisualStep(3);
  return (
    <Frame kind="sprint" step={step} title="sprint board" frameRef={ref}>
      <div className="grid grid-cols-4 gap-2">
        {columns.map((column, c) => (
          <div key={column} className={`flex min-h-[220px] flex-col gap-2 rounded-[3px] border p-2 ${c === 2 ? "border-mint/50 bg-mint/5" : "border-line"}`}>
            <p className={`m-0 text-[11px] uppercase tracking-[0.06em] ${c === 2 ? "text-mint" : "text-muted"}`}>{column}</p>
            {cards
              .filter((card) => Math.min(3, card.start + step) === c)
              .map((card) => (
                <span key={card.title} className="animate-[fade-in_0.25s_cubic-bezier(.23,1,.32,1)] rounded-[3px] border border-edge bg-ink px-2 py-1.5 text-[11.5px] leading-tight text-soft">
                  {card.title}
                </span>
              ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}
