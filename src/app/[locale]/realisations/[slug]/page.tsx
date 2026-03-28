import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import {
  getAllRealisations,
  getRealisationBySlug,
  getOtherRealisations,
} from "@/data/realisations";
import RealisationArticle from "@/components/realisations/RealisationArticle";

export async function generateStaticParams() {
  const items = getAllRealisations();
  const locales = ["fr", "en"];
  return locales.flatMap((locale) =>
    items.map((item) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getRealisationBySlug(slug);
  if (!item) return {};

  const isEN = locale === "en";
  const baseUrl = "https://thenextevent.fr";
  const data = isEN ? item.en : item.fr;
  const desc = data.description.split("\n")[0].slice(0, 160);

  return {
    title: `${data.title} \u2014 The Next Event`,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${locale}/realisations/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/realisations/${slug}`,
        en: `${baseUrl}/en/realisations/${slug}`,
      },
    },
    openGraph: {
      title: data.title,
      description: desc,
      url: `${baseUrl}/${locale}/realisations/${slug}`,
      siteName: "The Next Event",
      locale: isEN ? "en_GB" : "fr_FR",
      type: "article",
      images: [{ url: `${baseUrl}${item.image}`, width: 1200, height: 630, alt: data.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: desc,
      images: [`${baseUrl}${item.image}`],
    },
  };
}

export default async function RealisationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getRealisationBySlug(slug);
  if (!item) notFound();

  const dict = await getDictionary(locale as Locale);
  const otherRealisations = getOtherRealisations(slug, 3);

  return (
    <RealisationArticle
      item={item}
      others={otherRealisations}
      dict={dict}
      locale={locale}
    />
  );
}
