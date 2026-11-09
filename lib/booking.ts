// Booking link for every "Book a call" button. Read at build time (static export).
// Empty means there is no booking page yet: the buttons are not rendered.
export function parseBookingUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  if (!value.startsWith("https://")) {
    throw new Error(`NEXT_PUBLIC_BOOKING_URL must start with https:// (got "${value}")`);
  }
  return value;
}

export const bookingUrl = parseBookingUrl(process.env.NEXT_PUBLIC_BOOKING_URL);
