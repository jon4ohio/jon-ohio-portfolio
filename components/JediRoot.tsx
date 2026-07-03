"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { JediProviders } from "@jedi/core";
import { coerceTheme, DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeName } from "@/components/theme";

function readTheme(): ThemeName {
  if (typeof document === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return coerceTheme(stored ?? document.documentElement.dataset.theme);
  } catch {
    return coerceTheme(document.documentElement.dataset.theme);
  }
}

export default function JediRoot({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    setMode(readTheme());

    const observer = new MutationObserver(() => {
      setMode(readTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) setMode(coerceTheme(event.newValue));
    };
    window.addEventListener("storage", onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <JediProviders mode={mode} linkComponent={Link}>
      {children}
    </JediProviders>
  );
}
