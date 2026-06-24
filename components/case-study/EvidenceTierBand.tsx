import * as React from "react";

export default function EvidenceTierBand({
  label,
  sublabel,
}: {
  label: string;
  sublabel?: string;
}) {
  return (
    <div style={{ padding: "0 24px", maxWidth: 1240, margin: "0 auto" }}>
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 32,
          marginBottom: 8,
        }}
      >
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
        {sublabel ? (
          <p style={{ marginTop: 8, fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 560 }}>
            {sublabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}
