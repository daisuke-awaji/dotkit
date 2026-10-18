import { useState } from "react";
import { Card, DotIcon, iconNames } from "dotkit/react";
import { CodeBlock, useCopy } from "../ui";

export function Icons() {
  const [step, setStep] = useState(4);
  const [square, setSquare] = useState(false);
  const [format, setFormat] = useState<"react" | "html">("react");
  const copy = useCopy();

  const snippet = (name: string) =>
    format === "react"
      ? `<DotIcon name="${name}"${step !== 3 ? ` step={${step}}` : ""}${square ? " square" : ""} />`
      : `<span class="dk-icon dk-icon--${name}${square ? " dk-icon--square" : ""}"${step !== 3 ? ` style="--dk-icon-step: ${step}px"` : ""} aria-hidden="true"></span>`;

  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Icons</h1>
      <p className="muted">
        {iconNames.length} 個の 7×7 ドットマトリクスアイコン。クリックでコードをコピーします。
        元データは <code>icons/icons.json</code> の 1 ファイルで、CSS と TypeScript の型はビルド時に生成されます。
      </p>

      <Card style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", margin: "20px 0" }}>
        <div className="control" style={{ minWidth: 220 }}>
          <label htmlFor="ic-step"><span>--dk-icon-step</span><span>{step}px</span></label>
          <input id="ic-step" type="range" min={1.5} max={8} step={0.5} value={step} onChange={(e) => setStep(+e.target.value)} style={{ width: "100%", accentColor: "var(--dk-ink)" }} />
        </div>
        <div className="seg">
          <button aria-pressed={!square} onClick={() => setSquare(false)}>round</button>
          <button aria-pressed={square} onClick={() => setSquare(true)}>square</button>
        </div>
        <div className="seg">
          <button aria-pressed={format === "react"} onClick={() => setFormat("react")}>copy as React</button>
          <button aria-pressed={format === "html"} onClick={() => setFormat("html")}>copy as HTML</button>
        </div>
      </Card>

      <div className="icon-grid">
        {iconNames.map((name) => (
          <Card key={name} as="button" className="icon-cell" onClick={() => copy(snippet(name), `Copied: ${name}`)} aria-label={`Copy ${name}`}>
            <span style={{ height: 8 * 7, display: "grid", placeItems: "center" }}>
              <DotIcon name={name} step={step} square={square} />
            </span>
            <span className="name">{name}</span>
          </Card>
        ))}
      </div>

      <h2>Add your own icon</h2>
      <p><code>icons/icons.json</code> に 7 行 × 7 文字（<code>#</code> = ドット）を追加し、<code>npm run icons</code> を実行します。</p>
      <CodeBlock lang="json">{`"bolt": [
  "....##.",
  "...##..",
  "..##...",
  ".#####.",
  "...##..",
  "..##...",
  ".##...."
]`}</CodeBlock>
    </>
  );
}
