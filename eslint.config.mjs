import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@astryxdesign/core",
              message: "Import @jedi/* only (ADR-075). Astryx is JEDI-internal.",
            },
            {
              name: "@astryxdesign/theme-gothic",
              message: "Import @jedi/themes only (ADR-075).",
            },
            {
              name: "@astryxdesign/theme-neutral",
              message: "Import @jedi/themes only (ADR-075).",
            },
          ],
          patterns: [
            {
              group: ["@astryxdesign/*", "@jedi/internal/*"],
              message: "Import @jedi/* public APIs only (ADR-075).",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "**/.next/**",
    ".claude/**",
    "course-jon-ohio-portfolio/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
