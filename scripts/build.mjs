// Builds the distributable package into dist/.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const dist = resolve(root, "dist");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

execSync("node scripts/build-icons.mjs", { cwd: root, stdio: "inherit" });

// CSS: core + generated glyphs, one file.
const banner = `/*! dotkit v${pkg.version} | MIT | https://github.com/daisuke-awaji/dotkit */\n`;
const core = readFileSync(resolve(root, "src/css/dotkit.css"), "utf8").replace(/^\/\*![\s\S]*?\*\/\n/, "");
// Feature modules, in cascade order (all of them are layered, so order only matters inside a layer).
const modules = ["forms", "data", "navigation", "feedback", "effects"].map((m) =>
  readFileSync(resolve(root, `src/css/modules/${m}.css`), "utf8"),
);
const icons = readFileSync(resolve(root, "src/css/icons.css"), "utf8");
writeFileSync(resolve(dist, "dotkit.css"), banner + [core, ...modules, icons].join("\n"));
copyFileSync(resolve(root, "icons/icons.json"), resolve(dist, "icons.json"));

// React bindings: ESM + .d.ts
execSync("npx tsc -p tsconfig.build.json", { cwd: root, stdio: "inherit" });
console.log(`dist: dotkit v${pkg.version} built`);
