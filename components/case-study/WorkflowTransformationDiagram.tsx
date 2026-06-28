import * as React from "react";

export type WorkflowTransformationDiagramProps = {
  intro?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeSteps: string[];
  afterSteps: string[];
};

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

function FlowColumn({ label, steps }: { label: string; steps: string[] }) {
  const cellStyle: React.CSSProperties = {
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--fg)",
    background: "var(--surface)",
    textAlign: "center",
    lineHeight: 1.35,
  };

  return (
    <div style={{ minWidth: 0 }}>
      <Micro>{label}</Micro>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", alignItems: "stretch", gap: 0 }}>
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div style={cellStyle}>{step}</div>
            {i < steps.length - 1 ? (
              <div
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "var(--fg-subtle)",
                  lineHeight: 1,
                  padding: "6px 0",
                }}
                aria-hidden
              >
                ↓
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function WorkflowTransformationDiagram({
  intro,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeSteps,
  afterSteps,
}: WorkflowTransformationDiagramProps) {
  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "48px auto 0",
        padding: "48px 32px",
        background: "var(--surface-subtle)",
        borderRadius: 12,
        border: "1px solid var(--border-subtle)",
      }}
      className="workflow-transformation-diagram"
    >
      {intro ? (
        <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 720, margin: "0 0 28px" }}>
          {intro}
        </p>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 40,
          alignItems: "start",
        }}
        className="case-study-transformation-strip"
      >
        <FlowColumn label={beforeLabel} steps={beforeSteps} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color: "var(--fg-muted)",
            paddingTop: 36,
            fontWeight: 600,
          }}
          aria-hidden
        >
          →
        </div>
        <FlowColumn label={afterLabel} steps={afterSteps} />
      </div>
      <style>{`
        @media (max-width: 768px) {
          .workflow-transformation-diagram .case-study-transformation-strip {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .workflow-transformation-diagram .case-study-transformation-strip > div:nth-child(2) {
            padding-top: 0 !important;
            transform: rotate(90deg);
          }
        }
      `}</style>
    </section>
  );
}
