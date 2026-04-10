export const THEME_STORAGE_KEY = "jop-theme";
export const DEFAULT_THEME = "warm" as const;

export const THEMES = ["light", "warm", "dark"] as const;
export type ThemeName = (typeof THEMES)[number];

export function isThemeName(value: string | null | undefined): value is ThemeName {
  return value === "light" || value === "warm" || value === "dark";
}

export function coerceTheme(value: string | null | undefined): ThemeName {
  return isThemeName(value) ? value : DEFAULT_THEME;
}
