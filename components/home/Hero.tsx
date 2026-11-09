import { PrimaryCta } from "@/components/site/PrimaryCta";
import { CONTACT_EMAIL } from "@/content/site";
import type { SiteContent } from "@/content/types";
import { bookingUrl } from "@/lib/booking";
import { CoverageMap } from "./CoverageMap";
import { HeroGrid } from "./HeroGrid";
import { RotatingWord } from "./RotatingWord";

export function Hero({ content }: { content: SiteContent }) {
  const { hero, map } = content;
  return (
    <section className="relative overflow-hidden">
      <HeroGrid />
      <div className="container-page relative">
        <div className="flex flex-wrap items-end gap-x-14 gap-y-6 border-b border-line pt-[clamp(36px,6vw,88px)] pb-[clamp(32px,4vw,48px)]">
          <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-6">
            <p className="eyebrow m-0">{hero.label}</p>
            <h1 className="display m-0 text-[clamp(31px,4.9vw,62px)] leading-[0.98]">
              <span className="block">{hero.titleBefore}</span>
              <span className="sr-only"> {hero.rotatingWords[0]}, </span>
              <RotatingWord words={hero.rotatingWords} suffix="," />
              <span className="block">{hero.titleAfter}</span>
            </h1>
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-5">
            <p className="m-0 text-soft">{hero.lead}</p>
            <div className="flex flex-col gap-2.5">
              <PrimaryCta bookLabel={hero.primaryCta} emailLabel={hero.emailCta} className="justify-between" />
              <a
                href="#agent"
                className="press flex min-h-[50px] items-center justify-between rounded-[2px] border border-line bg-black/60 px-[18px] font-semibold text-paper no-underline hover:border-muted"
              >
                <span>{hero.secondaryCta}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            {bookingUrl && (
              <p className="m-0 font-mono text-[13px] text-muted">
                {hero.emailPrefix}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper">
                  {CONTACT_EMAIL}
                </a>
              </p>
            )}
          </div>
        </div>
        <CoverageMap map={map} />
      </div>
    </section>
  );
}
