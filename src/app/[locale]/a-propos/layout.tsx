import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "\u00c0 Propos \u2014 Agence de R\u00e9gisseurs \u00c9v\u00e9nementiels de Luxe Paris",
  description:
    "D\u00e9couvrez l'histoire de The Next Event, agence de r\u00e9gisseurs \u00e9v\u00e9nementiels haut de gamme fond\u00e9e \u00e0 Paris en 2007. Logistique luxe, service gants blancs et 300+ r\u00e9gisseurs d'exception.",
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
