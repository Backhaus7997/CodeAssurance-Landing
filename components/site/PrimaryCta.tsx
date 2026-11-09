import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { CONTACT_EMAIL } from "@/content/site";
import { bookingUrl } from "@/lib/booking";

// Book a call when a booking page exists; otherwise email is the primary action (spec, criterion 7).
export function PrimaryCta({ bookLabel, emailLabel, className }: { bookLabel: string; emailLabel: string; className?: string }) {
  if (bookingUrl) {
    return (
      <InteractiveHoverLink href={bookingUrl} target="_blank" rel="noopener" data-booking="" className={className}>
        {bookLabel}
      </InteractiveHoverLink>
    );
  }
  return (
    <InteractiveHoverLink href={`mailto:${CONTACT_EMAIL}`} className={className}>
      {emailLabel}
    </InteractiveHoverLink>
  );
}
