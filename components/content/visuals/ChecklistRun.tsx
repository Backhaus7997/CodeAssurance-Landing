"use client";

import type { ServiceVisual } from "@/content/services/types";
import { Frame } from "./Frame";
import { useVisualStep } from "./useVisualStep";

type Props = Extract<ServiceVisual, { kind: "checklist" }>;

/** Test cases ticked one by one; the one with a bug ends in red. */
export function ChecklistRun({ title, items }: Props) {
  const { ref, step } = useVisualStep(items.length);
  return (
    <Frame kind="checklist" step={step} title={title} frameRef={ref}>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((item, i) => {
          const done = i < step;
          return (
            <li key={item.text} className="flex items-start gap-3">
              <span
                className={`mt-[5px] grid h-[16px] w-[16px] shrink-0 place-items-center border text-[10px] transition-colors duration-200 ${
                  done ? (item.bug ? "border-bug bg-bug text-ink" : "border-mint bg-mint text-ink") : "border-edge text-transparent"
                }`}
              >
                {item.bug ? "!" : "✓"}
              </span>
              <span className={`transition-colors duration-200 ${done ? "text-paper" : "text-dim"}`}>
                {item.text}
                {item.bug && (
                  <span className={`block text-bug transition-opacity duration-200 ${done ? "opacity-100" : "opacity-0"}`}>{item.bug}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}
