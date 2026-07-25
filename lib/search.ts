/**
 * Client-side search index (V2.3) — projects, thinking, field notes, and static pages.
 */

import { fieldNotes } from "@/lib/fieldNotes";
import { getListableProjects, getProjectHref } from "@/lib/projects";
import {
  conversationItems,
  recognitionItems,
  writingItems,
} from "@/lib/thinking";

export type SearchResultKind = "page" | "project" | "writing" | "press" | "conversation" | "note";

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
    subtitle: "John Ohio — Product Design Lead",
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
    title: "Writing",
    subtitle: "Essays and talks by theme",
    href: "/thinking",
    keywords: "thinking writing press conversations essays talks",
  },
  {
    id: "page:contact",
    kind: "page",
    title: "Contact",
    subtitle: "Get in touch",
    href: "/contact",
    keywords: "contact email hire talk linkedin",
  },
  {
    id: "page:anchor",
    kind: "page",
    title: "Anchor",
    subtitle: "AI-assisted engineering approach for project understanding",
    href: "/anchor",
    keywords: "anchor ai-assisted engineering project understanding continue instead reconstruct",
  },
  {
    id: "page:anchor-article-understanding-before-code",
    kind: "page",
    title: "Projects Become Harder to Understand Before They Become Harder to Code",
    subtitle: "Anchor article",
    href: "/anchor/articles/projects-become-harder-to-understand-before-they-become-harder-to-code",
    keywords: "anchor article project understanding ai-assisted engineering coherent sessions tools contributors",
  },
];

function projectResults(): SearchResult[] {
  return getListableProjects().map((p) => ({
    id: `project:${p.slug}`,
    kind: "project",
    title: p.title,
    subtitle: p.subtitle,
    href: getProjectHref(p.slug),
    keywords: [p.title, p.subtitle, p.category, p.company, p.summary, ...p.tags]
      .join(" ")
      .toLowerCase(),
  }));
}

function fieldNoteResults(): SearchResult[] {
  return fieldNotes.map((note) => ({
    id: `note:${note.slug}`,
    kind: "note" as const,
    title: note.title,
    subtitle: "Field note",
    href: `/notes/${note.slug}`,
    keywords: [note.title, note.subtitle, note.description, ...note.keywords].join(" ").toLowerCase(),
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
  cachedIndex = [...STATIC_PAGES, ...projectResults(), ...fieldNoteResults(), ...thinkingResults()];
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
