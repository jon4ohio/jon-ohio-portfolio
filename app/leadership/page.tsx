import Link from "next/link";

export const metadata = {
  title: "Leadership — John Ohio",
  description: "DesignOps, system operationalisation, and scaling design across 12 product teams.",
};

const focusAreas = [
  {
    title: "System Operationalisation",
    body: "Token architecture, reusable component systems, governance model, contribution and release pipelines. Seamkit is a system — not a library. It has opinions, a lifecycle, and an adoption model.",
  },
  {
    title: "Cross-functional Alignment",
    body: "Bridged design and engineering through shared standards, design-to-dev rituals, and system contracts. Reduced rework and handoff friction across 12 teams by creating a shared language both disciplines could commit to.",
  },
  {
    title: "Team Capability Development",
    body: "Structured PIPs, capability maps, and role-gap frameworks across 8 designers. Built onboarding pipelines, critique rituals, and performance frameworks to raise the floor across the design function.",
  },
  {
    title: "Acting DesignOps Lead",
    body: "Stepped up following dual leadership departure. Maintained output, morale, and system coherence — then formalised the expanded scope as Lead, DesignOps & AI-UX.",
  },
];

const currentFocus = [
  {
    label: "AI-Integrated Product Systems",
    desc: "Defining AI-UX patterns, prompt frameworks, and interaction models adopted across SeamlesTech's product suite.",
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

const systemStats = [
  { value: "12", label: "Product teams" },
  { value: "8", label: "Designers" },
  { value: "88.9", label: "Adoption score" },
  { value: "91.1", label: "Trust score" },
  { value: "↓30%", label: "Onboarding time" },
  { value: "↓50%", label: "Token misuse" },
  { value: "~80%", label: "Daily usage" },
  { value: "2.49M", label: "Token insertions" },
];

export default function Leadership() {
  return (
    <div style={{ paddingTop: 56 }}>

      {/* Hero */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 64px" }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
          Leadership & DesignOps
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 640, marginBottom: 24 }}>
          Scaling design as a function.
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 560, lineHeight: 1.6 }}>
          Led DesignOps and system adoption across 12 product teams at SeamlessHR — transforming design from execution into an operational system.
        </p>
      </section>

      {/* Stats bar */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          {systemStats.slice(0, 4).map((s, i) => (
            <div
              key={i}
              style={{
                padding: "28px 24px",
                borderRight: i < 3 ? "1px solid #e5e7eb" : "none",
                background: "#f9fafb",
              }}
            >
              <p style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
          {systemStats.slice(4).map((s, i) => (
            <div
              key={i}
              style={{
                padding: "28px 24px",
                borderRight: i < 3 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <p style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Focus areas */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 64px" }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 40 }}>
          How I Lead
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {focusAreas.map((f, i) => (
            <div
              key={i}
              style={{
                padding: "36px",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 14 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seamkit highlight */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 64px" }}>
        <div
          style={{
            background: "#0a0a0a",
            borderRadius: 16,
            padding: "56px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>
              Case Study — Organisational Scale
            </p>
            <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
              Seamkit
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 28 }}>
              A token-driven design system built from scratch: a 3-layer token hierarchy (Core → Semantic → Component), a CAVIS naming model, a reusable component library, governance, and a contribution pipeline. Twelve product teams unified under a single system.
            </p>
            <Link
              href="/work/seamkit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.3)",
                paddingBottom: 2,
              }}
            >
              Read the case study →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              ["3-layer token hierarchy", "Core → Semantic → Component"],
              ["CAVIS naming model", "Shared design-engineering language"],
              ["Contribution pipeline", "Governance and release process"],
              ["Adoption programme", "Onboarding, critique, performance frameworks"],
            ].map(([title, desc], i) => (
              <div
                key={i}
                style={{
                  padding: "18px 0",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  borderBottom: i === 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{title}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current focus */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 80px" }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 40 }}>
          Current Focus · SeamlessHR / SeamlesTech · Jan 2025 – Present
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {currentFocus.map((f, i) => (
            <div
              key={i}
              style={{
                padding: "28px",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 12 }}>{f.label}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
