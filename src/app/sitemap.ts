import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thenextevent.fr";
  const locales = ["fr", "en"];

  const routes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/realisations", priority: 0.7 },
    { path: "/a-propos", priority: 0.8 },
    { path: "/rejoindre", priority: 0.8 },
    { path: "/contact", priority: 0.9 },
    { path: "/blog", priority: 0.8 },
    { path: "/cgv", priority: 0.3 },
    { path: "/mentions-legales", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
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
