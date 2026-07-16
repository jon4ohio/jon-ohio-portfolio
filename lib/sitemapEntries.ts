import type { MetadataRoute } from "next";
import { getFieldNoteSlugs } from "@/lib/fieldNotes";
import { getListableProjects, getProjectHref } from "@/lib/projects";
import { getSiteUrl } from "@/lib/siteUrl";

/** Indexable static routes for sitemap.xml. */
const STATIC_PATHS = ["/", "/work", "/thinking", "/about", "/contact"] as const;

const STATIC_PRIORITIES: Record<(typeof STATIC_PATHS)[number], number> = {
  "/": 1,
  "/work": 0.9,
  "/thinking": 0.82,
  "/about": 0.7,
  "/contact": 0.65,
};

const STATIC_CHANGE_FREQUENCY: Record<
  (typeof STATIC_PATHS)[number],
  MetadataRoute.Sitemap[number]["changeFrequency"]
> = {
  "/": "monthly",
  "/work": "monthly",
  "/thinking": "monthly",
  "/about": "yearly",
  "/contact": "yearly",
};

/** Build sitemap entries for production deployments. */
export function buildSitemapEntries(now = new Date()): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${baseUrl}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: STATIC_CHANGE_FREQUENCY[path],
    priority: STATIC_PRIORITIES[path],
  }));

  const noteEntries = getFieldNoteSlugs().map((slug) => ({
    url: `${baseUrl}/notes/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.85,
  }));

  const projectEntries = getListableProjects().map((project) => ({
    url: `${baseUrl}${getProjectHref(project.slug)}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...noteEntries, ...projectEntries];
}
