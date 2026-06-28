import type { Metadata } from "next";
import StickyChapterNav from "@/components/case-study/StickyChapterNav";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import DecisionAccordion from "@/components/case-study/DecisionAccordion";
import JudgmentCallout from "@/components/case-study/JudgmentCallout";
import WorkflowTransformationDiagram from "@/components/case-study/WorkflowTransformationDiagram";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "SeamlessHiring 2.0",
  description:
    "A phased redesign of an underperforming recruitment product that evolved " +
    "into a flagship enterprise module — introducing AI-assisted hiring workflows " +
    "and laying the foundation for Seamkit.",
  alternates: { canonical: "/work/seamless-hiring" },
};

const chapters = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Tensions" },
  { id: "evidence", label: "03 Evidence" },
  { id: "outcomes", label: "04 Outcomes" },
  { id: "unlocks", label: "05 Lasting Impact" },
];

const phases: Phase[] = [
  { id: "phase-I", number: "Phase I", name: "Stabilize", description: "Job creation foundations" },
  { id: "phase-II", number: "Phase II", name: "Streamline", description: "Application flow redesign" },
  { id: "phase-III", number: "Phase III", name: "Structure", description: "ATS + evaluation redesign" },
  { id: "phase-IV", number: "Phase IV", name: "Scale", description: "RBAC + enterprise permissions" },
  { id: "phase-V", number: "Phase V", name: "Augment", description: "AI-powered ATS" },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "PRODUCT",
    items: [
      "↓24%   Application drop-offs",
      "↑40%   User satisfaction",
      "↑20%   Job-post engagement",
    ],
  },
  {
    category: "OPERATIONS",
    items: [
      "↓50%      Support requests",
      "Faster recruiter workflows",
      "Lower onboarding effort",
    ],
  },
  {
    category: "BUSINESS",
    items: [
      "Premium enterprise pricing",
      "PLG reference product",
      "Foundation for SeamKit",
    ],
    caption:
      "RMS transitioned from a ₦150k one-time add-on into a recurring product (~₦200k/month), while international pricing increased from $200 to up to $500/month depending on enterprise scale.",
  },
  {
    category: "PLATFORM",
    items: [
      "AI-ready recruitment workflows",
      "Reusable enterprise patterns",
      "Design system foundation",
    ],
  },
];

export default function SeamlessHiringFlagshipCaseStudy() {
  const project = getProject("seamless-hiring");
  if (!project?.brief) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "seamless-hiring");
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
        sectionId="brief"
        microLabel={`${project.company} · ${project.period}`}
        title="SeamlessHiring 2.0"
        subtitle="Recruitment Management System (RMS)"
        thesisLead="Rebuilding fragmented recruiting workflows into a scalable hiring operating system."
        thesis="A high-volume graduate hiring programme exposed how badly the legacy RMS broke under scale — recruiters lost trust in core workflows long before interface polish could matter."
        abstract="SeamlessHiring began as a fragmented recruitment add-on that broke under scale during a high-volume graduate hiring programme. The redesign focused on restoring workflow trust, restructuring the hiring lifecycle, and repositioning RMS from a low-cost add-on into a scalable, enterprise-priced product across local and international markets."
        impact={project.metrics}
        impactGroups={[
          {
            label: "Business Impact",
            metrics: [
              { value: "↑", label: "Premium pricing" },
              { value: "↓50%", label: "Support volume" },
              { value: "↑20%", label: "Job engagement" },
            ],
          },
          {
            label: "User Impact",
            metrics: [
              { value: "↓24%", label: "Application drop-offs" },
              { value: "↑40%", label: "Satisfaction" },
            ],
          },
        ]}
        showHeroImage={false}
        heroImage={{
          src: "/assets/work/seamless-hiring/preview-hero-media.png",
          alt: "SeamlessHiring 2.0 product overview",
          embedChrome: "evidence",
          chromeSize: "hero",
        }}
        executiveBrief={{
          ...project.brief,
          variant: "engagement",
          sectionLabel: "01 Executive Brief",
        }}
      />

      <TensionCards
        label="02 Core Tensions"
        heading="What was broken"
        subhead="Three systemic failures that made redesign unavoidable — not isolated interface issues, but structural breakdowns that prevented the system from supporting enterprise hiring at scale."
        cards={[
          {
            number: "01",
            title: "Recruitment workflows no longer scaled",
            body:
              "Recruiters were abandoning core tasks mid-flow and coordinating outside the system — creating invisible work and audit gaps that compounded with every new hire.",
          },
          {
            number: "02",
            title: "Hiring decisions lacked consistency",
            body:
              "Interview scoring was informal and undocumented, leaving hiring decisions without a defensible trail — a consistency and legal exposure risk at enterprise scale.",
          },
          {
            number: "03",
            title: "Permissions became a bottleneck for enterprise growth",
            body:
              "Legacy RBAC could not support multi-entity client realities, forcing manual CS workarounds and capping how large the platform could sell.",
          },
        ]}
      />

      <div style={{ maxWidth: 1240, margin: "32px auto 0", padding: "0 24px" }}>
        <AnnotatedFigure
          figure="B"
          label="Before State"
          imageSrc="/assets/work/seamless-hiring/block-before-state.png"
          imageAlt="SeamlessHiring before redesign — broken application flow and navigation"
          caption="Navigation misrouted core tasks, evaluation had no system surface, and permission models blocked enterprise use cases."
          decisionNotes={[]}
          hideDecisionNotes
        />
      </div>

      <div style={{ padding: "0 24px" }}>
        <WorkflowTransformationDiagram
          intro="The redesign wasn't a UI refresh — it replaced a fragmented manual operating model with a structured hiring system."
          beforeLabel="Before"
          afterLabel="After"
          beforeSteps={[
            "Job Creation",
            "Spreadsheet Reviews",
            "Interview Notes",
            "Email Coordination",
            "Offer",
          ]}
          afterSteps={[
            "Structured Job Creation",
            "Applicant Tracking",
            "Assessment Dossier",
            "Enterprise Permissions",
            "AI Recommendations",
            "Offer",
          ]}
        />
      </div>

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Evidence in Practice
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 64 }}>
        <EvidenceModule
          id="phase-I"
          phase="Phase I — Stabilize"
          layout="text-left"
          layoutVariant="problem-first"
          challenge="Job creation was inconsistent across hiring managers — no shared templates, no structured input model, and errors compounding downstream before a role even reached applicants."
          intervention="Guided job creation templates standardizing inputs and enforcing required fields before a role was published."
          outcome="Reduced setup friction and improved consistency across hiring teams before roles entered the pipeline."
          figure={{
            figure: 1,
            label: "Job Creation",
            imageSrc: "/assets/work/seamless-hiring/phase-job-creation.png",
            imageAlt: "Phase I — Job creation workflow redesign",
            caption: "Standardized job creation through guided templates.",
          }}
        />

        <EvidenceModule
          id="phase-II"
          phase="Phase II — Streamline"
          layout="text-right"
          layoutVariant="image-first"
          challenge="Applicants were abandoning mid-flow with no recovery path and no visibility into what would be required until they were already partially through the application."
          intervention="Application journey reframed around completion confidence — required documents surfaced at the start, persistent progress state visible throughout."
          outcome="Application drop-offs fell 24% as surprise abandonment patterns were removed from the flow."
          judgment={
            <JudgmentCallout kind="Trade-off">
              We prioritised workflow confidence over interface simplicity — surfacing progress and required documents
              early reduced abandonment despite introducing additional UI elements.
            </JudgmentCallout>
          }
          figure={{
            figure: 2,
            label: "Application Flow",
            imageSrc: "/assets/work/seamless-hiring/phase-application.png",
            imageAlt: "Phase II — Application flow redesign",
            caption: "Completion confidence reframed the applicant journey.",
          }}
        />

        <EvidenceModule
          id="phase-III"
          phase="Phase III — Structure"
          layout="text-left"
          layoutVariant="compact"
          challenge="Interview scoring was informal and undocumented. Evaluation lived in spreadsheets and email threads outside the system, leaving hiring decisions without a defensible trail."
          intervention="Structured evaluation workflows with a shared scoring rubric, documentation trail, and consolidated recruiter action surface."
          outcome="Hiring decisions moved back inside the system with a defensible evaluation trail."
          figure={{
            figure: 3,
            label: "Evaluation System",
            imageSrc: "/assets/work/seamless-hiring/phase-ats.png",
            imageAlt: "Phase III — ATS and evaluation redesign",
            caption: "Structured evaluation replaced informal scoring.",
          }}
        />

        <EvidenceModule
          id="phase-IV"
          phase="Phase IV — Scale"
          layout="text-right"
          layoutVariant="problem-first"
          challenge="RBAC configuration was too rigid for multi-entity enterprise clients. Every new onboarding required CS workarounds, creating a ceiling on how large the platform could sell."
          intervention="Permission model redesigned to support role inheritance, entity-level overrides, and self-service admin assignment."
          outcome="Enterprise onboarding no longer depended on manual CS intervention for every new client."
          judgment={
            <JudgmentCallout kind="Judgment">
              We redesigned RBAC for enterprise scalability — role inheritance and entity-level overrides replaced flat
              permissions that blocked multi-entity growth.
            </JudgmentCallout>
          }
          figure={{
            figure: 4,
            label: "Permission Architecture",
            imageSrc: "/assets/work/seamless-hiring/phase-rbac.png",
            imageAlt: "Phase IV — RBAC and permission model redesign",
            caption: "Permissions became a growth enabler, not an onboarding tax.",
          }}
        />

        <EvidenceModule
          id="phase-V"
          phase="Phase V — Augment"
          layout="text-left"
          layoutVariant="climax"
          accent
          intro="AI wasn't our starting point. It became possible only after rebuilding the recruitment workflow around trust, structured evaluation, and consistent data."
          pullQuote="AI was designed as decision support, not decision authority."
          judgment={
            <JudgmentCallout kind="Judgment">
              We deliberately delayed AI until Phase V because automation compounds broken workflows rather than fixing
              them — intelligence had to augment a system recruiters already trusted.
            </JudgmentCallout>
          }
          challenge="Recruiters were spending disproportionate time on manual CV screening — a high-volume, low-judgment task the redesigned system was now stable enough to augment."
          intervention="AI-assisted recommendations introduced to support recruiter evaluation and shortlisting — augmenting structured decision-making rather than replacing it."
          outcome="Ranking surfaces signal; shortlisting remains recruiter-owned — with explainable recommendations, not opaque scores."
          figure={{
            figure: 5,
            label: "Pilot Review — AI in RMS",
            imageSrc: "/assets/work/seamless-hiring/pilot-review-ai.png",
            imageAlt: "Pilot Review — AI-assisted candidate ranking within recruitment workflows",
            caption: "AI-assisted ranking inside a trusted workflow.",
          }}
        />

        <div style={{ padding: "0 24px 32px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <p style={{ fontSize: 13, color: "var(--fg-muted)", fontStyle: "italic", margin: 0, lineHeight: 1.6 }}>
              Patterns piloted in SeamlessHiring later informed broader work on SeamlessAI&apos;s reusable enterprise AI
              interaction layer.
            </p>
          </div>
        </div>
      </div>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Results across four dimensions
        </h2>
        <OutcomeCards tiers={outcomeTiers} />

        <div style={{ marginTop: 56, maxWidth: 760 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
            Strategic decisions
          </p>
          <h3
            style={{
              marginTop: 14,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--fg)",
            }}
          >
            Judgment before execution
          </h3>
          <p style={{ marginTop: 10, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7 }}>
            Five choices that shaped the programme — alternatives considered, costs accepted, and what each unlocked.
          </p>
          <JudgmentCallout kind="Judgment">
            We chose phased modernization over a full rewrite because active enterprise hiring pipelines could not
            tolerate a disruptive cut-over — trust had to be rebuilt while the product remained operational.
          </JudgmentCallout>
          <div style={{ marginTop: 24 }}>
            <DecisionAccordion entries={project.brief.strategicDecisions ?? []} />
          </div>
        </div>
      </section>

      <UnlockPanel
        label="05 Lasting Impact"
        items={[
          "Established the phased redesign model applied to every subsequent enterprise product — including IBEDC and FetsProza.",
          "Seeded the organizational case for Seamkit. SeamlessHiring was the first product migrated to the unified design system, and the proof-of-concept that made cross-team adoption credible.",
          "Helped reposition design from delivery support into a pricing and retention lever — changing how sales framed the product category.",
        ]}
      />

      <div style={{ maxWidth: 1240, margin: "48px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 15, color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
          &quot;The redesign transformed SeamlessHiring from a functional but frustrating tool into a scalable enterprise product.&quot;
        </p>
        <p style={{ marginTop: 10, fontSize: 12, color: "var(--fg-subtle)", maxWidth: 760 }}>
          — Femisayo Olofintila, Head of Product Management, SeamlessHR
        </p>
      </div>

      <div style={{ maxWidth: 1240, margin: "56px auto 0", padding: "0 24px 80px" }}>
        <blockquote
          style={{
            margin: 0,
            padding: 0,
            border: "none",
            maxWidth: 720,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 600,
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              color: "var(--fg)",
            }}
          >
            The biggest lesson wasn&apos;t about interfaces. It was about operating models.
          </p>
          <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.75, color: "var(--fg-body)" }}>
            Once the system changed, better interfaces became a consequence rather than the objective. That philosophy
            later shaped SeamKit and FetsProza — and how I approach enterprise product strategy today.
          </p>
        </blockquote>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
