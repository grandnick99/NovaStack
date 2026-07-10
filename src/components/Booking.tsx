import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../lib/LangContext";
import SectionLabel from "./ui/SectionLabel";
import { cx } from "../lib/cx";
import { EASE } from "../lib/motion";
import { submitBooking, type BookingPayload } from "../lib/submitBooking";
import { requestQuestionnaire } from "../lib/questionnaire";

interface FormState {
  services: string[];
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  date: string;
  slot: string;
  message: string;
  wantsQuestionnaire: boolean;
}

const EMPTY: FormState = {
  services: [],
  name: "",
  company: "",
  email: "",
  phone: "",
  budget: "",
  date: "",
  slot: "",
  message: "",
  wantsQuestionnaire: false,
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 flex items-baseline justify-between">
        <span className="font-grotesk text-sm text-paper/80">{label}</span>
        {hint && <span className="text-[11px] text-paper/55">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-[#ff9a9a]">{error}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-nova-sky/15 bg-nova-ink/40 px-4 py-3 font-sans text-[15px] text-paper placeholder:text-paper/30 outline-none transition-colors duration-200 focus:border-nova-sky/50 focus:bg-nova-ink/60";

export default function Booking() {
  const { t } = useLang();
  const b = t.booking;

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (key: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(key)
        ? f.services.filter((s) => s !== key)
        : [...f.services, key],
    }));

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0 && form.services.length === 0) e.services = b.pickOne;
    if (s === 1) {
      if (!form.name.trim()) e.name = b.required;
      if (!form.email.trim()) e.email = b.required;
      else if (!emailOk(form.email)) e.email = b.invalidEmail;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (!validate(1)) {
      setDir(-1);
      setStep(1);
      return;
    }
    setSubmitting(true);
    const lang = document.documentElement.lang || "de";
    const payload: BookingPayload = {
      ...form,
      lang,
      submittedAt: new Date().toISOString(),
    };
    try {
      await submitBooking(payload);
      // Only web-design prospects who opted in get the questionnaire emailed.
      if (form.wantsQuestionnaire && form.services.includes("web")) {
        await requestQuestionnaire({ email: form.email, name: form.name, lang });
      }
      setDone(true);
    } catch {
      setErrors({ submit: b.submitError });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStep(0);
    setDone(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const progress = ((step + 1) / 4) * 100;

  return (
    <section id="termin" className="relative scroll-mt-24 py-[6vh]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left — heading + stepper */}
          <div className="lg:col-span-5">
            <SectionLabel>{b.label}</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-paper md:text-5xl">
              {b.title}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-paper/60 md:text-lg">
              {b.sub}
            </p>

            <ol className="mt-10 hidden gap-1 lg:flex lg:flex-col">
              {b.steps.map((label, i) => {
                const active = i === step;
                const complete = i < step || done;
                return (
                  <li key={label} className="flex items-center gap-4 py-2">
                    <span
                      className={cx(
                        "flex h-9 w-9 flex-none items-center justify-center rounded-full border font-grotesk text-sm transition-all duration-300",
                        complete
                          ? "border-transparent bg-gradient-to-b from-[#cfe0fb] to-[#68a1eb] text-ink-900"
                          : active
                            ? "border-nova-sky/60 text-paper"
                            : "border-nova-sky/15 text-paper/40",
                      )}
                    >
                      {complete ? "✓" : i + 1}
                    </span>
                    <span
                      className={cx(
                        "font-grotesk text-sm transition-colors duration-300",
                        active || complete ? "text-paper" : "text-paper/40",
                      )}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right — form panel */}
          <div className="lg:col-span-7">
            <div className="glass-lit -mx-4 overflow-hidden rounded-slab px-4 py-6 shadow-slab md:-mx-8 md:px-8 md:py-9 lg:mx-0 lg:px-9">
              {/* progress (mobile + universal) */}
              {!done && (
                <div className="mb-7">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-grotesk text-[11px] uppercase tracking-label text-nova-sky/70">
                      {b.stepTitles[step]}
                    </span>
                    <span className="font-grotesk text-xs text-paper/55">
                      {step + 1} / 4
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-nova-sky/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-nova-azure to-nova-sky"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </div>
                </div>
              )}

              {done ? (
                <SuccessPanel
                  onReset={reset}
                  questionnaireSent={form.wantsQuestionnaire && form.services.includes("web")}
                />
              ) : (
                <div className="relative">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      initial={{ opacity: 0, x: dir * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: dir * -40 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {step === 0 && (
                        <div>
                          <Field label={b.fields.service} hint={b.fields.multiHint} error={errors.services}>
                            <div className="grid gap-3 sm:grid-cols-2">
                              {b.serviceOptions.map((opt) => {
                                const on = form.services.includes(opt.key);
                                return (
                                  <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => toggleService(opt.key)}
                                    aria-pressed={on}
                                    className={cx(
                                      "group relative rounded-2xl border p-4 text-left transition-all duration-200",
                                      on
                                        ? "border-nova-sky/60 bg-nova-sky/[0.1]"
                                        : "border-nova-sky/15 bg-nova-ink/30 hover:border-nova-sky/35",
                                    )}
                                  >
                                    <span className="flex items-center justify-between">
                                      <span className="font-grotesk text-base font-medium text-paper">
                                        {opt.label}
                                      </span>
                                      <span
                                        className={cx(
                                          "flex h-5 w-5 items-center justify-center rounded-full border text-[11px] transition-all duration-200",
                                          on
                                            ? "border-transparent bg-gradient-to-b from-[#cfe0fb] to-[#68a1eb] text-ink-900"
                                            : "border-nova-sky/30 text-transparent",
                                        )}
                                      >
                                        ✓
                                      </span>
                                    </span>
                                    <span className="mt-1 block text-xs text-paper/60">{opt.desc}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </Field>
                        </div>
                      )}

                      {step === 1 && (
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field label={b.fields.name} error={errors.name} htmlFor="bk-name">
                            <input
                              id="bk-name"
                              name="name"
                              className={inputCls}
                              value={form.name}
                              onChange={(e) => set("name", e.target.value)}
                              autoComplete="name"
                            />
                          </Field>
                          <Field label={b.fields.company} htmlFor="bk-company">
                            <input
                              id="bk-company"
                              name="organization"
                              className={inputCls}
                              value={form.company}
                              onChange={(e) => set("company", e.target.value)}
                              autoComplete="organization"
                            />
                          </Field>
                          <Field label={b.fields.email} error={errors.email} htmlFor="bk-email">
                            <input
                              id="bk-email"
                              name="email"
                              type="email"
                              className={inputCls}
                              value={form.email}
                              onChange={(e) => set("email", e.target.value)}
                              autoComplete="email"
                              inputMode="email"
                            />
                          </Field>
                          <Field label={b.fields.phone} hint={b.fields.phoneOptional} htmlFor="bk-phone">
                            <input
                              id="bk-phone"
                              name="tel"
                              type="tel"
                              className={inputCls}
                              value={form.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              autoComplete="tel"
                              inputMode="tel"
                            />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label={b.fields.budget}>
                              <div className="flex flex-wrap gap-2">
                                {b.budgetOptions.map((opt) => (
                                  <Chip
                                    key={opt}
                                    active={form.budget === opt}
                                    onClick={() => set("budget", opt)}
                                  >
                                    {opt}
                                  </Chip>
                                ))}
                              </div>
                            </Field>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="grid gap-5">
                          <Field label={b.fields.date} htmlFor="bk-date">
                            <input
                              id="bk-date"
                              type="date"
                              min={today}
                              className={inputCls}
                              value={form.date}
                              onChange={(e) => set("date", e.target.value)}
                            />
                          </Field>
                          <Field label={b.fields.slot}>
                            <div className="flex flex-wrap gap-2">
                              {b.slotOptions.map((opt) => (
                                <Chip key={opt} active={form.slot === opt} onClick={() => set("slot", opt)}>
                                  {opt}
                                </Chip>
                              ))}
                            </div>
                          </Field>
                          <Field label={b.fields.message} htmlFor="bk-message">
                            <textarea
                              id="bk-message"
                              rows={4}
                              className={cx(inputCls, "resize-none")}
                              placeholder={b.fields.messagePlaceholder}
                              value={form.message}
                              onChange={(e) => set("message", e.target.value)}
                            />
                          </Field>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <ReviewPanel form={form} />
                          {form.services.includes("web") && (
                            <QuestionnaireOptIn
                              checked={form.wantsQuestionnaire}
                              onToggle={() => set("wantsQuestionnaire", !form.wantsQuestionnaire)}
                            />
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={back}
                      className={cx("btn-ghost", step === 0 && "pointer-events-none opacity-0")}
                    >
                      {b.back}
                    </button>
                    {step < 3 ? (
                      <button type="button" onClick={next} className="btn-primary sheen-mask">
                        {b.next}
                        <span aria-hidden>→</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={submit}
                        disabled={submitting}
                        className="btn-primary sheen-mask disabled:opacity-70"
                      >
                        {submitting ? b.submitting : b.submit}
                      </button>
                    )}
                  </div>

                  {errors.submit && (
                    <p role="alert" className="mt-4 rounded-xl border border-[#ff9a9a]/30 bg-[#ff9a9a]/[0.08] px-4 py-3 text-center text-sm text-[#ffb4b4]">
                      {errors.submit}
                    </p>
                  )}

                  <p className="mt-5 text-center font-grotesk text-xs text-paper/55">
                    {b.reassurance}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
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

function QuestionnaireOptIn({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  const { t } = useLang();
  const b = t.booking;
  return (
    <div className="mt-5 rounded-2xl border border-nova-sky/15 bg-nova-sky/[0.05] p-5">
      <p className="font-grotesk text-[11px] uppercase tracking-label text-nova-sky/70">
        {b.questionnaireTitle}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-paper/65">{b.questionnaireText}</p>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onToggle}
        className="mt-4 flex w-full items-center gap-3 text-left"
      >
        <span
          className={cx(
            "relative h-6 w-11 flex-none rounded-full border transition-colors duration-200",
            checked ? "border-transparent bg-gradient-to-b from-[#cfe0fb] to-[#68a1eb]" : "border-nova-sky/30 bg-nova-ink/40",
          )}
        >
          <span
            className={cx(
              "absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition-all duration-200",
              checked ? "left-[22px]" : "left-0.5",
            )}
            style={{ height: 18, width: 18 }}
          />
        </span>
        <span className="font-grotesk text-sm text-paper">{b.questionnaireOptIn}</span>
      </button>
    </div>
  );
}

function ReviewPanel({ form }: { form: FormState }) {
  const { t } = useLang();
  const b = t.booking;
  const serviceLabels = form.services
    .map((k) => b.serviceOptions.find((o) => o.key === k)?.label ?? k)
    .join(", ");

  const rows: { label: string; value: string }[] = [
    { label: b.steps[0], value: serviceLabels },
    { label: b.fields.name, value: form.name },
    { label: b.fields.company, value: form.company },
    { label: b.fields.email, value: form.email },
    { label: b.fields.phone, value: form.phone },
    { label: b.fields.budget, value: form.budget },
    { label: b.fields.date, value: form.date },
    { label: b.fields.slot, value: form.slot },
  ].filter((r) => r.value.trim() !== "");

  return (
    <div>
      <p className="mb-4 font-grotesk text-sm uppercase tracking-label text-nova-sky/70">
        {b.review}
      </p>
      <dl className="divide-y divide-nova-sky/10 rounded-2xl border border-nova-sky/12 bg-nova-ink/30 px-5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="font-grotesk text-xs uppercase tracking-wider text-paper/55">{r.label}</dt>
            <dd className="text-right text-sm text-paper">{r.value}</dd>
          </div>
        ))}
      </dl>
      {form.message && (
        <p className="mt-4 rounded-2xl border border-nova-sky/12 bg-nova-ink/30 p-4 text-sm leading-relaxed text-paper/75">
          {form.message}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({
  onReset,
  questionnaireSent,
}: {
  onReset: () => void;
  questionnaireSent?: boolean;
}) {
  const { t } = useLang();
  const b = t.booking;
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
      <h3 className="mt-6 max-w-sm font-display text-2xl font-extrabold text-paper">
        {b.successTitle}
      </h3>
      <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-paper/60">
        {b.successBody}
      </p>
      {questionnaireSent && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-nova-sky/20 bg-nova-sky/[0.06] px-4 py-1.5 text-xs text-nova-mist">
          <span aria-hidden>✉</span>
          {b.questionnaireSent}
        </p>
      )}
      <button onClick={onReset} className="btn-ghost mt-7">
        {b.successAgain}
      </button>
    </motion.div>
  );
}
