import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import { scrollToId } from "../lib/smoothScroll";
import { cx } from "../lib/cx";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { EASE } from "../lib/motion";

function MiniMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mini-g" x1="6" y1="4" x2="34" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#CFE0FB" />
          <stop offset="0.5" stopColor="#68A1EB" />
          <stop offset="1" stopColor="#3A74CC" />
        </linearGradient>
      </defs>
      <polygon points="20,30 33,35 20,40 7,35" fill="#1c356b" />
      <polygon points="20,24 31,29 20,34 9,29" fill="#2D5DA9" />
      <path d="M20,3 L23,19 L34,22 L23,25 L20,33 L17,25 L6,22 L17,19 Z" fill="url(#mini-g)" />
    </svg>
  );
}

export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [open, setOpen] = useState(false);
  const wasPastHero = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // The nav CTA only lights up once the hero is behind us.
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fire a one-shot "power on" flash the moment the CTA crosses into its lit state.
  useEffect(() => {
    if (pastHero && !wasPastHero.current) {
      wasPastHero.current = true;
      setFlashing(true);
      const id = setTimeout(() => setFlashing(false), 240);
      return () => clearTimeout(id);
    }
    if (!pastHero) wasPastHero.current = false;
  }, [pastHero]);

  // Lock body scroll while the mobile menu is open; Escape closes it
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { label: t.philosophy.label, id: "philosophie" },
    { label: t.nav.services, id: "leistungen" },
    { label: t.approach.label, id: "arbeitsweise" },
    { label: t.nav.about, id: "studio" },
    { label: t.nav.proof, id: "referenzen" },
  ];

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-nova",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="shell">
          <div
            className={cx(
              // Bleeds past the shell text grid further than the content
              // cards do, so the nav pill reads as distinctly wider than
              // every other box on the page — logo and CTA still sit on
              // the grid via matching inner padding. Capped short of the
              // shell's own gutter so the pill never touches the true
              // viewport edge, even on narrow phones. (md bleed must stay
              // smaller than the md shell padding of 40px, or the pill
              // clips off the true viewport edge on tablet/laptop widths.)
              "-mx-5 flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-nova md:-mx-8 md:px-12",
              scrolled
                ? "glass shadow-slab"
                : "border border-transparent bg-transparent",
            )}
          >
            <button
              onClick={() => go("")}
              // Pulled further left than the grid-aligned baseline the pill
              // padding gives every other child, while staying inside the
              // pill's own edge.
              className="group -ml-2 flex items-center gap-2.5 md:-ml-6"
              aria-label="NovaStack, nach oben"
            >
              {/* Logo + wordmark start large and shrink to the compact size on scroll */}
              <MiniMark
                className={cx(
                  "transition-all duration-500 ease-nova group-hover:-translate-y-0.5",
                  scrolled ? "h-9 w-9" : "h-11 w-11 md:h-14 md:w-14",
                )}
              />
              <span className="flex flex-col items-start">
                <Wordmark
                  className={cx(
                    "w-auto transition-all duration-500 ease-nova",
                    scrolled ? "h-[26px]" : "h-[32px] md:h-[40px]",
                  )}
                />
                {/* Tagline — slides up underneath the wordmark once you scroll */}
                <span
                  className={cx(
                    "block overflow-hidden transition-[max-height,margin] duration-500 ease-nova",
                    scrolled ? "mt-0 max-h-0" : "mt-0.5 max-h-4",
                  )}
                >
                  <span
                    className={cx(
                      "block whitespace-nowrap font-grotesk font-medium uppercase tracking-label text-nova-sky/70 transition-all duration-500 ease-nova",
                      scrolled
                        ? "-translate-y-full text-[9px] opacity-0"
                        : "translate-y-0 text-[10px] opacity-100 md:text-[11px]",
                    )}
                  >
                    {t.hero.tagline}
                  </span>
                </span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="rounded-full px-4 py-2 font-grotesk text-sm text-paper/70 transition-colors duration-200 hover:bg-nova-sky/[0.06] hover:text-paper"
                >
                  {l.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <ThemeToggle className="hidden sm:flex" />
              <button
                onClick={() => go("termin")}
                className={cx(
                  "btn-primary sheen-mask hidden md:inline-flex",
                  !pastHero && "btn-quiet",
                  flashing && "btn-flash",
                )}
              >
                {t.nav.cta}
              </button>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-nova-sky/15 bg-nova-sky/[0.04] lg:hidden"
                aria-label={t.nav.menu}
                aria-expanded={open}
              >
                <span className="relative flex h-3.5 w-5 flex-col justify-between">
                  <span
                    className={cx(
                      "h-0.5 w-full rounded-full bg-paper transition-all duration-300",
                      open && "translate-y-[6px] rotate-45",
                    )}
                  />
                  <span
                    className={cx(
                      "h-0.5 w-full rounded-full bg-paper transition-all duration-300",
                      open && "opacity-0",
                    )}
                  />
                  <span
                    className={cx(
                      "h-0.5 w-full rounded-full bg-paper transition-all duration-300",
                      open && "-translate-y-[6px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-nova-ink/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.nav
              className="glass-lit absolute inset-x-4 top-24 rounded-slab p-6"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex flex-col">
                {links.map((l, i) => (
                  <button
                    key={l.id}
                    onClick={() => go(l.id)}
                    className="flex items-center justify-between border-b border-nova-sky/10 py-4 text-left font-display text-2xl text-paper last:border-0"
                  >
                    <span>{l.label}</span>
                    <span className="font-grotesk text-xs text-nova-sky/60">
                      0{i + 1}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <LangToggle />
                <ThemeToggle />
                <button onClick={() => go("termin")} className="btn-primary ml-auto flex-1">
                  {t.nav.cta}
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
