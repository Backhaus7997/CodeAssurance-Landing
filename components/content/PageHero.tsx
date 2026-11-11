import type { ReactNode } from "react";
import { HeroGrid } from "@/components/home/HeroGrid";
import { PrimaryCta } from "@/components/site/PrimaryCta";
import { AnswerLead } from "./AnswerLead";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  breadcrumbs: Crumb[];
  eyebrow: string;
  h1: string;
  answer?: string;
  cta?: { bookLabel: string; emailLabel: string };
  secondary?: { label: string; href: string };
  /** The page's own animated visual, shown to the right on wide screens. */
  visual?: ReactNode;
  children?: ReactNode;
};

/** Splits off the last word so it can carry the mint accent, keeping the h1 text unchanged. */
function accent(text: string): [string, string] {
  const at = text.lastIndexOf(" ");
  return at === -1 ? ["", text] : [text.slice(0, at + 1), text.slice(at + 1)];
}

/** The home hero for inner pages: flickering grid, breadcrumbs, numbered label, h1, answer and call to action. */
export function PageHero({ breadcrumbs, eyebrow, h1, answer, cta, secondary, visual, children }: Props) {
  const [lead, last] = accent(h1);
  return (
    <section className="relative overflow-hidden border-b border-line">
      <HeroGrid />
      <div className="container-page relative pt-[clamp(28px,5vw,64px)] pb-[clamp(48px,6vw,88px)]">
        <Breadcrumbs trail={breadcrumbs} className="mb-[clamp(24px,4vw,48px)]" />
        <div className="flex flex-wrap items-center gap-x-14 gap-y-10">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-5">
            <p className="eyebrow m-0">{eyebrow}</p>
            <h1 className="display m-0 text-[clamp(34px,5.2vw,68px)] leading-[0.98] [overflow-wrap:anywhere]">
              {lead}
              <span className="text-mint">{last}</span>
            </h1>
            {answer && <AnswerLead text={answer} />}
            {children}
            {(cta || secondary) && (
              <div className="flex flex-wrap gap-2.5">
                {cta && <PrimaryCta bookLabel={cta.bookLabel} emailLabel={cta.emailLabel} />}
                {secondary && (
                  <a
                    href={secondary.href}
                    className="press inline-flex min-h-12 items-center gap-3 border border-edge px-5 font-semibold no-underline transition-colors hover:border-mint"
                  >
                    {secondary.label} <span aria-hidden="true">↓</span>
                  </a>
                )}
              </div>
            )}
          </div>
          {visual && <div className="min-w-0 flex-[1_1_420px]">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
