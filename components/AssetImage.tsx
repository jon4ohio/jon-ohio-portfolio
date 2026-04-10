import Image from "next/image";
import type { ImageAsset } from "@/lib/projects";

type Props = {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  style?: React.CSSProperties;
  treatment?: "plain" | "device";
  /**
   * Uniform thumbnail: image fills this aspect box with object-fit: cover (plain treatment only).
   * Example: "16 / 9"
   */
  aspectCover?: string;
};

export default function AssetImage({ asset, sizes, priority, style, treatment = "plain", aspectCover }: Props) {
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
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: aspectCover,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--border)",
          ...style,
        }}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
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
        style={{ width: "100%", height: "auto", display: "block", borderRadius: 16, border: "1px solid var(--border)" }}
      />
    </div>
  );
}

