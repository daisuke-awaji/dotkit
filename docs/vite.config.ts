import { defineConfig, type Plugin } from "vite";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

/** Publishes the built package CSS at https://<pages>/dotkit/dotkit.css (CDN-style). */
const publishDist = (): Plugin => ({
  name: "dotkit:publish-dist",
  apply: "build",
  generateBundle() {
    for (const file of ["dotkit.css", "icons.json", "glyphs.json"]) {
      this.emitFile({ type: "asset", fileName: file, source: readFileSync(r(`../dist/${file}`)) });
    }
  },
});

export default defineConfig({
  root: r("."),
  base: "/dotkit/",
  publicDir: r("public"),
  plugins: [publishDist()],
  resolve: {
    alias: {
      "dotkit/react": r("../src/react/index.ts"),
      "dotkit/css": r("../dist/dotkit.css"),
    },
  },
  build: {
    outDir: r("dist"),
    emptyOutDir: true,
    // og.html renders the Open Graph card (captured into public/og.png); it is not linked from the site.
    rollupOptions: { input: { main: r("index.html"), og: r("og.html") } },
  },
});
