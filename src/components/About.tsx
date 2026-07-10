import { motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

function planePoints(cx: number, cy: number, w: number, h: number) {
  return `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`;
}

/** The nova star — gently twinkles. Echoes the logo mark. */
function StarGlyph() {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ab-star" x1="40" y1="18" x2="84" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#CFE0FB" />
          <stop offset="0.5" stopColor="#68A1EB" />
          <stop offset="1" stopColor="#3A74CC" />
        </linearGradient>
        <radialGradient id="ab-star-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#88BBEF" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#68A1EB" stopOpacity="0.12" />
          <stop offset="1" stopColor="#3A74CC" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle
        cx="60" cy="50" r="52" fill="url(#ab-star-halo)"
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 50px" }}
      />
      <motion.g
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 50px" }}
      >
        <path d="M60,14 L66,44 L96,50 L66,56 L60,86 L54,56 L24,50 L54,44 Z" fill="url(#ab-star)" />
        <path d="M60,14 L62,44 L60,86 L58,44 Z" fill="#EAF0FB" opacity="0.7" />
      </motion.g>
    </svg>
  );
}

/** The three planes — gently breathe. Echoes the logo stack. */
function StackGlyph() {
  const planes = [
    { pts: planePoints(60, 70, 40, 12), fill: "url(#ab-p3)", dur: 3.6, dy: 3 },
    { pts: planePoints(60, 56, 38, 11), fill: "url(#ab-p2)", dur: 3.2, dy: 2.4 },
    { pts: planePoints(60, 43, 36, 10), fill: "url(#ab-p1)", dur: 2.8, dy: 1.8 },
  ];
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ab-p1" x1="24" y1="33" x2="96" y2="53" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#82B6EE" />
          <stop offset="1" stopColor="#2D5DA9" />
        </linearGradient>
        <linearGradient id="ab-p2" x1="24" y1="45" x2="96" y2="67" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2D5CAD" />
          <stop offset="1" stopColor="#14307A" />
        </linearGradient>
        <linearGradient id="ab-p3" x1="24" y1="58" x2="96" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#122358" />
          <stop offset="1" stopColor="#09173f" />
        </linearGradient>
      </defs>
      {planes.map((p, i) => (
        <motion.polygon
          key={i}
          points={p.pts}
          fill={p.fill}
          stroke="rgba(168,200,250,0.28)"
          strokeWidth="0.75"
          animate={{ y: [0, -p.dy, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
        />
      ))}
    </svg>
  );
}

/** Compact branded motif card used in the studio rail. */
function StudioMotif({
  variant,
  title,
  label,
  className,
}: {
  variant: "star" | "stack";
  title: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`glass-lit relative -mx-4 flex items-center gap-4 overflow-hidden rounded-slab px-4 py-5 md:mx-0 md:px-5 ${className ?? ""}`}>
      <div className="relative h-16 w-20 flex-none">
        {variant === "star" ? <StarGlyph /> : <StackGlyph />}
      </div>
      <div>
        <p className="font-display text-base font-extrabold leading-tight text-paper">{title}</p>
        <p className="mt-1 font-grotesk text-[11px] uppercase tracking-label text-nova-sky/60">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="studio" className="relative scroll-mt-24 py-[6vh]">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Left — statement */}
          <div className="md:col-span-7 md:flex md:flex-col">
            <Reveal>
              <SectionLabel>{a.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-paper md:text-5xl">
                {a.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-nova-mist">
                {a.lead}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-paper/60">
                {a.body}
              </p>
            </Reveal>

            {/* Founder */}
            <Reveal delay={0.2} className="md:mt-auto">
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass">
                  <span className="font-display text-lg font-extrabold text-paper">NG</span>
                </div>
                <div>
                  <p className="font-grotesk text-base font-medium text-paper">
                    {a.founder.name}
                  </p>
                  <p className="text-sm text-paper/50">{a.founder.role}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — facts + motif */}
          <Reveal delay={0.12} className="md:col-span-5">
            <div className="glass-lit -mx-4 rounded-slab px-4 py-7 md:mx-0 md:p-8">
              <dl className="divide-y divide-nova-sky/10">
                {a.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-6 py-4 first:pt-0 last:pb-0">
                    <dt className="font-grotesk text-[11px] uppercase tracking-label text-nova-sky/70">
                      {f.label}
                    </dt>
                    <dd className="text-right font-grotesk text-base text-paper">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <StudioMotif variant="star" title={a.motifStar} label={a.motifStarLabel} className="mt-6" />
            <StudioMotif variant="stack" title={a.motif} label={a.motifLabel} className="mt-4" />
          </Reveal>
        </div>

        {/* Creed — full-width pull statement */}
        <Reveal delay={0.05}>
          <blockquote className="mt-16 border-t border-nova-sky/10 pt-12 md:mt-24">
            <p className="max-w-4xl text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
              <span className="text-gradient">{a.creed}</span>
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
