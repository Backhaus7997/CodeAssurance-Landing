import type { FaqItem } from "@/content/pages/types";
import { faqLd } from "@/lib/jsonld";
import { Block } from "./Block";
import { JsonLd } from "./JsonLd";

const DETAILS = "group border-b border-line [&_summary::-webkit-details-marker]:hidden";
const SUMMARY = "flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 py-3.5 text-[17px] font-semibold";

/** Visible questions and answers, plus the same pairs as FAQPage data. */
export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <Block title={title} testId="faq">
      <JsonLd data={faqLd(items)} />
      <div className="border-t border-line">
        {items.map((faq) => (
          <details key={faq.q} className={DETAILS}>
            <summary className={SUMMARY}>
              <span>{faq.q}</span>
              <span aria-hidden="true" className="font-mono text-[22px] leading-none text-mint transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="m-0 max-w-[70ch] pb-5 text-soft">{faq.a}</p>
          </details>
        ))}
      </div>
    </Block>
  );
}
