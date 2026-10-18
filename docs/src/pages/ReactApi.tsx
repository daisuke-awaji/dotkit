import { CodeBlock, PropsTable, Toc, type PropRow } from "../ui";

const dotStyle: PropRow[] = [
  ["density", `"sparse" | "normal" | "dense"`, "-", "密度プリセット。size / gap が優先されます"],
  ["shape", `"round" | "square" | "ring"`, `"round"`, "ドット形状"],
  ["size", "number | string", "-", "ドット径。number は px"],
  ["gap", "number | string", "-", "ドット間隔。number は px"],
  ["color", "string", "currentColor", "ドット色（--dk-color）"],
];

const sections: { id: string; name: string; desc: string; rows: PropRow[]; extends: string }[] = [
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
          <h2 id={s.id} style={{ fontFamily: "var(--dk-font-mono)", fontSize: 22 }}>{s.name}</h2>
          <p>{s.desc} <span className="muted">extends <code>{s.extends}</code></span></p>
          <PropsTable rows={s.rows} />
        </section>
      ))}

      <h2 id="helpers" style={{ fontFamily: "var(--dk-font-mono)", fontSize: 22 }}>Helpers</h2>
      <CodeBlock lang="ts">{`import { buttonClassName, cx, dotVars, iconNames } from "dotkit/react";

buttonClassName({ variant: "outline", size: "sm" });   // "dk-btn dk-btn--outline dk-btn--sm"
dotVars({ size: 3, gap: 8 }, { padding: 12 });        // { "--dk-size": "3px", "--dk-gap": "8px", padding: 12 }
iconNames;                                            // readonly ["arrow-right", …]  (type IconName)`}</CodeBlock>
    </>
  );
}
