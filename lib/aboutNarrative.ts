import { aboutHeadline as sharedAboutHeadline, aboutCredibilityLine } from "@/lib/sitePositioning";

/** About H1 — kept in sync with homepage hero via `lib/sitePositioning.ts`. */
export const aboutHeadline = sharedAboutHeadline;

export { aboutCredibilityLine };

export const operatingPrinciplesLabel = "Operating Principles";

export const operatingPrinciples = [
  {
    title: "Systems over screens",
    body: "Interfaces are surfaces. Systems define behavior — under load, at scale, and over time.",
  },
  {
    title: "Structure reduces complexity",
    body: "Complexity is inevitable. Structure makes it navigable — enabling teams to move without friction.",
  },
  {
    title: "Decisions compound",
    body: "Design decisions create leverage. Systems turn individual choices into organisation-wide consistency.",
  },
  {
    title: "Design reflects operational reality",
    body: "Design fails when it ignores constraints. Systems must align with engineering, compliance, and real-world conditions.",
  },
] as const;

export type NarrativeBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "closing"; text: string };

/** Problem framing + punch line (intro band, above body narrative). */
export const aboutHookBlocks: NarrativeBlock[] = [
  {
    kind: "paragraph",
    text: "Most products don't fail at the interface. They fail when the systems behind them can't support growth. Workflows break down, teams diverge, and complexity compounds faster than value.",
  },
  { kind: "lead", text: "That's where I work." },
  {
    kind: "paragraph",
    text: "I design the foundations that help products, teams, and organizations scale—from enterprise platforms and design systems to AI-powered experiences that embed intelligence into everyday work.",
  },
];

/** Proof, edge, and close (below hook narrative). */
export const aboutBodyBlocks: NarrativeBlock[] = [
  {
    kind: "paragraph",
    text: "Most products don't fail because of the interface. They fail because the systems behind them can't support growth, adapt to change, or help teams work effectively.",
  },
  { kind: "lead", text: "That's the challenge I enjoy solving." },
  {
    kind: "paragraph",
    text: "Over the past five years, I've led product design across enterprise HR, fintech infrastructure, digital public services, and AI-powered products, helping organizations simplify complex workflows, modernize legacy platforms, and create foundations that scale.",
  },
  {
    kind: "paragraph",
    text: "At SeamlessHR, I built Seamkit as more than a design system. It became the shared foundation for how products are designed and delivered—bringing together token architecture, component governance, and collaboration workflows across 12 product teams, achieving an 88.9% adoption score and approximately 80% daily usage across design and engineering.",
  },
  {
    kind: "paragraph",
    text: "I've also led product transformation initiatives like SeamlessHiring, modernized fintech infrastructure through FetsProza, and helped define new products such as Rivva and ClearPrice, where success depended as much on product strategy and system design as interface design.",
  },
  {
    kind: "paragraph",
    text: "Today, I'm focused on designing AI-enabled products where intelligence becomes a trusted part of everyday workflows—not as standalone features, but as capabilities embedded into the products people rely on.",
  },
  {
    kind: "closing",
    text: "I design for complexity, scale, and long-term evolution, creating products that are easier to build, easier to use, and easier to grow.",
  },
];

/** Full story order (hook + body). */
export const aboutNarrativeBlocks: NarrativeBlock[] = [...aboutHookBlocks, ...aboutBodyBlocks];

export type TimelineEntry = {
  year: string;
  role: string;
  org: string;
};

/** CV-aligned ordering: current role first, then descending by role start (overlaps ordered by recency). */
export const aboutTimeline: TimelineEntry[] = [
  { year: "2025–Present", role: "Lead, DesignOps & AI-UX", org: "SeamlessHR" },
  { year: "2025–2026", role: "Product Designer (Founding Team)", org: "Rivva" },
  { year: "2022–2025", role: "Lead Product Designer", org: "SeamlessHR" },
  { year: "2024–2025", role: "Product Designer (Founding Member)", org: "ClearPrice" },
  { year: "2021–2025", role: "Senior UX Contractor", org: "Fets" },
  { year: "2021–Present", role: "Founder & Design Lead", org: "The UX Company" },
  { year: "Earlier", role: "UX Coach & Mentor", org: "Utiva / ADPList" },
];
