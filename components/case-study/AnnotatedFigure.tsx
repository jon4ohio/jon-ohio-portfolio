import * as React from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import ArtifactPlaceholder from "@/components/case-study/ArtifactPlaceholder";
import EvidenceChrome, {
  mediaChromeToVariant,
  type EvidenceChromeSize,
  type EvidenceMediaChrome,
} from "@/components/case-study/EvidenceChrome";
import EvidenceGif from "@/components/case-study/evidence/EvidenceGif";
import { isGifSrc } from "@/components/case-study/evidence/gif-utils";
import EvidenceImage from "@/components/case-study/evidence/EvidenceImage";
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
  /** When set with embedSrc, applies FigJam lavender chrome wrapper; evidence/neutral for asset chrome */
  embedChrome?: EvidenceMediaChrome;
  chromeSize?: EvidenceChromeSize;
  /** Restart GIF play sequence when scrolled into view (hero / walkthrough) */
  restartGifOnVisible?: boolean;
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
  /**
   * When true, inline image opens the evidence review overlay on inspect.
   * Defaults to !imageOnly — evidence figures yes; hero/next-read no.
   */
  reviewable?: boolean;
  /** Caption and decision notes relative to the image frame — default below */
  captionPlacement?: "above" | "below";
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

function wrapEvidenceChromeFrame(
  children: React.ReactNode,
  embedChrome: EvidenceMediaChrome | undefined,
  chromeSize: EvidenceChromeSize,
) {
  if (embedChrome === "evidence" || embedChrome === "neutral") {
    return (
      <EvidenceChrome variant={mediaChromeToVariant(embedChrome)} size={chromeSize}>
        {children}
      </EvidenceChrome>
    );
  }
  return children;
}

function StaticImageFrame({
  imageSrc,
  imageAlt,
  label,
  caption,
  borderless,
  embedChrome,
  chromeSize,
  restartGifOnVisible,
  reviewable,
}: {
  imageSrc: string;
  imageAlt?: string;
  label: string;
  caption?: string;
  borderless: boolean;
  embedChrome?: EvidenceMediaChrome;
  chromeSize: EvidenceChromeSize;
  restartGifOnVisible: boolean;
  reviewable: boolean;
}) {
  const usesEvidenceChrome = embedChrome === "evidence" || embedChrome === "neutral";
  const innerBorderless = borderless || embedChrome === "figjam" || usesEvidenceChrome;

  if (reviewable) {
    return (
      <EvidenceImage
        src={imageSrc}
        alt={imageAlt ?? label}
        title={label}
        description={caption || undefined}
        borderless={borderless}
        embedChrome={embedChrome}
        chromeSize={chromeSize}
        restartGifOnVisible={restartGifOnVisible}
      />
    );
  }

  const gif = isGifSrc(imageSrc);
  const media = gif ? (
    <EvidenceGif
      src={imageSrc}
      alt={imageAlt ?? label}
      restartOnVisible={restartGifOnVisible}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: innerBorderless ? 0 : 8,
        border: innerBorderless ? "none" : "1px solid var(--border)",
      }}
    />
  ) : (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={imageSrc}
      alt={imageAlt ?? label}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: innerBorderless ? 0 : 8,
        border: innerBorderless ? "none" : "1px solid var(--border)",
      }}
    />
  );

  if (embedChrome === "figjam") {
    return <FigJamChrome>{media}</FigJamChrome>;
  }

  if (usesEvidenceChrome) {
    return wrapEvidenceChromeFrame(media, embedChrome, chromeSize);
  }

  return (
    <div style={{ borderRadius: borderless ? 0 : 8, overflow: "hidden" }}>
      {media}
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
  chromeSize = "evidence",
  restartGifOnVisible = true,
  fallbackImageSrc,
  fallbackImageAlt,
  embedBoardHref,
  decisionLabel = "Decision notes",
  hideDecisionNotes = false,
  imageOnly = false,
  borderless = false,
  reviewable: reviewableProp,
  captionPlacement = "below",
}: AnnotatedFigureProps) {
  const reviewable = reviewableProp ?? !imageOnly;
  const figureText = typeof figure === "number" ? String(figure).padStart(2, "0") : String(figure);
  const showImage = publicAssetExists(imageSrc);
  const showFallback = publicAssetExists(fallbackImageSrc);

  const mediaFrame = embedSrc ? (
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
                caption={caption}
                borderless={borderless}
                embedChrome={embedChrome}
                chromeSize={chromeSize}
                restartGifOnVisible={restartGifOnVisible}
                reviewable={false}
              />
            </noscript>
          ) : null}
        </>
      ) : showImage ? (
        <StaticImageFrame
          imageSrc={imageSrc!}
          imageAlt={imageAlt}
          label={label}
          caption={caption}
          borderless={borderless}
          embedChrome={embedChrome}
          chromeSize={chromeSize}
          restartGifOnVisible={restartGifOnVisible}
          reviewable={reviewable}
        />
      ) : (
        <ArtifactPlaceholder figure={figure} label={label} />
      );

  if (imageOnly) return mediaFrame;

  const annotation = (
    <div>
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

      {embedSrc && embedBoardHref ? (
        <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--fg-muted)" }}>
          <a
            href={embedBoardHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-muted)", textDecoration: "underline", textUnderlineOffset: 2 }}
          >
            Open full board in FigJam
          </a>
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
  );

  if (captionPlacement === "above") {
    return (
      <div>
        {annotation}
        <div style={{ marginTop: 16 }}>{mediaFrame}</div>
      </div>
    );
  }

  return (
    <div>
      {mediaFrame}
      <div style={{ marginTop: 16 }}>{annotation}</div>
    </div>
  );
}
