import type { ReactNode } from "react";

/** Lavender margin wrapper for FigJam embeds and static snapshots (ADR-065). */
export default function FigJamChrome({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--figjam-embed-bg)",
        border: "1px solid var(--figjam-embed-border)",
        borderRadius: 8,
        padding: 24,
      }}
    >
      <div
        style={{
          borderRadius: 6,
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        {children}
      </div>
    </div>
  );
}
