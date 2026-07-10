import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { initSmoothScroll } from "./lib/smoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import Services from "./components/Services";
import Approach from "./components/Approach";
import About from "./components/About";
import Proof from "./components/Proof";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

/** Faint architectural strata + vignette sitting behind all content. */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* atmospheric base gradient — viewport-fixed via this layer and painted
          once, replacing the body's background-attachment:fixed (which repainted
          every scroll frame). */}
      <div className="absolute inset-0" style={{ background: "var(--page-grad)" }} />
      {/* horizontal stack rules */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 118px, rgba(104,161,235,0.05) 119px, transparent 120px)",
          maskImage: "linear-gradient(180deg, transparent, #000 15%, #000 85%, transparent)",
        }}
      />
      {/* a single luminous source, upper-right */}
      <div
        className="absolute -right-[10%] -top-[10%] h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(58,116,204,0.18), rgba(58,116,204,0) 65%)",
          filter: "blur(40px)",
        }}
      />
      {/* bottom vignette — fades to the page base in either theme */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{ background: "linear-gradient(to top, var(--vignette), transparent)" }}
      />
    </div>
  );
}

export default function App() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">

      <a
        href="#inhalt"
        className="sr-only z-[100] rounded-full bg-nova-sky px-5 py-2.5 font-grotesk text-sm text-ink-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Zum Inhalt springen
      </a>

      <Backdrop />
      <div className="grain" aria-hidden />

      <Nav />

      <main id="inhalt" className="relative z-10">
        <Hero />
        <Philosophy />
        <Services />
        <Approach />
        <About />
        <Proof />
        <Booking />
      </main>

      <Footer />
      <CookieBanner />
    </MotionConfig>
  );
}
