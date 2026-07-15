import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeCtx = createContext<ThemeState | null>(null);
const STORAGE_KEY = "novastack-theme";
const EXPLICIT_KEY = "novastack-theme-explicit";

const systemTheme = (): Theme =>
  window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";

function detectInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  const explicit = window.localStorage.getItem(EXPLICIT_KEY) === "1";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (explicit && (stored === "dark" || stored === "light")) return stored;
  // No manual override yet -> follow the OS setting (and keep following it live, see below).
  return systemTheme();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(detectInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Keep the browser chrome (mobile status bar, PWA title bar) in sync.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#070A16" : "#EEF3FC");
  }, [theme]);

  // As long as the user hasn't manually toggled, keep following the OS setting live
  // (e.g. macOS switching to light mode in the morning updates the site immediately).
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: light)");
    if (!mq) return;
    const onChange = () => {
      if (window.localStorage.getItem(EXPLICIT_KEY) === "1") return;
      setThemeState(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const value = useMemo<ThemeState>(
    () => ({
      theme,
      setTheme: (t: Theme) => {
        window.localStorage.setItem(EXPLICIT_KEY, "1");
        window.localStorage.setItem(STORAGE_KEY, t);
        setThemeState(t);
      },
      toggle: () =>
        setThemeState((p) => {
          const next = p === "dark" ? "light" : "dark";
          window.localStorage.setItem(EXPLICIT_KEY, "1");
          window.localStorage.setItem(STORAGE_KEY, next);
          return next;
        }),
    }),
    [],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeState {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
