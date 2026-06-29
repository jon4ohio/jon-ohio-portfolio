import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import EvidenceImage from "@/components/case-study/evidence/EvidenceImage";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

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
  { id: "unlocks", label: "06 Reflection" },
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

function LayerChip({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-block",
        border: "1px solid var(--border)",
        borderRadius: 999,
        padding: "4px 12px",
        fontSize: 12.5,
        fontWeight: 600,
        color: "var(--fg)",
        letterSpacing: "0.01em",
        marginBottom: 16,
        background: "var(--surface)",
      }}
    >
      {label}
    </div>
  );
}

function RhythmBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: label === "Problem" ? 0 : 18 }}>
      <Micro>{label}</Micro>
      <div style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function DecisionBlocks({ items, label = "Decision" }: { items: string[]; label?: string }) {
  if (items.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 24,
        borderLeft: "2px solid var(--border)",
        padding: "12px 16px",
        background: "var(--surface)",
        borderRadius: 6,
      }}
    >
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

function SectionDivider() {
  return (
    <div style={{ padding: "0 24px" }}>
      <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
    </div>
  );
}

function TransformationStrip() {
  const cellStyle: React.CSSProperties = {
    border: "1px solid var(--border)",
    borderRadius: 6,
    padding: "12px 16px",
    fontSize: 14,
    color: "var(--fg-body)",
    background: "var(--surface)",
  };

  return (
    <div style={{ maxWidth: 1240, margin: "40px auto 0", padding: "0 24px" }}>
      <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 720, marginBottom: 24 }}>
        At the system level, six parallel libraries became one governed stack.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
        className="case-study-transformation-strip"
      >
        <div>
          <Micro>Before</Micro>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={cellStyle}>3 Design Libraries</div>
            <div style={cellStyle}>3 Vue Libraries</div>
            <div style={cellStyle}>No Governance</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "var(--fg-subtle)", paddingTop: 28 }}>
          →
        </div>
        <div>
          <Micro>After</Micro>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {["Tokens", "Components", "Governance", "Teams", "Analytics"].map((item) => (
              <div key={item} style={cellStyle}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .case-study-transformation-strip {
            grid-template-columns: 1fr !important;
          }
          .case-study-transformation-strip > div:nth-child(2) {
            justify-content: center;
            padding: 0 !important;
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function SeamkitFlagshipCaseStudy() {
  const project = getProject("seamkit");
  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.slug === "seamkit");
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

      <section id="validation" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          02 Evidence Behind the Decision
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          Evidence Behind the Decision
        </h2>
        <p style={{ marginTop: 12, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 720 }}>
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
      </section>

      <TransformationStrip />

      <section id="tensions" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Core Tensions
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What had to change
        </h2>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          Three systemic failures that made a governed baseline unavoidable.
        </p>

        <p style={{ marginTop: 18, fontSize: 15, color: "var(--fg-body)", lineHeight: 1.7, maxWidth: 780 }}>
          The problem wasn&apos;t component shortage — design decisions had no structure that could travel across teams.
        </p>

        <div className="case-study-tension-grid" style={{ display: "flex", gap: 16, marginTop: 28 }}>
          {[
            {
              number: "01",
              title: "Fragmentation became delivery drag",
              body: (
                <>
                  Duplicate patterns and local naming conventions turned platform-wide changes into a scheduling problem.
                  Consistency required repeated cross-team effort — not system logic.
                </>
              ),
            },
            {
              number: "02",
              title: "Without governance, shared libraries decay",
              body: (
                <>
                  A component library with no lifecycle management becomes untrustworthy. Teams fork locally, the shared
                  system fills with exceptions, and the cycle restarts.
                </>
              ),
            },
            {
              number: "03",
              title: "Adoption is an influence model",
              body: (
                <>
                  Teams will not adopt what they did not help shape. Contribution had to be designed as a path to
                  influence — not enforced from the top.
                </>
              ),
            },
          ].map((c) => (
            <div
              key={c.number}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "28px 24px",
                background: "var(--surface)",
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "var(--fg-muted)",
                  lineHeight: 1,
                }}
              >
                {c.number}
              </div>
              <div style={{ marginTop: 12, fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>{c.title}</div>
              <p style={{ marginTop: 8, fontSize: 14, color: "var(--fg-body)", lineHeight: 1.7 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          04 Evidence in Practice
        </p>
        <div style={{ marginTop: 24 }}>
          <PhaseTimeline phases={layers} />
        </div>
      </section>

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 72 }}>
        <section id="layer-1" style={{ padding: "0 24px" }}>
          <div
            style={{ display: "flex", gap: 48, alignItems: "flex-start", maxWidth: 1240, margin: "0 auto" }}
            className="case-study-evidence-row case-study-evidence-row--text-left"
          >
            <div style={{ maxWidth: 460, minWidth: 0 }}>
              <LayerChip label="Layer 01 — Foundations" />
              <RhythmBlock label="Problem">
                The shortcut was shipping components. Token chaos and components-first delivery would have reproduced
                fragmentation at a different layer — interpretive debt compounds when tokens carry no shared meaning.
              </RhythmBlock>
              <RhythmBlock label="Decision">
                Token architecture before components — trading early visible output for a system where brand and
                compliance updates propagate through one layer.
              </RhythmBlock>
              <RhythmBlock label="Intervention">
                A three-tier token architecture: primitive values → semantic tokens → component tokens, consumed through
                Figma token sync and engineering integration.
              </RhythmBlock>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <Micro>Evidence</Micro>
              <div style={{ marginTop: 12 }}>
                <AnnotatedFigure
                  figure={2}
                  label="Token hierarchy"
                  imageSrc="/assets/work/seamkit/block-token-hierarchy.png"
                  imageAlt="Three-tier token hierarchy — Core, Decision, Component"
                  caption="Three-tier token hierarchy: Core (primitive values) → Decision (Semantic) → Component. 581 primitives · 488 component tokens · 349 colour tokens."
                  decisionNotes={[
                    "Token architecture preceded components, trading early visible output for long-term scalability",
                    "Semantic tier separated meaning from raw values, reducing exception-driven drift",
                    "The Decision layer is the theming surface. Brand or compliance changes update one layer and propagate across every component that references it — core values stay stable, components stay untouched.",
                  ]}
                  decisionLabel="Decision"
                />
              </div>
              <div style={{ marginTop: 32 }}>
                <AnnotatedFigure
                  figure={3}
                  label="Token Studio"
                  imageSrc="/assets/work/seamkit/block-token-studio.png"
                  imageAlt="Token Studio variables panel — Seamkit taxonomy"
                  caption="Token Studio variables panel: the taxonomy consumed by design and engineering across the platform."
                  hideDecisionNotes
                />
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1240, margin: "40px auto 0" }}>
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

        <section id="layer-2" style={{ padding: "0 24px" }}>
          <div
            style={{ display: "flex", gap: 48, alignItems: "flex-start", maxWidth: 1240, margin: "0 auto" }}
            className="case-study-evidence-row case-study-evidence-row--text-right"
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <Micro>Evidence</Micro>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 40 }}>
                <AnnotatedFigure
                  figure={4}
                  label="Component library"
                  imageSrc="/assets/work/seamkit/block-component-library.png"
                  imageAlt="Snapshot of Seamkit component file"
                  caption="Shared component foundations consumed across product teams."
                  decisionNotes={[
                    "Component-level overrides were scoped explicitly, preventing semantic tokens from becoming exceptions",
                    "Foundations designed to support multiple product teams without needing bespoke variants per team",
                  ]}
                  decisionLabel="Decision"
                />
                <AnnotatedFigure
                  figure={5}
                  label="Library analytics"
                  imageSrc="/assets/work/seamkit/block-library-analytics.png"
                  imageAlt="Library analytics — components, usage, and activities"
                  caption="Library analytics validating production reuse."
                  hideDecisionNotes
                />
                <AnnotatedFigure
                  figure={6}
                  label="Documentation platform"
                  imageSrc="/assets/work/seamkit/block-docs-platform.png"
                  imageAlt="Seamkit documentation platform and Design at SeamlessHR"
                  caption="Documentation as the operational source of truth."
                  hideDecisionNotes
                />
              </div>
            </div>

            <div style={{ maxWidth: 460, minWidth: 0 }}>
              <LayerChip label="Layer 02 — Components" />
              <RhythmBlock label="Problem">
                Shared components without stable foundations accumulate edge-case overrides and become the same
                divergence problem at a different layer.
              </RhythmBlock>
              <RhythmBlock label="Decision">
                Shared primitives on the token taxonomy — teams ship independently while staying visually and structurally
                consistent.
              </RhythmBlock>
              <RhythmBlock label="Intervention">
                Component foundations built on aligned patterns and governed token consumption, not per-team library
                forks.
              </RhythmBlock>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="layer-3" style={{ padding: "0 24px" }}>
          <div
            style={{ display: "flex", gap: 48, alignItems: "flex-start", maxWidth: 1240, margin: "0 auto" }}
            className="case-study-evidence-row case-study-evidence-row--text-left"
          >
            <div style={{ maxWidth: 460, minWidth: 0 }}>
              <LayerChip label="Layer 03 — Governance" />
              <RhythmBlock label="Problem">
                A shared library without governance becomes a dumping ground. Trust drops, and teams route around the
                system the moment it slows delivery.
              </RhythmBlock>
              <RhythmBlock label="Decision">
                Lifecycle stages and review cadences as the operating model — review, approval, ownership, and
                deprecation are part of governance, not a side process.
              </RhythmBlock>
              <RhythmBlock label="Intervention">
                A five-stage component lifecycle (proposal → draft → review → stable → deprecated) with clear cadences:
                Token Council (bi-weekly), Component Review Board (monthly), Pattern Steering Group (quarterly).
              </RhythmBlock>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <Micro>Evidence</Micro>
              <div style={{ marginTop: 12 }}>
                <AnnotatedFigure
                  figure={7}
                  label="Governance workflow"
                  imageSrc="/assets/work/seamkit/block-governance.png"
                  imageAlt="Seamkit governance workflow — lifecycle and contribution model"
                  caption="Governance workflow: identify need → proposal → community review → draft → stable release. Cadences: Token Council · Component Review Board · Pattern Steering Group."
                  decisionNotes={[
                    "Lifecycle stages created a shared definition of stability and deprecation (no silent drift)",
                    "Cadences made governance visible and predictable, increasing trust across teams",
                  ]}
                  decisionLabel="Decision"
                />
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="layer-4" style={{ padding: "0 24px" }}>
          <div
            style={{ display: "flex", gap: 48, alignItems: "flex-start", maxWidth: 1240, margin: "0 auto" }}
            className="case-study-evidence-row case-study-evidence-row--text-right"
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <Micro>Evidence</Micro>
              <p
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  color: "var(--fg-body)",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  maxWidth: 640,
                }}
              >
                Healthy systems aren&apos;t measured by migration—they&apos;re measured by continued voluntary use.
              </p>
              <div style={{ marginTop: 20 }}>
                <AnnotatedFigure
                  figure={8}
                  label="Adoption analytics"
                  imageSrc="/assets/work/seamkit/block-adoption-analytics.png"
                  imageAlt="Seamkit adoption analytics compared to SHR Product v2"
                  caption="Seamkit adoption in comparison to the most active fragmented library (SHR Product v2)."
                  decisionNotes={[
                    "Adoption was designed as an influence model — audits + working sessions before governance hardening",
                    "Detach rate became a leading indicator of system trust — signalling when teams were routing around the system rather than through it.",
                  ]}
                  decisionLabel="Decision"
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <AnnotatedFigure
                  figure={9}
                  label="System health survey"
                  imageSrc="/assets/work/seamkit/block-system-health-survey.png"
                  imageAlt="SeamKit system health survey — NPS 57, improvement priorities, team feedback"
                  caption="System health survey validating sustained reliance — NPS 57 with no detractors; improvement requests point to scale (variants, alignment), not abandonment."
                  hideDecisionNotes
                />
              </div>
            </div>

            <div style={{ maxWidth: 460, minWidth: 0 }}>
              <LayerChip label="Layer 04 — Adoption & system health" />
              <RhythmBlock label="Problem">
                Adoption is not a rollout event; it&apos;s sustained reliance. The system needed instrumentation that
                could detect drift and trust loss before it became fragmentation again.
              </RhythmBlock>
              <RhythmBlock label="Decision">
                Instrumentation plus an influence model — co-creation before mandates, with detach rate as a leading
                trust signal.
              </RhythmBlock>
              <RhythmBlock label="Intervention">
                Health tracked through Figma analytics (insertions, usage frequency, detach behavior) and sentiment
                signals — reinforcing adoption through co-creation and service-level responsiveness.
              </RhythmBlock>
            </div>
          </div>
        </section>
      </div>

      <section id="outcomes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          05 Outcomes
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What the system enabled
        </h2>
        <p
          style={{
            marginTop: 12,
            fontSize: 16,
            fontWeight: 600,
            color: "var(--fg-body)",
            lineHeight: 1.75,
            maxWidth: 720,
          }}
        >
          The operating model had become the default starting point for new product work.
        </p>
        <div style={{ marginTop: 24 }}>
          <OutcomeCards tiers={outcomeTiers} />
        </div>
      </section>

      <section
        id="unlocks"
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
