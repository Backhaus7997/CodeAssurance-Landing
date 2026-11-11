import type { ReactNode } from "react";

/**
 * A titled band of a content page without the reveal animation: used where the page must not load the
 * Reveal client component (text pages stay at the JavaScript weight of /privacy/, SEO spec criterion 10).
 */
export function Section({ title, children, testId, index }: { title: string; children: ReactNode; testId?: string; index?: string }) {
  return (
    <section data-testid={testId} className="border-t border-line">
      <div className="container-page py-[clamp(48px,6vw,80px)]">
        {index ? (
          <div data-section-index={index} className="mb-10 flex flex-wrap gap-x-12 gap-y-4">
            <p className="eyebrow m-0 flex-[0_0_160px]">
              {index} / {title}
            </p>
            <h2 className="display m-0 min-w-0 flex-[1_1_560px] text-[clamp(27px,3.4vw,42px)] leading-none">{title}</h2>
          </div>
        ) : (
          <h2 className="display m-0 mb-8 text-[clamp(24px,3vw,36px)] leading-none">{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}
