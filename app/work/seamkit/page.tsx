import type { Metadata } from "next";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import StickyChapterNav, { type Chapter } from "@/components/case-study/StickyChapterNav";
import FlagshipOpener from "@/components/case-study/FlagshipOpener";
import PhaseTimeline from "@/components/case-study/PhaseTimeline";
import { type Phase } from "@/components/case-study/PhaseTimeline";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";
import OutcomeCards, { type OutcomeTier } from "@/components/case-study/OutcomeCards";
import UnlockPanel from "@/components/case-study/UnlockPanel";
import PrevNextNav from "@/components/case-study/PrevNextNav";
import { getProject, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Seamkit — John Ohio",
  description:
    "Built fragmented UI libraries into a governed enterprise design system — scaling consistency across 12 product teams through token architecture, governance, and shared system adoption.",
  alternates: { canonical: "/work/seamkit" },
};

const chapters: Chapter[] = [
  { id: "brief", label: "01 Brief" },
  { id: "tensions", label: "02 Tensions" },
  { id: "evidence", label: "03 Evidence" },
  { id: "outcomes", label: "04 Outcomes" },
  { id: "unlocks", label: "05 Foundations" },
];

const layers: Phase[] = [
  {
    id: "layer-1",
    number: "Layer 1",
    name: "Foundations",
    description: "Primitive → semantic → component tokens",
  },
  {
    id: "layer-2",
    number: "Layer 2",
    name: "Components",
    description: "Shared primitives, patterns, and reusable building blocks",
  },
  {
    id: "layer-3",
    number: "Layer 3",
    name: "Governance",
    description: "Lifecycle + contribution + review cadences",
  },
  {
    id: "layer-4",
    number: "Layer 4",
    name: "Adoption",
    description: "Instrumentation, trust, usage, and evolution under load",
  },
];

const outcomeTiers: OutcomeTier[] = [
  {
    category: "Delivery Impact",
    items: [
      "30% faster feature delivery",
      "40% fewer frontend bugs",
      "85% reduction in visual inconsistency across the product suite",
      "30% faster onboarding for new contributors",
    ],
  },
  {
    category: "Design Health",
    items: [
      "2.49M  — Token insertions (2025)",
      "443K   — Component insertions",
      "88.9   — Adoption score (sustained usage, not bursts)",
      "91.1   — Trust score (system trust across teams)",
      "80%    — Designers and engineers report daily reliance",
      "12     — Product teams aligned on a shared baseline",
    ],
  },
];

function PlaceholderFigureFrame({ label }: { label: string }) {
  return (
    <div
      aria-label={label}
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        border: "1px dashed var(--border-subtle, #e5e5e5)",
        borderRadius: 8,
        background: "var(--surface-subtle, #f9f9f9)",
        display: "grid",
        placeItems: "center",
        color: "var(--fg-subtle)",
        fontSize: 13,
      }}
    >
      Visual incoming (replace with real artifact)
    </div>
  );
}

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
        microLabel="SeamlessHR · Dec 2023 – Present"
        title={project.title}
        subtitle={project.subtitle}
        thesis="Unifying fragmented UI systems into a governed enterprise design system."
        abstract=""
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

      <section id="tensions" style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          02 Core Tensions
        </p>
        <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
          What had to change
        </h2>
        <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
          Three systemic failures that made a governed baseline unavoidable.
        </p>

        <p style={{ marginTop: 18, fontSize: 15, color: "var(--fg-body)", lineHeight: 1.7, maxWidth: 780 }}>
          Before SeamKit, three separate libraries operated with no shared logic. Delivery slowed to 14 days per feature —
          half of it spent fixing UI inconsistencies. 62% of engineers identified style churn as the primary blocker, and
          70% of screens failed to reflect the new brand identity.
          <br />
          <br />
          The problem wasn't a shortage of components. It was that design decisions had no structure that could travel
          across teams.
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
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: "color-mix(in oklab, var(--border), var(--fg) 10%)",
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

      <div style={{ maxWidth: 1240, margin: "32px auto 0", padding: "0 24px" }}>
        <AnnotatedFigure
          figure="B"
          label="Before State — Fragmented system"
          imageAlt="Before SeamKit — fragmented libraries and duplicated UI patterns across the product suite"
          caption="Before a governed baseline, each product team maintained its own library and rules — duplication, drift, and rework compounded with every platform-wide change."
          decisionNotes={[
            "01 — Duplicate UI patterns: the same problem solved differently across products, multiplying maintenance effort",
            "02 — No single source of truth: platform-wide updates required coordination per team, per library",
            "03 — Governance gap: prior shared-library attempts diverged and were abandoned without lifecycle rules",
          ]}
          imageSrc="/assets/work/seamkit/block-hypothesis.png"
        />
      </div>

      <section id="evidence" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
          03 Evidence in practice
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
                Layer 1 — Foundations
              </div>

              <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                The shortcut was shipping components. The right call was establishing the token layer first — so that
                brand updates, spacing shifts, and semantic meaning could propagate without per-component rewrites.
              </p>
              <p style={{ marginTop: 16, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                Token architecture is a governance problem before it is a naming problem. When tokens don't carry shared
                meaning, contributors fill the gaps with judgment calls. Those decisions compound — creating interpretive
                debt that documentation alone cannot fix.
              </p>

              <div style={{ marginTop: 18 }}>
                <Micro>Intervention</Micro>
                <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                  A three-tier token architecture: primitive values → semantic tokens → component tokens, consumed
                  through Figma token sync and engineering integration.
                </p>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <PlaceholderFigureFrame label="Figure 01 placeholder — Token hierarchy diagram" />
              <div style={{ marginTop: 16 }}>
                <span
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--fg-subtle)",
                  }}
                >
                  Figure 01
                </span>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--fg-muted)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Three-tier token hierarchy: Core (primitive values) → Decision (intent + constraint + mapping) →
                  Component (CAVIS-governed attributes). 581 primitives · 488 component tokens · 349 colour tokens.
                </p>

                <div style={{ marginTop: 16 }}>
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--fg-subtle)",
                    }}
                  >
                    Decision notes
                  </span>
                  <ul
                    style={{
                      marginTop: 10,
                      paddingLeft: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[
                      "Token architecture preceded components, trading early visible output for long-term scalability",
                      "Semantic tier separated meaning from raw values, reducing exception-driven drift",
                      "The Decision layer is the theming surface. Brand or compliance changes update one layer and propagate across every component that references it — core values stay stable, components stay untouched.",
                    ].map((note, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 14,
                          color: "var(--fg-body)",
                          lineHeight: 1.75,
                          paddingLeft: 16,
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "var(--fg-subtle)" }}>·</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <section id="layer-2" style={{ padding: "0 24px" }}>
          <div
            style={{ display: "flex", gap: 48, alignItems: "flex-start", maxWidth: 1240, margin: "0 auto" }}
            className="case-study-evidence-row case-study-evidence-row--text-right"
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <AnnotatedFigure
                figure={2}
                label="Token taxonomy (Token Studio)"
                imageSrc="/assets/work/seamkit/block-approach.png"
                imageAlt="SeamKit token taxonomy in Token Studio — 581 primitives, 488 component tokens, 349 colour tokens"
                caption="Token Studio variables panel: the taxonomy consumed by design and engineering across the platform."
                decisionNotes={[
                  "Component-level overrides were scoped explicitly, preventing semantic tokens from becoming exceptions",
                  "Foundations designed to support multiple product teams without needing bespoke variants per team",
                ]}
              />

              <div
                style={{
                  background: "var(--surface-subtle, #f9f9f9)",
                  border: "1px solid var(--border-subtle, #e5e5e5)",
                  borderRadius: 8,
                  padding: "24px 28px",
                  marginTop: 32,
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6b7280",
                    marginBottom: 12,
                  }}
                >
                  Token naming — CAVIS grammar
                </p>
                <code
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 20,
                    color: "#111",
                    fontFamily: "monospace",
                  }}
                >
                  button · background · primary · brand · hover
                </code>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
                      <th style={{ textAlign: "left", paddingBottom: 8, fontWeight: 600, color: "#374151" }}>
                        Segment
                      </th>
                      <th style={{ textAlign: "left", paddingBottom: 8, fontWeight: 600, color: "#374151" }}>
                        Dimension
                      </th>
                      <th style={{ textAlign: "left", paddingBottom: 8, fontWeight: 600, color: "#374151" }}>
                        Answers
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["button", "Context", "Which component?"],
                      ["background", "Attribute", "Which visual property?"],
                      ["primary", "Variant", "Which stylistic variant?"],
                      ["brand", "Intent", "What communicative purpose?"],
                      ["hover", "State", "In which interaction state?"],
                    ].map(([seg, dim, ans]) => (
                      <tr key={seg} style={{ borderBottom: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "8px 0", fontFamily: "monospace", fontSize: 13, color: "#111" }}>
                          {seg}
                        </td>
                        <td style={{ padding: "8px 0", color: "#6b7280" }}>{dim}</td>
                        <td style={{ padding: "8px 0", color: "#374151" }}>{ans}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: 13, color: "#6b7280", marginTop: 16, lineHeight: 1.6 }}>
                  One correct name per combination — removing discretion across teams.
                </p>
              </div>

              <p style={{ marginTop: 20, fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>
                The full token architecture framework — Decision Token model, Dual Naming Model, and governance
                architecture — is documented separately.{" "}
                <a
                  href="/assets/work/seamkit/scaling-design-systems-token-hierarchy-and-dual-naming-model.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#111", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  Scaling Design Systems: Token Hierarchy and Dual Naming Model →
                </a>
              </p>
            </div>

            <div style={{ maxWidth: 460, minWidth: 0 }}>
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
                Layer 2 — Components
              </div>

              <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                Shared components had to sit on stable foundations; otherwise they would accumulate edge-case overrides
                and become the same divergence problem at a different layer.
              </p>

              <div style={{ marginTop: 18 }}>
                <Micro>Intervention</Micro>
                <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                  Component foundations built on the token taxonomy and aligned patterns, enabling teams to ship
                  independently while staying visually and structurally consistent.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <section id="layer-3" style={{ padding: "0 24px" }}>
          <div
            style={{ display: "flex", gap: 48, alignItems: "flex-start", maxWidth: 1240, margin: "0 auto" }}
            className="case-study-evidence-row case-study-evidence-row--text-left"
          >
            <div style={{ maxWidth: 460, minWidth: 0 }}>
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
                Layer 3 — Governance
              </div>

              <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                A shared library without governance becomes a dumping ground. Trust drops, and teams route around the
                system the moment it slows delivery.
              </p>

              <div style={{ marginTop: 18 }}>
                <Micro>Intervention</Micro>
                <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                  A five-stage component lifecycle (proposal → draft → review → stable → deprecated) with clear cadences:
                  Token Council (bi-weekly), Component Review Board (monthly), Pattern Steering Group (quarterly).
                </p>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <PlaceholderFigureFrame label="Figure 03 placeholder — Governance contribution workflow" />
              <div style={{ marginTop: 16 }}>
                <span
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--fg-subtle)",
                  }}
                >
                  Figure 03
                </span>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--fg-muted)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  Contribution workflow: identify need → proposal → community review → draft → stable release. Cadences:
                  Token Council · Component Review Board · Pattern Steering Group.
                </p>

                <div style={{ marginTop: 16 }}>
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--fg-subtle)",
                    }}
                  >
                    Decision notes
                  </span>
                  <ul
                    style={{
                      marginTop: 10,
                      paddingLeft: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[
                      "Lifecycle stages created a shared definition of stability and deprecation (no silent drift)",
                      "Cadences made governance visible and predictable, increasing trust across teams",
                    ].map((note, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 14,
                          color: "var(--fg-body)",
                          lineHeight: 1.75,
                          paddingLeft: 16,
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "var(--fg-subtle)" }}>·</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ padding: "0 24px" }}>
          <div style={{ borderTop: "1px solid var(--border-subtle)", maxWidth: 1240, margin: "0 auto" }} />
        </div>

        <section id="layer-4" style={{ padding: "0 24px" }}>
          <div
            style={{ display: "flex", gap: 48, alignItems: "flex-start", maxWidth: 1240, margin: "0 auto" }}
            className="case-study-evidence-row case-study-evidence-row--text-right"
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <PlaceholderFigureFrame label="Figure 04 placeholder — System health report" />
              <div style={{ marginTop: 16 }}>
                <span
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--fg-subtle)",
                  }}
                >
                  Figure 04
                </span>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--fg-muted)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    marginTop: 4,
                  }}
                >
                  System health: adoption score 88.9/100 · trust score 91.1/100 · 80% daily usage · 70%+ teams using
                  Seamkit as new-work baseline.
                </p>

                <div style={{ marginTop: 16 }}>
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--fg-subtle)",
                    }}
                  >
                    Decision notes
                  </span>
                  <ul
                    style={{
                      marginTop: 10,
                      paddingLeft: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {[
                      "Adoption was designed as an influence model — audits + working sessions before governance hardening",
                      "Detach rate became a leading indicator of system trust — signalling when teams were routing around the system rather than through it.",
                    ].map((note, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 14,
                          color: "var(--fg-body)",
                          lineHeight: 1.75,
                          paddingLeft: 16,
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "var(--fg-subtle)" }}>·</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ maxWidth: 460, minWidth: 0 }}>
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
                Layer 4 — Adoption & system health
              </div>

              <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                Adoption is not a rollout event; it’s sustained reliance. The system needed instrumentation that could
                detect drift and trust loss before it became fragmentation again.
              </p>

              <div style={{ marginTop: 18 }}>
                <Micro>Intervention</Micro>
                <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
                  Health tracked through Figma analytics (insertions, usage frequency, detach behavior) and sentiment
                  signals — reinforcing adoption through co-creation and service-level responsiveness.
                </p>
              </div>
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
        <OutcomeCards tiers={outcomeTiers} />
        <p style={{ marginTop: 18, fontSize: 14, color: "var(--fg-body)", lineHeight: 1.7, maxWidth: 780 }}>
          Platform-wide updates — brand identity, accessibility compliance — now propagate through one layer.
          Coordination overhead dropped to exception handling.
        </p>
      </section>

      <UnlockPanel
        label="06 Foundations"
        items={[
          "A brand or compliance update now touches one layer and propagates across the suite — no per-team coordination as the default.",
          "Because the system is token-driven and extensible, it establishes groundwork for emerging AI interaction patterns as those patterns mature across the suite.",
          "The system absorbs change without structural rewrites — whether brand updates, accessibility requirements, or new interaction models as they mature across the suite.",
        ]}
      />

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}

