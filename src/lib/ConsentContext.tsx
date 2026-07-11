import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadGatedScripts } from "./analytics";
import { logConsentServerSide } from "./consentLog";

export type ConsentCategory = "analytics" | "marketing";

export interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentState {
  /** Undefined until the visitor has made an explicit choice. */
  consent: Consent | null;
  /** Whether the banner (or the reopened preferences panel) should render. */
  promptOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: Record<ConsentCategory, boolean>) => void;
  /** Reopens the preferences panel later, e.g. from a footer link. */
  reopen: () => void;
}

const STORAGE_KEY = "novastack-consent";
const DEFAULT_CONSENT: Consent = { necessary: true, analytics: false, marketing: false };

const ConsentCtx = createContext<ConsentState | null>(null);

function readStored(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(readStored);
  const [promptOpen, setPromptOpen] = useState(() => readStored() === null);

  // Whenever consent changes (including on first load, if already stored from
  // a previous visit), let any gated third-party scripts react to it.
  useEffect(() => {
    if (consent) loadGatedScripts(consent);
  }, [consent]);

  const persist = (next: Consent) => {
    setConsent(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPromptOpen(false);
    logConsentServerSide(next);
  };

  const value = useMemo<ConsentState>(
    () => ({
      consent,
      promptOpen,
      acceptAll: () => persist({ necessary: true, analytics: true, marketing: true }),
      rejectNonEssential: () => persist({ necessary: true, analytics: false, marketing: false }),
      savePreferences: (prefs) => persist({ necessary: true, ...prefs }),
      reopen: () => setPromptOpen(true),
    }),
    [consent, promptOpen],
  );

  return <ConsentCtx.Provider value={value}>{children}</ConsentCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConsent(): ConsentState {
  const ctx = useContext(ConsentCtx);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

export { DEFAULT_CONSENT };
