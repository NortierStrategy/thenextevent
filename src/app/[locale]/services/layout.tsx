import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services \u2014 Staffing \u00c9v\u00e9nementiel Premium",
  description:
    "R\u00e9gisseurs, h\u00f4tes premium et coordination g\u00e9n\u00e9rale. D\u00e9couvrez nos expertises en staffing \u00e9v\u00e9nementiel de luxe \u00e0 Paris.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
