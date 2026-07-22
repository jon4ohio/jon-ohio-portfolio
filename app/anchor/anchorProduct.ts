/** Shared visual tokens for the chrome-free Anchor product surface (`/anchor/*`). */
export const anchorProduct = {
  bg: "#000000",
  paper: "#f0f0ee",
  muted: "rgba(240, 240, 238, 0.52)",
  faint: "rgba(240, 240, 238, 0.22)",
  teal: "#3d8f8d",
  line: "rgba(240, 240, 238, 0.09)",
  display:
    'var(--font-anchor-display), "Iowan Old Style", "Palatino Linotype", Palatino, serif',
  body: 'var(--font-anchor-body), "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: 'var(--font-anchor-mono), "SF Mono", ui-monospace, Menlo, monospace',
  pad: "clamp(24px, 5vw, 64px)",
  sectionPad: "clamp(88px, 12vh, 120px) clamp(24px, 5vw, 64px)",
  npm: "https://www.npmjs.com/package/@jon4ohio/anchor-runtime",
} as const;
