export type ContactFields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  /** Honeypot: hidden from people, filled by bots. */
  gotcha: string;
};

export type FieldError = "required" | "invalidEmail" | "tooShort";

export type SendResult = { ok: true } | { ok: false; reason: "rejected" | "network"; detail?: string };

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlglpzgn";
export const CONTACT_SUBJECT = "New website lead - Code Assurance";
const TIMEOUT_MS = 15_000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(f: ContactFields): Partial<Record<"name" | "email" | "message", FieldError>> {
  const errors: Partial<Record<"name" | "email" | "message", FieldError>> = {};
  if (f.name.trim().length < 2) errors.name = "required";
  const email = f.email.trim();
  if (!email) errors.email = "required";
  else if (!EMAIL.test(email)) errors.email = "invalidEmail";
  if (f.message.trim().length < 10) errors.message = "tooShort";
  return errors;
}

export async function sendContact(f: ContactFields, fetchImpl: typeof fetch = fetch, timeoutMs = TIMEOUT_MS): Promise<SendResult> {
  // Bots get a success screen and no request is sent.
  if (f.gotcha) return { ok: true };

  const body = new FormData();
  body.append("name", f.name.trim());
  body.append("email", f.email.trim());
  body.append("company", f.company.trim());
  body.append("phone", f.phone.trim());
  body.append("message", f.message.trim());
  body.append("_subject", CONTACT_SUBJECT);

  let res: Response;
  try {
    res = await fetchImpl(FORMSPREE_ENDPOINT, {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    // Offline, DNS, CORS or the timeout: the form shows the network message with the email fallback.
    return { ok: false, reason: "network" };
  }
  if (res.ok) return { ok: true };

  const detail = await firstErrorMessage(res);
  return detail ? { ok: false, reason: "rejected", detail } : { ok: false, reason: "rejected" };
}

async function firstErrorMessage(res: Response): Promise<string | undefined> {
  let text: string;
  try {
    text = await res.text();
  } catch {
    // The connection dropped while reading the error body: still a rejection, just without detail.
    return undefined;
  }
  try {
    const data: unknown = JSON.parse(text);
    if (data && typeof data === "object" && "errors" in data && Array.isArray(data.errors)) {
      const first: unknown = data.errors[0];
      if (first && typeof first === "object" && "message" in first && typeof first.message === "string") {
        return first.message;
      }
    }
  } catch {
    // Not JSON (e.g. a gateway error page): the caller still reports the rejection.
  }
  return undefined;
}
