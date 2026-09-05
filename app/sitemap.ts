import type { MetadataRoute } from "next";
import { SITE_URL, categorySeo } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...Object.values(categorySeo).map((category) => ({
      url: `${SITE_URL}${category.path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
