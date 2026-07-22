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
    "How to adopt and build with Anchor — Getting Started, concepts, Build, architecture, and runtime reference. Independent of the implementation workspace.",
  intro:
    "Install the runtime. Adopt the methodology. This is the canonical How surface for Anchor — product introduces adoption; Documentation owns the walkthrough. The implementation workspace is not required for the public journey.",
};

export const anchorDocsSections: AnchorDocsSection[] = [
  {
    id: "getting-started",
    label: "Getting Started",
    title: "Install the runtime. Adopt the methodology.",
    paragraphs: [
      "Anchor separates tooling from practice. You install a runtime once; you adopt a coordination methodology into your own project artifacts.",
      "Software steps come first: install the runtime, then initialize your workspace. After anchor init, your project's .anchor workspace is the primary working context. Engineering decisions and project state belong there — not in the public documentation.",
      "Next, adopt the methodology: orient your AI host (Cursor, Claude Code, or another compatible host) and establish project context — typically Project Entry and Handoff. Depending on whether you are adopting Anchor in an existing project or starting a new one, follow the guidance that matches your situation below.",
      "Then begin engineering from those durable artifacts. Verify the CLI with anchor help (there is no --help flag).",
    ],
    commands: [
      "npm install -g @jon4ohio/anchor-runtime",
      "cd your-project && anchor init",
    ],
    bullets: [
      "Existing project — map what already owns each responsibility; create Entry and Handoff only where gaps remain; keep existing ADRs and docs in place.",
      "New project — establish Entry and Handoff early; add a Spec when scope is clear; skip ADRs until a decision constrains future work.",
      "Ask your AI host to orient before work: Entry first; Handoff if continuing; relevant Spec or ADR for the task.",
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
    nextHref: "#build",
    nextLabel: "Build with Anchor →",
  },
  {
    id: "build",
    label: "Build",
    title: "How do I build with Anchor?",
    paragraphs: [
      "Build is about using Anchor in your projects — not about building the Anchor engine. After Getting Started, this section is where day-to-day engineering practice lives.",
      "You integrate Anchor into a repository, establish orientation and continuity, add responsibilities as coordination problems appear, and evolve team workflows without depending on the implementation workspace.",
    ],
    bullets: [
      "Integrating Anchor — install the runtime, run anchor init, keep durable artifacts (Entry, Handoff, Specs, ADRs) in your project.",
      "Using Orientations — ask your AI host to orient from Entry (and Handoff when continuing) before substantive work.",
      "Adding responsibilities — introduce Spec, ADR, Review, or other contracts only when a real coordination gap appears.",
      "Capability overlays — map existing docs and AI context files to Anchor responsibilities; preserve what already works.",
      "Advanced workflows — multi-session continuity, refresh of adoption guidance, and host-specific dispatch (AGENTS.md / CLAUDE.md as thin pointers).",
      "Migration — move from chat-only context or ad-hoc docs toward responsibility-owned artifacts without a big-bang rewrite.",
      "Team adoption — share Entry and Handoff as the shared board; keep AI dispatch as a pointer, not a second wiki.",
    ],
    nextHref: "#reference",
    nextLabel: "Runtime reference →",
  },
  {
    id: "reference",
    label: "Reference",
    title: "Runtime commands and behavior.",
    paragraphs: [
      "Once you have begun engineering, these commands describe runtime capabilities. The runtime prepares a workspace and can fulfill declared engineering responsibilities. It does not host inference, own project state, or decide when work should happen.",
      "Capability fulfillment language remains provisional until the Capability API acceptance gate clears in real adoption.",
    ],
    bullets: [
      "anchor help — list commands (no --help flag).",
      "anchor init — create .anchor workspace config and default artifact locations.",
      "anchor fulfill <identity> — fulfill a capability identity (e.g. orientation) after you have adopted the methodology.",
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
    "The Capability API remains Proposed upstream until acceptance gates clear in real adoption. This Documentation surface is the public How; the implementation workspace is optional for adoption.",
    "Product and runtime release notes for users live at /anchor/docs/releases — that page is the public source of truth.",
  ],
};

export type AnchorReleaseNote = {
  version: string;
  date: string;
  title: string;
  whyItMatters: string;
  highlights: string[];
};

/** Public source of truth for Anchor Runtime release communication. */
export const anchorReleaseNotes: AnchorReleaseNote[] = [
  {
    version: "0.1.0",
    date: "2026-07-22",
    title: "First public npm distribution",
    whyItMatters:
      "Anchor became installable through npm — primary onboarding shifted from cloning a repository to installing a runtime.",
    highlights: [
      "Published @jon4ohio/anchor-runtime to the public npm registry",
      "anchor init and public install path",
      "Bundled methodology for Orientation, Continuity, and Review (orientation@1, continuity@1, review@1)",
      "Public product onboarding via the Anchor website and documentation",
    ],
  },
];
