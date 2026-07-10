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
 * Sends a booking request.
 *
 * To connect this to a real inbox / CRM / webhook, set `VITE_BOOKING_ENDPOINT`
 * in a `.env` file to a URL that accepts JSON POSTs, e.g.:
 *   - a Formspree / Formspark / Basin endpoint
 *   - a Make.com / Zapier webhook
 *   - your own API route that emails Nicolas
 *
 * Without an endpoint configured it resolves after a short delay so the flow
 * is fully demonstrable in development.
 */
export async function submitBooking(payload: BookingPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_BOOKING_ENDPOINT as string | undefined;

  if (!endpoint) {
    // Mock success — replace by configuring VITE_BOOKING_ENDPOINT.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info("[NovaStack] Booking payload (mock — no endpoint set):", payload);
    }
    await new Promise((r) => setTimeout(r, 1100));
    return;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Booking request failed: ${res.status}`);
  }
}
