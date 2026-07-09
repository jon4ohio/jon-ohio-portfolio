import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/sitemapEntries";
import { isIndexableDeployment } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment()) return [];
  return buildSitemapEntries();
}
