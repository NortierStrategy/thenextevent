import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getAllServices, getServiceBySlug, getRelatedServices } from "@/data/services";
import { getPostBySlug } from "@/lib/blog";
import ServiceArticle from "@/components/services/ServiceArticle";

export async function generateStaticParams() {
  const items = getAllServices();
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
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const isEN = locale === "en";
  const baseUrl = "https://thenextevent.fr";
  const data = isEN ? service.en : service.fr;

  return {
    title: `${data.title} \u2014 The Next Event`,
    description: data.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/services/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/services/${slug}`,
        en: `${baseUrl}/en/services/${slug}`,
      },
    },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: `${baseUrl}/${locale}/services/${slug}`,
      siteName: "The Next Event",
      locale: isEN ? "en_GB" : "fr_FR",
      type: "website",
      images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630, alt: data.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
      images: [`${baseUrl}/images/og-image.jpg`],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const dict = await getDictionary(locale as Locale);
  const related = getRelatedServices(slug);
  const relatedPosts = (service.relatedBlogSlugs || [])
    .map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return <ServiceArticle service={service} related={related} relatedPosts={relatedPosts} dict={dict} locale={locale} />;
}
