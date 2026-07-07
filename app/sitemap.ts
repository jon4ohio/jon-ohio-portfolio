import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getSiteUrl, isIndexableDeployment } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment()) return [];

  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/thinking`, lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    ...projects.map((p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
