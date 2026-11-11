import { BookingLink, hasBooking } from "@/components/site/BookingLink";
import { CONTACT_EMAIL } from "@/content/site";
import type { StartContent } from "@/content/types";

/**
 * The closing call to action of text pages: the home's "How it starts" copy and the booking (or email)
 * button. It uses the header's plain button instead of the animated one and leaves out the contact form,
 * so these pages load no more JavaScript than /privacy/ (SEO spec, criterion 10).
 */
const BUTTON =
  "press inline-flex min-h-12 items-center rounded-[2px] border border-mint bg-mint px-5 text-[16px] font-semibold text-ink no-underline hover:border-mint-hover hover:bg-mint-hover";
export function CtaBand({ start }: { start: StartContent }) {
  return (
    <section id="start" className="border-t border-line">
      <div className="container-page flex flex-col gap-5 py-[clamp(56px,8vw,104px)]">
        <p className="eyebrow m-0">{start.label}</p>
        <h2 className="display m-0 text-[clamp(28px,3.6vw,44px)] leading-none">{start.title}</h2>
        <p className="m-0 max-w-[60ch] text-[18px] text-soft">{start.description}</p>
        <ol className="m-0 flex max-w-[760px] list-none flex-col border-t border-line p-0">
          {start.steps.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-line py-4">
              <span className="font-mono text-[14px] text-mint">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <b className="block font-semibold">{step.title}</b>
                <span className="text-soft">{step.text}</span>
              </div>
            </li>
          ))}
        </ol>
        <div>
          {hasBooking ? (
            <BookingLink className={BUTTON}>{start.primaryCta}</BookingLink>
          ) : (
            <a href={`mailto:${CONTACT_EMAIL}`} className={BUTTON}>
              {start.emailCta}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
