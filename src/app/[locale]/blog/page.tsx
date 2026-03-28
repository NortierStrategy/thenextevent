import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogListing from "@/components/blog/BlogListing";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEN = locale === "en";
  const baseUrl = "https://thenextevent.fr";

  return {
    title: isEN
      ? "Blog — The Next Event | Luxury Event Insights"
      : "Blog — The Next Event | Coulisses & expertise événementielle",
    description: isEN
      ? "Insights, trends and behind-the-scenes stories from luxury event production. Stage management expertise from Paris."
      : "Coulisses, tendances et expertise de la production événementielle luxe. Régisseurs événementiels à Paris.",
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: { fr: `${baseUrl}/fr/blog`, en: `${baseUrl}/en/blog` },
    },
    openGraph: {
      title: isEN ? "Blog — The Next Event" : "Blog — The Next Event",
      description: isEN
        ? "Luxury event production insights from Paris"
        : "Coulisses & expertise événementielle luxe depuis Paris",
      url: `${baseUrl}/${locale}/blog`,
      siteName: "The Next Event",
      locale: isEN ? "en_GB" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "The Next Event — Blog",
        },
      ],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getAllPosts();

  return <BlogListing posts={posts} locale={locale} />;
}
