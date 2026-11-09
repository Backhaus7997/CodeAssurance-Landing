import type { Metadata } from "next";
import { HowWeWorkPage } from "@/components/how-we-work/HowWeWorkPage";
import { PageShell } from "@/components/site/PageShell";
import { howWeWork } from "@/content/how-we-work";
import { pageMetadata } from "@/lib/metadata";

// The outbound one-pager: English only and kept out of search results (it repeats the home).
export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/how-we-work/",
  title: howWeWork.meta.title,
  description: howWeWork.meta.description,
  noindex: true,
});

export default function Page() {
  return (
    <PageShell locale="en" alternateHref="/es/">
      <HowWeWorkPage content={howWeWork} />
    </PageShell>
  );
}
