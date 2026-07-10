# NovaStack — Projekt-Protokoll (Black Box)

> Vollständiges Gedächtnis des Projekts: was gewollt war, was gebaut wurde, welche Entscheidungen warum fielen, was offen ist und wie bekannte Probleme behoben werden. Gedacht als Nachschlagewerk, falls später Fragen oder Probleme auftauchen.
> Stand: 10.07.2026 · Gepflegt von Claude · Bei größeren Meilensteinen fortschreiben.

---

## 1. Das Projekt in einem Absatz

Marketing- und Buchungswebsite für **NovaStack** (novastackstudio.de), das Kölner Digitalstudio von **Nicolas Grandezka**. Primäres Ziel der Seite: Besucher zur Buchung eines unverbindlichen Erstgesprächs bewegen. Drei Leistungen: Webdesign & Wartung · KI-Beratung & Integration (inkl. Prozessoptimierung) · Datenbasiertes Marketing. Deutsch ist die Hauptsprache, Englisch per Toggle. Dunkles Design ist der Marken-Look, helles per Toggle.

**Technik:** React 18 + Vite 5 + TypeScript + Tailwind CSS v3, framer-motion (Animationen), Lenis (Smooth Scroll). Statische Seite ohne Backend — Formulare senden an konfigurierbare Webhooks (noch nicht gesetzt). Ort: `~/Desktop/Cowork Workspace/novastack-site`, Brand-Assets in `~/Desktop/NovaStack`. Dev-Server: Launch-Config `novastack`, Port 5173. Produktions-Build läuft sauber durch (~365 KB JS, 115 KB gzip).

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
| GA nur als gated Stub | Tool-Entscheidung offen; Consent-Gate funktioniert unabhängig davon |

**Dateien-Landkarte:** Inhalte/Übersetzungen → `src/content/i18n.ts` · Design-Tokens/Glas → `src/index.css` + `tailwind.config.js` · Consent → `src/lib/ConsentContext.tsx`, `src/lib/analytics.ts`, `src/components/CookieBanner.tsx` · Formular-Versand → `src/lib/submitBooking.ts`, `src/lib/questionnaire.ts` · Wortmark (inkl. „s"-Glyph) → `src/components/Wordmark.tsx` · Smooth Scroll → `src/lib/smoothScroll.ts`.

---

## 4. Offene Punkte (Stand 10.07.2026)

**Launch-Blocker:**
1. **Impressum & Datenschutzerklärung** — Links zeigen auf `#`. In DE gesetzlich Pflicht (§ 5 DDG/DSGVO). Auch der Datenschutz-Link im Cookie-Banner zeigt auf `#`.
2. **Formular-Versand** — `VITE_BOOKING_ENDPOINT` nicht gesetzt (keine `.env`): Anfragen laufen als Mock ins Leere. Ebenso `VITE_QUESTIONNAIRE_ENDPOINT` + Fragebogen-URL/replyTo in `src/lib/questionnaire.ts`.
3. **Telefonnummer** — `+49 221 0000000` ist Platzhalter (`src/components/Footer.tsx`).
3b. **E-Mail `hallo@novastackstudio.de`** — steht überall im Code, ist aber laut Nick noch nicht real eingerichtet (Stand Phase 15). Vor Launch prüfen, dass das Postfach existiert und Mails ankommen.

**Vor/zum Launch:**
4. **Beim finalen Pre-Launch-Check aktiv nachfragen** (Nicks expliziter Auftrag): Consent-Nachweis-Logging und/oder Analytics jetzt einbauen? (Architektur in Phase 14.)
5. **Analytics-Tool wählen** (cookielos vs. GA4) + ggf. `VITE_GA_MEASUREMENT_ID` setzen.
6. **og:image, og:url/canonical, sitemap** — sobald Domain live ist. og:image-Grafik muss noch erstellt werden.
7. **EN-Texte** sind meine Übersetzung der deutschen Agentur-Texte — falls die Agentur EN liefert, austauschen.

**Wenn Inhalte da sind:**
8. Zertifikate + Kundenstimmen in `Proof.tsx` (bewusste „folgt"-Platzhalter).

---

## 5. Bekannte Probleme & Playbooks

**Dev-Server „wedged"** (mehrfach passiert): Vite meldet `ready` und bindet den Port, beantwortet aber keine Requests (`ERR_CONNECTION_TIMED_OUT`/`ECONNRESET`). Einmal klar durch System-Überlastung (Swap 14 GB voll, Load ~10, Time-Machine-Backup parallel), trat aber auch auf frisch neugestartetem Rechner auf.
→ **Fix:** `lsof -ti tcp:5173 | xargs kill -9`, Port frei prüfen, Preview neu starten; ggf. 2–3-mal. Bei Verdacht auf Systemlast: `uptime` + `sysctl vm.swapusage` prüfen; im Zweifel Mac neu starten.

**Preview-Screenshots einfrieren:** Der Headless-Preview-Tab ist meist `hidden` → `requestAnimationFrame` friert ein → framer-motion-Animationen (auch AnimatePresence-Übergänge) bleiben mitten im Zustand stecken; Screenshots zeigen eingefrorene/veraltete Frames, teils Geister-Überlagerungen, die im echten Browser nicht existieren.
→ **Verifikation stattdessen per DOM/Computed-Styles**; Screenshots nur als Ergänzung werten. Im echten Browser ist alles korrekt.

**Karten wirken auf Mobile durchsichtig:** Tritt auf, wenn Mobile-Blur deaktiviert ist, aber die `--card-top/--card-bot`-Alphas der Mobile-Media-Query zu niedrig sind. Beide gehören zusammen (aktuell: Blur aus + 0.96–0.98).

---

## 6. Frühere strategische Empfehlungen (nachlesbar, falls wieder relevant)

- **Analytics:** cookieloses EU-Tool (Plausible/Fathom) reicht für „Besucher + Abbrüche verstehen" und braucht kein Banner; GA4/Pixel nur nötig für Ads/Remarketing — dann greift das gebaute Consent-Gate.
- **Referenzen-Strategie:** solange keine Kundenstimmen existieren, tragen die 4 Garantien die Vertrauensarbeit; Platzhalter bewusst ehrlich gehalten.
- **Cloud für Cookie-Daten:** vor Launch unnötig; wenn, dann Edge-Function + Append-only-Log + Rollups, EU-Region, keine IPs (Details Phase 14).
