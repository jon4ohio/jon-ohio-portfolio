import { THEME_STORAGE_KEY } from "@/components/theme";

/** Inline script runs before React; hour logic must match `getTimeOfDayDefaultTheme` in `./theme`. */
export default function ThemeScript() {
  const script = `
(() => {
  const key = ${JSON.stringify(THEME_STORAGE_KEY)};
  const fallback = (() => {
    var h = new Date().getHours();
    if (h >= 6 && h < 18) return "light";
    return "dark";
  })();
  try {
    var stored = window.localStorage.getItem(key);
    var theme = stored === "warm" ? "light" : stored === "light" || stored === "dark" ? stored : fallback;
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = fallback;
  }
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
