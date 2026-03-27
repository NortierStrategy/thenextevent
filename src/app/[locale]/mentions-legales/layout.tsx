import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isEn = params.locale === "en";
  return {
    title: isEn
      ? "Legal Notice — The Next Event"
      : "Mentions légales — The Next Event",
    description: isEn
      ? "Legal notice of The Next Event, luxury event management agency in Paris. SIREN, hosting, publication manager."
      : "Mentions légales de The Next Event, agence de régisseurs événementiels à Paris. SIREN, hébergeur, responsable de publication.",
  };
}

export default function MentionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
