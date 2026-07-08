import * as React from "react";
import AnnotatedFigure from "@/components/case-study/AnnotatedFigure";

export type EvidenceClaimBlockProps = {
  index: number;
  heading: string;
  problem: string;
  imageSrc?: string;
  imageAlt: string;
  caption: string;
  outcome: string;
};

export default function EvidenceClaimBlock({
  index,
  heading,
  problem,
  imageSrc,
  imageAlt,
  caption,
  outcome,
}: EvidenceClaimBlockProps) {
  return (
    <article style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--fg)",
          margin: "0 0 16px",
        }}
      >
        {heading}
      </h3>

      <p style={{ fontSize: 16, color: "var(--fg-body)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: 760 }}>
        {problem}
      </p>

      <AnnotatedFigure
        figure={index}
        label={imageAlt}
        caption={caption}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        hideDecisionNotes
        reviewable
      />

      <p
        style={{
          marginTop: 16,
          fontSize: 15,
          color: "var(--fg-muted)",
          lineHeight: 1.7,
          maxWidth: 760,
          fontStyle: "italic",
        }}
      >
        {outcome}
      </p>
    </article>
  );
}
