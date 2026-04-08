const stages = [
  {
    title: "Fragmented",
    description: "Disconnected workflows, inconsistent interfaces, and high support load.",
    titleColor: "#6b7280",
    titleWeight: 500,
  },
  {
    title: "Structured",
    description: "Clear flows, defined logic, and a predictable user experience.",
    titleColor: "#374151",
    titleWeight: 600,
  },
  {
    title: "Scalable",
    description: "Shared systems across teams, reusable patterns, and consistent delivery.",
    titleColor: "#1f2937",
    titleWeight: 600,
  },
  {
    title: "Intelligent",
    description: "AI embedded into workflows to support decisions, not replace them.",
    titleColor: "#0a0a0a",
    titleWeight: 700,
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

      <div className="system-model-grid" style={{ alignItems: "start", gap: 28 }}>
        {stages.map((stage, index) => (
          <div key={stage.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                minHeight: 28,
                fontSize: 18,
                fontWeight: stage.titleWeight,
                letterSpacing: "-0.01em",
                color: stage.titleColor,
              }}
            >
              <span>{stage.title}</span>
              {index < stages.length - 1 ? (
                <span aria-hidden="true" style={{ color: "#9ca3af", fontWeight: 500 }}>
                  →
                </span>
              ) : null}
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5, maxWidth: 240 }}>{stage.description}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginTop: 24 }}>
        These systems exist across different stages — here are the ones I&apos;ve built.
      </p>
    </section>
  );
}
