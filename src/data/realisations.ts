export interface Realisation {
  slug: string;
  image: string;
  client: string;
  date: string;
  services: string[];
  fr: {
    title: string;
    category: string;
    location: string;
    description: string;
  };
  en: {
    title: string;
    category: string;
    location: string;
    description: string;
  };
}

export const realisations: Realisation[] = [
  {
    slug: "roadshow-porsche",
    image: "/images/projet/1.jpg",
    client: "Porsche",
    date: "2023-06",
    services: ["regisseurs", "logistique", "production"],
    fr: {
      title: "Roadshow Porsche",
      category: "Automobile",
      location: "France",
      description:
        "Coordination compl\u00e8te du roadshow national Porsche, une tourn\u00e9e itin\u00e9rante \u00e0 travers les plus belles villes de France. Nos r\u00e9gisseurs ont orchestr\u00e9 chaque \u00e9tape : installation sc\u00e9nographique, logistique des v\u00e9hicules d\u2019exception et gestion des flux VIP.\n\nDe Bordeaux \u00e0 Lyon, en passant par Cannes et Paris, nos \u00e9quipes ont assur\u00e9 un service gants blancs irr\u00e9prochable \u00e0 chaque point de contact. Montage en 6 heures, d\u00e9montage en 4 \u2014 avec une pr\u00e9cision chirurgicale qui est notre signature.\n\nLe r\u00e9sultat : une exp\u00e9rience de marque sans couture, fid\u00e8le aux codes du luxe automobile, salu\u00e9e par le constructeur comme l\u2019un des meilleurs roadshows europ\u00e9ens de l\u2019ann\u00e9e.",
    },
    en: {
      title: "Porsche Roadshow",
      category: "Automobile",
      location: "France",
      description:
        "Full coordination of the national Porsche roadshow, a touring experience across the most prestigious cities in France. Our stage managers orchestrated every phase: scenic installation, logistics for exceptional vehicles and VIP flow management.\n\nFrom Bordeaux to Lyon, through Cannes and Paris, our teams delivered impeccable white-glove service at every touchpoint. Setup in 6 hours, teardown in 4 \u2014 with the surgical precision that is our signature.\n\nThe result: a seamless brand experience, true to the codes of automotive luxury, hailed by the manufacturer as one of the best European roadshows of the year.",
    },
  },
  {
    slug: "qatar-airways-paris",
    image: "/images/projet/2.jpg",
    client: "Qatar Airways",
    date: "2023-09",
    services: ["regisseurs", "logistique"],
    fr: {
      title: "Qatar Airways",
      category: "Aviation",
      location: "Paris La D\u00e9fense",
      description:
        "Production d\u2019un \u00e9v\u00e9nement corporate d\u2019envergure pour Qatar Airways dans le quartier d\u2019affaires de La D\u00e9fense \u00e0 Paris. Nos r\u00e9gisseurs ont pris en charge la coordination logistique int\u00e9grale, de l\u2019installation sc\u00e9nographique aux flux d\u2019invit\u00e9s internationaux.\n\nUn d\u00e9fi logistique relev\u00e9 avec excellence : accueil multilingue, coordination des prestataires audiovisuels et gestion d\u2019un espace de plus de 2 000 m\u00b2. Chaque d\u00e9tail a \u00e9t\u00e9 pens\u00e9 pour refl\u00e9ter le prestige de la compagnie a\u00e9rienne.\n\nNotre \u00e9quipe a assur\u00e9 une ex\u00e9cution sans faille, du briefing matinal au d\u00e9montage nocturne, dans le respect absolu des standards de qualit\u00e9 impos\u00e9s par la marque.",
    },
    en: {
      title: "Qatar Airways",
      category: "Aviation",
      location: "Paris La D\u00e9fense",
      description:
        "Production of a major corporate event for Qatar Airways in the business district of La D\u00e9fense, Paris. Our stage managers handled the full logistical coordination, from scenic installation to international guest flow management.\n\nA logistical challenge met with excellence: multilingual reception, audiovisual vendor coordination and management of a space exceeding 2,000 sqm. Every detail was crafted to reflect the airline\u2019s prestige.\n\nOur team delivered flawless execution, from morning briefing to overnight teardown, in strict adherence to the brand\u2019s quality standards.",
    },
  },
  {
    slug: "linkedin-summit",
    image: "/images/projet/3.jpg",
    client: "LinkedIn",
    date: "2023-11",
    services: ["regisseurs", "production"],
    fr: {
      title: "LinkedIn Summit",
      category: "Tech",
      location: "Paris Accor Arena",
      description:
        "R\u00e9gie g\u00e9n\u00e9rale du LinkedIn Summit \u00e0 l\u2019Accor Arena de Paris, r\u00e9unissant plus de 5 000 professionnels du digital et des ressources humaines. Un \u00e9v\u00e9nement phare de la tech qui exigeait une coordination impeccable sur un site d\u2019envergure.\n\nNos r\u00e9gisseurs ont pilot\u00e9 l\u2019ensemble de la production : coordination des keynotes, gestion des espaces networking, supervision du montage technique et orchestration des transitions entre les sessions pl\u00e9ni\u00e8res.\n\nLe summit a \u00e9t\u00e9 salu\u00e9 pour sa fluidit\u00e9 d\u2019ex\u00e9cution et la qualit\u00e9 de l\u2019exp\u00e9rience participant \u2014 une r\u00e9ussite op\u00e9rationnelle port\u00e9e par notre expertise des grands formats \u00e9v\u00e9nementiels.",
    },
    en: {
      title: "LinkedIn Summit",
      category: "Tech",
      location: "Paris Accor Arena",
      description:
        "General stage management of the LinkedIn Summit at Paris Accor Arena, bringing together over 5,000 digital and HR professionals. A flagship tech event demanding impeccable coordination at an arena-scale venue.\n\nOur managers oversaw the entire production: keynote coordination, networking space management, technical setup supervision and seamless transitions between plenary sessions.\n\nThe summit was praised for its seamless execution and attendee experience quality \u2014 an operational success driven by our expertise in large-scale event formats.",
    },
  },
  {
    slug: "youtube-palais-de-tokyo",
    image: "/images/projet/4.jpg",
    client: "YouTube",
    date: "2023-05",
    services: ["regisseurs", "logistique", "production"],
    fr: {
      title: "YouTube",
      category: "Tech & Digital",
      location: "Palais de Tokyo",
      description:
        "Production \u00e9v\u00e9nementielle pour YouTube au Palais de Tokyo, l\u2019un des lieux culturels les plus embl\u00e9matiques de Paris. Un cadre d\u2019exception qui imposait une logistique sur-mesure respectant l\u2019architecture et les contraintes du site.\n\nNos \u00e9quipes ont coordonn\u00e9 chaque aspect de l\u2019\u00e9v\u00e9nement : sc\u00e9nographie immersive, gestion des contenus digitaux en direct, logistique fournisseurs et accueil des cr\u00e9ateurs et partenaires VIP.\n\nUn \u00e9v\u00e9nement \u00e0 la crois\u00e9e de la tech et de la culture, ex\u00e9cut\u00e9 avec l\u2019\u00e9l\u00e9gance op\u00e9rationnelle qui caract\u00e9rise nos interventions dans les lieux d\u2019exception parisiens.",
    },
    en: {
      title: "YouTube",
      category: "Tech & Digital",
      location: "Palais de Tokyo",
      description:
        "Event production for YouTube at the Palais de Tokyo, one of the most iconic cultural venues in Paris. An exceptional setting demanding bespoke logistics that respected the architecture and constraints of the site.\n\nOur teams coordinated every aspect: immersive scenography, live digital content management, vendor logistics and reception of creators and VIP partners.\n\nAn event at the intersection of tech and culture, executed with the operational elegance that defines our work at exceptional Parisian venues.",
    },
  },
  {
    slug: "google-monaco",
    image: "/images/projet/5.jpg",
    client: "Google",
    date: "2024-03",
    services: ["regisseurs", "logistique", "production"],
    fr: {
      title: "Google",
      category: "Tech & Innovation",
      location: "Monaco",
      description:
        "Direction de production d\u2019un \u00e9v\u00e9nement Google \u00e0 Monaco, une mission internationale qui a mobilis\u00e9 nos meilleurs r\u00e9gisseurs pour un format corporate d\u2019exception. De la pr\u00e9-production parisienne au d\u00e9ploiement mon\u00e9gasque, chaque \u00e9tape a \u00e9t\u00e9 pilot\u00e9e avec rigueur.\n\nCoordination des \u00e9quipes techniques, gestion du transport de mat\u00e9riel entre Paris et Monaco, supervision de l\u2019installation dans un lieu prestigieux en bord de M\u00e9diterran\u00e9e. Un cahier des charges exigeant, respect\u00e9 \u00e0 la lettre.\n\nCette mission illustre notre capacit\u00e9 d\u2019intervention \u00e0 l\u2019international, avec la m\u00eame exigence de service gants blancs que sur nos productions parisiennes.",
    },
    en: {
      title: "Google",
      category: "Tech & Innovation",
      location: "Monaco",
      description:
        "Production management of a Google event in Monaco, an international mission that mobilised our finest stage managers for an exceptional corporate format. From Parisian pre-production to Monaco deployment, every phase was overseen with rigour.\n\nTechnical crew coordination, equipment transport management between Paris and Monaco, setup supervision at a prestigious Mediterranean venue. A demanding brief, executed to the letter.\n\nThis mission demonstrates our international operational capacity, with the same white-glove service standard as our Parisian productions.",
    },
  },
  {
    slug: "facebook-vivatech",
    image: "/images/projet/7.jpg",
    client: "Facebook (Meta)",
    date: "2023-06",
    services: ["regisseurs", "logistique"],
    fr: {
      title: "Facebook VivaTech",
      category: "Tech",
      location: "Paris",
      description:
        "R\u00e9gie \u00e9v\u00e9nementielle du stand Facebook (Meta) lors de VivaTech \u00e0 Paris, le plus grand salon tech d\u2019Europe. Un dispositif d\u2019envergure sur plusieurs jours n\u00e9cessitant une coordination permanente et une r\u00e9activit\u00e9 exemplaire.\n\nNos r\u00e9gisseurs ont assur\u00e9 la gestion compl\u00e8te du stand : montage technique, rotation des \u00e9quipes, accueil des visiteurs et partenaires, coordination des d\u00e9monstrations produit en continu.\n\nUn format salon qui exige une endurance op\u00e9rationnelle rare \u2014 nos \u00e9quipes ont maintenu un niveau d\u2019excellence constant du premier au dernier jour, dans un environnement \u00e0 tr\u00e8s haute fr\u00e9quentation.",
    },
    en: {
      title: "Facebook VivaTech",
      category: "Tech",
      location: "Paris",
      description:
        "Event management of the Facebook (Meta) booth at VivaTech Paris, Europe\u2019s largest tech exhibition. A major multi-day setup requiring constant coordination and exemplary responsiveness.\n\nOur stage managers handled complete booth management: technical setup, team rotation, visitor and partner reception, and continuous product demonstration coordination.\n\nAn exhibition format demanding rare operational endurance \u2014 our teams maintained a consistent level of excellence from first to last day, in a high-traffic environment.",
    },
  },
  {
    slug: "vype-paris",
    image: "/images/projet/12.jpg",
    client: "Vype (BAT)",
    date: "2022-11",
    services: ["regisseurs", "production"],
    fr: {
      title: "Vype",
      category: "Luxe & Lifestyle",
      location: "Paris",
      description:
        "Production d\u2019un lancement de produit Vype dans un cadre lifestyle parisien, m\u00ealant univers premium et exp\u00e9rience sensorielle. Nos r\u00e9gisseurs ont orchestr\u00e9 un \u00e9v\u00e9nement sur-mesure con\u00e7u pour immerger les invit\u00e9s dans l\u2019univers de la marque.\n\nDe la sc\u00e9nographie \u00e0 l\u2019accueil VIP, en passant par la coordination des animations interactives, chaque touchpoint a \u00e9t\u00e9 pens\u00e9 pour cr\u00e9er une exp\u00e9rience m\u00e9morable et coh\u00e9rente avec le positionnement haut de gamme du produit.\n\nUn projet qui t\u00e9moigne de notre savoir-faire dans l\u2019univers du luxe et du lifestyle, o\u00f9 le moindre d\u00e9tail devient un vecteur d\u2019\u00e9motion.",
    },
    en: {
      title: "Vype",
      category: "Luxury & Lifestyle",
      location: "Paris",
      description:
        "Production of a Vype product launch in a Parisian lifestyle setting, blending a premium universe with a sensory experience. Our stage managers orchestrated a bespoke event designed to immerse guests in the brand\u2019s world.\n\nFrom scenography to VIP reception, through to interactive activation coordination, every touchpoint was crafted to create a memorable experience consistent with the product\u2019s premium positioning.\n\nA project showcasing our expertise in the luxury and lifestyle space, where the smallest detail becomes a vehicle for emotion.",
    },
  },
  {
    slug: "mastercard-roland-garros",
    image: "/images/projet/13.jpg",
    client: "Mastercard",
    date: "2024-05",
    services: ["regisseurs", "logistique"],
    fr: {
      title: "Mastercard",
      category: "Finance",
      location: "Roland Garros",
      description:
        "R\u00e9gie de l\u2019espace hospitalit\u00e9 Mastercard \u00e0 Roland-Garros, l\u2019un des \u00e9v\u00e9nements sportifs les plus prestigieux au monde. Nos \u00e9quipes ont assur\u00e9 la coordination de l\u2019accueil VIP et la gestion logistique dans un environnement \u00e0 contraintes fortes.\n\nGestion des flux de partenaires et invit\u00e9s, coordination avec les \u00e9quipes de s\u00e9curit\u00e9 du tournoi, supervision des services de restauration premium et des animations en loge. Un service gants blancs \u00e0 la hauteur du partenariat Mastercard x Roland-Garros.\n\nUne mission qui illustre notre capacit\u00e9 \u00e0 intervenir sur des \u00e9v\u00e9nements sportifs d\u2019envergure mondiale, o\u00f9 le prestige de la marque ne tol\u00e8re aucune approximation.",
    },
    en: {
      title: "Mastercard",
      category: "Finance",
      location: "Roland Garros",
      description:
        "Stage management of the Mastercard hospitality area at Roland-Garros, one of the most prestigious sporting events in the world. Our teams coordinated VIP reception and logistics management in a highly constrained environment.\n\nPartner and guest flow management, coordination with tournament security teams, supervision of premium catering services and suite activations. White-glove service worthy of the Mastercard x Roland-Garros partnership.\n\nA mission demonstrating our ability to operate at world-class sporting events, where brand prestige tolerates no approximation.",
    },
  },
  {
    slug: "triumph-paris",
    image: "/images/projet/14.jpg",
    client: "Triumph",
    date: "2023-03",
    services: ["regisseurs", "production"],
    fr: {
      title: "Triumph",
      category: "Lancement de produit",
      location: "Paris",
      description:
        "Production d\u2019un \u00e9v\u00e9nement de lancement pour Triumph \u00e0 Paris, combinant pr\u00e9sentation produit et exp\u00e9rience immersive pour la presse et les influenceurs. Nos r\u00e9gisseurs ont pilot\u00e9 l\u2019int\u00e9gralit\u00e9 de la production dans un lieu \u00e9v\u00e9nementiel priv\u00e9.\n\nCoordination des aspects techniques (\u00e9clairage, son, vid\u00e9o), gestion du planning minute par minute, accueil presse et pilotage de la sc\u00e9nographie de marque. Chaque \u00e9l\u00e9ment visuel et logistique a \u00e9t\u00e9 calibr\u00e9 pour maximiser l\u2019impact du lancement.\n\nUn \u00e9v\u00e9nement ma\u00eetris\u00e9 de bout en bout, refl\u00e9tant notre expertise en lancement produit pour des marques exigeantes.",
    },
    en: {
      title: "Triumph",
      category: "Product Launch",
      location: "Paris",
      description:
        "Production of a launch event for Triumph in Paris, combining product presentation with an immersive experience for press and influencers. Our stage managers oversaw the entire production at a private event venue.\n\nTechnical coordination (lighting, sound, video), minute-by-minute scheduling, press reception and brand scenography management. Every visual and logistical element was calibrated to maximise launch impact.\n\nAn event controlled from start to finish, reflecting our expertise in product launches for demanding brands.",
    },
  },
  {
    slug: "roadshow-porsche-etape-2",
    image: "/images/projet/16.jpg",
    client: "Porsche",
    date: "2024-04",
    services: ["regisseurs", "logistique"],
    fr: {
      title: "Roadshow Porsche \u2014 \u00c9tape 2",
      category: "Automobile",
      location: "France",
      description:
        "Deuxi\u00e8me volet du roadshow national Porsche, une nouvelle s\u00e9rie d\u2019\u00e9tapes \u00e0 travers l\u2019Hexagone. Forts de la r\u00e9ussite de la premi\u00e8re \u00e9dition, nos r\u00e9gisseurs ont d\u00e9ploy\u00e9 un dispositif encore plus ambitieux, int\u00e9grant des exp\u00e9riences de conduite et des espaces de r\u00e9ception premium.\n\nChaque ville a b\u00e9n\u00e9fici\u00e9 d\u2019une installation sur-mesure, adapt\u00e9e au lieu tout en respectant les guidelines strictes de la marque. Une logistique itin\u00e9rante rod\u00e9e, avec transport s\u00e9curis\u00e9 des v\u00e9hicules et montage express.\n\nLa confiance renouvel\u00e9e de Porsche t\u00e9moigne de la qualit\u00e9 et de la constance de notre prestation sur les formats roadshow les plus exigeants.",
    },
    en: {
      title: "Porsche Roadshow \u2014 Phase 2",
      category: "Automobile",
      location: "France",
      description:
        "Second chapter of the national Porsche roadshow, a new series of stops across France. Building on the success of the first edition, our stage managers deployed an even more ambitious setup, integrating driving experiences and premium reception areas.\n\nEach city received a bespoke installation, adapted to the venue while respecting the brand\u2019s strict guidelines. A well-oiled touring logistics operation, with secure vehicle transport and express setup.\n\nPorsche\u2019s renewed trust is testament to the quality and consistency of our delivery on the most demanding roadshow formats.",
    },
  },
  {
    slug: "roadshow-porsche-etape-3",
    image: "/images/projet/17.jpg",
    client: "Porsche",
    date: "2024-06",
    services: ["regisseurs", "logistique", "production"],
    fr: {
      title: "Roadshow Porsche \u2014 \u00c9tape 3",
      category: "Automobile",
      location: "France",
      description:
        "Troisi\u00e8me et derni\u00e8re phase du roadshow Porsche, cl\u00f4turant une tourn\u00e9e nationale d\u2019exception. Cette \u00e9tape finale a concentr\u00e9 les plus grandes ambitions sc\u00e9nographiques, avec des installations premium dans des lieux d\u2019exception s\u00e9lectionn\u00e9s pour leur caract\u00e8re unique.\n\nNos r\u00e9gisseurs ont pilot\u00e9 la production de bout en bout : coordination multi-sites, gestion de la logistique lourde et supervision de l\u2019exp\u00e9rience client VIP. Un format rod\u00e9, ex\u00e9cut\u00e9 avec la m\u00eame fra\u00eecheur et la m\u00eame rigueur qu\u2019au premier jour.\n\nCette collaboration longue dur\u00e9e avec Porsche illustre notre capacit\u00e9 \u00e0 maintenir l\u2019excellence op\u00e9rationnelle sur des programmes itin\u00e9rants multi-mois.",
    },
    en: {
      title: "Porsche Roadshow \u2014 Phase 3",
      category: "Automobile",
      location: "France",
      description:
        "Third and final phase of the Porsche roadshow, concluding an exceptional national tour. This final leg featured the most ambitious scenographic installations, at exceptional venues selected for their unique character.\n\nOur stage managers oversaw production from start to finish: multi-site coordination, heavy logistics management and VIP client experience supervision. A refined format, executed with the same freshness and rigour as on day one.\n\nThis long-term collaboration with Porsche demonstrates our ability to maintain operational excellence across multi-month touring programmes.",
    },
  },
  {
    slug: "roadshow-porsche-saint-tropez",
    image: "/images/projet/21.jpg",
    client: "Porsche",
    date: "2024-07",
    services: ["regisseurs", "logistique"],
    fr: {
      title: "Roadshow Porsche \u2014 Saint-Tropez",
      category: "Automobile",
      location: "Saint-Tropez",
      description:
        "\u00c9tape exclusive du roadshow Porsche \u00e0 Saint-Tropez, dans un cadre m\u00e9diterran\u00e9en d\u2019exception. Une \u00e9dition estivale ultra-premium m\u00ealant exp\u00e9rience automobile, lifestyle de luxe et hospitalit\u00e9 sur la C\u00f4te d\u2019Azur.\n\nNos r\u00e9gisseurs ont orchestr\u00e9 une logistique complexe dans un environnement insulaire et touristique : transport s\u00e9curis\u00e9 des v\u00e9hicules, installation sc\u00e9nographique en bord de mer et accueil de clients Porsche tri\u00e9s sur le volet.\n\nUn \u00e9v\u00e9nement qui incarne l\u2019essence m\u00eame du service gants blancs \u00e0 la fran\u00e7aise \u2014 discr\u00e9tion absolue, pr\u00e9cision et \u00e9l\u00e9gance dans l\u2019un des cadres les plus exclusifs de la Riviera.",
    },
    en: {
      title: "Porsche Roadshow \u2014 Saint-Tropez",
      category: "Automobile",
      location: "Saint-Tropez",
      description:
        "Exclusive Porsche roadshow stop in Saint-Tropez, in an exceptional Mediterranean setting. An ultra-premium summer edition blending automotive experience, luxury lifestyle and hospitality on the French Riviera.\n\nOur stage managers orchestrated complex logistics in a coastal tourist environment: secure vehicle transport, seaside scenic installation and reception of hand-picked Porsche clients.\n\nAn event embodying the very essence of French white-glove service \u2014 absolute discretion, precision and elegance in one of the Riviera\u2019s most exclusive settings.",
    },
  },
];

export function getAllRealisations(): Realisation[] {
  return realisations;
}

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug);
}

export function getOtherRealisations(currentSlug: string, limit = 3): Realisation[] {
  return realisations.filter((r) => r.slug !== currentSlug).slice(0, limit);
}
