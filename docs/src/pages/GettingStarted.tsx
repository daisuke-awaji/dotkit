import { useState } from "react";
import { Card } from "dotkit/react";
import { Code, CodeBlock } from "../ui";
import { useT, type Lang } from "../i18n";
import pkg from "../../../package.json";

const V = pkg.version;
const REPO = "daisuke-awaji/dotkit";

const installs: [string, Record<Lang, string>, string][] = [
  [
    "Release tarball",
    {
      ja: "GitHub Releases に添付された tarball を直接指定します。git 不要で最も確実。npm / pnpm / yarn / bun で使えます。",
      en: "Point straight at the tarball attached to a GitHub Release. No git required and the most reliable option. Works with npm / pnpm / yarn / bun.",
    },
    `npm i https://github.com/${REPO}/releases/download/v${V}/dotkit-${V}.tgz`,
  ],
  [
    "git + semver",
    {
      ja: "ビルド済みの dist ブランチに打たれたタグを semver 範囲で解決します。範囲指定で追従したい場合に。",
      en: "Resolves tags on the prebuilt dist branch against a semver range. Use it when you want to follow a range.",
    },
    `npm i "github:${REPO}#semver:^${V.split(".").slice(0, 2).join(".")}"`,
  ],
  [
    "CDN",
    {
      ja: "バンドラなしで HTML に直接読み込みます。jsDelivr は GitHub のタグをそのまま配信します。",
      en: "Load it straight into HTML, no bundler. jsDelivr serves GitHub tags as-is.",
    },
    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/${REPO}@v${V}/dist/dotkit.css">

<!-- or always-latest from GitHub Pages -->
<link rel="stylesheet" href="https://daisuke-awaji.github.io/dotkit/dotkit.css">`,
  ],
];

export function GettingStarted() {
  const [tab, setTab] = useState(0);
  const t = useT();
  return (
    <>
      <span className="eyebrow">Guide</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Getting Started</h1>
      <p className="muted">
        {t(
          "dotkit は npm レジストリには公開していません。GitHub だけで導入できます。",
          "dotkit is not published to the npm registry. Everything installs from GitHub.",
        )}
      </p>

      <h2 id="install">1. Install</h2>
      <Card style={{ padding: 0, overflow: "hidden" }} className="example">
        <div className="example-bar" role="tablist" style={{ paddingTop: 10 }}>
          {installs.map(([name], i) => (
            <button key={name} role="tab" aria-selected={tab === i} className="tab" onClick={() => setTab(i)}>
              {name}
            </button>
          ))}
        </div>
        <p style={{ padding: "4px 20px 0", fontSize: 14 }} className="muted">{t(installs[tab][1].ja, installs[tab][1].en)}</p>
        <Code>{installs[tab][2]}</Code>
      </Card>
      <p>
        {t(
          <>
            パッケージは 1 つだけで、用途ごとに subpath を import します。React は optional peer dependency なので、
            CSS だけ使う場合は React が入りません。
          </>,
          <>
            There is a single package; import a subpath for what you need. React is an optional peer dependency,
            so a CSS-only setup never pulls in React.
          </>,
        )}
      </p>
      <table>
        <thead><tr><th>Import</th><th>{t("内容", "Contents")}</th></tr></thead>
        <tbody>
          <tr><td><code>dotkit/css</code></td><td>{t("本体 CSS（トークン・プリミティブ・コンポーネント・アイコン）", "The core CSS (tokens, primitives, components, icons)")}</td></tr>
          <tr><td><code>dotkit/react</code></td><td>{t("React コンポーネント（ESM + 型定義）", "React components (ESM + type definitions)")}</td></tr>
          <tr><td><code>dotkit/icons.json</code></td><td>{t("7×7 アイコンの元データ", "Source bitmaps for the 7×7 icons")}</td></tr>
          <tr><td><code>dotkit/glyphs.json</code></td><td>{t("5×7 の数字・記号の元データ（v0.3〜）", "Source bitmaps for the 5×7 digits and symbols (v0.3+)")}</td></tr>
        </tbody>
      </table>

      <h2 id="html">{t("2. HTML だけで使う", "2. Plain HTML")}</h2>
      <p>{t("クラスを付けるだけです。JavaScript は不要です。", "Just add classes. No JavaScript required.")}</p>
      <CodeBlock lang="html">{`<link rel="stylesheet" href="https://daisuke-awaji.github.io/dotkit/dotkit.css">

<div class="dk-card">
  <h3>Storage</h3>
  <div class="dk-meter" style="--dk-value: .62" role="meter"
       aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
  <button class="dk-btn dk-btn--solid">
    Deploy <span class="dk-icon dk-icon--arrow-right" aria-hidden="true"></span>
  </button>
</div>`}</CodeBlock>

      <h2 id="react">{t("3. React で使う", "3. With React")}</h2>
      <p>
        {t(
          <>
            CSS をアプリのエントリで 1 度だけ import し、コンポーネントを使います。どのコンポーネントも
            hooks を使っていないため、Next.js の Server Components でも <code>"use client"</code> は不要です。
          </>,
          <>
            Import the CSS once at your app entry, then use the components. None of them use hooks,
            so Next.js Server Components need no <code>"use client"</code>.
          </>,
        )}
      </p>
      <CodeBlock lang="tsx">{`// app/layout.tsx (Next.js) or main.tsx (Vite)
import "dotkit/css";`}</CodeBlock>
      <CodeBlock lang="tsx">{`import { Button, Card, DotIcon, Meter, buttonClassName } from "dotkit/react";
import Link from "next/link";

export default function Usage() {
  return (
    <Card>
      <Meter value={0.62} label="Storage" />
      <Button variant="solid">
        Deploy <DotIcon name="arrow-right" step={2} />
      </Button>
      {/* style any element as a button */}
      <Link href="/docs" className={buttonClassName({ variant: "outline" })}>Docs</Link>
    </Card>
  );
}`}</CodeBlock>

      <h2 id="tokens">4. Tokens</h2>
      <p>
        {t(
          <>見た目は CSS 変数で決まります。<code>:root</code> でも、任意の要素の <code>style</code> でも上書きできます。</>,
          <>The look is driven by CSS variables. Override them on <code>:root</code> or in any element’s <code>style</code>.</>,
        )}
      </p>
      <table>
        <thead><tr><th>Variable</th><th>Default</th><th>{t("説明", "Description")}</th></tr></thead>
        <tbody>
          <tr><td><code>--dk-size</code></td><td><code>2px</code></td><td>{t(<>ドットの直径（<code>@property</code> 登録済み・遷移可能）</>, <>Dot diameter (registered with <code>@property</code>, animatable)</>)}</td></tr>
          <tr><td><code>--dk-gap</code></td><td><code>6px</code></td><td>{t("ドット中心間の距離（遷移可能）", "Distance between dot centers (animatable)")}</td></tr>
          <tr><td><code>--dk-color</code></td><td><code>currentColor</code></td><td>{t("ドットの色", "Dot color")}</td></tr>
          <tr><td><code>--dk-value</code></td><td><code>.5</code></td><td>{t("Meter / Bar / Heatmap のセルなど、連続した値（0–1）", "A continuous value (0–1) for Meter / Bar / Heatmap cells and the like")}</td></tr>
          <tr><td><code>--dk-icon-step</code></td><td><code>3px</code></td><td>{t("アイコンと数字（Dot-matrix digits）のドット間隔。アイコン寸法 = step × 7", "Dot pitch for icons and dot-matrix digits. Icon size = step × 7")}</td></tr>
          <tr><td><code>--dk-tone</code></td><td><code>linear-gradient(…)</code></td><td>{t("ハーフトーンの階調（黒 = 最大のドット）", "Halftone tone ramp (black = largest dot)")}</td></tr>
          <tr><td><code>--dk-tone-filter</code></td><td><code>grayscale(1) contrast(1.4) brightness(.75)</code></td><td>{t("Image halftone で画像にかける filter", "Filter applied to the image in Image halftone")}</td></tr>
          <tr><td><code>--dk-control</code></td><td><code>18px</code></td><td>{t("Checkbox / Radio / Switch の高さ", "Height of Checkbox / Radio / Switch")}</td></tr>
          <tr><td><code>--dk-count</code> / <code>--dk-diameter</code></td><td><code>24</code> / <code>96px</code></td><td>{t("Ring meter のドット数と直径", "Dot count and diameter of the Ring meter")}</td></tr>
          <tr><td><code>--dk-color-2</code> / <code>--dk-angle</code></td><td><code>var(--dk-mute)</code> / <code>90deg</code></td><td>{t("Duotone の 2 色目と、ramp のグラデーションの向き", "Duotone’s second color and the direction of the ramp gradient")}</td></tr>
          <tr><td><code>--dk-cell</code> / <code>--dk-rows</code></td><td><code>12px</code> / <code>7</code></td><td>{t(<>Heatmap / Identicon のセルの大きさと、Heatmap の 1 列のセル数（<code>--dk-rows</code> は Uptime bar の高さにも使用）</>, <>Cell size for Heatmap / Identicon, and cells per Heatmap column (<code>--dk-rows</code> also sets the Uptime bar height)</>)}</td></tr>
          <tr><td><code>--dk-ink</code> / <code>--dk-paper</code></td><td><code>#0a0a0a</code> / <code>#fff</code></td><td>{t("前景 / 背景", "Foreground / background")}</td></tr>
          <tr><td><code>--dk-mute</code> / <code>--dk-subtle</code></td><td><code>#d4d4d4</code> / <code>#737373</code></td><td>{t("控えめなドット / 補助テキスト", "Muted dots / secondary text")}</td></tr>
          <tr><td><code>--dk-ok</code> / <code>--dk-warn</code> / <code>--dk-danger</code> / <code>--dk-info</code></td><td><code>#16a34a</code> / <code>#d97706</code> / <code>#dc2626</code> / <code>#2563eb</code></td><td>{t("状態を表す色（Uptime bar など）。ダークテーマでは明るい色に切り替わります", "Status colors (Uptime bar etc.). They switch to brighter shades in the dark theme")}</td></tr>
          <tr><td><code>--dk-radius</code></td><td><code>8px</code></td><td>{t("角丸の基準値", "Base corner radius")}</td></tr>
          <tr><td><code>--dk-font-mono</code></td><td><code>"Geist Mono", ui-monospace…</code></td><td>{t("ボタン・バッジ等の書体", "Typeface for buttons, badges and similar")}</td></tr>
        </tbody>
      </table>
      <p>
        {t(
          <>
            値の渡し方は 2 通りに統一しています。連続した値（割合・強さ）は <code>--dk-value</code>（0〜1）を <code>style</code> で、
            決まった状態（ok / warn / down など）は <code>data-state</code> 属性で渡します。
          </>,
          <>
            Values are passed in exactly two ways. Continuous values (ratios, intensities) go through <code>--dk-value</code> (0–1) in <code>style</code>;
            discrete states (ok / warn / down …) go through the <code>data-state</code> attribute.
          </>,
        )}
      </p>
      <CodeBlock lang="html">{`<div class="dk-meter" style="--dk-value: .62"></div>
<div class="dk-uptime"><i data-state="ok"></i><i data-state="down"></i></div>`}</CodeBlock>

      <h2 id="dark">5. Dark mode</h2>
      <p>
        {t(
          <>
            祖先に <code>.dk-theme-dark</code> を付けるとトークンが反転します（ハーフトーンも自動で白ドットになります）。
            このサイト左下のボタンで試せます。
          </>,
          <>
            Add <code>.dk-theme-dark</code> to an ancestor and the tokens invert (halftones switch to white dots automatically).
            Try it with the button at the bottom left of this site.
          </>,
        )}
      </p>
      <p>
        {t(
          <>
            ほかに配色のプリセットとして <code>.dk-theme-gameboy</code> / <code>.dk-theme-amber</code> / <code>.dk-theme-newsprint</code> /{" "}
            <code>.dk-theme-riso</code> / <code>.dk-theme-blueprint</code> があります（v0.3〜、<a href="#/catalog">Design Catalog</a> の Themes で一覧できます）。
          </>,
          <>
            Other palette presets: <code>.dk-theme-gameboy</code> / <code>.dk-theme-amber</code> / <code>.dk-theme-newsprint</code> /{" "}
            <code>.dk-theme-riso</code> / <code>.dk-theme-blueprint</code> (v0.3+, all shown under Themes in the <a href="#/catalog">Design Catalog</a>).
          </>,
        )}
      </p>
      <CodeBlock lang="html">{`<html class="dk-theme-dark"> … </html>

<!-- or just one part of the page -->
<section class="dk-theme-dark"> … </section>`}</CodeBlock>
      <p className="muted" style={{ fontSize: 14 }}>
        {t(
          <>テーマのクラスを付けた要素は、自分自身の文字色（<code>--dk-ink</code>）と背景色（<code>--dk-paper</code>）も塗ります。そのため、ページの一部だけに付けても使えます。</>,
          <>An element with a theme class also paints its own text color (<code>--dk-ink</code>) and background (<code>--dk-paper</code>), so it works on just part of a page.</>,
        )}
      </p>

      <h2 id="override">{t("6. 上書きとカスタマイズ", "6. Overrides and customization")}</h2>
      <p>
        {t(
          <>
            dotkit のスタイルはすべて <code>@layer dotkit.base, dotkit.components, dotkit.utilities</code> の中にあります。
            レイヤー外に書いたあなたの CSS は、詳細度に関係なく常に dotkit より優先されます。
          </>,
          <>
            All dotkit styles live inside <code>@layer dotkit.base, dotkit.components, dotkit.utilities</code>.
            Any CSS you write outside a layer always beats dotkit, whatever its specificity.
          </>,
        )}
      </p>
      <CodeBlock lang="css">{`/* no !important needed */
.dk-btn--solid { --dk-size: 2px; border-radius: 999px; }

/* brand-colored dots */
.hero-dots { --dk-color: #0070f3; --dk-gap: 8px; }`}</CodeBlock>
      <Card className="callout">
        <p>
          {t(
            <>
              <b>注意：グローバルなリセット CSS。</b> <code>{"a { color: inherit }"}</code> のような要素セレクタのリセットも
              レイヤー外に書くと dotkit に勝ってしまい、<code>&lt;a class="dk-btn dk-btn--solid"&gt;</code> の文字色が消える等の原因になります。
              リセットは dotkit より<b>前に宣言した</b>レイヤーに入れてください（このサイトもそうしています）。
            </>,
            <>
              <b>Watch out for global reset CSS.</b> An element-selector reset such as <code>{"a { color: inherit }"}</code> written
              outside a layer also beats dotkit, and can, for example, wipe out the text color of <code>&lt;a class="dk-btn dk-btn--solid"&gt;</code>.
              Put resets in a layer <b>declared before</b> dotkit (this site does exactly that).
            </>,
          )}
        </p>
      </Card>
      <CodeBlock lang="css">{`/* load this BEFORE dotkit.css */
@layer reset, dotkit;

@layer reset {
  a { color: inherit; }
  button { font: inherit; }
}`}</CodeBlock>

      <h2 id="verify">{t("7. 配布物の検証", "7. Verifying releases")}</h2>
      <p>
        {t(
          <>
            Release の tarball は GitHub Actions 上でビルドされ、
            <a href="https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations">Artifact Attestations</a>
            で署名されています。GitHub CLI で出自を確認できます。
          </>,
          <>
            Release tarballs are built on GitHub Actions and signed with{" "}
            <a href="https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations">Artifact Attestations</a>.
            Check their provenance with the GitHub CLI.
          </>,
        )}
      </p>
      <CodeBlock lang="sh">{`gh release download v${V} -R ${REPO} -p "dotkit-${V}.tgz"
gh attestation verify dotkit-${V}.tgz -R ${REPO}`}</CodeBlock>
    </>
  );
}
