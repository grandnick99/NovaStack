export interface FragebogenPayload {
  name: string;
  was: string;
  branche: string;
  besonders: string;
  goals: string[];
  goalsOther: string;
  cta: string;
  existingWeb: string;
  oldUrl: string;
  zielgruppe: string;
  kundtyp: string;
  problem: string;
  channels: string[];
  feelings: string[];
  color1Hex: string;
  color2Hex: string;
  colorMode: string;
  inspo: string;
  noDesign: string;
  pages: string[];
  have: string[];
  langs: string[];
  features: string[];
  domain: string;
  domainWish: string;
  competitors: string;
  timeline: string;
  anlass: string;
  selfmgmt: string;
  email: string;
  phone: string;
  extras: string;
  submittedAt: string;
}

/**
 * Sends the completed questionnaire to our Cloudflare Function
 * (functions/api/fragebogen.ts), which forwards it as an email via Brevo.
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
