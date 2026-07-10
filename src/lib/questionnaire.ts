/**
 * Pre-project questionnaire delivery.
 *
 * When a prospective web-design client opts in at the end of the booking flow,
 * we trigger an email containing the questionnaire to the address they entered.
 *
 * A browser cannot send email directly, so this posts the request to a
 * configurable automation endpoint (Make.com / Zapier / your own API route)
 * which performs the actual send. The booking submission ALSO carries a
 * `wantsQuestionnaire` flag, so a single automation can react to either signal.
 *
 * ┌─ TODO (Nicolas) ──────────────────────────────────────────────────────────┐
 * │ Once you give me the questionnaire details, fill these in:                 │
 * │  • QUESTIONNAIRE.url  → the link recipients should receive                 │
 * │                          (Google Form / Typeform / hosted PDF, …)          │
 * │  • VITE_QUESTIONNAIRE_ENDPOINT (in .env) → webhook that sends the email.    │
 * │     If unset, it falls back to VITE_BOOKING_ENDPOINT.                       │
 * │  • QUESTIONNAIRE.fromName / replyTo are optional metadata the automation    │
 * │     can use as the sender identity.                                        │
 * └────────────────────────────────────────────────────────────────────────────┘
 */
export const QUESTIONNAIRE = {
  /** TODO: the questionnaire link to email the client (provided later). */
  url: "",
  /** Optional sender identity the automation may use. */
  fromName: "NovaStack",
  replyTo: "",
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
