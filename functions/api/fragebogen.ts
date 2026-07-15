/**
 * Fragebogen-Endpoint-Logik — Route: POST /api/fragebogen.
 *
 * Gleiches Muster wie functions/api/booking.ts (siehe dort für die volle
 * Erklärung zu Workers vs. Pages Functions — dieses Projekt läuft als
 * Workers, der Aufruf passiert manuell aus worker/index.ts).
 *
 * Nimmt die Antworten aus dem kurzen Vorab-Fragebogen (/fragebogen, siehe
 * src/components/Fragebogen.tsx) entgegen und verschickt sie als E-Mail über
 * Brevo — inklusive optional hochgeladenem Logo/Bild als Anhang.
 *
 * Der Fragebogen ist bewusst kurz: er ersetzt kein Gespräch, sondern gibt
 * vorab ein grobes Bild. Alle Details werden im persönlichen Termin geklärt.
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

interface FragebogenAttachment {
  name: string;
  type: string;
  base64: string;
}

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

/** Array -> "a, b, c"; leer/undefined -> "—". */
const line = (v: unknown): string => {
  const s = Array.isArray(v) ? v.join(", ") : String(v ?? "");
  return s.trim() || "—";
};

/** Grobe Validierung: nur Bilder/PDFs, max. 8 MB (roh, vor Base64-Aufblähung). */
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];

function isValidAttachment(a: unknown): a is FragebogenAttachment {
  if (!a || typeof a !== "object") return false;
  const att = a as Record<string, unknown>;
  if (typeof att.name !== "string" || typeof att.type !== "string" || typeof att.base64 !== "string") {
    return false;
  }
  if (!ALLOWED_ATTACHMENT_TYPES.includes(att.type)) return false;
  // base64 length -> approx raw byte size
  const approxBytes = (att.base64.length * 3) / 4;
  return approxBytes > 0 && approxBytes <= MAX_ATTACHMENT_BYTES;
}

async function sendViaBrevo(
  env: Env,
  msg: {
    to: string;
    toName?: string;
    subject: string;
    html: string;
    attachment?: FragebogenAttachment | null;
  },
) {
  const sender = env.SENDER_EMAIL || "info@novastackstudio.de";
  const body: Record<string, unknown> = {
    sender: { name: "NovaStack Website", email: sender },
    to: [{ email: msg.to, name: msg.toName || msg.to }],
    subject: msg.subject,
    htmlContent: msg.html,
  };
  if (msg.attachment) {
    body.attachment = [{ content: msg.attachment.base64, name: msg.attachment.name }];
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

/** Fertig zum Einfügen in einen Bau-Prompt. */
function buildPromptBlock(d: Record<string, unknown>, hasAttachment: boolean): string {
  return `================================================================
KUNDENFEEDBACK: ${line(d.name)}
================================================================

- Name: ${line(d.name)}
- Branche: ${line(d.branche)}
- Alleinstellungsmerkmal / Fokus: ${line(d.besonders)}
- Hauptziele: ${line(d.goals)}
- Kundentyp: ${line(d.kundtyp)}
- Bestehende Website: ${line(d.existingWeb)}${line(d.oldUrl) !== "—" ? "\n- Alte URL: " + line(d.oldUrl) : ""}
- Logo/Material hochgeladen: ${hasAttachment ? "Ja (siehe Anhang)" : "Nein"}

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

  const attachment = isValidAttachment(d.attachment) ? d.attachment : null;
  if (d.attachment && !attachment) {
    return json({ ok: false, error: "Invalid attachment" }, 400);
  }

  const html = `
    <h2 style="font-family:sans-serif;">Neuer Fragebogen: ${esc(name)}</h2>
    <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 10px;">
      Kurzform — Details werden im persönlichen Gespräch geklärt.
    </p>
    ${section("Unternehmen", [
      ["Name", d.name],
      ["Branche", d.branche],
      ["Alleinstellungsmerkmal / Fokus", d.besonders],
    ])}
    ${section("Ziel & Kunden", [
      ["Hauptziele", d.goals],
      ["Kundentyp", d.kundtyp],
    ])}
    ${section("Website", [
      ["Bestehende Website", d.existingWeb],
      ["Alte URL", d.oldUrl],
      ["Logo/Material hochgeladen", attachment ? `Ja — ${attachment.name}` : "Nein"],
    ])}
    <hr style="margin:24px 0;border:none;border-top:1px solid #ddd;" />
    <p style="font-family:sans-serif;font-size:12px;color:#888;margin:0 0 6px;">Zum Einfügen in deinen Bau-Prompt:</p>
    <pre style="font-family:monospace;font-size:12px;white-space:pre-wrap;background:#f5f5f5;color:#111;padding:14px;border-radius:8px;">${esc(buildPromptBlock(d, !!attachment))}</pre>
  `;

  try {
    await sendViaBrevo(env, {
      to,
      toName: "NovaStack",
      subject: `Fragebogen: ${name}`,
      html,
      attachment,
    });
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: (err as Error).message }, 502);
  }
};
