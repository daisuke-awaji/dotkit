import {
  Badge,
  BarChart,
  Card,
  Divider,
  DotIcon,
  DotText,
  Halftone,
  Meter,
} from "dotkit/react";
import { Example } from "../../ui";
import { week } from "./shared";

export function Display() {
  return (
    <>
      <h2 id="display">Display</h2>
      <p className="muted">情報をまとめて見せる小物とコンテナ。</p>

      <h3 id="badge">Badge</h3>
      <Example
        html={`<span class="dk-badge">Beta</span>
<span class="dk-badge dk-badge--solid">New</span>`}
        react={`<Badge>Beta</Badge>
<Badge variant="solid">New</Badge>`}
      >
        <Badge>Beta</Badge>
        <Badge variant="solid">New</Badge>
        <Badge><DotIcon name="check" step={1.5} /> Passed</Badge>
      </Example>

      <h3 id="divider">Divider</h3>
      <Example
        align="left"
        previewStyle={{ display: "block" }}
        html={`<hr class="dk-divider">
<hr class="dk-divider dk-square" style="--dk-gap: 8px; --dk-size: 3px; --dk-color: currentColor">`}
        react={`<Divider />
<Divider shape="square" gap={8} size={3} style={{ "--dk-color": "currentColor" } as React.CSSProperties} />`}
      >
        <Divider />
        <Divider shape="square" gap={8} size={3} style={{ "--dk-color": "currentColor" } as React.CSSProperties} />
      </Example>

      <h3 id="card">Card</h3>
      <p>ドット枠のコンテナ。ドット色は <code>color</code>（<code>--dk-color</code>）で変えられます。</p>
      <Example
        html={`<div class="dk-card">
  <span class="dk-badge">Card</span>
  <h3>Weekly requests</h3>
  <p>Dotted outline container.</p>
</div>`}
        react={`<Card>
  <Badge>Card</Badge>
  <h3>Weekly requests</h3>
  <p>Dotted outline container.</p>
</Card>
<Card color="var(--dk-ink)" shape="square">…</Card>`}
      >
        <Card style={{ width: 240 }}>
          <Badge>Card</Badge>
          <h3 style={{ margin: "12px 0 4px" }}>Weekly requests</h3>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>Dotted outline container.</p>
        </Card>
        <Card color="var(--dk-ink)" shape="square" style={{ width: 240 }}>
          <Badge variant="solid">Square</Badge>
          <h3 style={{ margin: "12px 0 4px" }}>Ink outline</h3>
          <p className="muted" style={{ margin: 0, fontSize: 14 }}>color + shape props.</p>
        </Card>
      </Example>

      <h3 id="compose">Composition — 組み合わせ例</h3>
      <p>ハーフトーンのヘッダー、ドット文字の数値、棒グラフ、メーターを 1 枚のカードに。</p>
      <Example
        react={`<Card style={{ width: 340, padding: 0, overflow: "hidden" }}>
  <Halftone style={{ height: 88 }} />
  <div style={{ padding: 20 }}>
    <span className="eyebrow">Weekly requests</span>
    <DotText gap={3} size={2.6} style={{ font: "800 52px/1 Geist" }}>12.4k</DotText>
    <BarChart data={data} height={80} />
    <Meter value={0.62} label="Quota" />
  </div>
</Card>`}
      >
        <Card style={{ width: 340, padding: 0, overflow: "hidden" }}>
          <Halftone style={{ height: 88 }} />
          <div style={{ padding: 20, display: "grid", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
              <div>
                <span className="eyebrow">Weekly requests</span>
                <div><DotText gap={3} size={2.6} style={{ font: "800 52px/1 Geist, sans-serif", letterSpacing: "-.03em" }}>12.4k</DotText></div>
              </div>
              <Badge variant="solid">+8.2%</Badge>
            </div>
            <BarChart label="Weekly requests" height={80} data={week.map((value, i) => ({ value, label: "MTWTFSS"[i] }))} />
            <div>
              <div className="eyebrow" style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>Quota</span><span>62%</span>
              </div>
              <Meter value={0.62} label="Quota" />
            </div>
          </div>
        </Card>
      </Example>
    </>
  );
}
