import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://thenextevent.fr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/images/clients/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
