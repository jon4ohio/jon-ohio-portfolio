import * as React from "react";

export type RailSectionProps = {
  id?: string;
  /** Numbered micro label pinned in the rail, e.g. "02 Challenge". */
  eyebrow?: string;
  /** Section title pinned in the rail beneath the eyebrow. */
  title?: React.ReactNode;
  /** Accessible name when the section carries no visible title. */
  ariaLabel?: string;
  /** Full-bleed tinted band behind the section. */
  accent?: boolean;
  children: React.ReactNode;
};

/**
 * Numbered case-study section with a sticky title rail: the eyebrow + title
 * stay pinned on the left (below the header and chapter nav) while the body —
 * prose at reading measure, then full-column-width figures — scrolls past.
 * Collapses to a stacked layout under 900px via `.case-study-rail` rules.
 */
export default function RailSection({ id, eyebrow, title, ariaLabel, accent = false, children }: RailSectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      style={{
        padding: accent ? "64px 24px 0" : "96px 24px 0",
        background: accent ? "var(--surface-subtle)" : "transparent",
      }}
    >
      <div
        className="case-study-rail"
        style={{ maxWidth: 1240, margin: "0 auto", display: "flex", gap: 56, alignItems: "flex-start" }}
      >
        <div className="case-study-rail-title">
          {eyebrow ? (
            <p
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--fg-subtle)",
                margin: 0,
              }}
            >
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2
              style={{
                marginTop: eyebrow ? 14 : 0,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                color: "var(--fg)",
              }}
            >
              {title}
            </h2>
          ) : null}
        </div>
        <div className="case-study-rail-body" style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>
    </section>
  );
}
