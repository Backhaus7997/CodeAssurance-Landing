import type { SiteContent } from "@/content/types";
import { BookingLink, hasBooking } from "./BookingLink";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export function Header({ content, homeHref, alternateHref }: { content: SiteContent; homeHref: string; alternateHref: string }) {
  const { header } = content;
  const button =
    "press inline-flex min-h-11 items-center rounded-[2px] border border-mint bg-mint px-4 text-[15px] font-semibold text-ink no-underline hover:border-mint-hover hover:bg-mint-hover";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-black/75 backdrop-blur-md">
      <div className="container-page flex items-center justify-between gap-x-7 gap-y-3 py-3">
        <a href={homeHref} className="text-[16px] whitespace-nowrap text-paper no-underline min-[420px]:text-[18px]">
          <Logo />
        </a>
        <nav aria-label={content.locale === "en" ? "Main" : "Principal"} className="hidden items-center gap-7 min-[760px]:flex">
          {header.nav.map((item) => (
            <a key={item.section} href={`${homeHref}#${item.section}`} className="eyebrow no-underline transition-colors hover:text-paper">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <LanguageSwitch
            locale={content.locale}
            href={alternateHref}
            label={header.switchLabel}
            className="inline-flex min-h-11 min-w-11 items-center justify-center"
          />
          {hasBooking ? (
            <BookingLink className={button}>{header.book}</BookingLink>
          ) : (
            <a href={`${homeHref}#start`} className={button}>
              {header.contact}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
