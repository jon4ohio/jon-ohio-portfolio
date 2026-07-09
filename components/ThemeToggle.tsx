"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons/ThemeIcons";
import { coerceTheme, DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeName } from "@/components/theme";

function persistUserTheme(next: ThemeName) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // private mode / blocked storage
  }
}

function readThemeFromDom(): ThemeName {
  const rootTheme = document.documentElement.dataset.theme;
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return coerceTheme(storedTheme ?? rootTheme);
  } catch {
    return coerceTheme(rootTheme);
  }
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);

  const chooseUserTheme = (next: ThemeName) => {
    setTheme(next);
    persistUserTheme(next);
  };

  /* eslint-disable react-hooks/set-state-in-effect -- one-shot read of DOM/localStorage after blocking head script (external system) */
  useLayoutEffect(() => {
    setTheme(readThemeFromDom());
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (document.documentElement.dataset.theme !== theme) {
      document.documentElement.dataset.theme = theme;
    }
    window.dispatchEvent(new Event("resize"));
  }, [theme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      setTheme(coerceTheme(event.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const iconSize = compact ? 16 : 18;
  const nextTheme: ThemeName = theme === "light" ? "dark" : "light";
  const switchLabel = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      className="theme-icon-btn"
      aria-label={switchLabel}
      data-tooltip={switchLabel}
      onClick={() => chooseUserTheme(nextTheme)}
    >
      {theme === "light" ? <MoonIcon size={iconSize} /> : <SunIcon size={iconSize} />}
    </button>
  );
}
