import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import { useConsent, type ConsentCategory } from "../lib/ConsentContext";
import { navigate } from "../lib/router";
import { cx } from "../lib/cx";
import { EASE } from "../lib/motion";

/**
 * Deliberately understated: a small bottom-left utility card, not a
 * page-blocking marketing moment. No glowing CTA, no big display heading —
 * this is a legal notice, not a hero. Kept compact per feedback that the
 * previous full-width, big-heading version read as oversized and childish.
 */

const pillBtn =
  "rounded-full px-3.5 py-1.5 font-grotesk text-[12.5px] font-medium transition-colors duration-150 whitespace-nowrap";

function CategoryToggle({
  title,
  body,
  checked,
  disabled,
  alwaysOnLabel,
  onToggle,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  alwaysOnLabel?: string;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-nova-sky/10 py-3.5 last:border-0">
      <div className="min-w-0">
        <p className="font-grotesk text-[13px] font-medium text-paper">{title}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-paper/55">{body}</p>
      </div>
      {disabled ? (
        <span className="mt-0.5 flex-none font-grotesk text-[10px] uppercase tracking-label text-nova-sky/55">
          {alwaysOnLabel}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={onToggle}
          className="relative mt-0.5 h-5 w-9 flex-none rounded-full border transition-colors duration-200"
          style={{
            borderColor: checked ? "transparent" : "rgba(104,161,235,0.25)",
            background: checked ? "rgba(104,161,235,0.9)" : "rgba(9,15,38,0.4)",
          }}
        >
          <span
            className={cx(
              "absolute top-0.5 h-[14px] w-[14px] rounded-full bg-white shadow transition-all duration-200",
              checked ? "left-[18px]" : "left-0.5",
            )}
          />
        </button>
      )}
    </div>
  );
}

export default function CookieBanner() {
  const { t } = useLang();
  const c = t.cookies;
  const { consent, promptOpen, acceptAll, rejectNonEssential, savePreferences } = useConsent();
  const [view, setView] = useState<"banner" | "details">("banner");
  const [draft, setDraft] = useState<Record<ConsentCategory, boolean>>({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  });

  if (!promptOpen) return null;

  const openDetails = () => {
    setDraft({ analytics: consent?.analytics ?? false, marketing: consent?.marketing ?? false });
    setView("details");
  };

  return (
    <div
      className="fixed inset-x-4 bottom-4 z-[90] flex justify-center sm:inset-x-auto sm:bottom-5 sm:left-5 sm:justify-start"
      role="dialog"
      aria-modal="false"
      aria-label={c.bannerTitle}
    >
      <AnimatePresence mode="wait">
        {view === "banner" ? (
          <motion.div
            key="banner"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="w-full max-w-sm rounded-2xl border border-nova-sky/12 bg-nova-ink/90 p-4 shadow-[0_12px_36px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md"
          >
            <p className="font-grotesk text-[13px] font-semibold text-paper">{c.bannerTitle}</p>
            <p className="mt-1.5 text-pretty text-[12.5px] leading-relaxed text-paper/55">
              {c.bannerBody}{" "}
              <a
                href="/datenschutz"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/datenschutz");
                }}
                className="text-nova-sky/90 underline underline-offset-2 hover:text-nova-mist"
              >
                {c.privacyLinkLabel}
              </a>
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-x-1 gap-y-2">
              <button
                type="button"
                onClick={acceptAll}
                className={cx(pillBtn, "bg-nova-sky/90 text-ink-900 hover:bg-nova-sky")}
              >
                {c.acceptAll}
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className={cx(pillBtn, "border border-nova-sky/15 text-paper/65 hover:border-nova-sky/35 hover:text-paper")}
              >
                {c.rejectNonEssential}
              </button>
              <button
                type="button"
                onClick={openDetails}
                className={cx(pillBtn, "text-paper/45 underline underline-offset-2 hover:text-paper/75")}
              >
                {c.customize}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="w-full max-w-sm rounded-2xl border border-nova-sky/12 bg-nova-ink/90 p-4 shadow-[0_12px_36px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md"
          >
            <p className="font-grotesk text-[13px] font-semibold text-paper">{c.panelTitle}</p>
            <p className="mt-1.5 text-pretty text-[12.5px] leading-relaxed text-paper/55">{c.panelBody}</p>

            <div className="mt-2">
              <CategoryToggle
                title={c.categories[0].title}
                body={c.categories[0].body}
                checked
                disabled
                alwaysOnLabel={c.alwaysOn}
              />
              <CategoryToggle
                title={c.categories[1].title}
                body={c.categories[1].body}
                checked={draft.analytics}
                onToggle={() => setDraft((d) => ({ ...d, analytics: !d.analytics }))}
              />
              <CategoryToggle
                title={c.categories[2].title}
                body={c.categories[2].body}
                checked={draft.marketing}
                onToggle={() => setDraft((d) => ({ ...d, marketing: !d.marketing }))}
              />
            </div>

            <div className="mt-3.5 flex items-center gap-x-1">
              <button
                type="button"
                onClick={() => savePreferences(draft)}
                className={cx(pillBtn, "bg-nova-sky/90 text-ink-900 hover:bg-nova-sky")}
              >
                {c.save}
              </button>
              <button
                type="button"
                onClick={() => setView("banner")}
                className={cx(pillBtn, "text-paper/45 underline underline-offset-2 hover:text-paper/75")}
              >
                {c.back}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
