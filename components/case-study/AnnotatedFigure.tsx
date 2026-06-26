import * as React from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import ArtifactPlaceholder from "@/components/case-study/ArtifactPlaceholder";
import FigJamChrome from "@/components/case-study/FigJamChrome";
import FigJamEmbedFrame from "@/components/case-study/FigJamEmbedFrame";

export interface AnnotatedFigureProps {
  figure: number | string; // 0 allowed for hero/next-read image-only mode
  label: string;
  caption: string;
  decisionNotes?: string[];
  imageSrc?: string;
  imageAlt?: string;
  embedSrc?: string;
  embedTitle?: string;
  /** When set with embedSrc, applies FigJam lavender chrome wrapper */
  embedChrome?: "figjam";
  fallbackImageSrc?: string;
  fallbackImageAlt?: string;
  /** Optional link to open the live board in a new tab */
  embedBoardHref?: string;
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

function publicAssetExists(assetSrc: string | undefined): boolean {
  if (!assetSrc) return false;
  try {
    const rel = assetSrc.startsWith("/") ? assetSrc.slice(1) : assetSrc;
    return existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

function EmbedFrame({
  embedSrc,
  embedTitle,
  label,
}: {
  embedSrc: string;
  embedTitle?: string;
  label: string;
}) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
        <iframe
          src={embedSrc}
          title={embedTitle ?? label}
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

function StaticImageFrame({
  imageSrc,
  imageAlt,
  label,
  borderless,
  embedChrome,
}: {
  imageSrc: string;
  imageAlt?: string;
  label: string;
  borderless: boolean;
  embedChrome?: "figjam";
}) {
  const image = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={imageSrc}
      alt={imageAlt ?? label}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: embedChrome === "figjam" ? 0 : borderless ? 0 : 8,
        border: embedChrome === "figjam" || borderless ? "none" : "1px solid var(--border)",
      }}
    />
  );

  if (embedChrome === "figjam") {
    return <FigJamChrome>{image}</FigJamChrome>;
  }

  return (
    <div style={{ borderRadius: borderless ? 0 : 8, overflow: "hidden" }}>
      {image}
    </div>
  );
}

export default function AnnotatedFigure({
  figure,
  label,
  caption,
  decisionNotes = [],
  imageSrc,
  imageAlt,
  embedSrc,
  embedTitle,
  embedChrome,
  fallbackImageSrc,
  fallbackImageAlt,
  embedBoardHref,
  decisionLabel = "Decision notes",
  hideDecisionNotes = false,
  imageOnly = false,
  borderless = false,
}: AnnotatedFigureProps) {
  const figureText = typeof figure === "number" ? String(figure).padStart(2, "0") : String(figure);
  const showImage = publicAssetExists(imageSrc);
  const showFallback = publicAssetExists(fallbackImageSrc);

  const frame = embedSrc ? (
        <>
          {embedChrome === "figjam" ? (
            <FigJamEmbedFrame
              embedSrc={embedSrc}
              embedTitle={embedTitle}
              label={label}
              fallbackImageSrc={showFallback ? fallbackImageSrc : undefined}
              fallbackImageAlt={fallbackImageAlt}
            />
          ) : (
            <EmbedFrame embedSrc={embedSrc} embedTitle={embedTitle} label={label} />
          )}
          {showFallback ? (
            <noscript>
              <StaticImageFrame
                imageSrc={fallbackImageSrc!}
                imageAlt={fallbackImageAlt}
                label={label}
                borderless={borderless}
                embedChrome={embedChrome}
              />
            </noscript>
          ) : null}
        </>
      ) : showImage ? (
        <StaticImageFrame
          imageSrc={imageSrc!}
          imageAlt={imageAlt}
          label={label}
          borderless={borderless}
          embedChrome={embedChrome}
        />
      ) : (
        <ArtifactPlaceholder figure={figure} label={label} />
      );

  if (imageOnly) return frame;

  return (
    <div>
      {frame}
      <div style={{ marginTop: 16 }}>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
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
          {caption ? (
            <>
              {" — "}
              <span style={{ color: "var(--fg-muted)", fontStyle: "italic" }}>{caption}</span>
            </>
          ) : null}
        </p>

        {embedSrc && (showFallback || embedBoardHref) ? (
          <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--fg-muted)" }}>
            {showFallback ? (
              <>
                <a
                  href={fallbackImageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--fg-muted)", textDecoration: "underline", textUnderlineOffset: 2 }}
                >
                  View static snapshot
                </a>
                {embedBoardHref ? " · " : null}
              </>
            ) : null}
            {embedBoardHref ? (
              <a
                href={embedBoardHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--fg-muted)", textDecoration: "underline", textUnderlineOffset: 2 }}
              >
                Open full board in FigJam
              </a>
            ) : null}
          </p>
        ) : null}

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
