"use client";

import { useState } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import type { ModuleStatus, SiteContent } from "@/content/types";
import { cn } from "@/lib/utils";

const SWATCH: Record<ModuleStatus, string> = {
  covered: "bg-mint border-mint",
  added: "border-mint",
  bug: "bg-bug border-bug",
  pending: "bg-wait border-wait",
  gap: "border-dim",
};

const NUMBER: Record<ModuleStatus, string> = {
  covered: "text-paper",
  added: "text-mint",
  bug: "text-mint",
  pending: "text-paper",
  gap: "text-dim",
};

const LABEL: Record<ModuleStatus, string> = {
  covered: "text-muted",
  added: "text-muted",
  bug: "text-bug",
  pending: "text-wait",
  gap: "text-muted",
};

const STATUSES: ModuleStatus[] = ["covered", "added", "bug", "pending", "gap"];

function Swatch({ status, className }: { status: ModuleStatus; className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block h-[9px] w-[9px] shrink-0 border-[1.5px]", SWATCH[status], className)} />;
}

export function CoverageMap({ map }: { map: SiteContent["map"] }) {
  const [selectedId, setSelectedId] = useState(map.defaultModule);
  const selected = map.modules.find((m) => m.id === selectedId) ?? map.modules[0];

  return (
    <div className="pt-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-4">
        <p className="eyebrow m-0">
          {map.label} <span className="text-dim">{map.labelNote}</span>
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-mono text-[12px] text-soft">
          {STATUSES.map((status) => (
            <li key={status} className="flex items-center gap-2">
              <Swatch status={status} />
              {map.legend[status]}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(160px,100%),1fr))] gap-px border border-line bg-line font-mono">
          {map.modules.map((m, i) => {
            const on = m.id === selected.id;
            const plus = m.status === "added" || m.status === "bug";
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={on}
                aria-label={`${m.path}: ${map.statusLabel[m.status]}`}
                onClick={() => setSelectedId(m.id)}
                className={cn(
                  "flex min-h-[132px] cursor-pointer flex-col items-stretch gap-2.5 border-0 p-3.5 pb-4 text-left text-paper transition-colors duration-150 hover:bg-surface",
                  on ? "bg-surface shadow-[inset_0_0_0_1px_var(--color-mint)]" : "bg-ink",
                )}
              >
                <span className="text-[12.5px] text-soft">{m.path}</span>
                <span className="ca-land mt-auto flex flex-col gap-1.5" style={{ animationDelay: `${150 + i * 45}ms` }}>
                  <b className={cn("font-sans text-[30px] leading-none font-semibold [font-stretch:112%]", NUMBER[m.status])}>
                    {plus && "+"}
                    <NumberTicker value={m.tests} delay={0.15 + i * 0.045} />
                  </b>
                  <span className={cn("flex items-start gap-[7px] text-[11.5px] leading-[1.35]", LABEL[m.status])}>
                    <Swatch status={m.status} className="mt-0.5" />
                    {map.statusLabel[m.status]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="ca-scan absolute inset-y-0 left-0 w-1/5 bg-[linear-gradient(90deg,transparent,rgba(103,214,158,0.16),transparent)]" />
        </div>
      </div>

      <div
        data-testid="map-detail"
        aria-live="polite"
        className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border border-t-0 border-line bg-surface px-4 py-3.5"
      >
        <span className="font-mono text-[13px] text-paper">{selected.path}</span>
        <span className={cn("font-mono text-[12px]", LABEL[selected.status])}>{map.statusLabel[selected.status]}</span>
        <span className="flex-[1_1_320px] text-[15px] text-soft">{selected.note}</span>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2.5 pt-4 pb-7">
        <p className="m-0 font-mono text-[13px] text-soft tabular-nums">{map.totals}</p>
        <p className="m-0 max-w-[46ch] text-[15px] text-muted">{map.firstDeliverable}</p>
      </div>
    </div>
  );
}
