import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const baseUrl = "https://thenextevent.fr";

  return {
    title: isEn
      ? "About — Luxury Event Management Agency Paris"
      : "À Propos — Agence de Régisseurs Événementiels de Luxe Paris",
    description: isEn
      ? "Discover The Next Event, premium event management agency founded in Paris in 2007. 300+ elite stage managers, white-glove service for luxury events."
      : "Découvrez l'histoire de The Next Event, agence de régisseurs événementiels haut de gamme fondée à Paris en 2007. 300+ régisseurs d'exception, service gants blancs.",
    alternates: {
      canonical: `${baseUrl}/${locale}/a-propos`,
      languages: {
        fr: `${baseUrl}/fr/a-propos`,
        en: `${baseUrl}/en/a-propos`,
      },
    },
    openGraph: {
      title: isEn
        ? "About The Next Event — Since 2007"
        : "À Propos de The Next Event — Depuis 2007",
      description: isEn
        ? "Elite event management agency founded in Paris in 2007. Porsche, Dior, Google, LinkedIn trust us."
        : "Agence de régisseurs événementiels de prestige fondée à Paris en 2007. Porsche, Dior, Google, LinkedIn nous font confiance.",
      url: `${baseUrl}/${locale}/a-propos`,
      images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
