/**
 * Fragebogen-Endpoint-Logik — Route: POST /api/fragebogen.
 *
 * Gleiches Muster wie functions/api/booking.ts (siehe dort für die volle
 * Erklärung zu Workers vs. Pages Functions — dieses Projekt läuft als
 * Workers, der Aufruf passiert manuell aus worker/index.ts).
 *
 * Nimmt die Antworten aus dem Vorab-Fragebogen (/fragebogen, siehe
 * src/components/Fragebogen.tsx) entgegen und verschickt sie als eine
 * E-Mail über Brevo — einmal als lesbare Tabelle, einmal als fertiger
 * Textblock zum Einfügen in einen Bau-Prompt (Migration der alten
 * "KUNDENFEEDBACK-BLOCK"-Funktion aus dem ursprünglichen, separaten
 * Fragebogen).
 *
 * ── Einmalig in Cloudflare einrichten ──────────────────────────────────────
 *   Nutzt dieselben Variablen wie /api/booking (BREVO_API_KEY, SENDER_EMAIL,
 *   BOOKING_TO) — kein weiteres Pflicht-Setup nötig. Optional:
 *     FRAGEBOGEN_TO   – eigene Zieladresse für Fragebogen-Antworten,
 *                        falls die mal von der Terminanfrage getrennt werden
 *                        soll. Ohne Setzen fällt es auf BOOKING_TO zurück
 *                        (Default dort: info@novastackstudio.de).
 * ───────────────────────────────────────────────────────────────────────────
 */

interface Env {
  BREVO_API_KEY: string;
  FRAGEBOGEN_TO?: string;
  BOOKING_TO?: string;
  SENDER_EMAIL?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const isEmail = (v: unknown) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Array -> "a, b, c"; leer/undefined -> "—". */
const line = (v: unknown): string => {
  const s = Array.isArray(v) ? v.join(", ") : String(v ?? "");
  return s.trim() || "—";
};

async function sendViaBrevo(
  env: Env,
  msg: {
    to: string;
    toName?: string;
    subject: string;
    html: string;
    replyToEmail?: string;
    replyToName?: string;
  },
) {
  const sender = env.SENDER_EMAIL || "info@novastackstudio.de";
  const body: Record<string, unknown> = {
    sender: { name: "NovaStack Website", email: sender },
    to: [{ email: msg.to, name: msg.toName || msg.to }],
    subject: msg.subject,
    htmlContent: msg.html,
  };
  if (msg.replyToEmail) {
    body.replyTo = { email: msg.replyToEmail, name: msg.replyToName || msg.replyToEmail };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Brevo ${res.status}: ${detail}`);
  }
}

function section(title: string, rows: [string, unknown][]): string {
  const trs = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:3px 14px 3px 0;color:#667;white-space:nowrap;vertical-align:top;">${esc(k)}</td><td style="padding:3px 0;"><strong>${esc(line(v)).replace(/\n/g, "<br/>")}</strong></td></tr>`,
    )
    .join("");
  return `<h3 style="font-family:sans-serif;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#3a74cc;margin:22px 0 6px;">${esc(title)}</h3><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;">${trs}</table>`;
}

/** Migriert die alte "KUNDENFEEDBACK-BLOCK"-Funktion — fertig zum Einfügen in einen Bau-Prompt. */
function buildPromptBlock(d: Record<string, unknown>): string {
  const goals = [line(d.goals) !== "—" ? line(d.goals) : "", line(d.goalsOther) !== "—" ? line(d.goalsOther) : ""]
    .filter(Boolean)
    .join("; ") || "—";

  return `================================================================
KUNDENFEEDBACK: ${line(d.name)}
================================================================

UNTERNEHMEN
- Name: ${line(d.name)}
- Was sie machen: ${line(d.was)}
- Branche: ${line(d.branche)}
- Alleinstellungsmerkmal / USP: ${line(d.besonders)}

WEBSITE-ZIELE
- Ziele: ${goals}
- Wichtigste Aktion der Besucher: ${line(d.cta)}
- Bestehende Website: ${line(d.existingWeb)}${line(d.oldUrl) !== "—" ? "\n- Alte URL: " + line(d.oldUrl) : ""}

ZIELGRUPPE
- Ideale Kunden: ${line(d.zielgruppe)}
- Kundentyp: ${line(d.kundtyp)}
- Problem das gelöst wird: ${line(d.problem)}
- Aktive Kanäle: ${line(d.channels)}

DESIGN & STIL
- Gewünschte Stimmung: ${line(d.feelings)}
- Hauptfarbe: ${line(d.color1Hex)}
- Akzentfarbe: ${line(d.color2Hex)}
- Farbverhältnis: ${line(d.colorMode)}
- Inspirations-Websites: ${line(d.inspo)}
- Design-No-Gos: ${line(d.noDesign)}

INHALT & SEITEN
- Benötigte Seiten: ${line(d.pages)}
- Vorhandenes Material: ${line(d.have)}
- Sprachen: ${line(d.langs)}

FUNKTIONEN & TECHNIK
- Gewünschte Funktionen: ${line(d.features)}
- Domain vorhanden: ${line(d.domain)}
- Wunsch-Domain: ${line(d.domainWish)}
- Wettbewerber: ${line(d.competitors)}

PROJEKTRAHMEN
- Timeline: ${line(d.timeline)}
- Anlass / Datum: ${line(d.anlass)}
- Website selbst pflegen: ${line(d.selfmgmt)}
- Kontakt: ${line(d.email)} / ${line(d.phone)}
- Sonstiges: ${line(d.extras)}

================================================================`;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  if (!env.BREVO_API_KEY) {
    return json({ ok: false, error: "Server not configured" }, 500);
  }

  let d: Record<string, unknown>;
  try {
    d = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const to = env.FRAGEBOGEN_TO || env.BOOKING_TO || "info@novastackstudio.de";
  const name = line(d.name);
  const email = typeof d.email === "string" ? d.email.trim() : "";

  const html = `
    <h2 style="font-family:sans-serif;">Neuer Fragebogen: ${esc(name)}</h2>
    ${section("Unternehmen", [
      ["Name", d.name],
      ["Was sie machen", d.was],
      ["Branche", d.branche],
      ["Alleinstellungsmerkmal", d.besonders],
    ])}
    ${section("Ziele", [
      ["Hauptziele", d.goals],
      ["Eigene Ziele", d.goalsOther],
      ["Wichtigste Aktion", d.cta],
      ["Bestehende Website", d.existingWeb],
      ["Alte URL", d.oldUrl],
    ])}
    ${section("Zielgruppe", [
      ["Ideale Kunden", d.zielgruppe],
      ["Kundentyp", d.kundtyp],
      ["Problem", d.problem],
      ["Aktive Kanäle", d.channels],
    ])}
    ${section("Design & Stil", [
      ["Stimmung", d.feelings],
      ["Hauptfarbe", d.color1Hex],
      ["Akzentfarbe", d.color2Hex],
      ["Farbverhältnis", d.colorMode],
      ["Inspiration", d.inspo],
      ["No-Gos", d.noDesign],
    ])}
    ${section("Inhalt & Seiten", [
      ["Seiten", d.pages],
      ["Vorhanden", d.have],
      ["Sprachen", d.langs],
    ])}
    ${section("Extras & Technik", [
      ["Funktionen", d.features],
      ["Domain vorhanden", d.domain],
      ["Wunsch-Domain", d.domainWish],
      ["Wettbewerber", d.competitors],
    ])}
    ${section("Kontakt & Zeitplan", [
      ["Timeline", d.timeline],
      ["Anlass / Datum", d.anlass],
      ["Selbst pflegen", d.selfmgmt],
      ["E-Mail", d.email],
      ["Telefon", d.phone],
      ["Sonstiges", d.extras],
    ])}
    <hr style="margin:24px 0;border:none;border-top:1px solid #ddd;" />
    <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 6px;">Zum Einfügen in deinen Bau-Prompt:</p>
    <pre style="font-family:monospace;font-size:12px;white-space:pre-wrap;background:#f5f5f5;color:#111;padding:14px;border-radius:8px;">${esc(buildPromptBlock(d))}</pre>
  `;

  try {
    await sendViaBrevo(env, {
      to,
      toName: "NovaStack",
      subject: `Fragebogen: ${name}`,
      html,
      replyToEmail: isEmail(email) ? email : undefined,
      replyToName: name !== "—" ? name : undefined,
    });
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: (err as Error).message }, 502);
  }
};
