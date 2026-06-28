"use client";

import { useState } from "react";

export type YouTubePosterPlayerProps = {
  videoId: string;
  posterSrc: string;
  title: string;
  /** CSS aspect-ratio value — default matches promo poster (1192×596). */
  aspectRatio?: string;
};

export default function YouTubePosterPlayer({
  videoId,
  posterSrc,
  title,
  aspectRatio = "1192 / 596",
}: YouTubePosterPlayerProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid var(--border)",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio }}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
              display: "block",
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              padding: 0,
              margin: 0,
              border: "none",
              cursor: "pointer",
              display: "block",
              background: "transparent",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterSrc}
              alt=""
              aria-hidden
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.12)",
                transition: "background 0.2s ease",
              }}
            >
              <span
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.88)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 28px rgba(0, 0, 0, 0.2)",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--fg)" aria-hidden>
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
