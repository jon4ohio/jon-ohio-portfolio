"use client";

import ReviewableAssetImage from "@/components/case-study/ReviewableAssetImage";
import type { CaseStudyBlock } from "@/lib/projects";

export default function CaseStudyBlockRenderer({ block }: { block: CaseStudyBlock }) {
  if (block.kind === "callout") {
    return (
      <div style={{ border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", background: "var(--surface)" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 8 }}>{block.title}</p>
        <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7 }}>{block.body}</p>
      </div>
    );
  }

  if (block.kind === "image") {
    const sizes =
      block.layout === "wide" ? "(max-width: 900px) 92vw, 1240px" : "(max-width: 900px) 92vw, 720px";
    const wrap = block.image.backdropColor ? (
      <div
        style={{
          background: block.image.backdropColor,
          borderRadius: 16,
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <ReviewableAssetImage
          asset={block.image}
          sizes={sizes}
          treatment={block.treatment}
          borderless
        />
      </div>
    ) : (
      <ReviewableAssetImage
        asset={block.image}
        sizes={sizes}
        treatment={block.treatment}
      />
    );
    return (
      <div>
        {wrap}
        {block.image.caption ? (
          <p style={{ fontSize: 12, color: "var(--fg-subtle)", lineHeight: 1.6, marginTop: 10 }}>{block.image.caption}</p>
        ) : null}
      </div>
    );
  }

  const columns = block.columns ?? 2;
  const galleryWideSizes = "(max-width: 640px) 92vw, (max-width: 900px) 44vw, 520px";
  const galleryInlineSizes = "(max-width: 640px) 92vw, (max-width: 900px) 44vw, 340px";
  const isTwoCol = columns === 2;
  return (
    <div>
      <div
        className={isTwoCol ? "case-study-gallery case-study-gallery--cols-2" : undefined}
        style={
          isTwoCol
            ? undefined
            : {
                display: "grid",
                gridTemplateColumns: columns === 3 ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
                gap: 12,
              }
        }
      >
        {block.images.map((img, idx) => (
          <div key={`${img.src}-${idx}`}>
            {img.backdropColor ? (
              <div
                style={{
                  background: img.backdropColor,
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                }}
              >
                <ReviewableAssetImage
                  asset={img}
                  sizes={block.layout === "wide" ? galleryWideSizes : galleryInlineSizes}
                  treatment={block.treatment}
                  borderless
                />
              </div>
            ) : (
              <ReviewableAssetImage
                asset={img}
                sizes={block.layout === "wide" ? galleryWideSizes : galleryInlineSizes}
                treatment={block.treatment}
              />
            )}
            {img.caption ? <p className="case-study-gallery-caption">{img.caption}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
