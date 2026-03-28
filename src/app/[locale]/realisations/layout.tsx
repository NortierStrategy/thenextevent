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
      ? "Portfolio — Luxury Event Projects"
      : "Réalisations — Portfolio Événements",
    description: isEn
      ? "Discover our past events and luxury event portfolio. Porsche, Dior, Google, LinkedIn, Qatar Airways and more trusted The Next Event."
      : "Découvrez nos réalisations et événements passés. Porsche, Dior, Google, LinkedIn, Qatar Airways et bien d'autres nous ont fait confiance.",
    alternates: {
      canonical: `${baseUrl}/${locale}/realisations`,
      languages: {
        fr: `${baseUrl}/fr/realisations`,
        en: `${baseUrl}/en/realisations`,
      },
    },
    openGraph: {
      title: isEn ? "Our Event Portfolio" : "Nos Réalisations Événementielles",
      description: isEn
        ? "500+ luxury events produced since 2007. Fashion shows, galas, launches, summits."
        : "500+ événements de luxe produits depuis 2007. Défilés, galas, lancements, sommets.",
      url: `${baseUrl}/${locale}/realisations`,
      images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630, alt: isEn ? "The Next Event — Event Portfolio" : "The Next Event — Portfolio Événementiel" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Our Event Portfolio" : "Nos Réalisations Événementielles",
      description: isEn
        ? "500+ luxury events produced since 2007. Fashion shows, galas, launches, summits."
        : "500+ événements de luxe produits depuis 2007. Défilés, galas, lancements, sommets.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
