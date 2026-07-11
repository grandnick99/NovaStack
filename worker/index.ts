/**
 * Worker entry point for the novastack Cloudflare Workers (Static Assets)
 * project. Handles the API routes, then falls through to the static site
 * for everything else.
 *
 * Note: the route logic itself lives in ../functions/api/*.ts, written
 * against the Cloudflare Pages Functions signature — this project deploys as
 * a Workers project (not Pages, see wrangler.toml), so those files are never
 * auto-routed by Cloudflare. They're imported and dispatched manually below.
 */
import { onRequestPost as handleBooking } from "../functions/api/booking";
import { onRequestPost as handleConsentLog } from "../functions/api/consent-log";
import { onRequestPost as handleFragebogen } from "../functions/api/fragebogen";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  BREVO_API_KEY: string;
  BOOKING_TO?: string;
  FRAGEBOGEN_TO?: string;
  SENDER_EMAIL?: string;
  QUESTIONNAIRE_URL?: string;
  CONSENT_LOG?: {
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/booking" && request.method === "POST") {
      return handleBooking({ request, env });
    }

    if (url.pathname === "/api/fragebogen" && request.method === "POST") {
      return handleFragebogen({ request, env });
    }

    if (url.pathname === "/api/consent-log" && request.method === "POST") {
      return handleConsentLog({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
