import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thenextevent.fr";
  const locales = ["fr", "en"];
  // Date statique du dernier déploiement (évite que Google voie une date différente à chaque crawl)
  const lastDeploy = new Date("2026-03-28");

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

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: lastDeploy,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
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
      });
    }
  }

  return entries;
}
