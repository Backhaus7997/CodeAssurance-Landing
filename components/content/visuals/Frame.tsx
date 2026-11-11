import type { ReactNode, Ref } from "react";

/** The dark window the visuals sit in, like the home's terminal. */
export function Frame({ kind, step, title, children, frameRef }: { kind: string; step: number; title: string; children: ReactNode; frameRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={frameRef}
      data-visual={kind}
      data-step={step}
      aria-hidden="true"
      className="overflow-hidden rounded-[6px] border border-edge bg-surface/95 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[12px] text-muted">
        <span className="h-2.5 w-2.5 rounded-full bg-edge" />
        <span className="h-2.5 w-2.5 rounded-full bg-edge" />
        <span className="h-2.5 w-2.5 rounded-full bg-edge" />
        <span className="ml-2 truncate">{title}</span>
      </div>
      <div className="min-h-[280px] p-4 font-mono text-[13px] leading-[1.75]">{children}</div>
    </div>
  );
}
