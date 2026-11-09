"use client";

import { useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/content/site";
import type { FormContent } from "@/content/types";
import { CONTACT_SUBJECT, FORMSPREE_ENDPOINT, sendContact, validateContact, type ContactFields, type FieldError } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "failed"; reason: "rejected" | "network" };
type Errors = Partial<Record<"name" | "email" | "message", FieldError>>;

// Focus uses the global :focus-visible ring (globals.css).
const FIELD = "min-h-[46px] w-full rounded-[2px] border bg-ink px-3 py-2.5 text-[16px] text-paper placeholder:text-dim";

function read(form: HTMLFormElement): ContactFields {
  const data = new FormData(form);
  const value = (key: string) => String(data.get(key) ?? "");
  return {
    name: value("name"),
    email: value("email"),
    company: value("company"),
    phone: value("phone"),
    message: value("message"),
    gotcha: value("_gotcha"),
  };
}

export function ContactForm({ form }: { form: FormContent }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const sending = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const el = event.currentTarget;
    const fields = read(el);
    const found = validateContact(fields);
    setErrors(found);
    const firstInvalid = (["name", "email", "message"] as const).find((key) => found[key]);
    if (firstInvalid) {
      el.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    sending.current = true;
    setStatus({ kind: "sending" });
    try {
      const result = await sendContact(fields);
      setStatus(result.ok ? { kind: "sent" } : { kind: "failed", reason: result.reason });
    } finally {
      sending.current = false;
    }
  }

  if (status.kind === "sent") {
    return (
      <div role="status" className="flex flex-col gap-2">
        <p className="m-0 font-mono text-[14px] text-mint">✓ {form.sentTitle}</p>
        <p className="m-0 text-soft">{form.sentText}</p>
      </div>
    );
  }

  const field = (name: "name" | "email" | "message") => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: cn(FIELD, errors[name] ? "border-bug" : "border-edge"),
  });

  const error = (name: "name" | "email" | "message") =>
    errors[name] && (
      <span id={`contact-${name}-error`} className="text-[13.5px] text-bug">
        {form.errors[errors[name]]}
      </span>
    );

  const label = "flex flex-col gap-1.5 text-[14px] text-soft";

  return (
    // action/method make the form post to Formspree even before (or without) JavaScript; with JS,
    // onSubmit takes over and validates inline.
    <form data-testid="contact-form" action={FORMSPREE_ENDPOINT} method="POST" noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <p className="eyebrow m-0">{form.label}</p>
      <input type="hidden" name="_subject" value={CONTACT_SUBJECT} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-4">
        <label htmlFor="contact-name" className={label}>
          {form.fields.name}
          <input type="text" autoComplete="name" {...field("name")} />
          {error("name")}
        </label>
        <label htmlFor="contact-email" className={label}>
          {form.fields.email}
          <input type="email" autoComplete="email" inputMode="email" {...field("email")} />
          {error("email")}
        </label>
        <label htmlFor="contact-company" className={label}>
          {form.fields.company}
          <input id="contact-company" type="text" name="company" autoComplete="organization" className={cn(FIELD, "border-edge")} />
        </label>
        <label htmlFor="contact-phone" className={label}>
          <span>
            {form.fields.phone} <span className="text-muted">{form.fields.optional}</span>
          </span>
          <input id="contact-phone" type="tel" name="phone" autoComplete="tel" className={cn(FIELD, "border-edge")} />
        </label>
      </div>
      <label htmlFor="contact-message" className={label}>
        {form.fields.message}
        <textarea rows={4} placeholder={form.fields.messagePlaceholder} {...field("message")} className={cn(field("message").className, "resize-y")} />
        {error("message")}
      </label>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="press min-h-12 cursor-pointer rounded-[2px] border border-muted bg-transparent px-5 text-[16px] font-semibold text-paper hover:border-paper disabled:cursor-wait disabled:opacity-60"
        >
          {status.kind === "sending" ? form.sending : form.submit}
        </button>
        <div aria-live="polite" className="text-[14px]">
          {status.kind === "failed" && (
            <p className="m-0 text-bug">
              {form.errors[status.reason]}{" "}
              <span className="text-soft">
                {form.fallback}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper">
                  {CONTACT_EMAIL}
                </a>
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
