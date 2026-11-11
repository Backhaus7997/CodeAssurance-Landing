"use client";

import type { ServiceVisual } from "@/content/services/types";
import { Frame } from "./Frame";
import { useVisualStep } from "./useVisualStep";

type Props = Extract<ServiceVisual, { kind: "api" }>;

/** A request, then its response, then the contract checks ticking one by one (step i + 2 ticks check i). */
export function ApiContract({ request, response, checks }: Props) {
  const { ref, step } = useVisualStep(checks.length + 1);
  return (
    <Frame kind="api" step={step} title="api test" frameRef={ref}>
      <div className="grid gap-3 sm:grid-cols-2">
        <pre className="m-0 overflow-hidden whitespace-pre text-[12px] text-soft">
          <span className="text-mint">{request[0]}</span>
          {"\n" + request.slice(1).join("\n")}
        </pre>
        <pre className={`m-0 overflow-hidden whitespace-pre text-[12px] text-soft transition-opacity duration-200 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
          <span className="text-mint">{response[0]}</span>
          {"\n" + response.slice(1).join("\n")}
        </pre>
      </div>
      <ul className="m-0 mt-4 flex list-none flex-col gap-1.5 border-t border-line p-0 pt-3">
        {checks.map((check, i) => (
          <li key={check} className={`flex gap-2 transition-colors duration-200 ${step >= i + 2 ? "text-paper" : "text-dim"}`}>
            <span className={step >= i + 2 ? "text-mint" : "text-edge"}>✓</span>
            {check}
          </li>
        ))}
      </ul>
    </Frame>
  );
}
