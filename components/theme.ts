export const THEME_STORAGE_KEY = "jop-theme";
/** SSR / hydration placeholder; real default before user choice is time-of-day (see `getTimeOfDayDefaultTheme`). */
export const DEFAULT_THEME = "light" as const;

export const THEMES = ["light", "dark"] as const;
export type ThemeName = (typeof THEMES)[number];

/** Local clock: day → light, night → dark (06:00–18:00, else). */
export function getTimeOfDayDefaultTheme(): ThemeName {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) return "light";
  return "dark";
}

export function isThemeName(value: string | null | undefined): value is ThemeName {
  return value === "light" || value === "dark";
}

/** Migrate legacy `warm` storage to `light`. */
export function coerceTheme(value: string | null | undefined): ThemeName {
  if (value === "warm") return "light";
  return isThemeName(value) ? value : getTimeOfDayDefaultTheme();
}
