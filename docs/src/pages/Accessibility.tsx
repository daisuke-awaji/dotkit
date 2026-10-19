import { CodeBlock } from "../ui";
import { Card } from "dotkit/react";

/** Everything that moves, and what happens under `prefers-reduced-motion: reduce`. */
const motion: [what: string, how: string, reduced: string][] = [
  ["Button / Input / Checkbox / Radio / Switch", "hover・フォーカス・チェック時にドットが膨らむ、つまみが移動する（0.25〜0.35 秒）", "遷移なしで切り替わる"],
  ["Loader", "ドットの波（繰り返し）", "止まり、半透明のドットを表示"],
  ["Typing indicator", "3 つのドットが順に跳ねる（繰り返し）", "止まり、半透明のドットを表示"],
];

/** Behaviour under `forced-colors: active`. */
const forced: [what: string, how: string][] = [
  ["ドット枠（Border / Card / Input / Button outline / Checkbox / Radio / Switch）", "ドットの枠をやめ、1px の実線（CanvasText / ButtonText）にする"],
  ["Checkbox / Radio / Switch", "チェック時は Highlight で塗り、チェック印・つまみは HighlightText"],
  ["Dot text", "ドットをやめ、文字を実色で表示"],
  ["Meter / Bar chart / Heatmap / Uptime bar / Dot leaders / Divider", "ドットはそのまま、色だけシステムカラー（CanvasText / GrayText）にする。Heatmap は大きさでも値が読める"],
  ["Halftone", "非表示（装飾のため）"],
  ["Image halftone", "網点をやめ、元の画像を表示"],
  ["Typing indicator", "ドットを CanvasText に、吹き出しは 1px の枠線"],
];

export function Accessibility() {
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Accessibility &amp; Support</h1>
      <p className="muted">ドットは「装飾」です。情報やコントラストをドットだけに頼らないための仕組みを用意しています。</p>

      <h2>組み込みのフォールバック</h2>
      <table>
        <thead><tr><th>状況</th><th>dotkit の挙動</th></tr></thead>
        <tbody>
          <tr><td><code>forced-colors: active</code><br /><span className="muted">Windows ハイコントラスト等</span></td><td>ドットを実線・実色・システムカラーに置き換えます（下の表）。</td></tr>
          <tr><td><code>prefers-reduced-motion: reduce</code></td><td>繰り返すアニメーションと、ドットの遷移を止めます（下の表）。</td></tr>
          <tr><td>キーボード操作</td><td><code>:focus-visible</code> でドット状（dotted）のアウトラインを表示。Checkbox / Radio / Switch はネイティブの input なので、Tab・Space・矢印キーの操作はブラウザ標準のままです。</td></tr>
          <tr><td>スクリーンリーダー</td><td>React 版は Meter に <code>role="meter"</code> + <code>aria-value*</code>、BarChart / Heatmap / UptimeBar に <code>role="img"</code> + <code>label</code>、Loader / Typing に <code>role="status"</code>、Switch に <code>role="switch"</code>、Halftone と label なしの DotIcon に <code>aria-hidden</code> を付けます。</td></tr>
          <tr><td>色だけに頼らない</td><td>Uptime bar は状態を色に加えて列の高さ（5 / 3 / 1 ドット）でも表します。Heatmap は値を大きさと濃さの 2 つで表します。</td></tr>
        </tbody>
      </table>

      <h3>ハイコントラストモード（forced-colors）</h3>
      <table>
        <thead><tr><th>対象</th><th>挙動</th></tr></thead>
        <tbody>{forced.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
      </table>

      <h3>動き（prefers-reduced-motion）</h3>
      <p className="muted">dotkit の動きはすべてこの表にあります。新しく動きを追加するときも、ここに「減らす設定のときの挙動」を必ず書き足します。</p>
      <table>
        <thead><tr><th>対象</th><th>動き</th><th>動きを減らす設定のとき</th></tr></thead>
        <tbody>{motion.map(([a, b, c]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>)}</tbody>
      </table>

      <h2>使う側で気をつけること</h2>
      <ul>
        <li><b>ドット文字（.dk-text）は本文に使わない。</b>見出しや数値などの大きな文字に限定してください。小さいサイズでは判読性が落ちます。</li>
        <li><b>Halftone の中に要素を入れない。</b><code>filter</code> が中身にもかかり、文字が潰れます。背景として兄弟要素に重ねてください。Image halftone も同じで、中には画像（img / picture / video / canvas）だけを置きます。</li>
        <li><b>画像の代替テキスト。</b>Image halftone の <code>alt</code> は中の <code>&lt;img&gt;</code> に付けます。</li>
        <li><b>グラフには要約を付ける。</b>Heatmap / Uptime bar / Bar chart は 1 枚の画像として読み上げられます。<code>label</code>（<code>aria-label</code>）に「直近 90 日の稼働率 99.92%」のような要約を入れてください。</li>
        <li><b>ドット色のコントラスト。</b><code>--dk-mute</code> の枠は装飾扱いです。入力欄の境界など意味のある枠は、フォーカス時に <code>--dk-ink</code> へ切り替わります。Checkbox / Radio / Switch の枠は <code>--dk-subtle</code>（白地で 4.7:1）です。</li>
        <li><b>端数サイズ。</b>Hi-DPI 以外では 2.6px のような端数のドットがにじむことがあります。整数か 0.5 刻みを推奨します。</li>
      </ul>

      <h2>ブラウザサポート</h2>
      <p>dotkit が依存している CSS 機能です。いずれも主要ブラウザの現行版で利用できます。</p>
      <table>
        <thead><tr><th>機能</th><th>用途</th><th>未対応時</th></tr></thead>
        <tbody>
          <tr><td><code>@layer</code></td><td>詳細度の管理</td><td>—（必須）</td></tr>
          <tr><td><code>@property</code></td><td><code>--dk-size</code> / <code>--dk-gap</code> の遷移</td><td>hover 時に遷移せず切り替わる</td></tr>
          <tr><td><code>round()</code></td><td>Meter / Bar / Uptime のドット単位スナップ</td><td>スナップなしの幅 / 高さにフォールバック</td></tr>
          <tr><td><code>mask-composite</code></td><td>ドット枠</td><td>—（必須）</td></tr>
          <tr><td><code>background-clip: text</code></td><td>ドット文字</td><td>—（必須）</td></tr>
          <tr><td><code>color-mix()</code></td><td>Solid ボタンのドット色、Heatmap の濃淡</td><td>ドットが見えなくなる（部品自体は機能する）</td></tr>
          <tr><td><code>:has()</code></td><td>Dot leaders の行の判定、無効なラベルの色</td><td>リンク行（<code>.dk-leader</code>）の点線が出ない</td></tr>
          <tr><td><code>appearance: none</code> + 疑似要素</td><td>Checkbox / Radio / Switch</td><td>—（必須）</td></tr>
        </tbody>
      </table>
      <Card className="callout">
        <p>
          <b>検証状況：</b>Chromium で目視確認済みです（ライト / ダーク、ハイコントラストと「動きを減らす」はエミュレーション）。WebKit / Firefox での表示差異の検証と、
          Playwright によるビジュアルリグレッションは v1.0 までに整備します（<a href="https://github.com/daisuke-awaji/dotkit/blob/main/PLAN.md">PLAN.md</a>）。
          ハイコントラストモードの実機（Windows）での確認はまだです。
        </p>
      </Card>

      <h2>LLM / コーディングエージェント向け</h2>
      <p>クラス名・props の要約を <a href="./llms.txt">llms.txt</a> として配信しています。</p>
      <CodeBlock lang="sh">{`curl https://daisuke-awaji.github.io/dotkit/llms.txt`}</CodeBlock>
    </>
  );
}
