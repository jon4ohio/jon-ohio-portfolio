import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import EvidenceTierBand from "@/components/case-study/EvidenceTierBand";
import MaturityLegend, { MaturityTag } from "@/components/case-study/MaturityLegend";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import SectionDivider from "@/components/case-study/SectionDivider";
import RailSection from "@/components/case-study/RailSection";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, getCaseStudyNeighbors } from "@/lib/projects";

export const metadata: Metadata = {
  title: "BluAlliance",
  description:
    "Platform strategy for Africa's frontline workforce — prioritisation matrix, platform vision, Breeze, WhatsApp ESS, supervisor workflows, and future-state architecture.",
  alternates: { canonical: "/work/blualliance" },
};

const PLACEHOLDER = "/assets/work/_placeholders/hero.svg";

const PORTFOLIO_MATURITY = [
  { name: "Breeze (employee experience)", state: "UAT" as const },
  { name: "WhatsApp ESS", state: "UAT" as const },
  { name: "Frontline productivity (supervisor workflows)", state: "In Development" as const },
  { name: "Workforce prosperity framework", state: "Roadmap" as const },
];

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Decisions" },
  { id: "evidence", label: "03 Evidence" },
  { id: "outcomes", label: "04 Outcomes" },
  { id: "reflection", label: "05 Reflection" },
  { id: "unlocks", label: "06 Unlocks" },
];

const phases: Phase[] = [
  {
    id: "phase-capability",
    number: "01",
    name: "Capability Map",
    description: "Output: Eight domains from ecosystem research",
  },
  {
    id: "phase-prioritization",
    number: "02",
    name: "Prioritization Matrix",
    description: "Output: Six prioritised opportunity areas",
  },
  {
    id: "phase-vision",
    number: "03",
    name: "Platform Vision",
    description: "Output: Capability-led platform model",
  },
  {
    id: "phase-portfolio",
    number: "04",
    name: "Experience Portfolio",
    description: "Output: Connected experience streams",
  },
  {
    id: "phase-architecture",
    number: "05",
    name: "Future Architecture",
    description: "Output: Shared platform integration model",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "STRATEGY",
    items: [
      "Eight capability domains narrowed to six prioritised opportunity areas — explicit deprioritisation",
      "Platform vision established: shared services, multiple surfaces",
      "Future-state architecture defined for cross-stream integration",
    ],
  },
  {
    category: "EXPERIENCE",
    items: [
      "Breeze IA reorganised around employee goals — not HR module taxonomy",
      "WhatsApp ESS designed as first-class channel — not web fallback",
      "Supervisor coordination elevated to peer experience stream",
      "Prosperity framework spans benefits and financial wellbeing on roadmap",
    ],
  },
  {
    category: "DELIVERY",
    items: [
      "Experience streams tagged by maturity — UAT, in development, roadmap",
      "Cross-functional alignment on platform vs isolated product trade-offs",
      "Honest delivery framing maintained stakeholder trust during parallel workstreams",
    ],
    caption:
      "Not all experience streams are shipped. Maturity states are documented explicitly — this case study reflects programme reality, not a launch narrative.",
  },
];

export default function BluallianceFlagshipCaseStudy() {
  const project = getProject("blualliance");
  if (!project?.brief) return null;

  const { prev, next } = getCaseStudyNeighbors("blualliance");

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
        .case-study-maturity-inline {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 12px;
        }
      `}</style>

      <FlagshipOpener
        microLabel={`${project.company} · ${project.period}`}
        title={project.title}
        subtitle={project.subtitle}
        thesis="Translate ecosystem models into platform strategy — prioritisation, channels, and a connected experience portfolio."
        abstract={
          "The workforce ecosystem research identified more opportunities than the organisation could realistically pursue. This work focused on where and how to act."
        }
        impact={project.metrics}
        heroImage={{
          src: project.assets?.hero?.src,
          alt: project.assets?.hero?.alt,
        }}
        executiveBrief={project.brief}
        workInProgress={project.workInProgress}
      />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 0" }}>
        <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 780 }}>
          Input: the{" "}
          <Link
            href="/work/workforce-ecosystem"
            style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Workforce Ecosystem
          </Link>{" "}
          programme identified eight capability domains across Nigeria and Kenya. This project translated those domains
          into prioritised opportunities, platform vision, and a portfolio of connected experiences.
        </p>
      </div>

      <RailSection id="tensions" eyebrow="02 Strategic Decisions" title="More opportunity than capacity">
        <p style={{ margin: 0, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 640 }}>
          The research surfaced more opportunities than the organisation could realistically pursue. Three strategic
          decisions shaped platform direction.
        </p>
        <TensionCards
        embedded
        cards={[
          {
            number: "01",
            title: "Which opportunities first?",
            body:
              "Eight capability domains and dozens of opportunity areas — but limited engineering capacity and parallel programme commitments. The team needed explicit prioritisation criteria and a matrix showing what was in vs out — not implicit backlog ordering.",
          },
          {
            number: "02",
            title: "Which channels matter?",
            body:
              "Frontline workers operate across WhatsApp, feature phones, and occasional web access. Employers need admin surfaces. Forcing a single channel would exclude users; supporting every channel would fragment delivery without a shared platform layer.",
          },
          {
            number: "03",
            title: "Platform or products?",
            body:
              "Each opportunity could ship as a standalone product or as a service within a shared platform. The most valuable decision was defining what would be shared — so future products could evolve without fragmenting the workforce experience.",
          },
        ]}
        />
      </RailSection>

      <RailSection id="evidence" eyebrow="03 Evidence">
        <p style={{ margin: 0, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 640 }}>
          From capability handoff through future-state architecture — eight artefacts showing how strategy became
          platform direction.
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={phases} />
        </div>
      </RailSection>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 96 }}>
        <EvidenceTierBand label="Strategy" sublabel="Prioritisation and platform direction — where the strategic work happened." />

        <EvidenceModule
          id="phase-capability"
          phase="01 — Opportunity & Capability Map"
          layout="rail"
          challenge="The ecosystem research produced eight capability domains. Product teams needed a map connecting research findings to actionable build areas without losing architectural coherence."
          intervention="Translated capability architecture into an opportunity map aligned to research language. Output: eight domains mapped with dependencies and integration points."
          figure={{
            figure: 1,
            label: "Opportunity & Capability Map",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Opportunity & Capability Map",
            caption:
              "[Replace with artefact] Capability map — input from Workforce Ecosystem research across eight domains.",
            decisionNotes: [
              "Map inherits research language — no re-interpretation layer between ecosystem work and product squads",
              "Eight domains retained as reference; prioritisation handled in the next artefact",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="phase-prioritization"
          phase="02 — Prioritization Matrix"
          layout="rail"
          accent
          pullQuote="Eight domains became six opportunities — explicit deprioritisation, not an implicit backlog."
          challenge="Without a prioritisation artefact, teams jumped from capability architecture to product debates. The decision layer — what to pursue first and what to defer — needed to be visible."
          intervention="Built a prioritisation matrix scoring opportunities against impact, feasibility, and platform leverage. Output: six prioritised opportunity areas from eight capability domains."
          figure={{
            figure: 2,
            label: "Prioritization Matrix",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Prioritization Matrix — eight domains to six opportunities",
            caption:
              "[Replace with artefact] Prioritisation matrix — output: six opportunity areas chosen from eight capability domains with explicit rationale.",
            decisionNotes: [
              "Recruitment and Learning deferred to later phases — workforce management and communication prioritised for platform leverage",
              "Matrix made trade-offs legible to Gates Foundation and SeamlessHR leadership — not buried in roadmap tools",
            ],
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="phase-vision"
          phase="03 — Platform Vision"
          layout="rail"
          challenge="Parallel squads risked building isolated products that couldn't integrate later — especially across WhatsApp, web, and supervisor tooling."
          intervention="Defined BluAlliance platform vision: shared capability services powering multiple experience streams. Output: capability-led platform model."
          figure={{
            figure: 3,
            label: "Platform Vision",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] BluAlliance Platform Vision",
            caption:
              "[Replace with artefact] Platform vision — shared services layer with experience streams (Breeze, WhatsApp ESS, supervisor tools) on top.",
            decisionNotes: [
              "Platform decision made explicitly — shared services for identity, workforce management, and communication",
              "Experience streams can ship independently but inherit platform services — avoiding isolated product trap",
            ],
          }}
        />

        <EvidenceTierBand
          label="Experience Portfolio"
          sublabel="Connected experiences across channels — each stream tagged by delivery maturity."
        />

        <div style={{ marginTop: -48 }}>
          <MaturityLegend streams={PORTFOLIO_MATURITY} />
        </div>

        <EvidenceModule
          id="phase-portfolio-breeze"
          phase="04 — Breeze Experience Architecture"
          layout="rail"
          challenge="Employers and employees need a consolidated workforce experience — but standard HR IA patterns organise around systems, not goals."
          intervention="Redesigned Breeze information architecture around employee needs and lifecycle workflows. Output: goal-oriented navigation and self-service surfaces."
          figure={{
            figure: 4,
            label: "Breeze Experience Architecture",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Breeze Information Architecture",
            caption:
              "[Replace with artefact] Breeze IA — restructuring employee experiences around goals, workflows, and lifecycle needs.",
            decisionNotes: [
              "IA organised by jobs-to-be-done, not HR module taxonomy",
              "Supervisor coordination surfaces integrated — not relegated to admin settings",
            ],
          }}
        />

        <div style={{ padding: "0 24px", maxWidth: 1240, margin: "-48px auto 0" }}>
          <div className="case-study-maturity-inline">
            <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>Breeze</span>
            <MaturityTag state="UAT" />
          </div>
        </div>

        <SectionDivider />

        <EvidenceModule
          id="phase-portfolio-whatsapp"
          phase="04 — WhatsApp ESS Service Flow"
          layout="rail"
          challenge="Frontline workers don't sit at desks. WhatsApp is often the primary digital channel — ESS via messaging requires different interaction patterns than web forms."
          intervention="Designed WhatsApp ESS flows for worker self-service — leave, payslip, attendance — using conversational patterns native to the channel."
          figure={{
            figure: 5,
            label: "WhatsApp ESS Flow",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] WhatsApp ESS experience flows",
            caption:
              "[Replace with artefact] WhatsApp ESS — extending workforce services into familiar channels to improve accessibility and adoption.",
            decisionNotes: [
              "WhatsApp treated as first-class channel — not a notification layer for web ESS",
              "Flows designed for partial connectivity and async responses",
            ],
          }}
        />

        <div style={{ padding: "0 24px", maxWidth: 1240, margin: "-48px auto 0" }}>
          <div className="case-study-maturity-inline">
            <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>WhatsApp ESS</span>
            <MaturityTag state="UAT" />
          </div>
        </div>

        <SectionDivider />

        <EvidenceModule
          id="phase-portfolio-productivity"
          phase="04 — Frontline Productivity Framework"
          layout="rail"
          challenge="Supervisor coordination emerged as the critical insight from ecosystem research but had no dedicated product surface."
          intervention="Designed frontline productivity framework: team visibility, shift coordination, attendance, escalation — designed around supervisory workflows."
          figure={{
            figure: 6,
            label: "Frontline Productivity Framework",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Frontline Productivity Framework",
            caption:
              "[Replace with artefact] Supervisor workflow framework — supporting workforce coordination through supervisory-first design.",
            decisionNotes: [
              "Direct response to Design Principle 01 — design for the supervisor, not just HR",
              "Framework spans mobile and web — supervisors operate in field contexts",
            ],
          }}
        />

        <div style={{ padding: "0 24px", maxWidth: 1240, margin: "-48px auto 0" }}>
          <div className="case-study-maturity-inline">
            <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>Frontline productivity</span>
            <MaturityTag state="In Development" />
          </div>
        </div>

        <SectionDivider />

        <EvidenceModule
          id="phase-portfolio-prosperity"
          phase="04 — Workforce Prosperity Framework"
          layout="rail"
          challenge="Research showed prosperity extends beyond employment — benefits, financial wellbeing, learning, and career mobility matter as peer capabilities."
          intervention="Designed prosperity framework connecting benefits, financial wellbeing, and career mobility within the platform capability model."
          figure={{
            figure: 7,
            label: "Workforce Prosperity Framework",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Workforce Prosperity Framework",
            caption:
              "[Replace with artefact] Prosperity framework — capabilities supporting both workforce productivity and worker prosperity.",
            decisionNotes: [
              "Prosperity framed as capability cluster — not a benefits add-on module",
              "Financial wellbeing includes savings, access, and visibility — not just payroll",
            ],
          }}
        />

        <div style={{ padding: "0 24px", maxWidth: 1240, margin: "-48px auto 0" }}>
          <div className="case-study-maturity-inline">
            <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>Workforce prosperity</span>
            <MaturityTag state="Roadmap" />
          </div>
        </div>

        <EvidenceTierBand label="Architecture" sublabel="Target state — what shared platform services enable long-term integration." />

        <EvidenceModule
          id="phase-architecture"
          phase="05 — Future State Platform Architecture"
          layout="rail"
          accent
          pullQuote="The most valuable decision was defining what would be shared — not what would ship first."
          challenge="Experience streams progressing in parallel needed a target architecture so integration wouldn't require rework when streams converged."
          intervention="Defined future-state platform architecture — shared services, data model, integration points, and channel abstraction across Breeze, WhatsApp ESS, and supervisor tooling."
          figure={{
            figure: 8,
            label: "Future State Platform Architecture",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Future State Platform Architecture",
            caption:
              "[Replace with artefact] Future-state architecture — connecting current and future workforce experiences through shared platform strategy.",
            decisionNotes: [
              "Architecture designed for incremental delivery — streams can ship before full platform maturity",
              "Channel abstraction enables WhatsApp and web to share workforce data without duplicate systems",
            ],
          }}
        />
      </div>

      <RailSection id="outcomes" eyebrow="04 Outcomes" title="What the platform work established">
        <OutcomeCards tiers={outcomeTiers} />
      </RailSection>

      <RailSection id="reflection" eyebrow="05 Reflection">
        <p style={{ margin: 0, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 640 }}>
          The Workforce Ecosystem initiative helped us understand the workforce. This work focused on determining where
          and how to act. The most valuable strategic decision wasn&apos;t what to build first — it was defining what
          would be shared, so future products could evolve without fragmenting the workforce experience.
        </p>
      </RailSection>

      <UnlockPanel
        label="06 Unlocks"
        items={[
          "Prioritisation matrix made eight-to-six domain decisions legible — explicit trade-offs, not implicit backlog.",
          "Channel strategy resolved: WhatsApp as first-class ESS alongside Breeze — a design decision, not a compromise.",
          "Maturity tagging maintained stakeholder trust while parallel streams progressed at different speeds.",
          "Future-state architecture enables integration without rework — streams converge on shared platform services.",
          "Research foundation preserved — see Workforce Ecosystem for the capability architecture this platform work builds on.",
        ]}
      />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 32px" }}>
        <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 640 }}>
          ←{" "}
          <Link
            href="/work/workforce-ecosystem"
            style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Workforce Ecosystem
          </Link>{" "}
          — understand the system: research, service design, and capability architecture
        </p>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
