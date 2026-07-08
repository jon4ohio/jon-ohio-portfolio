import type { MetadataRoute } from "next";
import { getFieldNoteSlugs } from "@/lib/fieldNotes";
import { getListableProjects } from "@/lib/projects";
import { getSiteUrl, isIndexableDeployment } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment()) return [];

  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/thinking`, lastModified: now, changeFrequency: "monthly", priority: 0.82 },
    ...getFieldNoteSlugs().map((slug) => ({
      url: `${baseUrl}/notes/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.85,
    })),
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    ...getListableProjects().map((p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
