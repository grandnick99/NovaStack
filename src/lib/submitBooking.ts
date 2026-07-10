export interface BookingPayload {
  services: string[];
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  date: string;
  slot: string;
  message: string;
  /** Web-design prospects can opt in to receive the questionnaire by email. */
  wantsQuestionnaire: boolean;
  lang: string;
  submittedAt: string;
}

/**
 * Sends a booking request to our Cloudflare Pages Function (functions/api/booking.ts),
 * which forwards it as an email via Brevo. Default endpoint is the same-origin
 * "/api/booking"; override with VITE_BOOKING_ENDPOINT if ever needed.
 *
 * Note: the endpoint only works on Cloudflare (deploy or `wrangler pages dev`).
 * A plain `vite dev` has no function runtime, so the request will 404 locally.
 */
export async function submitBooking(payload: BookingPayload): Promise<void> {
  const endpoint =
    (import.meta.env.VITE_BOOKING_ENDPOINT as string | undefined) || "/api/booking";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Booking request failed: ${res.status}`);
  }
}
