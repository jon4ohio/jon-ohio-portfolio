// src/index.ts
import { gothicTheme } from "@astryxdesign/theme-gothic/built";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

// src/types.ts
var JEDI_THEME_MODES = ["light", "dark"];
function resolveJediThemeName(mode) {
  return mode === "dark" ? "gothic" : "neutral";
}
export {
  JEDI_THEME_MODES,
  gothicTheme,
  neutralTheme,
  resolveJediThemeName
};
