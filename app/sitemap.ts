import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  return envUrl ?? "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/leadership`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    ...projects.map((p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}

