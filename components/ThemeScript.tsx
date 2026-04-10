import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/components/theme";

export default function ThemeScript() {
  const script = `
(() => {
  const key = ${JSON.stringify(THEME_STORAGE_KEY)};
  const fallback = ${JSON.stringify(DEFAULT_THEME)};
  try {
    const stored = window.localStorage.getItem(key);
    const theme = stored === "light" || stored === "warm" || stored === "dark" ? stored : fallback;
    if (stored !== theme) window.localStorage.setItem(key, theme);
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = fallback;
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
