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
      ? "Terms & Conditions — The Next Event"
      : "Conditions Générales de Vente — The Next Event",
    description: isEn
      ? "Terms & conditions of The Next Event. Service delivery, billing, cancellation for our event management services."
      : "CGV de The Next Event. Conditions de prestation, facturation, annulation pour nos services de régie événementielle.",
    alternates: {
      canonical: `${baseUrl}/${locale}/cgv`,
      languages: {
        fr: `${baseUrl}/fr/cgv`,
        en: `${baseUrl}/en/cgv`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: isEn
        ? "Terms & Conditions — The Next Event"
        : "Conditions Générales de Vente — The Next Event",
      description: isEn
        ? "Terms & conditions of The Next Event."
        : "CGV de The Next Event.",
      url: `${baseUrl}/${locale}/cgv`,
      siteName: "The Next Event",
      images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630, alt: "The Next Event" }],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Terms & Conditions — The Next Event" : "Conditions Générales de Vente — The Next Event",
      description: isEn ? "Terms & conditions of The Next Event." : "CGV de The Next Event.",
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default function CGVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
