/**
 * Portfolio knowledge graph (V2.2) — cross-links within existing IA.
 * Nodes reference existing routes; edges express topical relationships.
 */

import { projects } from "@/lib/projects";
import {
  conversationItems,
  recognitionItems,
  writingItems,
} from "@/lib/thinking";

export type GraphNodeKind = "project" | "writing" | "press" | "conversation" | "topic";

export interface GraphNode {
  id: string;
  kind: GraphNodeKind;
  title: string;
  href: string;
  tags: string[];
}

export interface GraphEdge {
  from: string;
  to: string;
  relation: "related" | "extends" | "evidence" | "governance";
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const TOPIC_NODES: GraphNode[] = [
  {
    id: "topic:design-systems",
    kind: "topic",
    title: "Design systems",
    href: "/work/seamkit",
    tags: ["design-systems", "tokens", "governance"],
  },
  {
    id: "topic:enterprise-ux",
    kind: "topic",
    title: "Enterprise UX",
    href: "/work",
    tags: ["enterprise", "platform", "scale"],
  },
  {
    id: "topic:leadership",
    kind: "topic",
    title: "Design leadership",
    href: "/leadership",
    tags: ["leadership", "designops"],
  },
];

function projectNodes(): GraphNode[] {
  return projects.map((p) => ({
    id: `project:${p.slug}`,
    kind: "project" as const,
    title: p.title,
    href: `/work/${p.slug}`,
    tags: p.tags,
  }));
}

function thinkingNodes(): GraphNode[] {
  const press = recognitionItems.map((item) => ({
    id: `press:${item.id}`,
    kind: "press" as const,
    title: item.title,
    href: item.href,
    tags: ["press", item.outlet.toLowerCase().replace(/\s+/g, "-")],
  }));
  const writing = writingItems.map((item) => ({
    id: `writing:${item.id}`,
    kind: "writing" as const,
    title: item.title,
    href: item.href,
    tags: ["writing", item.kind],
  }));
  const conversations = conversationItems.map((item) => ({
    id: `conversation:${item.id}`,
    kind: "conversation" as const,
    title: item.title,
    href: item.href,
    tags: ["conversation", item.outlet.toLowerCase().replace(/\s+/g, "-")],
  }));
  return [...press, ...writing, ...conversations];
}

function tagEdges(nodes: GraphNode[]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  const byTag = new Map<string, string[]>();

  for (const node of nodes) {
    for (const tag of node.tags) {
      const key = tag.toLowerCase();
      const list = byTag.get(key) ?? [];
      list.push(node.id);
      byTag.set(key, list);
    }
  }

  for (const ids of byTag.values()) {
    if (ids.length < 2) continue;
    const [first, ...rest] = ids;
    for (const other of rest) {
      edges.push({ from: first, to: other, relation: "related" });
    }
  }

  return edges;
}

const MANUAL_EDGES: GraphEdge[] = [
  { from: "project:seamkit", to: "topic:design-systems", relation: "evidence" },
  { from: "project:seamless-hiring", to: "topic:enterprise-ux", relation: "related" },
  { from: "project:ibedc", to: "topic:enterprise-ux", relation: "related" },
  { from: "writing:design-tokens", to: "project:seamkit", relation: "extends" },
  { from: "topic:leadership", to: "project:seamkit", relation: "governance" },
];

let cached: KnowledgeGraph | null = null;

export function getKnowledgeGraph(): KnowledgeGraph {
  if (cached) return cached;

  const nodes = [...projectNodes(), ...thinkingNodes(), ...TOPIC_NODES];
  const edges = [...tagEdges(nodes), ...MANUAL_EDGES];

  cached = { nodes, edges };
  return cached;
}

export function getRelatedNodes(nodeId: string, limit = 4): GraphNode[] {
  const graph = getKnowledgeGraph();
  const relatedIds = new Set<string>();

  for (const edge of graph.edges) {
    if (edge.from === nodeId) relatedIds.add(edge.to);
    if (edge.to === nodeId) relatedIds.add(edge.from);
  }

  return graph.nodes
    .filter((n) => relatedIds.has(n.id) && n.id !== nodeId)
    .slice(0, limit);
}

export function getRelatedProjects(slug: string, limit = 3) {
  const nodeId = `project:${slug}`;
  return getRelatedNodes(nodeId, limit).filter((n) => n.kind === "project");
}
