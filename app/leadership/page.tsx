import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & DesignOps",
  description:
    "Scaling design as a system, not a service. DesignOps at SeamlessHR: 12 teams aligned, 88.9 adoption, 91.1 trust, 2.49M token insertions. Governance, contribution, onboarding, capability, AI-UX layer.",
  alternates: { canonical: "/leadership" },
  openGraph: {
    title: "Leadership & DesignOps — John Ohio",
    description:
      "Scaling design as a system, not a service. 12 teams · 8 designers · 88.9 adoption · 91.1 trust · 2.49M token insertions.",
    url: "/leadership",
    type: "article",
  },
};

const stats = [
  { value: "12", label: "Product teams aligned" },
  { value: "8", label: "Designers led" },
  { value: "88.9", label: "Adoption score /100" },
  { value: "91.1", label: "Trust score /100" },
  { value: "↓30%", label: "Onboarding time" },
  { value: "↓50%", label: "Token misuse" },
  { value: "~80%", label: "Daily usage" },
  { value: "2.49M", label: "Token insertions" },
];

const philosophy = [
  "Design is infrastructure, not a service.",
  "Systems compound. One-offs decay.",
  "Operationalise decisions before they become bottlenecks.",
  "Onboarding is the fastest path to system literacy.",
];

const layers = [
  {
    label: "01",
    title: "System Operationalization",
    body: "Turning the design system from a library into operating infrastructure — token architecture, governance model, contribution pipeline, and release cadence.",
  },
  {
    label: "02",
    title: "Contribution System (SOP)",
    body: "A defined contribution pipeline: proposal → critique → spec → review → release. Anyone in product or engineering can contribute, with clear gates instead of bottlenecks.",
  },
  {
    label: "03",
    title: "Design Onboarding System",
    body: "System-first onboarding (not tool-first). New designers learn the tokens, components, and patterns before tools — and contribute back into the system early as part of their ramp.",
  },
  {
    label: "04",
    title: "Governance",
    body: "Token hierarchy, naming conventions, deprecation policy, accessibility baseline, and version contracts between design and engineering. Decisions are documented, not personality-driven.",
  },
  {
    label: "05",
    title: "Team Capability",
    body: "Capability maps, role-gap frameworks, structured PIPs, critique rituals, and performance frameworks. Raising the floor across the whole design function — not just the top.",
  },
  {
    label: "06",
    title: "Cross-functional Alignment",
    body: "Bridging design and engineering through shared standards, design-to-dev rituals, and system contracts. Reduced rework and handoff friction across 12 teams.",
  },
  {
    label: "07",
    title: "AI Layer",
    body: "Defining how AI interactions show up inside enterprise workflows as reusable patterns: trust, explainability, prompt frameworks, and shared interaction models — not one-off features.",
  },
];

const onboardingSteps = [
  { step: "01", title: "System-first orientation", desc: "Tokens, components, and patterns before tools." },
  { step: "02", title: "Guided contribution", desc: "First contribution into the system within the first weeks." },
  { step: "03", title: "Standards alignment", desc: "Critique, accessibility, and governance baked in early." },
  { step: "04", title: "Capability mapping", desc: "Role-gap framework defines next 90 days." },
];

const currentFocus = [
  {
    label: "AI-Integrated Product Systems",
    desc: "Defining AI-UX patterns, prompt frameworks, and interaction models adopted across SeamlessHR's product suite.",
  },
  {
    label: "Product-Led Growth",
    desc: "Driving PLG transformation — shifting from sales-led to product-led. Enhancing adoption, onboarding, and self-service capability.",
  },
  {
    label: "Enterprise Design Leadership",
    desc: "Leading DesignOps across 8 designers. Strategy, governance, capability development, and cross-functional alignment.",
  },
];

export default function Leadership() {
  return (
    <div style={{ paddingTop: 56 }}>

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 64px" }}>
        <p className="section-label" style={{ marginBottom: 24 }}>
          Leadership & DesignOps
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            maxWidth: 800,
            marginBottom: 28,
          }}
        >
          Scaling design as a system, not a service.
        </h1>
        <p style={{ fontSize: 19, color: "var(--fg-body-muted)", maxWidth: 680, lineHeight: 1.65 }}>
          Led DesignOps and system adoption across 12 product teams at SeamlessHR — operationalising design as infrastructure: how decisions are made, how knowledge compounds, and how teams stay coherent as the organisation scales.
        </p>
      </section>

      {/* ── 2. STATS BAR ────────────────────────────────────── */}
      <section
        aria-label="Leadership & DesignOps impact metrics"
        style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px" }}
      >
        <div
          className="stats-grid stats-grid--4"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="stats-cell"
              style={{ background: "var(--bg)" }}
            >
              <p style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 4 }}>
                {s.value}
              </p>
              <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. PHILOSOPHY ───────────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          Philosophy
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            maxWidth: 640,
            marginBottom: 40,
          }}
        >
          What I believe about design at scale.
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
          {philosophy.map((p, i) => (
            <li
              key={i}
              style={{
                fontSize: "clamp(20px, 2.4vw, 28px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                padding: "24px 0",
                borderTop: "1px solid var(--border)",
                borderBottom: i === philosophy.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--fg-subtle)", marginRight: 16, fontWeight: 400 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 4. THE DESIGNOPS STACK ──────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          The DesignOps Stack
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: 720,
            marginBottom: 56,
          }}
        >
          Seven layers that hold the system together.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {layers.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "32px 0",
                borderTop: "1px solid var(--border)",
                borderBottom: i === layers.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "start",
              }}
              className="grid-systems-group grid-systems-group--narrow"
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--fg-subtle)",
                  letterSpacing: "0.06em",
                  paddingTop: 6,
                }}
              >
                {s.label}
              </p>
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 16, color: "var(--fg-body-muted)", lineHeight: 1.7, maxWidth: 720 }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. ONBOARDING DETAIL ────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          Design Onboarding System
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            maxWidth: 640,
            marginBottom: 40,
          }}
        >
          System-first, not tool-first.
        </h2>
        <div
          className="stats-grid stats-grid--4"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {onboardingSteps.map((s) => (
            <div
              key={s.step}
              className="stats-cell"
              style={{ background: "var(--bg)", padding: "32px 28px" }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--fg-subtle)",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                }}
              >
                {s.step}
              </p>
              <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>
                {s.title}
              </p>
              <p style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. CURRENT FOCUS ────────────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px" }}>
        <p className="section-label" style={{ marginBottom: 16 }}>
          Current Focus · SeamlessHR · Jan 2025 – Present
        </p>
        <h2
          style={{
            fontSize: "clamp(24px, 3vw, 36px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            maxWidth: 640,
            marginBottom: 40,
          }}
        >
          Where my work lives now.
        </h2>
        <div className="grid-3 leadership-focus-grid" style={{ gap: 16 }}>
          {currentFocus.map((f, i) => (
            <div
              key={i}
              style={{
                padding: "28px",
                border: "1px solid var(--border)",
                borderRadius: 12,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 12 }}>{f.label}</h3>
              <p style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. RELATED CASE STUDIES ─────────────────────────── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 120px" }}>
        <div
          className="grid-2 pad-inset emphasis-block"
          style={{
            background: "var(--surface-emphasis)",
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--fg-on-emphasis-soft)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Related Case Study
            </p>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fg-on-emphasis)",
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              Seamkit — the operating system underneath.
            </h3>
            <p style={{ fontSize: 15, color: "var(--fg-on-emphasis-muted)", lineHeight: 1.7, marginBottom: 24 }}>
              The token architecture, governance model, and adoption programme that DesignOps is built on.
            </p>
            <Link
              href="/work/seamkit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--fg-on-emphasis)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border-on-emphasis-subtle)",
                paddingBottom: 2,
              }}
            >
              Read the case study →
            </Link>
          </div>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--fg-on-emphasis-soft)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              AI Layer
            </p>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fg-on-emphasis)",
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              SeamlessAI — patterns, not features.
            </h3>
            <p style={{ fontSize: 15, color: "var(--fg-on-emphasis-muted)", lineHeight: 1.7, marginBottom: 24 }}>
              Reusable AI interaction patterns built into enterprise workflows as a system layer — not one-off integrations.
            </p>
            <Link
              href="/work/seamless-ai"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--fg-on-emphasis)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border-on-emphasis-subtle)",
                paddingBottom: 2,
              }}
            >
              Read the case study →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
