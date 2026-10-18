# dotkit

**UI made of dots.** A zero-runtime CSS framework where every element — surfaces, outlines, text, icons, charts — is drawn as a collection of dots. Ships with thin, stateless React bindings.

**Docs & design catalog → https://daisuke-awaji.github.io/dotkit/**

- **Zero runtime** — one CSS file is the single source of truth. `dotkit/react` only maps props to classes and CSS variables, so it works in React Server Components without `"use client"`.
- **Two knobs** — the whole look is driven by `--dk-size` (dot diameter) and `--dk-gap` (dot spacing). Both are registered with `@property`, so dots can swell on hover with plain CSS transitions.
- **GitHub-only distribution** — not published to npm. Install from GitHub Releases, a git tag, or a CDN.

## Install

```sh
# Release tarball (recommended)
npm i https://github.com/daisuke-awaji/dotkit/releases/download/v0.1.0/dotkit-0.1.0.tgz

# or follow a semver range via git tags (pre-built `dist` branch)
npm i "github:daisuke-awaji/dotkit#semver:^0.1"
```

```html
<!-- or no bundler at all -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/daisuke-awaji/dotkit@v0.1.0/dist/dotkit.css">
```

## Usage

```html
<div class="dk-card">
  <div class="dk-meter" style="--dk-value: .62"></div>
  <button class="dk-btn dk-btn--solid">Deploy</button>
</div>
```

```tsx
import "dotkit/css";
import { Button, Card, Meter } from "dotkit/react";

export default function Page() {
  return (
    <Card>
      <Meter value={0.62} label="Storage" />
      <Button variant="solid">Deploy</Button>
    </Card>
  );
}
```

See the [Design Catalog](https://daisuke-awaji.github.io/dotkit/#/catalog) for every primitive, technique and component with HTML and React code, and [llms.txt](https://daisuke-awaji.github.io/dotkit/llms.txt) for a compact reference aimed at coding agents.

## Verify a release

Release tarballs are built on GitHub Actions and carry a build provenance attestation:

```sh
gh attestation verify dotkit-0.1.0.tgz -R daisuke-awaji/dotkit
```

## Development

```sh
npm ci
npm run docs:dev     # docs site with live components (http://localhost:5173/dotkit/)
npm run build        # dist/ (dotkit.css, icons.json, react/)
npm run icons        # regenerate icon CSS + types from icons/icons.json
```

| Path | |
|---|---|
| `src/css/dotkit.css` | the framework (tokens, primitives, components, a11y fallbacks) |
| `icons/icons.json` | 7×7 icon bitmaps — single source for CSS and TS types |
| `src/react/` | React bindings |
| `docs/` | documentation site (built with dotkit itself) |
| `PLAN.md` | project plan & roadmap (Japanese) |

Releases: bump `version` in `package.json`, then run the **Release** workflow.

## License

MIT
