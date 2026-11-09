import type { ReactNode } from "react";
import { bookingUrl } from "@/lib/booking";

// Renders nothing until NEXT_PUBLIC_BOOKING_URL is set: no booking page means no booking button.
export function BookingLink({ className, children }: { className?: string; children: ReactNode }) {
  if (!bookingUrl) return null;
  return (
    <a href={bookingUrl} data-booking className={className} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

export const hasBooking = bookingUrl !== null;
