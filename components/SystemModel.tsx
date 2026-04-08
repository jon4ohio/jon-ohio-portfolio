const stages = [
  {
    title: "Fragmented →",
    description: "Disconnected workflows, inconsistent interfaces, and high support load.",
  },
  {
    title: "Structured →",
    description: "Clear flows, defined logic, and a predictable user experience.",
  },
  {
    title: "Scalable →",
    description: "Shared systems across teams, reusable patterns, and consistent delivery.",
  },
  {
    title: "Intelligent",
    description: "AI embedded into workflows — supporting decisions, improving outcomes, and reducing manual effort.",
  },
] as const;

export default function SystemModel() {
  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}>
      <h2
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: 12,
          maxWidth: 640,
        }}
      >
        How systems evolve
      </h2>
      <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, maxWidth: 860, marginBottom: 32 }}>
        Most products don&apos;t fail at the interface level — they fail at the system level. This is how systems evolve.
      </p>

      <div className="system-model-grid" style={{ alignItems: "start", gap: 30 }}>
        {stages.map((stage) => (
          <div key={stage.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p
              style={{
                minHeight: 28,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {stage.title}
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5, maxWidth: 240 }}>{stage.description}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginTop: 24 }}>
        These systems exist across different stages — here&apos;s what I&apos;ve built.
      </p>
    </section>
  );
}
