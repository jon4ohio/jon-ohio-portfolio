import * as React from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import ArtifactPlaceholder from "@/components/case-study/ArtifactPlaceholder";

export interface AnnotatedFigureProps {
  figure: number | string; // 0 allowed for hero/next-read image-only mode
  label: string;
  caption: string;
  decisionNotes?: string[];
  imageSrc?: string;
  imageAlt?: string;
  /** Label above decision list — default "Decision notes" */
  decisionLabel?: string;
  /** When true, omit decision list even if notes are provided */
  hideDecisionNotes?: boolean;
  /**
   * When true, render only the image/placeholder with no caption/notes section.
   * Used for hero image and next-read thumbnail.
   */
  imageOnly?: boolean;
  /**
   * Omit the default border/radius framing around real images.
   * Useful when the parent container already provides framing.
   */
  borderless?: boolean;
}

export default function AnnotatedFigure({
  figure,
  label,
  caption,
  decisionNotes = [],
  imageSrc,
  imageAlt,
  decisionLabel = "Decision notes",
  hideDecisionNotes = false,
  imageOnly = false,
  borderless = false,
}: AnnotatedFigureProps) {
  const figureText = typeof figure === "number" ? String(figure).padStart(2, "0") : String(figure);
  const showImage = Boolean(imageSrc) && (() => {
    try {
      const rel = imageSrc!.startsWith("/") ? imageSrc!.slice(1) : imageSrc!;
      return existsSync(path.join(process.cwd(), "public", rel));
    } catch {
      return false;
    }
  })();

  const frame = showImage ? (
    <div style={{ borderRadius: borderless ? 0 : 8, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt ?? label}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: borderless ? 0 : 8,
          border: borderless ? "none" : "1px solid var(--border)",
        }}
      />
    </div>
  ) : (
    <ArtifactPlaceholder figure={figure} label={label} />
  );

  if (imageOnly) return frame;

  return (
    <div>
      {frame}
      <div style={{ marginTop: 16 }}>
        <span
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--fg-subtle)",
          }}
        >
          Figure {figureText}
        </span>
        <p
          style={{
            fontSize: 13,
            color: "var(--fg-muted)",
            lineHeight: 1.6,
            fontStyle: "italic",
            marginTop: 4,
          }}
        >
          {caption}
        </p>

        {decisionNotes.length > 0 && !hideDecisionNotes ? (
        <div style={{ marginTop: 16 }}>
          <span
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--fg-subtle)",
              fontWeight: decisionLabel === "Decision" ? 600 : 400,
            }}
          >
            {decisionLabel}
          </span>
          <ul
            style={{
              marginTop: 10,
              paddingLeft: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: decisionLabel === "Decision" ? 14 : 10,
            }}
          >
            {decisionNotes.map((note, i) => (
              <li
                key={i}
                style={{
                  fontSize: decisionLabel === "Decision" ? 15 : 14,
                  fontWeight: decisionLabel === "Decision" ? 500 : 400,
                  color: "var(--fg-body)",
                  lineHeight: 1.75,
                  paddingLeft: decisionLabel === "Decision" ? 0 : 16,
                  position: "relative",
                  borderLeft:
                    decisionLabel === "Decision" ? "2px solid var(--border)" : undefined,
                  padding:
                    decisionLabel === "Decision" ? "12px 16px" : undefined,
                  background:
                    decisionLabel === "Decision" ? "var(--surface)" : undefined,
                  borderRadius: decisionLabel === "Decision" ? 6 : undefined,
                }}
              >
                {decisionLabel !== "Decision" ? (
                  <span style={{ position: "absolute", left: 0, color: "var(--fg-subtle)" }}>·</span>
                ) : null}
                {note}
              </li>
            ))}
          </ul>
        </div>
        ) : null}
      </div>
    </div>
  );
}

