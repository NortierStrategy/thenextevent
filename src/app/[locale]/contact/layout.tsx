import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact \u2014 Demander un Devis",
  description:
    "Contactez The Next Event pour votre projet \u00e9v\u00e9nementiel. Devis personnalis\u00e9 sous 24h pour le staffing de vos \u00e9v\u00e9nements de luxe.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
