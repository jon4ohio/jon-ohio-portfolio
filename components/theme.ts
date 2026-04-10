export const THEME_STORAGE_KEY = "jop-theme";
/** SSR / hydration placeholder; real default before user choice is time-of-day (see `getTimeOfDayDefaultTheme`). */
export const DEFAULT_THEME = "warm" as const;

export const THEMES = ["light", "warm", "dark"] as const;
export type ThemeName = (typeof THEMES)[number];

/** Local clock: morning → light, afternoon → warm, night → dark (06:00–12:00, 12:00–18:00, else). */
export function getTimeOfDayDefaultTheme(): ThemeName {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "light";
  if (hour >= 12 && hour < 18) return "warm";
  return "dark";
}

export function isThemeName(value: string | null | undefined): value is ThemeName {
  return value === "light" || value === "warm" || value === "dark";
}

export function coerceTheme(value: string | null | undefined): ThemeName {
  return isThemeName(value) ? value : getTimeOfDayDefaultTheme();
}
