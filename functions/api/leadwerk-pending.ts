/**
 * LeadWerk booking-queue endpoint — Route: GET /api/leadwerk/pending.
 *
 * LeadWerk (Nick's local sales app) has no server of its own and fully quits
 * when its window closes, so the cloud site can't push a booking into it
 * directly. Instead: every booking POST (functions/api/booking.ts) also
 * writes a copy into this KV-backed queue, and LeadWerk polls this endpoint
 * while it's running to pull new leads in — mirrors LeadWerk's existing
 * "fetchCrawler" client pattern (it only ever pulls, never listens).
 *
 * Auth: a shared-secret header. This returns customer PII (name, email,
 * phone), so it's gated even though it's a low-stakes internal integration —
 * deliberately minimal (one static key), not a full auth system.
 *
 * ── Einmalig in Cloudflare einrichten ──────────────────────────────────────
 *   1. KV-Namespace anlegen (einmalig):
 *        wrangler kv namespace create novastack-leadwerk-queue
 *      und den zurückgegebenen Eintrag in wrangler.toml ergänzen:
 *        [[kv_namespaces]]
 *        binding = "LEADWERK_QUEUE"
 *        id = "<id aus dem Befehl oben>"
 *   2. Workers & Pages → novastack → Settings → Variables and secrets:
 *        LEADWERK_API_KEY  (Secret!) – frei gewählter Schlüssel; LeadWerk
 *                                       schickt ihn im Header `x-api-key`.
 *
 *   Ohne KV-Binding bzw. ohne Secret bleibt der Endpoint inaktiv (liefert
 *   { ok:false, error:"Not configured" }) statt zu crashen — bricht also
 *   nichts am bestehenden Deploy, bis beides eingerichtet ist.
 * ───────────────────────────────────────────────────────────────────────────
 */

interface KVNamespace {
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options?: { prefix?: string; limit?: number }): Promise<{ keys: { name: string }[] }>;
  get(key: string): Promise<string | null>;
}

interface Env {
  LEADWERK_QUEUE?: KVNamespace;
  LEADWERK_API_KEY?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  if (!env.LEADWERK_QUEUE || !env.LEADWERK_API_KEY) {
    return json({ ok: false, error: "Not configured" }, 503);
  }

  const key = request.headers.get("x-api-key");
  if (!key || key !== env.LEADWERK_API_KEY) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const queue = env.LEADWERK_QUEUE;
  const { keys } = await queue.list({ prefix: "booking:", limit: 500 });
  const items = (
    await Promise.all(
      keys.map(async (k) => {
        const raw = await queue.get(k.name);
        if (!raw) return null;
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      }),
    )
  ).filter((v) => v !== null);

  return json({ ok: true, items });
};
