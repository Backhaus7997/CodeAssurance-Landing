"use client";

import type { ServiceVisual } from "@/content/services/types";
import { Frame } from "./Frame";
import { useVisualStep } from "./useVisualStep";

type Props = Extract<ServiceVisual, { kind: "phone" }>;

/** A phone running the same checks on one device after another. */
export function PhoneTests({ devices, rows }: Props) {
  const total = devices.length * rows.length;
  const { ref, step } = useVisualStep(total);
  const device = Math.min(devices.length - 1, Math.floor(Math.max(0, step - 1) / rows.length));
  const passed = step === total ? rows.length : step - device * rows.length;
  return (
    <Frame kind="phone" step={step} title="device run" frameRef={ref}>
      <div className="mx-auto w-[230px] rounded-[26px] border-2 border-edge bg-ink p-3">
        <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-edge" />
        <p className="m-0 mb-3 text-center text-[11px] text-mint">{devices[device]}</p>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {rows.map((row, i) => (
            <li key={row} className="flex items-start gap-2 text-[11.5px] leading-snug">
              <span className={`mt-[3px] h-2 w-2 shrink-0 transition-colors duration-200 ${i < passed ? "bg-mint" : "bg-edge"}`} />
              <span className={i < passed ? "text-paper" : "text-dim"}>{row}</span>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-edge" />
      </div>
    </Frame>
  );
}
