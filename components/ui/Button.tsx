"use client";

import type { CSSProperties, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: CSSProperties;
};

function variantStyle(variant: ButtonVariant): CSSProperties {
  switch (variant) {
    case "primary":
      return {
        border: "1px solid var(--border)",
        background: "var(--theme-toggle-active-bg, var(--surface-emphasis))",
        color: "var(--fg-on-emphasis)",
      };
    case "secondary":
      return {
        border: "1px solid var(--border)",
        background: "var(--surface-subtle)",
        color: "var(--fg)",
      };
    case "ghost":
      return {
        border: "1px solid transparent",
        background: "transparent",
        color: "var(--fg)",
      };
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}

function sizeStyle(size: ButtonSize): CSSProperties {
  switch (size) {
    case "sm":
      return { fontSize: 12, padding: "6px 10px" };
    case "md":
      return { fontSize: 14, padding: "10px 14px" };
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
}

export function Button({
  label,
  variant = "secondary",
  size = "md",
  style,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      style={{
        appearance: "none",
        WebkitAppearance: "none",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 500,
        lineHeight: 1.2,
        ...sizeStyle(size),
        ...variantStyle(variant),
        ...style,
      }}
    >
      {label}
    </button>
  );
}

export default Button;
