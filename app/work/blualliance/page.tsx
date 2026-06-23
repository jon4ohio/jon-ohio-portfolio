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
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "BluAlliance — John Ohio",
  description:
    "Platform strategy and experience design for Africa's frontline workforce — from capability map through Breeze, WhatsApp ESS, supervisor workflows, and future-state architecture.",
  alternates: { canonical: "/work/blualliance" },
};

const PLACEHOLDER = "/assets/work/_placeholders/hero.svg";

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Challenge" },
  { id: "evidence", label: "03 Evidence" },
  { id: "outcomes", label: "04 Outcomes" },
  { id: "unlocks", label: "05 Unlocks" },
];

const phases: Phase[] = [
  { id: "phase-capability", number: "01", name: "Capability Map", description: "Research handoff → opportunity areas" },
  { id: "phase-vision", number: "02", name: "Platform Vision", description: "Shared services, multiple surfaces" },
  { id: "phase-portfolio", number: "03", name: "Experience Portfolio", description: "Breeze, WhatsApp, productivity, prosperity" },
  { id: "phase-architecture", number: "04", name: "Future Architecture", description: "Platform services and integration model" },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "PLATFORM",
    items: [
      "Platform vision established with shared capability services",
      "Six opportunity areas prioritised with maturity-aware roadmap",
      "Future-state architecture defined for cross-stream integration",
    ],
  },
  {
    category: "EXPERIENCE",
    items: [
      "Breeze information architecture scoped for employer and admin workflows",
      "WhatsApp ESS flows designed as first-class channel — not web fallback",
      "Frontline productivity framework addresses supervisor coordination layer",
      "Workforce prosperity framework spans benefits and financial wellbeing",
    ],
  },
  {
    category: "DELIVERY",
    items: [
      "Experience streams documented by delivery state — in development, UAT, roadmap",
      "Cross-functional alignment on platform vs isolated product trade-offs",
      "Honest maturity framing maintained stakeholder trust during parallel workstreams",
    ],
    caption:
      "Not all experience streams are shipped. Some are in active development, others in UAT or on the roadmap — this case study reflects current programme maturity, not a launch narrative.",
  },
];

export default function BluallianceFlagshipCaseStudy() {
  const project = getProject("blualliance");
  if (!project?.brief) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "blualliance");
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
        microLabel={`${project.company} · ${project.period}`}
        title={project.title}
        subtitle={project.subtitle}
        thesis="Translating workforce ecosystem research into a prioritised platform portfolio for Africa's frontline workforce."
        abstract=""
        impact={project.metrics}
        heroImage={{
          src: project.assets?.hero?.src,
          alt: project.assets?.hero?.alt,
        }}
        executiveBrief={project.brief}
      />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 24px 0" }}>
        <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 780 }}>
          This platform work builds directly on the{" "}
          <Link
            href="/work/workforce-ecosystem"
            style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Workforce Ecosystem
          </Link>{" "}
          research programme — which identified eight capability domains across Nigeria and Kenya through multi-country
          field research, lifecycle frameworks, and service blueprints. BluAlliance takes that capability architecture
          and asks: which opportunities to pursue, through which channels, as platform services vs isolated products.
        </p>
      </div>

      <TensionCards
        label="02 Challenge"
        heading="Prioritisation under constraint"
        subhead="Research surfaced more opportunity than any single squad could pursue. Three questions shaped platform strategy."
        cards={[
          {
            number: "01",
            title: "Which opportunities first?",
            body:
              "Eight capability domains and dozens of opportunity areas — but limited engineering capacity and parallel programme commitments. The team needed explicit prioritisation criteria, not implicit feature queue ordering.",
          },
          {
            number: "02",
            title: "Which channels to invest in?",
            body:
              "Frontline workers operate across WhatsApp, feature phones, and occasional web access. Employers need admin surfaces. Forcing a single channel would exclude users; supporting every channel would fragment delivery.",
          },
          {
            number: "03",
            title: "Platform or isolated products?",
            body:
              "Each opportunity could ship as a standalone product or as a service within a shared platform. Platform coherence trades short-term speed for long-term integration — the decision had to be made explicitly, not by default.",
          },
        ]}
      />

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Evidence
        </p>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          From capability handoff through future-state architecture — seven artefacts across four programme phases.
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <EvidenceModule
          id="phase-capability"
          phase="01 — Opportunity & Capability Map"
          layout="text-left"
          challenge="The ecosystem research produced eight capability domains. Product teams needed an opportunity map that connected research findings to actionable build areas without losing architectural coherence."
          intervention="Translated capability architecture into a prioritised opportunity map — six focus areas with dependencies, maturity signals, and cross-capability integration points."
          figure={{
            figure: 1,
            label: "Opportunity & Capability Map",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Opportunity & Capability Map",
            caption:
              "[Replace with artefact] Opportunity map aligned to eight capability domains with prioritisation criteria and dependency mapping.",
            decisionNotes: [
              "Six opportunity areas chosen from eight capabilities — explicit deprioritisation, not implicit backlog",
              "Map inherits research language — no re-interpretation layer between ecosystem work and product squads",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-vision"
          phase="02 — Platform Vision"
          layout="text-right"
          challenge="Parallel squads risked building isolated products that couldn't integrate later — especially across WhatsApp, web, and supervisor tooling."
          intervention="Defined BluAlliance platform vision: shared capability services powering multiple experience streams, with explicit integration model and channel strategy."
          figure={{
            figure: 2,
            label: "Platform Vision",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] BluAlliance Platform Vision",
            caption:
              "[Replace with artefact] Platform vision diagram — shared services layer with experience streams (Breeze, WhatsApp ESS, supervisor tools) on top.",
            decisionNotes: [
              "Platform decision made explicitly — shared services for identity, workforce management, and communication",
              "Experience streams can ship independently but inherit platform services — avoiding isolated product trap",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-portfolio-breeze"
          phase="03 — Breeze Information Architecture"
          layout="text-left"
          challenge="Employers and administrators need web-based workforce management — but standard HR IA patterns don't fit frontline operational workflows."
          intervention="Designed Breeze information architecture around frontline employer workflows — hiring, scheduling, attendance, and workforce visibility — scoped to platform capability services."
          figure={{
            figure: 3,
            label: "Breeze IA",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Breeze Information Architecture",
            caption:
              "[Replace with artefact] Breeze web platform IA — navigation model, module structure, and employer workflow surfaces.",
            decisionNotes: [
              "IA organised by employer jobs-to-be-done, not HR module taxonomy",
              "Supervisor coordination surfaces integrated — not relegated to admin settings",
              "Delivery state: in active development",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-portfolio-whatsapp"
          phase="03 — WhatsApp ESS Flow"
          layout="text-right"
          challenge="Frontline workers don't sit at desks. WhatsApp is often the primary digital channel — but ESS via messaging requires different interaction patterns than web forms."
          intervention="Designed WhatsApp ESS experience flows for worker self-service — leave requests, payslip access, attendance confirmation — using conversational patterns native to the channel."
          figure={{
            figure: 4,
            label: "WhatsApp ESS Flow",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] WhatsApp ESS experience flows",
            caption:
              "[Replace with artefact] WhatsApp ESS flow diagrams — conversational self-service patterns for frontline workers.",
            decisionNotes: [
              "WhatsApp treated as first-class channel — not a notification layer for web ESS",
              "Flows designed for partial connectivity and async responses",
              "Delivery state: in UAT",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-portfolio-productivity"
          phase="03 — Frontline Productivity Framework"
          layout="text-left"
          challenge="Supervisor coordination — scheduling, attendance verification, dispute resolution — emerged as the critical insight from ecosystem research but had no product surface."
          intervention="Designed frontline productivity framework covering supervisor workflows: team visibility, shift coordination, attendance management, and escalation paths."
          figure={{
            figure: 5,
            label: "Frontline Productivity Framework",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Frontline Productivity Framework — supervisor workflows",
            caption:
              "[Replace with artefact] Supervisor workflow framework — coordination layer patterns for frontline team management.",
            decisionNotes: [
              "Supervisor workflows elevated to peer experience stream — direct response to ecosystem research insight",
              "Framework spans mobile and web — supervisors operate in field contexts",
              "Delivery state: in development",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-portfolio-prosperity"
          phase="03 — Workforce Prosperity Framework"
          layout="text-right"
          challenge="Research showed prosperity extends beyond employment — benefits, financial wellbeing, learning, and career mobility matter as peer capabilities."
          intervention="Designed workforce prosperity framework connecting benefits administration, financial wellbeing tools, and career mobility pathways within the platform capability model."
          figure={{
            figure: 6,
            label: "Workforce Prosperity Framework",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Workforce Prosperity Framework",
            caption:
              "[Replace with artefact] Prosperity framework — benefits, financial wellbeing, learning, and career mobility as interconnected capabilities.",
            decisionNotes: [
              "Prosperity framed as capability cluster — not a benefits add-on module",
              "Financial wellbeing includes savings, access, and visibility — not just payroll",
              "Delivery state: on roadmap",
            ],
          }}
        />

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <EvidenceModule
          id="phase-architecture"
          phase="04 — Future State Platform Architecture"
          layout="text-left"
          accent
          pullQuote="Architecture defines what can integrate — not just what ships first."
          challenge="Experience streams progressing in parallel needed a target architecture so integration wouldn't require rework when streams converged."
          intervention="Defined future-state platform architecture — shared services, data model, integration points, and channel abstraction layer connecting Breeze, WhatsApp ESS, and supervisor tooling."
          figure={{
            figure: 7,
            label: "Future State Platform Architecture",
            imageSrc: PLACEHOLDER,
            imageAlt: "[Replace] Future State Platform Architecture",
            caption:
              "[Replace with artefact] Future-state architecture — platform services, integration model, and channel abstraction across experience streams.",
            decisionNotes: [
              "Architecture designed for incremental delivery — streams can ship before full platform maturity",
              "Channel abstraction layer enables WhatsApp and web to share workforce data without duplicate systems",
              "Identity and workforce management as core platform services — all streams inherit",
            ],
          }}
        />
      </div>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What the platform work established
        </h2>
        <OutcomeCards tiers={outcomeTiers} />
      </section>

      <UnlockPanel
        label="05 Unlocks"
        items={[
          "Prioritised platform portfolio with maturity-aware roadmap — six opportunity areas across four experience streams.",
          "Channel strategy resolved: WhatsApp as first-class ESS alongside Breeze web — not a compromise, a design decision.",
          "Supervisor coordination and workforce prosperity elevated from research insights to designed experience streams.",
          "Future-state architecture enables parallel delivery without integration debt — streams converge on shared platform services.",
          "Research foundation preserved — see the Workforce Ecosystem case study for the capability architecture this platform work builds on.",
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
          — research, service design, and capability architecture
        </p>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
