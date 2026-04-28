import * as React from "react";
import AnnotatedFigure, { type AnnotatedFigureProps } from "@/components/case-study/AnnotatedFigure";

export interface EvidenceModuleProps {
  id: string; // "phase-I"
  phase: string; // "Phase I — Stabilize"
  challenge: string;
  intervention: string;
  figure: Omit<AnnotatedFigureProps, "imageOnly">;
  layout: "text-left" | "text-right";
  accent?: boolean;
  pullQuote?: string;
}

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

export default function EvidenceModule({
  id,
  phase,
  challenge,
  intervention,
  figure,
  layout,
  accent = false,
  pullQuote,
}: EvidenceModuleProps) {
  const text = (
    <div style={{ maxWidth: accent ? 560 : 460, minWidth: 0 }}>
      <div
        style={{
          display: "inline-block",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "4px 12px",
          fontSize: 12,
          color: "var(--fg-muted)",
          marginBottom: 16,
          background: "var(--surface)",
        }}
      >
        {phase}
      </div>

      <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
        {challenge}
      </p>

      <div style={{ marginTop: 18 }}>
        <Micro>Intervention</Micro>
        <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
          {intervention}
        </p>
      </div>

      {pullQuote ? (
        <blockquote
          style={{
            fontSize: 22,
            fontWeight: 600,
            fontStyle: "italic",
            color: "var(--fg)",
            borderLeft: "3px solid var(--fg)",
            paddingLeft: 24,
            margin: "40px 0",
            maxWidth: 600,
          }}
        >
          {pullQuote}
        </blockquote>
      ) : null}
    </div>
  );

  const fig = (
    <div style={{ flex: 1, minWidth: 0 }}>
      <AnnotatedFigure {...figure} />
    </div>
  );

  const inner =
    layout === "text-left" ? (
      <div
        style={{ display: "flex", gap: 48, alignItems: "flex-start" }}
        className="case-study-evidence-row case-study-evidence-row--text-left"
      >
        {text}
        {fig}
      </div>
    ) : (
      <div
        style={{ display: "flex", gap: 48, alignItems: "flex-start" }}
        className="case-study-evidence-row case-study-evidence-row--text-right"
      >
        {fig}
        {text}
      </div>
    );

  return (
    <section
      id={id}
      style={{
        padding: accent ? "64px 24px" : "0 24px",
        background: accent ? "var(--surface-subtle)" : "transparent",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>{inner}</div>
    </section>
  );
}

