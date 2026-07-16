import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import TensionCards from "@/components/case-study/TensionCards";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import EvidenceModule from "@/components/case-study/EvidenceModule";
import SectionDivider from "@/components/case-study/SectionDivider";
import RailSection from "@/components/case-study/RailSection";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import EvidenceImage from "@/components/case-study/evidence/EvidenceImage";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, getCaseStudyNeighbors } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Seamkit",
  description:
    "How SeamKit became the operating foundation that let a growing enterprise product suite scale design and engineering decisions across products, platforms, and releases — without fragmenting.",
  alternates: { canonical: "/work/seamkit" },
};

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "validation", label: "02 Evidence" },
  { id: "tensions", label: "03 Tensions" },
  { id: "evidence", label: "04 Evidence in Practice" },
  { id: "outcomes", label: "05 Outcomes" },
  { id: "reflection", label: "06 Reflection" },
];

const layers: Phase[] = [
  {
    id: "layer-1",
    number: "Layer 01",
    name: "Foundations",
    description: "Primitive → semantic → component tokens",
  },
  {
    id: "layer-2",
    number: "Layer 02",
    name: "Components",
    description: "Shared primitives, patterns, and reusable building blocks",
  },
  {
    id: "layer-3",
    number: "Layer 03",
    name: "Governance",
    description: "Lifecycle + contribution + review cadences",
  },
  {
    id: "layer-4",
    number: "Layer 04",
    name: "Adoption",
    description: "Instrumentation, trust, usage, and evolution under load",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "Business Impact",
    items: [
      "30% faster feature delivery",
      "40% fewer frontend bugs",
      "85% reduction in visual inconsistency across the product suite",
      "30% faster onboarding for new contributors",
    ],
  },
  {
    category: "System Health",
    items: [
      "2.49M  — Token insertions (2025)",
      "443K   — Component insertions",
      "88.9   — Adoption score (sustained usage, not bursts)",
      "91.1   — Trust score (system trust across teams)",
      "57     — NPS (no detractors)",
      "80%    — Designers and engineers report daily reliance",
      "12     — Product teams aligned on a shared baseline",
    ],
  },
];

const validationFindings = [
  "The audit revealed 30+ duplicate core components (buttons, inputs) across fragmented libraries.",
  "Sprint metrics exposed an average 14-day feature hand-off — with 7 days allocated solely to UI fixes.",
  "Engineering feedback showed 62% citing style churn as the primary delivery blocker.",
  "Brand review confirmed the new visual identity absent on 70% of live screens.",
];

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--fg-subtle)",
      }}
    >
      {children}
    </span>
  );
}

function DecisionBlocks({ items, label = "Decision" }: { items: string[]; label?: string }) {
  if (items.length === 0) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <Micro>{label}</Micro>
      <ul
        style={{
          marginTop: 12,
          paddingLeft: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {items.map((item, i) => (
          <li
            key={`${label}-${i}`}
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "var(--fg-body)",
              lineHeight: 1.75,
              paddingLeft: 16,
              position: "relative",
            }}
          >
            <span style={{ position: "absolute", left: 0, color: "var(--fg-subtle)" }}>·</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SeamkitFlagshipCaseStudy() {
  const project = getProject("seamkit");
  if (!project) return null;

  const { prev, next } = getCaseStudyNeighbors("seamkit");

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
        sectionId="brief"
        microLabel="SeamlessHR · Dec 2023 – Present"
        title={project.title}
        subtitle={project.subtitle}
        thesisLead="Designing the operating foundation that allowed a growing enterprise product suite to scale without fragmenting design and engineering decisions."
        thesis="As SeamlessHR's product suite expanded, locally managed design and engineering libraries turned every change into a coordination problem. Teams needed a shared operating foundation that could scale design decisions consistently across products, platforms, and releases."
        abstract="As Design Systems Lead, I led the creation of SeamKit—establishing a common operating foundation that enabled product teams to build, evolve, and scale together."
        impact={[
          { value: "12", label: "Teams aligned" },
          { value: "2.49M", label: "Token insertions" },
          { value: "88.9", label: "Adoption score" },
          { value: "91.1", label: "Trust score" },
        ]}
        heroImage={{
          src: project.assets?.hero?.src ?? project.assets?.thumbnails?.[0]?.src,
          alt: project.assets?.hero?.alt ?? project.assets?.thumbnails?.[0]?.alt,
        }}
        executiveBrief={project.brief!}
      />

      <RailSection id="validation" eyebrow="02 Evidence" title="Evidence Behind the Decision">
        <p style={{ margin: 0, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 640 }}>
          Before any architecture was defined, user testing, library analysis, and stakeholder interviews documented
          what the legacy ecosystem was costing delivery.
        </p>

        <div style={{ marginTop: 32 }}>
          <AnnotatedFigure
            figure={1}
            label="Research workshop"
            embedSrc="https://embed.figma.com/board/BY9DCmOCYTrV1GoQVY6O5V/Design-Jam---DS-Components?node-id=0-1&embed-host=share"
            embedTitle="Design Jam — DS Components collaborative UI audit on FigJam"
            embedChrome="figjam"
            fallbackImageSrc="/assets/work/seamkit/block-research-figjam.png"
            fallbackImageAlt="Collaborative workshop UI audit session on FigJam"
            embedBoardHref="https://www.figma.com/board/BY9DCmOCYTrV1GoQVY6O5V/Design-Jam---DS-Components"
            caption="Collaborative UI audit workshop on FigJam — pan and zoom to explore the session."
            hideDecisionNotes
          />
        </div>

        <DecisionBlocks items={validationFindings} label="Finding" />
      </RailSection>

      <div style={{ maxWidth: 1240, margin: "40px auto 0", padding: "0 24px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/work/seamkit/block-consolidation-visual.png"
          alt="Fragmented design and Vue libraries consolidating into a unified governed stack — tokens, components, governance, teams, and analytics"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }}
        />
        <p style={{ marginTop: 12, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 720 }}>
          At the system level, six parallel libraries became one governed stack.
        </p>
      </div>

      <RailSection id="tensions" eyebrow="03 Core Tensions" title="What had to change">
        <p style={{ margin: 0, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 640 }}>
          Three systemic failures that made a governed baseline unavoidable.
        </p>

        <p style={{ marginTop: 18, fontSize: 15, color: "var(--fg-body)", lineHeight: 1.7, maxWidth: 640 }}>
          The problem wasn&apos;t component shortage — design decisions had no structure that could travel across teams.
        </p>

        <TensionCards
          embedded
          cards={[
            {
              number: "01",
              title: "Fragmentation became delivery drag",
              body:
                "Duplicate patterns and local naming conventions turned platform-wide changes into a scheduling problem. Consistency required repeated cross-team effort — not system logic.",
            },
            {
              number: "02",
              title: "Without governance, shared libraries decay",
              body:
                "A component library with no lifecycle management becomes untrustworthy. Teams fork locally, the shared system fills with exceptions, and the cycle restarts.",
            },
            {
              number: "03",
              title: "Adoption is an influence model",
              body:
                "Teams will not adopt what they did not help shape. Contribution had to be designed as a path to influence — not enforced from the top.",
            },
          ]}
        />
      </RailSection>

      <RailSection id="evidence" eyebrow="04 Evidence in Practice">
        <PhaseTimeline phases={layers} />
      </RailSection>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 96 }}>
        <EvidenceModule
          id="layer-1"
          phase="Layer 01 — Foundations"
          layout="rail"
          challengeLabel="Problem"
          challenge="The shortcut was shipping components. Token chaos and components-first delivery would have reproduced fragmentation at a different layer — interpretive debt compounds when tokens carry no shared meaning."
          interventionLabel="Decision"
          intervention="Token architecture before components — trading early visible output for a system where brand and compliance updates propagate through one layer."
          reasoningLabel="Intervention"
          reasoning="A three-tier token architecture: primitive values → semantic tokens → component tokens, consumed through Figma token sync and engineering integration."
          figure={{
            figure: 2,
            label: "Token hierarchy",
            imageSrc: "/assets/work/seamkit/block-token-hierarchy.png",
            imageAlt: "Three-tier token hierarchy — Core, Decision, Component",
            caption:
              "Three-tier token hierarchy: Core (primitive values) → Decision (Semantic) → Component. 581 primitives · 488 component tokens · 349 colour tokens.",
            decisionNotes: [
              "Token architecture preceded components, trading early visible output for long-term scalability",
              "Semantic tier separated meaning from raw values, reducing exception-driven drift",
              "The Decision layer is the theming surface. Brand or compliance changes update one layer and propagate across every component that references it — core values stay stable, components stay untouched.",
            ],
            decisionLabel: "Decision",
          }}
          secondaryFigure={{
            figure: 3,
            label: "Token Studio",
            imageSrc: "/assets/work/seamkit/block-token-studio.png",
            imageAlt: "Token Studio variables panel — Seamkit taxonomy",
            caption:
              "Token Studio variables panel: the taxonomy consumed by design and engineering across the platform.",
            hideDecisionNotes: true,
          }}
        />

        <section style={{ padding: "0 24px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <figure>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--fg-subtle)",
                  marginBottom: 12,
                }}
              >
                Encoding brand and communication into the system
              </p>
              <EvidenceImage
                src="/assets/work/seamkit/brand-system.png"
                alt="SeamlessHR brand system — typography, colour palette, tone of voice, and messaging states aligned within SeamKit"
                title="Encoding brand and communication into the system"
                description="Brand identity, tone of voice, and messaging patterns encoded into the system — ensuring product and communication stayed consistent by default. These decisions are no longer guidelines. They are enforced through tokens and components."
                borderless
                imageStyle={{ borderRadius: 22 }}
              />
              <figcaption style={{ fontSize: 13, color: "var(--fg-subtle)", marginTop: 12, lineHeight: 1.6 }}>
                Brand identity, tone of voice, and messaging patterns encoded into the system — ensuring product and
                communication stayed consistent by default. These decisions are no longer guidelines. They are enforced
                through tokens and components.
              </figcaption>
            </figure>
          </div>
        </section>

        <SectionDivider />

        <EvidenceModule
          id="layer-2"
          phase="Layer 02 — Components"
          layout="rail"
          challengeLabel="Problem"
          challenge="Shared components without stable foundations accumulate edge-case overrides and become the same divergence problem at a different layer."
          interventionLabel="Decision"
          intervention="Shared primitives on the token taxonomy — teams ship independently while staying visually and structurally consistent."
          reasoningLabel="Intervention"
          reasoning="Component foundations built on aligned patterns and governed token consumption, not per-team library forks."
          pairFigures
          figure={{
            figure: 4,
            label: "Component library",
            imageSrc: "/assets/work/seamkit/block-component-library.png",
            imageAlt: "Snapshot of Seamkit component file",
            caption: "Shared component foundations consumed across product teams.",
            decisionNotes: [
              "Component-level overrides were scoped explicitly, preventing semantic tokens from becoming exceptions",
              "Foundations designed to support multiple product teams without needing bespoke variants per team",
            ],
            decisionLabel: "Decision",
          }}
          secondaryFigure={{
            figure: 5,
            label: "Library analytics",
            imageSrc: "/assets/work/seamkit/block-library-analytics.png",
            imageAlt: "Library analytics — components, usage, and activities",
            caption: "Library analytics validating production reuse.",
            hideDecisionNotes: true,
          }}
        />

        <section style={{ padding: "0 24px" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <AnnotatedFigure
              figure={6}
              label="Documentation platform"
              imageSrc="/assets/work/seamkit/block-docs-platform.png"
              imageAlt="Seamkit documentation platform and Design at SeamlessHR"
              caption="Documentation as the operational source of truth."
              hideDecisionNotes
            />
          </div>
        </section>

        <SectionDivider />

        <EvidenceModule
          id="layer-3"
          phase="Layer 03 — Governance"
          layout="rail"
          challengeLabel="Problem"
          challenge="A shared library without governance becomes a dumping ground. Trust drops, and teams route around the system the moment it slows delivery."
          interventionLabel="Decision"
          intervention="Lifecycle stages and review cadences as the operating model — review, approval, ownership, and deprecation are part of governance, not a side process."
          reasoningLabel="Intervention"
          reasoning="A five-stage component lifecycle (proposal → draft → review → stable → deprecated) with clear cadences: Token Council (bi-weekly), Component Review Board (monthly), Pattern Steering Group (quarterly)."
          figure={{
            figure: 7,
            label: "Governance workflow",
            imageSrc: "/assets/work/seamkit/block-governance.png",
            imageAlt: "Seamkit governance workflow — lifecycle and contribution model",
            caption:
              "Governance workflow: identify need → proposal → community review → draft → stable release. Cadences: Token Council · Component Review Board · Pattern Steering Group.",
            decisionNotes: [
              "Lifecycle stages created a shared definition of stability and deprecation (no silent drift)",
              "Cadences made governance visible and predictable, increasing trust across teams",
            ],
            decisionLabel: "Decision",
          }}
        />

        <SectionDivider />

        <EvidenceModule
          id="layer-4"
          phase="Layer 04 — Adoption & system health"
          layout="rail"
          challengeLabel="Problem"
          challenge="Adoption is not a rollout event; it's sustained reliance. The system needed instrumentation that could detect drift and trust loss before it became fragmentation again."
          interventionLabel="Decision"
          intervention="Instrumentation plus an influence model — co-creation before mandates, with detach rate as a leading trust signal."
          reasoningLabel="Intervention"
          reasoning="Health tracked through Figma analytics (insertions, usage frequency, detach behavior) and sentiment signals — reinforcing adoption through co-creation and service-level responsiveness."
          pullQuote="Healthy systems aren't measured by migration—they're measured by continued voluntary use."
          figure={{
            figure: 8,
            label: "Adoption analytics",
            imageSrc: "/assets/work/seamkit/block-adoption-analytics.png",
            imageAlt: "Seamkit adoption analytics compared to SHR Product v2",
            caption: "Seamkit adoption in comparison to the most active fragmented library (SHR Product v2).",
            decisionNotes: [
              "Adoption was designed as an influence model — audits + working sessions before governance hardening",
              "Detach rate became a leading indicator of system trust — signalling when teams were routing around the system rather than through it.",
            ],
            decisionLabel: "Decision",
          }}
          secondaryFigure={{
            figure: 9,
            label: "System health survey",
            imageSrc: "/assets/work/seamkit/block-system-health-survey.png",
            imageAlt: "SeamKit system health survey — NPS 57, improvement priorities, team feedback",
            caption:
              "System health survey validating sustained reliance — NPS 57 with no detractors; improvement requests point to scale (variants, alignment), not abandonment.",
            hideDecisionNotes: true,
          }}
        />
      </div>

      <RailSection id="outcomes" eyebrow="05 Outcomes" title="What the system enabled">
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            color: "var(--fg-body)",
            lineHeight: 1.75,
            maxWidth: 640,
          }}
        >
          The operating model had become the default starting point for new product work.
        </p>
        <div style={{ marginTop: 24 }}>
          <OutcomeCards tiers={outcomeTiers} />
        </div>
      </RailSection>

      <section
        id="reflection"
        style={{
          marginTop: 80,
          background: "var(--surface-subtle)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
              06 Reflection
            </p>
            <p
              style={{
                marginTop: 24,
                fontSize: 16,
                color: "var(--fg-body)",
                lineHeight: 1.75,
                marginBottom: 0,
              }}
            >
              Design systems become infrastructure when organizations stop thinking about them as libraries and start
              relying on them as operating foundations. At that point, growth no longer tests whether the system works —
              it reveals where it needs to evolve.
            </p>
            <p
              style={{
                marginTop: 32,
                fontSize: 18,
                fontWeight: 600,
                color: "var(--fg)",
                lineHeight: 1.6,
                marginBottom: 0,
              }}
            >
              The system was being stretched because it worked.
            </p>
          </div>
        </div>
      </section>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
