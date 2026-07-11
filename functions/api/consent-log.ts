/**
 * Server-side consent-proof log — Route: POST /api/consent-log.
 * See src/lib/consentLog.ts for what triggers this and why.
 *
 * Dispatched manually from worker/index.ts (same reasoning as
 * functions/api/booking.ts — this is a Workers project, not Pages, so the
 * functions/ directory is not auto-routed).
 *
 * Append-only: every call writes one new KV entry, nothing is ever
 * overwritten or read back by the app itself. No IP, no user agent, no
 * cookies/identifiers are stored — only the consent choice and a timestamp,
 * which is all that's needed to demonstrate a consent event occurred
 * (DSGVO Art. 7 Abs. 1).
 *
 * ── Einmalig in Cloudflare einrichten ──────────────────────────────────────
 *   Eine KV-Namespace anlegen und als Binding `CONSENT_LOG` mit dem Worker
 *   verbinden (Dashboard: Workers & Pages → novastack → Settings →
 *   Bindings → "KV Namespace" hinzufügen, Variable name `CONSENT_LOG`;
 *   oder per `wrangler kv namespace create novastack-consent-log` + Eintrag
 *   in wrangler.toml, siehe Kommentar dort). Ohne dieses Binding werden
 *   Consent-Events kommentarlos verworfen (kein Fehler für den Besucher,
 *   aber auch kein Log).
 * ───────────────────────────────────────────────────────────────────────────
 */

interface Env {
  CONSENT_LOG?: {
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  };
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  // No binding configured yet — accept the request but no-op, so the
  // (invisible, fire-and-forget) beacon never surfaces an error client-side.
  if (!env.CONSENT_LOG) return json({ ok: true, logged: false });

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const entry = {
    analytics: !!data.analytics,
    marketing: !!data.marketing,
    at: typeof data.at === "string" ? data.at : new Date().toISOString(),
  };

  // Keep for 3 years — long enough to cover any realistic evidentiary need,
  // short enough to not accumulate indefinitely (KV keys expire automatically).
  const key = `${Date.now()}-${crypto.randomUUID()}`;
  await env.CONSENT_LOG.put(key, JSON.stringify(entry), {
    expirationTtl: 60 * 60 * 24 * 365 * 3,
  });

  return json({ ok: true, logged: true });
};
