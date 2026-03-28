import type { Metadata } from "next";
import ClientLayout from "@/components/layout/ClientLayout";
import SchemaOrg from "@/components/layout/SchemaOrg";
import LangSetter from "@/components/layout/LangSetter";
import { getDictionary, type Locale, locales } from "@/lib/i18n";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEn = locale === "en";

  return {
    metadataBase: new URL("https://thenextevent.fr"),
    title: {
      default: isEn
        ? "The Next Event — Elite Event Managers for Prestigious Events in Paris"
        : "The Next Event — Régisseurs d'élite pour événements de prestige à Paris",
      template: isEn
        ? "%s | The Next Event"
        : "%s | The Next Event",
    },
    description: isEn
      ? "300+ event managers deployed within 24h for fashion shows, galas, launches and summits. LVMH, Dior, Porsche have trusted us since 2007."
      : "300+ régisseurs événementiels déployés en 24h pour défilés, galas, lancements et sommets. LVMH, Dior, Porsche nous font confiance depuis 2007.",
    keywords: isEn
      ? [
          "event stage manager",
          "event managers paris",
          "luxury event logistics",
          "white-glove event service",
          "premium event staffing",
          "event production paris",
          "luxury event manager",
        ]
      : [
          "r\u00e9gisseur \u00e9v\u00e9nementiel",
          "r\u00e9gisseurs \u00e9v\u00e9nementiel",
          "r\u00e9gisseurs paris",
          "r\u00e9gisseurs luxe",
          "r\u00e9gisseur haut de gamme",
          "gants blancs",
          "logistique haut de gamme",
          "logistique luxe",
          "staffing \u00e9v\u00e9nementiel paris",
        ],
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "fr_FR",
      url: `https://thenextevent.fr/${locale}`,
      siteName: "The Next Event",
      title: isEn
        ? "The Next Event — Event Excellence"
        : "The Next Event — L'excellence événementielle",
      description: isEn
        ? "Elite managers for your exceptional events. Proposal within 24h."
        : "Régisseurs de prestige pour vos événements d'exception. Proposition sous 24h.",
      images: [
        {
          url: "https://thenextevent.fr/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "The Next Event",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://thenextevent.fr/images/og-image.jpg"],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/images/apple-touch-icon.png",
    },
    alternates: {
      canonical: `https://thenextevent.fr/${locale}`,
      languages: {
        fr: "https://thenextevent.fr/fr",
        en: "https://thenextevent.fr/en",
      },
    },
    robots: { index: true, follow: true },
    other: {
      "theme-color": "#0A0A0A",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <LangSetter locale={locale} />
      <SchemaOrg locale={locale} />
      <ClientLayout dict={dict} locale={locale}>
        {children}
      </ClientLayout>
    </>
  );
}
