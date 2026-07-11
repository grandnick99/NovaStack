/**
 * Server-side consent-proof logging (DSGVO Art. 7 Abs. 1 — the burden of
 * proof for an obtained consent lies with the controller, not the visitor).
 *
 * Fire-and-forget: uses navigator.sendBeacon so it never blocks or delays
 * the UI, and still fires even if the visitor navigates away immediately
 * after choosing. Deliberately minimal — no IP, no user agent, no path,
 * nothing that could re-identify the visitor. Just proof that a consent
 * choice of this shape happened at this time.
 */
import type { Consent } from "./ConsentContext";

export function logConsentServerSide(consent: Consent): void {
  if (typeof navigator === "undefined" || !navigator.sendBeacon) return;

  const payload = JSON.stringify({
    analytics: consent.analytics,
    marketing: consent.marketing,
    at: new Date().toISOString(),
  });

  try {
    navigator.sendBeacon(
      "/api/consent-log",
      new Blob([payload], { type: "application/json" }),
    );
  } catch {
    // Best-effort only — a failed beacon must never break the consent flow.
  }
}
