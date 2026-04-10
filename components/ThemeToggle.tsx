"use client";

import { useEffect, useLayoutEffect, useState, type KeyboardEvent } from "react";
import { coerceTheme, DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, type ThemeName } from "@/components/theme";

const labels: Record<ThemeName, string> = {
  light: "Light",
  warm: "Warm",
  dark: "Dark",
};

function persistUserTheme(next: ThemeName) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // private mode / blocked storage
  }
}

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  // Keep initial client render identical to SSR to avoid hydration mismatch.
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);

  const chooseUserTheme = (next: ThemeName) => {
    setTheme(next);
    persistUserTheme(next);
  };

  // Sync to `data-theme` set by ThemeScript (runs before React); must run before paint to avoid toggle flash.
  /* eslint-disable react-hooks/set-state-in-effect -- one-shot read of DOM/localStorage after blocking head script (external system) */
  useLayoutEffect(() => {
    const rootTheme = document.documentElement.dataset.theme;
    try {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      setTheme(coerceTheme(storedTheme ?? rootTheme));
    } catch {
      setTheme(coerceTheme(rootTheme));
    }
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
        const active = item === theme;
        return (
          <button
            key={item}
            type="button"
            role="radio"
            className="theme-toggle-segment"
            aria-checked={active}
            aria-label={`Theme ${labels[item]}`}
            tabIndex={active ? 0 : -1}
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
