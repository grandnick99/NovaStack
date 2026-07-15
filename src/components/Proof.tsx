import { useLang } from "../lib/LangContext";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

/** Minimal line glyph per guarantee — drawn, not stock iconography. */
function GuaranteeIcon({ i }: { i: number }) {
  const s = "rgb(var(--accent))";
  if (i === 0) {
    // Founder — a single person
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
      </svg>
    );
  }
  if (i === 1) {
    // Ownership — a key
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="12" r="3.4" />
        <path d="M11.4 12H20M17 12v3M20 12v3.4" />
      </svg>
    );
  }
  if (i === 2) {
    // Speed — a lightning bolt
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />
      </svg>
    );
  }
  // Transparency — an eye
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={s} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export default function Proof() {
  const { t } = useLang();
  const p = t.proof;

  return (
    <section id="referenzen" className="relative scroll-mt-24 py-[6vh]">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>{p.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-paper md:text-5xl">
              {p.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-paper/60 md:text-lg">
              {p.sub}
            </p>
          </Reveal>
        </div>

        {/* Guarantees — concrete trust signals that hold from day one */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.guarantees.map((g, i) => (
            <Reveal key={g.title} delay={0.04 * i}>
              <div className="glass relative -mx-4 flex h-full flex-col rounded-slab px-4 py-6 sm:mx-0 sm:px-6">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-nova-sky/20 bg-nova-sky/[0.06]">
                  <GuaranteeIcon i={i} />
                </span>
                <h3 className="font-display text-base font-extrabold leading-snug text-paper">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/*
          Certifications / testimonials "coming soon" slots hidden until real
          documents/quotes exist — placeholders read as empty promises once
          the guarantees above already carry the trust argument. Re-enable
          (p.certificates / p.testimonials still defined in i18n.ts) for the
          next larger update once Nick has certificates and reviews to show.
        */}
      </div>
    </section>
  );
}
