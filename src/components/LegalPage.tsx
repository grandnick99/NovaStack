import type { ReactNode } from "react";
import { useLang } from "../lib/LangContext";
import { navigate } from "../lib/router";
import { cx } from "../lib/cx";
import Wordmark from "./Wordmark";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";

/* ── shared typographic bits, tuned to the dark canvas ───────────────── */

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-11 mb-3 font-display text-xl font-bold text-paper md:text-2xl">{children}</h2>;
}
function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 mb-2 font-grotesk text-[15px] font-semibold text-paper/90">{children}</h3>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[15px] leading-relaxed text-paper/70">{children}</p>;
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="mb-4 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-paper/70">{children}</ul>;
}
function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-nova-sky underline underline-offset-2 hover:text-nova-mist">
      {children}
    </a>
  );
}
/* ── page chrome ─────────────────────────────────────────────────────── */

function LegalHeader() {
  const { t } = useLang();
  return (
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
          <LangToggle />
          <ThemeToggle className="hidden sm:flex" />
          <button onClick={() => navigate("/")} className="btn-ghost">
            {t.legalPages.backHome}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ── content ─────────────────────────────────────────────────────────── */

function Impressum() {
  return (
    <>
      <H2>Angaben gemäß § 5 DDG</H2>
      <P>
        NovaStack<br />
        Inhaber: Nicolas Grandezka<br />
        Echternacher Str. 12<br />
        50933 Köln<br />
        Deutschland
      </P>

      <H2>Kontakt</H2>
      <P>
        Telefon: 0174 9403905<br />
        E-Mail: info@novastackstudio.de
      </P>

      <H2>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</H2>
      <P>
        Nicolas Grandezka<br />
        Anschrift wie oben
      </P>

      <H2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</H2>
      <P>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </P>

      <H2>Haftung für Inhalte</H2>
      <P>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
        der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
        diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
        möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </P>

      <H2>Haftung für Links</H2>
      <P>
        Unser Angebot enthält ggf. Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
        haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
        verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
        Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
        Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
        zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </P>

      <H2>Urheberrecht</H2>
      <P>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
        Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um
        einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
        umgehend entfernen.
      </P>
    </>
  );
}

function Privacy() {
  return (
    <>
      <H2>1. Verantwortliche Stelle</H2>
      <P>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:
      </P>
      <P>
        NovaStack<br />
        Nicolas Grandezka<br />
        Echternacher Str. 12<br />
        50933 Köln<br />
        Deutschland<br />
        Telefon: 0174 9403905<br />
        E-Mail: info@novastackstudio.de
      </P>

      <H2>2. Allgemeine Hinweise</H2>
      <H3>Rechtsgrundlagen der Verarbeitung</H3>
      <P>
        Wir verarbeiten Ihre personenbezogenen Daten nur auf Grundlage gesetzlicher Bestimmungen. Je nach
        Verarbeitung stützen wir uns insbesondere auf Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und ggf.
        § 25 Abs. 1 TDDDG), die Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b
        DSGVO), die Erfüllung rechtlicher Verpflichtungen (Art. 6 Abs. 1 lit. c DSGVO) oder unser berechtigtes
        Interesse an einer sicheren und funktionsfähigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
      </P>
      <H3>Widerruf Ihrer Einwilligung</H3>
      <P>
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine
        bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
        Datenverarbeitung bleibt unberührt.
      </P>
      <H3>Speicherdauer</H3>
      <P>
        Soweit hier keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei
        uns, bis der Zweck für die Verarbeitung entfällt. Bei einem berechtigten Löschersuchen oder Widerruf einer
        Einwilligung werden Ihre Daten gelöscht, sofern keine anderen gesetzlich zulässigen Gründe (z. B. steuer-
        oder handelsrechtliche Aufbewahrungsfristen) bestehen.
      </P>
      <H3>SSL- bzw. TLS-Verschlüsselung</H3>
      <P>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung, erkennbar am Wechsel der
        Adresszeile von „http://“ auf „https://“.
      </P>

      <H2>3. Hosting und Server-Logfiles</H2>
      <P>
        Wir hosten diese Website bei der Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA
        (nachfolgend „Cloudflare“). Cloudflare stellt die Website über ein weltweites Servernetz bereit (Hosting
        und Content-Delivery-Network) und schützt sie zugleich vor Angriffen. Dabei verarbeitet Cloudflare unter
        anderem Ihre IP-Adresse sowie technische Verbindungsdaten. Dies ist technisch erforderlich, um die Website
        sicher und zuverlässig auszuliefern.
      </P>
      <P>
        Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren, schnellen und effizienten
        Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Wir haben mit Cloudflare einen
        Vertrag über Auftragsverarbeitung gemäß Art. 28 DSGVO geschlossen. Da Cloudflare ein US-Unternehmen ist und
        eine Datenverarbeitung auch außerhalb der EU stattfinden kann, ist die Übermittlung durch die
        Standardvertragsklauseln der EU-Kommission abgesichert. Weitere Informationen:{" "}
        <A href="https://www.cloudflare.com/de-de/privacypolicy/">cloudflare.com/de-de/privacypolicy</A>.
      </P>
      <P>
        Beim Aufruf der Website werden automatisch Informationen in sogenannten Server-Log-Dateien verarbeitet, die
        Ihr Browser übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des
        zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten werden nicht mit anderen
        Datenquellen zusammengeführt und dienen der technisch fehlerfreien Darstellung sowie der Sicherheit der
        Website (Art. 6 Abs. 1 lit. f DSGVO).
      </P>

      <H2>4. Cookies und lokale Speicherung</H2>
      <P>
        Für grundlegende Funktionen nutzt unsere Website den lokalen Speicher Ihres Browsers (Local Storage), um
        Ihre gewählte Sprache, Ihr bevorzugtes Farbschema (hell/dunkel) sowie Ihre Cookie-Einwilligung zu
        speichern. Diese Informationen verbleiben in Ihrem Browser, werden nicht an uns oder Dritte übertragen und
        sind zur Bereitstellung der von Ihnen gewünschten Funktionen unbedingt erforderlich (§ 25 Abs. 2 Nr. 2
        TDDDG). Eine Einwilligung ist hierfür nicht erforderlich. Sie können den lokalen Speicher jederzeit in den
        Einstellungen Ihres Browsers löschen.
      </P>

      <H2>5. Cookie-Einwilligung (Consent-Banner)</H2>
      <P>
        Beim ersten Besuch unserer Website erhalten Sie über ein Einwilligungs-Banner die Wahl, welche Kategorien
        von Cookies und Technologien Sie zulassen möchten. Wir unterscheiden drei Kategorien:
      </P>
      <UL>
        <li><strong>Notwendig</strong> (immer aktiv): technisch erforderliche Funktionen wie Sprach- und Theme-Auswahl sowie das Speichern Ihrer Einwilligung.</li>
        <li><strong>Analyse</strong> (optional): Web-Analyse, um zu verstehen, wie die Website genutzt wird (siehe Abschnitt 8). Wird nur nach Ihrer Zustimmung geladen.</li>
        <li><strong>Marketing</strong> (optional): Reichweiten- und Kampagnenmessung. Aktuell nicht im Einsatz, für die Zukunft vorgesehen.</li>
      </UL>
      <P>
        Optionale Kategorien sind standardmäßig deaktiviert und werden erst geladen, nachdem Sie aktiv zugestimmt
        haben (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Ihre Auswahl wird lokal in Ihrem Browser
        gespeichert. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder widerrufen,
        indem Sie die Cookie-Einstellungen über den Link im Seitenfuß erneut öffnen.
      </P>

      <H2>6. Buchungsformular und Terminanfrage</H2>
      <P>
        Über das Formular auf dieser Website können Sie eine unverbindliche Beratung bzw. einen Termin anfragen.
        Dabei verarbeiten wir die von Ihnen eingegebenen Angaben:
      </P>
      <UL>
        <li>gewünschte Leistung(en) (Webdesign, KI-Integration, Marketing, Prozessoptimierung)</li>
        <li>Name</li>
        <li>Unternehmen (optional)</li>
        <li>E-Mail-Adresse</li>
        <li>Telefonnummer (optional)</li>
        <li>Budgetrahmen (optional)</li>
        <li>Wunschtermin und Zeitfenster (optional)</li>
        <li>Ihre Nachricht (optional)</li>
      </UL>
      <P>
        Diese Daten verwenden wir, um Ihre Anfrage zu bearbeiten, den gewünschten Termin abzustimmen und mit Ihnen
        Kontakt aufzunehmen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie unser
        berechtigtes Interesse an der effizienten Bearbeitung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
      </P>
      <P>
        <strong>Entgegennahme und Zustellung:</strong> Die Formularanfragen werden über unsere
        Hosting-Infrastruktur (Cloudflare, siehe Abschnitt 3) mittels einer Serverfunktion entgegengenommen.
        Für die Benachrichtigung über Ihre Anfrage sowie den Versand des optional angeforderten Fragebogens
        nutzen wir den E-Mail-Dienst Brevo (Sendinblue SAS, 106 boulevard Haussmann, 75008 Paris, Frankreich).
        Brevo verarbeitet die dafür nötigen Daten (Name, E-Mail-Adresse, Inhalt der Anfrage) in unserem Auftrag
        auf Servern innerhalb der EU. Mit Brevo besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO.
      </P>

      <H2>7. Fragebogen per E-Mail</H2>
      <P>
        Interessenten für eine Website können am Ende der Terminanfrage optional auswählen, dass wir ihnen einen
        Vorab-Fragebogen per E-Mail zusenden. In diesem Fall verarbeiten wir Ihren Namen und Ihre E-Mail-Adresse
        ausschließlich zu diesem Zweck. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie
        jederzeit widerrufen können. Der Versand erfolgt über den in Abschnitt 6 genannten Dienstleister.
      </P>
      <P>
        <strong>Ausfüllen des Fragebogens:</strong> Der Fragebogen unter{" "}
        <a href="/fragebogen" className="text-nova-sky underline underline-offset-2 hover:text-nova-mist">
          novastackstudio.de/fragebogen
        </a>{" "}
        ist bewusst kurz gehalten und komplett unverbindlich — jede Frage kann leer bleiben. Wenn Sie ihn
        ausfüllen und absenden, verarbeiten wir die dort gemachten Angaben (u. a. Name, Branche, Angaben zu
        Ihrem Unternehmen und Ihren Zielen sowie ein optional hochgeladenes Logo oder anderes Material)
        ausschließlich zur Vorbereitung und Umsetzung Ihres Website-Projekts. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. b DSGVO (vorvertragliche Maßnahmen). Der Versand an uns erfolgt technisch ebenfalls über unsere
        Hosting-Infrastruktur und den in Abschnitt 6 genannten Dienstleister Brevo. Die Angaben werden nicht an
        Dritte weitergegeben und ausschließlich für das angefragte Projekt genutzt.
      </P>

      <H2>8. Web-Analyse: Google Analytics</H2>
      <P>
        Diese Website nutzt den Webanalysedienst Google Analytics. Anbieter ist die Google Ireland Limited
        („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics ermöglicht es uns, das Verhalten
        der Websitebesucher zu analysieren (z. B. Seitenaufrufe, Verweildauer, Herkunft der Nutzer). Hierzu werden
        Technologien eingesetzt, die eine Wiedererkennung ermöglichen (z. B. Cookies).
      </P>
      <P>
        Die Nutzung erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25
        Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar. Die Datenübertragung in die USA wird auf die
        Standardvertragsklauseln der EU-Kommission gestützt. Wir haben mit Google einen Vertrag zur
        Auftragsverarbeitung abgeschlossen. Details:{" "}
        <A href="https://policies.google.com/privacy?hl=de">policies.google.com/privacy</A>.
      </P>

      <H2>9. Ihre Rechte als betroffene Person</H2>
      <P>Im Rahmen der geltenden gesetzlichen Bestimmungen haben Sie jederzeit folgende Rechte:</P>
      <UL>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
      </UL>
      <P>
        <strong>
          Werden Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO verarbeitet, haben Sie das Recht, aus Gründen,
          die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch einzulegen. Bei Direktwerbung
          besteht ein Widerspruchsrecht ohne Angabe von Gründen.
        </strong>
      </P>
      <P>
        Ihnen steht zudem ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zur Ausübung Ihrer Rechte
        sowie bei Fragen zum Datenschutz genügt eine formlose Mitteilung an: info@novastackstudio.de
      </P>
    </>
  );
}

/* ── page ────────────────────────────────────────────────────────────── */

export default function LegalPage({ kind }: { kind: "impressum" | "privacy" }) {
  const { t, lang } = useLang();
  const lp = t.legalPages;
  const title = kind === "impressum" ? lp.imprintTitle : lp.privacyTitle;

  return (
    <div className="relative z-10">
      <LegalHeader />

      <main id="inhalt" className="shell pb-24 pt-8 md:pt-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-paper md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-paper/45">{lp.updated}</p>

          {lang === "en" && (
            <p className={cx("mt-6 rounded-xl border border-nova-sky/15 bg-nova-sky/[0.05] px-4 py-3 text-sm text-paper/60")}>
              {lp.germanNotice}
            </p>
          )}

          <div className="mt-8">{kind === "impressum" ? <Impressum /> : <Privacy />}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
