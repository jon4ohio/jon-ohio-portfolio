import * as React from "react";

export type ArtifactPlaceholderProps = {
  figure: number;
  label: string;
};

export default function ArtifactPlaceholder({ figure, label }: ArtifactPlaceholderProps) {
  return (
    <div
      style={{
        border: "1px dashed var(--border-subtle)",
        borderRadius: 8,
        background: "var(--surface-subtle)",
        aspectRatio: "16 / 9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--fg-subtle)",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 13, color: "var(--fg-subtle)" }}>
        Figure {String(figure).padStart(2, "0")} — Replaceable Placeholder
      </span>
    </div>
  );
}

