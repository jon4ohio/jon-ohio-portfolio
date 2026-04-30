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
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "IBEDC — Unified Billing System — John Ohio",
  description:
    "Built a unified billing system for Nigeria's largest electricity distributor by geographic coverage — shared transaction logic across digital and walk-in channels.",
  alternates: { canonical: "/work/ibedc" },
};

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Tensions" },
  { id: "phases", label: "03 Model" },
  { id: "evidence", label: "04 Evidence" },
  { id: "outcomes", label: "05 Outcomes" },
  { id: "unlocks", label: "06 Foundations" },
];

const model: Phase[] = [
  {
    id: "model-1",
    number: "Layer 1",
    name: "Shared transaction logic",
    description: "All payment flows resolve through one transaction structure",
  },
  {
    id: "model-2",
    number: "Layer 2",
    name: "Dual interaction surfaces",
    description: "Care App (self-service) + POS workflow (agent-assisted)",
  },
  {
    id: "model-3",
    number: "Layer 3",
    name: "Real-time operational visibility",
    description: "Transactions visible to staff; reconciliation becomes auditable",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "PRODUCT",
    items: [
      "4.6★ — Play Store rating (2,800+ reviews)",
      "↓30% — Call-centre volume",
      "10k+ — App downloads in first 6 months",
    ],
  },
  {
    category: "OPERATIONAL",
    items: [
      "↓80% — Fraud reduction through unified records",
      "Immediate — Token delivery (was 24–48h)",
      "Real-time — Transaction visibility across all channels",
    ],
  },
  {
    category: "SYSTEM",
    items: [
      "3 — External utilities adopted the POS template",
      "2.4M — Customers on unified billing system",
      "1 — Shared transaction architecture across all touchpoints",
    ],
  },
  {
    category: "WHAT CHANGED",
    items: [
      "Portals — Fragmented third-party portals → unified billing model",
      "Operations — Handwritten ledgers → real-time operational records",
      "Transferability — Client-specific tool → transferable sector infrastructure",
    ],
  },
];

export default function IbedcFlagshipCaseStudy() {
  const project = getProject("ibedc");
  if (!project) return null;
  if (!project.brief) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "ibedc");
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
        microLabel={`${project.company} · ${project.period}`}
        title={project.title.replace(" — Unified Billing System", "")}
        subtitle={project.subtitle}
        thesis="Built fragmented third-party portals into a unified billing system across digital and walk-in channels."
        abstract="Unified how payments behave across channels — shared transaction logic, dual surfaces, and operational visibility at public-sector scale."
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
        subhead="Three system failures that made fragmentation dangerous, not just inconvenient."
        cards={[
          {
            number: "01",
            title: "Fragmentation across channels",
            body:
              "Digital and physical payment channels operated independently with no shared transaction logic. A payment started in one channel couldn't be verified or continued in the other.",
          },
          {
            number: "02",
            title: "Delay in a prepaid system",
            body:
              "Token delivery lagged 24–48 hours via SMS. In communities where power is managed by prepaid token, every hour of delay meant a household sitting in the dark after having paid.",
          },
          {
            number: "03",
            title: "No operational visibility",
            body:
              "Staff at walk-in centres had no real-time view of transactions. Fraud was undetectable, disputes unresolvable, and revenue leakage structural — because there was no unified record of what had been paid, by whom, and through which channel.",
          },
        ]}
      />

      <div style={{ maxWidth: 1240, margin: "32px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The solution was not to digitise payments, but to unify how payments behave across channels — regardless of where the
          transaction originates.
        </p>
      </div>

      <FlagshipSpine eyebrow="03 System model" heading="How the system holds together" phases={model} />

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Evidence in practice
        </p>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="model-1"
          phase="Surface 1 — IBEDC Care App"
          layout="text-left"
          challenge="Self-service consumer experience: payment channel selection (bank transfer, Quickteller, FETS), token generation, and payment confirmation — designed for independent use without agent support."
          intervention="Multi-channel payment flow unified under a single billing model — customers choose method, system resolves identically."
          figure={{
            figure: 1,
            label: "Care App — payment flow",
            imageSrc: "/assets/work/ibedc/block-care-app-ui.png",
            imageAlt: "IBEDC Care App: multi-channel payment flow and success state",
            caption:
              "IBEDC Care App: bank transfer, Quickteller, FETS, and payment success — multiple channels, one system.",
            decisionNotes: [
              "Dual-surface approach chosen over digital-only — walk-in customers represent the majority of IBEDC's 2.4M customer base",
              "Shared transaction logic makes the model transferable — same architecture deployed by 3 external utilities",
              "Field validation with IBEDC staff before rollout confirmed that design assumptions matched operational reality",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="model-2"
          phase="Surface 2 — Agent POS Workflow"
          layout="text-right"
          challenge="Walk-in centre operations: agent login, bill lookup, payment initiation, and receipt printing. Agents step in and continue any transaction without switching systems or reprocessing."
          intervention="POS terminal workflow built on the same transaction logic as the app — agents and customers operate from one shared system."
          figure={{
            figure: 2,
            label: "POS terminal interface",
            imageSrc: "/assets/work/ibedc/block-pos-ui.png",
            imageAlt: "POS terminal interface for in-person payments",
            caption: "POS terminal interface: same transaction logic, different surface.",
            decisionNotes: [
              "Agent-assisted workflows were designed to continue transactions, not restart them",
              "Receipt and verification surfaces anchored to the same transaction record as the consumer app",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="model-3"
          phase="Layer 3 — Real-time visibility"
          layout="text-left"
          challenge="Token delivery became immediate. Transactions visible to staff at point of interaction. Disputes resolvable without escalation."
          intervention="Unified transaction record made reconciliation auditable across every channel — fraud detectable, revenue trackable."
          figure={{
            figure: 3,
            label: "Customer journey across touchpoints",
            imageSrc: "/assets/work/ibedc/block-customer-journey.png",
            imageAlt: "Customer journey: self-service and agent-assisted flows sharing the same transaction logic",
            caption:
              "Customer journey: self-service and agent-assisted flows sharing the same underlying transaction logic.",
            decisionNotes: [
              "Real-time states reduced call-centre load by making token delivery and payment confirmation visible immediately",
              "Unified record closed reconciliation gaps that enabled fraud and revenue leakage",
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
          "The dual-surface model — validated at 2.4 million customer scale — established the template adopted by three external utilities without rebuilding from scratch.",
          "Shared transaction logic proved that digital and physical payment channels don't need separate systems. The same principle now applies to every utility operator that adopted the POS template.",
          "IBEDC was the first implementation. The operational model — shared logic, dual surfaces, real-time visibility — is the template.",
        ]}
      />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}

