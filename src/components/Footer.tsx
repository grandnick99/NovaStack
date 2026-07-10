import { useLang } from "../lib/LangContext";
import { useConsent } from "../lib/ConsentContext";
import { scrollToId } from "../lib/smoothScroll";
import Wordmark from "./Wordmark";
import LangToggle from "./LangToggle";

const CONTACT = {
  // Placeholders — swap for NovaStack's real details.
  email: "hallo@novastackstudio.de",
  phone: "+49 221 0000000",
};

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const { reopen } = useConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-[4vh] border-t border-nova-sky/10">
      {/* Closing CTA */}
      <div className="shell py-12 md:py-16">
        <div className="glass-lit relative -mx-4 overflow-hidden rounded-slab px-4 py-8 md:-mx-8 md:px-8 md:py-14">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="max-w-xl font-display text-3xl font-extrabold leading-[1.06] tracking-tight text-paper md:text-4xl">
                <span className="text-gradient">{f.ctaTitle}</span>
              </h2>
              <p className="mt-3 max-w-md text-sm text-paper/60">{f.ctaSub}</p>
            </div>
            <button onClick={() => scrollToId("termin")} className="btn-primary sheen-mask whitespace-nowrap">
              {f.builtFor}
              <span aria-hidden>→</span>
            </button>
          </div>
          {/* faint stacked planes in the corner */}
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 opacity-30">
            <div className="absolute inset-x-8 top-8 h-24 rotate-[8deg] rounded-3xl border border-nova-sky/20" />
            <div className="absolute inset-x-4 top-16 h-24 rotate-[8deg] rounded-3xl border border-nova-sky/15" />
            <div className="absolute inset-x-0 top-24 h-24 rotate-[8deg] rounded-3xl border border-nova-sky/10" />
          </div>
        </div>
      </div>

      <div className="shell pb-12">
        <div className="grid gap-10 border-t border-nova-sky/10 pt-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Wordmark className="h-5 w-auto" />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-paper/55">
              {f.tagline}
            </p>
            <div className="mt-6">
              <LangToggle />
            </div>
          </div>

          {/* Link columns — the services column is wider so long labels like
              "KI-Beratung & Integration" stay on one line, and buttons are
              forced text-left (buttons centre wrapped lines by default). */}
          {f.sections.map((sec, i) => (
            <div key={sec.heading} className={i === 0 ? "md:col-span-3" : "md:col-span-2"}>
              <h3 className="font-grotesk text-[11px] uppercase tracking-label text-nova-sky/70">
                {sec.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {sec.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => scrollToId(l.href)}
                      className="text-left text-sm text-paper/60 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-grotesk text-[11px] uppercase tracking-label text-nova-sky/70">
              {f.contactHeading}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-paper/60 transition-colors hover:text-paper">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="text-paper/60 transition-colors hover:text-paper">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-paper/55">{f.location}</li>
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-nova-sky/10 pt-6 text-xs text-paper/55 sm:flex-row sm:items-center">
          <p>© {year} NovaStack. {f.rights}</p>
          <div className="flex items-center gap-5">
            {f.legal.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-paper/85">
                {l.label}
              </a>
            ))}
            <button type="button" onClick={reopen} className="transition-colors hover:text-paper/85">
              {t.cookies.footerLink}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
