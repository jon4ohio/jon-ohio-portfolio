#!/usr/bin/env node
/**
 * Vercel install: clone vendor/jedi, build, copy slim packages, npm install.
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jediClone = resolve(root, "vendor/jedi");
const jediCoreDist = resolve(root, "vendor/jedi-core/dist/index.js");
const JEDI_TAG = "jedi-v0.1.0";
const JEDI_REPO = "https://github.com/jon4ohio/jedi.git";
const SLIM_PACKAGES = ["jedi-core", "jedi-react", "jedi-themes", "jedi-tokens"];

const run = (cmd, opts = {}) =>
  execSync(cmd, { stdio: "inherit", ...opts });

function wireSlimPackageDeps() {
  const corePkgPath = resolve(root, "vendor/jedi-core/package.json");
  if (!existsSync(corePkgPath)) return;
  const pkg = JSON.parse(readFileSync(corePkgPath, "utf8"));
  if (pkg.dependencies?.["@jon4ohio/jedi-themes"]) {
    pkg.dependencies["@jon4ohio/jedi-themes"] = "file:../jedi-themes";
    writeFileSync(corePkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
  }
}

function copySlimPackages() {
  for (const name of SLIM_PACKAGES) {
    const src = resolve(jediClone, "packages", name);
    const dest = resolve(root, "vendor", name);
    rmSync(dest, { recursive: true, force: true });
    mkdirSync(dest, { recursive: true });

    cpSync(resolve(src, "package.json"), resolve(dest, "package.json"));
    if (existsSync(resolve(src, "dist"))) {
      cpSync(resolve(src, "dist"), resolve(dest, "dist"), { recursive: true });
    }
    if (name === "jedi-themes" && existsSync(resolve(src, "styles"))) {
      cpSync(resolve(src, "styles"), resolve(dest, "styles"), { recursive: true });
    }
    if (name === "jedi-tokens" && existsSync(resolve(src, "bridge.css"))) {
      cpSync(resolve(src, "bridge.css"), resolve(dest, "bridge.css"));
    }
  }

  wireSlimPackageDeps();
  rmSync(jediClone, { recursive: true, force: true });
  console.log("Copied slim JEDI packages to vendor/jedi-*");
}

if (!existsSync(jediCoreDist)) {
  if (!existsSync(resolve(jediClone, "package.json"))) {
    console.log(`Cloning ${JEDI_REPO} @ ${JEDI_TAG} → ${jediClone}`);
    mkdirSync(resolve(root, "vendor"), { recursive: true });
    run(`git clone --depth 1 --branch ${JEDI_TAG} ${JEDI_REPO} "${jediClone}"`, {
      cwd: root,
    });
  }

  console.log("Building JEDI packages (Astryx deps + build:jedi)...");
  run("corepack enable", { cwd: jediClone });
  run("pnpm install", { cwd: jediClone });
  run("pnpm -F @astryxdesign/core build", { cwd: jediClone });
  run("pnpm -F @astryxdesign/theme-gothic build", { cwd: jediClone });
  run("pnpm -F @astryxdesign/theme-neutral build", { cwd: jediClone });
  run("pnpm build:jedi", { cwd: jediClone });

  copySlimPackages();
} else {
  wireSlimPackageDeps();
}

run("npm install --no-audit --no-fund", { cwd: root });
