import type { Locale } from "@/lib/i18n";

interface SchemaOrgProps {
  locale: Locale;
}

export default function SchemaOrg({ locale }: SchemaOrgProps) {
  const isEn = locale === "en";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "EventPlanningBusiness",
    "@id": "https://thenextevent.fr/#organization",
    name: "The Next Event",
    alternateName: "TNE",
    description: isEn
      ? "Elite event management agency for fashion shows, galas, product launches and summits."
      : "Agence de r\u00e9gisseurs \u00e9v\u00e9nementiels de prestige pour d\u00e9fil\u00e9s, galas, lancements et sommets.",
    url: `https://thenextevent.fr/${locale}`,
    telephone: "+33660388027",
    email: "nicola@thenextevent.fr",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+33660388027",
      contactType: isEn ? "customer service" : "service client",
      availableLanguage: ["French", "English"],
      areaServed: ["FR", "EU"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "66 rue du Cherche-Midi",
      addressLocality: "Paris",
      postalCode: "75006",
      addressRegion: "\u00cele-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.8476",
      longitude: "2.3265",
    },
    areaServed: ["Paris", "France", "International"],
    priceRange: "\u20ac\u20ac\u20ac",
    foundingDate: "2007",
    founder: {
      "@type": "Person",
      name: "Nicola Nortier",
      jobTitle: isEn ? "Founder & Director" : "Fondateur & Directeur",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 300,
      description: isEn
        ? "Network of 300+ event production managers"
        : "R\u00e9seau de 300+ r\u00e9gisseurs \u00e9v\u00e9nementiels",
    },
    knowsAbout: ["Event Management", "Fashion Shows", "Luxury Events", "Corporate Events"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEn
        ? "Event production management services"
        : "Services de r\u00e9gisseurs \u00e9v\u00e9nementiels",
      itemListElement: isEn
        ? [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Luxury event stage managers in Paris",
                description:
                  "Providing high-end event production managers for your luxury events in Paris. White-glove service, premium logistics and bespoke coordination.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Premium event logistics",
                description:
                  "Luxury logistics and white-glove service for exceptional events: secure transport, vendor coordination, premium setup and teardown.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Event production management",
                description:
                  "Turnkey production management for fashion shows, galas, conferences, roadshows and high-end corporate events in Paris and internationally.",
              },
            },
          ]
        : [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "R\u00e9gisseur \u00e9v\u00e9nementiel de luxe \u00e0 Paris",
                description:
                  "Mise \u00e0 disposition de r\u00e9gisseurs \u00e9v\u00e9nementiels haut de gamme pour vos \u00e9v\u00e9nements de luxe \u00e0 Paris. Service gants blancs, logistique premium et coordination sur-mesure.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Logistique haut de gamme \u00e9v\u00e9nementielle",
                description:
                  "Logistique luxe et gants blancs pour \u00e9v\u00e9nements d'exception : transport s\u00e9curis\u00e9, coordination prestataires, montage et d\u00e9montage premium.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Direction de production \u00e9v\u00e9nementielle",
                description:
                  "Direction de production cl\u00e9 en main pour d\u00e9fil\u00e9s de mode, galas, congr\u00e8s, roadshows et \u00e9v\u00e9nements corporate haut de gamme \u00e0 Paris et \u00e0 l'international.",
              },
            },
          ],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/thenextevent/",
      "https://www.instagram.com/thenextevent.fr/",
      "https://www.facebook.com/thenextevent.fr/",
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: isEn
      ? [
          {
            "@type": "Question",
            name: "What is an event stage manager and what is their role?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An event stage manager is the operational conductor of your event. They coordinate premium logistics, supervise vendors, manage setup and teardown, and ensure smooth execution on the day. At The Next Event, our event production managers in Paris are trained in the codes of luxury and deliver a white-glove service at the most demanding events.",
            },
          },
          {
            "@type": "Question",
            name: "How can I find luxury event production managers in Paris?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Next Event is the leading agency for luxury event production managers in Paris. With a network of 300+ high-end event managers, we mobilise the best profiles within 48 hours for your exceptional events. Contact us at +33 6 60 38 80 27.",
            },
          },
          {
            "@type": "Question",
            name: "What is white-glove service in events?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "White-glove service refers to premium logistics with extreme attention to detail: discretion, operational elegance, anticipation and surgical precision. Our luxury event production managers embody this philosophy at every event in Paris and internationally.",
            },
          },
          {
            "@type": "Question",
            name: "How quickly can you mobilize your teams?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We deploy our event managers within 24 to 48 hours across France and Europe. For planned events, we recommend a briefing 2 weeks before the event.",
            },
          },
          {
            "@type": "Question",
            name: "What types of events do you cover?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fashion shows, product launches, galas, conferences, corporate summits, luxury weddings, trade shows and high-end private events.",
            },
          },
          {
            "@type": "Question",
            name: "Do you operate internationally?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Our teams operate across Europe and regularly support events in London, Milan, Geneva and beyond.",
            },
          },
          {
            "@type": "Question",
            name: "How does your pricing work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Each project receives a custom quote based on the number of event managers, duration and complexity. Request your proposal within 24h through our contact form.",
            },
          },
          {
            "@type": "Question",
            name: "What is your team's experience?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our event managers average 8 years of experience in luxury events. Each profile is carefully selected, trained and briefed specifically for your event.",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            name: "Qu'est-ce qu'un r\u00e9gisseur \u00e9v\u00e9nementiel et quel est son r\u00f4le ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Un r\u00e9gisseur \u00e9v\u00e9nementiel est le chef d'orchestre op\u00e9rationnel de votre \u00e9v\u00e9nement. Il coordonne la logistique haut de gamme, supervise les prestataires et garantit le bon d\u00e9roulement le jour J. Chez The Next Event, nos r\u00e9gisseurs \u00e9v\u00e9nementiels \u00e0 Paris sont form\u00e9s aux codes du luxe et interviennent avec un service gants blancs.",
            },
          },
          {
            "@type": "Question",
            name: "Comment trouver des r\u00e9gisseurs \u00e9v\u00e9nementiels de luxe \u00e0 Paris ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Next Event est l'agence de r\u00e9f\u00e9rence pour les r\u00e9gisseurs \u00e9v\u00e9nementiels de luxe \u00e0 Paris. Avec un r\u00e9seau de 300+ r\u00e9gisseurs haut de gamme, nous mobilisons les meilleurs profils sous 48h pour vos \u00e9v\u00e9nements d'exception. Contactez-nous au +33 6 60 38 80 27.",
            },
          },
          {
            "@type": "Question",
            name: "Qu'est-ce que le service gants blancs en \u00e9v\u00e9nementiel ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Le service gants blancs d\u00e9signe une logistique haut de gamme avec une attention extr\u00eame au d\u00e9tail : discr\u00e9tion, \u00e9l\u00e9gance op\u00e9rationnelle, anticipation et pr\u00e9cision chirurgicale. Nos r\u00e9gisseurs \u00e9v\u00e9nementiels de luxe incarnent cette philosophie sur chaque \u00e9v\u00e9nement \u00e0 Paris et \u00e0 l'international.",
            },
          },
          {
            "@type": "Question",
            name: "Quel est le d\u00e9lai de mobilisation de vos \u00e9quipes ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nous d\u00e9ployons nos r\u00e9gisseurs sous 24 \u00e0 48 heures partout en France et en Europe. Pour les \u00e9v\u00e9nements planifi\u00e9s, nous recommandons un briefing 2 semaines avant le jour J.",
            },
          },
          {
            "@type": "Question",
            name: "Quels types d'\u00e9v\u00e9nements couvrez-vous ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "D\u00e9fil\u00e9s de mode, lancements de produits, galas, conf\u00e9rences, sommets corporate, mariages de prestige, salons professionnels et \u00e9v\u00e9nements priv\u00e9s haut de gamme.",
            },
          },
          {
            "@type": "Question",
            name: "Intervenez-vous \u00e0 l'international ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui. Nos \u00e9quipes interviennent dans toute l'Europe et accompagnent r\u00e9guli\u00e8rement des \u00e9v\u00e9nements \u00e0 Londres, Milan, Gen\u00e8ve et au-del\u00e0.",
            },
          },
          {
            "@type": "Question",
            name: "Comment fonctionne votre tarification ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Chaque projet fait l'objet d'un devis personnalis\u00e9 selon le nombre de r\u00e9gisseurs, la dur\u00e9e et la complexit\u00e9 de l'\u00e9v\u00e9nement. Demandez votre proposition sous 24h via notre formulaire.",
            },
          },
          {
            "@type": "Question",
            name: "Quelle est l'exp\u00e9rience de vos r\u00e9gisseurs ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nos r\u00e9gisseurs cumulent en moyenne 8 ans d'exp\u00e9rience dans l'\u00e9v\u00e9nementiel luxe. Chaque profil est s\u00e9lectionn\u00e9, form\u00e9 et brief\u00e9 sp\u00e9cifiquement pour votre \u00e9v\u00e9nement.",
            },
          },
        ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
