import { CONTACT_EMAIL } from "@/content/site";
import { bookingUrl } from "@/lib/booking";
import { buildLlmsTxt } from "@/lib/llms";

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(buildLlmsTxt({ bookingUrl, email: CONTACT_EMAIL }), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
