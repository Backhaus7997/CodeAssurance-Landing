import type { ReactNode } from "react";

/**
 * A titled band of a content page without the reveal animation: used where the page must not load the
 * Reveal client component (text pages stay at the JavaScript weight of /privacy/, SEO spec criterion 10).
 */
export function Section({ title, children, testId }: { title: string; children: ReactNode; testId?: string }) {
  return (
    <section data-testid={testId} className="border-t border-line">
      <div className="container-page py-[clamp(48px,6vw,80px)]">
        <h2 className="display m-0 mb-8 text-[clamp(24px,3vw,36px)] leading-none">{title}</h2>
        {children}
      </div>
    </section>
  );
}
