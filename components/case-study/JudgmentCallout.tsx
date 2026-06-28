import * as React from "react";

export type JudgmentKind = "Judgment" | "Trade-off" | "Leadership";

export type JudgmentCalloutProps = {
  kind: JudgmentKind;
  children: React.ReactNode;
  emphasis?: "standard" | "quiet";
};

export default function JudgmentCallout({ kind, children, emphasis = "standard" }: JudgmentCalloutProps) {
  return (
    <div
      style={{
        marginTop: emphasis === "quiet" ? 16 : 20,
        marginBottom: emphasis === "quiet" ? 0 : 4,
        padding: emphasis === "quiet" ? "14px 16px" : "16px 20px",
        borderLeft: "3px solid var(--accent-orange)",
        background: "var(--surface)",
        borderRadius: 6,
        maxWidth: 720,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--fg-subtle)",
          display: "block",
          marginBottom: 6,
        }}
      >
        {kind}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: emphasis === "quiet" ? 14 : 15,
          lineHeight: 1.7,
          color: "var(--fg-body)",
        }}
      >
        {children}
      </p>
    </div>
  );
}
