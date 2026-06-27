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
import CapabilityHandoff from "@/components/case-study/CapabilityHandoff";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import NextReadCard from "@/components/case-study/NextReadCard";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Workforce Ecosystem",
  description:
    "Multi-country research and service design for Africa's frontline workforce — evidence base, design principles, ecosystem models, service blueprints, and capability architecture.",
  alternates: { canonical: "/work/workforce-ecosystem" },
};

const PLACEHOLDER = "/assets/work/_placeholders/hero.svg";

const CAPABILITY_DOMAINS = [
  "Workforce Identity",
  "Recruitment",
  "Workforce Management",
  "Communication",
  "Learning",
  "Benefits",
  "Financial Wellbeing",
  "Career Mobility",
];

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Principles" },
  { id: "evidence", label: "03 Evidence" },
  { id: "outcomes", label: "04 Outcomes" },
  { id: "unlocks", label: "05 Unlocks" },
];

const phases: Phase[] = [
  {
    id: "phase-research",
    number: "01",
    name: "Research Program",
    description: "Output: Multi-country workforce evidence base",
  },
  {
    id: "phase-insights",
    number: "02",
    name: "Insight Framework",
    description: "Output: Three ecosystem design principles",
  },
  {
    id: "phase-ecosystem",
    number: "03",
    name: "Workforce Ecosystem Blueprint",
    description: "Output: Shared model of workforce interactions",
  },
  {
    id: "phase-lifecycle",
    number: "04",
    name: "Workforce Lifecycle Framework",
    description: "Output: Seven-stage workforce journey model",
  },
  {
    id: "phase-blueprint",
    number: "05",
    name: "Workforce Service Blueprint",
    description: "Output: Operational view of workforce delivery",
  },
  {
    id: "phase-capability",
    number: "06",
    name: "Capability Architecture",
    description: "Output: Eight workforce capability domains",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "MODELS",
    items: [
      "Workforce Ecosystem Blueprint established as shared reference model",
      "Seven-stage lifecycle framework adopted across programme stakeholders",
      "End-to-end service blueprint connecting frontstage and backstage delivery",
    ],
  },
  {
    category: "ALIGNMENT",
    items: [
      "Shared language between Gates Foundation, SeamlessHR, and field partners",
      "Three design principles translated research into actionable constraints",
      "Evidence base defensible across two markets without over-generalising",
    ],
  },
  {
    category: "HANDOFF",
    items: [
      "Capability architecture became the bridge to platform strategy — see BluAlliance",
      "Platform exploration enabled without re-litigating research foundations",
      "Parallel SeamKit work maintained UI consistency while ecosystem work pursued coherence",
    ],
  },
];

export default function WorkforceEcosystemFlagshipCaseStudy() {
  const project = getProject("workforce-ecosystem");
  if (!project?.brief) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "workforce-ecosystem");
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 ? projects[currentIndex + 1] : undefined;
  const nextProject = getProject("blualliance");

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
        title={project.title}
        subtitle={project.subtitle}
        thesis="Understand the workforce ecosystem — from evidence through models to capability architecture."
        abstract={
          "A research and service design programme spanning Nigeria and Kenya — producing strategic artefacts that aligned product, business, and field teams around how frontline work actually happens."
        }
        impact={project.metrics}
        heroImage={{
          src: project.assets?.hero?.src,
          alt: project.assets?.hero?.alt,
        }}
        executiveBrief={project.brief}
      />

      <TensionCards
        label="02 Design Principles"
        heading="Three principles from the research"
        subhead="Patterns that held across industries and geographies — framed as constraints for service design and platform decisions."
        cards={[
          {
            number: "01",
            title: "Design for the supervisor, not just HR.",
            body:
              "Supervisors mediate scheduling, attendance, disputes, and trust between workers and organisations. Workforce systems must treat supervisory workflows as first-class — not as admin overlays on worker-facing features.",
          },
          {
            number: "02",
            title: "Visibility creates trust.",
            body:
              "Workers and employers often lack shared visibility into employment status, pay cycles, and obligations — because of fragmented channels and informal arrangements. Service design must account for partial visibility and offline coordination.",
          },
          {
            number: "03",
            title: "Prosperity is broader than employment.",
            body:
              "Financial wellbeing, learning, benefits, and career mobility matter as much as payroll. Capability architecture must treat prosperity outcomes as peer domains — not add-ons to core HRM.",
          },
        ]}
      />

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Evidence
        </p>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          Evidence → models → architecture. Six deliverables — each with a named output, not just a research activity.
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceTierBand label="Foundation" sublabel="Evidence and synthesis — grounding the programme in multi-country field reality." />

        <EvidenceModule
          id="phase-research"
          phase="01 — Research Program"
          layout="text-left"
          challenge="Frontline workforce dynamics in Nigeria and Kenya had not been documented at ecosystem scale. The programme needed grounded evidence before any product scope could be credible."
          intervention="Designed and led multi-country research with 150+ participants — employers, workers, supervisors, and field partners. Output: a multi-country workforce evidence base."
          figure={{
            figure: 1,
            label: "Research Overview Board",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Research Overview Board — multi-country synthesis",
            caption:
              "[Replace with artefact] Research overview board — output: multi-country workforce evidence base across Nigeria and Kenya.",
            decisionNotes: [
              "Multi-country scope chosen deliberately — patterns had to hold across markets, not collapse into single-market anecdotes",
              "Supervisor and employer perspectives weighted equally with worker interviews — coordination layer insight emerged from triangulation",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-insights"
          phase="02 — Insight Framework"
          layout="text-right"
          challenge="Raw field notes risked staying anecdotal. Stakeholders needed actionable principles, not interview transcripts."
          intervention="Synthesised research into three ecosystem design principles with implications for service and platform work. Output: Insight Framework — three ecosystem principles."
          figure={{
            figure: 2,
            label: "Insight Framework",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Insight Framework — three design principles",
            caption:
              "[Replace with artefact] Insight Framework mapping research themes to three design principles and capability gaps.",
            decisionNotes: [
              "Principles framed with design implications — product teams could act without re-interpreting raw research",
              "Supervisor layer, visibility limits, and prosperity beyond employment became the narrative spine for all downstream artefacts",
            ],
          }}
        />

        <EvidenceTierBand
          label="Models"
          sublabel="Original design artefacts — the intellectual contribution of the programme."
        />

        <EvidenceModule
          id="phase-ecosystem"
          phase="03 — Workforce Ecosystem Blueprint"
          layout="text-left"
          accent
          challenge="HR product thinking defaults to employer–worker dyads. Frontline work involves supervisors, agents, informal intermediaries, and channel-specific coordination."
          intervention="Mapped actors, relationships, channels, and coordination layers. Output: Workforce Ecosystem Blueprint — shared model of workforce interactions."
          figure={{
            figure: 3,
            label: "Workforce Ecosystem Blueprint",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Workforce Ecosystem Blueprint",
            caption:
              "[Replace with artefact] Ecosystem blueprint — output: shared model of workforce interactions across the employment lifecycle.",
            decisionNotes: [
              "Ecosystem model precedes journey maps — actors and relationships define what journeys are even possible",
              "Blueprint became the shared reference for Gates Foundation and SeamlessHR alignment workshops",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-lifecycle"
          phase="04 — Workforce Lifecycle Framework"
          layout="text-right"
          accent
          challenge="Feature-based scoping would fragment the programme. The team needed one organising spine that could hold employer, worker, and supervisor perspectives."
          intervention="Defined seven stages: Discover, Join, Show Up, Do Work, Get Rewarded, Grow, Thrive. Output: Workforce Lifecycle Framework — seven-stage workforce journey model."
          figure={{
            figure: 4,
            label: "Workforce Lifecycle Framework",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Lifecycle Framework — Discover through Thrive",
            caption:
              "[Replace with artefact] Lifecycle framework — output: seven-stage workforce journey model with stage definitions and opportunity mapping.",
            decisionNotes: [
              "Lifecycle chosen over feature categories — stages hold cross-capability experiences that feature lists flatten",
              "Seven stages balance granularity with memorability — enough to guide service design without becoming operational taxonomy",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-blueprint"
          phase="05 — Workforce Service Blueprint"
          layout="text-left"
          accent
          challenge="Lifecycle stages needed operational detail — frontstage and backstage actions, support processes, and failure points visible to cross-functional teams."
          intervention="Produced high-level and detailed service blueprints connecting worker, supervisor, and employer touchpoints to backstage processes. Output: Workforce Service Blueprint — operational view of workforce delivery."
          figure={{
            figure: 5,
            label: "Workforce Service Blueprint",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] High-Level and Detailed Service Blueprint",
            caption:
              "[Replace with artefact] Service blueprint — output: operational view of workforce delivery across lifecycle stages.",
            decisionNotes: [
              "Two fidelity levels — high-level for stakeholder alignment, detailed for squad-level design",
              "Backstage processes explicitly mapped — revealing where platform services vs human coordination is required",
            ],
          }}
        />

        <EvidenceTierBand label="Architecture" sublabel="Strategic handoff — capability domains for platform prioritisation." />

        <EvidenceModule
          id="phase-capability"
          phase="06 — Capability Architecture"
          layout="text-right"
          accent
          pullQuote="The architecture became the handoff layer between workforce research and product strategy."
          challenge="Service blueprints revealed dozens of opportunity areas. Without a capability map, prioritisation would collapse into feature debates disconnected from research."
          intervention="Established eight interconnected capability domains derived from research — not imported from standard HR modules. Output: Capability Architecture — eight workforce capability domains."
          figure={{
            figure: 6,
            label: "Capability Architecture",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Capability Architecture — eight domains",
            caption:
              "[Replace with artefact] Capability map — output: eight workforce capability domains with dependencies and platform service boundaries.",
            decisionNotes: [
              "Eight capabilities derived from research — Financial Wellbeing and Career Mobility elevated to peer domains",
              "Architecture defines handoff to BluAlliance platform strategy — deliberately stopping before UI",
            ],
          }}
        />
      </div>

      <CapabilityHandoff
        domains={CAPABILITY_DOMAINS}
        nextHref="/work/blualliance"
        nextTitle="BluAlliance"
      />

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What the deliverables established
        </h2>
        <OutcomeCards tiers={outcomeTiers} />
      </section>

      <div style={{ maxWidth: 1240, margin: "48px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          Reflection
        </p>
        <p style={{ marginTop: 14, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          The hardest part wasn&apos;t understanding workers. It was creating a shared model that product, business, and
          field teams could all use to reason about the workforce ecosystem. Running this alongside{" "}
          <Link href="/work/seamkit" style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 3 }}>
            SeamKit
          </Link>{" "}
          surfaced a useful tension: <em>consistency</em> (shared UI baseline) vs <em>coherence</em> (experiences that
          fit frontline reality). Both are necessary — ecosystem models ensure product work stays coherent with how work
          actually happens.
        </p>
      </div>

      <NextReadCard
        microLabel="Next in series · Translate the system"
        title={nextProject?.title ?? "BluAlliance"}
        body="How capability architecture translated into platform vision, prioritisation, and a portfolio of connected workforce experiences."
        href="/work/blualliance"
        imageSrc={nextProject?.assets?.hero?.src}
        imageAlt={nextProject?.assets?.hero?.alt}
      />

      <UnlockPanel
        label="05 Unlocks"
        items={[
          "Capability architecture became the handoff layer for BluAlliance platform strategy — see the next case study.",
          "Established shared language across Gates Foundation programme stakeholders, SeamlessHR product leadership, and field partners.",
          "Ecosystem Blueprint, Lifecycle Framework, and Service Blueprint remain durable strategic artefacts beyond any single product release.",
          "Parallel SeamKit work ensured UI consistency would not come at the cost of frontline coherence when product surfaces shipped.",
        ]}
      />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
