# NovaStack — Projekt-Protokoll (Black Box)

> Vollständiges Gedächtnis des Projekts: was gewollt war, was gebaut wurde, welche Entscheidungen warum fielen, was offen ist und wie bekannte Probleme behoben werden. Gedacht als Nachschlagewerk, falls später Fragen oder Probleme auftauchen.
> Stand: 11.07.2026 · Gepflegt von Claude · Bei größeren Meilensteinen fortschreiben.

---

## 1. Das Projekt in einem Absatz

Marketing- und Buchungswebsite für **NovaStack** (novastackstudio.de), das Kölner Digitalstudio von **Nicolas Grandezka**. Primäres Ziel der Seite: Besucher zur Buchung eines unverbindlichen Erstgesprächs bewegen. Drei Leistungen: Webdesign & Wartung · KI-Beratung & Integration (inkl. Prozessoptimierung) · Datenbasiertes Marketing. Deutsch ist die Hauptsprache, Englisch per Toggle. Dunkles Design ist der Marken-Look, helles per Toggle.

**Technik:** React 18 + Vite 5 + TypeScript + Tailwind CSS v3, framer-motion (Animationen), Lenis (Smooth Scroll). Statische Seite ohne eigenes Backend — Formulare senden an konfigurierbare Webhooks (noch nicht gesetzt). Ort: `~/Desktop/Cowork Workspace/novastack-site`, Brand-Assets in `~/Desktop/NovaStack`. Dev-Server: Launch-Config `novastack`, Port 5173. Produktions-Build läuft sauber durch (~365 KB JS, 115 KB gzip).

**Live-Betrieb (seit Phase 16):** **[novastackstudio.de](https://novastackstudio.de)** ist live auf **Cloudflare Workers** (Static Assets), Projektname `novastack`. Git-Repo: `https://github.com/grandnick99/NovaStack.git` (Branch `main`), Cloudflare ist per Git-Integration angebunden — **jeder Push auf `main` löst automatisch Build + Deploy aus**. Domain-Registrar bleibt **INWX** (`.de`-Domains lassen sich nicht zu Cloudflare transferieren), DNS läuft vollständig über Cloudflare (Nameserver bei INWX auf `kim.ns.cloudflare.com` / `rommy.ns.cloudflare.com` umgestellt). Google Analytics 4 ist eingerichtet und läuft über das bestehende Consent-Gate (s. Phase 16).

---

## 2. Chronologie: Anforderungen → Umsetzung

### Phase 1 — Grundgerüst (frühere Sessions)
**Gewollt:** Komplette Marketing-Site mit Buchungsstrecke.
**Geliefert:** Gesamtes Gerüst — Hero mit animiertem NovaMark (Stern + 3 gestapelte Ebenen, bauen sich beim Laden zusammen, fächern beim Scrollen auf), Sticky-Stacking-Kartendeck für Leistungen, Arbeitsweise/Vorgehen mit 4 Schritten, Studio-Sektion, Referenzen-Platzhalter, 4-Schritte-Buchungsformular mit Validierung, Fragebogen-Opt-in für Webdesign-Interessenten, Footer. DE/EN-Wörterbuch in `src/content/i18n.ts`. Custom-Glas-Designsystem (`.glass`, `.glass-lit`, `.glass-card`) in `src/index.css`.

### Phase 2 — Glas-Feintuning (viele Iterationen)
**Gewollt:** Karten wie leicht milchiges Glas — kein Glanz, kein Gloss; Schrift der dahinterliegenden Karte nur schemenhaft. Titelzeile transparenter. Light Mode transparenter als Dark. Kein Flackern beim Scrollen.
**Geliefert:** Specular-Kanten und Sheen-Overlays entfernt, Alpha-Werte über mehrere Runden justiert. **Wichtigste technische Erkenntnis:** `backdrop-filter` auf einem absoluten Kind-Element wird von `overflow-hidden` des Elternelements blockiert (Stacking-Context) → Blur muss direkt auf das `<article>` (heute als Klasse `.card-frost`). `clip-path` als Alternative blockiert genauso — verworfen.

### Phase 3 — Strenger Vier-Agenten-Review
**Gewollt:** Vier Agenten prüfen streng: Sprache, Layout/Linien, Stil, Vollständigkeit fürs Marktsegment — mit Verbesserungsvorschlägen und Umsetzungswegen.
**Geliefert:** Ausführliche Befunde. Wichtigste: Impressum/Datenschutz fehlen (Launch-Blocker), Button-Glow zu stark, Referenzen-Sektion untergräbt Vertrauen, Formular sendet nur Mock. Vieles davon in Phase 5 umgesetzt.

### Phase 4 — Agentur-Texte einbauen
**Gewollt:** Texte der PR-/Marketing-Agentur einbauen, bestehende Reiter ergänzen, neue anlegen.
**Geliefert:** Neue Sektion **Philosophie** (2 Blöcke: „Digitale Präsenz" / „Wegweiser durch den KI-Dschungel"), Leistungen umbenannt + vierte Leistung „Prozessoptimierung" (später wieder zusammengelegt, s. Phase 12), 2 Methodik-Karten unter Vorgehen, neuer Studio-Text, neuer Buchungs-Untertitel. Alles DE + EN (EN = meine Übersetzung der Agentur-Vorlage!). Nachjustierungen: Philosophie-Untertitel ersetzt durch „Großes Wachstum beginnt…"-Text, 01/02-Nummerierung entfernt, Text unter (nicht neben) die Überschrift.

### Phase 5 — Kritischer Komplett-Review mit Direktumsetzung
**Gewollt:** „Analysiere aus allen Winkeln, sei extrem kritisch, du bist befugt direkt zu verbessern. Danach muss die Seite perfekt sein."
**Geliefert:**
- Grammatikfehler „Großer Wachstum" → „Großes Wachstum"
- Team-vs-Gründer-Widerspruch im Studio-Text aufgelöst (gründergeführt + Spezialisten-Netzwerk)
- **Referenzen-Sektion umgebaut:** statt „wir haben noch nichts" jetzt 4 konkrete Garantien (Direkt mit dem Gründer · 100 % Eigentum · Antwort < 24 h · Voller Einblick), Zertifikate/Stimmen als ehrliche „folgt"-Slots darunter
- CTA-Button in der Philosophie ergänzt (Text forderte zum Buchen auf, hatte aber keinen Button)
- Reassurance-Zeile im Buchungsformular („Unverbindlich · Antwort < 24 h")
- Footer-CTA eigenständig formuliert („Bauen wir Ihr Fundament.") statt Booking-Text-Dublette
- og:/Twitter-Meta-Tags ergänzt

### Phase 6 — Vorgehen-Sektion
**Gewollt:** Verbindungslinien auch bei 2-Spalten-Layout (03→04), anderer Name für „Arbeitsweise".
**Geliefert:** Connector-Linien pro Schritt (funktionieren bei 1/2/4 Spalten korrekt), Sektion heißt jetzt **„Vorgehen"** (EN „Approach") — in Nav, Label und Footer.

### Phase 7 — Scroll-Performance & Flacker-Saga (mehrere Anläufe!)
**Gewollt:** Karten-Transparenz-Glitch weg, Scrollen nicht mehr abgehackt — und der Blur-Look muss bleiben.
**Verlauf & Erkenntnisse (wichtig bei Rückfällen):**
1. Erster (falscher) Fix: Karten-Blur entfernt → Look kaputt, Scrollen weiterhin schlecht. Blur war NICHT die Hauptursache.
2. **Echte Ursachen:** `background-attachment: fixed` auf dem Body (Repaint des gesamten Viewports pro Scroll-Frame — Hauptbremse) und `mix-blend-mode: overlay` auf dem Grain-Overlay (Full-Viewport-Recomposite pro Frame). Gradient in die fixierte `<Backdrop>`-Ebene verlegt, Blend-Mode entfernt.
3. Der kurze Durchsichtig-Moment der Karten kam von der 3D-Eingangsanimation (rotateX + backdrop-filter vertragen sich nicht) → Eingang ist jetzt schlichtes Rise+Fade.
4. Später zusätzlich: Blur-Radien gesenkt (Glas 20→14 px, Glass-lit 24→16 px, Karten 10→8 px), Karten-Blur auf Mobile ganz aus (dort tragen fast-deckende Füllungen die Lesbarkeit: 0.97/0.98 dark, 0.96/0.97 light — **Achtung:** wenn Mobile-Blur aus ist, MÜSSEN die Mobile-Alphas hoch sein, sonst wirken Karten durchsichtig; genau dieser Bug trat auf und wurde gefixt), Lenis auf lerp 0.28 + natives Touch-Scrolling (`syncTouch: false`).

### Phase 8 — Qualitäts-/A11y-/SEO-Durchgang
**Gewollt:** „Teste und optimiere jeden Aspekt, extrem kritisch."
**Geliefert:** Formular-Fehleranzeige gefixt (Submit-Fehler wurde vorher nie angezeigt — echter Conversion-Bug), Skip-Link, Escape schließt Mobile-Menü, WCAG-Kontrast-Anhebungen (40→55 % Alpha bei Kleintexten), `theme-color` synchron zum Theme, Tab-Titel + Description je Sprache, JSON-LD (ProfessionalService), robots.txt, Font-Preloads, `name`/`inputMode` auf Formularfeldern, noscript-Fallback, tote Geist-Font-Datei entfernt.

### Phase 9 — Tagline & Titelzeile
**Gewollt:** Slogan „Digital Solutions" unter dem Logo-Schriftzug in der Titelzeile; verschwindet beim Scrollen unter dem Schriftzug. (Erster Versuch unter dem Hero-Logo war ein Missverständnis, zurückgebaut.) Logo + Name anfangs viel größer, schrumpfen beim Scrollen.
**Geliefert:** Tagline in gesperrten Versalien unter dem Wortmark, klappt beim Scrollen per Clip nach oben weg (an den bestehenden `scrolled`-State bei 24 px gekoppelt). Logo/Wortmark starten groß (56/40 px) und schrumpfen auf kompakt (36/26 px).

### Phase 10 — Rebranding NovaStack → NovaStacks
**Gewollt:** Nur die Domain novastacks.de war verfügbar → Name überall anpassen.
**Geliefert:** Wortmark-SVG um ein „s" erweitert (Marken-S auf x-Höhe skaliert, Faktor 0.155 statt 0.2), alle Texte/Meta/JSON-LD/aria (DE+EN) umbenannt, E-Mail auf `hallo@novastacks.de`. Kontrolliert per Rest-Suche: keine alten Vorkommen mehr.

### Phase 11 — Cookie-Consent & Analytics-Strategie
**Gewollt:** Empfehlung für einen Cookie-Service + Implementierung. Nachfrage ergab: Analytics ist später geplant.
**Entscheidung:** Kein Dritt-CMP (Cookiebot etc.) — extern geladenes Script, Kosten, fremder Look, widerspricht der Marken-Botschaft Unabhängigkeit. Stattdessen **selbstgebautes Banner** im Glas-Design.
**Geliefert:** `ConsentContext` (localStorage `novastack-consent`), Banner mit „Alle akzeptieren / Nur notwendige / Einstellungen" + Detail-Panel mit 3 Kategorien (Notwendig fix an, Analyse, Marketing), Footer-Link „Cookie-Einstellungen" zum Wiederöffnen, `src/lib/analytics.ts` als Consent-Gate (lädt GA nur bei Zustimmung UND gesetzter `VITE_GA_MEASUREMENT_ID` — aktuell No-op).
**Analytics-Empfehlung (offen):** Wenn nur Besucher-/Conversion-Zahlen gebraucht werden → cookieloses EU-Tool (Plausible/Fathom, ~9 €/M, kein Banner-Zwang). Wenn Google Ads/Remarketing geplant → GA4/Meta-Pixel über das gebaute Consent-Gate.

### Phase 12 — Leistungen: 4 → 3
**Gewollt:** Prozessoptimierung mit KI-Beratung zusammenlegen — „gehören eh zusammen, soll nicht wie Haarspalterei rüberkommen. Wir analysieren und optimieren die Prozesse durch digitale Lösungen oder KI."
**Geliefert:** Karte 04 entfernt, Inhalte in Karte 02 integriert (Body beginnt mit Nicks Formulierung), „Vier Disziplinen" → **„Drei Disziplinen. Ein System."**, Footer-Links auf 3, Buchungsoption entfernt (KI-Option trägt „Prozessoptimierung" in der Beschreibung), toter SVG-Glyph gelöscht. **Nebeneffekt:** Seite wieder konsistent mit dem 3-Ebenen-Logo und „Drei Ebenen. Ein Fundament." Nicht ohne Auftrag wieder aufsplitten.

### Phase 13 — Layout-Vereinheitlichung (Text-Grid)
**Gewollt:** Alle Texte — in Boxen und außerhalb — auf demselben Grid; Box-Ränder ragen definiert darüber hinaus. Footer-Links einheitlich. Abschnittsabstände kleiner.
**Geliefert:** Bleed-Muster: Boxen bekommen negativen Außenabstand exakt in Höhe ihres Innenabstands (Karten: −16 px mobil / −32 px ab md; angewendet auf Service-Karten, Methodik-Karten, Studio-Panels, Garantie-Karten, Referenz-Panels, Buchungs-Panel, Footer-CTA — jeweils nur in Breakpoints mit voller Breite). Footer: `text-left` auf Link-Buttons (Buttons zentrieren umbrochene Zeilen per Default — das war der „andere Grid-Box"-Eindruck) + breitere Leistungs-Spalte. Abstände: 9vh → 6vh pro Sektion.
**Titelzeile:** ragt weiter hinaus als alle anderen Boxen (−20 px mobil / −48 px ab md), Logo+Name zusätzlich nach links gerückt (`-ml-2 md:-ml-6`), auf Mobile bleiben 4 px Luft zum Bildschirmrand (Rand darf ihn nicht berühren).

### Phase 14 — Cookie-Daten-Cloud-Architektur (Audit)
**Gewollt:** Prüfen, ob eine performante, skalierbare, DSGVO-konforme Cloud-Architektur für Cookie-Daten existiert.
**Ergebnis:** Es existiert bewusst keine — Consent bleibt ausschließlich im Browser (localStorage), nichts wird übertragen, kein Backend. Für den Launch ist das der korrekte, maximal datenschutzfreundliche Zustand.
**Vereinbart (WICHTIG, siehe §4):** Beim finalen Pre-Launch-Check proaktiv nachfragen, ob (a) serverseitiger Consent-Nachweis (DSGVO Art. 7 Abs. 1) und/oder (b) echtes Analytics gewünscht ist — und dann so weit wie möglich implementieren. Empfohlene Architektur: `sendBeacon` aus `ConsentContext.persist()` → EU-Edge-Function (z. B. Cloudflare Workers) → Append-only-Log (EU-Store) → aggregierte Tages-Rollups; keine IP-Speicherung.

### Phase 15 — Rebranding zurück NovaStacks → NovaStack (10.07.2026)
**Gewollt:** Domain `novastackstudio.de` wird verfügbar sein → der Name muss nicht mehr auf „NovaStacks" ausweichen, zurück zu **„NovaStack"** überall. E-Mail bleibt vorerst Platzhalter, aber schon auf die neue Domain gesetzt (noch nicht real eingerichtet).
**Geliefert:** Gegenteil von Phase 10 — Wortmark-SVG: trailing „s"-Glyph (der duplizierte, auf 0.155 skalierte S-Pfad) aus dem `STACK`-Array entfernt, `viewBox` von `1186×204` auf `1091×204` verkleinert (kein Leerraum rechts). Alle Texte/Meta/JSON-LD/aria (DE+EN) in `index.html`, `src/content/i18n.ts`, `src/lib/LangContext.tsx`, `src/components/{Nav,NovaMark,Footer,Wordmark}.tsx`, `src/lib/{submitBooking,questionnaire}.ts` von „NovaStacks" auf „NovaStack" zurückgesetzt. E-Mail überall von `hallo@novastacks.de` auf **`hallo@novastackstudio.de`** geändert (Telefonnummer bleibt Platzhalter, s. §4). Kontrolliert per Rest-Suche: keine „Stacks"-Vorkommen mehr in `src/`, `index.html`, `package.json`.
**Nicht vergessen, falls wieder rückgängig gemacht werden soll:** Der entfernte „s"-Glyph-Code liegt in der Git-Historie (Phase-10-Commit bzw. vor diesem Edit) — Pfad ist eine reine Kopie des „S" aus „Stack", `x: 1090, k: 0.155`.

### Phase 16 — Hosting-Setup: Git-Repo, Cloudflare Workers, DNS-Umzug, GA4 live (10.07.2026)
**Gewollt:** Seite unter der neuen Domain live schalten, sobald Nick sie bei INWX registriert hat. Empfehlung eingeholt (Cloudflare Pages/Workers vs. EU-Hoster) → Nick hat sich für **Cloudflare** entschieden (kostenlos, schnell, Git-Auto-Deploy). Zusätzlich: Google Analytics 4 einrichten.

**Geliefert:**
1. **Lokales Git-Repo initialisiert** (vorher keins vorhanden) — `.gitignore` ergänzt (`node_modules`, `dist`, `*.tsbuildinfo`, `vite.config.js`/`.d.ts`-Build-Artefakte, `.env`).
2. **GitHub-Repo** `https://github.com/grandnick99/NovaStack.git` von Nick angelegt, ich habe gepusht (Nick musste sich einmalig per Personal-Access-Token authentifizieren — kein SSH-Key/`gh`-CLI auf dem Rechner vorhanden).
3. **Cloudflare-Projekt `novastack`** als **Workers**-Projekt (nicht klassisches „Pages") über Git-Integration angelegt, Build command `npm run build`.
4. **Deploy-Bug gefixt:** Cloudflares Auto-Deploy nutzte `npx wrangler deploy` mit automatischer Vite-Plugin-Erkennung, die **Vite 6+ voraussetzt** (Projekt hat 5.4.21) → Fehler „cannot be automatically configured". **Fix:** [`wrangler.toml`](wrangler.toml) mit explizitem `[assets] directory = "dist"` ergänzt — das umgeht die Vite-Auto-Konfiguration komplett, deployt `dist/` als reine Static Assets. Kein Vite-Upgrade nötig.
5. **DNS-Umzug INWX → Cloudflare:** `.de`-Domains lassen sich nicht zu Cloudflare *transferieren* (Registrar bleibt zwingend bei einem akkreditierten deutschen Registrar) — das ist **kein Cloudflare-Bug**, sondern DENIC-Policy. Lösung: Domain nur als **DNS-Zone** bei Cloudflare hinzufügen (Registrierung bleibt bei INWX). Alte Parking-`A`-Records gelöscht, DNSSEC bei INWX vorsichtshalber deaktiviert (sonst drohte Downtime durch Signatur-Mismatch), Nameserver bei INWX auf `kim.ns.cloudflare.com` / `rommy.ns.cloudflare.com` umgestellt. Custom Domains `novastackstudio.de` + `www.novastackstudio.de` im Workers-Projekt verbunden — beide live mit SSL.
6. **Google Analytics 4** eingerichtet (Measurement-ID `G-F5R5Q3REQN`). **Wichtig:** NICHT als rohes `<script>`-Tag in `index.html` eingebaut — stattdessen die bereits in Phase 11 gebaute Consent-Gate-Logik (`src/lib/analytics.ts`) genutzt, die GA erst nach Zustimmung im Cookie-Banner lädt. Lokal per Konsolen-Check verifiziert: vor Consent kein Script im DOM, nach „Alle akzeptieren" lädt `gtag.js` sofort mit korrekter ID. ID liegt lokal in `.env` (gitignored) und zusätzlich als Cloudflare-Build-Umgebungsvariable `VITE_GA_MEASUREMENT_ID` im Projekt `novastack` (Settings → Build → Variables and secrets) — **muss dort gesetzt sein**, da Vite Umgebungsvariablen zur Build-Zeit einbäckt, ein reines `.env` lokal reicht für den Live-Build nicht. Live verifiziert: ID steckt im ausgelieferten JS-Bundle auf novastackstudio.de.
7. **Cloudflare-MCP-Server** auf Nicks Rechner eingerichtet (`claude mcp add --transport http cloudflare https://mcp.cloudflare.com/mcp --scope user`), für zukünftige Sessions mit direktem Cloudflare-API-Zugriff — OAuth-Autorisierung muss noch einmalig in einer interaktiven Session abgeschlossen werden.

**Verifikationsmethode (wichtig bei DNS-Themen):** Lokaler Rechner hatte nach dem Nameserver-Wechsel noch veraltete DNS-Cache-Einträge vom Router — `curl`/`dig` gegen den lokalen Resolver lieferten `ERR_CONNECTION_REFUSED` bzw. leere Antworten, obwohl die Seite längst live war. **Fix:** immer gegen einen öffentlichen Resolver prüfen (`dig @1.1.1.1 novastackstudio.de` bzw. `curl --resolve domain:443:<ip>`), nicht dem lokalen System-Resolver vertrauen, wenn kurz zuvor Nameserver umgestellt wurden.

### Phase 17 — Impressum/Datenschutz + Buchungsformular an Brevo angebunden (11.07.2026)
**Gewollt:** Die in einer parallelen VS-Code-Claude-Code-Session begonnenen Änderungen (Impressum/Datenschutz-Seiten, Formular-Backend) fertigstellen und live schalten. Nicks Vorgabe für den Formular-Endpoint: **Cloudflare Pages Function** + **Brevo** (EU-Mailversand) für die Benachrichtigungs-Mail an ihn.

**Vorgefunden (aus der VS-Code-Session, von mir übernommen/geprüft, nicht neu geschrieben):**
- `src/lib/router.tsx` — minimaler Pfad-Router (kein react-router) für `/impressum`, `/datenschutz`, inkl. Client-seitiger Navigation.
- `src/components/LegalPage.tsx` — vollständige Impressum- und Datenschutz-Texte (echte Adresse/Telefonnummer von Nick: Echternacher Str. 12, 50933 Köln, 0174 9403905), nennt Cloudflare (Hosting) und Brevo (Formular-Mailversand) korrekt als Auftragsverarbeiter, inkl. GA4-Abschnitt.
- `functions/api/booking.ts` — Formular-Handler im Cloudflare-Pages-Functions-Signaturformat, verschickt Buchungs-/Fragebogen-Mails über die Brevo-REST-API (`api.brevo.com/v3/smtp/email`), liest `BREVO_API_KEY`/`BOOKING_TO`/`SENDER_EMAIL`/`QUESTIONNAIRE_URL` aus `env`.
- `src/lib/submitBooking.ts` + `questionnaire.ts` auf `/api/booking` als Default-Endpoint umgestellt (statt Mock-Erfolg).
- Footer/CookieBanner: Impressum-/Datenschutz-Links zeigen jetzt auf echte Routen statt `#`.

**Von mir ergänzt (kritische Lücke):** `functions/api/booking.ts` folgt der **Pages**-Functions-Konvention (datei-basiertes Auto-Routing) — aber dieses Projekt läuft als **Workers**-Projekt (s. Phase 16), das scannt `functions/` nicht automatisch. Ohne Fix wäre `/api/booking` ein reiner 404 gewesen. **Fix:**
- Neuer Worker-Entry-Point [`worker/index.ts`](worker/index.ts): prüft `url.pathname === "/api/booking"`, ruft dann `onRequestPost` aus `functions/api/booking.ts` direkt auf; alles andere geht an `env.ASSETS.fetch(request)` (Static Assets).
- `wrangler.toml` erweitert: `main = "worker/index.ts"`, `[assets] binding = "ASSETS"`, `not_found_handling = "single-page-application"` (damit `/impressum` etc. bei Hard-Refresh nicht 404 wirft, sondern `index.html` bekommt und der Client-Router übernimmt). Ersetzt das vorgefundene `public/_redirects` (Pages-Konvention, hier wirkungslos) — Datei entfernt.
- Lokal per `npx wrangler deploy --dry-run` verifiziert (Worker bündelt sauber, `ASSETS`-Binding erkannt), dann committet und gepusht.

**Live-Verifikation nach Deploy:**
- `GET/POST https://novastackstudio.de/impressum` → HTTP 200 (SPA-Fallback funktioniert)
- `POST https://novastackstudio.de/api/booking` → HTTP 500 `{"ok":false,"error":"Server not configured"}` — **erwartet**, bestätigt nur, dass das Routing korrekt beim Worker ankommt (kein 404); der eigentliche Versand fehlt noch den Brevo-API-Key.

**Brevo-Setup (mit Nick durchgeführt):** Account erstellt, Domain `novastackstudio.de` unter Senders/Domains verifiziert (Status „Authenticated"), API-Key generiert. Nick hat in Cloudflare (Workers & Pages → novastack → Settings → **Variables and secrets**, Runtime — nicht Build!) `BREVO_API_KEY`, `BOOKING_TO`, `SENDER_EMAIL` eingetragen.

**Offen (s. auch §4):** Trotz eingetragener Variable liefert `/api/booking` weiterhin „Server not configured" — Ursache noch nicht gefunden (vermutlich Encrypt-Häkchen oder fehlender finaler Save auf Cloudflare-Seite, nicht selbst prüfbar ohne Dashboard-Zugriff). **Nächster Schritt bei Wiederaufnahme:** Screenshot von Nicks aktueller „Variables and secrets"-Ansicht anfordern. `QUESTIONNAIRE_URL` bewusst noch nicht gesetzt (kein Fragebogen-Link vorhanden) — **Nick explizit gebeten, ihn daran zu erinnern**, sobald er einen hat.

**Nachtrag noch am selben Tag:** Der Brevo-Key-Bug wurde gefunden und gefixt (falscher Variablen-Bereich, s. §4) — Formular funktioniert seither und ist von Nick per Testmail bestätigt.

### Phase 18 — og:image, Sitemap, serverseitiger Consent-Nachweis (11.07.2026)
**Gewollt:** Nick wollte die drei zuvor als „vor/zum Launch" markierten Punkte umgesetzt haben: ein OG-Vorschaubild fürs Social-Sharing (Vorgabe: altes Logo im Hintergrund, „NovaStack"-Schriftzug im Vordergrund, „Digital Solutions" als Tagline darunter), eine Sitemap, und den serverseitigen Consent-Nachweis aus Phase 14 — Letzteres mit der Ansage „wenn du mich brauchst sag Bescheid", also so weit wie möglich eigenständig umsetzen.

**Geliefert:**
- **og-image.png** (1200×630, `public/og-image.png`): per Chrome-Headless-Screenshot einer eigens gebauten HTML-Vorlage erzeugt, die exakt die Hero-Farbverläufe (`radial-gradient`/`linear-gradient` aus `src/index.css`), den NovaMark-Stern samt gestapelten Ebenen (aus `NovaMark.tsx` übernommen, statisch statt animiert) und das Wordmark-SVG (aus `Wordmark.tsx` übernommen) reproduziert — kein separates Design-Tool nötig, 100 % konsistent mit der Live-Seite. `index.html` um `og:image(:width/:height/:type)`, `twitter:image`, `og:url` und `<link rel="canonical">` ergänzt. Dabei nebenbei eine Inkonsistenz gefixt: JSON-LD und der `<noscript>`-Fallback in `index.html` nannten noch die alte `hallo@`-Adresse statt `info@novastackstudio.de` — vereinheitlicht.
- **sitemap.xml** (`public/sitemap.xml`): listet die drei echten Routen (`/`, `/impressum`, `/datenschutz`), referenziert aus `robots.txt`.
- **Serverseitiger Consent-Nachweis** (DSGVO Art. 7 Abs. 1): `src/lib/consentLog.ts` feuert bei jeder expliziten Consent-Entscheidung (Hook in `ConsentContext.persist()`) einen `navigator.sendBeacon` an eine neue Route `POST /api/consent-log` (`functions/api/consent-log.ts`, gleiches Dispatch-Muster wie `booking.ts` über `worker/index.ts`). Schreibt Append-only in eine neue Cloudflare-KV-Namespace (`novastack-consent-log`) — nur Consent-Wahl + Zeitstempel, bewusst **keine IP, kein User-Agent, keine Kennung**, 3 Jahre Aufbewahrung (TTL).
- **KV-Namespace selbst angelegt:** Nick hat einmalig `wrangler login` im Terminal ausgeführt (gleiches Muster wie beim Cloudflare-MCP-Setup), danach konnte ich `wrangler kv namespace create novastack-consent-log` direkt selbst ausführen und die ID in `wrangler.toml` eintragen (`[[kv_namespaces]] binding = "CONSENT_LOG"`) — kein Dashboard-Geklicke nötig.
- Live verifiziert nach Deploy: `sitemap.xml` (200), `og-image.png` (200, 307 KB, `image/png`), alle og:-Meta-Tags im ausgelieferten HTML, `POST /api/consent-log` → `{"ok":true,"logged":true}`, Eintrag per `wrangler kv key list` in der Datenbank bestätigt.

### Phase 19 — Fragebogen migriert: eigene Seite `/fragebogen` statt externes Tool (11.07.2026, via Cowork)
**Gewollt:** Nick hatte den ursprünglichen Vorab-Fragebogen als eigenständiges, separat gehostetes HTML+Formspree-Projekt gebaut (`~/Claude/Projects/web questionare/index.html`, 7 Schritte). Er ist jetzt live, nutzt Brevo statt Formspree und wollte den alten Fragebogen ins novastack-Projekt migriert und ins Design-/Versandsystem integriert haben, bereit zum Deploy über Claude Code zusammen mit anderen anstehenden Änderungen.

**Geliefert (noch NICHT deployed — bewusst, s. u.):**
- `src/content/fragebogen.ts` — alle Fragen/Optionen 1:1 aus dem Original übernommen (Branchenliste, Ziele, Zielgruppe, Design/Stil, Inhalt/Seiten, Technik, Zeitplan), **plus eine neue Frage**: „Sollen die Farben kontrastieren oder harmonieren?" (Logo soll hervorstechen vs. alles im Einklang) im Design-Schritt — auf Nicks Wunsch ergänzt.
- `src/components/Fragebogen.tsx` — 7-Schritte-Formular als vollwertige Route `/fragebogen`, im bestehenden novastack-Designsystem gebaut (`.glass-lit`, Chips, Field-Pattern, `EASE`-Motion, Fortschrittsbalken) statt eigenem CSS — optisch konsistent mit Buchungsformular und Rest der Seite. Bewusst **nur Deutsch** (wie das Original), nicht ins zweisprachige `i18n.ts`-Wörterbuch aufgenommen (~45 Felder hätten das Wörterbuch stark aufgebläht) — falls später Englisch gewünscht ist, ist `src/content/fragebogen.ts` der Ort für eine `en`-Variante.
- `functions/api/fragebogen.ts` + Route in `worker/index.ts` (`POST /api/fragebogen`) — Versand über Brevo, exakt gleiches Muster wie `booking.ts`. Nutzt dieselben Umgebungsvariablen (`BREVO_API_KEY`, `SENDER_EMAIL`, `BOOKING_TO`), zusätzlich optional `FRAGEBOGEN_TO` falls die Antworten mal an eine andere Adresse als die Terminanfragen sollen — ohne das Setzen läuft alles an `info@novastackstudio.de` (Nicks Vorgabe: „so ziemlich alles soll über die email laufen").
- E-Mail enthält sowohl eine lesbare Tabelle aller Antworten als auch — migriert aus dem alten Fragebogen — einen fertig formatierten **Prompt-Block** zum direkten Einfügen in einen Bau-Prompt für das jeweilige Kundenprojekt (war im Original die „KUNDENFEEDBACK-BLOCK"-Funktion).
- `src/lib/questionnaire.ts`: TODO aufgelöst, `QUESTIONNAIRE.url` zeigt jetzt auf `https://novastackstudio.de/fragebogen`.
- `src/components/LegalPage.tsx`, Abschnitt 7: um einen Absatz zur direkten Fragebogen-Ausfüllung ergänzt (welche Daten beim Ausfüllen selbst — nicht nur beim Link-Versand — verarbeitet werden), Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO.
- `npm run build` lokal grün (`tsc -b && vite build`), keine TypeScript-Fehler.

**Bewusst NICHT gemacht:** kein `git commit`/`push`, kein `wrangler deploy` — Nick wollte das gesammelt über eine Claude-Code-Session zusammen mit anderen offenen Änderungen live schalten, nicht direkt aus Cowork heraus.

**Vor dem Deploy noch nötig (manueller Cloudflare-Schritt, s. §4):** `QUESTIONNAIRE_URL` als Runtime-Variable auf `https://novastackstudio.de/fragebogen` setzen — das ist die eigentliche Quelle für den Link, den `booking.ts` in die Opt-in-E-Mail schreibt (nicht `QUESTIONNAIRE.url` im Frontend-Code, das ist nur Dokumentation/Payload-Feld).

---

## 3. Architektur-Entscheidungen & Warum (Kurzreferenz)

| Entscheidung | Grund |
|---|---|
| Blur als `.card-frost` direkt auf `<article>`, nicht auf Kind | `overflow-hidden` des Parents blockiert `backdrop-filter` von Kindern (Stacking-Context) |
| Seiten-Gradient in fixierter `<Backdrop>`-Ebene statt `background-attachment: fixed` | fixed-Attachment repaintet den ganzen Viewport pro Scroll-Frame — war DIE Scroll-Bremse |
| Kein `mix-blend-mode` auf dem Grain | erzwingt Full-Viewport-Recomposite pro Frame; bei 5 % Opazität optisch egal |
| Mobile: Karten-Blur aus + Füllung 0.96–0.98 | schwache Mobile-GPUs; Deckkraft ersetzt den Blur — beides zusammen justieren! |
| Lenis lerp 0.28, `syncTouch: false` | strafferes Rad-Tracking; natives Touch-Scrolling schlägt jede nachgebaute Physik |
| Eigenes Consent-Banner statt CMP | kein externes Script, keine Kosten, Marken-Look, passt zu „keine Abhängigkeit" |
| Bleed-Muster (negative Margins = Padding) | ein Text-Grid für alles; Box-Kanten ragen bewusst darüber hinaus |
| 3 Leistungen, nicht 4 | Nicks Entscheidung (keine Haarspalterei); deckungsgleich mit 3-Ebenen-Logo |
| GA4 aktiv, aber nur via Consent-Gate geladen | Kein rohes `<script>`-Tag in `index.html`, sonst wäre die Cookie-Banner-Zusage gebrochen |
| Cloudflare **Workers** (Static Assets) statt „Pages" | Vom Dashboard so angelegt; `wrangler.toml` mit `[assets] directory = "dist"` umgeht Vite-6-Zwang der Auto-Konfiguration |
| Domain-Registrierung bleibt bei INWX, nur DNS bei Cloudflare | `.de`-Domains sind bei Cloudflare nicht als Registrar transferierbar (DENIC-Policy) — braucht man auch nicht, DNS-Zone reicht |

**Dateien-Landkarte:** Inhalte/Übersetzungen → `src/content/i18n.ts` · Design-Tokens/Glas → `src/index.css` + `tailwind.config.js` · Consent → `src/lib/ConsentContext.tsx`, `src/lib/analytics.ts`, `src/components/CookieBanner.tsx` · Formular-Versand → `src/lib/submitBooking.ts`, `src/lib/questionnaire.ts` · Fragebogen (`/fragebogen`) → `src/content/fragebogen.ts`, `src/components/Fragebogen.tsx`, `src/lib/submitFragebogen.ts`, `functions/api/fragebogen.ts` · Wortmark (inkl. „s"-Glyph) → `src/components/Wordmark.tsx` · Smooth Scroll → `src/lib/smoothScroll.ts` · Deploy-Config → `wrangler.toml`.

---

## 4. Offene Punkte (Stand 11.07.2026, nach Phase 19)

**Launch-Blocker:**
1. **Fragebogen fertig gebaut (Phase 19), Deploy + `QUESTIONNAIRE_URL` sind der letzte Schritt.** Sobald deployed:
   - `QUESTIONNAIRE_URL` als Cloudflare-Variable auf `https://novastackstudio.de/fragebogen` setzen (Workers & Pages → novastack → Settings → **oberer** „Variables and secrets"-Bereich, Type „Text", nicht der „Build"-Bereich!) — ohne das versendet `functions/api/booking.ts` bei Fragebogen-Anfragen weiterhin eine E-Mail ohne Link.
   - Optional: `FRAGEBOGEN_TO` setzen, falls Fragebogen-Antworten an eine andere Adresse als Terminanfragen sollen (Default: `BOOKING_TO`, aktuell `info@novastackstudio.de`).
   - Live-Test: `/fragebogen` einmal komplett durchklicken und absenden, prüfen ob die Mail (inkl. Prompt-Block) ankommt.

**Erledigt seit letztem Stand (Phase 17/18):**
- ~~Impressum & Datenschutzerklärung~~ → live unter `/impressum` und `/datenschutz`, inkl. Abschnitt zum Fragebogen (Phase 19). Details Phase 17.
- ~~Telefonnummer-Platzhalter~~ → durch echte Nummer ersetzt (`0174 9403905`).
- ~~Formular-Versand (Buchung)~~ → funktioniert und live verifiziert, Testmail von Nick bestätigt angekommen. Details Phase 17.
- ~~E-Mail-Postfach `info@novastackstudio.de`~~ → bestätigt funktionsfähig.
- ~~og:image, og:url/canonical, Sitemap~~ → alle drei live und verifiziert, Details Phase 18.
- ~~Serverseitiger Consent-Nachweis~~ → gebaut und live verifiziert (KV-Log, kein Dashboard-Zugriff nötig gewesen dank `wrangler login`). Details Phase 18.

**Vor/zum Launch (nicht blockierend):**
2. **EN-Texte** sind meine Übersetzung der deutschen Agentur-Texte — falls die Agentur EN liefert, austauschen. Die Legal-Pages und der Fragebogen sind bewusst nur auf Deutsch (EN-Besucher sehen bei den Legal-Pages einen Hinweis „aus rechtlichen Gründen auf Deutsch").
3. **DNSSEC bei INWX** wurde vor dem Nameserver-Wechsel deaktiviert — optional künftig über Cloudflare selbst wieder aktivierbar, kein Blocker.

**Wenn Inhalte da sind:**
4. Zertifikate + Kundenstimmen in `Proof.tsx` (bewusste „folgt"-Platzhalter).

---

## 5. Bekannte Probleme & Playbooks

**Dev-Server „wedged"** (mehrfach passiert): Vite meldet `ready` und bindet den Port, beantwortet aber keine Requests (`ERR_CONNECTION_TIMED_OUT`/`ECONNRESET`). Einmal klar durch System-Überlastung (Swap 14 GB voll, Load ~10, Time-Machine-Backup parallel), trat aber auch auf frisch neugestartetem Rechner auf.
→ **Fix:** `lsof -ti tcp:5173 | xargs kill -9`, Port frei prüfen, Preview neu starten; ggf. 2–3-mal. Bei Verdacht auf Systemlast: `uptime` + `sysctl vm.swapusage` prüfen; im Zweifel Mac neu starten.

**Preview-Screenshots einfrieren:** Der Headless-Preview-Tab ist meist `hidden` → `requestAnimationFrame` friert ein → framer-motion-Animationen (auch AnimatePresence-Übergänge) bleiben mitten im Zustand stecken; Screenshots zeigen eingefrorene/veraltete Frames, teils Geister-Überlagerungen, die im echten Browser nicht existieren.
→ **Verifikation stattdessen per DOM/Computed-Styles**; Screenshots nur als Ergänzung werten. Im echten Browser ist alles korrekt.

**Karten wirken auf Mobile durchsichtig:** Tritt auf, wenn Mobile-Blur deaktiviert ist, aber die `--card-top/--card-bot`-Alphas der Mobile-Media-Query zu niedrig sind. Beide gehören zusammen (aktuell: Blur aus + 0.96–0.98).

**Cloudflare-Deploy schlägt mit „Vite version … cannot be automatically configured" fehl:** Passiert, wenn das Cloudflare-Projekt als **Workers**-Projekt (nicht Pages) angelegt wurde und der Auto-Deploy-Befehl `wrangler deploy` versucht, Vite automatisch als Workers-Plugin zu konfigurieren — das braucht Vite 6+.
→ **Fix:** `wrangler.toml` im Projekt-Root mit `[assets] directory = "dist"` anlegen (siehe Repo-Root). Das deklariert das Projekt explizit als reine Static-Assets-Bereitstellung und umgeht die Vite-Auto-Erkennung komplett — kein Vite-Upgrade nötig.

**Neue Umgebungsvariable wird im Live-Build nicht wirksam:** Bei Vite werden `VITE_*`-Variablen zur **Build-Zeit** eingebacken, nicht zur Laufzeit gelesen. Ein Eintrag in Cloudflares „Variables and secrets" reicht allein nicht — es braucht danach zwingend einen **neuen Build** (Push auf `main`, oder falls kein Retry-Button sichtbar ist: `git commit --allow-empty -m "trigger rebuild" && git push`).

**DNS/Domain lokal scheinbar nicht erreichbar nach Nameserver-Wechsel:** Der lokale Router-/ISP-DNS-Cache braucht oft länger als die eigentliche globale Propagation. `curl`/`dig` gegen den System-Resolver liefern dann `Could not resolve host` oder Timeouts, obwohl die Seite weltweit schon live ist.
→ **Verifikation:** gegen einen öffentlichen Resolver prüfen, z. B. `dig @1.1.1.1 novastackstudio.de` oder `curl --resolve novastackstudio.de:443:<ip-aus-dig> https://novastackstudio.de`.

---

## 6. Frühere strategische Empfehlungen (nachlesbar, falls wieder relevant)

- **Analytics:** cookieloses EU-Tool (Plausible/Fathom) reicht für „Besucher + Abbrüche verstehen" und braucht kein Banner; GA4/Pixel nur nötig für Ads/Remarketing — dann greift das gebaute Consent-Gate.
- **Referenzen-Strategie:** solange keine Kundenstimmen existieren, tragen die 4 Garantien die Vertrauensarbeit; Platzhalter bewusst ehrlich gehalten.
- **Cloud für Cookie-Daten:** vor Launch unnötig; wenn, dann Edge-Function + Append-only-Log + Rollups, EU-Region, keine IPs (Details Phase 14).
