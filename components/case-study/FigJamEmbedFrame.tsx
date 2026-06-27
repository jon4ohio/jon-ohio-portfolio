"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FigJamChrome from "@/components/case-study/FigJamChrome";

const MIN_PLACEHOLDER_MS = 500;
const FADE_MS = 200;

export type FigJamEmbedFrameProps = {
  embedSrc: string;
  embedTitle?: string;
  label: string;
  fallbackImageSrc?: string;
  fallbackImageAlt?: string;
};

export default function FigJamEmbedFrame({
  embedSrc,
  embedTitle,
  label,
  fallbackImageSrc,
  fallbackImageAlt,
}: FigJamEmbedFrameProps) {
  const mountTimeRef = useRef(0);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [embedReady, setEmbedReady] = useState(false);

  const scheduleReveal = useCallback(() => {
    const mountTime = mountTimeRef.current || Date.now();
    const elapsed = Date.now() - mountTime;
    const delay = Math.max(0, MIN_PLACEHOLDER_MS - elapsed);

    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
    }

    revealTimerRef.current = setTimeout(() => {
      setEmbedReady(true);
    }, delay);
  }, []);

  useEffect(() => {
    mountTimeRef.current = Date.now();
    const fallbackReveal = setTimeout(() => {
      scheduleReveal();
    }, 4000);
    return () => {
      clearTimeout(fallbackReveal);
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
      }
    };
  }, [scheduleReveal]);

  const showPlaceholder = Boolean(fallbackImageSrc) && !embedReady;

  const stageStyle = {
    position: "relative" as const,
    width: "100%",
    aspectRatio: "16 / 9",
    background: "#ffffff",
  };

  const layerTransition = `opacity ${FADE_MS}ms ease`;

  return (
    <FigJamChrome>
      <div style={stageStyle}>
        {fallbackImageSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={fallbackImageSrc}
            alt={fallbackImageAlt ?? label}
            aria-hidden={embedReady}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
              opacity: showPlaceholder ? 1 : 0,
              transition: layerTransition,
              pointerEvents: "none",
            }}
          />
        ) : null}
        <iframe
          src={embedSrc}
          title={embedTitle ?? label}
          allowFullScreen
          onLoad={scheduleReveal}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
            display: "block",
            opacity: embedReady ? 1 : 0,
            pointerEvents: embedReady ? "auto" : "none",
            transition: layerTransition,
          }}
        />
      </div>
    </FigJamChrome>
  );
}
