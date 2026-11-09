import type { AuditVisualKind } from "@/content/types";

// Decorative mini illustrations. Each animates once when its card is revealed (globals.css,
// .ca-audit-*); without JavaScript or with reduced motion they show their final state.
const LATENCY = [26, 34, 22, 40, 30, 28, 92, 36, 24, 32, 27, 35];
const HOT = 6;

export function AuditVisual({ kind, exampleLabel }: { kind: AuditVisualKind; exampleLabel: string }) {
  return (
    <div aria-hidden="true" className="relative h-32 border-b border-line px-5 pt-[22px] pb-3 font-mono">
      <span className="absolute top-2.5 right-3 text-[10.5px] text-dim">{exampleLabel}</span>
      {kind === "latency" && (
        <div className="flex h-full items-end gap-[5px]">
          {LATENCY.map((h, i) =>
            i === HOT ? (
              <span key={i} className="ca-audit-hot flex-1" style={{ height: `${h}%` }} />
            ) : (
              <span key={i} className="ca-audit-bar flex-1 bg-edge" style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }} />
            ),
          )}
        </div>
      )}
      {kind === "endpoints" && (
        <div className="flex h-full flex-col justify-end gap-1.5 text-[12px] text-soft">
          {[
            ["POST /refunds", "auth ✓", "text-mint"],
            ["GET /users/:id", "authorization ✗", "text-bug"],
            ["PUT /roles", "auth ✓", "text-mint"],
          ].map(([route, result, color], i) => (
            <span key={route} className="ca-audit-row flex justify-between gap-2" style={{ transitionDelay: `${i * 120}ms` }}>
              <span>{route}</span>
              <span className={color}>{result}</span>
            </span>
          ))}
        </div>
      )}
      {kind === "debt" && (
        <div className="flex h-full flex-col justify-end gap-[7px] text-[11.5px] text-muted">
          {[
            ["duplicated checkout logic", "100%", "bg-bug"],
            ["untyped API client", "72%", "bg-wait"],
            ["dead feature flags", "40%", "bg-edge"],
          ].map(([item, width, color], i) => (
            <span key={item} className="grid grid-cols-[1fr_44%] items-center gap-2.5">
              <span>{item}</span>
              <span className={`ca-audit-barx h-1.5 ${color}`} style={{ width, transitionDelay: `${i * 120}ms` }} />
            </span>
          ))}
        </div>
      )}
      {kind === "suites" && (
        <div className="flex h-full flex-col justify-end gap-1.5 text-[12px] text-soft">
          {[
            ["smoke", "12"],
            ["regression", "86"],
            ["end-to-end", "31"],
          ].map(([suite, count], i) => (
            <span key={suite} className="ca-audit-row flex justify-between" style={{ transitionDelay: `${i * 140}ms` }}>
              <span>{suite}</span>
              <span className="text-mint">{count} ✓</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
