import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/** A titled band of a content page: top rule, h2, then the content. */
export function Block({ title, children, testId, id }: { title: string; children: ReactNode; testId?: string; id?: string }) {
  return (
    <section id={id} data-testid={testId} className="border-t border-line">
      <div className="container-page py-[clamp(48px,6vw,80px)]">
        <Reveal className="mb-8">
          <h2 className="display m-0 text-[clamp(24px,3vw,36px)] leading-none">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
