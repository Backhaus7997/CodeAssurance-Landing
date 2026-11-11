import type { ReactNode } from "react";
import { JsonLd } from "@/components/content/JsonLd";
import { en } from "@/content/en";
import { es } from "@/content/es";
import type { Locale } from "@/content/types";
import { organizationLd, websiteLd } from "@/lib/jsonld";
import { Footer } from "./Footer";
import { Header } from "./Header";

const CONTENT = { en, es };
const HOME = { en: "/", es: "/es/" };
const PRIVACY = { en: "/privacy/", es: "/es/privacy/" };

export function PageShell({ locale, alternateHref, children }: { locale: Locale; alternateHref: string; children: ReactNode }) {
  const content = CONTENT[locale];
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <Header content={content} homeHref={HOME[locale]} alternateHref={alternateHref} />
      <main id="top">{children}</main>
      <Footer content={content} homeHref={HOME[locale]} alternateHref={alternateHref} privacyHref={PRIVACY[locale]} />
    </>
  );
}
