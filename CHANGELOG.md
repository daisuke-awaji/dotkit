# Changelog

All notable changes to dotkit. Versions follow [semver](https://semver.org/) (0.x: minor = new features, may include small breaking changes).

## v0.3.0

The second wave of the Design Catalog expansion.

### Added
- **Dot-matrix digits** — `.dk-digits` with generated `.dk-glyph--{slug}` (0-9 `: . , - + % /` space), `--square`, `--grid`. New source `icons/glyphs.json` (exported as `dotkit/glyphs.json`). React: `<DotDigits>`, `glyphChars`.
- **Sparkline** — `.dk-spark` (+ `--area`). React: `<Sparkline>`.
- **Pictogram** — `.dk-pictogram`; fractions fill whole dot columns. React: `<Pictogram>`.
- **Stepper** — `ol.dk-steps` driven by `aria-current="step"` (+ `--vertical`). React: `<Steps>`.
- **Skeleton** — `.dk-skeleton` (+ `--text`, `--circle`). React: `<Skeleton>`.
- **Status dot** — `.dk-status[data-state]` (+ `--pulse`); `down` is square and `idle` is a ring. React: `<StatusDot>`.
- **Marching border** — `.dk-march` for any dotted outline. React: `march` prop on `<DotBorder>` / `<Card>`.
- **Identicon** — `.dk-identicon`; React `<Identicon>` and the pure `identicon(seed)` helper.
- **Theme presets** — `.dk-theme-gameboy`, `-amber`, `-newsprint`, `-riso`, `-blueprint`.

### Changed
- `scripts/build-icons.mjs` handles any rectangular bitmap set (7×7 icons and 5×7 glyphs) and validates sizes.
- Halftones invert automatically inside the dark-paper presets (amber, blueprint) as well as `.dk-theme-dark`.
- Dark theme: `--dk-mute` is a little lighter (`#3a3a3a` → `#474747`) so subtle dotted outlines stay visible.

## v0.2.0

The first wave of the Design Catalog expansion (see `IDEAS.md`).

### Added
- **Checkbox / Radio / Switch** — `.dk-check`, `.dk-radio`, `.dk-switch` on native inputs (`appearance: none`), `.dk-choice` label wrapper, `--dk-control` size. React: `<Checkbox>`, `<Radio>`, `<Switch>`.
- **Image halftone** — `.dk-halftone-img` renders any `<img>` / `<picture>` / `<video>` / `<canvas>` as halftone dots (CSS only). `--dk-tone-filter`, `--invert`. React: `<HalftoneImage>`.
- **Heatmap** — `.dk-heatmap` (+ `--tone`, `--size`), one dot per cell, `--dk-cell`, `--dk-rows`. React: `<Heatmap>`.
- **Uptime bar** — `.dk-uptime` with `data-state="ok|warn|down|none"`; severity is encoded by height as well as color. React: `<UptimeBar>`.
- **Dot leaders** — `.dk-leaders` / `.dk-leader`. React: `<DotLeaders>`, `<Leader>`.
- **Typing indicator** — `.dk-typing` (+ `--bubble`). React: `<Typing>`.
- Status color tokens `--dk-ok`, `--dk-warn`, `--dk-danger`, `--dk-info` (with dark-theme values).
- React helpers `withVars()` and `px()`.

### Changed
- Theme classes (`.dk-theme-*`) now also set `color` and `background-color` on their own element, so a theme can be scoped to part of a page.
- CSS source is split into `src/css/dotkit.css` (core) and `src/css/modules/*.css`; the distributed `dist/dotkit.css` is still a single file.
- Docs: the Design Catalog is grouped by category and marks additions with their version.

## v0.1.0

Initial release: `dotkit.css` (dots, density, shape, fade, border, halftone, dot text, 26 icons, loader, button, badge, input, divider, meter, bar chart, card), `dotkit/react`, documentation site, GitHub-only release workflow with build provenance.
