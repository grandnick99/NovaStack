import Lenis from "lenis";

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Initialise Lenis once. Returns a cleanup function. */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }

  lenis = new Lenis({
    // lerp-based catch-up tracks wheel/trackpad input far more tightly than a
    // long duration+easing tail, which is what felt like it "lagged behind".
    // 0.28 keeps a hint of glide while staying close to the finger/wheel.
    lerp: 0.28,
    wheelMultiplier: 1.0,
    smoothWheel: true,
    // Touch stays native: hijacked touch scrolling (syncTouch) reads as lag on
    // phones, and native momentum scrolling is smoother than anything we fake.
    syncTouch: false,
  });

  let frame = 0;
  function raf(time: number) {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  }
  frame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

/** Smoothly scroll to an element by id (or to the top with "#"). */
export function scrollToId(target: string) {
  const id = target.replace(/^#/, "");
  const el = id ? document.getElementById(id) : null;

  if (lenis && (el || !id)) {
    lenis.scrollTo(el ?? 0, { offset: -72, duration: 1 });
    return;
  }

  // Fallback (reduced motion / no Lenis)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}
