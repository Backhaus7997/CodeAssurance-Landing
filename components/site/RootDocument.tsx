import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { fontVariables } from "@/lib/fonts";
import { HydrationMark } from "./HydrationMark";
import { WaterBackground } from "./WaterBackground";

// Marks the document as scripted before first paint, so reveal styles only apply when JS runs.
// Failsafe: if the app hasn't hydrated 2.5 s later (slow network, blocked or broken scripts), the
// flag is removed and every piece of content shows in its final state.
const JS_FLAG =
  "var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.hasAttribute('data-hydrated'))d.classList.remove('js')},2500)";

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the App Router root document, where <head> is valid */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <WaterBackground />
        <HydrationMark />
        {children}
      </body>
    </html>
  );
}
