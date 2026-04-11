import Image from "next/image";
import type { ImageAsset } from "@/lib/projects";

/** Parse CSS aspect-ratio strings like "4 / 3" or "16 / 9" to width/height as a number. */
function parseAspectRatioString(value: string): number {
  const trimmed = value.trim();
  const slash = trimmed.indexOf("/");
  if (slash !== -1) {
    const w = Number.parseFloat(trimmed.slice(0, slash).trim());
    const h = Number.parseFloat(trimmed.slice(slash + 1).trim());
    if (w > 0 && h > 0) return w / h;
  }
  const n = Number.parseFloat(trimmed);
  if (n > 0) return n;
  return 4 / 3;
}

/**
 * Choose cover vs contain from intrinsic dimensions vs the box aspect ratio.
 * Similar ratios → cover (fills frame, minimal crop). Very different → contain (full image, letterboxing).
 */
function resolveAspectObjectFit(
  asset: ImageAsset,
  boxAspect: string,
  mode: "auto" | "cover" | "contain",
): "cover" | "contain" {
  if (mode === "cover") return "cover";
  if (mode === "contain") return "contain";
  const cr = parseAspectRatioString(boxAspect);
  const ir = asset.width / asset.height;
  if (!Number.isFinite(ir) || ir <= 0) return "cover";
  const delta = Math.abs(ir - cr) / cr;
  return delta <= 0.2 ? "cover" : "contain";
}

type Props = {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  style?: React.CSSProperties;
  treatment?: "plain" | "device";
  /** Omit frame border when a parent supplies backdrop + border (case-study gallery). */
  borderless?: boolean;
  /**
   * Fixed aspect box (layout stays consistent). Image uses object-fit per `aspectFit`.
   * Example: "16 / 9"
   */
  aspectCover?: string;
  /**
   * How the image sits in the aspect box. `auto` picks cover vs contain from asset vs box aspect ratio.
   */
  aspectFit?: "auto" | "cover" | "contain";
};

export default function AssetImage({
  asset,
  sizes,
  priority,
  style,
  treatment = "plain",
  aspectCover,
  aspectFit = "auto",
  borderless = false,
}: Props) {
  if (treatment === "device") {
    return (
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          background: "var(--surface)",
          ...style,
        }}
      >
        <div
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            borderBottom: "1px solid var(--border)",
            background: "var(--asset-chrome-bg)",
          }}
        >
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 999, background: "var(--accent-orange)" }} />
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 999, background: "var(--accent-blue)" }} />
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 999, background: "var(--accent-green)" }} />
          <span style={{ marginLeft: 8, fontSize: 12, color: "var(--fg-subtle)" }}>Preview</span>
        </div>
        <Image
          src={asset.src}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={sizes}
          priority={priority}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    );
  }

  if (aspectCover) {
    const objectFit = resolveAspectObjectFit(asset, aspectCover, aspectFit);
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: aspectCover,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          ...style,
        }}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit }}
        />
      </div>
    );
  }

  return (
    <div style={style}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: borderless ? 0 : 16,
          border: borderless ? "none" : "1px solid var(--border)",
        }}
      />
    </div>
  );
}

