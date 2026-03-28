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
      ? "Contact — Request a Quote"
      : "Contact — Demander un Devis",
    description: isEn
      ? "Contact The Next Event for your event project. Custom quote within 24h for luxury event staffing in Paris and internationally."
      : "Contactez The Next Event pour votre projet événementiel. Devis personnalisé sous 24h pour le staffing de vos événements de luxe.",
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        fr: `${baseUrl}/fr/contact`,
        en: `${baseUrl}/en/contact`,
      },
    },
    openGraph: {
      title: isEn ? "Contact The Next Event" : "Contacter The Next Event",
      description: isEn
        ? "Get a custom quote within 24h. Call +33 6 60 38 80 27."
        : "Obtenez un devis personnalisé sous 24h. Appelez le 06 60 38 80 27.",
      url: `${baseUrl}/${locale}/contact`,
      images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630, alt: isEn ? "Contact The Next Event" : "Contacter The Next Event" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Contact The Next Event" : "Contacter The Next Event",
      description: isEn
        ? "Get a custom quote within 24h. Call +33 6 60 38 80 27."
        : "Obtenez un devis personnalisé sous 24h. Appelez le 06 60 38 80 27.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
