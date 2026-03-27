import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isEn = params.locale === "en";
  return {
    title: isEn
      ? "Terms & Conditions — The Next Event"
      : "Conditions Générales de Vente — The Next Event",
    description: isEn
      ? "Terms & conditions of The Next Event. Service delivery, billing, cancellation for our event management services."
      : "CGV de The Next Event. Conditions de prestation, facturation, annulation pour nos services de régie événementielle.",
  };
}

export default function CGVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
