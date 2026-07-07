"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FigJamChrome from "@/components/case-study/FigJamChrome";

const MIN_PLACEHOLDER_MS = 500;
const POST_LOAD_SETTLE_MS = 800;
const FADE_MS = 200;
const LOAD_FALLBACK_MS = 4000;

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
  const loadCompletedAtRef = useRef(0);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [embedKey, setEmbedKey] = useState(0);
  const [embedReady, setEmbedReady] = useState(false);

  const clearRevealTimer = useCallback(() => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }, []);

  const scheduleReveal = useCallback(() => {
    const loadCompletedAt = loadCompletedAtRef.current;
    if (loadCompletedAt === 0) {
      return;
    }

    const now = Date.now();
    const mountTime = mountTimeRef.current || now;
    const delay = Math.max(
      0,
      MIN_PLACEHOLDER_MS - (now - mountTime),
      POST_LOAD_SETTLE_MS - (now - loadCompletedAt),
    );

    clearRevealTimer();

    revealTimerRef.current = setTimeout(() => {
      setEmbedReady(true);
    }, delay);
  }, [clearRevealTimer]);

  const handleIframeLoad = useCallback(() => {
    loadCompletedAtRef.current = Date.now();
    scheduleReveal();
  }, [scheduleReveal]);

  useEffect(() => {
    mountTimeRef.current = Date.now();
    loadCompletedAtRef.current = 0;
    /* eslint-disable react-hooks/set-state-in-effect -- reset embed readiness when the embed key changes (external system: iframe load + timers) */
    setEmbedReady(false);
    /* eslint-enable react-hooks/set-state-in-effect */

    const fallbackReveal = setTimeout(() => {
      if (loadCompletedAtRef.current === 0) {
        loadCompletedAtRef.current = Date.now();
      }
      scheduleReveal();
    }, LOAD_FALLBACK_MS);

    return () => {
      clearTimeout(fallbackReveal);
      clearRevealTimer();
    };
  }, [embedKey, scheduleReveal, clearRevealTimer]);

  const handleResetView = useCallback(() => {
    clearRevealTimer();
    loadCompletedAtRef.current = 0;
    mountTimeRef.current = Date.now();
    setEmbedReady(false);
    setEmbedKey((key) => key + 1);
  }, [clearRevealTimer]);

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
          key={embedKey}
          src={embedSrc}
          title={embedTitle ?? label}
          allowFullScreen
          onLoad={handleIframeLoad}
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
        {embedReady ? (
          <button
            type="button"
            aria-label="Reset FigJam board view"
            onClick={handleResetView}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              border: "1px solid var(--border)",
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--fg-muted)",
              background: "var(--surface)",
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Reset view
          </button>
        ) : null}
      </div>
    </FigJamChrome>
  );
}
