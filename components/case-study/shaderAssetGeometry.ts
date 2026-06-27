export type ShaderAssetSize = "hero" | "evidence" | "neutral" | "card";

/** Layout ratios from Figma frame 29737:53418 (snapshot Container + Header + media). */
export type ShaderGeometry = {
  clipAspect: string;
  clipRadius: string;
  shaderRadius: string;
  /** Shader frame height relative to clip box (Header extends below Container). */
  shaderHeightPercent: number;
  mediaWidthPercent: number;
  /** Media offset from top of clip box. */
  mediaTopPercent: number;
  mediaRadius: string;
  /** Negative margin pulls media into bottom clip — matches Figma bleed. */
  mediaMarginBottomPercent: number;
};

export function geometryFor(size: ShaderAssetSize): ShaderGeometry {
  switch (size) {
    case "card":
    case "hero":
      return {
        clipAspect: "1192 / 671",
        clipRadius: "clamp(4px, 0.67%, 8px)",
        shaderRadius: "clamp(8px, 2%, 24px)",
        shaderHeightPercent: (720 / 671) * 100,
        mediaWidthPercent: (1034 / 1192) * 100,
        mediaTopPercent: (65 / 671) * 100,
        mediaRadius: "clamp(4px, 1%, 12px)",
        mediaMarginBottomPercent: -(12 / 671) * 100,
      };
    case "evidence":
      return {
        clipAspect: "960 / 544",
        clipRadius: "clamp(4px, 0.83%, 8px)",
        shaderRadius: "clamp(6px, 2.1%, 20px)",
        shaderHeightPercent: (580 / 544) * 100,
        mediaWidthPercent: (833 / 960) * 100,
        mediaTopPercent: (46 / 544) * 100,
        mediaRadius: "clamp(4px, 1%, 10px)",
        mediaMarginBottomPercent: -(36 / 544) * 100,
      };
    case "neutral":
      return {
        clipAspect: "960 / 468",
        clipRadius: "20px",
        shaderRadius: "20px",
        shaderHeightPercent: 100,
        mediaWidthPercent: 100,
        mediaTopPercent: 0,
        mediaRadius: "10px",
        mediaMarginBottomPercent: 0,
      };
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}
