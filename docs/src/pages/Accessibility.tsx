import { CodeBlock } from "../ui";
import { Card } from "dotkit/react";
import { useT } from "../i18n";

/** Everything that moves, and what happens under `prefers-reduced-motion: reduce`. */
const motion: [what: string, how: string, reduced: string][] = [
  ["Button / Input / Checkbox / Radio / Switch", "hover・フォーカス・チェック時にドットが膨らむ、つまみが移動する（0.25〜0.35 秒）", "遷移なしで切り替わる"],
  ["Loader", "ドットの波（繰り返し）", "止まり、半透明のドットを表示"],
  ["Typing indicator", "3 つのドットが順に跳ねる（繰り返し）", "止まり、半透明のドットを表示"],
  ["Marching border", "枠のドットが時計回りに流れる（繰り返し）", "止まる（枠は表示したまま）"],
  ["Skeleton", "明るさの帯が横に流れる（繰り返し）", "止まる"],
  ["Status dot（pulse）", "ドットから波紋が広がる（繰り返し）", "止まる"],
  ["Tabs / Pagination dots", "選択時に下線のドットが膨らむ、現在のドットが伸びる（0.25〜0.3 秒）", "遷移なしで切り替わる"],
  ["Dialog", "開くときに少し浮き上がる・背景が現れる（0.28 秒）", "アニメーションなしで開く"],
  ["Range", "ドラッグ中につまみが少し大きくなる", "遷移なし"],
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
  ["Sparkline / Pictogram / Dot-matrix digits", "ドットを CanvasText にする"],
  ["Stepper", "完了と現在の印を CanvasText、現在の印は Highlight、未完了は GrayText"],
  ["Status dot", "ドットを CanvasText にする（down の四角、idle の輪で状態を区別）"],
  ["Skeleton", "ドットを GrayText にする"],
  ["Identicon", "模様を CanvasText、背景を Canvas にし、1px の枠線を付ける"],
  ["Ring meter / Range", "点いたドットを CanvasText、消えたドットを GrayText にする"],
  ["Tabs / Pagination dots", "選択中の下線を Highlight、ほかを GrayText にする"],
  ["Alert / Dialog", "1px の実線の枠を付ける（Alert の帯は CanvasText のドット）"],
  ["Halftone text", "網点をやめ、文字を実色で表示"],
  ["Pattern / Duotone", "ドットを GrayText にする"],
];

/** English for the table cells above (keys must match exactly). */
const EN: Record<string, string> = {
  "hover・フォーカス・チェック時にドットが膨らむ、つまみが移動する（0.25〜0.35 秒）": "Dots swell and thumbs slide on hover, focus and check (0.25–0.35 s)",
  "遷移なしで切り替わる": "Switches instantly, no transition",
  "ドットの波（繰り返し）": "A wave through the dots (looping)",
  "止まり、半透明のドットを表示": "Stops and shows translucent dots",
  "3 つのドットが順に跳ねる（繰り返し）": "Three dots bounce in turn (looping)",
  "枠のドットが時計回りに流れる（繰り返し）": "Frame dots flow clockwise (looping)",
  "止まる（枠は表示したまま）": "Stops (the frame stays visible)",
  "明るさの帯が横に流れる（繰り返し）": "A band of light sweeps across (looping)",
  "止まる": "Stops",
  "Status dot（pulse）": "Status dot (pulse)",
  "ドットから波紋が広がる（繰り返し）": "A ripple spreads from the dot (looping)",
  "選択時に下線のドットが膨らむ、現在のドットが伸びる（0.25〜0.3 秒）": "Underline dots swell on selection; the current dot stretches (0.25–0.3 s)",
  "開くときに少し浮き上がる・背景が現れる（0.28 秒）": "Rises slightly and the backdrop fades in on open (0.28 s)",
  "アニメーションなしで開く": "Opens without animation",
  "ドラッグ中につまみが少し大きくなる": "The thumb grows slightly while dragging",
  "遷移なし": "No transition",
  "ドット枠（Border / Card / Input / Button outline / Checkbox / Radio / Switch）": "Dotted frames (Border / Card / Input / Button outline / Checkbox / Radio / Switch)",
  "ドットの枠をやめ、1px の実線（CanvasText / ButtonText）にする": "Replaces the dotted frame with a solid 1px line (CanvasText / ButtonText)",
  "チェック時は Highlight で塗り、チェック印・つまみは HighlightText": "Filled with Highlight when checked; the check mark and thumb use HighlightText",
  "ドットをやめ、文字を実色で表示": "Drops the dots and shows the text in a solid color",
  "ドットはそのまま、色だけシステムカラー（CanvasText / GrayText）にする。Heatmap は大きさでも値が読める": "Keeps the dots but switches them to system colors (CanvasText / GrayText). Heatmap values stay readable through size",
  "非表示（装飾のため）": "Hidden (it is decorative)",
  "網点をやめ、元の画像を表示": "Drops the halftone and shows the original image",
  "ドットを CanvasText に、吹き出しは 1px の枠線": "Dots become CanvasText; the bubble gets a 1px border",
  "ドットを CanvasText にする": "Dots become CanvasText",
  "完了と現在の印を CanvasText、現在の印は Highlight、未完了は GrayText": "Done and current markers use CanvasText, the current marker Highlight, pending ones GrayText",
  "ドットを CanvasText にする（down の四角、idle の輪で状態を区別）": "Dots become CanvasText (states stay distinct: down is a square, idle a ring)",
  "ドットを GrayText にする": "Dots become GrayText",
  "模様を CanvasText、背景を Canvas にし、1px の枠線を付ける": "Pattern in CanvasText on Canvas, with a 1px border",
  "点いたドットを CanvasText、消えたドットを GrayText にする": "Lit dots become CanvasText, unlit ones GrayText",
  "選択中の下線を Highlight、ほかを GrayText にする": "The selected underline uses Highlight, the rest GrayText",
  "1px の実線の枠を付ける（Alert の帯は CanvasText のドット）": "Adds a solid 1px frame (Alert’s stripe uses CanvasText dots)",
  "網点をやめ、文字を実色で表示": "Drops the halftone and shows the text in a solid color",
};

export function Accessibility() {
  const t = useT();
  const tr = (ja: string) => t(ja, EN[ja] ?? ja);
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Accessibility &amp; Support</h1>
      <p className="muted">
        {t(
          "ドットは「装飾」です。情報やコントラストをドットだけに頼らないための仕組みを用意しています。",
          "Dots are decoration. dotkit has mechanisms so that information and contrast never depend on dots alone.",
        )}
      </p>

      <h2>{t("組み込みのフォールバック", "Built-in fallbacks")}</h2>
      <table>
        <thead><tr><th>{t("状況", "Situation")}</th><th>{t("dotkit の挙動", "What dotkit does")}</th></tr></thead>
        <tbody>
          <tr>
            <td><code>forced-colors: active</code><br /><span className="muted">{t("Windows ハイコントラスト等", "Windows High Contrast etc.")}</span></td>
            <td>{t("ドットを実線・実色・システムカラーに置き換えます（下の表）。", "Replaces dots with solid lines, solid colors and system colors (table below).")}</td>
          </tr>
          <tr>
            <td><code>prefers-reduced-motion: reduce</code></td>
            <td>{t("繰り返すアニメーションと、ドットの遷移を止めます（下の表）。", "Stops looping animations and dot transitions (table below).")}</td>
          </tr>
          <tr>
            <td>{t("キーボード操作", "Keyboard")}</td>
            <td>
              {t(
                <><code>:focus-visible</code> でドット状（dotted）のアウトラインを表示。Checkbox / Radio / Switch はネイティブの input なので、Tab・Space・矢印キーの操作はブラウザ標準のままです。</>,
                <>Shows a dotted outline on <code>:focus-visible</code>. Checkbox / Radio / Switch are native inputs, so Tab, Space and arrow keys keep the browser’s standard behavior.</>,
              )}
            </td>
          </tr>
          <tr>
            <td>{t("スクリーンリーダー", "Screen readers")}</td>
            <td>
              {t(
                <>React 版は Meter / RingMeter に <code>role="meter"</code> + <code>aria-value*</code>、BarChart / Heatmap / UptimeBar に <code>role="img"</code> + <code>label</code>（Sparkline / Pictogram / DotDigits も同様）、Loader / Typing に <code>role="status"</code>、Switch に <code>role="switch"</code>、TabList / Tab に <code>role="tablist"</code> / <code>role="tab"</code> + <code>aria-selected</code>、Halftone と label なしの DotIcon に <code>aria-hidden</code> を付けます。Dialog はネイティブの <code>&lt;dialog&gt;</code> なので、フォーカスの閉じ込めと Esc での終了はブラウザが行います。</>,
                <>The React components add <code>role="meter"</code> + <code>aria-value*</code> to Meter / RingMeter, <code>role="img"</code> + <code>label</code> to BarChart / Heatmap / UptimeBar (and Sparkline / Pictogram / DotDigits), <code>role="status"</code> to Loader / Typing, <code>role="switch"</code> to Switch, <code>role="tablist"</code> / <code>role="tab"</code> + <code>aria-selected</code> to TabList / Tab, and <code>aria-hidden</code> to Halftone and to DotIcon without a label. Dialog is the native <code>&lt;dialog&gt;</code>, so the browser handles focus trapping and closing with Esc.</>,
              )}
            </td>
          </tr>
          <tr>
            <td>{t("色だけに頼らない", "Not color alone")}</td>
            <td>
              {t(
                "Uptime bar は状態を色に加えて列の高さ（5 / 3 / 1 ドット）でも表します。Heatmap は値を大きさと濃さの 2 つで表します。Status dot は down を四角、idle を輪の形にし、説明文を必ず添えます。",
                "Uptime bar shows state through column height (5 / 3 / 1 dots) as well as color. Heatmap encodes values in both size and tone. Status dot draws down as a square and idle as a ring, and always comes with a caption.",
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <h3>{t("ハイコントラストモード（forced-colors）", "High contrast mode (forced-colors)")}</h3>
      <table>
        <thead><tr><th>{t("対象", "Target")}</th><th>{t("挙動", "Behavior")}</th></tr></thead>
        <tbody>{forced.map(([a, b]) => <tr key={a}><td>{tr(a)}</td><td>{tr(b)}</td></tr>)}</tbody>
      </table>

      <h3>{t("動き（prefers-reduced-motion）", "Motion (prefers-reduced-motion)")}</h3>
      <p className="muted">
        {t(
          "dotkit の動きはすべてこの表にあります。新しく動きを追加するときも、ここに「減らす設定のときの挙動」を必ず書き足します。",
          "Every motion in dotkit is listed here. Any new motion must be added here too, together with its reduced-motion behavior.",
        )}
      </p>
      <table>
        <thead><tr><th>{t("対象", "Target")}</th><th>{t("動き", "Motion")}</th><th>{t("動きを減らす設定のとき", "With reduced motion")}</th></tr></thead>
        <tbody>{motion.map(([a, b, c]) => <tr key={a}><td>{tr(a)}</td><td>{tr(b)}</td><td>{tr(c)}</td></tr>)}</tbody>
      </table>

      <h2>{t("使う側で気をつけること", "Things to watch for")}</h2>
      {t(
        <ul>
          <li><b>ドット文字（.dk-text）は本文に使わない。</b>見出しや数値などの大きな文字に限定してください。小さいサイズでは判読性が落ちます。</li>
          <li><b>Halftone の中に要素を入れない。</b><code>filter</code> が中身にもかかり、文字が潰れます。背景として兄弟要素に重ねてください。Image halftone も同じで、中には画像（img / picture / video / canvas）だけを置きます。</li>
          <li><b>画像の代替テキスト。</b>Image halftone の <code>alt</code> は中の <code>&lt;img&gt;</code> に付けます。</li>
          <li><b>グラフには要約を付ける。</b>Heatmap / Uptime bar / Bar chart は 1 枚の画像として読み上げられます。<code>label</code>（<code>aria-label</code>）に「直近 90 日の稼働率 99.92%」のような要約を入れてください。</li>
          <li><b>ドット色のコントラスト。</b><code>--dk-mute</code> の枠は装飾扱いです。入力欄の境界など意味のある枠は、フォーカス時に <code>--dk-ink</code> へ切り替わります。Checkbox / Radio / Switch の枠は <code>--dk-subtle</code>（白地で 4.7:1）です。</li>
          <li><b>タブのキーボード操作。</b>TabList / Tab は見た目と ARIA 属性だけを担当します。矢印キーでの移動とパネルの切り替えは利用側で実装してください（Design Catalog の Tabs に例があります）。</li>
          <li><b>Range の塗り。</b>CSS から input の値は読めないため、<code>--dk-value</code> を更新しないと塗りが追従しません。React では制御コンポーネントとして使ってください。</li>
          <li><b>端数サイズ。</b>Hi-DPI 以外では 2.6px のような端数のドットがにじむことがあります。整数か 0.5 刻みを推奨します。</li>
        </ul>,
        <ul>
          <li><b>Don’t use dot text (.dk-text) for body copy.</b> Keep it to large type such as headings and numbers; legibility drops at small sizes.</li>
          <li><b>Don’t put elements inside Halftone.</b> Its <code>filter</code> applies to the content too and crushes text. Layer it as a sibling behind the content. The same goes for Image halftone: put only media (img / picture / video / canvas) inside.</li>
          <li><b>Alternative text for images.</b> Image halftone’s <code>alt</code> goes on the inner <code>&lt;img&gt;</code>.</li>
          <li><b>Give charts a summary.</b> Heatmap / Uptime bar / Bar chart are announced as a single image. Put a summary such as “99.92% uptime over the last 90 days” in <code>label</code> (<code>aria-label</code>).</li>
          <li><b>Dot color contrast.</b> <code>--dk-mute</code> frames are treated as decoration. Meaningful frames, like input borders, switch to <code>--dk-ink</code> on focus. Checkbox / Radio / Switch frames use <code>--dk-subtle</code> (4.7:1 on white).</li>
          <li><b>Keyboard handling for tabs.</b> TabList / Tab only provide the look and ARIA attributes. Implement arrow-key movement and panel switching yourself (see Tabs in the Design Catalog for an example).</li>
          <li><b>Range fill.</b> CSS cannot read an input’s value, so the fill only follows if <code>--dk-value</code> is updated. In React, use it as a controlled component.</li>
          <li><b>Fractional sizes.</b> On non-Hi-DPI screens, fractional dots such as 2.6px can blur. Integers or 0.5 steps are recommended.</li>
        </ul>,
      )}

      <h2>{t("ブラウザサポート", "Browser support")}</h2>
      <p>{t("dotkit が依存している CSS 機能です。いずれも主要ブラウザの現行版で利用できます。", "The CSS features dotkit relies on. All are available in current versions of the major browsers.")}</p>
      <table>
        <thead><tr><th>{t("機能", "Feature")}</th><th>{t("用途", "Used for")}</th><th>{t("未対応時", "Without it")}</th></tr></thead>
        <tbody>
          <tr><td><code>@layer</code></td><td>{t("詳細度の管理", "Managing specificity")}</td><td>{t("—（必須）", "— (required)")}</td></tr>
          <tr><td><code>@property</code></td><td>{t(<><code>--dk-size</code> / <code>--dk-gap</code> の遷移</>, <>Transitions of <code>--dk-size</code> / <code>--dk-gap</code></>)}</td><td>{t("hover 時に遷移せず切り替わる", "Hover switches instantly instead of animating")}</td></tr>
          <tr><td><code>round()</code></td><td>{t("Meter / Bar / Uptime / Range / Ring meter のドット単位スナップ", "Snapping Meter / Bar / Uptime / Range / Ring meter to whole dots")}</td><td>{t("スナップなしの幅 / 高さにフォールバック（Ring meter は端数のドットが中間の濃さになる）", "Falls back to unsnapped width / height (Ring meter shows the fractional dot at an in-between tone)")}</td></tr>
          <tr><td><code>mask-composite</code></td><td>{t("ドット枠", "Dotted frames")}</td><td>{t("—（必須）", "— (required)")}</td></tr>
          <tr><td><code>background-clip: text</code></td><td>{t("ドット文字", "Dot text")}</td><td>{t("—（必須）", "— (required)")}</td></tr>
          <tr><td><code>color-mix()</code></td><td>{t("Solid ボタンのドット色、Heatmap の濃淡", "Solid button dot color, Heatmap tones")}</td><td>{t("ドットが見えなくなる（部品自体は機能する）", "Dots disappear (the components still work)")}</td></tr>
          <tr><td><code>:has()</code></td><td>{t("Dot leaders の行の判定、無効なラベルの色", "Detecting Dot leaders rows, disabled label color")}</td><td>{t(<>リンク行（<code>.dk-leader</code>）の点線が出ない</>, <>No dotted line on link rows (<code>.dk-leader</code>)</>)}</td></tr>
          <tr><td><code>appearance: none</code> {t("+ 疑似要素", "+ pseudo-elements")}</td><td>Checkbox / Radio / Switch / Range</td><td>{t("—（必須）", "— (required)")}</td></tr>
          <tr><td><code>&lt;dialog&gt;</code> / <code>::backdrop</code></td><td>Dialog</td><td>{t("—（必須）", "— (required)")}</td></tr>
          <tr><td><code>background-blend-mode</code> + <code>filter</code></td><td>Halftone text</td><td>{t("—（必須）", "— (required)")}</td></tr>
        </tbody>
      </table>
      <Card className="callout">
        <p>
          {t(
            <>
              <b>検証状況：</b>Chromium で目視確認済みです（ライト / ダーク、ハイコントラストと「動きを減らす」はエミュレーション）。WebKit / Firefox での表示差異の検証と、
              Playwright によるビジュアルリグレッションは v1.0 までに整備します（<a href="https://github.com/daisuke-awaji/dotkit/blob/main/PLAN.md">PLAN.md</a>）。
              ハイコントラストモードの実機（Windows）での確認はまだです。
            </>,
            <>
              <b>Testing status:</b> visually checked in Chromium (light / dark, with high contrast and reduced motion emulated). Checking rendering differences in WebKit / Firefox
              and Playwright visual regression tests are planned before v1.0 (<a href="https://github.com/daisuke-awaji/dotkit/blob/main/PLAN.md">PLAN.md</a>).
              High contrast mode has not yet been checked on real Windows hardware.
            </>,
          )}
        </p>
      </Card>

      <h2>{t("LLM / コーディングエージェント向け", "For LLMs and coding agents")}</h2>
      <p>
        {t(
          <>クラス名・props の要約を <a href="./llms.txt">llms.txt</a> として配信しています。</>,
          <>A summary of class names and props is published as <a href="./llms.txt">llms.txt</a>.</>,
        )}
      </p>
      <CodeBlock lang="sh">{`curl https://daisuke-awaji.github.io/dotkit/llms.txt`}</CodeBlock>
    </>
  );
}
