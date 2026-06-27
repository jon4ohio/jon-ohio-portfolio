import AssetImage from "@/components/AssetImage";
import PreviewChromeFrame from "@/components/PreviewChromeFrame";
import { getPrimaryPreviewImage, type ProjectAssets } from "@/lib/projects";

export type ProjectListingPreviewProps = {
  slug: string;
  title: string;
  assets?: ProjectAssets;
  sizes?: string;
};

export default function ProjectListingPreview({
  slug,
  title,
  assets,
  sizes = "(max-width: 640px) 92vw, (max-width: 900px) 356px, 427px",
}: ProjectListingPreviewProps) {
  const preview = getPrimaryPreviewImage(assets);
  if (!preview) return null;

  const alt = preview.src.includes("/assets/work/_placeholders/")
    ? `${title} — project preview`
    : preview.alt;

  const hasPreviewChrome = Boolean(assets?.previewChrome);
  const isFlatSnapshot = Boolean(assets?.previewFlat);
  const aspectCover = hasPreviewChrome || isFlatSnapshot
    ? `${preview.width} / ${preview.height}`
    : "16 / 9";
  const aspectFit = slug === "orchestrated-portfolio"
    ? "contain"
    : hasPreviewChrome || isFlatSnapshot
      ? "cover"
      : "auto";

  const image = (
    <AssetImage
      asset={{ ...preview, alt }}
      sizes={sizes}
      aspectCover={aspectCover}
      aspectFit={aspectFit}
      borderless={hasPreviewChrome || isFlatSnapshot}
      previewFlat={isFlatSnapshot}
    />
  );

  if (assets?.previewChrome) {
    return (
      <PreviewChromeFrame chrome={assets.previewChrome} size={assets.previewChromeSize ?? "card"}>
        {image}
      </PreviewChromeFrame>
    );
  }

  return image;
}
