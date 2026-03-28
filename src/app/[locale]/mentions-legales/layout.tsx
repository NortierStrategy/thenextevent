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
      ? "Legal Notice — The Next Event"
      : "Mentions Légales — The Next Event",
    description: isEn
      ? "Legal notice of The Next Event, luxury event management agency in Paris. SIREN, hosting, publication manager."
      : "Mentions légales de The Next Event, agence de régisseurs événementiels à Paris. SIREN, hébergeur, responsable de publication.",
    alternates: {
      canonical: `${baseUrl}/${locale}/mentions-legales`,
      languages: {
        fr: `${baseUrl}/fr/mentions-legales`,
        en: `${baseUrl}/en/mentions-legales`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default function MentionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
