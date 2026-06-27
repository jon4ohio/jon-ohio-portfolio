"use client";

import { useCallback, useRef, useState } from "react";
import EvidenceChrome, {
  mediaChromeToVariant,
  type EvidenceChromeSize,
  type EvidenceMediaChrome,
} from "@/components/case-study/EvidenceChrome";
import EvidenceGif from "@/components/case-study/evidence/EvidenceGif";
import { isGifSrc } from "@/components/case-study/evidence/gif-utils";
import EvidenceReviewOverlay from "@/components/case-study/evidence/EvidenceReviewOverlay";

export type { EvidenceMediaChrome } from "@/components/case-study/EvidenceChrome";

export type EvidenceImageProps = {
  src: string;
  alt: string;
  title: string;
  description?: string;
  context?: string;
  disabled?: boolean;
  /** Extension point — no-op v1; future preload, hi-res, analytics, gallery nav */
  priority?: boolean;
  borderless?: boolean;
  embedChrome?: EvidenceMediaChrome;
  chromeSize?: EvidenceChromeSize;
  /** Restart GIF play sequence when scrolled into view */
  restartGifOnVisible?: boolean;
  /** Inline (default) or absolute fill for layered embed placeholders */
  layout?: "inline" | "fill";
  objectFit?: "cover" | "contain";
  /** When fill layout: hide from AT while a live embed is active above */
  ariaHidden?: boolean;
  imageStyle?: React.CSSProperties;
  frameStyle?: React.CSSProperties;
};

function wrapFigJam(children: React.ReactNode) {
  return (
    <div
      style={{
        background: "var(--figjam-embed-bg)",
        border: "1px solid var(--figjam-embed-border)",
        borderRadius: 8,
        padding: 24,
      }}
    >
      <div style={{ borderRadius: 6, overflow: "hidden", background: "#ffffff" }}>{children}</div>
    </div>
  );
}

function wrapEvidenceChrome(
  children: React.ReactNode,
  embedChrome: Exclude<EvidenceMediaChrome, "figjam">,
  size: EvidenceChromeSize,
) {
  return (
    <EvidenceChrome variant={mediaChromeToVariant(embedChrome)} size={size}>
      {children}
    </EvidenceChrome>
  );
}

export default function EvidenceImage({
  src,
  alt,
  title,
  description,
  context,
  disabled = false,
  priority: _priority,
  borderless = false,
  embedChrome,
  chromeSize = "evidence",
  restartGifOnVisible = true,
  layout = "inline",
  objectFit = "cover",
  ariaHidden = false,
  imageStyle,
  frameStyle,
}: EvidenceImageProps) {
  void _priority;

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const gif = isGifSrc(src);
  const usesEvidenceChrome = embedChrome === "evidence" || embedChrome === "neutral";
  const innerBorderless = borderless || embedChrome === "figjam" || usesEvidenceChrome;

  const openReview = useCallback(() => {
    if (disabled) return;
    setOpen(true);
  }, [disabled]);

  const closeReview = useCallback(() => {
    setOpen(false);
  }, []);

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openReview();
    }
  };

  const inlineImgStyle: React.CSSProperties =
    layout === "fill"
      ? {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit,
          display: "block",
          ...imageStyle,
        }
      : {
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: innerBorderless ? 0 : 8,
          border: innerBorderless ? "none" : "1px solid var(--border)",
          ...imageStyle,
        };

  const triggerStyle: React.CSSProperties =
    layout === "fill"
      ? {
          position: "absolute",
          inset: 0,
          cursor: disabled ? "default" : "pointer",
          ...frameStyle,
        }
      : {
          position: "relative",
          borderRadius: innerBorderless ? 0 : 8,
          overflow: usesEvidenceChrome ? "visible" : "hidden",
          cursor: disabled ? "default" : "pointer",
          ...frameStyle,
        };

  const media = gif ? (
    <EvidenceGif
      src={src}
      alt={alt}
      restartOnVisible={restartGifOnVisible}
      style={inlineImgStyle}
    />
  ) : (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} style={inlineImgStyle} />
  );

  const trigger = (
    <div
      ref={triggerRef}
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      aria-label={disabled ? undefined : `Inspect evidence: ${title}`}
      aria-hidden={ariaHidden || undefined}
      className={disabled ? undefined : "evidence-image-trigger"}
      onClick={disabled ? undefined : openReview}
      onKeyDown={onTriggerKeyDown}
      style={triggerStyle}
    >
      {media}
      {disabled ? null : (
        <span className="evidence-image-affordance" aria-hidden="true">
          ↗ Inspect
        </span>
      )}
    </div>
  );

  let framed = trigger;
  if (embedChrome === "figjam") {
    framed = wrapFigJam(trigger);
  } else if (embedChrome === "evidence" || embedChrome === "neutral") {
    framed = wrapEvidenceChrome(trigger, embedChrome, chromeSize);
  }

  return (
    <>
      {framed}
      <EvidenceReviewOverlay
        open={open}
        onClose={closeReview}
        title={title}
        description={description}
        context={context}
        returnFocusRef={triggerRef}
      >
        {gif ? (
          <EvidenceGif
            src={src}
            alt={alt}
            restartOnVisible={false}
            style={{
              display: "block",
              maxWidth: "min(92vw, 1600px)",
              maxHeight: "88vh",
              width: "auto",
              height: "auto",
            }}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt}
            style={{
              display: "block",
              maxWidth: "min(92vw, 1600px)",
              maxHeight: "88vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        )}
      </EvidenceReviewOverlay>
    </>
  );
}
