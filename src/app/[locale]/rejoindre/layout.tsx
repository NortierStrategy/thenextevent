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
      ? "Join Our Team — Become a Luxury Event Manager in Paris"
      : "Devenir Régisseur Événementiel de Luxe à Paris — Rejoindre TNE",
    description: isEn
      ? "Join The Next Event's network of 300+ elite event managers in Paris. Prestigious events, attractive pay, total flexibility."
      : "Rejoignez le réseau de 300+ régisseurs événementiels haut de gamme de The Next Event à Paris. Événements prestigieux, rémunération attractive, flexibilité totale.",
    alternates: {
      canonical: `${baseUrl}/${locale}/rejoindre`,
      languages: {
        fr: `${baseUrl}/fr/rejoindre`,
        en: `${baseUrl}/en/rejoindre`,
      },
    },
    openGraph: {
      title: isEn
        ? "Join The Next Event — Elite Event Managers"
        : "Rejoindre The Next Event — Régisseurs d'élite",
      description: isEn
        ? "Join our network of premium event managers. Prestigious missions for luxury brands."
        : "Intégrez notre réseau de régisseurs premium. Missions prestigieuses pour les plus grandes marques de luxe.",
      url: `${baseUrl}/${locale}/rejoindre`,
      images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default function RejoindreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
