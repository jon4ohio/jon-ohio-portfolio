"use client";

import type { CSSProperties } from "react";

export type BadgeVariant = "purple" | "neutral" | "success";

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  style?: CSSProperties;
};

function badgeStyle(variant: BadgeVariant): CSSProperties {
  switch (variant) {
    case "neutral":
      return {
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--fg-muted)",
      };
    case "success":
      return {
        border: "1px solid var(--border)",
        background: "color-mix(in oklab, var(--accent-green) 22%, var(--surface))",
        color: "var(--fg)",
      };
    case "purple":
      return {
        border: "1px solid var(--border)",
        background: "color-mix(in oklab, var(--accent) 22%, var(--surface))",
        color: "var(--fg)",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

export function Badge({ label, variant = "neutral", style }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        padding: "4px 10px",
        fontSize: 12,
        lineHeight: 1,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        ...badgeStyle(variant),
        ...style,
      }}
    >
      {label}
    </span>
  );
}

export default Badge;
