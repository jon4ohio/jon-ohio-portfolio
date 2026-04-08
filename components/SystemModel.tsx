const stages = [
  {
    title: "Fragmented",
    description: "Disconnected workflows, inconsistent interfaces, high support load",
  },
  {
    title: "Structured",
    description: "Clear flows, defined logic, predictable user experience",
  },
  {
    title: "Scalable",
    description: "Shared systems across teams, reusable patterns, consistent delivery",
  },
  {
    title: "Intelligent",
    description: "AI embedded into workflows to support decisions, not replace them",
  },
];

export default function SystemModel() {
  return (
    <section style={{ maxWidth: 1120, margin: "0 auto", padding: "120px 24px 0" }}>
      <h2
        style={{
          fontSize: "clamp(24px, 3vw, 36px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginBottom: 40,
          maxWidth: 640,
        }}
      >
        How systems evolve
      </h2>

      <div className="system-model-grid" style={{ alignItems: "start", gap: 24 }}>
        {stages.map((stage, index) => (
          <div key={stage.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{stage.title}</p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{stage.description}</p>
            {index < stages.length - 1 ? (
              <span aria-hidden="true" style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1 }}>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
