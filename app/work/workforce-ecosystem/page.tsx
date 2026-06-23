import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import NextReadCard from "@/components/case-study/NextReadCard";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Workforce Ecosystem — John Ohio",
  description:
    "Multi-country research and service design for Africa's frontline workforce — from field insights through lifecycle frameworks, service blueprints, and capability architecture.",
  alternates: { canonical: "/work/workforce-ecosystem" },
};

const PLACEHOLDER = "/assets/work/_placeholders/hero.svg";

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Key Insights" },
  { id: "evidence", label: "03 Evidence" },
  { id: "outcomes", label: "04 Outcomes" },
  { id: "unlocks", label: "05 Unlocks" },
];

const phases: Phase[] = [
  { id: "phase-research", number: "01", name: "Research", description: "Multi-country fieldwork — Nigeria & Kenya" },
  { id: "phase-insights", number: "02", name: "Insights", description: "Pattern synthesis across markets" },
  { id: "phase-ecosystem", number: "03", name: "Ecosystem Model", description: "Workforce Ecosystem Blueprint" },
  { id: "phase-lifecycle", number: "04", name: "Lifecycle Framework", description: "Discover → Thrive" },
  { id: "phase-blueprint", number: "05", name: "Service Blueprint", description: "High-level and detailed layers" },
  {
    id: "phase-capability",
    number: "06",
    name: "Capability Architecture",
    description: "Eight interconnected domains",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "STRATEGIC",
    items: [
      "Workforce Ecosystem Blueprint established as shared reference model",
      "Seven-stage lifecycle framework adopted across programme stakeholders",
      "Eight capability domains mapped with clear boundaries and dependencies",
    ],
  },
  {
    category: "ALIGNMENT",
    items: [
      "Shared language between Gates Foundation, SeamlessHR, and field partners",
      "Service blueprints aligned employer, supervisor, and worker touchpoints",
      "Research synthesis defensible across two markets without over-generalising",
    ],
  },
  {
    category: "ENABLEMENT",
    items: [
      "Platform exploration enabled without re-litigating research foundations",
      "Capability architecture provided handoff layer for product prioritisation",
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
        thesis="Mapping Africa's frontline workforce from multi-country research through capability architecture."
        abstract={
          "A research and service design programme spanning Nigeria and Kenya — synthesising field evidence into ecosystem models, lifecycle frameworks, and capability architecture that enabled platform exploration without premature product UI."
        }
        impact={project.metrics}
        heroImage={{
          src: project.assets?.hero?.src,
          alt: project.assets?.hero?.alt,
        }}
        executiveBrief={project.brief}
      />

      <TensionCards
        label="02 Key Insights"
        heading="What the research revealed"
        subhead="Three patterns that reshaped how the programme understood frontline work — each with direct design implications for service and platform decisions."
        cards={[
          {
            number: "01",
            title: "The supervisor is a coordination layer",
            body:
              "Supervisors mediate between employers, workers, and informal systems — scheduling, attendance, disputes, and trust all route through them. Design implication: any workforce platform must treat supervisor workflows as first-class, not as admin overlays on worker-facing features.",
          },
          {
            number: "02",
            title: "Employment visibility is structurally limited",
            body:
              "Workers and employers often lack shared visibility into employment status, pay cycles, and obligations — not because of missing features, but because of fragmented channels and informal arrangements. Design implication: service blueprints must account for partial visibility and offline coordination, not assume real-time HR transparency.",
          },
          {
            number: "03",
            title: "Prosperity extends beyond employment",
            body:
              "Financial wellbeing, learning, benefits, and career mobility matter as much as payroll — often through channels outside traditional HR. Design implication: capability architecture must span eight domains beyond core HRM, with financial wellbeing and career mobility as peer capabilities, not add-ons.",
          },
        ]}
      />

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Evidence
        </p>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          From field research through capability architecture — six artefacts that structured the programme.
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="phase-research"
          phase="01 — Research"
          layout="text-left"
          challenge="Frontline workforce dynamics in Nigeria and Kenya had not been documented at ecosystem scale. The programme needed grounded evidence before any product scope could be credible."
          intervention="Designed and led multi-country research with 150+ participants — employers, workers, supervisors, and field partners — using ethnographic visits, structured interviews, and synthesis workshops."
          figure={{
            figure: 1,
            label: "Research Overview Board",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Research Overview Board — multi-country synthesis",
            caption:
              "[Replace with artefact] Research overview board synthesising participant segments, markets, and research methods across Nigeria and Kenya.",
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
          phase="02 — Insights"
          layout="text-right"
          challenge="Raw field notes risked staying anecdotal. Stakeholders needed actionable patterns, not interview transcripts."
          intervention="Synthesised research into thematic insights with design implications — connecting field evidence to service design decisions and platform opportunity areas."
          figure={{
            figure: 2,
            label: "Insight Synthesis",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Key insight synthesis board",
            caption:
              "[Replace with artefact] Insight synthesis mapping research themes to design implications and capability gaps.",
            decisionNotes: [
              "Insights framed with design implications — not just observations — so product teams could act without re-interpreting raw research",
              "Three core insights (supervisor layer, visibility limits, prosperity beyond employment) became the narrative spine for all downstream artefacts",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-ecosystem"
          phase="03 — Ecosystem Model"
          layout="text-left"
          challenge="HR product thinking defaults to employer–worker dyads. Frontline work involves supervisors, agents, informal intermediaries, and channel-specific coordination."
          intervention="Mapped the Workforce Ecosystem Blueprint — actors, relationships, channels, and coordination layers that define how frontline work actually happens."
          figure={{
            figure: 3,
            label: "Workforce Ecosystem Blueprint",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Workforce Ecosystem Blueprint",
            caption:
              "[Replace with artefact] Ecosystem blueprint showing actors, channels, and coordination layers across the frontline workforce.",
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
          phase="04 — Lifecycle Framework"
          layout="text-right"
          challenge="Feature-based scoping would fragment the programme. The team needed one organising spine that could hold employer, worker, and supervisor perspectives."
          intervention="Defined a seven-stage lifecycle framework: Discover, Join, Show Up, Do Work, Get Rewarded, Grow, Thrive — mapping touchpoints, pain points, and opportunities at each stage."
          figure={{
            figure: 4,
            label: "Lifecycle Framework",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Lifecycle Framework — Discover through Thrive",
            caption:
              "[Replace with artefact] Seven-stage lifecycle framework with stage definitions, actors, and opportunity mapping.",
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
          phase="05 — Service Blueprint"
          layout="text-left"
          challenge="Lifecycle stages needed operational detail — frontstage and backstage actions, support processes, and failure points visible to cross-functional teams."
          intervention="Produced high-level and detailed service blueprints connecting worker, supervisor, and employer touchpoints to backstage processes and system enablers."
          figure={{
            figure: 5,
            label: "Service Blueprint",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] High-Level and Detailed Service Blueprint",
            caption:
              "[Replace with artefact] Service blueprint layers — high-level overview and detailed frontstage/backstage mapping for priority lifecycle stages.",
            decisionNotes: [
              "Two fidelity levels — high-level for stakeholder alignment, detailed for squad-level design — avoiding premature UI while enabling operational clarity",
              "Backstage processes explicitly mapped — revealing where platform services vs human coordination is required",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-capability"
          phase="06 — Capability Architecture"
          layout="text-right"
          accent
          pullQuote="The programme deliberately stopped at architecture — not UI."
          challenge="Service blueprints revealed dozens of opportunity areas. Without a capability map, prioritisation would collapse into feature debates disconnected from research."
          intervention="Established capability architecture across eight domains: Workforce Identity, Recruitment, Workforce Management, Communication, Learning, Benefits, Financial Wellbeing, and Career Mobility."
          figure={{
            figure: 6,
            label: "Capability Map",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Capability Architecture — eight domains",
            caption:
              "[Replace with artefact] Capability map showing eight interconnected domains with dependencies and platform service boundaries.",
            decisionNotes: [
              "Eight capabilities derived from research — not imported from standard HR product modules",
              "Architecture defines handoff to platform work — BluAlliance product strategy builds directly on this map",
              "Financial Wellbeing and Career Mobility elevated to peer capabilities — reflecting prosperity-beyond-employment insight",
            ],
          }}
        />
      </div>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What the models established
        </h2>
        <OutcomeCards tiers={outcomeTiers} />
      </section>

      <div style={{ maxWidth: 1240, margin: "48px auto 0", padding: "0 24px" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          Reflection
        </p>
        <p style={{ marginTop: 14, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 760 }}>
          Running this programme alongside{" "}
          <Link href="/work/seamkit" style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 3 }}>
            SeamKit
          </Link>{" "}
          surfaced a useful tension: <em>consistency</em> (shared UI baseline across products) vs{" "}
          <em>coherence</em> (experiences that fit frontline operational reality). SeamKit optimises for consistency at
          scale; the ecosystem work optimises for coherence with how work actually happens. Both are necessary — the
          platform portfolio inherits SeamKit for UI consistency while using ecosystem models to ensure product
          experiences remain coherent with frontline contexts.
        </p>
      </div>

      <NextReadCard
        microLabel="Next in series · Platform strategy"
        title={nextProject?.title ?? "BluAlliance"}
        body="How capability architecture translated into platform vision, experience portfolio design, and future-state architecture for Africa's frontline workforce."
        href="/work/blualliance"
        imageSrc={nextProject?.assets?.hero?.src}
        imageAlt={nextProject?.assets?.hero?.alt}
      />

      <UnlockPanel
        label="05 Unlocks"
        items={[
          "Enabled BluAlliance platform exploration on a research-backed foundation — see the platform strategy case study.",
          "Established shared language across Gates Foundation programme stakeholders, SeamlessHR product leadership, and field partners.",
          "Capability architecture provided the handoff layer that prevented product teams from re-litigating research during prioritisation.",
          "Parallel SeamKit work ensured UI consistency would not come at the cost of frontline coherence when product surfaces shipped.",
        ]}
      />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
