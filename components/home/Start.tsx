import { PrimaryCta } from "@/components/site/PrimaryCta";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { CONTACT_EMAIL } from "@/content/site";
import type { FormContent, StartContent } from "@/content/types";
import { CardBeam } from "./CardBeam";
import { ContactForm } from "./ContactForm";

export function Start({ start, form }: { start: StartContent; form?: FormContent }) {
  return (
    <section id="start" className="border-t border-line">
      <div className="container-page py-[clamp(56px,8vw,104px)]">
        <SectionHeader index={start.index} label={start.label} title={start.title} description={start.description} />
        <div className="flex flex-wrap items-start gap-12">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-7">
            <ol className="m-0 flex list-none flex-col border-t border-line p-0">
              {start.steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 70} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 border-b border-line py-4">
                  <span className="font-mono text-[14px] text-mint">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b className="block font-semibold">{step.title}</b>
                    <span className="text-[15.5px] text-soft">{step.text}</span>
                  </div>
                </Reveal>
              ))}
            </ol>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <PrimaryCta bookLabel={start.primaryCta} emailLabel={start.emailCta} />
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center font-mono text-[13px] text-muted hover:text-paper">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          {form && (
            <div className="relative min-w-0 flex-[1_1_420px] rounded-[4px] border border-line bg-ink px-[22px] py-6">
              <CardBeam />
              <ContactForm form={form} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
