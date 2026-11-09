import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { fontVariables } from "@/lib/fonts";

// Marks the document as scripted before first paint, so reveal styles only apply when JS runs.
const JS_FLAG = "document.documentElement.classList.add('js')";

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the App Router root document, where <head> is valid */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
