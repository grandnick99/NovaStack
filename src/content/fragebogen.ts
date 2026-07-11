/**
 * Inhalt des Vorab-Fragebogens (/fragebogen).
 *
 * Migriert aus dem alten, eigenständigen Fragebogen (Formspree, statisches
 * HTML) in dieses Projekt. Bewusst NICHT über src/content/i18n.ts geführt:
 * der Fragebogen ist deutschsprachig-only (wie das Original), damit hier
 * nicht ~45 Felder zusätzlich ins zweisprachige Wörterbuch müssten. Falls
 * später eine englische Fassung gebraucht wird, ist dieses Modul der Ort,
 * an dem eine `en`-Variante ergänzt würde.
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

export const CHANNELS: ChipOption[] = [
  { value: "Instagram", label: "📸 Instagram" },
  { value: "Facebook", label: "👍 Facebook" },
  { value: "Google Suche", label: "🔍 Google" },
  { value: "LinkedIn", label: "💼 LinkedIn" },
  { value: "YouTube", label: "▶️ YouTube" },
  { value: "Empfehlungen / Mund-zu-Mund", label: "🗣️ Empfehlungen" },
];

export const FEELINGS: ChipOption[] = [
  { value: "Professionell & seriös", label: "💼 Professionell & seriös" },
  { value: "Modern & minimalistisch", label: "◻️ Modern & minimalistisch" },
  { value: "Warm & persönlich", label: "🤗 Warm & persönlich" },
  { value: "Luxuriös & exklusiv", label: "✨ Luxuriös & exklusiv" },
  { value: "Verspielt & kreativ", label: "🎨 Verspielt & kreativ" },
  { value: "Mutig & auffällig", label: "⚡ Mutig & auffällig" },
  { value: "Natürlich & nachhaltig", label: "🌿 Natürlich & nachhaltig" },
  { value: "Freundlich & locker", label: "😊 Freundlich & locker" },
];

/** Neu gegenüber dem alten Fragebogen: Kontrast vs. Harmonie der Farben. */
export const COLOR_MODE: ChipOption[] = [
  { value: "Kontrast — Logo soll hervorstechen", label: "⚡ Kontrast (Logo sticht hervor)" },
  { value: "Harmonie — alles im Einklang", label: "🎨 Harmonie (alles im Einklang)" },
  { value: "Bin mir nicht sicher", label: "🤷 Nicht sicher" },
];

export const PAGES: ChipOption[] = [
  { value: "Startseite", label: "🏠 Startseite" },
  { value: "Über mich / Über uns", label: "👤 Über mich" },
  { value: "Leistungen / Angebote", label: "⚙️ Leistungen" },
  { value: "Portfolio / Referenzen", label: "🖼️ Portfolio" },
  { value: "Blog / Ratgeber", label: "📝 Blog" },
  { value: "Online-Shop", label: "🛒 Shop" },
  { value: "Buchung / Terminkalender", label: "📅 Buchung" },
  { value: "Kontakt", label: "✉️ Kontakt" },
  { value: "FAQ", label: "❓ FAQ" },
  { value: "Kundenstimmen / Bewertungen", label: "⭐ Bewertungen" },
  { value: "Team", label: "👥 Team" },
  { value: "Preise / Pakete", label: "💶 Preise" },
];

export const HAVE: ChipOption[] = [
  { value: "Logo", label: "🔷 Logo" },
  { value: "Professionelle Fotos", label: "📷 Professionelle Fotos" },
  { value: "Handyfotos", label: "📱 Handyfotos" },
  { value: "Fertige Texte", label: "✍️ Fertige Texte" },
  { value: "Videos", label: "🎥 Videos" },
  { value: "Noch nichts — alles neu", label: "❌ Noch nichts" },
];

export const LANGS: ChipOption[] = [
  { value: "Deutsch", label: "🇩🇪 Deutsch" },
  { value: "Englisch", label: "🇬🇧 Englisch" },
  { value: "Französisch", label: "🇫🇷 Französisch" },
  { value: "Italienisch", label: "🇮🇹 Italienisch" },
  { value: "Andere", label: "🌐 Andere" },
];

export const FEATURES: ChipOption[] = [
  { value: "Online-Shop", label: "🛒 Produkte verkaufen" },
  { value: "Buchungssystem", label: "📅 Buchungssystem" },
  { value: "Kontaktformular", label: "📩 Kontaktformular" },
  { value: "Newsletter-Anmeldung", label: "📬 Newsletter" },
  { value: "Live-Chat", label: "💬 Live-Chat" },
  { value: "Google Maps", label: "🗺️ Google Maps" },
  { value: "Social Media Integration", label: "📲 Social Media" },
  { value: "Google Bewertungen einbinden", label: "⭐ Google Reviews" },
  { value: "Besucherstatistiken", label: "📊 Statistiken" },
  { value: "Mitgliederbereich / Login", label: "🔒 Mitgliederbereich" },
];

export const DOMAIN: ChipOption[] = [
  { value: "Ja", label: "Ja" },
  { value: "Nein, bitte helfen", label: "Nein, bitte helfen" },
  { value: "Bin nicht sicher", label: "Nicht sicher" },
];

export const TIMELINE: ChipOption[] = [
  { value: "So schnell wie möglich", label: "🔥 So schnell wie möglich" },
  { value: "In 2–4 Wochen", label: "📅 In 2–4 Wochen" },
  { value: "In 1–2 Monaten", label: "🗓️ In 1–2 Monaten" },
  { value: "Flexibel", label: "😊 Flexibel" },
];

export const SELFMGMT: ChipOption[] = [
  { value: "Ja, möchte selbst Änderungen machen", label: "Ja" },
  { value: "Nein, Nick übernimmt Pflege", label: "Nein, ihr macht das" },
  { value: "Vielleicht, Schulung wäre schön", label: "Vielleicht / Schulung?" },
];

export const STEP_TITLES = [
  "Dein Unternehmen",
  "Ziel der Website",
  "Deine Zielgruppe",
  "Design & Stil",
  "Inhalt & Seiten",
  "Extras & Technik",
  "Fast fertig!",
];

export const STEP_BADGES = ["🏢", "🎯", "👥", "🎨", "📄", "⚙️", "🚀"];

export const TOTAL_STEPS = STEP_TITLES.length;
