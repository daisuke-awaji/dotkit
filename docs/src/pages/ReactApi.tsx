import { CodeBlock, PropsTable, type PropRow } from "../ui";
import { useT } from "../i18n";

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
    id: "digits", name: "<DotDigits>", extends: "HTMLAttributes<span>", since: "0.3",
    desc: "5×7 ドットの数字。role=\"img\" で、読み上げは value（または label）です。",
    rows: [
      ["value", "string | number", "-", "必須。0-9 と : . , - + % / と空白。ほかの文字は空白になります"],
      ["step", "number | string", "3px", "ドット間隔。1 文字 = step × 5 × step × 7"],
      ["square", "boolean", "false", "四角いドット"],
      ["grid", "boolean", "false", "消えているドットも薄く表示（電光掲示板風）"],
      ["label", "string", "value", "読み上げる文字列"],
    ],
  },
  {
    id: "sparkline", name: "<Sparkline>", extends: "HTMLAttributes<div>", since: "0.3",
    desc: "値ごとに 1 ドットの小さな折れ線。role=\"img\"。最新の値に輪が付きます。",
    rows: [
      ["data", "number[]", "-", "必須。古い順"],
      ["min / max", "number", "min / max(data)", "下端 / 上端に対応する値"],
      ["height", "number | string", "40px", "高さ"],
      ["size / color / shape", "…", "4px / var(--dk-ink) / round", "ドットの見た目"],
      ["area", "boolean", "false", "各点の下を薄いドットで埋める"],
      ["label", "string", "-", "要約（スクリーンリーダー向け）"],
    ],
  },
  {
    id: "pictogram", name: "<Pictogram>", extends: "HTMLAttributes<div>", since: "0.3",
    desc: "アイコン 1 つ = 1 単位のグラフ。端数はドットの列単位で塗ります。role=\"img\"。",
    rows: [
      ["icon", "IconName", "-", "必須。並べるアイコン"],
      ["value", "number", "-", "必須。塗るアイコンの数（7.4 など小数可）"],
      ["total", "number", "10", "アイコンの総数"],
      ["step / color", "…", "3px / var(--dk-ink)", "アイコンの大きさと色"],
      ["label", "string", "-", "要約（例: 74% of users）"],
    ],
  },
  {
    id: "steps", name: "<Steps>", extends: "HTMLAttributes<ol>", since: "0.3",
    desc: "手順の進み具合。現在の項目に aria-current=\"step\" を付け、それより前を完了として表示します。",
    rows: [
      ["items", "Array<ReactNode | { label; description? }>", "-", "必須。各手順"],
      ["current", "number", "-", "必須。現在の手順（0 始まり）"],
      ["vertical", "boolean", "false", "縦に並べる"],
    ],
  },
  {
    id: "status", name: "<StatusDot>", extends: "HTMLAttributes<span>", since: "0.3",
    desc: "状態のドットと説明文。説明文は children に書きます。",
    rows: [
      ["state", `"ok" | "warn" | "down" | "info" | "idle"`, `"ok"`, "down は四角、idle は輪の形"],
      ["pulse", "boolean", "false", "波紋のアニメーション"],
    ],
  },
  {
    id: "skeleton", name: "<Skeleton>", extends: "HTMLAttributes<div>", since: "0.3",
    desc: "読み込み中の仮表示。aria-hidden が付きます。読み込み中の領域に aria-busy を付けてください。",
    rows: [
      ["lines", "number", "-", "N 行分のテキストの仮表示（最後の行は短め）"],
      ["circle", "boolean", "false", "円（アバター用）"],
      ["width / height", "number | string", "-", "大きさ"],
    ],
  },
  {
    id: "identicon", name: "<Identicon> / identicon()", extends: "HTMLAttributes<span>", since: "0.3",
    desc: "文字列から決まる左右対称の 5×5 ドット模様。identicon(seed) は { cells: boolean[25], hue } を返す純粋な関数です。",
    rows: [
      ["value", "string", "-", "必須。同じ値なら同じ模様と色"],
      ["cell", "number | string", "8px", "セルの大きさ（全体 ≈ cell × 6.2）"],
      ["color", "string", "oklch(.6 .16 hue)", "色の上書き"],
      ["label", "string", "-", "名前。なければ装飾として aria-hidden"],
    ],
  },
  {
    id: "march", name: "march（DotBorder / Card）", extends: "—", since: "0.3",
    desc: "DotBorder と Card の march prop で、枠のドットが時計回りに流れます（.dk-march）。",
    rows: [["march", "boolean", "false", "枠のドットを流す。動きを減らす設定では止まる"]],
  },
  {
    id: "ring", name: "<RingMeter>", extends: "HTMLAttributes<div>", since: "0.4",
    desc: "円周上のドットで値を表すメーター。role=\"meter\" と aria-value* を付けます。children は中央に表示します。",
    rows: [
      ["value", "number", "-", "必須。0–1。ドット単位で切り捨て"],
      ["count", "number", "24", "ドット数（1–60）"],
      ["diameter", "number | string", "96px", "リングの直径"],
      ["size / color / shape", "…", "6px / var(--dk-ink) / round", "ドットの見た目"],
      ["label", "string", "-", "アクセシブルな名前"],
    ],
  },
  {
    id: "range", name: "<Range>", extends: "InputHTMLAttributes", since: "0.4",
    desc: "ドットの目盛りに載せた range input。ref は input、style は外側の .dk-range に渡ります。塗りは value（または defaultValue）から計算するので、制御コンポーネントで使ってください。",
    rows: [
      ["value / defaultValue / min / max / step", "…", "- / - / 0 / 100 / -", "通常の input と同じ"],
      ["dotSize", "number | string", "4px", "目盛りのドット径"],
      ["gap", "number | string", "8px", "目盛りの間隔"],
      ["wrapperClassName", "string", "-", ".dk-range に付けるクラス"],
    ],
  },
  {
    id: "tabs", name: "<TabList> / <Tab>", extends: "HTMLAttributes / ButtonHTMLAttributes", since: "0.4",
    desc: "見た目だけのタブ。選択状態とパネルは利用側で管理します。TabList は role=\"tablist\"、Tab は role=\"tab\" とロービング tabIndex を付けます。",
    rows: [["Tab.selected", "boolean", "false", "aria-selected と tabIndex（0 / -1）"]],
  },
  {
    id: "pager", name: "<PaginationDots>", extends: "HTMLAttributes<nav>", since: "0.4",
    desc: "カルーセルの位置表示。現在のドットが 3 つのドットに伸びます。",
    rows: [
      ["count", "number", "-", "必須。ページ数"],
      ["current", "number", "-", "必須。現在の位置（0 始まり）"],
      ["onSelect", "(index: number) => void", "-", "押されたときに呼ばれる。省略すると表示のみ"],
      ["itemLabel", "(index: number) => string", "Slide n", "各ドットの名前"],
      ["size", "number | string", "8px", "ドット径"],
    ],
  },
  {
    id: "alert", name: "<Alert>", extends: "HTMLAttributes<div>", since: "0.4",
    desc: "お知らせ欄。live region にする場合は role=\"alert\" / role=\"status\" を自分で付けます。",
    rows: [
      ["state", `"info" | "ok" | "warn" | "danger"`, `"info"`, "色。danger は四角いドット"],
      ["title", "ReactNode", "-", "太字の 1 行目"],
      ["icon", "ReactNode", "-", "タイトルの前に置く要素"],
    ],
  },
  {
    id: "dialog", name: "<Dialog>", extends: "DialogHTMLAttributes", since: "0.4",
    desc: "ネイティブの <dialog>。ref で showModal() / close() を呼びます。閉じるボタンには <form method=\"dialog\" className=\"dk-dialog__actions\"> が使えます。",
    rows: [["（独自の props なし）", "—", "-", "dialog 要素の属性をそのまま渡します"]],
  },
  {
    id: "halftonetext", name: "<HalftoneText>", extends: "HTMLAttributes", since: "0.4",
    desc: "大きな見出し用の網点文字。文字は選択・読み上げできます。",
    rows: [
      ["as", "ElementType", `"span"`, "描画する要素（h1 など）"],
      ["direction", `"to-bottom" | "to-right" | "radial"`, `"to-bottom"`, "網点が小さくなる向き"],
      ["gap", "number | string", "6px", "網の細かさ"],
      ["tone", "string", "-", "任意のグラデーション（黒 = 最大）"],
    ],
  },
  {
    id: "pattern", name: "<Pattern>", extends: "HTMLAttributes", since: "0.4",
    desc: "ドットの並べ方を変えた柄。",
    rows: [
      ["kind", `"dots" | "checker" | "stripes" | "grid" | "diagonal" | "cross" | "stipple"`, `"dots"`, "柄"],
      ...dotStyle,
      ["as", "ElementType", `"div"`, "描画する要素"],
    ],
  },
  {
    id: "duotone", name: "<Duotone>", extends: "HTMLAttributes", since: "0.4",
    desc: "2 色のドット面。",
    rows: [
      ["color2", "string", "var(--dk-mute)", "2 色目（--dk-color-2）"],
      ["ramp", "boolean", "false", "交互ではなく、color → color2 のグラデーションをドット越しに見せる"],
      ["angle", "string", "90deg", "ramp の向き（--dk-angle）"],
      ...dotStyle,
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

/** English for every Japanese string in the tables above (keys must match exactly). */
const EN: Record<string, string> = {
  "密度プリセット。size / gap が優先されます": "Density preset. size / gap take precedence",
  "ドット形状": "Dot shape",
  "ドット径。number は px": "Dot diameter. Numbers are px",
  "ドット間隔。number は px": "Dot spacing. Numbers are px",
  "ドット色（--dk-color）": "Dot color (--dk-color)",
  "ドット面。背景・装飾・面の表現に。": "A field of dots, for backgrounds, ornaments and surfaces.",
  "マスクでフェード": "Fade out with a mask",
  "描画する要素": "Element to render",
  "1 列のドットで描いた枠線で中身を囲みます。": "Wraps its content in a border drawn with a single row of dots.",
  "グリフをドットで塗ったテキスト。": "Text whose glyphs are filled with dots.",
  "描画する要素（h1 など）": "Element to render (h1 etc.)",
  "ドットの大きさで階調を表す装飾。aria-hidden が付きます。中に要素を入れないでください。": "An ornament that expresses tone through dot size. Gets aria-hidden. Do not put elements inside it.",
  "階調の向き": "Direction of the tone ramp",
  "セルの大きさ": "Cell size",
  "任意のグラデーション（黒 = 最大のドット、#8a8a8a ≒ なし）": "Any gradient (black = largest dot, #8a8a8a ≈ none)",
  "白ドット / 黒地。.dk-theme-dark 内では自動": "White dots on black. Automatic inside .dk-theme-dark",
  "7×7 ドットマトリクスアイコン。label を渡すと role=\"img\"、なければ aria-hidden。": "7×7 dot-matrix icon. With label it gets role=\"img\"; without, aria-hidden.",
  "必須。iconNames のいずれか（型補完あり）": "Required. One of iconNames (with type completion)",
  "ドット間隔。寸法 = step × 7": "Dot spacing. Size = step × 7",
  "四角いドット": "Square dots",
  "アクセシブルな名前": "Accessible name",
  "ドット面のボタン。ref 転送対応。type の既定値は \"button\"。": "A button with a dot surface. Forwards ref. type defaults to \"button\".",
  "見た目": "Appearance",
  "高さ 32 / 40 / 48px": "Height 32 / 40 / 48px",
  "ドット枠の入力欄。ref は input 要素に転送されます。": "An input with a dotted frame. ref is forwarded to the input element.",
  "入力の前に置く要素（アイコン等）": "Element placed before the input (an icon etc.)",
  "入力の後に置く要素": "Element placed after the input",
  "外側の .dk-field に付けるクラス": "Class added to the outer .dk-field",
  "値をドット単位で表示するメーター。role=\"meter\" と aria-value* を自動付与。": "A meter that shows its value in whole dots. Adds role=\"meter\" and aria-value* automatically.",
  "必須。0–1": "Required. 0–1",
  "ドットの見た目": "Dot appearance",
  "ドットを積んだ棒グラフ。role=\"img\"。": "A bar chart of stacked dots. role=\"img\".",
  "必須": "Required",
  "満杯に対応する値": "Value that maps to a full bar",
  "グラフの高さ": "Chart height",
  "グラフの要約（スクリーンリーダー向け）": "Summary of the chart (for screen readers)",
  "ドット枠のコンテナ。": "A container with a dotted frame.",
  "枠のドット色": "Frame dot color",
  "画像を網点（ドットの大きさ）で表示します。src を渡すと <img> を生成し、children を渡すとそれ（<picture> / <video> など）を包みます。": "Renders an image as a halftone (dot size). Pass src to generate an <img>, or pass children (a <picture>, <video>, …) to wrap them.",
  "画像の URL": "Image URL",
  "代替テキスト（生成する <img> に付与）": "Alternative text (set on the generated <img>)",
  "網の細かさ": "Screen fineness",
  "しきい値処理の前に画像へかける filter": "Filter applied to the image before thresholding",
  "生成する <img> に渡す props（loading など）": "Props passed to the generated <img> (loading etc.)",
  "ネイティブの input をドットで描き直した部品。ref は input に転送されます。Switch は role=\"switch\" 付きのチェックボックスです。": "Native inputs redrawn with dots. ref is forwarded to the input. Switch is a checkbox with role=\"switch\".",
  "ラベル。渡すと <label class=\"dk-choice\"> で包みます": "Label. When given, wraps everything in <label class=\"dk-choice\">",
  "部品の高さ（--dk-control）": "Control height (--dk-control)",
  "<label> に付けるクラス": "Class added to the <label>",
  "1 セル 1 ドットのヒートマップ。role=\"img\"。セルは列ごとに上から並びます。": "A heatmap with one dot per cell. role=\"img\". Cells fill each column top to bottom.",
  "必須。label はセルのツールチップ": "Required. label becomes the cell tooltip",
  "最大のドットに対応する値": "Value that maps to the largest dot",
  "1 列のセル数": "Cells per column",
  "セルの間隔": "Cell pitch",
  "ドットの色": "Dot color",
  "値で変えるもの（大きさと濃さ / 濃さ / 大きさ）": "What the value changes (size and tone / tone / size)",
  "全体の要約（スクリーンリーダー向け）": "Summary of the whole (for screen readers)",
  "稼働状況バー。期間ごとに縦 1 列のドットで、状態によって色と高さが変わります。role=\"img\"。": "An uptime bar. One vertical column of dots per period; color and height change with the state. role=\"img\".",
  "必須。UptimeState = \"ok\" | \"warn\" | \"down\" | \"none\"": "Required. UptimeState = \"ok\" | \"warn\" | \"down\" | \"none\"",
  "列の高さ（ドット数）": "Column height (in dots)",
  "全体の要約（例: 99.92% uptime over 90 days）": "Summary of the whole (e.g. 99.92% uptime over 90 days)",
  "「項目 ……… 値」をドットでつなぐリスト。": "A list that joins \"item ……… value\" with dots.",
  "描画する要素（ol / nav など）": "Element to render (ol / nav etc.)",
  "点線の見た目": "Appearance of the dotted line",
  "必須。左の項目と右の値": "Required. The item on the left and the value on the right",
  "行をリンクにします（<a class=\"dk-leader\">）": "Turns the row into a link (<a class=\"dk-leader\">)",
  "行の要素": "Row element",
  "チャットの入力中表示。role=\"status\"。": "A chat typing indicator. role=\"status\".",
  "吹き出しの背景を付ける": "Adds a speech-bubble background",
  "ドット径": "Dot diameter",
  "role=\"status\" の名前": "Name for role=\"status\"",
  "5×7 ドットの数字。role=\"img\" で、読み上げは value（または label）です。": "5×7 dot-matrix digits. role=\"img\"; announced as value (or label).",
  "必須。0-9 と : . , - + % / と空白。ほかの文字は空白になります": "Required. 0-9, : . , - + % / and space. Other characters render as space",
  "ドット間隔。1 文字 = step × 5 × step × 7": "Dot spacing. One character = step × 5 by step × 7",
  "消えているドットも薄く表示（電光掲示板風）": "Show unlit dots faintly too (LED-board style)",
  "読み上げる文字列": "Text to announce",
  "値ごとに 1 ドットの小さな折れ線。role=\"img\"。最新の値に輪が付きます。": "A tiny line chart with one dot per value. role=\"img\". The latest value gets a ring.",
  "必須。古い順": "Required. Oldest first",
  "下端 / 上端に対応する値": "Values that map to the bottom / top",
  "高さ": "Height",
  "各点の下を薄いドットで埋める": "Fill below each point with faint dots",
  "要約（スクリーンリーダー向け）": "Summary (for screen readers)",
  "アイコン 1 つ = 1 単位のグラフ。端数はドットの列単位で塗ります。role=\"img\"。": "A chart where one icon = one unit. Fractions fill by dot columns. role=\"img\".",
  "必須。並べるアイコン": "Required. The icon to repeat",
  "必須。塗るアイコンの数（7.4 など小数可）": "Required. How many icons to fill (fractions like 7.4 allowed)",
  "アイコンの総数": "Total number of icons",
  "アイコンの大きさと色": "Icon size and color",
  "要約（例: 74% of users）": "Summary (e.g. 74% of users)",
  "手順の進み具合。現在の項目に aria-current=\"step\" を付け、それより前を完了として表示します。": "Progress through a sequence of steps. Puts aria-current=\"step\" on the current item and shows earlier ones as done.",
  "必須。各手順": "Required. The steps",
  "必須。現在の手順（0 始まり）": "Required. The current step (0-based)",
  "縦に並べる": "Lay out vertically",
  "状態のドットと説明文。説明文は children に書きます。": "A status dot with a caption. Put the caption in children.",
  "down は四角、idle は輪の形": "down is a square, idle is a ring",
  "波紋のアニメーション": "Ripple animation",
  "読み込み中の仮表示。aria-hidden が付きます。読み込み中の領域に aria-busy を付けてください。": "A loading placeholder. Gets aria-hidden. Put aria-busy on the region that is loading.",
  "N 行分のテキストの仮表示（最後の行は短め）": "Placeholder for N lines of text (the last one is shorter)",
  "円（アバター用）": "Circle (for avatars)",
  "大きさ": "Size",
  "文字列から決まる左右対称の 5×5 ドット模様。identicon(seed) は { cells: boolean[25], hue } を返す純粋な関数です。": "A symmetric 5×5 dot pattern derived from a string. identicon(seed) is a pure function returning { cells: boolean[25], hue }.",
  "必須。同じ値なら同じ模様と色": "Required. The same value always gives the same pattern and color",
  "セルの大きさ（全体 ≈ cell × 6.2）": "Cell size (whole ≈ cell × 6.2)",
  "色の上書き": "Color override",
  "名前。なければ装飾として aria-hidden": "Name. Without it, the element is decorative and aria-hidden",
  "DotBorder と Card の march prop で、枠のドットが時計回りに流れます（.dk-march）。": "With the march prop on DotBorder and Card, the frame dots flow clockwise (.dk-march).",
  "枠のドットを流す。動きを減らす設定では止まる": "Make the frame dots flow. Stops under reduced-motion settings",
  "円周上のドットで値を表すメーター。role=\"meter\" と aria-value* を付けます。children は中央に表示します。": "A meter that shows its value with dots around a circle. Adds role=\"meter\" and aria-value*. children are shown in the center.",
  "必須。0–1。ドット単位で切り捨て": "Required. 0–1, rounded down to whole dots",
  "ドット数（1–60）": "Number of dots (1–60)",
  "リングの直径": "Ring diameter",
  "ドットの目盛りに載せた range input。ref は input、style は外側の .dk-range に渡ります。塗りは value（または defaultValue）から計算するので、制御コンポーネントで使ってください。": "A range input sitting on a dotted scale. ref goes to the input, style to the outer .dk-range. The fill is computed from value (or defaultValue), so use it as a controlled component.",
  "通常の input と同じ": "Same as a regular input",
  "目盛りのドット径": "Scale dot diameter",
  "目盛りの間隔": "Scale dot spacing",
  ".dk-range に付けるクラス": "Class added to .dk-range",
  "見た目だけのタブ。選択状態とパネルは利用側で管理します。TabList は role=\"tablist\"、Tab は role=\"tab\" とロービング tabIndex を付けます。": "Visual-only tabs. You manage the selection and panels. TabList gets role=\"tablist\"; Tab gets role=\"tab\" and a roving tabIndex.",
  "aria-selected と tabIndex（0 / -1）": "aria-selected and tabIndex (0 / -1)",
  "カルーセルの位置表示。現在のドットが 3 つのドットに伸びます。": "A carousel position indicator. The current dot stretches across three dots.",
  "必須。ページ数": "Required. Number of pages",
  "必須。現在の位置（0 始まり）": "Required. Current position (0-based)",
  "押されたときに呼ばれる。省略すると表示のみ": "Called when a dot is pressed. Omit it for a display-only indicator",
  "各ドットの名前": "Name of each dot",
  "お知らせ欄。live region にする場合は role=\"alert\" / role=\"status\" を自分で付けます。": "A notice box. Add role=\"alert\" / role=\"status\" yourself if it should be a live region.",
  "色。danger は四角いドット": "Color. danger uses square dots",
  "太字の 1 行目": "Bold first line",
  "タイトルの前に置く要素": "Element placed before the title",
  "ネイティブの <dialog>。ref で showModal() / close() を呼びます。閉じるボタンには <form method=\"dialog\" className=\"dk-dialog__actions\"> が使えます。": "The native <dialog>. Call showModal() / close() through ref. Use <form method=\"dialog\" className=\"dk-dialog__actions\"> for close buttons.",
  "（独自の props なし）": "(no props of its own)",
  "dialog 要素の属性をそのまま渡します": "Passes the dialog element's attributes straight through",
  "大きな見出し用の網点文字。文字は選択・読み上げできます。": "Halftone lettering for large headings. The text stays selectable and readable by screen readers.",
  "網点が小さくなる向き": "Direction in which the halftone dots shrink",
  "任意のグラデーション（黒 = 最大）": "Any gradient (black = largest)",
  "ドットの並べ方を変えた柄。": "Patterns made by arranging dots differently.",
  "柄": "Pattern",
  "2 色のドット面。": "A two-color dot surface.",
  "2 色目（--dk-color-2）": "Second color (--dk-color-2)",
  "交互ではなく、color → color2 のグラデーションをドット越しに見せる": "Instead of alternating, show a color → color2 gradient through the dots",
  "ramp の向き（--dk-angle）": "Direction of the ramp (--dk-angle)",
  "小物。": "Small parts.",
  "ドット数（1–8）": "Number of dots (1–8)",
  "march（DotBorder / Card）": "march (DotBorder / Card)",
};

export function ReactApi() {
  const t = useT();
  const tr = (ja: string) => t(ja, EN[ja] ?? ja);
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>React API</h1>
      <p className="muted">
        {t(
          <>
            <code>dotkit/react</code> のコンポーネントはすべて状態を持たず、props をクラス名と CSS 変数に変換するだけです。
            そのため Server Components でそのまま使えます。指定しなかった props は HTML 属性としてそのまま渡されます。
          </>,
          <>
            Every component in <code>dotkit/react</code> is stateless: it only turns props into class names and CSS variables,
            so it works in Server Components as-is. Any props it does not use are passed through as HTML attributes.
          </>,
        )}
      </p>
      {sections.map((s) => (
        <section key={s.id}>
          <h2 id={s.id} style={{ fontFamily: "var(--dk-font-mono)", fontSize: 22 }}>
            {tr(s.name)}
            {s.since && <span className="dk-badge since" title={t(`v${s.since} で追加`, `Added in v${s.since}`)}>v{s.since}</span>}
          </h2>
          <p>{tr(s.desc)} <span className="muted">extends <code>{s.extends}</code></span></p>
          <PropsTable rows={s.rows.map(([n, ty, d, desc]) => [tr(n), ty, d, tr(desc)] as PropRow)} />
        </section>
      ))}

      <h2 id="helpers" style={{ fontFamily: "var(--dk-font-mono)", fontSize: 22 }}>Helpers</h2>
      <CodeBlock lang="ts">{`import { buttonClassName, cx, dotVars, withVars, px, iconNames, glyphChars } from "dotkit/react";

buttonClassName({ variant: "outline", size: "sm" });   // "dk-btn dk-btn--outline dk-btn--sm"
dotVars({ size: 3, gap: 8 }, { padding: 12 });        // { "--dk-size": "3px", "--dk-gap": "8px", padding: 12 }
withVars({ "--dk-cell": px(10), "--dk-rows": 5 });     // { "--dk-cell": "10px", "--dk-rows": 5 }  (undefined values are skipped)
iconNames;                                            // readonly ["arrow-right", …]  (type IconName)
glyphChars;                                           // readonly ["0", …, ":", " "]   (type GlyphChar)`}</CodeBlock>
    </>
  );
}
