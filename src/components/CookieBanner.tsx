import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import { useConsent, type ConsentCategory } from "../lib/ConsentContext";
import { cx } from "../lib/cx";
import { EASE } from "../lib/motion";

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
    <div className="flex items-start justify-between gap-4 border-b border-nova-sky/10 py-4 last:border-0">
      <div className="min-w-0">
        <p className="font-grotesk text-sm font-medium text-paper">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-paper/60">{body}</p>
      </div>
      {disabled ? (
        <span className="mt-0.5 flex-none font-grotesk text-[11px] uppercase tracking-label text-nova-sky/60">
          {alwaysOnLabel}
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={onToggle}
          className="relative mt-0.5 h-6 w-11 flex-none rounded-full border transition-colors duration-200"
          style={{
            borderColor: checked ? "transparent" : "rgba(104,161,235,0.3)",
            background: checked
              ? "linear-gradient(180deg, #cfe0fb, #68a1eb)"
              : "rgba(9,15,38,0.4)",
          }}
        >
          <span
            className={cx(
              "absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-all duration-200",
              checked ? "left-[22px]" : "left-0.5",
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
    <div className="fixed inset-x-0 bottom-0 z-[90] flex justify-center px-4 pb-4 sm:px-6 sm:pb-6" role="dialog" aria-modal="false" aria-label={c.bannerTitle}>
      <AnimatePresence mode="wait">
        {view === "banner" ? (
          <motion.div
            key="banner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="glass-lit w-full max-w-2xl rounded-slab p-6 shadow-slab md:p-7"
          >
            <p className="font-display text-lg font-extrabold text-paper">{c.bannerTitle}</p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-paper/65">
              {c.bannerBody}{" "}
              <a href="#" className="text-nova-sky underline underline-offset-2 hover:text-nova-mist">
                {c.privacyLinkLabel}
              </a>
            </p>
            <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
              <button type="button" onClick={openDetails} className="btn-ghost flex-1 sm:flex-none">
                {c.customize}
              </button>
              <button type="button" onClick={rejectNonEssential} className="btn-ghost flex-1 sm:flex-none">
                {c.rejectNonEssential}
              </button>
              <button type="button" onClick={acceptAll} className="btn-primary sheen-mask flex-1 sm:ml-auto sm:flex-none">
                {c.acceptAll}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="glass-lit w-full max-w-2xl rounded-slab p-6 shadow-slab md:p-7"
          >
            <p className="font-display text-lg font-extrabold text-paper">{c.panelTitle}</p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-paper/65">{c.panelBody}</p>

            <div className="mt-4">
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

            <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
              <button type="button" onClick={() => setView("banner")} className="btn-ghost flex-1 sm:flex-none">
                {c.back}
              </button>
              <button
                type="button"
                onClick={() => savePreferences(draft)}
                className="btn-primary sheen-mask flex-1 sm:ml-auto sm:flex-none"
              >
                {c.save}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
