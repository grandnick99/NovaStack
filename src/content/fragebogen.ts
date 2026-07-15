/**
 * Inhalt des kurzen Vorab-Fragebogens (/fragebogen).
 *
 * Bewusst kurz gehalten: die Details werden im persönlichen Gespräch
 * geklärt. Der Fragebogen ist reine Kür — er gibt Nick vor dem ersten
 * Gespräch ein grobes Bild und dem Interessenten das Gefühl, dass es nach
 * der Terminbuchung direkt losgeht. Keine Frage hier ist Pflicht, siehe
 * die Hinweistexte in src/components/Fragebogen.tsx.
 *
 * Bewusst NICHT über src/content/i18n.ts geführt: der Fragebogen ist
 * deutschsprachig-only (wie das Original).
 *
 * Jede Options-Liste trägt weiterhin die exakten deutschen Label-Texte des
 * Originals als `value` — das ist der Text, der 1:1 in der E-Mail landet.
 */

export interface ChipOption {
  value: string;
  label: string;
}

export const BRANCHEN = [
  "Handwerk & Produktion",
  "Gastronomie & Hotel",
  "Gesundheit & Wellness",
  "Schönheit & Beauty",
  "Mode & Bekleidung",
  "Fotografie & Video",
  "Kunst & Kreativ",
  "Beratung & Coaching",
  "Recht & Steuer",
  "Immobilien",
  "Architektur & Innenarchitektur",
  "Bau & Renovierung",
  "Technologie & Software",
  "Online-Shop / E-Commerce",
  "Bildung & Kurse",
  "Sport & Fitness",
  "Musik & Unterhaltung",
  "Veranstaltungen & Events",
  "Non-Profit & Verein",
  "Landwirtschaft & Natur",
  "Fahrzeuge & Mobilität",
  "Finanzdienstleistungen",
];

export const GOALS: ChipOption[] = [
  { value: "Neue Kunden gewinnen", label: "📣 Neue Kunden gewinnen" },
  { value: "Produkte verkaufen (Shop)", label: "🛒 Produkte verkaufen" },
  { value: "Termine / Buchungen erhalten", label: "📅 Termine buchen" },
  { value: "Portfolio zeigen", label: "🖼️ Portfolio zeigen" },
  { value: "Vertrauen & Seriosität aufbauen", label: "🤝 Vertrauen aufbauen" },
  { value: "Anfragen / Kontakt erhalten", label: "✉️ Anfragen erhalten" },
  { value: "Newsletter-Abonnenten sammeln", label: "📬 Newsletter" },
  { value: "Online-Kurse / Mitglieder", label: "🎓 Kurse / Mitglieder" },
];

export const EXISTING_WEB: ChipOption[] = [
  { value: "Ja", label: "Ja" },
  { value: "Nein, Neubau", label: "Nein, Neubau" },
  { value: "Ja, soll komplett überarbeitet werden", label: "Ja, Relaunch nötig" },
];

export const KUNDTYP: ChipOption[] = [
  { value: "Privatkunden (B2C)", label: "👤 Privatkunden" },
  { value: "Geschäftskunden (B2B)", label: "🏢 Geschäftskunden" },
  { value: "Beides", label: "Beides" },
];

export const STEP_TITLES = ["Dein Unternehmen", "Ziel & Kunden", "Website & Material"];

export const STEP_BADGES = ["🏢", "🎯", "🌐"];

export const TOTAL_STEPS = STEP_TITLES.length;

/** Max. Dateigröße für den Logo-Upload (Basis für Client-Validierung). */
export const MAX_UPLOAD_MB = 8;
