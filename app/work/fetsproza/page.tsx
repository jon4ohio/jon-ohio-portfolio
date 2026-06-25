import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

const STORY_TITLE = "Designing the operating system behind a mobile money business";

export const metadata: Metadata = {
  title: STORY_TITLE,
  description:
    "Helping FETS eliminate $1M+ vendor dependency by redesigning operational experience — financial operations case study by John Ohio.",
  alternates: { canonical: "/work/fetsproza" },
};

const chapters: Chapter[] = [
  { id: "snapshot", label: "01 Snapshot" },
  { id: "challenge", label: "02 Challenge" },
  { id: "strategy", label: "03 Strategy" },
  { id: "decisions", label: "04 Decisions" },
  { id: "impact", label: "05 Impact" },
  { id: "reflection", label: "06 Reflection" },
];

const decisions: Phase[] = [
  {
    id: "decision-config",
    number: "01",
    name: "Enable business teams to configure products independently",
    description: "Self-service configuration with operational guardrails",
  },
  {
    id: "decision-visibility",
    number: "02",
    name: "Give operators real-time visibility into transaction health",
    description: "Status, bottlenecks, and re-query without engineering",
  },
  {
    id: "decision-reconciliation",
    number: "03",
    name: "Make reconciliation part of daily operations",
    description: "Matched and unmatched flows in one operational view",
  },
  {
    id: "decision-administration",
    number: "04",
    name: "Create a scalable operating model for administration",
    description: "Roles, onboarding, and team admin at network scale",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "OPERATIONAL",
    items: [
      "Routine configuration owned by business teams — not engineering queues",
      "Self-service transaction visibility at production scale",
      "Unified workflows across monitoring, reconciliation, and administration",
      "80% task success · NPS 3.4 → 4.6 · ↓40% onboarding · ↓30% support interventions",
    ],
  },
  {
    category: "BUSINESS",
    items: [
      "$1M+ — Annual savings from vendor elimination",
      "2× — Transaction throughput (10k → 20k per minute)",
      "↓50% — Settlement time (4s → 2s)",
      "↓30% — OpEx ($500k → $350k)",
    ],
  },
  {
    category: "STRATEGIC",
    items: [
      "₦89.7B+ — Verified production volume (last financial year)",
      "Owned operating capability — no third-party platform dependency",
      "Fetswallet Congo — White-label deployment",
      "Licensing opportunities from external fintechs",
    ],
  },
];

function SectionDivider() {
  return (
    <div style={{ padding: "0 24px" }}>
      <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
    </div>
  );
}

export default function FetsprozaFlagshipCaseStudy() {
  const project = getProject("fetsproza");
  if (!project) return null;
  if (!project.brief) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "fetsproza");
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
        sectionId="snapshot"
        microLabel={`${project.company} · ${project.period}`}
        title={STORY_TITLE}
        subtitle="FetsProza — enterprise operations workspace for FETS"
        thesis="Helping FETS eliminate $1M+ vendor dependency by redesigning operational experience."
        abstract="FETS was approaching a vendor throughput ceiling that constrained margins and blocked customization. As Product Design Lead with no PM, I owned product definition for FetsProza — prioritizing workflows, trade-offs, and engineering alignment with the CTO before any interface work."
        impact={project.metrics}
        heroImage={{
          src: "/assets/work/fetsproza/preview-16x9.png",
          alt: "Daily reconciliation at scale — matched and unmatched transaction flows in one operational view",
        }}
        executiveBrief={{
          ...project.brief,
          sectionLabel: "01 Impact Snapshot",
        }}
      />

      <section id="challenge" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          02 Challenge
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Why growth stalled on vendor tooling
        </h2>
        <div style={{ marginTop: 20, maxWidth: 760 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            As FETS scaled its agent network, operational overhead grew linearly on a platform built for someone
            else&apos;s roadmap. Every growth decision carried vendor licensing cost — and a hard throughput ceiling the
            business was already brushing against.
          </p>
          <p style={{ marginTop: 18, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75 }}>
            The challenge was not replacing software — it was redesigning how the business operated through software.
          </p>
        </div>

        <TensionCards
          embedded
          heading="What blocked scale"
          subhead="Four constraints surfaced across operational teams."
          cards={[
            {
              number: "01",
              title: "Configuration dependency",
              body: "Business changes queued behind engineering — every product update waited on development capacity.",
            },
            {
              number: "02",
              title: "Visibility gaps",
              body: "Operators could not diagnose transaction failures without escalating to engineering.",
            },
            {
              number: "03",
              title: "Financial oversight burden",
              body: "Settlement and reconciliation required manual coordination across disconnected tools.",
            },
            {
              number: "04",
              title: "Growth complexity",
              body: "Partner onboarding and role administration did not scale with the agent network.",
            },
          ]}
        />

        <p style={{ marginTop: 40, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          Eleven workflows existed across the platform. Rather than documenting every module individually, this case
          study focuses on the <strong>four decisions</strong> that changed how the business operated.
        </p>

        <div style={{ marginTop: 32, maxWidth: 960 }}>
          <AnnotatedFigure
            figure={0}
            label="Platform scope — eleven operational workflows"
            caption="Login · Users · Accounts · Products · Configuration · Transactions · Settlements"
            decisionNotes={[]}
          />
        </div>
      </section>

      <section id="strategy" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Strategy
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Operating principles for the redesign
        </h2>
        <div style={{ marginTop: 24, maxWidth: 760, display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Configuration over engineering.</strong> We chose business-team
            ownership of product setup over engineering throughput — accepting longer guided forms to prevent costly
            production mistakes.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Visibility over investigation.</strong> We prioritized real-time
            transaction health at the point of work over simplified dashboards that hid the data operators scan daily.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Dense doesn&apos;t mean difficult.</strong> We kept information
            density high for scan speed — rejecting stripped-down views that forced operators into extra navigation.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Consistency across roles.</strong> We aligned navigation, validation,
            and status language across workflows — so the operating model felt like one system, not eleven modules.
          </p>
        </div>
      </section>

      <section id="decisions" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Decisions
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          How we redesigned operations
        </h2>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          Four judgments that changed how the business ran — not what we shipped.
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={decisions} />
        </div>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="decision-config"
          phase="01 — Enable business teams to configure products independently"
          layout="text-left"
          challengeLabel="Context"
          interventionLabel="Decision"
          challenge="Every product change waited on engineering capacity — slowing the business more than the platform."
          intervention="Give business teams governed self-service configuration — validation and guardrails instead of development tickets."
          reasoning="We rejected minimal forms that shipped faster but failed in production. Longer guided flows with inline validation cut costly configuration errors more than they added completion time."
          outcome="Business teams owned routine product changes while governance stayed intact."
          figure={{
            figure: 1,
            label: "Product configuration",
            imageSrc: "/assets/work/fetsproza/block-module-payment.png",
            imageAlt: "Evidence: business teams configure products with validation — no engineering queue",
            caption: "",
            decisionNotes: [],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="decision-visibility"
          phase="02 — Give operators real-time visibility into transaction health"
          layout="text-right"
          challengeLabel="Context"
          interventionLabel="Decision"
          challenge="Stuck and failed transactions required engineering escalation — investigation was never self-service."
          intervention="Put transaction health, bottlenecks, and re-query where operators already work — not in a separate reporting layer."
          reasoning="We rejected simplified views that hid the density operators need. Persistent navigation and scan-friendly layouts beat fewer fields when hundreds of records move daily."
          outcome="Operators resolved transaction issues at production scale without engineering support."
          figure={{
            figure: 2,
            label: "Transaction monitoring",
            imageSrc: "/assets/work/fetsproza/thumb-2.png",
            imageAlt: "Evidence: operators resolve stuck transactions in context — without a support ticket",
            caption: "",
            decisionNotes: [],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="decision-reconciliation"
          phase="03 — Make reconciliation part of daily operations"
          layout="text-left"
          challengeLabel="Context"
          interventionLabel="Decision"
          challenge="Closing the books required coordinating across teams and tools — errors surfaced too late to fix at source."
          intervention="Embed matched and unmatched flows into daily operations instead of batch reconciliation at period close."
          reasoning="Batch review was familiar but expensive. We rejected keeping reconciliation as a separate process — continuous visibility let operators act where errors originated."
          outcome="The business closed books from a single operational view instead of manual handoffs."
          figure={{
            figure: 3,
            label: "Reconciliation dashboard",
            imageSrc: "/assets/work/fetsproza/hero.png",
            imageAlt: "Evidence: matched and unmatched flows reconcile in one view — errors fixed at source",
            caption: "",
            decisionNotes: [],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="decision-administration"
          phase="04 — Create a scalable operating model for administration"
          layout="text-right"
          challengeLabel="Context"
          interventionLabel="Decision"
          challenge="Partner onboarding and role administration broke down as the agent network grew."
          intervention="Standardize roles, guided onboarding, and contextual help — an admin model built for the network, not headquarters only."
          reasoning="We rejected feature breadth that added training burden. Role clarity and guided workflows reduced onboarding errors more than adding capabilities."
          outcome="Partner onboarding accelerated through one administration model at network scale."
          figure={{
            figure: 4,
            label: "Team administration",
            imageSrc: "/assets/work/fetsproza/block-module-merchant.png",
            imageAlt: "Evidence: partners onboard through role clarity and guided workflows — not feature sprawl",
            caption: "",
            decisionNotes: [],
          }}
        />
      </div>

      <section id="impact" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          05 Impact
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What improved — and what it unlocked
        </h2>
        <p style={{ marginTop: 20, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          FETS replaced vendor dependency with an owned operating capability — running at production volume while
          cutting annual infrastructure cost.
        </p>

        <div style={{ marginTop: 32 }}>
          <OutcomeCards tiers={outcomeTiers} />
        </div>

        <div style={{ marginTop: 32 }}>
          <AnnotatedFigure
            figure={0}
            label="Verified production outcomes"
            imageSrc="/assets/work/fetsproza/block-outcome.png"
            imageAlt="Verified production metrics — cost, throughput, operator experience, and volume at scale"
            caption="Production dashboard metrics across operational, business, and strategic outcomes."
            decisionNotes={[]}
            imageOnly
          />
        </div>

        <p style={{ marginTop: 40, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          Together, these improvements enabled FETS to own and evolve its operational capabilities rather than depend on
          a third-party platform.
        </p>

        <blockquote
          style={{
            marginTop: 32,
            marginBottom: 0,
            padding: 0,
            border: "none",
            maxWidth: 760,
          }}
        >
          <p style={{ fontSize: 15, color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
            &quot;John demonstrated deep systems thinking and product leadership throughout FetsProza&apos;s redesign,
            translating complex financial operations into intuitive, scalable systems.&quot;
          </p>
          <footer style={{ marginTop: 10, fontSize: 12, color: "var(--fg-subtle)" }}>
            — Clement Asibeluo, Chief Technology Officer, Fets
          </footer>
        </blockquote>
      </section>

      <section id="reflection" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 64px" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          06 Reflection
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What this changed about how I design at scale
        </h2>
        <div style={{ marginTop: 24, maxWidth: 760 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            The hardest work was not interface design. It was mapping how the business actually ran, then deciding which
            workflows to own, simplify, or cut — with engineering and the CTO aligned on trade-offs before screens
            existed.
          </p>
          <p style={{ marginTop: 18, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75 }}>
            Operating-model design is a commercial lever. When the business can run on its own tooling, product decisions
            and infrastructure decisions become the same conversation.
          </p>
          <p style={{ marginTop: 28, fontSize: 20, fontWeight: 600, color: "var(--fg)", lineHeight: 1.5 }}>
            Designing operational models, not just interfaces.
          </p>
        </div>
      </section>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
