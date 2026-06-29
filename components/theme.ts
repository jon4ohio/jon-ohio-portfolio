export const THEME_STORAGE_KEY = "jop-theme";
/** SSR / hydration placeholder; static default before user choice. */
export const DEFAULT_THEME = "dark" as const;

export const THEMES = ["light", "dark"] as const;
export type ThemeName = (typeof THEMES)[number];

export function isThemeName(value: string | null | undefined): value is ThemeName {
  return value === "light" || value === "dark";
}

/** Migrate legacy `warm` storage to `light`. */
export function coerceTheme(value: string | null | undefined): ThemeName {
  if (value === "warm") return "light";
  return isThemeName(value) ? value : DEFAULT_THEME;
}
