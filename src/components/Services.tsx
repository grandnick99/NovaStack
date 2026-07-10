import { motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import { scrollToId } from "../lib/smoothScroll";
import { cx } from "../lib/cx";
import { EASE } from "../lib/motion";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import type { ServiceContent } from "../content/i18n";

/* Distinct, minimal glyph per discipline — drawn, not stock iconography. */
function ServiceGlyph({ kind }: { kind: string }) {
  const stroke = "rgba(207,224,251,0.9)";
  if (kind === "web") {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
        <rect x="18" y="24" width="84" height="64" rx="8" stroke={stroke} strokeWidth="2" />
        <path d="M18 40 H102" stroke={stroke} strokeWidth="2" />
        <circle cx="28" cy="32" r="2" fill="#68A1EB" />
        <circle cx="36" cy="32" r="2" fill="#3A74CC" />
        <rect x="30" y="52" width="34" height="26" rx="4" fill="#68A1EB" opacity="0.25" />
        <path d="M74 54 H90 M74 62 H90 M74 70 H84" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <path d="M40 96 H80" stroke="#68A1EB" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "ai") {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
        <circle cx="60" cy="60" r="14" stroke={stroke} strokeWidth="2" />
        <circle cx="60" cy="60" r="5" fill="#68A1EB" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const r = (a * Math.PI) / 180;
          const x = 60 + Math.cos(r) * 40;
          const y = 60 + Math.sin(r) * 40;
          return (
            <g key={a}>
              <line x1={60 + Math.cos(r) * 14} y1={60 + Math.sin(r) * 14} x2={x} y2={y} stroke={stroke} strokeWidth="1.5" opacity="0.6" />
              <circle cx={x} cy={y} r="4.5" fill="#3A74CC" stroke={stroke} strokeWidth="1.5" />
            </g>
          );
        })}
      </svg>
    );
  }
  // marketing
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" fill="none">
      <path d="M22 92 H100" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <rect x="30" y="66" width="14" height="24" rx="3" fill="#3A74CC" opacity="0.5" />
      <rect x="52" y="50" width="14" height="40" rx="3" fill="#68A1EB" opacity="0.55" />
      <rect x="74" y="34" width="14" height="56" rx="3" fill="#CFE0FB" opacity="0.7" />
      <path d="M28 56 L52 44 L74 30 L96 20" stroke="#68A1EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M84 20 H96 V32" stroke="#68A1EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceCard({
  service,
  topPx,
  isLast,
}: {
  service: ServiceContent;
  topPx: number;
  isLast: boolean;
}) {
  const { t } = useLang();

  return (
    <div className="sticky" style={{ top: topPx }}>
      {/* Entrance: a plain rise + fade. The 3D plane-tilt was removed because it
          made the frosted card flicker see-through mid-animation; the backdrop
          blur is kept (it's not what janked the scroll — that was the page's
          fixed-attachment background). */}
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
      >
      {/* The card bleeds past the shell text grid by exactly its own horizontal
          padding, so the copy inside sits on the same grid as unboxed text. */}
      <article className="card-frost relative -mx-4 overflow-hidden rounded-slab md:-mx-8">
        {/* dense, legible matte slab (theme-aware). Only the frontmost card in
            the stack casts the deep drop shadow, so the deck reads as one
            shadow rather than three piled-up edges. */}
        <div className={cx("glass-card absolute inset-0", isLast && "glass-card--front")} />

        <div className="relative grid gap-8 px-4 py-7 md:grid-cols-12 md:gap-10 md:px-8 md:py-10 lg:py-12">
          {/* Left: copy */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-extrabold leading-none text-azure-gradient md:text-6xl">
                {service.index}
              </span>
              <span className="h-10 w-px bg-nova-sky/20" />
              <div>
                <h3 className="font-display text-2xl font-extrabold text-paper md:text-3xl">
                  {service.title}
                </h3>
              </div>
            </div>

            <p className="mt-6 max-w-md font-grotesk text-lg font-light text-nova-mist md:text-xl">
              {service.tagline}
            </p>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-paper/60 md:text-base">
              {service.body}
            </p>

            <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {service.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-paper/80">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-gradient-to-br from-nova-mist to-nova-sky" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: glyph panel + outcome */}
          <div className="md:col-span-5">
            <div className="glass-lit flex h-full flex-col justify-between gap-6 rounded-[20px] p-6">
              <div className="mx-auto h-28 w-28 opacity-90 md:h-32 md:w-32">
                <ServiceGlyph kind={service.key} />
              </div>
              <div className="rounded-2xl border border-nova-sky/15 bg-nova-sky/[0.05] p-4">
                <p className="text-[13px] leading-relaxed text-paper/75">
                  <span className="mb-1 block font-grotesk text-[10px] uppercase tracking-label text-nova-sky/70">
                    {t.servicesIntro.resultLabel}
                  </span>
                  {service.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* hairline accent at the very top edge of the slab */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-nova-sky/50 to-transparent" />
      </article>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const services = t.services;

  return (
    <section id="leistungen" className="relative scroll-mt-24 pb-[6vh] pt-[7vh]">
      <div className="shell">
        <div className="mb-14 max-w-3xl md:mb-20">
          <Reveal>
            <SectionLabel>{t.servicesIntro.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-paper md:text-6xl">
              {t.servicesIntro.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-paper/60 md:text-lg">
              {t.servicesIntro.sub}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Sticky stacking deck */}
      <div className="shell">
        <div className="relative flex flex-col gap-6">
          {services.map((s, i) => (
            <ServiceCard
              key={s.key}
              service={s}
              topPx={104 + i * 26}
              isLast={i === services.length - 1}
            />
          ))}
        </div>
      </div>

      {/* soft CTA after the deck */}
      <div className="shell mt-16 md:mt-24">
        <Reveal className="flex flex-col items-start justify-between gap-5 border-t border-nova-sky/10 pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md font-grotesk text-lg font-light text-paper/70">
            {t.servicesIntro.sub.split(".")[0]}.
          </p>
          <button onClick={() => scrollToId("termin")} className="btn-primary sheen-mask whitespace-nowrap">
            {t.nav.cta}
            <span aria-hidden>→</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
