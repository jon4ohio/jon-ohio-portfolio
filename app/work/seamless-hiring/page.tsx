import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import StickyChapterNav from "@/components/case-study/StickyChapterNav";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import FlagshipSpine from "@/components/case-study/FlagshipSpine";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import DecisionAccordion from "@/components/case-study/DecisionAccordion";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import NextReadCard from "@/components/case-study/NextReadCard";

export const metadata: Metadata = {
  title: "SeamlessHiring 2.0 — John Ohio",
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
  return (
    <div style={{ paddingTop: 56 }}>
      <ReadingProgressBar />
      <StickyChapterNav />

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
        microLabel="SeamlessHR · Mar 2022 – Mar 2025"
        title="SeamlessHiring 2.0"
        subtitle="Recruitment Management System (RMS)"
        thesis="Rebuilding fragmented recruiting workflows into a scalable hiring operating system."
        abstract="Rebuilt workflow trust, restored completion rates, and introduced structured AI-assisted decision points used by HR teams across the platform."
        impact={[
          { value: "↓24%", label: "Application drop-offs" },
          { value: "↑40%", label: "User satisfaction" },
          { value: "↑20%", label: "Job-post engagement" },
          { value: "↓50%", label: "Support volume" },
        ]}
        heroImage={{
          src: "/assets/work/seamless-hiring/preview-16x9.png",
          alt: "SeamlessHiring 2.0 product overview",
        }}
        executiveBrief={{
          blocks: [
            { label: "Role", value: "Lead Product Designer" },
            {
              label: "Scope",
              value: ["UX Strategy", "Workflow Architecture", "AI-Assisted Decision Design", "Cross-Functional Delivery"],
            },
            { label: "Timeline", value: "Mar 2022 – Mar 2025" },
            { label: "Team", value: ["PM · 3 Engineers", "CX · Sales · HR SMEs"] },
            { label: "Domain", value: "Enterprise SaaS / HR Tech / ATS" },
          ],
          led: ["Research synthesis", "UX strategy", "Workflow architecture", "AI-layered experience design"],
          partneredOn: ["Engineering architecture", "Delivery implementation"],
          productImpact: [
            { value: "↓24%", label: "Application drop-offs" },
            { value: "↑40%", label: "User satisfaction" },
            { value: "↓50%", label: "Support volume" },
          ],
          commercialShiftTop: "$200→$500/mo",
          commercialShiftBottom: "₦150k flat-fee add-on → ~₦200k/month",
        }}
      />

      <TensionCards
        label="02 Core Tensions"
        heading="What was broken"
        subhead="A high-volume graduate hiring programme exposed systemic failures in the recruitment workflow — applications stalled, evaluation broke down, and support demand surged. The issue was not primarily interface design. It was a fragmented system that could not support enterprise scale."
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

      <div style={{ maxWidth: 1240, margin: "32px auto 0", padding: "0 24px" }}>
        <AnnotatedFigure
          figure="B"
          label="Before State — Faulty UI"
          imageAlt="SeamlessHiring before redesign — broken application flow and navigation"
          caption="The experience before redesign. Navigation misrouted core tasks, evaluation had no system surface, and permission models blocked enterprise use cases."
          decisionNotes={[
            "01 — Workflow collapse: 'Requests' button routed to application history, not the application form — the primary recruiter action was buried behind the wrong entry point",
            "02 — Evaluation without structure: no scoring or assessment surface existed inside the system — evaluation happened in spreadsheets and email threads outside SeamlessHiring entirely",
            "03 — Permission model: rigid access control could not accommodate multi-entity enterprise clients — every new onboarding required manual CS intervention",
          ]}
        />
      </div>

      <FlagshipSpine
        eyebrow="03 Transformation in Five Phases"
        heading="Re-architecting the hiring workflow as a structured system"
        phases={phases}
      />

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Evidence in Practice
        </p>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="phase-I"
          phase="Phase I — Stabilize"
          layout="text-left"
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
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-II"
          phase="Phase II — Streamline"
          layout="text-right"
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

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-III"
          phase="Phase III — Structure"
          layout="text-left"
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
            caption:
              "Introduced structured evaluation workflows that improved decision quality, reduced recruiter context switching, and brought hiring decisions back inside the system.",
            decisionNotes: [
              "Consolidated fragmented recruiter actions into a single decision surface — direct response to context-switching patterns generating mid-task abandonment in FullStory sessions",
              "Scoring rubric developed collaboratively with HR SMEs, not imposed from the design side — adoption required co-authorship, not mandate",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-IV"
          phase="Phase IV — Scale"
          layout="text-right"
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

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-V"
          phase="Phase V — Augment"
          layout="text-left"
          accent
          pullQuote="AI was designed as decision support, not decision authority."
          challenge={
            "Recruiters were spending disproportionate time on manual CV screening — a high-volume, low-judgment task the redesigned system was now stable enough to augment."
          }
          intervention={
            "Structured decision points were introduced in the final phase, with AI-assisted recommendations supporting recruiter evaluation and shortlisting — augmenting judgment, not replacing it."
          }
          figure={{
            figure: 5,
            label: "Pilot Review — AI in RMS",
            imageSrc: existsSync(path.join(process.cwd(), "public", "assets/work/seamless-hiring/pilot-review-ai.png"))
              ? "/assets/work/seamless-hiring/pilot-review-ai.png"
              : undefined,
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

        <div style={{ padding: "0 24px 64px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--fg-subtle)",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Continuity
              </span>
              <p style={{ fontSize: 14, color: "var(--fg-muted)", fontStyle: "italic", margin: 0 }}>
                Patterns piloted in SeamlessHiring later informed broader work on SeamlessAI&apos;s reusable enterprise AI interaction layer.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          Decision Log
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Key decisions
        </h2>
        <div style={{ marginTop: 28, maxWidth: 760 }}>
          <DecisionAccordion
            entries={[
              {
                title: "Phased rollout over full rewrite",
                body:
                  "A full rewrite would have been cleaner architecturally. It would also have broken continuity for every active enterprise client. Phased delivery kept the system usable while we fixed it — and gave teams time to build confidence in new patterns before old ones were fully retired.",
              },
              {
                title: "Research synthesis before wireframes",
                body:
                  "FullStory analytics, support ticket audits, and recruiter interviews ran concurrently and were synthesised before any design work began. The five-phase prioritisation framework came from that synthesis, not from stakeholder instinct.",
              },
              {
                title: "Single decision surface for recruiters",
                body:
                  "Every candidate action was previously distributed across multiple views and tabs. Consolidation was a direct response to the context-switching pattern generating the majority of mid-task abandonment in session recordings — not a visual preference.",
              },
              {
                title: "AI introduced in Phase V, not Phase I",
                body:
                  "Structured evaluation support was held until the core workflow had earned recruiter trust. AI layered onto a broken workflow doesn't fix the workflow — it accelerates the broken parts.",
              },
              {
                title: "Pattern architecture before isolated screens",
                body:
                  "Shared interface patterns — form structure, action hierarchy, state communication — were designed system-first to avoid solving the same workflow problem per screen. This was the structural precursor to Seamkit.",
              },
            ]}
          />
        </div>
      </section>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          05 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Results across four dimensions
        </h2>
        <p style={{ marginTop: 10, fontSize: 14, color: "var(--fg-muted)", fontStyle: "italic", maxWidth: 760, lineHeight: 1.7 }}>
          RMS evolved from a ₦150k flat-fee add-on into a recurring product (~₦200k/month), while international pricing increased from $200 to up to $500/month depending on enterprise scale.
        </p>
        <OutcomeCards tiers={outcomeTiers} />
      </section>

      <div style={{ maxWidth: 1240, margin: "48px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 15, color: "var(--fg-muted)", fontStyle: "italic", lineHeight: 1.7, maxWidth: 760, margin: 0 }}>
          &quot;The redesign transformed SeamlessHiring from a functional but frustrating tool into a scalable enterprise product.&quot;
        </p>
        <p style={{ marginTop: 10, fontSize: 12, color: "var(--fg-subtle)", maxWidth: 760 }}>
          — Femisayo Olofintila, Head of Product Management, SeamlessHR
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

      <NextReadCard
        microLabel="SeamlessHR · Design Systems"
        title="Seamkit"
        body="The system SeamlessHiring made necessary — scaling from one product's token architecture to an operating standard across 12 teams."
        href="/work/seamkit"
        imageSrc="/assets/work/seamkit/preview-16x9.png"
        imageAlt="Seamkit — Enterprise Design System"
      />
    </div>
  );
}

