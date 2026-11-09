import type { PullRequestContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { CardBeam } from "./CardBeam";

const TONE = { bug: "text-bug", wait: "text-wait" } as const;

export function DraftPullRequest({ pr, className }: { pr: PullRequestContent; className?: string }) {
  return (
    <figure className={cn("m-0 flex flex-col gap-3", className)}>
      <div className="relative rounded-[4px] border border-line bg-surface text-[15px]">
        <CardBeam />
        <div className="flex flex-col gap-2.5 border-b border-line px-5 pt-[18px] pb-3.5">
          <p className="m-0 text-[18px] leading-[1.35] font-semibold">
            {pr.title} <span className="font-normal text-muted">{pr.ticket}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-muted">
            <span className="rounded-full border border-edge px-2.5 py-px text-[13px] text-soft">{pr.badge}</span>
            <code className="rounded-[3px] bg-[#151916] px-1.5 py-0.5 font-mono text-[12.5px] break-all text-soft">{pr.branch}</code>
            <span>{pr.status}</span>
          </div>
        </div>
        <ul className="m-0 flex list-disc flex-col gap-1.5 py-4 pr-5 pl-[38px] marker:text-dim">
          {pr.summary.map((item) => (
            <li key={item.text} className={item.tone ? TONE[item.tone] : undefined}>
              {item.text}
            </li>
          ))}
        </ul>
        {pr.files.length > 0 && (
          <ul className="m-0 flex list-none flex-col border-t border-line px-5 py-3 font-mono text-[13px] leading-[1.85]">
            {pr.files.map((file) => (
              <li key={file.path} className="flex justify-between gap-4">
                <span className="[overflow-wrap:anywhere] text-soft">{file.path}</span>
                <span className="text-mint">+{file.added}</span>
              </li>
            ))}
          </ul>
        )}
        <ul className="m-0 flex list-none flex-col border-t border-line px-5 pt-3 pb-4 font-mono text-[13px] leading-[1.9] text-soft">
          {pr.checks.map((check) => (
            <li key={check} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="text-mint">
                ✓
              </span>
              {check}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="text-[14px] text-muted">{pr.caption}</figcaption>
    </figure>
  );
}
