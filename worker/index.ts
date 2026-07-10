/**
 * Worker entry point for the novastack Cloudflare Workers (Static Assets)
 * project. Handles the form API route, then falls through to the static
 * site for everything else.
 *
 * Note: the form logic itself lives in ../functions/api/booking.ts, written
 * against the Cloudflare Pages Functions signature — this project deploys as
 * a Workers project (not Pages, see wrangler.toml), so that file is never
 * auto-routed by Cloudflare. It's imported and dispatched manually below.
 */
import { onRequestPost as handleBooking } from "../functions/api/booking";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  BREVO_API_KEY: string;
  BOOKING_TO?: string;
  SENDER_EMAIL?: string;
  QUESTIONNAIRE_URL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/booking" && request.method === "POST") {
      return handleBooking({ request, env });
    }

    return env.ASSETS.fetch(request);
  },
};
