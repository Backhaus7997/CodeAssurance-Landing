import type { ReactNode } from "react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/ui/reveal";

type Props = { title: string; children: ReactNode; testId?: string; id?: string; index?: string; description?: string };

/** A titled band of a content page. With an index it uses the home's numbered section header ("01 / …"). */
export function Block({ title, children, testId, id, index, description }: Props) {
  return (
    <section id={id} data-testid={testId} className="border-t border-line">
      <div className="container-page py-[clamp(56px,8vw,104px)]">
        {index ? (
          <div data-section-index={index}>
            <SectionHeader index={index} label={title} title={title} description={description} />
          </div>
        ) : (
          <Reveal className="mb-8">
            <h2 className="display m-0 text-[clamp(24px,3vw,36px)] leading-none">{title}</h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
