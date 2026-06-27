"use client";

import { useEffect, useLayoutEffect, useState, type KeyboardEvent } from "react";
import { coerceTheme, DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, type ThemeName } from "@/components/theme";

const labels: Record<ThemeName, string> = {
  light: "Light",
  dark: "Dark",
};

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
  const [mounted, setMounted] = useState(false);

  const chooseUserTheme = (next: ThemeName) => {
    setTheme(next);
    persistUserTheme(next);
  };

  // ThemeScript sets data-theme before hydration; defer active toggle UI until synced.
  /* eslint-disable react-hooks/set-state-in-effect -- one-shot read of DOM/localStorage after blocking head script (external system) */
  useLayoutEffect(() => {
    setTheme(readThemeFromDom());
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (document.documentElement.dataset.theme !== theme) {
      document.documentElement.dataset.theme = theme;
    }
    // Components like the hero canvas listen to resize for color refresh.
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

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = THEMES.indexOf(theme);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      chooseUserTheme(THEMES[(currentIndex + 1) % THEMES.length]);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      chooseUserTheme(THEMES[(currentIndex - 1 + THEMES.length) % THEMES.length]);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      chooseUserTheme(THEMES[0]);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      chooseUserTheme(THEMES[THEMES.length - 1]);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      onKeyDown={onKeyDown}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 4 : 6,
        border: "1px solid var(--border)",
        borderRadius: 999,
        padding: compact ? 2 : 3,
        background: "transparent",
      }}
    >
      {THEMES.map((item) => {
        const active = mounted && item === theme;
        return (
          <button
            key={item}
            type="button"
            role="radio"
            className="theme-toggle-segment"
            aria-checked={mounted ? item === theme : false}
            aria-label={`Theme ${labels[item]}`}
            tabIndex={mounted ? (active ? 0 : -1) : item === DEFAULT_THEME ? 0 : -1}
            onClick={() => chooseUserTheme(item)}
            style={{
              border: "none",
              borderRadius: 999,
              padding: compact ? "5px 8px" : "6px 10px",
              background: active ? "var(--theme-toggle-active-bg)" : "transparent",
              color: active ? "var(--fg)" : "var(--fg-muted)",
              fontSize: compact ? 11 : 12,
              fontWeight: 500,
              letterSpacing: "0.01em",
              cursor: "pointer",
              boxShadow: active ? "var(--theme-toggle-active-shadow)" : "none",
              transition: "background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {labels[item]}
          </button>
        );
      })}
    </div>
  );
}
