import { useState } from "react";
import { Card } from "dotkit/react";
import { Code, CodeBlock, Toc } from "../ui";
import pkg from "../../../package.json";

const V = pkg.version;
const REPO = "daisuke-awaji/dotkit";

const installs: [string, string, string][] = [
  [
    "Release tarball",
    "GitHub Releases に添付された tarball を直接指定します。git 不要で最も確実。npm / pnpm / yarn / bun で使えます。",
    `npm i https://github.com/${REPO}/releases/download/v${V}/dotkit-${V}.tgz`,
  ],
  [
    "git + semver",
    "ビルド済みの dist ブランチに打たれたタグを semver 範囲で解決します。範囲指定で追従したい場合に。",
    `npm i "github:${REPO}#semver:^${V.split(".").slice(0, 2).join(".")}"`,
  ],
  [
    "CDN",
    "バンドラなしで HTML に直接読み込みます。jsDelivr は GitHub のタグをそのまま配信します。",
    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/${REPO}@v${V}/dist/dotkit.css">

<!-- or always-latest from GitHub Pages -->
<link rel="stylesheet" href="https://daisuke-awaji.github.io/dotkit/dotkit.css">`,
  ],
];

export function GettingStarted() {
  const [tab, setTab] = useState(0);
  return (
    <>
      <span className="eyebrow">Guide</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Getting Started</h1>
      <p className="muted">dotkit は npm レジストリには公開していません。GitHub だけで導入できます。</p>
      <Toc
        items={[
          ["install", "Install"],
          ["html", "HTML"],
          ["react", "React"],
          ["tokens", "Tokens"],
          ["dark", "Dark mode"],
          ["override", "Override"],
          ["verify", "Verify"],
        ]}
      />

      <h2 id="install">1. Install</h2>
      <Card style={{ padding: 0, overflow: "hidden" }} className="example">
        <div className="example-bar" role="tablist" style={{ paddingTop: 10 }}>
          {installs.map(([name], i) => (
            <button key={name} role="tab" aria-selected={tab === i} className="tab" onClick={() => setTab(i)}>
              {name}
            </button>
          ))}
        </div>
        <p style={{ padding: "4px 20px 0", fontSize: 14 }} className="muted">{installs[tab][1]}</p>
        <Code>{installs[tab][2]}</Code>
      </Card>
      <p>
        パッケージは 1 つだけで、用途ごとに subpath を import します。React は optional peer dependency なので、
        CSS だけ使う場合は React が入りません。
      </p>
      <table>
        <thead><tr><th>Import</th><th>内容</th></tr></thead>
        <tbody>
          <tr><td><code>dotkit/css</code></td><td>本体 CSS（トークン・プリミティブ・コンポーネント・アイコン）</td></tr>
          <tr><td><code>dotkit/react</code></td><td>React コンポーネント（ESM + 型定義）</td></tr>
          <tr><td><code>dotkit/icons.json</code></td><td>7×7 アイコンの元データ</td></tr>
          <tr><td><code>dotkit/glyphs.json</code></td><td>5×7 の数字・記号の元データ（v0.3〜）</td></tr>
        </tbody>
      </table>

      <h2 id="html">2. HTML だけで使う</h2>
      <p>クラスを付けるだけです。JavaScript は不要です。</p>
      <CodeBlock lang="html">{`<link rel="stylesheet" href="https://daisuke-awaji.github.io/dotkit/dotkit.css">

<div class="dk-card">
  <h3>Storage</h3>
  <div class="dk-meter" style="--dk-value: .62" role="meter"
       aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"></div>
  <button class="dk-btn dk-btn--solid">
    Deploy <span class="dk-icon dk-icon--arrow-right" aria-hidden="true"></span>
  </button>
</div>`}</CodeBlock>

      <h2 id="react">3. React で使う</h2>
      <p>
        CSS をアプリのエントリで 1 度だけ import し、コンポーネントを使います。どのコンポーネントも
        hooks を使っていないため、Next.js の Server Components でも <code>"use client"</code> は不要です。
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
      <p>見た目は CSS 変数で決まります。<code>:root</code> でも、任意の要素の <code>style</code> でも上書きできます。</p>
      <table>
        <thead><tr><th>Variable</th><th>Default</th><th>説明</th></tr></thead>
        <tbody>
          <tr><td><code>--dk-size</code></td><td><code>2px</code></td><td>ドットの直径（<code>@property</code> 登録済み・遷移可能）</td></tr>
          <tr><td><code>--dk-gap</code></td><td><code>6px</code></td><td>ドット中心間の距離（遷移可能）</td></tr>
          <tr><td><code>--dk-color</code></td><td><code>currentColor</code></td><td>ドットの色</td></tr>
          <tr><td><code>--dk-value</code></td><td><code>.5</code></td><td>Meter / Bar / Heatmap のセルなど、連続した値（0–1）</td></tr>
          <tr><td><code>--dk-icon-step</code></td><td><code>3px</code></td><td>アイコンと数字（Dot-matrix digits）のドット間隔。アイコン寸法 = step × 7</td></tr>
          <tr><td><code>--dk-tone</code></td><td><code>linear-gradient(…)</code></td><td>ハーフトーンの階調（黒 = 最大のドット）</td></tr>
          <tr><td><code>--dk-tone-filter</code></td><td><code>grayscale(1) contrast(1.4) brightness(.75)</code></td><td>Image halftone で画像にかける filter</td></tr>
          <tr><td><code>--dk-control</code></td><td><code>18px</code></td><td>Checkbox / Radio / Switch の高さ</td></tr>
          <tr><td><code>--dk-cell</code> / <code>--dk-rows</code></td><td><code>12px</code> / <code>7</code></td><td>Heatmap / Identicon のセルの大きさと、Heatmap の 1 列のセル数（<code>--dk-rows</code> は Uptime bar の高さにも使用）</td></tr>
          <tr><td><code>--dk-ink</code> / <code>--dk-paper</code></td><td><code>#0a0a0a</code> / <code>#fff</code></td><td>前景 / 背景</td></tr>
          <tr><td><code>--dk-mute</code> / <code>--dk-subtle</code></td><td><code>#d4d4d4</code> / <code>#737373</code></td><td>控えめなドット / 補助テキスト</td></tr>
          <tr><td><code>--dk-ok</code> / <code>--dk-warn</code> / <code>--dk-danger</code> / <code>--dk-info</code></td><td><code>#16a34a</code> / <code>#d97706</code> / <code>#dc2626</code> / <code>#2563eb</code></td><td>状態を表す色（Uptime bar など）。ダークテーマでは明るい色に切り替わります</td></tr>
          <tr><td><code>--dk-radius</code></td><td><code>8px</code></td><td>角丸の基準値</td></tr>
          <tr><td><code>--dk-font-mono</code></td><td><code>"Geist Mono", ui-monospace…</code></td><td>ボタン・バッジ等の書体</td></tr>
        </tbody>
      </table>
      <p>
        値の渡し方は 2 通りに統一しています。連続した値（割合・強さ）は <code>--dk-value</code>（0〜1）を <code>style</code> で、
        決まった状態（ok / warn / down など）は <code>data-state</code> 属性で渡します。
      </p>
      <CodeBlock lang="html">{`<div class="dk-meter" style="--dk-value: .62"></div>
<div class="dk-uptime"><i data-state="ok"></i><i data-state="down"></i></div>`}</CodeBlock>

      <h2 id="dark">5. Dark mode</h2>
      <p>
        祖先に <code>.dk-theme-dark</code> を付けるとトークンが反転します（ハーフトーンも自動で白ドットになります）。
        このサイト左下のボタンで試せます。
      </p>
      <p>
        ほかに配色のプリセットとして <code>.dk-theme-gameboy</code> / <code>.dk-theme-amber</code> / <code>.dk-theme-newsprint</code> /{" "}
        <code>.dk-theme-riso</code> / <code>.dk-theme-blueprint</code> があります（v0.3〜、<a href="#/catalog">Design Catalog</a> の Themes で一覧できます）。
      </p>
      <CodeBlock lang="html">{`<html class="dk-theme-dark"> … </html>

<!-- or just one part of the page -->
<section class="dk-theme-dark"> … </section>`}</CodeBlock>
      <p className="muted" style={{ fontSize: 14 }}>
        テーマのクラスを付けた要素は、自分自身の文字色（<code>--dk-ink</code>）と背景色（<code>--dk-paper</code>）も塗ります。そのため、ページの一部だけに付けても使えます。
      </p>

      <h2 id="override">6. 上書きとカスタマイズ</h2>
      <p>
        dotkit のスタイルはすべて <code>@layer dotkit.base, dotkit.components, dotkit.utilities</code> の中にあります。
        レイヤー外に書いたあなたの CSS は、詳細度に関係なく常に dotkit より優先されます。
      </p>
      <CodeBlock lang="css">{`/* no !important needed */
.dk-btn--solid { --dk-size: 2px; border-radius: 999px; }

/* brand-colored dots */
.hero-dots { --dk-color: #0070f3; --dk-gap: 8px; }`}</CodeBlock>
      <Card className="callout">
        <p>
          <b>注意：グローバルなリセット CSS。</b> <code>{"a { color: inherit }"}</code> のような要素セレクタのリセットも
          レイヤー外に書くと dotkit に勝ってしまい、<code>&lt;a class="dk-btn dk-btn--solid"&gt;</code> の文字色が消える等の原因になります。
          リセットは dotkit より<b>前に宣言した</b>レイヤーに入れてください（このサイトもそうしています）。
        </p>
      </Card>
      <CodeBlock lang="css">{`/* load this BEFORE dotkit.css */
@layer reset, dotkit;

@layer reset {
  a { color: inherit; }
  button { font: inherit; }
}`}</CodeBlock>

      <h2 id="verify">7. 配布物の検証</h2>
      <p>
        Release の tarball は GitHub Actions 上でビルドされ、
        <a href="https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations">Artifact Attestations</a>
        で署名されています。GitHub CLI で出自を確認できます。
      </p>
      <CodeBlock lang="sh">{`gh release download v${V} -R ${REPO} -p "dotkit-${V}.tgz"
gh attestation verify dotkit-${V}.tgz -R ${REPO}`}</CodeBlock>
    </>
  );
}
