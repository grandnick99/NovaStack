import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "../lib/LangContext";
import { scrollToId } from "../lib/smoothScroll";
import { EASE } from "../lib/motion";
import NovaMark from "./NovaMark";

/** A headline line that rises out of a clipping mask. */
function MaskLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={className}
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: EASE, delay }}
        style={{ display: "block" }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();

  // Drive parallax from the global window scroll position (pixels). This is
  // reliably 0 at the top of the document — unlike a target-based progress,
  // which can read a degenerate value at the document origin.
  const { scrollY } = useScroll();

  const contentY = useTransform(scrollY, [0, 700], [0, -90]);
  const markY = useTransform(scrollY, [0, 700], [0, 130]);
  const markX = useTransform(scrollY, [0, 700], [0, 30]);
  const markProgress = useTransform(scrollY, [0, 700], [0, 1]);

  return (
    <section className="relative min-h-[100svh] pt-32 md:pt-40">
      {/* Mark — bleeds behind the headline. Anchored higher and dimmed on
          mobile so it never competes with the body copy; centre-right on md+. */}
      <motion.div
        style={{ y: markY, x: markX }}
        className="pointer-events-none absolute inset-x-0 top-[6vh] bottom-auto z-0 flex justify-center md:inset-0 md:top-auto md:items-start md:pt-[10vh] md:justify-end md:pr-[2%]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="animate-float-slow"
        >
          <NovaMark
            progress={markProgress}
            className="h-auto w-[62vw] max-w-[260px] opacity-[0.4] sm:max-w-[380px] sm:opacity-90 md:w-[44vw] md:max-w-[560px]"
          />
        </motion.div>
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY }}
        className="shell relative z-10 flex min-h-[calc(100svh-10rem)] flex-col justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-nova-sky/15 bg-nova-sky/[0.05] px-4 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399]/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34d399] shadow-[0_0_6px_1px_rgba(52,211,153,0.8)]" />
          </span>
          <span className="label">{t.hero.eyebrow}</span>
        </motion.div>

        <h1 className="font-display text-[13.5vw] font-extrabold leading-[0.92] tracking-tight text-paper sm:text-[10vw] md:text-[7.4vw] lg:text-[7.2rem]">
          <MaskLine delay={0.25}>{t.hero.titleLines[0]}</MaskLine>
          <MaskLine delay={0.36}>{t.hero.titleLines[1]}</MaskLine>
          <MaskLine delay={0.47} className="text-gradient">
            {t.hero.accentWord}
          </MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-paper/65 md:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <button onClick={() => scrollToId("termin")} className="btn-primary sheen-mask">
            {t.hero.ctaPrimary}
            <span aria-hidden>→</span>
          </button>
          <button onClick={() => scrollToId("leistungen")} className="btn-ghost">
            {t.hero.ctaSecondary}
          </button>
        </motion.div>

        {/* Metrics strip */}
        <motion.dl
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
          className="mt-14 flex max-w-2xl flex-wrap gap-x-10 gap-y-6 md:mt-20"
        >
          {t.hero.metrics.map((m, i) => (
            <div key={i} className="flex items-start gap-4">
              {i > 0 && <span className="hidden h-12 w-px bg-nova-sky/15 sm:block" />}
              <div>
                <dt className="font-display text-3xl font-extrabold text-paper md:text-4xl">
                  {m.value}
                </dt>
                <dd className="mt-1 max-w-[10rem] text-xs leading-snug text-paper/60">
                  {m.label}
                </dd>
              </div>
            </div>
          ))}
        </motion.dl>
      </motion.div>

    </section>
  );
}
