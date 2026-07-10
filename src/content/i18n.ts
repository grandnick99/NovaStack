export type Lang = "de" | "en";

export interface ServiceContent {
  index: string;
  key: string;
  title: string;
  tagline: string;
  body: string;
  points: string[];
  /** Short proof / outcome line shown under the points */
  outcome: string;
}

export interface Dict {
  nav: {
    services: string;
    about: string;
    proof: string;
    cta: string;
    menu: string;
  };
  hero: {
    eyebrow: string;
    tagline: string;
    titleLines: string[];
    accentWord: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    metrics: { value: string; label: string }[];
  };
  philosophy: {
    label: string;
    title: string;
    sub: string;
    blocks: { title: string; body: string }[];
  };
  servicesIntro: {
    label: string;
    title: string;
    sub: string;
    resultLabel: string;
    exampleLabel: string;
  };
  services: ServiceContent[];
  approach: {
    label: string;
    title: string;
    sub: string;
    steps: { no: string; title: string; body: string }[];
    method: { title: string; body: string }[];
  };
  about: {
    label: string;
    title: string;
    lead: string;
    body: string;
    founder: { name: string; role: string };
    facts: { label: string; value: string }[];
    motif: string;
    motifLabel: string;
    motifStar: string;
    motifStarLabel: string;
    creed: string;
  };
  proof: {
    label: string;
    title: string;
    sub: string;
    guarantees: { title: string; body: string }[];
    certificates: { heading: string; note: string };
    testimonials: { heading: string; note: string };
    badge: string;
  };
  booking: {
    label: string;
    title: string;
    sub: string;
    steps: string[];
    stepTitles: string[];
    fields: {
      service: string;
      multiHint: string;
      name: string;
      company: string;
      email: string;
      phone: string;
      phoneOptional: string;
      budget: string;
      date: string;
      slot: string;
      message: string;
      messagePlaceholder: string;
    };
    serviceOptions: { key: string; label: string; desc: string }[];
    budgetOptions: string[];
    slotOptions: string[];
    next: string;
    back: string;
    submit: string;
    submitting: string;
    reassurance: string;
    review: string;
    successTitle: string;
    successBody: string;
    successAgain: string;
    required: string;
    invalidEmail: string;
    pickOne: string;
    submitError: string;
    questionnaireTitle: string;
    questionnaireText: string;
    questionnaireOptIn: string;
    questionnaireSent: string;
  };
  footer: {
    tagline: string;
    ctaTitle: string;
    ctaSub: string;
    sections: { heading: string; links: { label: string; href: string }[] }[];
    contactHeading: string;
    location: string;
    rights: string;
    legal: { label: string; href: string }[];
    builtFor: string;
  };
  langName: { de: string; en: string };
  cookies: {
    bannerTitle: string;
    bannerBody: string;
    acceptAll: string;
    rejectNonEssential: string;
    customize: string;
    save: string;
    back: string;
    panelTitle: string;
    panelBody: string;
    categories: { key: "necessary" | "analytics" | "marketing"; title: string; body: string }[];
    alwaysOn: string;
    privacyLinkLabel: string;
    footerLink: string;
  };
}

const de: Dict = {
  nav: {
    services: "Leistungen",
    about: "Studio",
    proof: "Referenzen",
    cta: "Beratung buchen",
    menu: "Menü",
  },
  hero: {
    eyebrow: "Digitalstudio",
    tagline: "Digital Solutions",
    titleLines: ["Wir bauen das", "digitale Fundament"],
    accentWord: "Ihres Wachstums.",
    sub: "NovaStack verbindet Webdesign, KI-Integration und Marketing zu einem präzise abgestimmten System. Für mehr Klarheit, Tempo und Effizienz in Ihrem Geschäft.",
    ctaPrimary: "Beratung buchen",
    ctaSecondary: "Unsere Leistungen",
    scroll: "Scrollen",
    metrics: [
      { value: "1:1", label: "Direkt mit dem Gründer, keine Agenturkette" },
      { value: "100%", label: "Eigentum bleibt bei Ihnen" },
      { value: "< 24 h", label: "Antwort auf jede Anfrage" },
    ],
  },
  philosophy: {
    label: "Philosophie",
    title: "Worauf es heute ankommt.",
    sub: "Großes Wachstum beginnt mit einem einfachen Gespräch. Lassen Sie uns gemeinsam herausfinden, welches ungenutzte Potenzial in Ihrem Unternehmen schlummert. Ob Sie eine neue Webseite benötigen, Ihre Marketingstrategie auf solide Daten stützen wollen oder bereit für den Schritt in die Automatisierung sind: Wir beraten Sie transparent und absolut zielgerichtet. Vereinbaren Sie jetzt ein unverbindliches Erstgespräch mit unseren Experten und stellen Sie die Weichen für Ihre digitale Zukunft.",
    blocks: [
      {
        title: "Digitale Präsenz: Mehr als nur eine Webseite",
        body: "Der erste Eindruck im Internet entscheidet in wenigen Sekunden über den Aufbau von Vertrauen. Eine moderne und technisch einwandfreie Webseite ist das Fundament jedes erfolgreichen Unternehmens. Doch eine ansprechende Optik reicht heute nicht mehr aus: Hinter den Kulissen müssen aktuelle Technologien reibungslos zusammenarbeiten. Wir sorgen dafür, dass Ihr digitaler Auftritt nicht nur visuell überzeugt, sondern durch kontinuierliche Pflege und Updates dauerhaft sicher und leistungsstark bleibt. Wer hier in modernste Webtechnologien investiert, sichert sich einen klaren Wettbewerbsvorteil und bindet Besucher langfristig.",
      },
      {
        title: "Wegweiser durch den KI-Dschungel",
        body: "Künstliche Intelligenz bestimmt die Zukunft der Wirtschaft – das ist längst kein Geheimnis mehr. Viele Unternehmen stehen jedoch vor einer großen Hürde: Der Markt ist überflutet mit unzähligen Produkten und neuen Diensten. Die Auswahl überfordert schnell, und die Angst, den Anschluss zu verlieren, wächst. Genau hier setzen wir an. Wir durchleuchten Ihr Geschäftsmodell und Ihre internen Abläufe detailliert und identifizieren die Prozesse, bei denen eine gezielte Implementierung Ihre Gewinne messbar steigert. Wir wählen das exakt passende System für Sie aus und übernehmen die komplette technische Umsetzung. Sie konzentrieren sich auf Ihr Tagesgeschäft, während wir Ihre Arbeitsabläufe zukunftssicher gestalten.",
      },
    ],
  },
  servicesIntro: {
    label: "Unsere Leistungen",
    title: "Drei Disziplinen. Ein System.",
    sub: "Jede Leistung steht für sich und greift in die nächste. Gestapelt ergeben sie eine Infrastruktur, die für Sie arbeitet, statt nur gut auszusehen.",
    resultLabel: "Ergebnis",
    exampleLabel: "Beispiel",
  },
  services: [
    {
      index: "01",
      key: "web",
      title: "Webdesign & Wartung",
      tagline: "Von der Domain bis zum Online-Bezahlsystem.",
      body: "Wir gestalten und entwickeln Webseiten, die nicht nur überzeugen, sondern verkaufen – inklusive fortlaufender technischer Betreuung, Updates und Absicherung. Alles aus einer Hand.",
      points: [
        "Domain, Hosting & technisches Setup",
        "Design & Entwicklung nach Maß",
        "Online-Shop & Infrastruktur",
        "Wartung, Pflege & laufender Betrieb",
      ],
      outcome: "Eine Seite, die Sie besitzen, verstehen und Ihnen hilft zu wachsen.",
    },
    {
      index: "02",
      key: "ai",
      title: "KI-Beratung & Integration",
      tagline: "Künstliche Intelligenz, die in Ihrem Betrieb wirklich arbeitet.",
      body: "Wir analysieren Ihre Abläufe und optimieren Ihre Prozesse – durch digitale Lösungen oder KI. Manuelle Vorgänge werden digitalisiert, wiederkehrende Aufgaben automatisiert, und wir binden genau die Technologien ein, die Ihren Gewinn messbar steigern. Vom einzelnen Agenten bis zum durchgängigen System.",
      points: [
        "Analyse & Optimierung Ihrer Abläufe",
        "Digitalisierung analoger Vorgänge",
        "Systeme, Agenten & automatisierte Workflows",
        "Einführung, Schulung & Betreuung",
      ],
      outcome: "Weniger Handgriffe, mehr Tempo, ohne Ihr Team zu überfordern.",
    },
    {
      index: "03",
      key: "mkt",
      title: "Datenbasiertes Marketing",
      tagline: "Aus Marktdaten wird gezielte Neukundengewinnung.",
      body: "Wir erfassen und werten Ihre Marktdaten aus, sprechen Ihre Zielgruppen präziser an und erschließen neue Käuferschichten – sauber gemessen und laufend verbessert.",
      points: [
        "Marketing- & Kanalanalyse (Google, Facebook)",
        "Datenaufbereitung & sauberes Tracking",
        "Zielgerichtete, datengesteuerte Kampagnen",
        "Laufende Auswertung & Optimierung",
      ],
      outcome: "Jeder eingesetzte Euro fließt dorthin, wo er messbar Wirkung zeigt.",
    },
  ],
  approach: {
    label: "Vorgehen",
    title: "Wie aus einem Auftrag ein System wird.",
    sub: "Keine endlosen Meetings. Vier klare Schritte, an deren Ende ein funktionierendes System steht.",
    steps: [
      { no: "01", title: "Verstehen", body: "Wir hören zu, sehen uns Ihre Abläufe an und finden den Punkt mit dem größten Hebel." },
      { no: "02", title: "Entwerfen", body: "Konzept, Design und Architektur, transparent gemacht, bevor eine Zeile Code entsteht." },
      { no: "03", title: "Bauen", body: "Saubere Umsetzung in kurzen Zyklen. Sie sehen Fortschritt, keine Blackbox." },
      { no: "04", title: "Betreiben", body: "Wir bleiben. Pflege, Optimierung und Ausbau, wenn Ihr Geschäft wächst." },
    ],
    method: [
      {
        title: "Präzision durch Daten",
        body: "Entscheidungen aus dem Bauch heraus sind riskant. Bei der Skalierung Ihres Unternehmens verlassen wir uns auf Fakten. Wir entwickeln und richten intelligente Systeme ein, die wertvolle Marktdaten präzise erfassen. Aus großen Informationsmengen filtern wir genau die Erkenntnisse, die Ihr Unternehmen voranbringen. So sprechen wir Ihre bisherigen Zielgruppen genauer an und erschließen völlig neue Käuferschichten – wir verwandeln abstrakte Zahlen in konkretes Wachstum.",
      },
      {
        title: "Vom Datenpunkt zum Stammkunden",
        body: "Jeder Besucher Ihrer Webseite hinterlässt wertvolle Spuren. Wer diese Informationen ignoriert, verschenkt bares Geld. Die systematische Erfassung von Daten ist der entscheidende Schritt, um das Verhalten Ihrer potenziellen Käufer zu verstehen. Wir werten diese Nutzerdaten aus und leiten daraus klare Handlungsempfehlungen für Ihr Marketing ab. Durch personalisierte Ansprache und optimierte Nutzererlebnisse verwandeln wir anonyme Klicks in zahlende Kunden – das erhöht Ihre Abschlussraten und steigert Ihren Umsatz nachhaltig.",
      },
    ],
  },
  about: {
    label: "Das Studio",
    title: "Geballte Expertise für Ihr Projekt.",
    lead: "NovaStack ist ein Digitalstudio aus Köln, gegründet von Nicolas Grandezka.",
    body: "Hinter NovaStack steht gebündelte Erfahrung aus Webentwicklung, Cybersicherheit und strategischem Marketing. Sie arbeiten direkt mit dem Gründer – und im Hintergrund mit einem eingespielten Netzwerk aus Spezialisten, das wir gezielt für Ihr Projekt zusammenstellen. Unser Anspruch: komplexe technische Herausforderungen in verständliche und vor allem profitable Ergebnisse zu übersetzen. Ihr messbarer Erfolg ist unser Maßstab.",
    founder: { name: "Nicolas Grandezka", role: "Inhaber & Studioleitung" },
    facts: [
      { label: "Sitz", value: "Köln, Deutschland" },
      { label: "Gegründet von", value: "Nicolas Grandezka" },
      { label: "Leistungen", value: "Web · KI · Marketing" },
      { label: "Zusammenarbeit", value: "Remote & vor Ort" },
      { label: "Sprachen", value: "Deutsch · Englisch" },
    ],
    motif: "Drei Ebenen. Ein Fundament.",
    motifLabel: "Das Fundament",
    motifStar: "Ein Funke. Eine klare Richtung.",
    motifStarLabel: "Der Funke",
    creed: "Wir liefern keine Bausteine. Wir liefern ein Fundament.",
  },
  proof: {
    label: "Referenzen & Vertrauen",
    title: "Warum Sie uns vertrauen können.",
    sub: "Als junges Studio setzen wir auf klare Zusagen statt auf geliehene Logos. Diese vier Punkte gelten ab dem ersten Gespräch – Zertifizierungen und Kundenstimmen folgen, sobald die ersten Projekte live sind.",
    guarantees: [
      {
        title: "Direkt mit dem Gründer",
        body: "Sie sprechen vom ersten Tag an mit der Person, die Ihr Projekt umsetzt – keine Agenturkette, kein Account-Management dazwischen.",
      },
      {
        title: "Sie besitzen alles",
        body: "Code, Zugänge und Daten bleiben zu 100 % Ihr Eigentum. Keine Abhängigkeit, kein Lock-in.",
      },
      {
        title: "Antwort in unter 24 Stunden",
        body: "Jede Anfrage wird werktags innerhalb eines Tages persönlich beantwortet.",
      },
      {
        title: "Voller Einblick, keine Blackbox",
        body: "Sie sehen den Fortschritt in kurzen Zyklen – transparent von Konzept bis Betrieb.",
      },
    ],
    certificates: {
      heading: "Zertifizierungen",
      note: "In Vorbereitung",
    },
    testimonials: {
      heading: "Kundenstimmen",
      note: "Bald verfügbar",
    },
    badge: "Demnächst",
  },
  booking: {
    label: "Erstgespräch",
    title: "Sprechen wir.",
    sub: "Jedes große Wachstum beginnt mit einem Gespräch. Lassen Sie uns gemeinsam herausfinden, welches ungenutzte Potenzial in Ihrem Unternehmen steckt – unverbindlich und zielgerichtet.",
    steps: ["Leistung", "Kontakt", "Termin", "Übersicht"],
    stepTitles: [
      "Worum geht es?",
      "Wer sind Sie?",
      "Wann passt es Ihnen?",
      "Kurz prüfen & absenden",
    ],
    fields: {
      service: "Welche Leistung interessiert Sie?",
      multiHint: "Mehrfachauswahl möglich",
      name: "Name",
      company: "Unternehmen",
      email: "E-Mail",
      phone: "Telefon",
      phoneOptional: "optional",
      budget: "Budgetrahmen",
      date: "Wunschtermin",
      slot: "Tageszeit",
      message: "Worum geht es genau?",
      messagePlaceholder: "Erzählen Sie uns in zwei, drei Sätzen, was Sie vorhaben.",
    },
    serviceOptions: [
      { key: "web", label: "Webdesign & Wartung", desc: "Website, Shop, Bezahlung" },
      { key: "ai", label: "KI-Beratung & Integration", desc: "Agenten, Workflows, Prozessoptimierung" },
      { key: "mkt", label: "Marketing", desc: "Ads, Strategie, Conversion" },
      { key: "all", label: "Noch unklar", desc: "Wir finden es gemeinsam heraus" },
    ],
    budgetOptions: ["< 5.000 €", "5.000 bis 15.000 €", "15.000 bis 40.000 €", "> 40.000 €", "Noch offen"],
    slotOptions: ["Vormittags", "Mittags", "Nachmittags", "Flexibel"],
    next: "Weiter",
    back: "Zurück",
    submit: "Anfrage absenden",
    submitting: "Wird gesendet …",
    reassurance: "Unverbindlich · Persönliche Antwort in unter 24 Stunden",
    review: "Ihre Angaben",
    successTitle: "Vielen Dank, Ihre Anfrage ist eingegangen.",
    successBody: "Nicolas meldet sich persönlich innerhalb von 24 Stunden bei Ihnen. Prüfen Sie kurz Ihr Postfach.",
    successAgain: "Neue Anfrage",
    required: "Bitte ausfüllen",
    invalidEmail: "Bitte gültige E-Mail angeben",
    pickOne: "Bitte mindestens eine Leistung wählen",
    submitError: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an hallo@novastackstudio.de.",
    questionnaireTitle: "Vorab-Fragebogen",
    questionnaireText: "Da Sie eine Website planen: Möchten Sie vorab einen kurzen Fragebogen ausfüllen? Wir senden ihn direkt an Ihre E-Mail, damit wir Ihr Projekt schneller verstehen.",
    questionnaireOptIn: "Ja, Fragebogen an meine E-Mail senden",
    questionnaireSent: "Den Fragebogen finden Sie in Kürze in Ihrem Postfach.",
  },
  footer: {
    tagline: "Webdesign, KI-Integration und Marketing, gestapelt zu einem System, das arbeitet.",
    ctaTitle: "Bauen wir Ihr Fundament.",
    ctaSub: "Ein Gespräch genügt, um herauszufinden, ob wir zueinander passen. Unverbindlich und in unter 24 Stunden beantwortet.",
    sections: [
      {
        heading: "Leistungen",
        links: [
          { label: "Webdesign & Wartung", href: "#leistungen" },
          { label: "KI-Beratung & Integration", href: "#leistungen" },
          { label: "Marketing", href: "#leistungen" },
        ],
      },
      {
        heading: "Studio",
        links: [
          { label: "Über uns", href: "#studio" },
          { label: "Vorgehen", href: "#arbeitsweise" },
          { label: "Referenzen", href: "#referenzen" },
        ],
      },
    ],
    contactHeading: "Kontakt",
    location: "Köln, Deutschland",
    rights: "Alle Rechte vorbehalten.",
    legal: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
    ],
    builtFor: "Beratung buchen",
  },
  langName: { de: "Deutsch", en: "English" },
  cookies: {
    bannerTitle: "Wir verwenden Cookies",
    bannerBody: "Notwendige Cookies halten die Seite am Laufen. Mit Ihrer Zustimmung nutzen wir zusätzlich Analyse-Tools, um zu verstehen, wie die Seite genutzt wird — nur wenn Sie zustimmen.",
    acceptAll: "Alle akzeptieren",
    rejectNonEssential: "Nur notwendige",
    customize: "Einstellungen",
    save: "Auswahl speichern",
    back: "Zurück",
    panelTitle: "Cookie-Einstellungen",
    panelBody: "Wählen Sie, welche Kategorien Sie zulassen möchten. Notwendige Cookies können nicht deaktiviert werden, da die Seite ohne sie nicht funktioniert.",
    categories: [
      {
        key: "necessary",
        title: "Notwendig",
        body: "Speichert z. B. Ihre Theme- und Sprachwahl. Ohne diese Funktionen läuft die Seite nicht korrekt.",
      },
      {
        key: "analytics",
        title: "Analyse",
        body: "Hilft uns zu verstehen, welche Inhalte funktionieren, damit wir die Seite gezielt verbessern können. Anonymisiert, keine Weitergabe an Dritte zu Werbezwecken.",
      },
      {
        key: "marketing",
        title: "Marketing",
        body: "Wird für die Erfolgsmessung von Kampagnen verwendet. Aktuell schalten wir keine Anzeigen — diese Kategorie ist für die Zukunft vorgesehen.",
      },
    ],
    alwaysOn: "Immer aktiv",
    privacyLinkLabel: "Datenschutzerklärung",
    footerLink: "Cookie-Einstellungen",
  },
};

const en: Dict = {
  nav: {
    services: "Services",
    about: "Studio",
    proof: "Proof",
    cta: "Book a consultation",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Digital studio",
    tagline: "Digital Solutions",
    titleLines: ["We build the", "digital foundation"],
    accentWord: "for your growth.",
    sub: "NovaStack unites web design, AI integration and marketing into one precisely tuned system. For more clarity, speed and efficiency in your business.",
    ctaPrimary: "Book a consultation",
    ctaSecondary: "Our services",
    scroll: "Scroll",
    metrics: [
      { value: "1:1", label: "Directly with the founder, no agency chain" },
      { value: "100%", label: "Ownership stays with you" },
      { value: "< 24 h", label: "Reply to every request" },
    ],
  },
  philosophy: {
    label: "Philosophy",
    title: "What matters today.",
    sub: "Great growth begins with a simple conversation. Let's find out together what untapped potential lies dormant in your business. Whether you need a new website, want to base your marketing strategy on solid data, or are ready to take the step into automation: we advise you transparently and with absolute focus. Book a no-obligation intro call with our experts now and set the course for your digital future.",
    blocks: [
      {
        title: "Digital presence: more than just a website",
        body: "The first impression online decides within seconds whether trust is built. A modern, technically flawless website is the foundation of every successful business. But an appealing look is no longer enough today: behind the scenes, current technologies have to work together smoothly. We make sure your digital presence not only convinces visually, but stays secure and high-performing for the long run through continuous care and updates. Investing in state-of-the-art web technology secures a clear competitive edge and keeps visitors coming back.",
      },
      {
        title: "A guide through the AI jungle",
        body: "Artificial intelligence is shaping the future of business – that's no longer a secret. Yet many companies face a real hurdle: the market is flooded with countless products and new services. The choice quickly becomes overwhelming, and the fear of falling behind grows. That's exactly where we come in. We examine your business model and internal processes in detail and identify the ones where a targeted implementation measurably increases your profit. We pick the system that fits you precisely and handle the entire technical rollout. You focus on your day-to-day business while we make your workflows future-proof.",
      },
    ],
  },
  servicesIntro: {
    label: "Our services",
    title: "Three disciplines. One system.",
    sub: "Each service stands on its own and locks into the next. Stacked together they form infrastructure that works for you, instead of just looking good.",
    resultLabel: "Result",
    exampleLabel: "Example",
  },
  services: [
    {
      index: "01",
      key: "web",
      title: "Web design & maintenance",
      tagline: "From the domain to online payment systems.",
      body: "We design and build websites that don't just impress — they sell — including ongoing technical care, updates and protection. Everything from one source.",
      points: [
        "Domain, hosting & technical setup",
        "Bespoke design & development",
        "Online shop & infrastructure",
        "Maintenance & ongoing operation",
      ],
      outcome: "A site you own, understand, and can grow with.",
    },
    {
      index: "02",
      key: "ai",
      title: "AI consulting & integration",
      tagline: "Artificial intelligence that actually works inside your business.",
      body: "We analyse how you work and optimise your processes — through digital solutions or AI. Manual routines get digitised, recurring tasks automated, and we integrate exactly the technologies that measurably raise your profit. From a single agent to an end-to-end system.",
      points: [
        "Analysis & optimisation of your workflows",
        "Digitising analogue processes",
        "Systems, agents & automated workflows",
        "Rollout, training & support",
      ],
      outcome: "Fewer manual steps, more speed, without overwhelming your team.",
    },
    {
      index: "03",
      key: "mkt",
      title: "Data-driven marketing",
      tagline: "Market data turned into targeted customer acquisition.",
      body: "We capture and evaluate your market data, address your audiences more precisely and open up new groups of buyers — cleanly measured and continuously improved.",
      points: [
        "Marketing & channel analysis (Google, Facebook)",
        "Data preparation & clean tracking",
        "Targeted, data-driven campaigns",
        "Ongoing evaluation & optimisation",
      ],
      outcome: "Every euro you spend flows to where it measurably makes a difference.",
    },
  ],
  approach: {
    label: "Approach",
    title: "How a brief becomes a system.",
    sub: "No endless meetings. Four clear steps that end in a working system.",
    steps: [
      { no: "01", title: "Understand", body: "We listen, look at how you work, and find the point with the most leverage." },
      { no: "02", title: "Design", body: "Concept, design and architecture, made transparent, before a line of code is written." },
      { no: "03", title: "Build", body: "Clean delivery in short cycles. You see progress, not a black box." },
      { no: "04", title: "Operate", body: "We stay. Maintenance, optimisation and expansion as your business grows." },
    ],
    method: [
      {
        title: "Precision through data",
        body: "Gut decisions are risky. When it comes to scaling your business, we rely on facts. We build and set up intelligent systems that capture valuable market data precisely. From large volumes of information, we filter exactly the insights that move your business forward. This lets us address your existing audiences far more accurately and uncover entirely new groups of buyers – turning abstract numbers into concrete growth.",
      },
      {
        title: "From data point to loyal customer",
        body: "Every visitor to your website leaves valuable traces. Ignoring that information means leaving money on the table. Systematically capturing data is the decisive step to understanding how your potential buyers behave. We evaluate this user data and turn it into clear, actionable recommendations for your marketing. Through personalised messaging and optimised experiences, we turn anonymous clicks into paying customers – raising your conversion rates and growing your revenue sustainably.",
      },
    ],
  },
  about: {
    label: "The studio",
    title: "Seasoned expertise for your project.",
    lead: "NovaStack is a digital studio in Cologne, founded by Nicolas Grandezka.",
    body: "Behind NovaStack stands hands-on experience in web development, cybersecurity and strategic marketing. You work directly with the founder – and, in the background, with a tight-knit network of specialists we assemble specifically for your project. Our ambition: to translate complex technical challenges into clear and, above all, profitable results. Your measurable success is our benchmark.",
    founder: { name: "Nicolas Grandezka", role: "Owner & Studio Lead" },
    facts: [
      { label: "Based in", value: "Cologne, Germany" },
      { label: "Founded by", value: "Nicolas Grandezka" },
      { label: "Services", value: "Web · AI · Marketing" },
      { label: "Collaboration", value: "Remote & on-site" },
      { label: "Languages", value: "German · English" },
    ],
    motif: "Three layers. One foundation.",
    motifLabel: "The foundation",
    motifStar: "One spark. A clear direction.",
    motifStarLabel: "The spark",
    creed: "We don't ship building blocks. We ship a foundation.",
  },
  proof: {
    label: "Proof & trust",
    title: "Why you can trust us.",
    sub: "As a young studio, we rely on clear commitments rather than borrowed logos. These four points apply from the very first conversation – certifications and client voices will follow as the first projects go live.",
    guarantees: [
      {
        title: "Directly with the founder",
        body: "From day one you speak with the person building your project – no agency chain, no account management in between.",
      },
      {
        title: "You own everything",
        body: "Code, access and data stay 100% yours. No dependency, no lock-in.",
      },
      {
        title: "A reply within 24 hours",
        body: "Every request is answered personally within one business day.",
      },
      {
        title: "Full insight, no black box",
        body: "You see progress in short cycles – transparent from concept to operation.",
      },
    ],
    certificates: {
      heading: "Certifications",
      note: "In preparation",
    },
    testimonials: {
      heading: "Client voices",
      note: "Coming soon",
    },
    badge: "Soon",
  },
  booking: {
    label: "Intro call",
    title: "Let's talk.",
    sub: "Every great growth starts with a simple conversation. Let's find out together what untapped potential is waiting in your business – no obligation, fully focused.",
    steps: ["Service", "Contact", "Timing", "Review"],
    stepTitles: [
      "What's it about?",
      "Who are you?",
      "When suits you?",
      "Quick check & send",
    ],
    fields: {
      service: "Which service are you interested in?",
      multiHint: "Multiple choice allowed",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      phoneOptional: "optional",
      budget: "Budget range",
      date: "Preferred date",
      slot: "Time of day",
      message: "What exactly is it about?",
      messagePlaceholder: "Tell us in two or three sentences what you have in mind.",
    },
    serviceOptions: [
      { key: "web", label: "Web design & maintenance", desc: "Website, shop, payments" },
      { key: "ai", label: "AI consulting & integration", desc: "Agents, workflows, process optimisation" },
      { key: "mkt", label: "Marketing", desc: "Ads, strategy, conversion" },
      { key: "all", label: "Not sure yet", desc: "We'll figure it out together" },
    ],
    budgetOptions: ["< €5,000", "€5,000 to €15,000", "€15,000 to €40,000", "> €40,000", "Still open"],
    slotOptions: ["Morning", "Midday", "Afternoon", "Flexible"],
    next: "Continue",
    back: "Back",
    submit: "Send request",
    submitting: "Sending …",
    reassurance: "No obligation · Personal reply within 24 hours",
    review: "Your details",
    successTitle: "Thank you, your request has reached us.",
    successBody: "Nicolas will personally get back to you within 24 hours. Keep an eye on your inbox.",
    successAgain: "New request",
    required: "Please fill this in",
    invalidEmail: "Please enter a valid email",
    pickOne: "Please choose at least one service",
    submitError: "Sending failed. Please try again or email us directly at hallo@novastackstudio.de.",
    questionnaireTitle: "Pre-project questionnaire",
    questionnaireText: "Since you're planning a website: would you like to fill in a short questionnaire in advance? We'll send it straight to your email so we can understand your project faster.",
    questionnaireOptIn: "Yes, send the questionnaire to my email",
    questionnaireSent: "You'll find the questionnaire in your inbox shortly.",
  },
  footer: {
    tagline: "Web design, AI integration and marketing, stacked into one system that works.",
    ctaTitle: "Let's build your foundation.",
    ctaSub: "One conversation is enough to find out whether we're a fit. No obligation, answered within 24 hours.",
    sections: [
      {
        heading: "Services",
        links: [
          { label: "Web design & maintenance", href: "#leistungen" },
          { label: "AI consulting & integration", href: "#leistungen" },
          { label: "Marketing", href: "#leistungen" },
        ],
      },
      {
        heading: "Studio",
        links: [
          { label: "About", href: "#studio" },
          { label: "Approach", href: "#arbeitsweise" },
          { label: "Proof", href: "#referenzen" },
        ],
      },
    ],
    contactHeading: "Contact",
    location: "Cologne, Germany",
    rights: "All rights reserved.",
    legal: [
      { label: "Imprint", href: "#" },
      { label: "Privacy", href: "#" },
    ],
    builtFor: "Book a consultation",
  },
  langName: { de: "Deutsch", en: "English" },
  cookies: {
    bannerTitle: "We use cookies",
    bannerBody: "Necessary cookies keep the site running. With your consent, we also use analytics tools to understand how the site is used — only if you agree.",
    acceptAll: "Accept all",
    rejectNonEssential: "Necessary only",
    customize: "Preferences",
    save: "Save preferences",
    back: "Back",
    panelTitle: "Cookie preferences",
    panelBody: "Choose which categories you want to allow. Necessary cookies can't be switched off, as the site won't function properly without them.",
    categories: [
      {
        key: "necessary",
        title: "Necessary",
        body: "Stores things like your theme and language choice. The site won't work correctly without these.",
      },
      {
        key: "analytics",
        title: "Analytics",
        body: "Helps us understand what content works so we can improve the site. Anonymised, never shared with third parties for advertising.",
      },
      {
        key: "marketing",
        title: "Marketing",
        body: "Used to measure campaign performance. We're not running any ads right now — this category is reserved for the future.",
      },
    ],
    alwaysOn: "Always on",
    privacyLinkLabel: "Privacy policy",
    footerLink: "Cookie preferences",
  },
};

export const dictionaries: Record<Lang, Dict> = { de, en };
