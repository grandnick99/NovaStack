import { useEffect, useState } from "react";

/**
 * Minimal path-based router — just enough for the legal pages
 * (/impressum, /datenschutz) without pulling in a routing library.
 *
 * Cloudflare Pages serves index.html for these paths via public/_redirects,
 * so a hard refresh on /impressum still loads the app.
 */

/** Current pathname, kept in sync with browser back/forward + navigate(). */
export function useRoute(): string {
  const [path, setPath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return path;
}

/** Client-side navigation to an in-app path. */
export function navigate(to: string): void {
  if (to !== window.location.pathname) {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  window.scrollTo(0, 0);
}
