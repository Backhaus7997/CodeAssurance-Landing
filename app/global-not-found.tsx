import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { PageShell } from "@/components/site/PageShell";
import { RootDocument } from "@/components/site/RootDocument";
import { en } from "@/content/en";

export const metadata: Metadata = {
  title: "Page not found | Code Assurance",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  const link = "press inline-flex min-h-12 items-center rounded-[2px] border border-line px-5 font-semibold text-paper no-underline hover:border-muted";
  return (
    <RootDocument locale="en">
      <PageShell locale="en" alternateHref="/es/">
        <section className="container-page flex min-h-[60vh] flex-col justify-center gap-6 py-24">
          <p className="eyebrow m-0">404</p>
          <h1 className="display m-0 text-[clamp(31px,4.9vw,62px)] leading-[0.98]">{en.notFound.title}</h1>
          <p className="m-0 max-w-[52ch] text-soft">{en.notFound.text}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className={link}>
              {en.notFound.homeEn}
            </Link>
            <Link href="/es/" lang="es" className={link}>
              {en.notFound.homeEs}
            </Link>
          </div>
        </section>
      </PageShell>
    </RootDocument>
  );
}
