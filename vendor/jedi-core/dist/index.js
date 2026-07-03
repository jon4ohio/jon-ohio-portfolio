"use client";

// src/JediProviders.tsx
import { Theme } from "@astryxdesign/core/theme";
import { LinkProvider } from "@astryxdesign/core/Link";
import {
  gothicTheme,
  neutralTheme
} from "@jon4ohio/jedi-themes";
import { jsx } from "react/jsx-runtime";
function resolveJediTheme(mode) {
  return mode === "dark" ? gothicTheme : neutralTheme;
}
function JediProviders({
  children,
  mode = "dark",
  linkComponent
}) {
  const theme = resolveJediTheme(mode);
  return /* @__PURE__ */ jsx(Theme, { theme, children: /* @__PURE__ */ jsx(LinkProvider, { component: linkComponent, children }) });
}
export {
  JediProviders,
  resolveJediTheme
};
