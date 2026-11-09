import type { Locale } from "@/content/types";
import { cn } from "@/lib/utils";

export function LanguageSwitch({
  locale,
  href,
  label,
  className,
}: {
  locale: Locale;
  href: string;
  label: string;
  className?: string;
}) {
  const target: Locale = locale === "en" ? "es" : "en";
  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      className={cn("font-mono text-[12px] text-muted no-underline transition-colors hover:text-paper", className)}
    >
      {target.toUpperCase()}
    </a>
  );
}
