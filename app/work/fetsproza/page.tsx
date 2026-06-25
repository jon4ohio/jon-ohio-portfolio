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
      "Engineering dependency reduced — routine configuration owned by business teams",
      "Transaction visibility improved across operational teams",
      "Standardized workflows for monitoring, reconciliation, and administration",
      "80% task success on ops dashboard usability testing",
      "NPS 3.4 → 4.6 — internal operator satisfaction",
      "↓40% onboarding time · ↓30% support interventions",
    ],
  },
  {
    category: "BUSINESS",
    items: [
      "$1M+ — Annual savings from vendor elimination",
      "↓50% — Settlement time (4s → 2s)",
      "2× — Transaction throughput (10k → 20k per minute)",
      "↓30% — OpEx ($500k → $350k)",
      "Faster partner onboarding through unified workflows",
    ],
  },
  {
    category: "STRATEGIC",
    items: [
      "₦89.7B+ — Processed in last financial year (production dashboard)",
      "Fetswallet Congo — White-label deployment",
      "Owned operational capability — no third-party platform dependency",
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
        abstract="FETS ran mobile money operations on a third-party platform that constrained margins, blocked customization, and capped throughput. As Product Design Lead, I defined the operational experience for FetsProza — giving operational teams visibility into transactions, reconciliation, and administration without engineering dependency. The redesign eliminated vendor costs, doubled throughput, and established an owned operational foundation at production scale."
        impact={project.metrics}
        heroImage={{
          src: "/assets/work/fetsproza/preview-16x9.png",
          alt: "FetsProza reconciliation dashboard — operational workspace for mobile money teams",
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
          Business challenge
        </h2>
        <div style={{ marginTop: 20, maxWidth: 760 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            Operational teams managed mobile money at scale through manual workarounds layered on a vendor platform
            not built for how they worked. Reconciliation errors surfaced at end-of-day review. Transaction status
            required engineering to investigate. Product configuration waited on development cycles. As the agent
            network grew, operational overhead scaled linearly — and a 10k-per-minute throughput ceiling was already
            becoming a bottleneck.
          </p>
          <p style={{ marginTop: 18, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75 }}>
            The challenge was not replacing software — it was redesigning how the business operated through software.
          </p>
        </div>

        <TensionCards
          embedded
          heading="What we learned"
          subhead="Research across operational teams surfaced four constraints that shaped the redesign."
          cards={[
            {
              number: "01",
              title: "Configuration dependency",
              body:
                "Routine business configuration — products, charges, payment methods — depended on engineering. Every change queued behind development capacity.",
            },
            {
              number: "02",
              title: "Visibility gaps",
              body:
                "Operators could not see transaction status, bottlenecks, or failure patterns without engineering support. Investigation was reactive, not operational.",
            },
            {
              number: "03",
              title: "Financial oversight burden",
              body:
                "Reconciliation and settlement lived in manual coordination. Errors surfaced too late to fix at source — finance teams closed books through workarounds.",
            },
            {
              number: "04",
              title: "Growth complexity",
              body:
                "Merchant onboarding, role administration, and partner workflows did not scale with the agent network. Each new market added operational friction.",
            },
          ]}
        />

        <p style={{ marginTop: 40, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The redesign ultimately spanned eleven connected workflows. Rather than documenting every module
          individually, this case study focuses on the <strong>four decisions</strong> that changed how the business
          operated.
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
          Design strategy
        </h2>
        <div style={{ marginTop: 24, maxWidth: 760, display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Configuration over engineering.</strong> Business teams should
            manage products, charges, and payment methods through structured workflows — not development tickets.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Visibility over investigation.</strong> Operators need real-time
            transaction health at the point of work — not end-of-day reports assembled from multiple systems.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Dense doesn&apos;t mean difficult.</strong> Operational teams scan
            hundreds of records daily. Information density is a feature when hierarchy and status are clear.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Consistency across roles.</strong> The same navigation patterns,
            validation logic, and status language should work whether you configure products, monitor transactions, or
            administer teams.
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
          Four decisions that changed how operational teams ran the business — not what modules we shipped.
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
          challenge="Routine business configuration — products, charges, and payment methods — depended on engineering. Every operational change queued behind development capacity."
          intervention="Structured self-service workflows with validation and operational guardrails — business teams configure products without engineering tickets."
          reasoning="Longer forms increased completion time slightly, but validation dramatically reduced costly configuration mistakes. Progressive disclosure kept complex setups manageable without hiding critical controls."
          outcome="Business teams could manage products independently while maintaining governance."
          figure={{
            figure: 1,
            label: "Product configuration",
            imageSrc: "/assets/work/fetsproza/block-module-payment.png",
            imageAlt: "Product configuration — self-service workflows with validation and operational guardrails",
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
          challenge="Operators could not see transaction status, bottlenecks, or failure patterns without engineering support. Investigation was reactive — stuck at end-of-day review."
          intervention="Transaction tracker with status breakdown, bottleneck view, and re-query actions at the row level — visibility where operators already work."
          reasoning="Persistent navigation and information density prioritized scan speed over simplified views. Operators process hundreds of records daily; reducing clicks mattered more than reducing fields."
          outcome="Operational teams gained self-service visibility into transaction health at production scale."
          figure={{
            figure: 2,
            label: "Transaction monitoring",
            imageSrc: "/assets/work/fetsproza/thumb-2.png",
            imageAlt: "Transaction tracker with status breakdown, bottleneck view, and re-query actions",
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
          challenge="Closing the books required manual coordination across teams. Matched and unmatched transactions surfaced at end-of-day — too late to resolve at source."
          intervention="Reconciliation dashboard with matched and unmatched breakdown, settlement reports, and export — continuous visibility instead of batch review."
          reasoning="Batch reconciliation was familiar but expensive. Embedding reconciliation into daily operations meant errors were actionable where operators work, not in a separate end-of-day process."
          outcome="Finance teams closed books through a single operational view instead of manual coordination."
          figure={{
            figure: 3,
            label: "Reconciliation dashboard",
            imageSrc: "/assets/work/fetsproza/hero.png",
            imageAlt: "Reconciliation dashboard showing matched and unmatched transaction breakdown",
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
          challenge="Merchant onboarding and team administration were error-prone without guided setup and clear role definitions. Each new partner added operational friction."
          intervention="User management with defined roles, contextual help across forms, and guided onboarding for operational admins — not engineers configuring the system."
          reasoning="Role clarity and guided workflows reduced onboarding errors more than feature breadth. A scalable admin model had to work for the agent network, not just headquarters staff."
          outcome="Partner onboarding accelerated through unified administration workflows at network scale."
          figure={{
            figure: 4,
            label: "Team administration",
            imageSrc: "/assets/work/fetsproza/block-module-merchant.png",
            imageAlt: "Team administration — user management with role clarity and guided onboarding",
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
          Business impact
        </h2>
        <p style={{ marginTop: 20, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The redesign improved operational efficiency, reduced costs, and established a scalable operational foundation
          for future growth.
        </p>

        <div style={{ marginTop: 32 }}>
          <AnnotatedFigure
            figure={0}
            label="Platform outcomes"
            imageSrc="/assets/work/fetsproza/block-outcome.png"
            imageAlt="Platform outcomes — operational, business, and strategic impact metrics"
            caption="Before/after metrics across cost, throughput, operator experience, and production volume."
            decisionNotes={[]}
            imageOnly
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <OutcomeCards tiers={outcomeTiers} />
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
          Reflection
        </h2>
        <div style={{ marginTop: 24, maxWidth: 760 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            FetsProza was product definition without a PM — sole design and product owner from concept through launch,
            working directly with engineering and domain experts. The hardest work was not interface design. It was
            mapping how operational teams actually ran the business, then deciding which workflows to own, simplify, or
            eliminate.
          </p>
          <p style={{ marginTop: 18, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75 }}>
            Replacing a $1M+ vendor dependency proved that operational experience redesign is a commercial decision — not
            just a technical one. The visibility-first pattern established here became the model for how FETS builds
            operator-facing financial products.
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
