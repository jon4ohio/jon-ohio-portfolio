function normalizeOrigin(url: string): string {
  const trimmed = url.replace(/\/$/, "");
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

/** Stable public origin for canonical URLs, robots.txt, and sitemap.xml. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return normalizeOrigin(explicit);

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) return normalizeOrigin(productionHost);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl && process.env.VERCEL_ENV === "production") {
    return normalizeOrigin(vercelUrl);
  }

  if (vercelUrl) return normalizeOrigin(vercelUrl);

  return "http://localhost:3000";
}

/** Only production deployments should emit indexable SEO surfaces. */
export function isIndexableDeployment(): boolean {
  if (process.env.VERCEL_ENV === "preview") return false;
  return true;
}
