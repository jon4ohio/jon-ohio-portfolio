import * as React from "react";
import AnnotatedFigure, { type AnnotatedFigureProps } from "@/components/case-study/AnnotatedFigure";

export type EvidenceLayoutVariant = "default" | "problem-first" | "image-first" | "compact" | "climax";

export interface EvidenceModuleProps {
  id: string;
  phase: string;
  challenge: string;
  intervention: string;
  figure: Omit<AnnotatedFigureProps, "imageOnly">;
  layout: "text-left" | "text-right";
  layoutVariant?: EvidenceLayoutVariant;
  accent?: boolean;
  pullQuote?: string;
  intro?: string;
  judgment?: React.ReactNode;
  challengeLabel?: string;
  interventionLabel?: string;
  reasoning?: string;
  reasoningLabel?: string;
  outcome?: string;
  outcomeLabel?: string;
  evidenceLabel?: string;
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

function PhaseChip({ phase }: { phase: string }) {
  return (
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
  );
}

function QuietCaption({ caption }: { caption: string }) {
  if (!caption.trim()) return null;
  return (
    <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.5, color: "var(--fg-muted)", fontStyle: "italic" }}>
      {caption}
    </p>
  );
}

function FigureBlock({
  figure,
  quietCaption = true,
}: {
  figure: Omit<AnnotatedFigureProps, "imageOnly">;
  quietCaption?: boolean;
}) {
  return (
    <div style={{ marginTop: 24 }}>
      <AnnotatedFigure {...figure} decisionNotes={[]} hideDecisionNotes imageOnly />
      {quietCaption ? <QuietCaption caption={figure.caption} /> : null}
    </div>
  );
}

export default function EvidenceModule({
  id,
  phase,
  challenge,
  intervention,
  figure,
  layout,
  layoutVariant = "default",
  accent = false,
  pullQuote,
  intro,
  judgment,
  challengeLabel = "Problem",
  interventionLabel = "Design move",
  reasoning,
  reasoningLabel = "Reasoning",
  outcome,
  outcomeLabel = "Outcome",
  evidenceLabel = "Evidence",
  decisionLayout = "default",
  decisionHeadline,
}: EvidenceModuleProps) {
  const isFlagshipDecision = Boolean(reasoning) || decisionLayout === "scan";

  if (layoutVariant !== "default") {
    const sectionPad = layoutVariant === "climax" ? "80px 24px" : accent ? "48px 24px" : "0 24px";
    const maxW = layoutVariant === "climax" ? 960 : 840;

    return (
      <section
        id={id}
        style={{
          padding: sectionPad,
          background: layoutVariant === "climax" || accent ? "var(--surface-subtle)" : "transparent",
        }}
      >
        <div style={{ maxWidth: maxW, margin: "0 auto" }}>
          <PhaseChip phase={phase} />

          {layoutVariant === "climax" && intro ? (
            <p style={{ marginTop: 8, fontSize: 17, color: "var(--fg-body)", lineHeight: 1.75, maxWidth: 720 }}>{intro}</p>
          ) : null}

          {layoutVariant === "climax" ? judgment : null}

          {layoutVariant === "image-first" ? (
            <>
              <FigureBlock figure={figure} />
              <div style={{ marginTop: 24 }}>
                <Micro>{challengeLabel}</Micro>
                <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{challenge}</p>
              </div>
              {judgment}
              {outcome ? (
                <div style={{ marginTop: 20 }}>
                  <Micro>{outcomeLabel}</Micro>
                  <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, fontWeight: 500 }}>
                    {outcome}
                  </p>
                </div>
              ) : null}
            </>
          ) : null}

          {layoutVariant === "problem-first" ? (
            <>
              <Micro>{challengeLabel}</Micro>
              <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{challenge}</p>
              <div style={{ marginTop: 18 }}>
                <Micro>{interventionLabel}</Micro>
                <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{intervention}</p>
              </div>
              {judgment}
              {outcome ? (
                <div style={{ marginTop: 18 }}>
                  <Micro>{outcomeLabel}</Micro>
                  <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, fontWeight: 500 }}>
                    {outcome}
                  </p>
                </div>
              ) : null}
              <FigureBlock figure={figure} />
            </>
          ) : null}

          {layoutVariant === "climax" ? (
            <>
              <Micro>{challengeLabel}</Micro>
              <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{challenge}</p>
              <div style={{ marginTop: 18 }}>
                <Micro>{interventionLabel}</Micro>
                <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{intervention}</p>
              </div>
              <FigureBlock figure={figure} />
              {outcome ? (
                <div style={{ marginTop: 18 }}>
                  <Micro>{outcomeLabel}</Micro>
                  <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, fontWeight: 500 }}>
                    {outcome}
                  </p>
                </div>
              ) : null}
            </>
          ) : null}

          {layoutVariant === "compact" ? (
            <>
              <Micro>{challengeLabel}</Micro>
              <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75 }}>{challenge}</p>
              <FigureBlock figure={figure} />
              {outcome ? (
                <div style={{ marginTop: 18 }}>
                  <Micro>{outcomeLabel}</Micro>
                  <p style={{ marginTop: 10, fontSize: 16, color: "var(--fg-body)", lineHeight: 1.75, fontWeight: 500 }}>
                    {outcome}
                  </p>
                </div>
              ) : null}
            </>
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
                margin: "32px 0 0",
                maxWidth: 640,
              }}
            >
              {pullQuote}
            </blockquote>
          ) : null}
        </div>
      </section>
    );
  }

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
          <FigureBlock figure={figure} />
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
      <PhaseChip phase={phase} />

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
        <AnnotatedFigure {...figure} hideDecisionNotes />
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
