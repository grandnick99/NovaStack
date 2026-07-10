import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";
import { useLang } from "../lib/LangContext";
import { cx } from "../lib/cx";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { lang } = useLang();
  const isDark = theme === "dark";
  const label =
    lang === "de"
      ? isDark ? "Zu hellem Modus wechseln" : "Zu dunklem Modus wechseln"
      : isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cx(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-nova-sky/15 bg-nova-sky/[0.04] text-nova-sky transition-colors duration-300 hover:bg-nova-sky/[0.1]",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            initial={{ y: 14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.3 }}
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ y: 14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.3 }}
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
