import * as React from "react";
import PhaseTimeline, { type Phase } from "@/components/case-study/PhaseTimeline";

export type FlagshipSpineProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  subhead?: string;
  phases: Phase[];
};

export default function FlagshipSpine({ id = "phases", eyebrow, heading, subhead, phases }: FlagshipSpineProps) {
  return (
    <section id={id} style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px 0" }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
        {eyebrow}
      </p>
      <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
        {heading}
      </h2>
      {subhead ? (
        <p style={{ marginTop: 10, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 760 }}>
          {subhead}
        </p>
      ) : null}
      <div style={{ marginTop: 28 }}>
        <PhaseTimeline phases={phases} />
      </div>
    </section>
  );
}

