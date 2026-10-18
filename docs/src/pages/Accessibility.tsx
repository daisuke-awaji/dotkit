import { CodeBlock } from "../ui";
import { Card } from "dotkit/react";

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
          <tr><td><code>forced-colors: active</code><br /><span className="muted">Windows ハイコントラスト等</span></td><td>ドット枠は実線（<code>CanvasText</code> / <code>ButtonText</code>）に、ドット文字は実色に、メーター・バーはシステムカラーのドットに切り替え。ハーフトーンは非表示。</td></tr>
          <tr><td><code>prefers-reduced-motion: reduce</code></td><td>Loader のアニメーションと、ボタン / 入力欄のドット遷移を停止。</td></tr>
          <tr><td>キーボード操作</td><td><code>:focus-visible</code> でドット状（dotted）のアウトラインを表示。</td></tr>
          <tr><td>スクリーンリーダー</td><td>React 版は Meter に <code>role="meter"</code> + <code>aria-value*</code>、BarChart に <code>role="img"</code> + <code>label</code>、Loader に <code>role="status"</code>、Halftone と label なしの DotIcon に <code>aria-hidden</code> を付与。</td></tr>
        </tbody>
      </table>

      <h2>使う側で気をつけること</h2>
      <ul>
        <li><b>ドット文字（.dk-text）は本文に使わない。</b>見出しや数値などの大きな文字に限定してください。小さいサイズでは判読性が落ちます。</li>
        <li><b>Halftone の中に要素を入れない。</b><code>filter</code> が中身にもかかり、文字が潰れます。背景として兄弟要素に重ねてください。</li>
        <li><b>ドット色のコントラスト。</b><code>--dk-mute</code> の枠は装飾扱いです。入力欄の境界など意味のある枠は、フォーカス時に <code>--dk-ink</code> へ切り替わります。</li>
        <li><b>端数サイズ。</b>Hi-DPI 以外では 2.6px のような端数のドットがにじむことがあります。整数か 0.5 刻みを推奨します。</li>
      </ul>

      <h2>ブラウザサポート</h2>
      <p>dotkit が依存している CSS 機能です。いずれも主要ブラウザの現行版で利用できます。</p>
      <table>
        <thead><tr><th>機能</th><th>用途</th><th>未対応時</th></tr></thead>
        <tbody>
          <tr><td><code>@layer</code></td><td>詳細度の管理</td><td>—（必須）</td></tr>
          <tr><td><code>@property</code></td><td><code>--dk-size</code> / <code>--dk-gap</code> の遷移</td><td>hover 時に遷移せず切り替わる</td></tr>
          <tr><td><code>round()</code></td><td>Meter / Bar のドット単位スナップ</td><td>スナップなしの幅 / 高さにフォールバック</td></tr>
          <tr><td><code>mask-composite</code></td><td>ドット枠</td><td>—（必須）</td></tr>
          <tr><td><code>background-clip: text</code></td><td>ドット文字</td><td>—（必須）</td></tr>
          <tr><td><code>color-mix()</code></td><td>Solid ボタンのドット色</td><td>ドットが見えなくなる（ボタン自体は機能する）</td></tr>
        </tbody>
      </table>
      <Card className="callout">
        <p>
          <b>v0.1 時点の検証状況：</b>Chromium で目視確認済みです。WebKit / Firefox での表示差異の検証と、
          Playwright によるビジュアルリグレッションは v1.0 までに整備します（<a href="https://github.com/daisuke-awaji/dotkit/blob/main/PLAN.md">PLAN.md</a>）。
          ハイコントラストモードのフォールバックは実装済みですが、実機での確認はまだです。
        </p>
      </Card>

      <h2>LLM / コーディングエージェント向け</h2>
      <p>クラス名・props の要約を <a href="./llms.txt">llms.txt</a> として配信しています。</p>
      <CodeBlock lang="sh">{`curl https://daisuke-awaji.github.io/dotkit/llms.txt`}</CodeBlock>
    </>
  );
}
