import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { PageShell } from "@/components/site/PageShell";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  alternatePath: "/es/",
  title: en.meta.title,
  description: en.meta.description,
  ogAlt: en.meta.ogAlt,
});

export default function Page() {
  return (
    <PageShell locale="en" alternateHref="/es/">
      <HomePage content={en} />
    </PageShell>
  );
}
