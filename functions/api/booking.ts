/**
 * Formular-Endpoint-Logik für NovaStack — Route: POST /api/booking.
 *
 * Geschrieben im Cloudflare-Pages-Functions-Signaturformat (praktisch als
 * eigenständiger Handler), aber dieses Projekt läuft als **Workers**-Projekt
 * (Static Assets, siehe wrangler.toml), nicht als Pages — Pages' automatisches
 * Datei-Routing (functions/ → Route) greift hier NICHT von selbst. Der
 * eigentliche Aufruf passiert manuell aus `worker/index.ts`, dem Worker-
 * Entry-Point, der `/api/booking` erkennt und `onRequestPost` von hier ruft.
 *
 * Nimmt die Buchungs-/Terminanfrage (und die optionale Fragebogen-Anforderung)
 * entgegen und verschickt die E-Mail über Brevo (Sendinblue SAS, Frankreich,
 * EU-Server). Es läuft alles in deinem Cloudflare-Konto — kein externer
 * Formular-Dienst dazwischen.
 *
 * ── Einmalig in Cloudflare einrichten ──────────────────────────────────────
 *   Workers & Pages → Projekt „novastack" → Settings → Variables and secrets:
 *     BREVO_API_KEY     (Secret!)  – API-Key aus Brevo (SMTP & API → API Keys)
 *     BOOKING_TO        info@novastackstudio.de   (Ziel deiner Benachrichtigung)
 *     SENDER_EMAIL      info@novastackstudio.de   (in Brevo verifizierter Absender/Domain)
 *     QUESTIONNAIRE_URL (optional) – Link, der Interessenten gemailt wird
 *
 *   In Brevo vorher: Absender bzw. Domain novastackstudio.de verifizieren
 *   (Senders, Domains & Dedicated IPs) und den AVV/DPA akzeptieren.
 *
 *   Wichtig: Das sind **Runtime**-Variablen (Settings → Variables and secrets),
 *   nicht die Build-Variablen (Settings → Build) wie VITE_GA_MEASUREMENT_ID —
 *   der Worker liest sie zur Laufzeit aus `env`, nicht Vite zur Build-Zeit.
 * ───────────────────────────────────────────────────────────────────────────
 */

interface Env {
  BREVO_API_KEY: string;
  BOOKING_TO?: string;
  SENDER_EMAIL?: string;
  QUESTIONNAIRE_URL?: string;
  /** See functions/api/leadwerk-pending.ts — optional booking->LeadWerk queue. */
  LEADWERK_QUEUE?: {
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  };
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

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  if (!env.BREVO_API_KEY) {
    return json({ ok: false, error: "Server not configured" }, 500);
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const to = env.BOOKING_TO || "info@novastackstudio.de";

  try {
    // ── Fragebogen-Anforderung: Link an den Interessenten mailen ───────────
    if (data.type === "questionnaire") {
      if (!isEmail(data.email)) return json({ ok: false, error: "Invalid email" }, 400);
      // Hardcoded fallback so the link always goes out even if the optional
      // QUESTIONNAIRE_URL runtime variable was never set in Cloudflare — a
      // missing env var used to silently fall back to a "we'll send it soon"
      // placeholder that never actually arrived (bug: no follow-up email was
      // ever scheduled to send the real link).
      const link = env.QUESTIONNAIRE_URL || "https://novastackstudio.de/fragebogen";
      const html = `
        <p>Hallo ${esc(data.name) || "und willkommen"},</p>
        <p>vielen Dank für Ihr Interesse an einer Website mit NovaStack.
        Hier ist Ihr Vorab-Fragebogen: <a href="${esc(link)}">${esc(link)}</a></p>
        <p>Herzliche Grüße<br/>Nicolas Grandezka · NovaStack</p>`;
      await sendViaBrevo(env, {
        to: String(data.email),
        toName: String(data.name || ""),
        subject: "Ihr Vorab-Fragebogen · NovaStack",
        html,
        replyToEmail: to,
        replyToName: "NovaStack",
      });
      return json({ ok: true });
    }

    // ── Buchungs-/Terminanfrage: Benachrichtigung an Nicolas ───────────────
    if (!isEmail(data.email)) return json({ ok: false, error: "Invalid email" }, 400);

    const services = Array.isArray(data.services) ? (data.services as string[]).join(", ") : "";
    const rows: [string, unknown][] = [
      ["Leistungen", services],
      ["Name", data.name],
      ["Unternehmen", data.company],
      ["E-Mail", data.email],
      ["Telefon", data.phone],
      ["Budget", data.budget],
      ["Wunschtermin", data.date],
      ["Rückruf zwischen", data.callFrom && data.callTo ? `${data.callFrom} – ${data.callTo} Uhr` : ""],
      ["Fragebogen gewünscht", data.wantsQuestionnaire ? "ja" : "nein"],
      ["Sprache", data.lang],
    ];
    const table = rows
      .filter(([, v]) => String(v ?? "").trim() !== "")
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666;">${esc(k)}</td><td style="padding:4px 0;"><strong>${esc(v)}</strong></td></tr>`,
      )
      .join("");
    const message = String(data.message ?? "").trim();

    const html = `
      <h2 style="font-family:sans-serif;">Neue Terminanfrage über novastackstudio.de</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">${table}</table>
      ${message ? `<p style="font-family:sans-serif;font-size:14px;"><em>Nachricht:</em><br/>${esc(message).replace(/\n/g, "<br/>")}</p>` : ""}
    `;

    await sendViaBrevo(env, {
      to,
      toName: "NovaStack",
      subject: `Neue Anfrage: ${String(data.name || data.email)}${services ? ` (${esc(services)})` : ""}`,
      html,
      replyToEmail: String(data.email),
      replyToName: String(data.name || ""),
    });

    // Also queue for LeadWerk (Nick's local sales app) to pick up on its next
    // poll — see functions/api/leadwerk-pending.ts. Never let a queue failure
    // fail the booking itself; the email above is the source of truth.
    if (env.LEADWERK_QUEUE) {
      try {
        const id = crypto.randomUUID();
        const entry = {
          id,
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          services,
          budget: data.budget,
          date: data.date,
          callFrom: data.callFrom,
          callTo: data.callTo,
          message,
          submittedAt: new Date().toISOString(),
        };
        await env.LEADWERK_QUEUE.put(`booking:${id}`, JSON.stringify(entry), {
          expirationTtl: 60 * 60 * 24 * 14,
        });
      } catch {
        /* swallow: LeadWerk import is a convenience, not critical path */
      }
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: (err as Error).message }, 502);
  }
};
