import { motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import { cx } from "../lib/cx";
import type { Lang } from "../content/i18n";

const OPTIONS: Lang[] = ["de", "en"];

export default function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cx(
        "relative inline-flex items-center rounded-full border border-nova-sky/15 bg-nova-sky/[0.04] p-1",
        className,
      )}
      role="group"
      aria-label="Sprache / Language"
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setLang(opt)}
            aria-pressed={active}
            className={cx(
              "relative z-10 rounded-full px-3 py-1 font-grotesk text-xs font-medium uppercase tracking-wider transition-colors duration-300",
              active ? "text-ink-900" : "text-paper/55 hover:text-paper/85",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#cfe0fb] to-[#68a1eb]"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}
