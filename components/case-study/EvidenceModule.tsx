import * as React from "react";
import AnnotatedFigure, { type AnnotatedFigureProps } from "@/components/case-study/AnnotatedFigure";

export interface EvidenceModuleProps {
  id: string; // "phase-I"
  phase: string; // "Phase I — Stabilize"
  challenge: string;
  intervention: string;
  figure: Omit<AnnotatedFigureProps, "imageOnly">;
  secondaryFigure?: AnnotatedFigureProps;
  layout: "text-left" | "text-right";
  accent?: boolean;
  pullQuote?: string;
  /** Flagship decision spine — Context / Decision / Reasoning / Evidence / Outcome */
  challengeLabel?: string;
  interventionLabel?: string;
  reasoning?: string;
  reasoningLabel?: string;
  outcome?: string;
  outcomeLabel?: string;
  evidenceLabel?: string;
  /** Stacked scan layout: headline → problem → decision → screenshot → outcome */
  decisionLayout?: "default" | "scan";
  decisionHeadline?: string;
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
  secondaryFigure,
  layout,
  accent = false,
  pullQuote,
  challengeLabel,
  interventionLabel = "Intervention",
  reasoning,
  reasoningLabel = "Reasoning",
  outcome,
  outcomeLabel = "Outcome",
  evidenceLabel = "Evidence",
  decisionLayout = "default",
  decisionHeadline,
}: EvidenceModuleProps) {
  const isFlagshipDecision = Boolean(reasoning) || decisionLayout === "scan";

  if (decisionLayout === "scan" && decisionHeadline) {
    return (
      <section
        id={id}
        style={{
          padding: accent ? "48px 24px" : "0 24px",
          background: accent ? "var(--surface-subtle)" : "transparent",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }} className="case-study-evidence-scan">
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--fg)",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {decisionHeadline}
          </h3>
          <p style={{ marginTop: 14, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{challenge}</p>
          <p style={{ marginTop: 12, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{intervention}</p>
          <div style={{ marginTop: 24 }}>
            <AnnotatedFigure {...figure} caption="" decisionNotes={[]} imageOnly />
          </div>
          {outcome ? (
            <p style={{ marginTop: 18, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, fontWeight: 500 }}>
              {outcome}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  const text = (
    <div style={{ maxWidth: accent ? 560 : 460, minWidth: 0 }}>
      <div
        style={{
          display: "inline-block",
          border: "1px solid var(--border)",
          borderRadius: 999,
          padding: "4px 12px",
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--fg)",
          letterSpacing: "0.01em",
          marginBottom: 16,
          background: "var(--surface)",
        }}
      >
        {phase}
      </div>

      {challengeLabel ? <Micro>{challengeLabel}</Micro> : null}
      <p style={{ marginTop: challengeLabel ? 10 : 0, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
        {challenge}
      </p>

      <div style={{ marginTop: 18 }}>
        <Micro>{interventionLabel}</Micro>
        <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>
          {intervention}
        </p>
      </div>

      {reasoning ? (
        <div style={{ marginTop: 18 }}>
          <Micro>{reasoningLabel}</Micro>
          <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{reasoning}</p>
        </div>
      ) : null}

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
      {isFlagshipDecision ? (
        <>
          <Micro>{evidenceLabel}</Micro>
          <div style={{ marginTop: 10 }}>
            <AnnotatedFigure {...figure} caption="" decisionNotes={[]} imageOnly />
          </div>
          {outcome ? (
            <div style={{ marginTop: 18 }}>
              <Micro>{outcomeLabel}</Micro>
              <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{outcome}</p>
            </div>
          ) : null}
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          <AnnotatedFigure {...figure} />
          {secondaryFigure ? (
            <AnnotatedFigure {...secondaryFigure} hideDecisionNotes={secondaryFigure.hideDecisionNotes ?? true} />
          ) : null}
        </div>
      )}
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
