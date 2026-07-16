import type { Metadata } from "next";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import DecisionAccordion from "@/components/case-study/DecisionAccordion";
import SectionDivider from "@/components/case-study/SectionDivider";
import RailSection from "@/components/case-study/RailSection";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import YouTubePosterPlayer from "@/components/case-study/YouTubePosterPlayer";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, getCaseStudyNeighbors } from "@/lib/projects";

export const metadata: Metadata = {
  title: "SeamlessHiring 2.0",
  description:
    "A phased redesign of an underperforming recruitment product that evolved " +
    "into a flagship enterprise module — introducing AI-assisted hiring workflows " +
    "and laying the foundation for Seamkit.",
  alternates: { canonical: "/work/seamless-hiring" },
};

const phases: Phase[] = [
  { id: "phase-I", number: "Phase I", name: "Stabilize", description: "Job creation foundations" },
  { id: "phase-II", number: "Phase II", name: "Streamline", description: "Application flow redesign" },
  { id: "phase-III", number: "Phase III", name: "Structure", description: "ATS + evaluation redesign" },
  { id: "phase-IV", number: "Phase IV", name: "Scale", description: "RBAC + enterprise permissions" },
  { id: "phase-V", number: "Phase V", name: "Augment", description: "AI-powered ATS" },
];

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Tensions" },
  { id: "evidence", label: "03 Evidence" },
  { id: "strategic-decisions", label: "04 Decisions" },
  { id: "outcomes", label: "05 Outcomes" },
  { id: "unlocks", label: "06 Unlocks" },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "PRODUCT",
    items: [
      "↓24%   Application drop-offs",
      "↑40%   User satisfaction",
      "↑20%   Job-post engagement",
      "27→74  NPS",
    ],
  },
  {
    category: "OPERATIONAL",
    items: [
      "45→11%    Recruiter churn",
      "↓50%      Support volume",
      "3.8m→1.6m Time-to-value (job creation)",
    ],
  },
  {
    category: "STRATEGIC",
    items: [
      "Generated Seamkit — enterprise design system now serving multiple products",
      "Became PLG reference product across SeamlessHR",
      "Established phased redesign model applied to subsequent enterprise products",
    ],
    caption:
      "RMS transitioned from a ₦150k one-time add-on into a recurring product (~₦200k/month), while international pricing increased from $200 to up to $500/month depending on enterprise scale.",
  },
  {
    category: "INTELLIGENCE",
    items: [
      "AI-assisted CV parsing introduced",
      "Smart candidate ranking active",
      "Manual screening effort reduced",
      "Structured evaluation improved decision consistency",
    ],
  },
];

export default function SeamlessHiringFlagshipCaseStudy() {
  const project = getProject("seamless-hiring");
  if (!project?.brief) return null;

  const { prev, next } = getCaseStudyNeighbors("seamless-hiring");

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
        microLabel="SeamlessHR · Mar 2022 – Mar 2025"
        title="SeamlessHiring 2.0"
        subtitle="Recruitment Management System (RMS)"
        thesis="Rebuilding fragmented recruiting workflows into a scalable hiring operating system."
        abstract={
          "SeamlessHiring began as a fragmented recruitment add-on that broke " +
          "under scale during a high-volume graduate hiring programme. The redesign " +
          "focused on restoring workflow trust, restructuring the hiring lifecycle, and " +
          "repositioning RMS from a low-cost add-on into a scalable, enterprise-priced " +
          "product across local and international markets."
        }
        impact={[
          { value: "↓24%", label: "Application drop-offs" },
          { value: "↑40%", label: "User satisfaction" },
          { value: "↑20%", label: "Job-post engagement" },
          { value: "↓50%", label: "Support volume" },
        ]}
        heroImage={{
          src: "/assets/work/seamless-hiring/preview-hero-media.png",
          alt: "SeamlessHiring 2.0 product overview",
          embedChrome: "evidence",
          chromeSize: "hero",
        }}
        executiveBrief={project.brief}
      />

      <RailSection id="tensions" eyebrow="02 Core Tensions" title="What was broken">
        <p style={{ margin: 0, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 640 }}>
          Three systemic failures that made redesign unavoidable — not isolated interface issues, but structural
          breakdowns that prevented the system from supporting enterprise hiring at scale.
        </p>
        <TensionCards
        embedded
        cards={[
          {
            number: "01",
            title: "Workflow collapse under scale",
            body:
              "Recruiters were abandoning core tasks mid-flow and coordinating outside the system — creating invisible work and audit gaps that compounded with every new hire.",
          },
          {
            number: "02",
            title: "Evaluation without structure",
            body:
              "Interview scoring was informal and undocumented, leaving hiring decisions without a defensible trail — a consistency and legal exposure risk at enterprise scale.",
          },
          {
            number: "03",
            title: "Enterprise complexity exceeding the permission model",
            body:
              "Legacy RBAC could not support multi-entity client realities, forcing manual CS workarounds and capping how large the platform could sell.",
          },
        ]}
        />
      </RailSection>

      <RailSection title="The system before redesign" ariaLabel="The system before redesign">
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
        <AnnotatedFigure
          figure="B"
          label="The experience before redesign"
          imageSrc="/assets/work/seamless-hiring/block-before-state.png"
          imageAlt="SeamlessHiring before redesign — broken application flow and navigation"
          caption="Navigation misrouted core tasks, evaluation had no system surface, and permission models blocked enterprise use cases."
          decisionNotes={[
            "01 — Workflow collapse: 'Requests' button routed to application history, not the application form — the primary recruiter action was buried behind the wrong entry point",
            "02 — Evaluation without structure: no scoring or assessment surface existed inside the system — evaluation happened in spreadsheets and email threads outside SeamlessHiring entirely",
            "03 — Permission model: rigid access control could not accommodate multi-entity enterprise clients — every new onboarding required manual CS intervention",
          ]}
        />
        <AnnotatedFigure
          figure="C"
          label="Information Architecture Restructure"
          imageSrc="/assets/work/seamless-hiring/block-ia-restructure.png"
          imageAlt="Information architecture restructure — legacy PHP platform mapped to a scalable hiring workflow model"
          caption="Restructured the product around recruiter and applicant journeys before interface work — separating legacy constraints from the target hiring lifecycle."
          hideDecisionNotes
        />
        <AnnotatedFigure
          figure="D"
          label="Phased Redesign Roadmap"
          imageSrc="/assets/work/seamless-hiring/block-redesign-phases.png"
          imageAlt="Five-phase SeamlessHiring redesign roadmap spanning stabilization through AI augmentation"
          caption="The redesign spanned three years across five phases — with an AI-powered layer added only after workflow trust was restored."
          hideDecisionNotes
        />
        </div>
      </RailSection>

      <RailSection id="evidence" eyebrow="03 Evidence in Practice">
        <PhaseTimeline phases={phases} />
      </RailSection>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 96 }}>
        <EvidenceModule
          id="phase-I"
          phase="Phase I — Stabilize"
          layout="rail"
          challengeLabel=""
          interventionLabel="Intervention"
          challenge={
            "Job creation was inconsistent across hiring managers — no shared templates, no structured input model, and errors compounding downstream in the pipeline before a role even reached applicants."
          }
          intervention={
            "Guided job creation templates standardizing inputs and enforcing required fields before a role was published to the applicant-facing system."
          }
          figure={{
            figure: 1,
            label: "Workflow Artifact",
            imageSrc: "/assets/work/seamless-hiring/block-pain-points.png",
            imageAlt: "Phase I — Job creation workflow redesign",
            caption:
              "Standardized job creation through guided templates that reduced setup friction and improved consistency across hiring teams before a role enters the pipeline.",
            decisionNotes: [
              "Template-first approach chosen over form validation alone — structure at entry prevents downstream reconciliation work",
              "Required fields enforced at creation stage, not mid-application — eliminating a class of errors that only surfaced after applicant submission",
            ],
          }}
          pairFigures
          secondaryFigure={{
            figure: 1,
            label: "ATS Application Management",
            imageSrc: "/assets/work/seamless-hiring/block-phase-i-cover-slide.png",
            imageAlt: "Phase I — ATS application management cover slide",
            caption: "",
            imageOnly: true,
            reviewable: true,
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="phase-II"
          phase="Phase II — Streamline"
          layout="rail"
          challengeLabel=""
          interventionLabel="Intervention"
          challenge={
            "Applicants were abandoning mid-flow with no recovery path and no visibility into what would be required of them until they were already partially through the application."
          }
          intervention={
            "Application journey reframed around completion confidence — required documents surfaced at the start, persistent progress state visible throughout."
          }
          figure={{
            figure: 2,
            label: "Application Flow",
            imageSrc: "/assets/work/seamless-hiring/thumb-2.png",
            imageAlt: "Phase II — Application flow redesign",
            caption:
              "Reframed the application journey to eliminate abandonment and support higher-volume candidate processing without recruiter intervention.",
            decisionNotes: [
              "Progress indicator placed at top of flow, not in sidebar — reduces cognitive load without adding navigation complexity",
              "Required documents shown at start, not mid-application — directly removing the surprise abandonment pattern visible in FullStory session recordings",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="phase-III"
          phase="Phase III — Structure"
          layout="rail"
          challengeLabel=""
          interventionLabel="Intervention"
          challenge={
            "Interview scoring was informal and undocumented. Evaluation lived in spreadsheets and email threads outside the system, leaving hiring decisions without a defensible trail."
          }
          intervention={
            "Structured evaluation workflows with a shared scoring rubric, documentation trail, and consolidated recruiter action surface."
          }
          figure={{
            figure: 3,
            label: "Evaluation System",
            imageSrc: "/assets/work/seamless-hiring/block-gallery-1.png",
            imageAlt: "Phase III — ATS and evaluation redesign",
            embedChrome: "evidence",
            chromeSize: "evidence",
            caption:
              "Introduced structured evaluation workflows that improved decision quality, reduced recruiter context switching, and brought hiring decisions back inside the system.",
            decisionNotes: [
              "Consolidated fragmented recruiter actions into a single decision surface — direct response to context-switching patterns generating mid-task abandonment in FullStory sessions",
              "Scoring rubric developed collaboratively with HR SMEs, not imposed from the design side — adoption required co-authorship, not mandate",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="phase-IV"
          phase="Phase IV — Scale"
          layout="rail"
          challengeLabel=""
          interventionLabel="Intervention"
          challenge={
            "RBAC configuration was too rigid for multi-entity enterprise clients. Every new onboarding required CS workarounds, creating a ceiling on how large the platform could sell."
          }
          intervention={
            "Permission model redesigned to support role inheritance, entity-level overrides, and self-service admin assignment."
          }
          figure={{
            figure: 4,
            label: "Permission Architecture",
            imageSrc: "/assets/work/seamless-hiring/block-journey.png",
            imageAlt: "Phase IV — RBAC and permission model redesign",
            caption:
              "Permission patterns transformed access control from operational friction into scalable enterprise administration — removing the CS dependency from every new client onboarding.",
            decisionNotes: [
              "Role inheritance model chosen over flat permissions — supports multi-entity clients without permission explosion",
              "Self-service admin assignment eliminated a recurring CS ticket category that scaled with every new enterprise onboarding",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="phase-V"
          phase="Phase V — Augment"
          layout="rail"
          challengeLabel=""
          interventionLabel="Intervention"
          accent
          pullQuote="AI was designed as decision support, not decision authority."
          challenge={
            "Recruiters were spending disproportionate time on manual CV screening — a high-volume, low-judgment task the redesigned system was now stable enough to augment."
          }
          intervention={
            "AI-assisted recommendations were introduced in the final phase to support recruiter evaluation and shortlisting — augmenting structured recruiter decision-making rather than replacing it."
          }
          figure={{
            figure: 5,
            label: "Pilot Review — AI in RMS",
            imageSrc: "/assets/work/seamless-hiring/pilot-review-ai.png",
            imageAlt: "Pilot Review — AI-assisted candidate ranking and explainable evaluation within recruitment workflows",
            caption:
              "Pilot validation of AI-assisted candidate ranking and explainable evaluation within live recruitment workflows — the Smart Assessment Summary surfaces structured scoring rationale and sentiment signals for recruiter review.",
            decisionNotes: [
              "AI introduced in Phase V deliberately — augmenting a workflow only after trust in the core system was re-established. AI on top of a broken process inherits the broken process's failure modes",
              "Ranking logic calibrated against client hiring criteria rather than generic resume heuristics",
              "Ranking surfaces signal, shortlisting remains recruiter-owned — boundary set by design, not by default",
              "AI outputs were surfaced as explainable recommendations rather than opaque scores, preserving recruiter agency while improving decision signal quality — the interface showed reasoning, not just results",
            ],
          }}
        />

      </div>

      <p
        style={{
          fontSize: 15,
          color: "var(--fg-muted)",
          lineHeight: 1.75,
          maxWidth: 640,
          margin: "32px auto 0",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        Those structural fixes restored workflow trust first — the judgments below explain what we traded off to get there.
      </p>

      <RailSection id="strategic-decisions" eyebrow="04 Strategic Decisions" title="Judgment, trade-offs, and outcomes">
        <p
          style={{
            margin: 0,
            fontSize: 15,
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            maxWidth: 640,
          }}
        >
          Five choices that shaped the programme — alternatives considered, costs accepted, and what each unlocked.
        </p>
        <div style={{ marginTop: 28, maxWidth: 760 }}>
          <DecisionAccordion entries={project.brief.strategicDecisions ?? []} />
        </div>
      </RailSection>

      <RailSection id="outcomes" eyebrow="05 Outcomes" title="Results across four dimensions">
        <OutcomeCards tiers={outcomeTiers} />
      </RailSection>

      <div style={{ maxWidth: 1240, margin: "48px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 15, color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
          &quot;The redesign transformed SeamlessHiring from a functional but frustrating tool into a scalable enterprise product.&quot;
        </p>
        <p style={{ marginTop: 10, fontSize: 12, color: "var(--fg-subtle)", maxWidth: 760 }}>
          — Femisayo Olofintila, Head of Product Management, SeamlessHR
        </p>
      </div>

      <div style={{ maxWidth: 1240, margin: "80px auto 0", padding: "0 24px" }}>
        <YouTubePosterPlayer
          videoId="uHZ1-KpyJyo"
          posterSrc="/assets/work/seamless-hiring/promo-video-poster.png"
          title="SeamlessHiring promotional video"
        />
        <p style={{ marginTop: 16, fontSize: 13, lineHeight: 1.6, color: "var(--fg-muted)" }}>
          Promotional overview of SeamlessHiring 2.0.
        </p>
      </div>

      <UnlockPanel
        items={[
          "Established the phased redesign model applied to every subsequent enterprise product — including IBEDC and FetsProza.",
          "Seeded the organizational case for Seamkit. SeamlessHiring was the first product migrated to the unified design system, and the proof-of-concept that made cross-team adoption credible.",
          "Helped reposition design from delivery support into a pricing and retention lever — changing how sales framed the product category.",
          "Defined how I approach AI integration: as a Phase V decision, not a Phase I feature.",
        ]}
      />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}

