import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import FlagshipSpine from "@/components/case-study/FlagshipSpine";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Seamkit — John Ohio",
  description:
    "Built fragmented UI libraries into a governed enterprise design system — scaling consistency across 12 product teams through token architecture, governance, and shared system adoption.",
  alternates: { canonical: "/work/seamkit" },
};

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Tensions" },
  { id: "phases", label: "03 Spine" },
  { id: "evidence", label: "04 Evidence" },
  { id: "outcomes", label: "05 Outcomes" },
  { id: "unlocks", label: "06 Foundations" },
];

const layers: Phase[] = [
  {
    id: "layer-1",
    number: "Layer 1",
    name: "Foundations",
    description: "Primitive → semantic → component tokens",
  },
  {
    id: "layer-2",
    number: "Layer 2",
    name: "Components",
    description: "Shared primitives, patterns, and reusable building blocks",
  },
  {
    id: "layer-3",
    number: "Layer 3",
    name: "Governance",
    description: "Lifecycle + contribution + review cadences",
  },
  {
    id: "layer-4",
    number: "Layer 4",
    name: "Adoption",
    description: "Instrumentation, trust, usage, and evolution under load",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "SCALE",
    items: [
      "2.49M — Token insertions (2025)",
      "443K — Component insertions",
      "12 — Product teams aligned on a shared baseline",
    ],
  },
  {
    category: "RELIABILITY",
    items: [
      "91.1/100 — Trust score (system trust across teams)",
      "88.9/100 — Adoption score (sustained usage, not bursts)",
      "80% — Designers and engineers report daily reliance",
    ],
  },
  {
    category: "ORGANISATIONAL",
    items: [
      "Platform-wide updates — brand/compliance changes propagate through one layer",
      "Governance — contribution becomes influence, not bureaucracy",
      "Operating model — design + engineering collaborate through shared process",
    ],
  },
  {
    category: "EVOLUTION",
    items: [
      "The layered architecture establishes groundwork for emerging AI interaction patterns without requiring structural exceptions.",
      "System health monitored continuously (usage, detach behavior, sentiment)",
      "Foundations created for future products to start aligned",
    ],
  },
];

export default function SeamkitFlagshipCaseStudy() {
  const project = getProject("seamkit");
  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "seamkit");
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? projects[currentIndex + 1] : undefined;

  return (
    <div style={{ paddingTop: 56 }}>
      <ReadingProgressBar />
      <StickyChapterNav chapters={chapters} />

      <style>{`
        @media (max-width: 768px) {
          .case-study-chapter-nav { display: none !important; }
        }
        @media (max-width: 900px) {
          .case-study-phase-desktop { display: none !important; }
          .case-study-evidence-row--text-left { flex-direction: column !important; }
          .case-study-evidence-row--text-right { flex-direction: column !important; }
        }
        @media (max-width: 640px) {
          .case-study-tension-grid { flex-direction: column !important; }
          .case-study-nextread { flex-direction: column !important; }
          .case-study-nextread-media { width: 100% !important; }
        }
        @media (min-width: 901px) {
          .case-study-phase-mobile { display: none !important; }
        }
      `}</style>

      <FlagshipOpener
        microLabel="SeamlessHR · Dec 2023 – Present"
        title={project.title}
        subtitle={project.subtitle}
        thesis="Built fragmented UI libraries into a governed enterprise design system."
        abstract="Scaled consistency across 12 teams through token architecture, governance, and shared system adoption."
        impact={[
          { value: "12", label: "Teams aligned" },
          { value: "2.49M", label: "Token insertions" },
          { value: "88.9", label: "Adoption score" },
          { value: "91.1", label: "Trust score" },
        ]}
        heroImage={{
          src: project.assets?.hero?.src ?? project.assets?.thumbnails?.[0]?.src,
          alt: project.assets?.hero?.alt ?? project.assets?.thumbnails?.[0]?.alt,
        }}
        executiveBrief={project.brief!}
      />

      <TensionCards
        label="02 Core Tensions"
        heading="What had to change"
        subhead="Three systemic failures that made a governed baseline unavoidable."
        cards={[
          {
            number: "01",
            title: "Fragmentation became delivery drag",
            body:
              "Duplicate patterns and local naming systems meant platform-wide changes required repeated coordination across teams — turning consistency into a scheduling problem.",
          },
          {
            number: "02",
            title: "Without governance, shared libraries decay",
            body:
              "A component library without lifecycle management becomes untrustworthy. Trust drops, teams fork locally, and the system collapses back into exceptions.",
          },
          {
            number: "03",
            title: "Adoption is an influence model",
            body:
              "Teams will not adopt what they did not help shape. Contribution had to be designed as a path to influence, not a top-down mandate.",
          },
        ]}
      />

      <div style={{ maxWidth: 1240, margin: "32px auto 0", padding: "0 24px" }}>
        <AnnotatedFigure
          figure="B"
          label="Before State — Fragmented system"
          imageAlt="Before SeamKit — fragmented libraries and duplicated UI patterns across the product suite"
          caption="Before a governed baseline, each product team maintained its own library and rules — duplication, drift, and rework compounded with every platform-wide change."
          decisionNotes={[
            "01 — Duplicate UI patterns: the same problem solved differently across products, multiplying maintenance effort",
            "02 — No single source of truth: platform-wide updates required coordination per team, per library",
            "03 — Governance gap: prior shared-library attempts diverged and were abandoned without lifecycle rules",
          ]}
          imageSrc="/assets/work/seamkit/block-hypothesis.png"
        />
      </div>

      <FlagshipSpine
        eyebrow="03 Layered system spine"
        heading="How the system holds together"
        phases={layers}
      />

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Evidence in practice
        </p>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="layer-1"
          phase="Layer 1 — Foundations"
          layout="text-left"
          challenge="The fastest path was shipping components. The right path was establishing the token layer first — so brand updates, spacing shifts, and semantic meaning could propagate without per-component rewrite."
          intervention="A three-tier token architecture: primitive values → semantic tokens → component tokens, consumed through Figma token sync and engineering integration."
          figure={{
            figure: 1,
            label: "Token hierarchy",
            imageSrc: "/assets/work/_placeholders/hero.svg",
            imageAlt: "Three-tier token hierarchy diagram — primitives, semantic tokens, component tokens",
            caption:
              "Three-tier token hierarchy: primitive values → semantic tokens → component tokens. 581 primitives · 488 component tokens · 349 colour tokens.",
            decisionNotes: [
              "Token architecture preceded components, trading early visible output for long-term scalability",
              "Semantic tier separated meaning from raw values, reducing exception-driven drift",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="layer-2"
          phase="Layer 2 — Components"
          layout="text-right"
          challenge="Shared components had to sit on stable foundations; otherwise they would accumulate edge-case overrides and become the same divergence problem at a different layer."
          intervention="Component foundations built on the token taxonomy and aligned patterns, enabling teams to ship independently while staying visually and structurally consistent."
          figure={{
            figure: 2,
            label: "Token taxonomy (Token Studio)",
            imageSrc: "/assets/work/seamkit/block-approach.png",
            imageAlt: "SeamKit token taxonomy in Token Studio — 581 primitives, 488 component tokens, 349 colour tokens",
            caption: "Token Studio variables panel: the taxonomy consumed by design and engineering across the platform.",
            decisionNotes: [
              "Component-level overrides were scoped explicitly, preventing semantic tokens from becoming exceptions",
              "Foundations designed to support multiple product teams without needing bespoke variants per team",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="layer-3"
          phase="Layer 3 — Governance"
          layout="text-left"
          challenge="A shared library without governance becomes a dumping ground. Trust drops, and teams route around the system the moment it slows delivery."
          intervention="A five-stage component lifecycle (proposal → draft → review → stable → deprecated) with clear cadences: Token Council (bi-weekly), Component Review Board (monthly), Pattern Steering Group (quarterly)."
          figure={{
            figure: 3,
            label: "Governance model",
            imageSrc: "/assets/work/_placeholders/hero.svg",
            imageAlt: "Governance contribution workflow and cadence model",
            caption:
              "Contribution workflow: identify need → proposal → community review → draft → stable release. Cadences: Token Council · Component Review Board · Pattern Steering Group.",
            decisionNotes: [
              "Lifecycle stages created a shared definition of stability and deprecation (no silent drift)",
              "Cadences made governance visible and predictable, increasing trust across teams",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="layer-4"
          phase="Layer 4 — Adoption & system health"
          layout="text-right"
          challenge="Adoption is not a rollout event; it’s sustained reliance. The system needed instrumentation that could detect drift and trust loss before it became fragmentation again."
          intervention="Health tracked through Figma analytics (insertions, usage frequency, detach behavior) and sentiment signals — reinforcing adoption through co-creation and service-level responsiveness."
          figure={{
            figure: 4,
            label: "System health snapshot",
            imageSrc: "/assets/work/_placeholders/hero.svg",
            imageAlt: "System health report — adoption score, trust score, sentiment survey results",
            caption:
              "System health: adoption score 88.9/100 · trust score 91.1/100 · 80% daily usage · 70%+ teams using Seamkit as new-work baseline.",
            decisionNotes: [
              "Detach rate was treated as a leading indicator of trust decline",
              "Adoption was designed as an influence model — audits + working sessions before governance hardening",
            ],
          }}
        />
      </div>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          05 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What the system enabled
        </h2>
        <OutcomeCards tiers={outcomeTiers} />
      </section>

      <UnlockPanel
        label="06 Foundations"
        items={[
          "A brand or compliance update now touches one layer and propagates across the suite — no per-team coordination as the default.",
          "Because the system is token-driven and extensible, it establishes groundwork for emerging AI interaction patterns as those patterns mature across the suite.",
          "A shared operating model for design + engineering emerged: visible governance, contribution workflow, and system health as standard practice.",
        ]}
      />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}

