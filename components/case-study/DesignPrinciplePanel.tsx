import * as React from "react";

export type DesignPrinciplePanelProps = {
  principle: string;
  label?: string;
};

export default function DesignPrinciplePanel({
  principle,
  label = "Design Principle",
}: DesignPrinciplePanelProps) {
  return (
    <section
      id="principle"
      style={{
        marginTop: 80,
        background: "var(--surface-subtle)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ maxWidth: 760 }}>
          <p
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--fg-subtle)",
              margin: 0,
            }}
          >
            {label}
          </p>
          <blockquote
            style={{
              margin: "24px 0 0",
              padding: 0,
              border: "none",
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 700,
              lineHeight: 1.45,
              letterSpacing: "-0.02em",
              color: "var(--fg)",
            }}
          >
            {principle}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
