# Module 4: How Themes Work

### Teaching Arc
- **Metaphor:** A theatre lighting board — before the actors (React components) even walk on stage, a lighting technician runs out and sets the house lights based on a rule ("if it's afternoon, go warm"). When an actor changes the lights mid-show, every spotlight on stage updates instantly because they all draw from the same central rig.
- **Opening hook:** "The portfolio has three visual themes — Light, Warm, and Dark — and it picks the right one automatically based on your clock. Here's the three-layer system that makes that happen without any flicker."
- **Key insight:** Three components work as a relay race: ThemeScript (runs BEFORE React, sets `data-theme` on `<html>` immediately) → ThemeToggle (React component, reads/writes the user's choice) → globals.css (CSS custom properties that update the entire visual layer based on `data-theme`). The trick: CSS variables are inherited by EVERY element on the page — change one attribute on `<html>` and the whole visual system updates.
- **"Why should I care?":** Understanding this lets you add new theme-aware colors correctly — always use `var(--jop-text-primary)` not hardcoded `#121212`. Also helps you debug "flash of wrong theme" bugs.

### Code Snippets (pre-extracted)

File: components/ThemeScript.tsx (lines 1-25) — the flash-prevention trick
```tsx
export default function ThemeScript() {
  const script = `
(() => {
  const key = "jop-theme";
  const fallback = (() => {
    var h = new Date().getHours();
    if (h >= 6 && h < 12) return "light";
    if (h >= 12 && h < 18) return "warm";
    return "dark";
  })();
  try {
    var stored = window.localStorage.getItem(key);
    var theme = stored === "light" || stored === "warm" || stored === "dark"
      ? stored : fallback;
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = fallback;
  }
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
```

File: components/ThemeToggle.tsx (lines 22-48) — the React piece
```tsx
const chooseUserTheme = (next: ThemeName) => {
  setTheme(next);
  persistUserTheme(next);
};

useLayoutEffect(() => {
  const rootTheme = document.documentElement.dataset.theme;
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    setTheme(coerceTheme(storedTheme ?? rootTheme));
  } catch {
    setTheme(coerceTheme(rootTheme));
  }
}, []);

useEffect(() => {
  if (document.documentElement.dataset.theme !== theme) {
    document.documentElement.dataset.theme = theme;
  }
  window.dispatchEvent(new Event("resize"));
}, [theme]);
```

File: components/theme.ts (full, 22 lines)
```ts
export const THEME_STORAGE_KEY = "jop-theme";
export const DEFAULT_THEME = "warm" as const;
export const THEMES = ["light", "warm", "dark"] as const;
export type ThemeName = (typeof THEMES)[number];

export function getTimeOfDayDefaultTheme(): ThemeName {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "light";
  if (hour >= 12 && hour < 18) return "warm";
  return "dark";
}

export function coerceTheme(value: string | null | undefined): ThemeName {
  return isThemeName(value) ? value : getTimeOfDayDefaultTheme();
}
```

File: app/globals.css (lines 61-100) — the CSS layer (abbreviated for brief):
```css
:root,
:root[data-theme="warm"] {
  --jop-bg-canvas: var(--jop-color-sand-10);
  --jop-text-primary: #121212;
  --jop-accent-brand: #d97757;
}

:root[data-theme="dark"] {
  --jop-bg-canvas: var(--jop-color-slate-5);
  --jop-text-primary: rgba(248,248,246,0.95);
  --jop-accent-brand: #d97757;
}
```

### Interactive Elements

- [x] **Group chat animation** — actors: Clock (system time), ThemeScript, localStorage, ThemeToggle, HTML Element. Message flow:
  1. Clock: "It's 3pm."
  2. ThemeScript: "Hours 12–18 = 'warm'. Setting data-theme='warm' on <html> RIGHT NOW, before React loads."
  3. HTML Element: "Got it. All my CSS variables just switched to warm mode. No flicker."
  4. ThemeToggle (React): "I'm loaded! Let me check localStorage for a saved preference..."
  5. localStorage: "Found it — user last chose 'dark'."
  6. ThemeToggle: "Overriding to 'dark'. Setting data-theme='dark' on <html>."
  7. HTML Element: "Switched to dark mode. Every color token just updated."
  8. ThemeToggle: "Saving 'dark' back to localStorage for next visit."
- [x] **Code↔English translation** — use ThemeScript snippet. This is the most mysterious piece — the inline script that runs before React.
- [x] **Layer toggle demo** — show three layers: Layer 1 "ThemeScript (runs first, sets data-theme)", Layer 2 "ThemeToggle (React, reads/writes preference)", Layer 3 "CSS Variables (always follow data-theme)". Each layer shows a code snippet and plain-English description. User clicks between layers.
- [x] **Quiz** — 3 questions:
  Q1: "Why does ThemeScript run BEFORE React?" (options: It's faster / To prevent a flash of wrong colors — if React set the theme, you'd see the default for a split second before it updates / It's required by Next.js / For SEO reasons). Correct: To prevent a flash of wrong colors.
  Q2: "You add a new UI component with a hardcoded color `color: #121212`. What breaks?" (options: Nothing — it works fine / The color ignores the dark/light theme switch and stays dark charcoal in all themes / The component renders incorrectly / TypeScript throws an error). Correct: The color ignores theme switching. Explanation: Always use `var(--jop-text-primary)` so the theme system can swap the value.
  Q3: "A user switches to Dark at 9am and comes back at 2pm. What theme do they see?" (options: Light (morning default) / Warm (afternoon default) / Dark (their stored preference) / It depends on the browser). Correct: Dark (their stored preference). Explanation: localStorage persists the user's choice; ThemeScript checks storage first and only falls back to time-of-day if nothing is stored.
- [x] **Pattern cards** — three cards: "ThemeScript — runs before paint, no flicker", "ThemeToggle — React, user choice + storage", "CSS Variables — the entire visual layer in one attribute"

### Reference Files to Read
- `references/interactive-elements.md` → "Group Chat Animation", "Code ↔ English Translation Blocks", "Layer Toggle Demo", "Multiple-Choice Quizzes", "Pattern/Feature Cards"
- `references/content-philosophy.md` → always include
- `references/gotchas.md` → always include

### Connections
- **Previous module:** Module 3 — Where the Content Lives (data layer; themes are the visual layer on top)
- **Next module:** Module 5 — Adding a Case Study End-to-End (puts everything together)
- **Tone/style notes:** Module 4 uses --color-bg-warm. Accent: teal #2A7B9B. Chat actors: Clock = actor-4 (amber), ThemeScript = actor-1 (teal), localStorage = actor-3 (plum), ThemeToggle = actor-2 (teal-blue), HTML Element = actor-5 (forest). Module number: 04.
