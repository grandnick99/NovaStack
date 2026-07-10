import type { Consent } from "./ConsentContext";

/**
 * Consent-gated loading of third-party analytics / marketing scripts.
 *
 * Nothing loads until the visitor has explicitly consented to that category —
 * this runs on every consent change (including a stored choice from a
 * previous visit), so a script configured after the fact still loads for
 * returning visitors who already said yes.
 *
 * ┌─ TODO (Nicolas) ──────────────────────────────────────────────────────────┐
 * │ Once you pick an analytics tool, set its ID as an env var (e.g.           │
 * │ VITE_GA_MEASUREMENT_ID) and fill in the loader below. Until then this      │
 * │ is a no-op — the consent banner and gating logic work regardless.          │
 * └────────────────────────────────────────────────────────────────────────────┘
 */

let analyticsLoaded = false;
let marketingLoaded = false;

function loadGoogleAnalytics() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!id || analyticsLoaded) return;
  analyticsLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", id);
}

function loadMarketingScripts() {
  // TODO: e.g. Meta Pixel, LinkedIn Insight — same guard pattern as above.
  marketingLoaded = true;
}

export function loadGatedScripts(consent: Consent) {
  if (consent.analytics && !analyticsLoaded) loadGoogleAnalytics();
  if (consent.marketing && !marketingLoaded) loadMarketingScripts();
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
