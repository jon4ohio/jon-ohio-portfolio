import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import FlagshipSpine from "@/components/case-study/FlagshipSpine";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import NextReadCard from "@/components/case-study/NextReadCard";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "FetsProza — John Ohio",
  description:
    "Replaced a third-party mobile money vendor dependency with proprietary, white-label-ready infrastructure — built from the product layer down.",
  alternates: { canonical: "/work/fetsproza" },
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
    name: "Transaction engine",
    description: "Processing, routing, execution — replaces the vendor ceiling",
  },
  {
    id: "layer-2",
    number: "Layer 2",
    name: "Financial logic",
    description: "Settlement, reconciliation, ledger behavior, fee calculation",
  },
  {
    id: "layer-3",
    number: "Layer 3",
    name: "Integration layer",
    description: "APIs/connectors for banks, agents, external services (white-label)",
  },
  {
    id: "layer-4",
    number: "Layer 4",
    name: "Product layer",
    description: "Operator console, agent flows, reporting surfaces for real users",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "PRODUCT",
    items: [
      "2× — Transaction throughput (10k → 20k per minute)",
      "↓50% — Settlement time (4s → 2s)",
      "Immediate — Reconciliation visibility (was daily batch)",
    ],
  },
  {
    category: "OPERATIONAL",
    items: [
      "$1M+ — Annual infrastructure cost reduction",
      "Vendor — Licensing and margin dependency eliminated",
      "3+ — Markets enabled for expansion (Congo and others)",
    ],
  },
  {
    category: "SYSTEM",
    items: [
      "Proprietary — Transaction engine now internally owned",
      "White-label ready — Infrastructure designed for licensing",
      "Auditable — Transaction states traceable without engineering",
    ],
  },
  {
    category: "WHAT CHANGED",
    items: [
      "From — Vendor-dependent, ceiling-constrained mobile money operations",
      "To — Owned financial infrastructure platform built for scale and licensing",
    ],
  },
];

export default function FetsprozaFlagshipCaseStudy() {
  const project = getProject("fetsproza");
  if (!project) return null;
  if (!project.brief) return null;

  return (
    <div style={{ paddingTop: 56 }}>
      <ReadingProgressBar />
      <StickyChapterNav chapters={chapters} />

      <style>{`
        @media (max-width: 768px) {
          .case-study-chapter-nav { display: none !important; }
        }
        @media (max-width: 640px) {
          .case-study-tension-grid { flex-direction: column !important; }
          .case-study-phase-desktop { display: none !important; }
          .case-study-evidence-row--text-left { flex-direction: column !important; }
          .case-study-evidence-row--text-right { flex-direction: column !important; }
          .case-study-nextread { flex-direction: column !important; }
          .case-study-nextread-media { width: 100% !important; }
        }
        @media (min-width: 641px) {
          .case-study-phase-mobile { display: none !important; }
        }
      `}</style>

      <FlagshipOpener
        microLabel={`${project.company} · ${project.period}`}
        title={project.title}
        subtitle={project.subtitle}
        thesis="Replacing vendor dependency with infrastructure the company owned."
        abstract="Built from the product layer down: a transaction engine, financial logic, integrations, and operator surfaces designed to scale and license."
        impact={project.metrics}
        heroImage={{
          src: project.assets?.hero?.src ?? project.assets?.thumbnails?.[0]?.src,
          alt: project.assets?.hero?.alt ?? project.assets?.thumbnails?.[0]?.alt,
        }}
        executiveBrief={project.brief}
      />

      <TensionCards
        label="02 Core Tensions"
        heading="What made this hard"
        subhead="Three constraints that made infrastructure replacement a product problem, not just an engineering one."
        cards={[
          {
            number: "01",
            title: "Vendor dependency",
            body:
              "The company relied on a third-party mobile money engine for all transaction processing. That dependency constrained margins, blocked customisation, and imposed a hard ceiling on throughput — 10k per minute — that the business was already approaching.",
          },
          {
            number: "02",
            title: "Infrastructure complexity without a product model",
            body:
              "Transaction orchestration, settlement, reconciliation, and compliance weren't UX problems. They were system design problems. Engineering was driving architecture without a cohesive product model to align decisions against — creating technical choices that would have been expensive to undo.",
          },
          {
            number: "03",
            title: "No PM — product definition was unowned",
            body:
              "There was no product manager. Engineering was building and design had no formal brief. The risk was a technically sound system with no coherent user model, no audit trail design, and no product layer that operators could actually use.",
          },
        ]}
      />

      <div style={{ maxWidth: 1240, margin: "32px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The answer was not to replace the vendor with a better vendor. It was to build infrastructure the company owned — designed
          from the product layer down, not the transaction engine up.
        </p>
      </div>

      <FlagshipSpine eyebrow="03 Spine" heading="How the system holds together" phases={layers} />

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Evidence in practice
        </p>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="layer-1"
          phase="Layer 1 — Transaction engine"
          layout="text-left"
          challenge="The vendor's 10k transaction-per-minute ceiling was the most visible constraint. The replacement engine was designed to double that from day one — but throughput alone wasn't the design problem. State visibility was. Every transaction needed a clear, auditable state model: initiated, processing, settled, failed, reversed."
          intervention="Transaction flow architecture with explicit state transitions — every state visible to operators without engineering access."
          figure={{
            figure: 1,
            label: "Transaction state model",
            imageSrc: "/assets/work/_placeholders/hero.svg",
            imageAlt: "Transaction state model: initiated → processing → settled, with error and reversal paths",
            caption: "Transaction state model: initiated → processing → settled, with error and reversal paths.",
            decisionNotes: [
              "State visibility designed as an operator feature, not an engineering-only concern",
              "Auditability treated as a first-order constraint (not a reporting afterthought)",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="layer-2"
          phase="Layer 2 — Financial logic"
          layout="text-right"
          challenge="Reconciliation was the operational risk. The old system required manual coordination across teams to close the books daily. Settlement errors multiplied as agent network volume grew. The financial logic layer was designed so reconciliation happened continuously — not as an end-of-day batch."
          intervention="Real-time reconciliation model replacing daily manual process — errors surfaced at transaction level, not discovered in batch review."
          figure={{
            figure: 2,
            label: "Reconciliation workflow",
            imageSrc: "/assets/work/_placeholders/hero.svg",
            imageAlt: "Reconciliation workflow: real-time settlement tracking and operator-facing error resolution",
            caption: "Reconciliation workflow: real-time settlement tracking and operator-facing error resolution.",
            decisionNotes: [
              "Continuous reconciliation reduced operational overhead and prevented error accumulation",
              "Errors surfaced where they occurred — at transaction level — not at end-of-day review",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="layer-3"
          phase="Layer 3 — Integration layer"
          layout="text-left"
          challenge="The integration layer was designed for licensing from the start — not as an afterthought. APIs and connectors needed to be clean enough for external operators to build on without Fets engineering involvement at each integration."
          intervention="API-first integration design enabling white-label deployment — the commercial model that made the $1M+ cost saving realisable."
          figure={{
            figure: 3,
            label: "Integration layer",
            imageSrc: "/assets/work/_placeholders/hero.svg",
            imageAlt: "Integration layer: connectors for banks, agents, and external services built for white-label licensing",
            caption: "Integration layer: connectors for banks, agents, and external services built for white-label licensing.",
            decisionNotes: [
              "White-label constraints shaped connector design early (not retrofitted for licensing)",
              "Integration surfaces designed for external operators, reducing dependence on internal engineering",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="layer-4"
          phase="Layer 4 — Product layer"
          layout="text-right"
          challenge="Infrastructure is only as useful as the product layer that makes it operable. The operator console, agent management dashboard, and reporting tools were the surfaces through which finance teams, operations managers, and field agents actually used the system — without ever seeing the engine underneath."
          intervention="Operator console, agent dashboards, and reporting surfaces — the product layer that made infrastructure legible to non-technical operators."
          figure={{
            figure: 4,
            label: "Operator console",
            imageSrc: "/assets/work/_placeholders/hero.svg",
            imageAlt: "Operator console: transaction monitoring, agent management, and reconciliation reporting",
            caption: "Operator console: transaction monitoring, agent management, and reconciliation reporting.",
            decisionNotes: [
              "Product layer treated as the primary interface to infrastructure (operators first)",
              "Surfaces designed to make system state visible without technical translation",
            ],
          }}
        />
      </div>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          05 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What the system delivered
        </h2>
        <OutcomeCards tiers={outcomeTiers} />
      </section>

      <UnlockPanel
        label="06 Foundations"
        items={[
          "The infrastructure was built white-label-ready from the start — not retrofitted. That architectural decision created a licensing revenue stream that didn't exist under the vendor model.",
          "Fetsproza established the internal capability for Fets to own its financial infrastructure across markets — Congo expansion and beyond — without returning to vendor dependency.",
          "The product layer design — operator console, reconciliation tooling, agent management — became the internal standard for how Fets builds operator-facing financial tools.",
          "Cutting annual infrastructure costs by over $1M proved that proprietary infrastructure was not just a technical preference but a commercial one.",
        ]}
      />

      <NextReadCard
        microLabel="Next"
        title="IBEDC — Unified Billing System"
        body="A dual-surface service system: unified transaction logic across self-service and walk-in channels at public-sector scale."
        href="/work/ibedc"
        imageSrc="/assets/work/ibedc/preview-16x9.png"
        imageAlt="IBEDC — unified billing system preview"
      />
    </div>
  );
}

