"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { coerceTheme, DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, type ThemeName } from "@/components/theme";

const labels: Record<ThemeName, string> = {
  light: "Light",
  warm: "Warm",
  dark: "Dark",
};

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const rootTheme = document.documentElement.dataset.theme;
    try {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      return coerceTheme(storedTheme ?? rootTheme);
    } catch {
      return coerceTheme(rootTheme);
    }
  });

  useEffect(() => {
    if (document.documentElement.dataset.theme !== theme) {
      document.documentElement.dataset.theme = theme;
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write failures (private mode / blocked storage).
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
      setTheme(THEMES[(currentIndex + 1) % THEMES.length]);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setTheme(THEMES[(currentIndex - 1 + THEMES.length) % THEMES.length]);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setTheme(THEMES[0]);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setTheme(THEMES[THEMES.length - 1]);
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
        background: "var(--surface)",
      }}
    >
      {THEMES.map((item) => {
        const active = item === theme;
        return (
          <button
            key={item}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`Theme ${labels[item]}`}
            tabIndex={active ? 0 : -1}
            onClick={() => setTheme(item)}
            style={{
              border: "none",
              borderRadius: 999,
              padding: compact ? "5px 8px" : "6px 10px",
              background: active ? "var(--fg)" : "transparent",
              color: active ? "var(--bg)" : "var(--fg-muted)",
              fontSize: compact ? 11 : 12,
              fontWeight: 500,
              letterSpacing: "0.01em",
              cursor: "pointer",
              transition: "background 0.15s ease, color 0.15s ease",
            }}
          >
            {labels[item]}
          </button>
        );
      })}
    </div>
  );
}
