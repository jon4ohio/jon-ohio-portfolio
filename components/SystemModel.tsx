const stages = [
  {
    title: "Fragmented",
    description: "Disconnected workflows, inconsistent interfaces, and high support load.",
    titleWeight: 500,
    titleOpacity: 0.72,
  },
  {
    title: "Structured",
    description: "Clear flows, defined logic, and a predictable user experience.",
    titleWeight: 500,
    titleOpacity: 0.9,
  },
  {
    title: "Scalable",
    description: "Shared systems across teams, reusable patterns, and consistent delivery.",
    titleWeight: 600,
    titleOpacity: 0.96,
  },
  {
    title: "Intelligent",
    description: "AI embedded into workflows — supporting decisions, improving outcomes, and reducing manual effort.",
    titleWeight: 700,
    titleOpacity: 1,
  },
] as const;

export default function SystemModel() {
  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 32px" }}>
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
        Most products don&apos;t fail at the interface level — they fail at the system level. This is how I design systems to evolve.
      </p>

      <div className="system-model-grid" style={{ alignItems: "start", gap: 28 }}>
        {stages.map((stage, index) => (
          <div key={stage.title} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                minHeight: 28,
                fontSize: 18,
                fontWeight: stage.titleWeight,
                letterSpacing: "-0.01em",
                opacity: stage.titleOpacity,
              }}
            >
              <span>{stage.title}</span>
              {index < stages.length - 1 ? (
                <span aria-hidden="true" style={{ color: "#6b7280", fontWeight: 500, marginLeft: 2 }}>
                  →
                </span>
              ) : null}
            </p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5, maxWidth: 240 }}>{stage.description}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginTop: 24 }}>
        I&apos;ve designed systems across each stage of this evolution — here are the systems I&apos;ve built.
      </p>
    </section>
  );
}
