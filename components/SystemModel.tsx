const stages = [
  {
    title: "Fragmented",
    description: "Disconnected flows, inconsistent patterns, manual workarounds",
    titleWeight: 500,
    titleOpacity: 0.72,
  },
  {
    title: "Structured",
    description: "Defined patterns, improved workflows, reduced friction",
    titleWeight: 500,
    titleOpacity: 0.9,
  },
  {
    title: "Scalable",
    description: "Systems, tokens, and components enabling cross-product consistency",
    titleWeight: 600,
    titleOpacity: 0.96,
  },
  {
    title: "Intelligent",
    description: "AI-assisted workflows, automation, and adaptive user experiences",
    titleWeight: 700,
    titleOpacity: 1,
  },
] as const;

/**
 * Maturity model grid only (no outer `<section>`), so it can be embedded inside homepage bands
 * without duplicating headings/padding.
 */
export default function SystemModel() {
  return (
    <div className="system-model-grid" style={{ alignItems: "start", columnGap: 32, rowGap: 0, paddingTop: 24 }}>
      {stages.map((stage, index) => {
        const stageNumber = String(index + 1).padStart(2, "0");
        return (
          <div key={stage.title} style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0, paddingBottom: 32 }}>
            <p
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                minHeight: 28,
                fontSize: 18,
                fontWeight: stage.titleWeight,
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ fontSize: 11, color: "var(--fg-subtle)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {stageNumber}
              </span>
              <span style={{ minWidth: 0, opacity: stage.titleOpacity }}>{stage.title}</span>
              {index < stages.length - 1 ? (
                <span
                  className="system-model-arrow"
                  aria-hidden="true"
                  style={{ color: "var(--fg-muted)", fontWeight: 500, marginLeft: 2, opacity: stage.titleOpacity }}
                >
                  →
                </span>
              ) : null}
            </p>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: 240 }}>{stage.description}</p>
          </div>
        );
      })}
    </div>
  );
}
