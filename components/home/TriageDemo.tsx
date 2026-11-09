"use client";

import { useState } from "react";
import { ShineBorder } from "@/components/ui/shine-border";
import type { TriageContent } from "@/content/types";

function Verdict({ color, swatch, children }: { color: string; swatch: string; children: string }) {
  return (
    <span className={`flex items-center gap-[7px] font-mono text-[12px] ${color}`}>
      <span aria-hidden="true" className={`inline-block h-[9px] w-[9px] ${swatch}`} />
      {children}
    </span>
  );
}

export function TriageDemo({ triage }: { triage: TriageContent }) {
  const [approved, setApproved] = useState(false);
  const { bug, locator } = triage;
  const card = "relative min-w-0 flex-[1_1_420px] rounded-[4px] border border-line bg-surface";
  const head = "flex flex-wrap justify-between gap-x-3 gap-y-1.5 border-b border-line px-4 py-3";
  const button = "press min-h-11 cursor-pointer rounded-[2px] border px-4 text-[15px] font-semibold";

  return (
    <div className="flex flex-wrap items-stretch gap-4">
      <article className={card}>
        <div className={head}>
          <span className="font-mono text-[12.5px] text-soft">{bug.test}</span>
          <Verdict color="text-bug" swatch="bg-bug">
            {bug.verdict}
          </Verdict>
        </div>
        <div className="flex flex-col gap-2.5 px-4 pt-3.5 pb-4 text-[15px]">
          <code className="font-mono text-[12.5px] text-soft">{bug.error}</code>
          <p className="m-0 text-soft">{bug.explanation}</p>
          <p className="m-0 text-muted">{bug.outcome}</p>
        </div>
      </article>

      <article className={card}>
        {!approved && <ShineBorder shineColor={["#fbbf24", "#67d69e"]} duration={10} />}
        <div className={head}>
          <span className="font-mono text-[12.5px] text-soft">{locator.test}</span>
          {approved ? (
            <Verdict color="text-mint" swatch="bg-mint">
              {locator.fixedVerdict}
            </Verdict>
          ) : (
            <Verdict color="text-wait" swatch="bg-wait">
              {locator.pendingVerdict}
            </Verdict>
          )}
        </div>
        <div className="flex flex-col gap-3 px-4 pt-3.5 pb-4 text-[15px]">
          <code className="font-mono text-[12.5px] text-soft">{locator.error}</code>
          <p className="m-0 text-soft">{locator.explanation}</p>
          <div data-testid="locator-diff" className="overflow-x-auto rounded-[3px] border border-line font-mono text-[12.5px]">
            <div className="bg-[#1d1212] px-2.5 py-1.5 whitespace-pre text-[#fca5a5]">{locator.removed}</div>
            <div className="bg-[#0f1d16] px-2.5 py-1.5 whitespace-pre text-[#a7e9c6]">{locator.added}</div>
          </div>
          <div aria-live="polite" className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
            {approved ? (
              <>
                <span className="font-mono text-[13px] text-mint">✓ {locator.applied}</span>
                <button type="button" onClick={() => setApproved(false)} className={`${button} border-line bg-transparent text-paper hover:border-muted`}>
                  {locator.undo}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setApproved(true)}
                  className={`${button} border-mint bg-mint text-ink hover:border-mint-hover hover:bg-mint-hover`}
                >
                  {locator.approve}
                </button>
                <span className="text-[14px] text-muted">{locator.approveHint}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
