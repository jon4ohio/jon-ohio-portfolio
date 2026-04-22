const stages = [
  {
    title: "Fragmented",
    description: "Disconnected workflows, UI/UX inconsistent, high support load.",
    titleWeight: 500,
    titleOpacity: 0.72,
  },
  {
    title: "Structured",
    description: "Clear flows, defined logic, predictable system behavior.",
    titleWeight: 500,
    titleOpacity: 0.9,
  },
  {
    title: "Scalable",
    description: "Reusable patterns across teams, consistent delivery.",
    titleWeight: 600,
    titleOpacity: 0.96,
  },
  {
    title: "Intelligent",
    description: "Systems that assist decisions and reduce manual effort.",
    titleWeight: 700,
    titleOpacity: 1,
  },
] as const;

export default function SystemModel() {
  return (
    <div className="system-model-grid" style={{ alignItems: "start", gap: 28 }}>
      {stages.map((stage, index) => {
        const stageNumber = String(index + 1).padStart(2, "0");
        return (
          <div key={stage.title} style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
            <p
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                minHeight: 28,
                fontSize: 18,
                fontWeight: stage.titleWeight,
                letterSpacing: "-0.01em",
                opacity: stage.titleOpacity,
              }}
            >
              <span style={{ fontSize: 12, color: "var(--fg-subtle)", fontWeight: 500, letterSpacing: "0.04em" }}>
                {stageNumber}
              </span>
              <span style={{ minWidth: 0 }}>{stage.title}</span>
              {index < stages.length - 1 ? (
                <span
                  className="system-model-arrow"
                  aria-hidden="true"
                  style={{ color: "var(--fg-muted)", fontWeight: 500, marginLeft: 2 }}
                >
                  →
                </span>
              ) : null}
            </p>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.5, maxWidth: 240 }}>
              {stage.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
