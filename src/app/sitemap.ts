import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllRealisations } from "@/data/realisations";
import { getAllServices } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thenextevent.fr";
  const locales = ["fr", "en"] as const;
  // Date statique du dernier déploiement (évite que Google voie une date différente à chaque crawl)
  const lastDeploy = new Date("2026-03-30");

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/realisations", priority: 0.7, changeFrequency: "monthly" },
    { path: "/a-propos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/rejoindre", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/cgv", priority: 0.3, changeFrequency: "yearly" },
    { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages — one entry per locale with hreflang alternates
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: lastDeploy,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr${route.path}`,
            en: `${baseUrl}/en${route.path}`,
          },
        },
      });
    }
  }

  // Blog articles
  const posts = getAllPosts();
  for (const locale of locales) {
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
          },
        },
      });
    }
  }

  // Services detail pages
  const serviceItems = getAllServices();
  for (const locale of locales) {
    for (const item of serviceItems) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${item.slug}`,
        lastModified: lastDeploy,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/services/${item.slug}`,
            en: `${baseUrl}/en/services/${item.slug}`,
          },
        },
      });
    }
  }

  // Realisations detail pages
  const realisationItems = getAllRealisations();
  for (const locale of locales) {
    for (const item of realisationItems) {
      entries.push({
        url: `${baseUrl}/${locale}/realisations/${item.slug}`,
        lastModified: lastDeploy,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/realisations/${item.slug}`,
            en: `${baseUrl}/en/realisations/${item.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
