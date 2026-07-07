"use client";

import type { CSSProperties, ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  padding?: number;
  style?: CSSProperties;
};

export function Card({ children, padding = 4, style }: CardProps) {
  const padPx = padding * 4;
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        background: "var(--surface)",
        padding: padPx,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Card;
