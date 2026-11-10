import { CONTACT_EMAIL, CONTACT_PHONE } from "@/content/site";
import type { SiteContent } from "@/content/types";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export function Footer({
  content,
  homeHref,
  alternateHref,
  privacyHref,
}: {
  content: SiteContent;
  homeHref: string;
  alternateHref: string;
  privacyHref: string;
}) {
  const { footer } = content;
  const link = "flex min-h-8 items-center text-muted no-underline transition-colors hover:text-paper";

  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="container-page flex flex-wrap gap-x-16 gap-y-8 py-10">
        <div className="flex min-w-0 flex-[2_1_280px] items-center gap-3.5">
          <Logo size={40} wordmark={false} />
          <div>
            <p className="text-[20px] leading-[1.1] font-extrabold tracking-[-0.01em]">Code Assurance</p>
            <p className="mt-1 text-[13.5px] font-semibold text-muted">{footer.tagline}</p>
          </div>
        </div>
        <nav aria-label={content.locale === "en" ? "Footer" : "Pie de página"} className="flex flex-[1_1_140px] flex-col gap-0.5 text-[15px]">
          {footer.nav.map((item) => (
            <a key={item.section} href={`${homeHref}#${item.section}`} className={link}>
              {item.label}
            </a>
          ))}
        </nav>
        {footer.groups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="flex flex-[1_1_180px] flex-col gap-0.5 text-[15px]">
            <p className="eyebrow m-0 mb-2">{group.title}</p>
            {group.links.map((item) => (
              <a key={item.href} href={item.href} className={link}>
                {item.label}
              </a>
            ))}
          </nav>
        ))}
        <div className="flex flex-[1_1_220px] flex-col gap-0.5 text-[15px]">
          <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
            {CONTACT_EMAIL}
          </a>
          <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className={link}>
            {CONTACT_PHONE}
          </a>
          <a href={privacyHref} className={link}>
            {footer.privacy}
          </a>
        </div>
      </div>
      <div className="container-page pt-2">
        <TextHoverEffect text="Code Assurance" />
      </div>
      <div className="container-page flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-4 pb-7 font-mono text-[13px] text-muted">
        <span>
          © {new Date().getFullYear()} {footer.rights}
        </span>
        <LanguageSwitch locale={content.locale} href={alternateHref} label={content.header.switchLabel} />
      </div>
    </footer>
  );
}
