/**
 * Client-side search index (V2.3) — projects, thinking, and static pages.
 */

import { getListableProjects } from "@/lib/projects";
import {
  conversationItems,
  recognitionItems,
  writingItems,
} from "@/lib/thinking";

export type SearchResultKind = "page" | "project" | "writing" | "press" | "conversation";

export interface SearchResult {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle?: string;
  href: string;
  keywords: string;
}

const STATIC_PAGES: SearchResult[] = [
  {
    id: "page:home",
    kind: "page",
    title: "Home",
    subtitle: "John Ohio — Lead Product Designer",
    href: "/",
    keywords: "home portfolio john ohio",
  },
  {
    id: "page:work",
    kind: "page",
    title: "Case Studies",
    subtitle: "Case studies and systems work",
    href: "/work",
    keywords: "case studies projects systems",
  },
  {
    id: "page:about",
    kind: "page",
    title: "About",
    subtitle: "Background and approach",
    href: "/about",
    keywords: "about bio background",
  },
  {
    id: "page:thinking",
    kind: "page",
    title: "Thinking",
    subtitle: "Writing, press, and conversations",
    href: "/thinking",
    keywords: "thinking writing press conversations",
  },
];

function projectResults(): SearchResult[] {
  return getListableProjects().map((p) => ({
    id: `project:${p.slug}`,
    kind: "project",
    title: p.title,
    subtitle: p.subtitle,
    href: `/work/${p.slug}`,
    keywords: [p.title, p.subtitle, p.category, p.company, p.summary, ...p.tags]
      .join(" ")
      .toLowerCase(),
  }));
}

function thinkingResults(): SearchResult[] {
  const writing = writingItems.map((w) => ({
    id: `writing:${w.id}`,
    kind: "writing" as const,
    title: w.title,
    subtitle: "Writing",
    href: w.href,
    keywords: `${w.title} writing substack`.toLowerCase(),
  }));
  const press = recognitionItems.map((r) => ({
    id: `press:${r.id}`,
    kind: "press" as const,
    title: r.title,
    subtitle: r.outlet,
    href: r.href,
    keywords: `${r.title} ${r.outlet} ${r.description}`.toLowerCase(),
  }));
  const conversations = conversationItems.map((c) => ({
    id: `conversation:${c.id}`,
    kind: "conversation" as const,
    title: c.title,
    subtitle: c.outlet,
    href: c.href,
    keywords: `${c.title} ${c.outlet} conversation`.toLowerCase(),
  }));
  return [...writing, ...press, ...conversations];
}

let cachedIndex: SearchResult[] | null = null;

export function getSearchIndex(): SearchResult[] {
  if (cachedIndex) return cachedIndex;
  cachedIndex = [...STATIC_PAGES, ...projectResults(), ...thinkingResults()];
  return cachedIndex;
}

export function searchContent(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getSearchIndex()
    .map((item) => {
      const haystack = `${item.title} ${item.subtitle ?? ""} ${item.keywords}`.toLowerCase();
      const score =
        (item.title.toLowerCase().startsWith(q) ? 4 : 0) +
        (haystack.includes(q) ? 2 : 0) +
        q.split(/\s+/).filter((token) => haystack.includes(token)).length;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function toContentIndexJson(): string {
  return JSON.stringify(
    {
      version: "2.3.0",
      generatedAt: new Date().toISOString(),
      items: getSearchIndex(),
    },
    null,
    2,
  );
}
