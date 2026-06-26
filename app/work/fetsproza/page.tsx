import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

const STORY_TITLE = "FetsProza";
const SECTION_PAD = "56px 24px 0";

const SNAPSHOT_THESIS_LEAD =
  "Designing the operating platform that unified a fragmented payment ecosystem.";

const SNAPSHOT_THESIS =
  "FETS wasn't constrained by missing payment capabilities—it was constrained by fragmented infrastructure. Every customer transaction depended on multiple vendor-managed systems working together, making failures expensive, difficult to diagnose, and increasingly costly to operate.";

const SNAPSHOT_ABSTRACT =
  "FetsProza became the operational platform that unified those services into a single transaction lifecycle. With no dedicated Product Manager, I led product definition alongside the CTO, translating distributed financial infrastructure into workflows business teams could operate at scale.";

export const metadata: Metadata = {
  title: STORY_TITLE,
  description:
    "Enterprise payment orchestration case study: designing the operating platform that unified FETS's fragmented ecosystem — $1M+ vendor savings at production scale. By John Ohio.",
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

function SectionDivider() {
  return (
    <div style={{ padding: "0 24px" }}>
      <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
    </div>
  );
}

function EcosystemShiftDiagram() {
  const panelStyle = {
    flex: 1,
    minWidth: 0,
    padding: "24px 20px",
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface-subtle)",
  } as const;

  const labelStyle = {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "var(--fg-subtle)",
    margin: 0,
  };

  const nodeStyle = {
    fontSize: 14,
    color: "var(--fg-body)",
    lineHeight: 1.5,
    textAlign: "center" as const,
  };

  return (
    <section
      aria-label="Before and after: fragmented payment orchestration versus unified FetsProza operating platform"
      style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 0" }}
    >
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)", margin: 0 }}>
        From fragmented payment orchestration to a unified operating platform
      </p>
      <div className="case-study-ecosystem-diagram" style={{ marginTop: 20, display: "flex", gap: 20 }}>
        <div style={panelStyle}>
          <p style={labelStyle}>Before</p>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <p style={{ ...nodeStyle, fontWeight: 600, color: "var(--fg)" }}>Customer</p>
            <p style={{ fontSize: 18, color: "var(--fg-muted)", lineHeight: 1, margin: 0 }} aria-hidden>
              │
            </p>
            <p style={{ fontSize: 18, color: "var(--fg-muted)", lineHeight: 1, margin: 0 }} aria-hidden>
              ▼
            </p>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              {["Vendor A", "Vendor B", "Vendor C", "Vendor D"].map((vendor) => (
                <div
                  key={vendor}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: "1px dashed var(--border)",
                    background: "var(--bg)",
                    fontSize: 13,
                    color: "var(--fg-muted)",
                    textAlign: "center",
                  }}
                >
                  {vendor}
                </div>
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--fg-muted)", textAlign: "center", lineHeight: 1.5 }}>
              Business struggles to operate
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", color: "var(--fg-subtle)", fontSize: 20 }} aria-hidden>
          →
        </div>
        <div style={panelStyle}>
          <p style={labelStyle}>After</p>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <p style={{ ...nodeStyle, fontWeight: 600, color: "var(--fg)" }}>Customer</p>
            <p style={{ fontSize: 18, color: "var(--fg-muted)", lineHeight: 1, margin: 0 }} aria-hidden>
              │
            </p>
            <p style={{ fontSize: 18, color: "var(--fg-muted)", lineHeight: 1, margin: 0 }} aria-hidden>
              ▼
            </p>
            <div
              style={{
                width: "100%",
                marginTop: 4,
                padding: "16px 14px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>FetsProza</p>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--fg-body)", lineHeight: 1.55 }}>
                One operational platform
                <br />
                One transaction lifecycle
                <br />
                One operational model
              </p>
            </div>
            <p style={{ marginTop: 12, fontSize: 13, color: "var(--fg-body)", textAlign: "center", lineHeight: 1.5, fontWeight: 500 }}>
              Business controls the financial operating system
            </p>
          </div>
        </div>
      </div>
    </section>
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
          .case-study-ecosystem-diagram { flex-direction: column !important; }
          .case-study-ecosystem-diagram > div:nth-child(2) { transform: rotate(90deg); align-self: center; }
        }
        @media (min-width: 901px) {
          .case-study-phase-mobile { display: none !important; }
        }
        .case-study-evidence-scan img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>

      <FlagshipOpener
        sectionId="snapshot"
        microLabel={`${project.company} · ${project.period}`}
        title={STORY_TITLE}
        subtitle="Enterprise operating platform for FETS."
        thesisLead={SNAPSHOT_THESIS_LEAD}
        thesis={SNAPSHOT_THESIS}
        abstract={SNAPSHOT_ABSTRACT}
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

      <EcosystemShiftDiagram />

      <section id="challenge" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          02 Challenge
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Why fragmented infrastructure blocked growth
        </h2>
        <div style={{ marginTop: 20, maxWidth: 760 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            Behind every customer transaction were four to five independent systems built by different vendors. A failed
            handshake could debit customers without delivering service, break reconciliation across platforms, and inflate
            operational cost with every new integration.
          </p>
          <p style={{ marginTop: 18, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75 }}>
            The challenge wasn&apos;t designing payment experiences or replacing software—it was coordinating how an entire
            financial business operated through one platform.
          </p>
        </div>

        <TensionCards
          embedded
          heading="What blocked scale"
          subhead="Four constraints the fragmented stack created for the business."
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

        <p style={{ marginTop: 28, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The redesign ultimately spanned eleven connected workflows. Rather than documenting every screen, this case
          study focuses on the <strong>four decisions</strong> that fundamentally changed how the business operated.
        </p>

        <div style={{ marginTop: 24, maxWidth: 960 }}>
          <AnnotatedFigure
            figure={0}
            label="Platform scope — eleven operational workflows"
            caption="Login · Users · Accounts · Products · Configuration · Transactions · Settlements"
            decisionNotes={[]}
          />
        </div>
      </section>

      <section id="strategy" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Strategy
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Principles for unifying the operating model
        </h2>
        <div style={{ marginTop: 24, maxWidth: 760, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            Rather than continuing to integrate independent platforms, we designed FetsProza around a unified orchestration
            model. Every operational workflow — from configuration to reconciliation — would operate on a{" "}
            <strong style={{ color: "var(--fg)" }}>single source of transaction truth</strong>.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Configuration over engineering.</strong> Business-team ownership of
            product setup over engineering throughput — longer guided forms to prevent costly production mistakes.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Visibility over investigation.</strong> Real-time transaction health at
            the point of work — not simplified dashboards that hide daily operator work.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Dense doesn&apos;t mean difficult.</strong> Scan-friendly density over
            stripped-down views that force extra navigation.
          </p>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: "var(--fg)" }}>Consistency across roles.</strong> One operating model across
            workflows — not eleven disconnected modules.
          </p>
        </div>
      </section>

      <section id="decisions" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Decisions
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          The decisions that changed how the business operated
        </h2>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          Four judgments that changed how the business ran — not what we shipped.
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={decisions} />
        </div>
      </section>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 48 }}>
        <EvidenceModule
          id="decision-config"
          phase=""
          layout="text-left"
          decisionLayout="scan"
          decisionHeadline="Enable business teams to configure products independently"
          challenge="Business configuration depended on engineering for routine changes."
          intervention="Give business teams governed self-service configuration with validation and guardrails — rejecting minimal forms that failed in production."
          outcome="Routine configuration became a business capability instead of an engineering dependency."
          figure={{
            figure: 1,
            label: "Product configuration",
            imageSrc: "/assets/work/fetsproza/block-module-payment.png",
            imageAlt: "Evidence: routine configuration became a business capability — not an engineering queue",
            caption: "",
            decisionNotes: [],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="decision-visibility"
          phase=""
          layout="text-left"
          decisionLayout="scan"
          decisionHeadline="Give operators real-time visibility into transaction health"
          challenge="Stuck and failed transactions required engineering escalation."
          intervention="Put transaction health and re-query where operators work — rejecting simplified views that hid the density they scan daily."
          outcome="Transaction investigation moved from engineering queues to frontline operations."
          figure={{
            figure: 2,
            label: "Transaction monitoring",
            imageSrc: "/assets/work/fetsproza/thumb-2.png",
            imageAlt: "Evidence: transaction investigation moved to frontline operations — without engineering escalation",
            caption: "",
            decisionNotes: [],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="decision-reconciliation"
          phase=""
          layout="text-left"
          decisionLayout="scan"
          decisionHeadline="Make reconciliation part of daily operations"
          challenge="Closing the books required coordinating across teams and tools."
          intervention="Embed matched and unmatched flows into daily operations — rejecting batch reconciliation at period close."
          outcome="Reconciliation shifted from period-close coordination to a continuous operational capability."
          figure={{
            figure: 3,
            label: "Reconciliation dashboard",
            imageSrc: "/assets/work/fetsproza/hero.png",
            imageAlt: "Evidence: reconciliation became a continuous capability — not a period-close fire drill",
            caption: "",
            decisionNotes: [],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="decision-administration"
          phase=""
          layout="text-left"
          decisionLayout="scan"
          decisionHeadline="Create a scalable operating model for administration"
          challenge="Partner onboarding broke down as the agent network grew."
          intervention="Standardize roles and guided onboarding for the network — rejecting feature breadth that added training burden."
          outcome="Partner onboarding scaled through one administration model instead of ad hoc process sprawl."
          figure={{
            figure: 4,
            label: "Team administration",
            imageSrc: "/assets/work/fetsproza/block-module-merchant.png",
            imageAlt: "Evidence: partner onboarding scaled through one administration model — not process sprawl",
            caption: "",
            decisionNotes: [],
          }}
        />
      </div>

      <div style={{ marginTop: 64 }}>
        <SectionDivider />
      </div>

      <div
        id="operational-walkthrough"
        style={{ maxWidth: 1240, margin: "40px auto 96px", padding: "0 24px" }}
      >
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--fg)",
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          Seeing the redesign in practice
        </h3>
        <p style={{ marginTop: 16, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The four decisions above changed how operators configured, monitored, and managed the platform. The
          walkthrough below brings those decisions together, showing how operational teams could move from understanding
          transaction health to investigating issues and monitoring business performance—all within a single workspace,
          without relying on engineering support.
        </p>
        <div style={{ marginTop: 28, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/work/fetsproza/demo-transaction-visibility.gif"
            alt="FetsProza operational walkthrough — transaction health, investigation, and business performance in one workspace"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <p
          style={{
            marginTop: 14,
            fontSize: 14,
            color: "var(--fg-muted)",
            fontStyle: "italic",
            lineHeight: 1.6,
            maxWidth: 760,
          }}
        >
          Operators could move from transaction health to investigation and operational oversight without switching
          tools or involving engineering.
        </p>
      </div>

      <section id="impact" style={{ maxWidth: 1240, margin: "0 auto", padding: SECTION_PAD }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          05 Impact
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What improved — and what it unlocked
        </h2>
        <p style={{ marginTop: 20, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          FETS replaced fragmented vendor orchestration with a unified operating platform—cutting $1M+ in annual vendor
          cost while improving operational reliability and enabling business teams to own day-to-day financial operations.
        </p>

        <div style={{ marginTop: 28 }}>
          <AnnotatedFigure
            figure={0}
            label="Impact outcomes"
            imageSrc="/assets/work/fetsproza/block-outcome.png"
            imageAlt="FetsProza impact — operational, business, and strategic outcomes with CTO validation"
            caption=""
            decisionNotes={[]}
            imageOnly
          />
        </div>

        <p style={{ marginTop: 28, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          Together, these improvements enabled FETS to evolve its financial operations on a unified enterprise platform
          rather than depend on fragmented vendor systems.
        </p>
      </section>

      <section id="reflection" style={{ maxWidth: 1240, margin: "0 auto", padding: "56px 24px 48px" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          06 Reflection
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What this changed about how I design at scale
        </h2>
        <div style={{ marginTop: 24, maxWidth: 760 }}>
          <p style={{ fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, margin: 0 }}>
            The hardest work wasn&apos;t designing interfaces—it was understanding how the business actually operated
            before deciding what to simplify, standardize, or remove.
          </p>
          <p style={{ marginTop: 24, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75 }}>
            This project taught me that enterprise design isn&apos;t about making complex systems look simple. It&apos;s
            about making complex businesses operate simply.
          </p>
          <p style={{ marginTop: 28, fontSize: 20, fontWeight: 600, color: "var(--fg)", lineHeight: 1.5 }}>
            Since then, I&apos;ve approached every enterprise product the same way: designing operational models, not
            just interfaces.
          </p>
        </div>
      </section>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
