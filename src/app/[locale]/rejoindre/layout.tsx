import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devenir R\u00e9gisseur \u00c9v\u00e9nementiel de Luxe \u00e0 Paris \u2014 Rejoindre TNE",
  description:
    "Rejoignez le r\u00e9seau de r\u00e9gisseurs \u00e9v\u00e9nementiels haut de gamme de The Next Event \u00e0 Paris. Recrutement de r\u00e9gisseurs de luxe, coordinateurs et professionnels gants blancs pour des \u00e9v\u00e9nements d'exception.",
};

export default function RejoindreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
