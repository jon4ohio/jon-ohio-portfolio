import type { ReactNode } from "react";
import { geometryFor, type ShaderAssetSize } from "@/components/case-study/shaderAssetGeometry";

export type EvidenceChromeVariant = "lavender" | "neutral";
export type EvidenceMediaChrome = "figjam" | "evidence" | "neutral";
export type EvidenceChromeSize = ShaderAssetSize;

export function mediaChromeToVariant(chrome: Exclude<EvidenceMediaChrome, "figjam">): EvidenceChromeVariant {
  switch (chrome) {
    case "evidence":
      return "lavender";
    case "neutral":
      return "neutral";
    default: {
      const _exhaustive: never = chrome;
      return _exhaustive;
    }
  }
}

export type EvidenceChromeProps = {
  children: ReactNode;
  variant?: EvidenceChromeVariant;
  size?: EvidenceChromeSize;
};

function backgroundFor(variant: EvidenceChromeVariant): string {
  switch (variant) {
    case "lavender":
      return "var(--asset-chrome-gradient)";
    case "neutral":
      return "var(--jop-fill-neutral-gradient)";
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

/**
 * Figma shader asset container — clip box + gradient Header frame + media bleed.
 * No padded inset ring; media uses negative bottom margin per snapshot geometry (29737:53463).
 */
export default function EvidenceChrome({
  children,
  variant = "lavender",
  size = "evidence",
}: EvidenceChromeProps) {
  const geo = geometryFor(size);

  return (
    <div
      data-shader-asset=""
      data-preview-chrome={size === "card" ? "" : undefined}
      style={{
        overflow: "hidden",
        aspectRatio: geo.clipAspect,
        borderRadius: geo.clipRadius,
        width: "100%",
      }}
    >
      <div
        style={{
          height: `${geo.shaderHeightPercent}%`,
          background: backgroundFor(variant),
          border: "1px solid var(--border)",
          borderRadius: geo.shaderRadius,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: `${geo.mediaWidthPercent}%`,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: `${geo.mediaTopPercent}%`,
            marginBottom: `${geo.mediaMarginBottomPercent}%`,
            borderRadius: geo.mediaRadius,
            overflow: "hidden",
            lineHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
