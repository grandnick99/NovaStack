import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigate } from "../lib/router";
import { cx } from "../lib/cx";
import { EASE } from "../lib/motion";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";
import { submitFragebogen, type FragebogenPayload } from "../lib/submitFragebogen";
import {
  BRANCHEN,
  GOALS,
  EXISTING_WEB,
  KUNDTYP,
  CHANNELS,
  FEELINGS,
  COLOR_MODE,
  PAGES,
  HAVE,
  LANGS,
  FEATURES,
  DOMAIN,
  TIMELINE,
  SELFMGMT,
  STEP_TITLES,
  STEP_BADGES,
  TOTAL_STEPS,
  type ChipOption,
} from "../content/fragebogen";

/**
 * Vorab-Fragebogen für Webdesign-Interessenten — eigenständige Seite unter
 * /fragebogen. Migriert aus dem alten, separat gehosteten Fragebogen
 * (statisches HTML + Formspree) in dieses Projekt, im novastack-Designsystem
 * und mit Versand über Brevo statt Formspree (siehe functions/api/fragebogen.ts).
 *
 * Aufgerufen wird die Seite über den Link, den Interessenten optional am Ende
 * der Terminanfrage per E-Mail bekommen (src/lib/questionnaire.ts) — sie
 * gehört daher nicht in die Hauptnavigation.
 */

interface FormState {
  name: string;
  was: string;
  branche: string;
  besonders: string;
  goals: string[];
  goalsOther: string;
  cta: string;
  existingWeb: string;
  oldUrl: string;
  zielgruppe: string;
  kundtyp: string;
  problem: string;
  channels: string[];
  feelings: string[];
  color1: string;
  color1Hex: string;
  color2: string;
  color2Hex: string;
  colorMode: string;
  inspo: string;
  noDesign: string;
  pages: string[];
  have: string[];
  langs: string[];
  features: string[];
  domain: string;
  domainWish: string;
  competitors: string;
  timeline: string;
  anlass: string;
  selfmgmt: string;
  email: string;
  phone: string;
  extras: string;
}

const EMPTY: FormState = {
  name: "",
  was: "",
  branche: "",
  besonders: "",
  goals: [],
  goalsOther: "",
  cta: "",
  existingWeb: "",
  oldUrl: "",
  zielgruppe: "",
  kundtyp: "",
  problem: "",
  channels: [],
  feelings: [],
  color1: "#68a1eb",
  color1Hex: "",
  color2: "#f5f3ff",
  color2Hex: "",
  colorMode: "",
  inspo: "",
  noDesign: "",
  pages: [],
  have: [],
  langs: [],
  features: [],
  domain: "",
  domainWish: "",
  competitors: "",
  timeline: "",
  anlass: "",
  selfmgmt: "",
  email: "",
  phone: "",
  extras: "",
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const inputCls =
  "w-full rounded-xl border border-nova-sky/15 bg-nova-ink/40 px-4 py-3 font-sans text-[15px] text-paper placeholder:text-paper/30 outline-none transition-colors duration-200 focus:border-nova-sky/50 focus:bg-nova-ink/60";
const textareaCls = cx(inputCls, "resize-y min-h-[90px] leading-relaxed");

function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-6 block">
      <span className="mb-2 flex items-baseline justify-between gap-3">
        <span className="font-grotesk text-sm font-medium text-paper/80">{label}</span>
        {hint && <span className="text-right text-[11px] text-paper/50">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "rounded-full border px-4 py-2 font-grotesk text-sm transition-all duration-200",
        active
          ? "border-transparent bg-gradient-to-b from-[#cfe0fb] to-[#68a1eb] text-ink-900"
          : "border-nova-sky/20 text-paper/70 hover:border-nova-sky/40 hover:text-paper",
      )}
    >
      {children}
    </button>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: ChipOption[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = value.includes(opt.value);
        return (
          <Chip
            key={opt.value}
            active={on}
            onClick={() =>
              onChange(on ? value.filter((v) => v !== opt.value) : [...value, opt.value])
            }
          >
            {opt.label}
          </Chip>
        );
      })}
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: ChipOption[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <Chip key={opt.value} active={value === opt.value} onClick={() => onChange(opt.value)}>
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}

function FeelingGrid({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {FEELINGS.map((opt) => {
        const on = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={on}
            onClick={() =>
              onChange(on ? value.filter((v) => v !== opt.value) : [...value, opt.value])
            }
            className={cx(
              "rounded-2xl border px-4 py-3 text-left font-grotesk text-sm font-medium transition-all duration-200",
              on
                ? "border-nova-sky/60 bg-nova-sky/[0.1] text-paper"
                : "border-nova-sky/15 bg-nova-ink/30 text-paper/70 hover:border-nova-sky/35",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/** Freitext-Eingabe mit Vorschlagsliste, ersetzt das alte Custom-Autocomplete. */
function BrancheInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const q = value.toLowerCase().trim();
  const items = (q ? BRANCHEN.filter((b) => b.toLowerCase().includes(q)) : BRANCHEN).slice(0, 8);

  return (
    <div className="relative">
      <input
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Tippe z.B. Gastronomie, Fotografie, Handwerk …"
        autoComplete="off"
      />
      {open && items.length > 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-56 overflow-y-auto rounded-xl border border-nova-sky/20 bg-nova-ink/95 shadow-slab backdrop-blur">
          {items.map((item) => (
            <div
              key={item}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(item);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-2.5 font-sans text-sm text-paper/75 transition-colors hover:bg-nova-sky/10 hover:text-paper"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorField({
  label,
  color,
  hex,
  onColor,
  onHex,
}: {
  label: string;
  color: string;
  hex: string;
  onColor: (v: string) => void;
  onHex: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => {
            onColor(e.target.value);
            onHex(e.target.value);
          }}
          className="h-12 w-12 flex-none cursor-pointer rounded-xl border border-nova-sky/15 bg-nova-ink/40 p-0.5"
        />
        <input
          className={inputCls}
          value={hex}
          onChange={(e) => onHex(e.target.value)}
          placeholder="z.B. #4f46e5 oder 'Navy Blau'"
        />
      </div>
    </Field>
  );
}

export default function Fragebogen() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [sendState, setSendState] = useState<"pending" | "ok" | "error">("pending");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const next = () => {
    setDir(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    if (form.email.trim() && !emailOk(form.email)) {
      setEmailError("Das sieht nicht nach einer gültigen E-Mail-Adresse aus.");
      setDir(-1);
      setStep(TOTAL_STEPS - 1);
      return;
    }
    setEmailError("");
    setSubmitting(true);

    const payload: FragebogenPayload = {
      ...form,
      submittedAt: new Date().toISOString(),
    };

    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      await submitFragebogen(payload);
      setSendState("ok");
    } catch {
      setSendState("error");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="relative z-10">
      <header className="relative z-10">
        <div className="shell flex items-center justify-between py-6">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2.5"
            aria-label="NovaStack, zur Startseite"
          >
            <Wordmark className="h-7 w-auto md:h-8" />
          </button>
          <div className="flex items-center gap-2.5">
            <ThemeToggle className="hidden sm:flex" />
            <button onClick={() => navigate("/")} className="btn-ghost">
              Zur Startseite
            </button>
          </div>
        </div>
      </header>

      <main id="inhalt" className="shell pb-24 pt-4 md:pt-8">
        <div className="mx-auto max-w-2xl">
          {!done && (
            <div className="mb-8 text-center">
              <p className="label justify-center">Vorab-Fragebogen</p>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-paper md:text-4xl">
                Deine neue Website
              </h1>
              <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-paper/60">
                Beantworte kurz diese Fragen — damit wir genau das bauen, was du brauchst.
              </p>
            </div>
          )}

          {!done && (
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-grotesk text-[11px] uppercase tracking-label text-nova-sky/70">
                  {STEP_BADGES[step]} {STEP_TITLES[step]}
                </span>
                <span className="font-grotesk text-xs text-paper/55">
                  Schritt {step + 1} / {TOTAL_STEPS}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-nova-sky/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-nova-azure to-nova-sky"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </div>
            </div>
          )}

          <div className="glass-lit overflow-hidden rounded-slab px-5 py-7 shadow-slab md:px-9 md:py-10">
            {done ? (
              <SuccessPanel sendState={sendState} />
            ) : (
              <div className="relative">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -32 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {step === 0 && (
                      <div>
                        <Field label="Name des Unternehmens / der Person">
                          <input
                            className={inputCls}
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder="z.B. Müller Schreinerei oder Anna Müller Photography"
                          />
                        </Field>
                        <Field label="Was machst du?" hint="In einem Satz">
                          <textarea
                            className={textareaCls}
                            value={form.was}
                            onChange={(e) => set("was", e.target.value)}
                            placeholder="z.B. Wir verkaufen handgefertigte Möbel aus regionalen Hölzern an Privatkunden in Bayern."
                          />
                        </Field>
                        <Field label="Branche">
                          <BrancheInput value={form.branche} onChange={(v) => set("branche", v)} />
                        </Field>
                        <Field label="Was macht dich besonders?" hint="Was können nur du / dein Team?">
                          <textarea
                            className={textareaCls}
                            value={form.besonders}
                            onChange={(e) => set("besonders", e.target.value)}
                            placeholder="z.B. Wir sind die einzigen, die noch echte Handarbeit ohne CNC-Fräse anbieten. 20 Jahre Erfahrung, familiäres Team."
                          />
                        </Field>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <Field label="Was ist das Hauptziel?" hint="Mehrere möglich">
                          <ChipGroup options={GOALS} value={form.goals} onChange={(v) => set("goals", v)} />
                          <textarea
                            className={cx(textareaCls, "mt-3 min-h-[60px]")}
                            value={form.goalsOther}
                            onChange={(e) => set("goalsOther", e.target.value)}
                            placeholder="Noch etwas? z.B. Lieferanten informieren, Stellenangebote zeigen, Events ankündigen …"
                          />
                        </Field>
                        <Field label="Was soll ein Besucher auf deiner Seite TUN?" hint="Der wichtigste Schritt">
                          <input
                            className={inputCls}
                            value={form.cta}
                            onChange={(e) => set("cta", e.target.value)}
                            placeholder="z.B. Angebot anfragen, Termin buchen, Produkt kaufen, Anrufen …"
                          />
                        </Field>
                        <Field label="Hast du eine bestehende Website?">
                          <RadioGroup
                            options={EXISTING_WEB}
                            value={form.existingWeb}
                            onChange={(v) => set("existingWeb", v)}
                          />
                        </Field>
                        <Field label="URL der alten Website" hint="(falls vorhanden)">
                          <input
                            type="url"
                            className={inputCls}
                            value={form.oldUrl}
                            onChange={(e) => set("oldUrl", e.target.value)}
                            placeholder="https://www.meinewebsite.de"
                          />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <Field label="Wer sind deine idealen Kunden?">
                          <textarea
                            className={textareaCls}
                            value={form.zielgruppe}
                            onChange={(e) => set("zielgruppe", e.target.value)}
                            placeholder="z.B. Paare zwischen 28–40, die heiraten wollen. Wohnen in und um München. Legen Wert auf stilvolle, authentische Fotos und sind bereit, dafür mehr auszugeben."
                          />
                        </Field>
                        <Field label="Privat- oder Geschäftskunden?">
                          <RadioGroup options={KUNDTYP} value={form.kundtyp} onChange={(v) => set("kundtyp", v)} />
                        </Field>
                        <Field label="Welches Problem löst du für deine Kunden?">
                          <textarea
                            className={textareaCls}
                            value={form.problem}
                            onChange={(e) => set("problem", e.target.value)}
                            placeholder="z.B. Viele suchen stundenlang nach einem zuverlässigen Handwerker — bei uns bekommt man innerhalb von 24h ein Angebot."
                          />
                        </Field>
                        <Field label="Wo sind deine Kunden aktiv?" hint="Mehrere möglich">
                          <ChipGroup options={CHANNELS} value={form.channels} onChange={(v) => set("channels", v)} />
                        </Field>
                      </div>
                    )}

                    {step === 3 && (
                      <div>
                        <Field label="Welches Gefühl soll deine Website vermitteln?" hint="Mehrere möglich">
                          <FeelingGrid value={form.feelings} onChange={(v) => set("feelings", v)} />
                        </Field>
                        <Field label="Hast du Wunschfarben oder Unternehmensfarben?">
                          <div className="space-y-3">
                            <ColorField
                              label=""
                              color={form.color1}
                              hex={form.color1Hex}
                              onColor={(v) => set("color1", v)}
                              onHex={(v) => set("color1Hex", v)}
                            />
                            <ColorField
                              label=""
                              color={form.color2}
                              hex={form.color2Hex}
                              onColor={(v) => set("color2", v)}
                              onHex={(v) => set("color2Hex", v)}
                            />
                          </div>
                        </Field>
                        <Field
                          label="Sollen die Farben kontrastieren oder harmonieren?"
                          hint="z.B. Logo sticht hervor vs. alles im Einklang"
                        >
                          <RadioGroup
                            options={COLOR_MODE}
                            value={form.colorMode}
                            onChange={(v) => set("colorMode", v)}
                          />
                        </Field>
                        <Field label="Nenne 2–3 Websites, die dir gefallen" hint="Egal aus welcher Branche — und warum?">
                          <textarea
                            className={textareaCls}
                            value={form.inspo}
                            onChange={(e) => set("inspo", e.target.value)}
                            placeholder={"z.B. apple.com — weil es so klar und aufgeräumt ist\nairbnb.com — wegen der großen Fotos und einfachen Navigation"}
                          />
                        </Field>
                        <Field label="Gibt es etwas, das du auf keinen Fall möchtest?">
                          <textarea
                            className={cx(textareaCls, "min-h-[70px]")}
                            value={form.noDesign}
                            onChange={(e) => set("noDesign", e.target.value)}
                            placeholder="z.B. keine dunklen Hintergründe, keine überladenen Animationen …"
                          />
                        </Field>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <Field label="Welche Seiten brauchst du?" hint="Mehrere möglich">
                          <ChipGroup options={PAGES} value={form.pages} onChange={(v) => set("pages", v)} />
                        </Field>
                        <Field label="Was hast du schon?">
                          <ChipGroup options={HAVE} value={form.have} onChange={(v) => set("have", v)} />
                        </Field>
                        <Field label="In welchen Sprachen soll die Website sein?">
                          <ChipGroup options={LANGS} value={form.langs} onChange={(v) => set("langs", v)} />
                        </Field>
                      </div>
                    )}

                    {step === 5 && (
                      <div>
                        <Field label="Welche Funktionen brauchst du?">
                          <ChipGroup options={FEATURES} value={form.features} onChange={(v) => set("features", v)} />
                        </Field>
                        <Field label="Hast du schon eine Domain?">
                          <RadioGroup options={DOMAIN} value={form.domain} onChange={(v) => set("domain", v)} />
                        </Field>
                        <Field label="Wunsch-Domain" hint="(falls du eine hast oder dir etwas vorstellst)">
                          <input
                            className={inputCls}
                            value={form.domainWish}
                            onChange={(e) => set("domainWish", e.target.value)}
                            placeholder="z.B. www.meinbusiness.de"
                          />
                        </Field>
                        <Field label="Gibt es Konkurrenten mit Website?" hint="Was machst du besser?">
                          <textarea
                            className={cx(textareaCls, "min-h-[70px]")}
                            value={form.competitors}
                            onChange={(e) => set("competitors", e.target.value)}
                            placeholder="z.B. Firma A: gute Preise, aber keine Fotos. Mein Vorteil: …"
                          />
                        </Field>
                      </div>
                    )}

                    {step === 6 && (
                      <div>
                        <Field label="Wann brauchst du die Website?">
                          <RadioGroup options={TIMELINE} value={form.timeline} onChange={(v) => set("timeline", v)} />
                        </Field>
                        <Field label="Gibt es ein konkretes Datum oder einen Anlass?">
                          <input
                            className={inputCls}
                            value={form.anlass}
                            onChange={(e) => set("anlass", e.target.value)}
                            placeholder="z.B. Eröffnung am 1. August, Messe im Oktober …"
                          />
                        </Field>
                        <Field label="Möchtest du die Website selbst pflegen können?">
                          <RadioGroup
                            options={SELFMGMT}
                            value={form.selfmgmt}
                            onChange={(v) => set("selfmgmt", v)}
                          />
                        </Field>
                        <Field label="Deine E-Mail-Adresse">
                          <input
                            type="email"
                            className={inputCls}
                            value={form.email}
                            onChange={(e) => {
                              set("email", e.target.value);
                              if (emailError) setEmailError("");
                            }}
                            placeholder="deine@email.de"
                            autoComplete="email"
                          />
                          {emailError && (
                            <span className="mt-1.5 block text-xs text-[#ff9a9a]">{emailError}</span>
                          )}
                        </Field>
                        <Field label="Deine Telefonnummer" hint="(optional)">
                          <input
                            type="tel"
                            className={inputCls}
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder="+49 123 456789"
                            autoComplete="tel"
                          />
                        </Field>
                        <Field label="Sonst noch etwas?" hint="Ideen, Wünsche, Fragen — alles rein!">
                          <textarea
                            className={textareaCls}
                            value={form.extras}
                            onChange={(e) => set("extras", e.target.value)}
                            placeholder="z.B. Ich habe schon Texte, brauche aber Hilfe mit Fotos."
                          />
                        </Field>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={back}
                    className={cx("btn-ghost", step === 0 && "pointer-events-none opacity-0")}
                  >
                    ← Zurück
                  </button>
                  {step < TOTAL_STEPS - 1 ? (
                    <button type="button" onClick={next} className="btn-primary sheen-mask">
                      Weiter <span aria-hidden>→</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      className="btn-primary sheen-mask disabled:opacity-70"
                    >
                      {submitting ? "Wird gesendet …" : "Fertig ✓"}
                    </button>
                  )}
                </div>

                <p className="mt-6 text-center font-grotesk text-xs text-paper/50">
                  Deine Angaben gehen direkt an Nicolas und werden nur für dieses Projekt genutzt.{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/datenschutz")}
                    className="underline underline-offset-2 hover:text-paper/70"
                  >
                    Mehr dazu
                  </button>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SuccessPanel({ sendState }: { sendState: "pending" | "ok" | "error" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-nova-mist to-nova-sky text-2xl text-ink-900"
      >
        ✓
      </motion.div>
      <h2 className="mt-6 max-w-sm font-display text-2xl font-extrabold text-paper">Vielen Dank!</h2>
      <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-paper/60">
        Deine Antworten sind angekommen. Wir melden uns in Kürze bei dir — dann legen wir los.
      </p>
      {sendState === "ok" && (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-nova-sky/20 bg-nova-sky/[0.06] px-4 py-1.5 text-xs text-nova-mist">
          <span aria-hidden>✉</span> Bestätigung wurde gesendet.
        </p>
      )}
      {sendState === "error" && (
        <p className="mt-4 max-w-sm rounded-xl border border-[#ff9a9a]/30 bg-[#ff9a9a]/[0.08] px-4 py-3 text-xs leading-relaxed text-[#ffb4b4]">
          Der Versand hat leider nicht geklappt. Schreib uns bitte kurz direkt an{" "}
          <a href="mailto:info@novastackstudio.de" className="underline underline-offset-2">
            info@novastackstudio.de
          </a>
          , dann kümmern wir uns sofort darum.
        </p>
      )}
      <button onClick={() => navigate("/")} className="btn-ghost mt-7">
        Zurück zur Startseite
      </button>
    </motion.div>
  );
}
