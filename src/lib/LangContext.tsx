import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dict, type Lang } from "../content/i18n";

interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
}

const LangCtx = createContext<LangState | null>(null);

const STORAGE_KEY = "novastack-lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "de";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "de" || stored === "en") return stored;
  // German-first brand: German is the default face of the site. A returning
  // visitor's explicit choice (stored above) always wins; otherwise we land on
  // German and let non-German speakers opt into English via the toggle.
  return "de";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
    // Keep the tab title and description in the visitor's chosen language.
    document.title =
      lang === "de"
        ? "NovaStack — Webdesign, KI-Integration & Marketing aus Köln"
        : "NovaStack — Web Design, AI Integration & Marketing from Cologne";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        lang === "de"
          ? "NovaStack vereint Webdesign, KI-Integration und Marketing in einem präzise abgestimmten System. Beratung buchen."
          : "NovaStack unites web design, AI integration and marketing into one precisely tuned system. Book a consultation.",
      );
  }, [lang]);

  const value = useMemo<LangState>(
    () => ({
      lang,
      setLang: setLangState,
      toggle: () => setLangState((p) => (p === "de" ? "en" : "de")),
      t: dictionaries[lang],
    }),
    [lang],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LangState {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
