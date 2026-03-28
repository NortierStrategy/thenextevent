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
      ? "Services — Premium Event Staffing"
      : "Services — Staffing Événementiel Premium",
    description: isEn
      ? "Elite event managers, premium hosts and full event coordination. Discover our luxury event staffing expertise in Paris and internationally."
      : "Régisseurs d'élite, hôtes premium et coordination générale. Découvrez nos expertises en staffing événementiel de luxe à Paris et à l'international.",
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: {
        fr: `${baseUrl}/fr/services`,
        en: `${baseUrl}/en/services`,
      },
    },
    openGraph: {
      title: isEn ? "Our Event Staffing Services" : "Nos Services de Staffing Événementiel",
      description: isEn
        ? "300+ elite event managers deployed within 24h. White-glove service for luxury events."
        : "300+ régisseurs d'élite déployés en 24h. Service gants blancs pour événements de luxe.",
      url: `${baseUrl}/${locale}/services`,
      images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630, alt: isEn ? "The Next Event — Event Staffing Services" : "The Next Event — Services de Staffing Événementiel" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Our Event Staffing Services" : "Nos Services de Staffing Événementiel",
      description: isEn
        ? "300+ elite event managers deployed within 24h. White-glove service for luxury events."
        : "300+ régisseurs d'élite déployés en 24h. Service gants blancs pour événements de luxe.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
