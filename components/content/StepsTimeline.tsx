import { Timeline } from "@/components/ui/timeline";

export type Step = { title: string; bullets?: string[]; text?: string; badge?: string };

/** Steps on the home's scroll-filled timeline (the "How it works" of the prototype). */
export function StepsTimeline({ steps }: { steps: Step[] }) {
  const data = steps.map((step, i) => ({
    id: step.title,
    title: (
      <div className="flex items-baseline gap-3.5">
        <span className="font-mono text-[13px] text-mint">{step.badge ? "+" : String(i + 1).padStart(2, "0")}</span>
        <h3 className="display m-0 text-[clamp(20px,2.4vw,30px)] leading-[1.05]">
          {step.title}
          {step.badge && (
            <span className="ml-3 inline-block border border-mint px-2 py-0.5 align-middle font-mono text-[11px] font-normal tracking-normal text-mint normal-case">
              {step.badge}
            </span>
          )}
        </h3>
      </div>
    ),
    content: (
      <div data-step="" className="flex flex-col gap-2.5">
        {step.text && <p className="m-0 text-[17px] text-soft">{step.text}</p>}
        {step.bullets && (
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {step.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[16px] text-soft">
                <span aria-hidden="true" className="mt-[9px] inline-block h-[7px] w-[7px] shrink-0 bg-mint" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
  }));
  return (
    <div data-steps="">
      <Timeline data={data} />
    </div>
  );
}
