import { CodeBlock, PropsTable, Toc, type PropRow } from "../ui";

const dotStyle: PropRow[] = [
  ["density", `"sparse" | "normal" | "dense"`, "-", "密度プリセット。size / gap が優先されます"],
  ["shape", `"round" | "square" | "ring"`, `"round"`, "ドット形状"],
  ["size", "number | string", "-", "ドット径。number は px"],
  ["gap", "number | string", "-", "ドット間隔。number は px"],
  ["color", "string", "currentColor", "ドット色（--dk-color）"],
];

const sections: { id: string; name: string; desc: string; rows: PropRow[]; extends: string; since?: string }[] = [
  {
    id: "dots", name: "<Dots>", extends: "HTMLAttributes",
    desc: "ドット面。背景・装飾・面の表現に。",
    rows: [...dotStyle, ["fade", `"r" | "l" | "t" | "b" | "radial"`, "-", "マスクでフェード"], ["as", "ElementType", `"div"`, "描画する要素"]],
  },
  { id: "border", name: "<DotBorder>", extends: "HTMLAttributes", desc: "1 列のドットで描いた枠線で中身を囲みます。", rows: [...dotStyle, ["as", "ElementType", `"div"`, "描画する要素"]] },
  { id: "text", name: "<DotText>", extends: "HTMLAttributes", desc: "グリフをドットで塗ったテキスト。", rows: [...dotStyle, ["as", "ElementType", `"span"`, "描画する要素（h1 など）"]] },
  {
    id: "halftone", name: "<Halftone>", extends: "HTMLAttributes<div>",
    desc: "ドットの大きさで階調を表す装飾。aria-hidden が付きます。中に要素を入れないでください。",
    rows: [
      ["direction", `"to-right" | "to-left" | "to-bottom" | "radial"`, `"to-right"`, "階調の向き"],
      ["gap", "number | string", "8px", "セルの大きさ"],
      ["tone", "string", "-", "任意のグラデーション（黒 = 最大のドット、#8a8a8a ≒ なし）"],
      ["invert", "boolean", "false", "白ドット / 黒地。.dk-theme-dark 内では自動"],
    ],
  },
  {
    id: "icon", name: "<DotIcon>", extends: "HTMLAttributes<span>",
    desc: "7×7 ドットマトリクスアイコン。label を渡すと role=\"img\"、なければ aria-hidden。",
    rows: [
      ["name", "IconName", "-", "必須。iconNames のいずれか（型補完あり）"],
      ["step", "number | string", "3px", "ドット間隔。寸法 = step × 7"],
      ["square", "boolean", "false", "四角いドット"],
      ["label", "string", "-", "アクセシブルな名前"],
    ],
  },
  {
    id: "button", name: "<Button>", extends: "ButtonHTMLAttributes",
    desc: "ドット面のボタン。ref 転送対応。type の既定値は \"button\"。",
    rows: [
      ["variant", `"solid" | "outline" | "ghost"`, `"solid"`, "見た目"],
      ["size", `"sm" | "md" | "lg"`, `"md"`, "高さ 32 / 40 / 48px"],
      ["shape", `"round" | "square" | "ring"`, `"round"`, "ドット形状"],
    ],
  },
  {
    id: "input", name: "<Input>", extends: "InputHTMLAttributes",
    desc: "ドット枠の入力欄。ref は input 要素に転送されます。",
    rows: [
      ["leading", "ReactNode", "-", "入力の前に置く要素（アイコン等）"],
      ["trailing", "ReactNode", "-", "入力の後に置く要素"],
      ["fieldClassName", "string", "-", "外側の .dk-field に付けるクラス"],
    ],
  },
  {
    id: "meter", name: "<Meter>", extends: "HTMLAttributes<div>",
    desc: "値をドット単位で表示するメーター。role=\"meter\" と aria-value* を自動付与。",
    rows: [
      ["value", "number", "-", "必須。0–1"],
      ["label", "string", "-", "アクセシブルな名前"],
      ["size / gap / shape", "…", "6px / 10px / round", "ドットの見た目"],
    ],
  },
  {
    id: "chart", name: "<BarChart>", extends: "HTMLAttributes<div>",
    desc: "ドットを積んだ棒グラフ。role=\"img\"。",
    rows: [
      ["data", "{ label?: string; value: number }[]", "-", "必須"],
      ["max", "number", "max(data)", "満杯に対応する値"],
      ["height", "number | string", "120px", "グラフの高さ"],
      ["label", "string", "-", "グラフの要約（スクリーンリーダー向け）"],
      ["size / gap / shape", "…", "4px / 6px / round", "ドットの見た目"],
    ],
  },
  {
    id: "card", name: "<Card>", extends: "HTMLAttributes",
    desc: "ドット枠のコンテナ。",
    rows: [
      ["color", "string", "var(--dk-mute)", "枠のドット色"],
      ["shape", `"round" | "square" | "ring"`, `"round"`, "ドット形状"],
      ["as", "ElementType", `"div"`, "描画する要素"],
    ],
  },
  {
    id: "halftoneimg", name: "<HalftoneImage>", extends: "HTMLAttributes<div>", since: "0.2",
    desc: "画像を網点（ドットの大きさ）で表示します。src を渡すと <img> を生成し、children を渡すとそれ（<picture> / <video> など）を包みます。",
    rows: [
      ["src", "string", "-", "画像の URL"],
      ["alt", "string", `""`, "代替テキスト（生成する <img> に付与）"],
      ["gap", "number | string", "6px", "網の細かさ"],
      ["toneFilter", "string", "grayscale(1) contrast(1.4) brightness(.75)", "しきい値処理の前に画像へかける filter"],
      ["invert", "boolean", "false", "白ドット / 黒地。.dk-theme-dark 内では自動"],
      ["imgProps", "ImgHTMLAttributes", "-", "生成する <img> に渡す props（loading など）"],
    ],
  },
  {
    id: "choice", name: "<Checkbox> / <Radio> / <Switch>", extends: "InputHTMLAttributes", since: "0.2",
    desc: "ネイティブの input をドットで描き直した部品。ref は input に転送されます。Switch は role=\"switch\" 付きのチェックボックスです。",
    rows: [
      ["children", "ReactNode", "-", "ラベル。渡すと <label class=\"dk-choice\"> で包みます"],
      ["controlSize", "number | string", "18px", "部品の高さ（--dk-control）"],
      ["labelClassName", "string", "-", "<label> に付けるクラス"],
    ],
  },
  {
    id: "heatmap", name: "<Heatmap>", extends: "HTMLAttributes<div>", since: "0.2",
    desc: "1 セル 1 ドットのヒートマップ。role=\"img\"。セルは列ごとに上から並びます。",
    rows: [
      ["data", "Array<number | { value: number; label?: string }>", "-", "必須。label はセルのツールチップ"],
      ["max", "number", "max(data)", "最大のドットに対応する値"],
      ["rows", "number", "7", "1 列のセル数"],
      ["cell", "number | string", "12px", "セルの間隔"],
      ["color", "string", "var(--dk-ink)", "ドットの色"],
      ["encode", `"both" | "tone" | "size"`, `"both"`, "値で変えるもの（大きさと濃さ / 濃さ / 大きさ）"],
      ["shape", `"round" | "square" | "ring"`, `"round"`, "ドット形状"],
      ["label", "string", "-", "全体の要約（スクリーンリーダー向け）"],
    ],
  },
  {
    id: "uptime", name: "<UptimeBar>", extends: "HTMLAttributes<div>", since: "0.2",
    desc: "稼働状況バー。期間ごとに縦 1 列のドットで、状態によって色と高さが変わります。role=\"img\"。",
    rows: [
      ["data", `Array<UptimeState | { state: UptimeState; label?: string }>`, "-", `必須。UptimeState = "ok" | "warn" | "down" | "none"`],
      ["rows", "number", "5", "列の高さ（ドット数）"],
      ["size / gap / shape", "…", "4px / 6px / round", "ドットの見た目"],
      ["label", "string", "-", "全体の要約（例: 99.92% uptime over 90 days）"],
    ],
  },
  {
    id: "leaders", name: "<DotLeaders> / <Leader>", extends: "HTMLAttributes", since: "0.2",
    desc: "「項目 ……… 値」をドットでつなぐリスト。",
    rows: [
      ["DotLeaders.as", "ElementType", `"ul"`, "描画する要素（ol / nav など）"],
      ["DotLeaders.color / size / gap", "…", "var(--dk-mute) / 2px / 6px", "点線の見た目"],
      ["Leader.label / value", "ReactNode", "-", "必須。左の項目と右の値"],
      ["Leader.href", "string", "-", "行をリンクにします（<a class=\"dk-leader\">）"],
      ["Leader.as", "ElementType", `"li"`, "行の要素"],
    ],
  },
  {
    id: "typing", name: "<Typing>", extends: "HTMLAttributes<span>", since: "0.2",
    desc: "チャットの入力中表示。role=\"status\"。",
    rows: [
      ["bubble", "boolean", "false", "吹き出しの背景を付ける"],
      ["size", "number | string", "6px", "ドット径"],
      ["label", "string", `"Typing"`, "role=\"status\" の名前"],
    ],
  },
  {
    id: "misc", name: "<Badge> / <Divider> / <Loader>", extends: "HTMLAttributes",
    desc: "小物。",
    rows: [
      ["Badge.variant", `"outline" | "solid"`, `"outline"`, "見た目"],
      ["Divider.gap / size / shape", "…", "6px / 2px / round", "ドットの見た目"],
      ["Loader.count", "number", "5", "ドット数（1–8）"],
      ["Loader.size", "number | string", "6px", "ドット径"],
      ["Loader.label", "string", `"Loading"`, "role=\"status\" の名前"],
    ],
  },
];

export function ReactApi() {
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>React API</h1>
      <p className="muted">
        <code>dotkit/react</code> のコンポーネントはすべて状態を持たず、props をクラス名と CSS 変数に変換するだけです。
        そのため Server Components でそのまま使えます。指定しなかった props は HTML 属性としてそのまま渡されます。
      </p>
      <Toc items={sections.map((s) => [s.id, s.name.replace(/[<>]/g, "")] as [string, string])} />
      {sections.map((s) => (
        <section key={s.id}>
          <h2 id={s.id} style={{ fontFamily: "var(--dk-font-mono)", fontSize: 22 }}>
            {s.name}
            {s.since && <span className="dk-badge since" title={`Added in v${s.since}`}>v{s.since}</span>}
          </h2>
          <p>{s.desc} <span className="muted">extends <code>{s.extends}</code></span></p>
          <PropsTable rows={s.rows} />
        </section>
      ))}

      <h2 id="helpers" style={{ fontFamily: "var(--dk-font-mono)", fontSize: 22 }}>Helpers</h2>
      <CodeBlock lang="ts">{`import { buttonClassName, cx, dotVars, withVars, px, iconNames } from "dotkit/react";

buttonClassName({ variant: "outline", size: "sm" });   // "dk-btn dk-btn--outline dk-btn--sm"
dotVars({ size: 3, gap: 8 }, { padding: 12 });        // { "--dk-size": "3px", "--dk-gap": "8px", padding: 12 }
withVars({ "--dk-cell": px(10), "--dk-rows": 5 });     // { "--dk-cell": "10px", "--dk-rows": 5 }  (undefined values are skipped)
iconNames;                                            // readonly ["arrow-right", …]  (type IconName)`}</CodeBlock>
    </>
  );
}
