export interface FragebogenAttachment {
  name: string;
  type: string;
  /** Base64-encoded file content, no "data:...;base64," prefix. */
  base64: string;
}

export interface FragebogenPayload {
  name: string;
  branche: string;
  besonders: string;
  goals: string[];
  kundtyp: string;
  existingWeb: string;
  oldUrl: string;
  attachment: FragebogenAttachment | null;
  submittedAt: string;
}

/**
 * Sends the completed (short) questionnaire to our Cloudflare Function
 * (functions/api/fragebogen.ts), which forwards it as an email via Brevo —
 * including the optional logo/file upload as an email attachment.
 * Same pattern as submitBooking.ts — same-origin "/api/fragebogen" by
 * default, only works on Cloudflare (deploy or `wrangler dev`), not on a
 * plain `vite dev` (no function runtime there).
 */
export async function submitFragebogen(payload: FragebogenPayload): Promise<void> {
  const endpoint =
    (import.meta.env.VITE_FRAGEBOGEN_ENDPOINT as string | undefined) || "/api/fragebogen";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Fragebogen request failed: ${res.status}`);
  }
}
