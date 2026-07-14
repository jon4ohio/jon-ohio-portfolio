import * as React from "react";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";

export type EvidenceClaimBlockProps = {
  index: number;
  heading: string;
  problem: string;
  decision?: string;
  imageSrc?: string;
  imageAlt: string;
  caption: string;
  outcome: string;
  /** Omit the outer max-width/padding wrapper when rendered inside a rail body. */
  bare?: boolean;
};

function Micro({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--fg-subtle)",
        margin: "0 0 8px",
      }}
    >
      {children}
    </p>
  );
}

export default function EvidenceClaimBlock({
  index,
  heading,
  problem,
  decision,
  imageSrc,
  imageAlt,
  caption,
  outcome,
  bare = false,
}: EvidenceClaimBlockProps) {
  return (
    <article style={bare ? undefined : { maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--fg)",
          margin: "0 0 20px",
        }}
      >
        {heading}
      </h3>

      <div style={{ maxWidth: 760 }}>
        <Micro>Problem</Micro>
        <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.7, margin: "0 0 24px" }}>{problem}</p>
      </div>

      <AnnotatedFigure
        figure={index}
        label={imageAlt}
        caption={caption}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        hideDecisionNotes
        reviewable
      />

      <div style={{ maxWidth: 760, marginTop: 20 }}>
        {decision ? (
          <>
            <Micro>Decision</Micro>
            <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.7, margin: "0 0 20px" }}>{decision}</p>
          </>
        ) : null}
        <Micro>Outcome</Micro>
        <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{outcome}</p>
      </div>
    </article>
  );
}
