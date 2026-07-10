import { useLang } from "../lib/LangContext";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

function ComingBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-nova-sky/20 bg-nova-sky/[0.06] px-3 py-1 font-grotesk text-[10px] uppercase tracking-label text-nova-sky/80">
      <span className="h-1.5 w-1.5 rounded-full bg-nova-sky/80" />
      {children}
    </span>
  );
}

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

        {/* Formal proof — reserved, honest "coming" slots, kept secondary */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Certifications — reserved slots */}
          <Reveal>
            <div className="glass relative -mx-4 flex h-full flex-col rounded-slab px-4 py-7 md:-mx-8 md:px-8 md:py-8 lg:mx-0">
              <div className="mb-7 flex items-center justify-between">
                <h3 className="font-display text-xl font-extrabold text-paper">
                  {p.certificates.heading}
                </h3>
                <ComingBadge>{p.certificates.note}</ComingBadge>
              </div>
              <div className="grid flex-1 grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-nova-sky/20 bg-nova-sky/[0.03]"
                  >
                    <svg viewBox="0 0 48 48" className="h-9 w-9 opacity-40" fill="none">
                      <circle cx="24" cy="20" r="11" stroke="#68A1EB" strokeWidth="2" />
                      <path d="M24 14 L26 19 L31 19 L27 22 L29 27 L24 24 L19 27 L21 22 L17 19 L22 19 Z" fill="#68A1EB" opacity="0.5" />
                      <path d="M18 30 L16 42 L24 38 L32 42 L30 30" stroke="#68A1EB" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    <span className="h-1.5 w-10 rounded-full bg-nova-sky/15" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Testimonials — reserved quote skeletons */}
          <Reveal delay={0.08}>
            <div className="glass relative -mx-4 flex h-full flex-col rounded-slab px-4 py-7 md:-mx-8 md:px-8 md:py-8 lg:mx-0">
              <div className="mb-7 flex items-center justify-between">
                <h3 className="font-display text-xl font-extrabold text-paper">
                  {p.testimonials.heading}
                </h3>
                <ComingBadge>{p.testimonials.note}</ComingBadge>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-2xl border border-nova-sky/10 bg-nova-sky/[0.03] p-5"
                  >
                    <span className="font-display text-4xl leading-none text-nova-sky/30">&ldquo;</span>
                    <div className="mt-2 space-y-2">
                      <span className="block h-2 w-[92%] rounded-full bg-nova-sky/12" />
                      <span className="block h-2 w-[78%] rounded-full bg-nova-sky/10" />
                      <span className="block h-2 w-[60%] rounded-full bg-nova-sky/[0.08]" />
                    </div>
                    <div className="mt-4 flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-full bg-nova-sky/15" />
                      <span className="h-2 w-24 rounded-full bg-nova-sky/12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
