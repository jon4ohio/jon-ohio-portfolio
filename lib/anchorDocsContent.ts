export type AnchorDocsSection = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  commands?: string[];
  nextHref?: string;
  nextLabel?: string;
};

export const anchorDocsMeta = {
  title: "Anchor Documentation",
  description:
    "How to adopt Anchor — Getting Started, concepts, architecture, and runtime reference. Independent of the implementation repository.",
  intro:
    "This is the canonical How surface for Anchor. Product introduces adoption; Documentation owns it.",
};

export const anchorDocsSections: AnchorDocsSection[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    title: "Install, initialize, fulfill.",
    paragraphs: [
      "Engineering responsibilities are fulfilled by a compatible AI host — such as Cursor or Claude Code — using the installed Anchor Runtime. Durable artifacts stay in your repository.",
      "Verify with anchor help (the CLI has no --help flag). Fulfillment language stays provisional until the Capability API acceptance gate clears in real adoption.",
    ],
    commands: [
      "npm install -g @jon4ohio/anchor-runtime",
      "anchor init",
      "anchor fulfill orientation",
    ],
    nextHref: "#concepts",
    nextLabel: "Learn the concepts →",
  },
  {
    id: "concepts",
    label: "Concepts",
    title: "Responsibilities before files.",
    paragraphs: [
      "Knowledge has responsibilities. Contracts formalize those responsibilities. Artifacts implement contracts — they are not the interface.",
      "Seven contracts each own one kind of truth: Entry (orientation), Spec (scope), ADR (decisions), Skill (transferable expertise), Playbook (execution order), Review (quality gates), and Handoff (continuity).",
      "The Capability API exposes engineering responsibilities as stable identities (for example orientation@1, continuity@1, review@1). Clients depend on what to fulfill, not on a directory layout.",
    ],
    bullets: [
      "One owner per truth — do not duplicate durable facts across files.",
      "Reference, don’t restate — link to the contract that owns a truth.",
      "Promote only after repetition — don’t invent contracts from a single conversation.",
    ],
    nextHref: "#architecture",
    nextLabel: "Architecture rationale →",
  },
  {
    id: "architecture",
    label: "Architecture",
    title: "Stable rationale, not a file tree.",
    paragraphs: [
      "Public architecture is presented by concept — responsibility-first design, product vs framework layers, and capability-as-API — not by ADR number as navigation.",
      "Responsibility-first teaching means adopters discover existing ownership before introducing new structure. Overlay adoption keeps your ADRs and AI context files where they are.",
      "A thin local runtime delivers methodology as versioned knowledge snapshots. The host AI provides inference; project state remains in the adopter’s repository.",
      "Underlying records (ADRs, position papers) support these concepts. They are implementation artifacts for the architecture surface, not the primary way users browse How.",
    ],
    nextHref: "#reference",
    nextLabel: "Runtime reference →",
  },
  {
    id: "reference",
    label: "Reference",
    title: "Runtime commands and behavior.",
    paragraphs: [
      "The runtime prepares a workspace and fulfills declared engineering responsibilities. It does not host inference, own project state, or decide when work should happen.",
    ],
    bullets: [
      "anchor help — list commands (no --help flag).",
      "anchor init — create .anchor workspace config and default artifact locations.",
      "anchor fulfill <identity> — fulfill a capability identity (e.g. orientation).",
      "Local MCP tool aliases map to fulfill(\"<identity>\") where the host supports them.",
    ],
    nextHref: "#maturity",
    nextLabel: "Maturity note →",
  },
];

export const anchorDocsMaturity = {
  id: "maturity",
  label: "Maturity",
  title: "Evidence Window open.",
  paragraphs: [
    "Independent adoption evidence is still pending. Maintainer dogfooding and a controlled portfolio experiment support capability claims under labeled conditions — not broad market validation.",
    "The Capability API remains Proposed upstream until acceptance gates clear in real adoption. This Documentation surface is the public How; the implementation repository is optional for adoption.",
  ],
};
