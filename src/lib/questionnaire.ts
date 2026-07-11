/**
 * Pre-project questionnaire delivery.
 *
 * When a prospective web-design client opts in at the end of the booking flow,
 * we trigger an email containing the questionnaire link to the address they
 * entered. The questionnaire itself is now hosted on this site at /fragebogen
 * (see src/components/Fragebogen.tsx) — migrated from the old, separately
 * hosted static-HTML + Formspree version.
 *
 * A browser cannot send email directly, so this posts the request to our own
 * Cloudflare Function (functions/api/booking.ts), which sends it via Brevo.
 * The booking submission ALSO carries a `wantsQuestionnaire` flag, so a
 * single automation can react to either signal.
 *
 * ┌─ Cloudflare Setup ──────────────────────────────────────────────────────┐
 * │ The actual link text in the email is built server-side from the        │
 * │ `QUESTIONNAIRE_URL` runtime variable in functions/api/booking.ts        │
 * │ (Workers & Pages → novastack → Settings → Variables and secrets) —      │
 * │ NOT from `QUESTIONNAIRE.url` below. Set it to:                          │
 * │   QUESTIONNAIRE_URL = https://novastackstudio.de/fragebogen             │
 * │ `QUESTIONNAIRE.url` here is kept as the client-side source of truth     │
 * │ for the same value (sent along in the payload) and as a fallback if     │
 * │ booking.ts is ever changed to prefer the client-sent URL.               │
 * └────────────────────────────────────────────────────────────────────────┘
 */
export const QUESTIONNAIRE = {
  url: "https://novastackstudio.de/fragebogen",
  /** Optional sender identity the automation may use. */
  fromName: "NovaStack",
  replyTo: "info@novastackstudio.de",
};

export interface QuestionnaireRequest {
  type: "questionnaire";
  email: string;
  name: string;
  lang: string;
  questionnaireUrl: string;
  requestedAt: string;
}

/**
 * Ask the backend to email the questionnaire to the given address.
 * Non-blocking by design: a failure here must never break a successful booking.
 */
export async function requestQuestionnaire(args: {
  email: string;
  name: string;
  lang: string;
}): Promise<void> {
  const endpoint =
    (import.meta.env.VITE_QUESTIONNAIRE_ENDPOINT as string | undefined) ||
    (import.meta.env.VITE_BOOKING_ENDPOINT as string | undefined) ||
    "/api/booking";

  const payload: QuestionnaireRequest = {
    type: "questionnaire",
    email: args.email,
    name: args.name,
    lang: args.lang,
    questionnaireUrl: QUESTIONNAIRE.url,
    requestedAt: new Date().toISOString(),
  };

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* swallow: the booking itself already succeeded */
  }
}
