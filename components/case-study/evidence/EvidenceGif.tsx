"use client";

import { useEffect, useRef, useState } from "react";
import { stripGifQuery } from "@/components/case-study/evidence/gif-utils";

export type EvidenceGifProps = {
  src: string;
  alt: string;
  restartOnVisible?: boolean;
  style?: React.CSSProperties;
};

export default function EvidenceGif({
  src,
  alt,
  restartOnVisible = true,
  style,
}: EvidenceGifProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSrc, setActiveSrc] = useState(src);
  const baseSrc = stripGifQuery(src);

  useEffect(() => {
    setActiveSrc(src);
  }, [src]);

  useEffect(() => {
    if (!restartOnVisible) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSrc(`${baseSrc}?v=${Date.now()}`);
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [baseSrc, restartOnVisible]);

  return (
    <div ref={containerRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activeSrc}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          border: "none",
          borderRadius: 0,
          ...style,
        }}
      />
    </div>
  );
}
