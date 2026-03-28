import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import BlogArticle from "@/components/blog/BlogArticle";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales = ["fr", "en"];
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const isEN = locale === "en";
  const baseUrl = "https://thenextevent.fr";
  const title = isEN ? post.titleEN : post.title;
  const description = isEN ? post.excerptEN : post.excerpt;

  return {
    title: `${title} — The Next Event`,
    description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: {
        fr: `${baseUrl}/fr/blog/${slug}`,
        en: `${baseUrl}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      siteName: "The Next Event",
      locale: isEN ? "en_GB" : "fr_FR",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: `${baseUrl}${post.image}`, width: 1200, height: 630, alt: title }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(locale as Locale);
  const relatedPosts = getRelatedPosts(slug, 2);

  return (
    <BlogArticle
      post={post}
      relatedPosts={relatedPosts}
      dict={dict}
      locale={locale}
    />
  );
}
