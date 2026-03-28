export interface Service {
  slug: string;
  icon: string;
  relatedSlugs: string[];
  fr: {
    title: string;
    metaDescription: string;
    heroSubtitle: string;
    description: string;
    benefits: string[];
    useCases: string[];
  };
  en: {
    title: string;
    metaDescription: string;
    heroSubtitle: string;
    description: string;
    benefits: string[];
    useCases: string[];
  };
}

export const services: Service[] = [
  {
    slug: "regisseur-evenementiel",
    icon: "\u25C8",
    relatedSlugs: ["logistique-luxe", "coordination-technique"],
    fr: {
      title: "R\u00e9gisseurs \u00c9v\u00e9nementiels",
      metaDescription: "R\u00e9gisseurs \u00e9v\u00e9nementiels de luxe \u00e0 Paris. 300+ profils v\u00e9rifi\u00e9s, mobilisation sous 48h, service gants blancs pour d\u00e9fil\u00e9s, galas et lancements.",
      heroSubtitle: "L\u2019\u00e9lite de la r\u00e9gie \u00e9v\u00e9nementielle, mobilis\u00e9e pour vos projets d\u2019exception.",
      description: "Nos r\u00e9gisseurs \u00e9v\u00e9nementiels sont les chefs d\u2019orchestre op\u00e9rationnels de vos \u00e9v\u00e9nements de prestige. S\u00e9lectionn\u00e9s pour leur expertise technique, leur discr\u00e9tion et leur capacit\u00e9 \u00e0 \u00e9voluer dans les codes du luxe, ils garantissent une ex\u00e9cution sans faille le jour J.\n\nAvec un r\u00e9seau de plus de 300 professionnels v\u00e9rifi\u00e9s, nous mobilisons les profils les plus adapt\u00e9s \u00e0 votre \u00e9v\u00e9nement en moins de 48 heures. Chaque r\u00e9gisseur est briefi\u00e9 en amont sur vos attentes sp\u00e9cifiques, les contraintes du lieu et les standards de votre marque.\n\nDe la supervision du montage technique \u00e0 la coordination des prestataires en temps r\u00e9el, nos r\u00e9gisseurs incarnent un service gants blancs o\u00f9 l\u2019anticipation remplace l\u2019improvisation. C\u2019est cette rigueur qui fait la diff\u00e9rence entre un \u00e9v\u00e9nement r\u00e9ussi et un \u00e9v\u00e9nement d\u2019exception.",
      benefits: [
        "300+ r\u00e9gisseurs \u00e9v\u00e9nementiels v\u00e9rifi\u00e9s et form\u00e9s aux codes du luxe",
        "Mobilisation sous 48 heures partout en France et en Europe",
        "Briefing personnalis\u00e9 sur les sp\u00e9cificit\u00e9s de votre \u00e9v\u00e9nement",
        "Supervision compl\u00e8te du montage au d\u00e9montage",
        "Coordination multi-prestataires en temps r\u00e9el",
        "Retour d\u2019exp\u00e9rience syst\u00e9matique post-\u00e9v\u00e9nement",
      ],
      useCases: [
        "D\u00e9fil\u00e9s de mode et fashion weeks",
        "Galas et soir\u00e9es de prestige",
        "Lancements de produits haut de gamme",
        "Sommets et conf\u00e9rences corporate",
      ],
    },
    en: {
      title: "Event Stage Managers",
      metaDescription: "Luxury event stage managers in Paris. 300+ verified profiles, 48h mobilisation, white-glove service for fashion shows, galas and launches.",
      heroSubtitle: "The elite of event stage management, mobilised for your exceptional projects.",
      description: "Our event stage managers are the operational conductors of your prestigious events. Selected for their technical expertise, discretion and ability to operate within the codes of luxury, they guarantee flawless execution on the day.\n\nWith a network of over 300 verified professionals, we mobilise the most suitable profiles for your event within 48 hours. Each stage manager is briefed in advance on your specific expectations, venue constraints and brand standards.\n\nFrom technical setup supervision to real-time vendor coordination, our stage managers embody a white-glove service where anticipation replaces improvisation. This rigour is what separates a successful event from an exceptional one.",
      benefits: [
        "300+ verified event stage managers trained in luxury codes",
        "48-hour mobilisation across France and Europe",
        "Personalised briefing on your event specifics",
        "Complete supervision from setup to teardown",
        "Real-time multi-vendor coordination",
        "Systematic post-event debriefing",
      ],
      useCases: [
        "Fashion shows and fashion weeks",
        "Galas and prestigious soirées",
        "Premium product launches",
        "Corporate summits and conferences",
      ],
    },
  },
  {
    slug: "logistique-luxe",
    icon: "\u2726",
    relatedSlugs: ["regisseur-evenementiel", "staffing-evenementiel"],
    fr: {
      title: "Logistique Haut de Gamme",
      metaDescription: "Logistique \u00e9v\u00e9nementielle de luxe \u00e0 Paris. Transport s\u00e9curis\u00e9, montage premium, coordination fournisseurs, service gants blancs z\u00e9ro incident.",
      heroSubtitle: "Une logistique d\u2019exception, invisible et infaillible.",
      description: "La logistique haut de gamme est le socle invisible de tout \u00e9v\u00e9nement d\u2019exception. Chez The Next Event, nous transformons la complexit\u00e9 op\u00e9rationnelle en une exp\u00e9rience fluide o\u00f9 chaque d\u00e9tail a \u00e9t\u00e9 anticip\u00e9, chaque contingence pr\u00e9vue.\n\nTransport s\u00e9curis\u00e9 de mat\u00e9riel pr\u00e9cieux, coordination minutieuse des prestataires, gestion des acc\u00e8s et des flux : nos \u00e9quipes d\u00e9ploient une logistique de pr\u00e9cision calibr\u00e9e pour les environnements les plus exigeants. Du Palace parisien au yacht m\u00e9diterran\u00e9en, nous adaptons nos m\u00e9thodes au terrain.\n\nNotre bilan : plus de 500 \u00e9v\u00e9nements par an, z\u00e9ro incident logistique majeur. Cette fiabilit\u00e9 n\u2019est pas un hasard \u2014 c\u2019est le fruit de proc\u00e9dures rod\u00e9es, d\u2019une \u00e9quipe exp\u00e9riment\u00e9e et d\u2019une culture de l\u2019excellence op\u00e9rationnelle.",
      benefits: [
        "500+ \u00e9v\u00e9nements par an avec z\u00e9ro incident logistique majeur",
        "Transport s\u00e9curis\u00e9 et assur\u00e9 pour mat\u00e9riel de valeur",
        "Montage et d\u00e9montage premium dans les d\u00e9lais les plus serr\u00e9s",
        "Coordination multi-prestataires unifi\u00e9e",
        "Plans de contingence pr\u00e9-\u00e9tablis pour chaque sc\u00e9nario",
      ],
      useCases: [
        "Roadshows itin\u00e9rants multi-villes",
        "Installations sc\u00e9nographiques complexes",
        "\u00c9v\u00e9nements dans des lieux atypiques ou patrimoniaux",
        "Logistique internationale (Monaco, Londres, Gen\u00e8ve)",
      ],
    },
    en: {
      title: "Premium Logistics",
      metaDescription: "Luxury event logistics in Paris. Secure transport, premium setup, vendor coordination, zero-incident white-glove service.",
      heroSubtitle: "Exceptional logistics \u2014 invisible and infallible.",
      description: "Premium logistics is the invisible foundation of every exceptional event. At The Next Event, we transform operational complexity into a seamless experience where every detail has been anticipated, every contingency planned.\n\nSecure transport of precious equipment, meticulous vendor coordination, access and flow management: our teams deploy precision logistics calibrated for the most demanding environments. From Parisian palaces to Mediterranean yachts, we adapt our methods to the terrain.\n\nOur track record: over 500 events per year, zero major logistical incidents. This reliability is not coincidental \u2014 it is the result of proven procedures, an experienced team and a culture of operational excellence.",
      benefits: [
        "500+ events per year with zero major logistical incidents",
        "Secure and insured transport for high-value equipment",
        "Premium setup and teardown within the tightest deadlines",
        "Unified multi-vendor coordination",
        "Pre-established contingency plans for every scenario",
      ],
      useCases: [
        "Multi-city touring roadshows",
        "Complex scenographic installations",
        "Events at unusual or heritage venues",
        "International logistics (Monaco, London, Geneva)",
      ],
    },
  },
  {
    slug: "coordination-technique",
    icon: "\u2699",
    relatedSlugs: ["regisseur-evenementiel", "logistique-luxe"],
    fr: {
      title: "Coordination Technique",
      metaDescription: "Coordination technique \u00e9v\u00e9nementielle \u00e0 Paris. Direction de production cl\u00e9 en main, pilotage son/lumi\u00e8re/vid\u00e9o, 18+ ans d\u2019expertise multi-format.",
      heroSubtitle: "La ma\u00eetrise technique au service de votre vision cr\u00e9ative.",
      description: "La coordination technique est l\u2019art de transformer un cahier des charges cr\u00e9atif en r\u00e9alit\u00e9 op\u00e9rationnelle. Nos directeurs de production assurent le pilotage int\u00e9gral des aspects techniques de votre \u00e9v\u00e9nement : son, lumi\u00e8re, vid\u00e9o, sc\u00e9nographie, s\u00e9curit\u00e9.\n\nForts de plus de 18 ans d\u2019exp\u00e9rience sur tous les formats \u00e9v\u00e9nementiels \u2014 du showroom intime au stade de 50 000 places \u2014 nos \u00e9quipes poss\u00e8dent la polyvalence et la r\u00e9activit\u00e9 n\u00e9cessaires pour g\u00e9rer l\u2019impr\u00e9vu sans compromettre la qualit\u00e9.\n\nChaque projet b\u00e9n\u00e9ficie d\u2019un r\u00e9tro-planning d\u00e9taill\u00e9, de fiches techniques exhaustives et d\u2019un suivi minute par minute le jour J. Notre obsession : que la technique soit au service de l\u2019exp\u00e9rience, jamais l\u2019inverse.",
      benefits: [
        "Direction de production cl\u00e9 en main de A \u00e0 Z",
        "Pilotage son, lumi\u00e8re, vid\u00e9o et sc\u00e9nographie",
        "18+ ans d\u2019exp\u00e9rience multi-format \u00e9v\u00e9nementiel",
        "R\u00e9tro-planning d\u00e9taill\u00e9 et fiches techniques compl\u00e8tes",
        "Gestion de crise et solutions en temps r\u00e9el",
      ],
      useCases: [
        "D\u00e9fil\u00e9s de mode avec dispositif son & lumi\u00e8re",
        "Conf\u00e9rences avec keynotes et sessions live",
        "Salons professionnels multi-stands",
        "Spectacles et c\u00e9r\u00e9monies corporate",
      ],
    },
    en: {
      title: "Technical Coordination",
      metaDescription: "Event technical coordination in Paris. Turnkey production management, sound/lighting/video, 18+ years of multi-format expertise.",
      heroSubtitle: "Technical mastery in service of your creative vision.",
      description: "Technical coordination is the art of transforming a creative brief into operational reality. Our production directors handle the complete technical oversight of your event: sound, lighting, video, scenography, security.\n\nWith over 18 years of experience across all event formats \u2014 from intimate showrooms to 50,000-seat stadiums \u2014 our teams possess the versatility and responsiveness needed to handle the unexpected without compromising quality.\n\nEvery project benefits from a detailed reverse planning schedule, comprehensive technical specifications and minute-by-minute monitoring on the day. Our obsession: technology must serve the experience, never the other way around.",
      benefits: [
        "Turnkey production management from A to Z",
        "Sound, lighting, video and scenography oversight",
        "18+ years of multi-format event experience",
        "Detailed reverse planning and complete technical specs",
        "Crisis management and real-time solutions",
      ],
      useCases: [
        "Fashion shows with sound & lighting rigs",
        "Conferences with keynotes and live sessions",
        "Multi-booth trade shows",
        "Corporate shows and ceremonies",
      ],
    },
  },
  {
    slug: "staffing-evenementiel",
    icon: "\u272A",
    relatedSlugs: ["regisseur-evenementiel", "logistique-luxe"],
    fr: {
      title: "Staffing \u00c9v\u00e9nementiel",
      metaDescription: "Staffing \u00e9v\u00e9nementiel premium \u00e0 Paris. H\u00f4tes et h\u00f4tesses de luxe, accueil VIP, casting sur-mesure pour \u00e9v\u00e9nements haut de gamme.",
      heroSubtitle: "Les visages de votre marque, s\u00e9lectionn\u00e9s avec exigence.",
      description: "Le staffing \u00e9v\u00e9nementiel premium va bien au-del\u00e0 du simple recrutement de personnel d\u2019accueil. Chez The Next Event, nous constituons des \u00e9quipes sur-mesure qui incarnent les valeurs et l\u2019image de votre marque \u00e0 chaque point de contact.\n\nH\u00f4tes et h\u00f4tesses de prestige, r\u00e9gisseurs sp\u00e9cialis\u00e9s, coordinateurs bilingues : chaque profil est s\u00e9lectionn\u00e9 selon des crit\u00e8res stricts de pr\u00e9sentation, de savoir-\u00eatre et de comp\u00e9tences techniques. Un casting personnalis\u00e9 pour chaque mission.\n\nNos \u00e9quipes sont form\u00e9es aux codes du luxe et briefi\u00e9es sur les sp\u00e9cificit\u00e9s de votre \u00e9v\u00e9nement. Le r\u00e9sultat : un accueil irr\u00e9prochable, une pr\u00e9sence \u00e9l\u00e9gante et discr\u00e8te, une exp\u00e9rience invit\u00e9 qui fait la diff\u00e9rence.",
      benefits: [
        "Casting sur-mesure adapt\u00e9 \u00e0 l\u2019image de votre marque",
        "H\u00f4tes et h\u00f4tesses form\u00e9s aux codes du luxe",
        "Personnel multilingue (fran\u00e7ais, anglais, +)",
        "Briefing sp\u00e9cifique \u00e0 chaque \u00e9v\u00e9nement",
        "Flexibilit\u00e9 d\u2019\u00e9quipe selon vos besoins (1 \u00e0 50+ personnes)",
        "Coordination int\u00e9gr\u00e9e avec nos r\u00e9gisseurs",
      ],
      useCases: [
        "Accueil VIP pour \u00e9v\u00e9nements de luxe",
        "Hostesses pour salons et expositions",
        "\u00c9quipes de service pour galas et dîners de prestige",
        "Personnel d\u2019accueil multilingue pour \u00e9v\u00e9nements internationaux",
      ],
    },
    en: {
      title: "Event Staffing",
      metaDescription: "Premium event staffing in Paris. Luxury hosts, VIP reception, bespoke casting for high-end events.",
      heroSubtitle: "The faces of your brand, selected with exacting standards.",
      description: "Premium event staffing goes far beyond simple reception staff recruitment. At The Next Event, we build bespoke teams that embody your brand values and image at every touchpoint.\n\nPrestige hosts, specialist stage managers, bilingual coordinators: every profile is selected according to strict criteria of presentation, interpersonal skills and technical competence. A personalised casting for every mission.\n\nOur teams are trained in the codes of luxury and briefed on the specifics of your event. The result: impeccable reception, elegant and discreet presence, a guest experience that makes the difference.",
      benefits: [
        "Bespoke casting tailored to your brand image",
        "Hosts trained in luxury codes",
        "Multilingual staff (French, English, +)",
        "Event-specific briefing",
        "Flexible team sizing (1 to 50+ people)",
        "Integrated coordination with our stage managers",
      ],
      useCases: [
        "VIP reception for luxury events",
        "Hostesses for trade shows and exhibitions",
        "Service teams for galas and prestigious dinners",
        "Multilingual reception for international events",
      ],
    },
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => !!s);
}
