import { Reveal } from "@/components/ui/reveal";

/** Evidence items with a mint tick, appearing one after another. */
export function EvidenceList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-10 gap-y-3.5 p-0 md:grid-cols-2">
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 70} className="flex items-start gap-3 font-mono text-[14px] text-soft">
          <span aria-hidden="true" className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center border border-mint text-[11px] text-mint">
            ✓
          </span>
          {item}
        </Reveal>
      ))}
    </ul>
  );
}
