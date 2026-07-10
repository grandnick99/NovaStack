import { motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { EASE } from "../lib/motion";

export default function Approach() {
  const { t } = useLang();

  return (
    <section id="arbeitsweise" className="relative scroll-mt-24 py-[6vh]">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <SectionLabel>{t.approach.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-paper md:text-5xl">
                {t.approach.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-pretty text-base leading-relaxed text-paper/60 md:text-lg">
              {t.approach.sub}
            </p>
          </Reveal>
        </div>

        {/* Steps — each badge draws a connector to the next one in its row.
            The row-ending connectors are hidden, so the line is correct whether
            the grid is 4-up (lg), 2×2 (sm/md) or a single column (mobile). */}
        <div className="relative mt-16 md:mt-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.approach.steps.map((step, i) => (
              <motion.div
                key={step.no}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 }}
                className="group relative after:absolute after:left-16 after:right-[-1.5rem] after:top-7 after:hidden after:h-px after:bg-gradient-to-r after:from-nova-sky/45 after:to-nova-sky/15 after:content-[''] sm:after:block sm:last:after:hidden sm:[&:nth-child(2)]:after:hidden lg:[&:nth-child(2)]:after:block"
              >
                <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl glass">
                  <span className="font-display text-lg font-extrabold text-azure-gradient">
                    {step.no}
                  </span>
                </div>
                <h3 className="font-display text-xl font-extrabold text-paper">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Methodology — the data-driven engine behind the steps */}
        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2">
          {t.approach.method.map((m, i) => (
            <Reveal key={m.title} delay={0.05 + i * 0.08}>
              <div className="glass-lit -mx-4 h-full rounded-slab px-4 py-7 md:mx-0 md:px-8 md:py-8">
                <h3 className="font-display text-xl font-extrabold text-paper md:text-2xl">
                  {m.title}
                </h3>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-paper/65 md:text-base">
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
