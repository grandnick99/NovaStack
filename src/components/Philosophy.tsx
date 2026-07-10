import { useLang } from "../lib/LangContext";
import { scrollToId } from "../lib/smoothScroll";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";

export default function Philosophy() {
  const { t } = useLang();
  const p = t.philosophy;

  return (
    <section id="philosophie" className="relative scroll-mt-24 py-[6vh]">
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
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-paper/60 md:text-lg">
              {p.sub}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <button
              onClick={() => scrollToId("termin")}
              className="btn-primary sheen-mask mt-8"
            >
              {t.nav.cta}
              <span aria-hidden>→</span>
            </button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-12 md:mt-20 md:grid-cols-2">
          {p.blocks.map((b, i) => (
            <Reveal key={b.title} delay={0.05 + i * 0.08}>
              <article className="relative">
                <div className="h-px w-full bg-gradient-to-r from-nova-sky/50 via-nova-sky/15 to-transparent" />
                <h3 className="mt-5 max-w-md font-display text-2xl font-extrabold leading-tight text-paper md:text-[1.7rem]">
                  {b.title}
                </h3>
                <p className="mt-4 text-pretty text-[15px] leading-relaxed text-paper/65 md:text-base">
                  {b.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
