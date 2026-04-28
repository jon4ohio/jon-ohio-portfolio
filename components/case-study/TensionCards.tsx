import * as React from "react";

export interface TensionCard {
  number: string; // "01"
  title: string;
  body: string;
}

export default function TensionCards({
  label,
  heading,
  subhead,
  cards,
}: {
  label: string;
  heading: string;
  subhead: string;
  cards: TensionCard[];
}) {
  return (
    <section id="tensions" style={{ maxWidth: 1240, margin: "0 auto", padding: "48px 24px 0" }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--fg-subtle)" }}>
        {label}
      </p>
      <h2 style={{ marginTop: 14, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--fg)" }}>
        {heading}
      </h2>
      <p style={{ marginTop: 8, fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: 680 }}>
        {subhead}
      </p>

      <div className="case-study-tension-grid" style={{ display: "flex", gap: 16, marginTop: 28 }}>
        {cards.map((c) => (
          <div
            key={c.number}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "28px 24px",
              background: "var(--surface)",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: "color-mix(in oklab, var(--border), var(--fg) 10%)",
                lineHeight: 1,
              }}
            >
              {c.number}
            </div>
            <div style={{ marginTop: 12, fontSize: 15, fontWeight: 600, color: "var(--fg)" }}>{c.title}</div>
            <p style={{ marginTop: 8, fontSize: 14, color: "var(--fg-body)", lineHeight: 1.7 }}>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

