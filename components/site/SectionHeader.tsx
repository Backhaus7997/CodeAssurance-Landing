import { Reveal } from "@/components/ui/reveal";

export function SectionHeader({ index, label, title, description }: { index: string; label: string; title: string; description?: string }) {
  return (
    <Reveal className="mb-10 flex flex-wrap gap-x-12 gap-y-4">
      <p className="eyebrow m-0 flex-[0_0_160px]">
        {index} / {label}
      </p>
      <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-4">
        <h2 className="display m-0 text-[clamp(27px,3.4vw,42px)] leading-none">{title}</h2>
        {description && <p className="m-0 max-w-[62ch] text-soft">{description}</p>}
      </div>
    </Reveal>
  );
}
