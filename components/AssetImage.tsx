import Image from "next/image";
import type { ImageAsset } from "@/lib/projects";

type Props = {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  style?: React.CSSProperties;
  treatment?: "plain" | "device";
};

export default function AssetImage({ asset, sizes, priority, style, treatment = "plain" }: Props) {
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
            background: "rgba(255,255,255,0.65)",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ef4444" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#f59e0b" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#22c55e" }} />
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

