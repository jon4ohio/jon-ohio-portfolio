"use client";

import EvidenceChrome, {
  mediaChromeToVariant,
  type EvidenceChromeSize,
  type EvidenceMediaChrome,
} from "@/components/case-study/EvidenceChrome";
import EvidenceGif from "@/components/case-study/evidence/EvidenceGif";
import { isGifSrc } from "@/components/case-study/evidence/gif-utils";
import MediaViewTrigger from "@/components/case-study/evidence/MediaViewTrigger";
import { overlayMediaStyle } from "@/components/case-study/evidence/overlay-media-styles";

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

function OverlayMedia({ src, alt, gif }: { src: string; alt: string; gif: boolean }) {
  if (gif) {
    return <EvidenceGif src={src} alt={alt} restartOnVisible={false} style={overlayMediaStyle} />;
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} style={overlayMediaStyle} />
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

  const gif = isGifSrc(src);
  const usesEvidenceChrome = embedChrome === "evidence" || embedChrome === "neutral";
  const innerBorderless = borderless || embedChrome === "figjam" || usesEvidenceChrome;

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
          width: usesEvidenceChrome || embedChrome === "figjam" ? "100%" : undefined,
          borderRadius: usesEvidenceChrome || embedChrome === "figjam" ? 0 : innerBorderless ? 0 : 8,
          overflow: usesEvidenceChrome || embedChrome === "figjam" ? "visible" : "hidden",
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

  let content: React.ReactNode = media;
  if (embedChrome === "figjam") {
    content = wrapFigJam(media);
  } else if (embedChrome === "evidence" || embedChrome === "neutral") {
    content = wrapEvidenceChrome(media, embedChrome, chromeSize);
  }

  return (
    <MediaViewTrigger
      title={title}
      description={description}
      context={context}
      disabled={disabled}
      ariaHidden={ariaHidden}
      affordanceVariant={usesEvidenceChrome ? "chrome" : "default"}
      triggerStyle={triggerStyle}
      overlayChildren={<OverlayMedia src={src} alt={alt} gif={gif} />}
    >
      {content}
    </MediaViewTrigger>
  );
}
