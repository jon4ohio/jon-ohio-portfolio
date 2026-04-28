import type { Metadata } from "next";
import StickyChapterNav from "@/components/case-study/StickyChapterNav";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import CaseHero from "@/components/case-study/CaseHero";
import MetadataBrief from "@/components/case-study/MetadataBrief";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline, { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
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
  { id: "phase-V", number: "Phase V", name: "Augment", description: "AI parsing, ranking, shortlisting" },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "PRODUCT",
    items: [
      "~100% — Applicant completion rate",
      "27→74 — NPS (Net Promoter Score)",
      "↓50% — Support ticket volume",
    ],
  },
  {
    category: "OPERATIONAL",
    items: [
      "Estimated $500k+/yr — Admin overhead avoided across client orgs",
      "↓50% — Engineering maintenance load post-Seamkit integration",
    ],
  },
  {
    category: "STRATEGIC",
    items: [
      "₦150,000 add-on → $3,600/yr — Flagship module reposition",
      "Became PLG reference product across SeamlessHR",
      "Seeded Seamkit adoption across 12 teams",
    ],
  },
  {
    category: "INTELLIGENCE",
    items: [
      "AI-assisted CV parsing introduced",
      "Smart candidate ranking active",
      "Manual screening effort reduced",
      "Decision signal quality improved",
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
          .case-study-brief-rail { display: none !important; }
          .case-study-brief-mobile { display: block !important; }
          .case-study-evidence-row--text-left { flex-direction: column-reverse !important; }
          .case-study-evidence-row--text-right { flex-direction: column !important; }
          .case-study-nextread { flex-direction: column !important; }
          .case-study-nextread-media { width: 100% !important; }
        }
        @media (min-width: 641px) {
          .case-study-brief-mobile { display: none !important; }
          .case-study-phase-mobile { display: none !important; }
        }
      `}</style>

      <CaseHero
        microLabel="SeamlessHR · Mar 2022 – Mar 2025"
        title="SeamlessHiring 2.0"
        subtitle="Recruitment Management System"
        thesis="Rebuilding fragmented recruiting workflows into an intelligent hiring operating system."
        abstract={
          "A phased redesign of an underperforming recruitment product that evolved " +
          "into a flagship enterprise module — introducing AI-assisted hiring workflows, " +
          "resolving enterprise permission complexity, and laying the organizational " +
          "foundation for Seamkit."
        }
        impact={[
          { value: "↓50%", label: "Support load" },
          { value: "27→74", label: "NPS" },
          { value: "~100%", label: "Completion rate" },
          { value: "$3,600/yr", label: "Flagship module" },
        ]}
        heroImage={{
          src: "/assets/work/seamless-hiring/preview-16x9.png",
          alt: "SeamlessHiring 2.0 product overview",
        }}
      />

      <MetadataBrief
        blocks={[
          { label: "Role", value: "Lead Product Designer" },
          {
            label: "Scope",
            value: ["UX Strategy", "Workflow Architecture", "AI-Assisted Decision Design", "Cross-Functional Delivery"],
          },
          { label: "Timeline", value: "Mar 2022 – Mar 2025" },
          { label: "Team", value: ["PM · 3 Engineers", "CX · Sales · HR SMEs"] },
          { label: "Domain", value: "Enterprise SaaS / HR Tech / ATS" },
        ]}
        led={[
          "Research synthesis",
          "UX strategy",
          "Workflow architecture",
          "AI-layered experience design",
        ]}
        partneredOn={["Engineering architecture", "Delivery implementation"]}
        productImpact={[
          { value: "↓50%", label: "Support ticket volume" },
          { value: "27→74", label: "NPS (Net Promoter Score)" },
          { value: "~100%", label: "Applicant completion rate" },
        ]}
        commercialShiftTop="₦150,000 add-on"
        commercialShiftBottom="→ $3,600/yr flagship module"
        mobileSummary={[
          { label: "Role", value: "Lead Product Designer" },
          { label: "Timeline", value: "Mar 2022 – Mar 2025" },
          { label: "Domain", value: "Enterprise SaaS / HR Tech / ATS" },
          { label: "Impact", value: "↓50% support volume · 27→74 NPS · ~100% completion" },
        ]}
      />

      <TensionCards
        label="02 Core Tensions"
        heading="What was broken"
        subhead="Three organizational failures that made redesign unavoidable."
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

      <section id="phases" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Transformation in Five Phases
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          How the system evolved
        </h2>
        <div style={{ marginTop: 28 }}>
          <PhaseTimeline phases={phases} />
        </div>
      </section>

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
            "AI-assisted parsing, smart candidate ranking, and assisted shortlisting layered onto a workflow that had earned recruiter trust across Phases I–IV."
          }
          figure={{
            figure: 5,
            label: "AI Decision Support",
            imageSrc: "/assets/work/seamless-hiring/block-cover.png",
            imageAlt: "Phase V — AI-assisted hiring workflows",
            caption:
              "Layered AI-assisted parsing and smart ranking onto a stable recruitment workflow — improving decision signal quality and reducing manual screening effort without replacing recruiter judgment.",
            decisionNotes: [
              "AI introduced in Phase V deliberately — augmenting a workflow only after trust in the core system was re-established. AI on top of a broken process inherits the broken process's failure modes",
              "Ranking logic calibrated against client hiring criteria rather than generic resume heuristics",
              "Ranking surfaces signal, shortlisting remains recruiter-owned — boundary set by design, not by default",
            ],
          }}
        />
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
        <OutcomeCards tiers={outcomeTiers} />
      </section>

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

