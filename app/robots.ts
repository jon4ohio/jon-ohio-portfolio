import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexableDeployment } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  const baseUrl = getSiteUrl();

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
