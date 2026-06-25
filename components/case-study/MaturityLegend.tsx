import * as React from "react";

export type MaturityState = "Live" | "In Development" | "UAT" | "Roadmap";

const STATE_STYLES: Record<MaturityState, React.CSSProperties> = {
  Live: { background: "color-mix(in oklab, var(--fg), transparent 88%)" },
  "In Development": { background: "color-mix(in oklab, var(--accent-orange), transparent 82%)" },
  UAT: { background: "color-mix(in oklab, var(--border), var(--fg) 8%)" },
  Roadmap: { background: "var(--surface-subtle)" },
};

function MaturityTag({ state }: { state: MaturityState }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid var(--border)",
        color: "var(--fg-muted)",
        whiteSpace: "nowrap",
        ...STATE_STYLES[state],
      }}
    >
      {state}
    </span>
  );
}

export default function MaturityLegend({
  streams,
}: {
  streams: Array<{ name: string; state: MaturityState }>;
}) {
  const legendStates: MaturityState[] = ["Live", "In Development", "UAT", "Roadmap"];

  return (
    <div
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "24px 22px",
          background: "var(--surface)",
        }}
      >
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--fg-subtle)",
            marginBottom: 16,
          }}
        >
          Delivery maturity
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          {legendStates.map((state) => (
            <div key={state} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MaturityTag state={state} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {streams.map((stream) => (
            <div
              key={stream.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
                paddingBottom: 12,
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--fg)" }}>{stream.name}</span>
              <MaturityTag state={stream.state} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MaturityTag };
