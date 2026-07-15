import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigate } from "../lib/router";
import { cx } from "../lib/cx";
import { EASE } from "../lib/motion";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";
import { submitFragebogen, type FragebogenPayload, type FragebogenAttachment } from "../lib/submitFragebogen";
import {
  BRANCHEN,
  GOALS,
  EXISTING_WEB,
  KUNDTYP,
  STEP_TITLES,
  STEP_BADGES,
  TOTAL_STEPS,
  MAX_UPLOAD_MB,
  type ChipOption,
} from "../content/fragebogen";

/**
 * Kurzer, komplett unverbindlicher Vorab-Fragebogen für Webdesign-Interessenten
 * — eigenständige Seite unter /fragebogen. Ersetzt keine Beratung: die Details
 * werden im persönlichen Gespräch geklärt. Zweck ist, dass sich Interessenten
 * nach der Terminbuchung schon eingebunden fühlen und Nick vorab ein grobes
 * Bild bekommt — daher bewusst kurz (3 Schritte statt der früheren 7).
 *
 * Aufgerufen wird die Seite über den Link, den Interessenten optional am Ende
 * der Terminanfrage per E-Mail bekommen (src/lib/questionnaire.ts) — sie
 * gehört daher nicht in die Hauptnavigation.
 */

interface FormState {
  name: string;
  branche: string;
  besonders: string;
  goals: string[];
  kundtyp: string;
  existingWeb: string;
  oldUrl: string;
}

const EMPTY: FormState = {
  name: "",
  branche: "",
  besonders: "",
  goals: [],
  kundtyp: "",
  existingWeb: "",
  oldUrl: "",
};

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

/** Freitext-Eingabe mit Vorschlagsliste für die Branche. */
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

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Datei-Upload fürs Logo o.Ä. — komplett optional. */
function UploadField({
  attachment,
  onChange,
}: {
  attachment: FragebogenAttachment | null;
  onChange: (a: FragebogenAttachment | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleFile = async (file: File | undefined) => {
    setError("");
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Bitte ein Bild (PNG, JPG, WEBP, SVG) oder PDF hochladen.");
      return;
    }
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setError(`Datei ist zu groß (max. ${MAX_UPLOAD_MB} MB).`);
      return;
    }
    setBusy(true);
    try {
      const base64 = await fileToBase64(file);
      onChange({ name: file.name, type: file.type, base64 });
    } catch {
      setError("Datei konnte nicht gelesen werden. Bitte erneut versuchen.");
    } finally {
      setBusy(false);
    }
  };

  if (attachment) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-nova-sky/15 bg-nova-ink/40 px-4 py-3">
        <span className="truncate font-sans text-sm text-paper/85">📎 {attachment.name}</span>
        <button
          type="button"
          onClick={() => {
            onChange(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="flex-none font-grotesk text-xs text-paper/50 underline underline-offset-2 hover:text-paper/80"
        >
          Entfernen
        </button>
      </div>
    );
  }

  return (
    <div>
      <label
        className={cx(
          "flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-nova-sky/25 bg-nova-ink/30 px-4 py-5 text-center font-grotesk text-sm text-paper/60 transition-colors duration-200 hover:border-nova-sky/45 hover:text-paper/80",
          busy && "pointer-events-none opacity-60",
        )}
      >
        {busy ? "Wird geladen …" : "📎 Datei auswählen (Logo, Bilder, PDF …)"}
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>
      {error && <span className="mt-1.5 block text-xs text-[#ff9a9a]">{error}</span>}
    </div>
  );
}

export default function Fragebogen() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [attachment, setAttachment] = useState<FragebogenAttachment | null>(null);
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
    setSubmitting(true);

    const payload: FragebogenPayload = {
      ...form,
      attachment,
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
              <p className="label justify-center">Vorab-Fragebogen · komplett unverbindlich</p>
              <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-paper md:text-4xl">
                Ein paar kurze Fragen
              </h1>
              <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-paper/60">
                Kein Muss — das hier ersetzt kein Gespräch. Es hilft mir nur, mir vorab ein grobes
                Bild zu machen. Alles Weitere besprechen wir gemeinsam im Termin.
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
                        <Field label="Name des Unternehmens / der Person" hint="optional">
                          <input
                            className={inputCls}
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder="z.B. Müller Schreinerei oder Anna Müller Photography"
                          />
                        </Field>
                        <Field label="Branche" hint="optional">
                          <BrancheInput value={form.branche} onChange={(v) => set("branche", v)} />
                        </Field>
                        <Field
                          label="Alleinstellungsmerkmal / Fokus"
                          hint="Was können nur du / dein Team?"
                        >
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
                        <Field label="Was ist das Hauptziel?" hint="Mehrere möglich, optional">
                          <ChipGroup options={GOALS} value={form.goals} onChange={(v) => set("goals", v)} />
                        </Field>
                        <Field label="Wer sind deine Kunden?" hint="optional">
                          <RadioGroup options={KUNDTYP} value={form.kundtyp} onChange={(v) => set("kundtyp", v)} />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <Field label="Hast du eine bestehende Website?" hint="optional">
                          <RadioGroup
                            options={EXISTING_WEB}
                            value={form.existingWeb}
                            onChange={(v) => set("existingWeb", v)}
                          />
                        </Field>
                        <Field label="URL der alten Website" hint="falls vorhanden">
                          <input
                            type="url"
                            className={inputCls}
                            value={form.oldUrl}
                            onChange={(e) => set("oldUrl", e.target.value)}
                            placeholder="https://www.meinewebsite.de"
                          />
                        </Field>
                        <Field
                          label="Logo oder Material hochladen"
                          hint={`optional, max. ${MAX_UPLOAD_MB} MB`}
                        >
                          <UploadField attachment={attachment} onChange={setAttachment} />
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
                  Ganz unverbindlich — jede Frage kann leer bleiben. Deine Angaben gehen direkt an
                  Nicolas und werden nur für dieses Projekt genutzt.{" "}
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
        Deine Antworten sind angekommen. Wir gehen sie vor unserem Gespräch schon durch — den Rest
        klären wir gemeinsam im Termin.
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
