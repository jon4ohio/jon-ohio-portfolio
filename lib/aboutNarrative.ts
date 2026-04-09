/** Must stay aligned with `components/Hero.tsx` hero headline. */
export const aboutHeadline =
  "I design systems that evolve — from fragmented to intelligent.";

export const operatingPrinciplesLabel = "Operating Principles";

export const operatingPrinciples = [
  {
    title: "Systems over screens",
    body: "The interface is a surface. The system is what matters — how it behaves under load, at scale, and over time.",
  },
  {
    title: "Structure reduces complexity",
    body: "Complexity is unavoidable. The job is to impose structure so teams can navigate it without friction.",
  },
  {
    title: "Decisions should compound",
    body: "Good design decisions create leverage. Patterns, tokens, and systems multiply individual decisions into organisation-wide consistency.",
  },
  {
    title: "Design must reflect operational reality",
    body: "The best design fails if it doesn't account for constraints: engineering capacity, compliance, team bandwidth, and market context.",
  },
] as const;

export type NarrativeBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "closing"; text: string };

/** Hook → Problem → Proof → Edge → Close (continuous paragraphs; no duplicate bullet list). */
export const aboutNarrativeBlocks: NarrativeBlock[] = [
  {
    kind: "paragraph",
    text: "Most products don't fail at the interface level. They fail at the system level — where workflows break, decisions don't compound, and teams can't scale what they build.",
  },
  { kind: "lead", text: "That's the problem I solve." },
  {
    kind: "paragraph",
    text: "I'm a Product Design Lead working across enterprise SaaS, fintech infrastructure, and AI-native systems — turning fragmented products into structured, scalable systems that hold under real-world conditions.",
  },
  {
    kind: "paragraph",
    text: "Over the past 4+ years, I've led design across complex environments — from a 12-team enterprise HR platform to fintech infrastructure serving millions of users across Africa.",
  },
  {
    kind: "paragraph",
    text: "This thinking shaped Seamkit — built not as a component library, but as an operating system for product teams. Token architecture, naming logic, contribution pipelines, and governance rituals. It now supports 12 teams with an 88.9 adoption score and roughly 80% daily usage across design and engineering.",
  },
  {
    kind: "paragraph",
    text: "I've also shaped products at the 0→1 edge — Rivva and ClearPrice — where the challenge isn't just usability, but defining systems worth scaling in the first place.",
  },
  {
    kind: "paragraph",
    text: "Today, my focus is on how intelligence becomes part of the system — embedding AI into enterprise workflows as reusable, trusted patterns, not isolated features.",
  },
  {
    kind: "paragraph",
    text: "I design for environments where scale, constraints, and complexity are real — across Africa and similar markets.",
  },
  {
    kind: "closing",
    text: "Because at scale, good design isn't about screens. It's about systems that work.",
  },
];

export type TimelineEntry = {
  year: string;
  role: string;
  org: string;
};

/** CV-aligned ordering (current-first). */
export const aboutTimeline: TimelineEntry[] = [
  { year: "2025–Present", role: "Lead, DesignOps & AI-UX", org: "SeamlessHR" },
  { year: "2025–2026", role: "Product Designer (Founding Team)", org: "Rivva" },
  { year: "2024–2025", role: "Product Designer (Founding Member)", org: "ClearPrice" },
  { year: "2022–2025", role: "Lead Product Designer", org: "SeamlessHR" },
  { year: "2021–2025", role: "Senior UX Contractor", org: "Fets" },
  { year: "2021–Present", role: "Founder & Design Lead", org: "The UX Company" },
  { year: "Earlier", role: "UX Coach & Mentor", org: "Utiva / ADPList" },
];
