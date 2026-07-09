#!/usr/bin/env node
/**
 * Post-build smoke check: sitemap.xml must exist and use the configured public origin.
 * Fails CI/build when NEXT_PUBLIC_SITE_URL is missing on production builds.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sitemapBodyPath = join(root, ".next", "server", "app", "sitemap.xml.body");

if (!existsSync(sitemapBodyPath)) {
  console.error("verify-seo-surfaces: missing .next/server/app/sitemap.xml.body — run npm run build first");
  process.exit(1);
}

const body = readFileSync(sitemapBodyPath, "utf8");
const vercelEnv = process.env.VERCEL_ENV;
const explicitOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

if (vercelEnv === "preview") {
  if (body.includes("<loc>")) {
    console.error("verify-seo-surfaces: preview sitemap should not list indexable URLs");
    process.exit(1);
  }
  console.log("verify-seo-surfaces: preview build — empty sitemap OK");
  process.exit(0);
}

const expectedOrigin = explicitOrigin
  ? explicitOrigin.startsWith("http")
    ? explicitOrigin
    : `https://${explicitOrigin}`
  : productionHost
    ? `https://${productionHost.replace(/^https?:\/\//, "")}`
    : null;

if (!expectedOrigin) {
  const urlCount = (body.match(/<loc>/g) ?? []).length;
  if (urlCount === 0) {
    console.error("verify-seo-surfaces: sitemap has no URLs");
    process.exit(1);
  }
  console.log(`verify-seo-surfaces: OK (local build, ${urlCount} URLs)`);
  process.exit(0);
}

if (vercelEnv === "production" && !expectedOrigin) {
  console.error(
    "verify-seo-surfaces: set NEXT_PUBLIC_SITE_URL (or VERCEL_PROJECT_PRODUCTION_URL) on production builds"
  );
  process.exit(1);
}

if (expectedOrigin && !body.includes(`<loc>${expectedOrigin}/</loc>`)) {
  console.error(
    `verify-seo-surfaces: sitemap missing homepage for ${expectedOrigin}/ — check NEXT_PUBLIC_SITE_URL at build time`
  );
  process.exit(1);
}

const requiredPaths = ["/work", "/thinking", "/about", "/notes/design-doesnt-end-in-figma", "/work/rivva"];
for (const path of requiredPaths) {
  const needle = expectedOrigin ? `<loc>${expectedOrigin}${path}</loc>` : `<loc>${path}</loc>`;
  if (!body.includes(needle) && expectedOrigin) {
    console.error(`verify-seo-surfaces: sitemap missing ${expectedOrigin}${path}`);
    process.exit(1);
  }
}

console.log(
  `verify-seo-surfaces: OK${expectedOrigin ? ` (${expectedOrigin}, ${(body.match(/<loc>/g) ?? []).length} URLs)` : ""}`
);
