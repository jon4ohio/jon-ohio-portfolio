"use client";

import AssetImage from "@/components/AssetImage";
import EvidenceGif from "@/components/case-study/evidence/EvidenceGif";
import { isGifSrc } from "@/components/case-study/evidence/gif-utils";
import MediaViewTrigger from "@/components/case-study/evidence/MediaViewTrigger";
import { overlayMediaStyle } from "@/components/case-study/evidence/overlay-media-styles";
import type { ImageAsset } from "@/lib/projects";

type AssetImageProps = React.ComponentProps<typeof AssetImage>;

export type ReviewableAssetImageProps = Omit<AssetImageProps, "asset"> & {
  asset: ImageAsset;
  reviewable?: boolean;
  title?: string;
  description?: string;
};

function OverlayMedia({
  src,
  alt,
  backdropColor,
}: {
  src: string;
  alt: string;
  backdropColor?: string;
}) {
  const gif = isGifSrc(src);
  const media = gif ? (
    <EvidenceGif src={src} alt={alt} restartOnVisible={false} style={overlayMediaStyle} />
  ) : (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} style={overlayMediaStyle} />
  );

  if (!backdropColor) {
    return media;
  }

  return (
    <div
      style={{
        background: backdropColor,
        borderRadius: 8,
        padding: 16,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {media}
    </div>
  );
}

export default function ReviewableAssetImage({
  asset,
  reviewable = true,
  title,
  description,
  treatment = "plain",
  borderless = false,
  ...assetImageProps
}: ReviewableAssetImageProps) {
  const overlayTitle = title ?? asset.alt;
  const overlayDescription = description ?? asset.caption;

  if (!reviewable) {
    return (
      <AssetImage
        asset={asset}
        treatment={treatment}
        borderless={borderless}
        {...assetImageProps}
      />
    );
  }

  return (
    <MediaViewTrigger
      title={overlayTitle}
      description={overlayDescription}
      triggerStyle={{
        position: "relative",
        display: "block",
        borderRadius: borderless ? 0 : 16,
        overflow: "hidden",
        cursor: "pointer",
      }}
      overlayChildren={
        <OverlayMedia src={asset.src} alt={asset.alt} backdropColor={asset.backdropColor} />
      }
    >
      <AssetImage
        asset={asset}
        treatment={treatment}
        borderless={borderless}
        {...assetImageProps}
      />
    </MediaViewTrigger>
  );
}
