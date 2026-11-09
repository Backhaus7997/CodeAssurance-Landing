import { describe, expect, it, vi } from "vitest";
import { FORMSPREE_ENDPOINT, sendContact, validateContact, type ContactFields } from "./contact";

const valid: ContactFields = {
  name: "Dana Lee",
  email: "cto@acme.com",
  company: "",
  phone: "",
  message: "We need regression coverage.",
  gotcha: "",
};

describe("validateContact", () => {
  it("accepts a complete submission with empty optional fields", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires a name", () => {
    expect(validateContact({ ...valid, name: " " })).toEqual({ name: "required" });
  });

  it("requires an email", () => {
    expect(validateContact({ ...valid, email: "" })).toEqual({ email: "required" });
  });

  it("rejects an email without a domain suffix", () => {
    expect(validateContact({ ...valid, email: "a@b" })).toEqual({ email: "invalidEmail" });
  });

  it("rejects a message shorter than 10 characters", () => {
    expect(validateContact({ ...valid, message: "123456789" })).toEqual({ message: "tooShort" });
  });

  it("accepts a message of exactly 10 characters", () => {
    expect(validateContact({ ...valid, message: "1234567890" })).toEqual({});
  });

  it("accepts a US phone number with symbols", () => {
    expect(validateContact({ ...valid, phone: "+1 (415) 555-0100" })).toEqual({});
  });
});

describe("sendContact", () => {
  it("skips the request when the honeypot is filled", async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    await expect(sendContact({ ...valid, gotcha: "bot" }, fetchImpl)).resolves.toEqual({ ok: true });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts the fields to Formspree as JSON-accepting form data", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));
    await expect(sendContact({ ...valid, company: "Acme", phone: "+1 (415) 555-0100" }, fetchImpl)).resolves.toEqual({ ok: true });

    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(FORMSPREE_ENDPOINT);
    expect(init?.method).toBe("POST");
    expect(new Headers(init?.headers).get("Accept")).toBe("application/json");
    const body = init?.body as FormData;
    expect(body.get("name")).toBe("Dana Lee");
    expect(body.get("email")).toBe("cto@acme.com");
    expect(body.get("company")).toBe("Acme");
    expect(body.get("phone")).toBe("+1 (415) 555-0100");
    expect(body.get("message")).toBe("We need regression coverage.");
    expect(body.get("_subject")).toBe("New website lead - Code Assurance");
  });

  it("reports a rejection with Formspree's first error message", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify({ errors: [{ message: "x" }] }), { status: 422 }));
    await expect(sendContact(valid, fetchImpl)).resolves.toEqual({ ok: false, reason: "rejected", detail: "x" });
  });

  it("reports a rejection without detail when the body is not JSON", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("Bad gateway", { status: 502 }));
    await expect(sendContact(valid, fetchImpl)).resolves.toEqual({ ok: false, reason: "rejected" });
  });

  it("reports a network failure", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(sendContact(valid, fetchImpl)).resolves.toEqual({ ok: false, reason: "network" });
  });
});
