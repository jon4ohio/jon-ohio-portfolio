import type { CSSProperties } from "react";

/** Design tokens — ink/paper/teal editorial system for Anchor case study */
export const tokens = {
  ink: "#0a0c0d",
  inkElevated: "#121516",
  paper: "#f4f5f4",
  paperMuted: "#c5cbc8",
  teal: "#2a6b6a",
  tealBright: "#3d8f8d",
  line: "rgba(244, 245, 244, 0.12)",
  lineStrong: "rgba(244, 245, 244, 0.22)",
  focus: "#3d8f8d",
  maxW: 720,
  pagePad: "clamp(20px, 5vw, 48px)",
  display:
    'var(--font-anchor-display), "Iowan Old Style", "Palatino Linotype", Palatino, serif',
  body: 'var(--font-anchor-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: 'var(--font-anchor-mono), "SF Mono", ui-monospace, Menlo, monospace',
} as const;

export const page: CSSProperties = {
  margin: 0,
  background: tokens.ink,
  color: tokens.paper,
  fontFamily: tokens.body,
  fontSize: 16,
  lineHeight: 1.6,
  WebkitFontSmoothing: "antialiased",
  minHeight: "100vh",
};

export const wrap: CSSProperties = {
  maxWidth: tokens.maxW,
  margin: "0 auto",
  paddingLeft: tokens.pagePad,
  paddingRight: tokens.pagePad,
};

export const section: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingTop: "clamp(64px, 12vh, 120px)",
  paddingBottom: "clamp(64px, 12vh, 120px)",
  borderBottom: `1px solid ${tokens.line}`,
};

export const displayText: CSSProperties = {
  fontFamily: tokens.display,
  fontWeight: 400,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  margin: 0,
  color: tokens.paper,
};

export const bodyMuted: CSSProperties = {
  color: tokens.paperMuted,
  margin: 0,
  fontSize: 17,
  lineHeight: 1.65,
  maxWidth: "42ch",
};

export const waypointLabel: CSSProperties = {
  fontFamily: tokens.mono,
  fontSize: 12,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: tokens.tealBright,
};

export const btnPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 22px",
  background: tokens.teal,
  color: tokens.paper,
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
  border: "none",
  borderRadius: 2,
  cursor: "pointer",
};

export const btnGhost: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  color: tokens.paperMuted,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 400,
  borderBottom: `1px solid transparent`,
  paddingBottom: 2,
};

export const hairlineCard: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "24px 0",
  borderTop: `1px solid ${tokens.line}`,
  textDecoration: "none",
  color: "inherit",
};

export const focusRing: CSSProperties = {
  outline: `2px solid ${tokens.focus}`,
  outlineOffset: 3,
};
