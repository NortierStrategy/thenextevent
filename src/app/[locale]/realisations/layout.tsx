import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "R\u00e9alisations \u2014 Portfolio \u00c9v\u00e9nements",
  description:
    "D\u00e9couvrez nos r\u00e9alisations et \u00e9v\u00e9nements pass\u00e9s. Portfolio de missions de staffing \u00e9v\u00e9nementiel pour les plus grandes marques.",
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
