import {
  Divider,
  DotLeaders,
  Leader,
  Steps,
} from "dotkit/react";
import { Example } from "../../ui";
import { Since } from "./shared";

export function Navigation() {
  return (
    <>
      <h2 id="navigation">Navigation</h2>
      <p className="muted">項目どうしをつなぎ、現在地を示す部品。</p>

      <h3 id="leaders">Dot leaders <Since v="0.2" /></h3>
      <p>
        目次やレシート、料金表で「項目 ……… 値」をつなぐ点線です。<code>.dk-leaders</code> の子要素が 1 行になり、
        行の最初の要素と最後の要素のあいだをドットで埋めます。リンクにするときは
        <code>&lt;li&gt;&lt;a class="dk-leader"&gt;</code> のように、行にあたる要素へ <code>.dk-leader</code> を付けます。
      </p>
      <Example
        previewStyle={{ alignItems: "flex-start", gap: 48 }}
        html={`<ul class="dk-leaders">
  <li><span>Espresso</span><span>¥480</span></li>
  <li><span>Flat white</span><span>¥620</span></li>
</ul>

<!-- table of contents -->
<ol class="dk-leaders">
  <li><a class="dk-leader" href="#intro"><span>1. Introduction</span><span>1</span></a></li>
  <li><a class="dk-leader" href="#dots"><span>2. Thinking in dots</span><span>7</span></a></li>
</ol>`}
        react={`<DotLeaders>
  <Leader label="Espresso" value="¥480" />
  <Leader label="Flat white" value="¥620" />
</DotLeaders>

<DotLeaders as="ol">
  <Leader label="1. Introduction" value="1" href="#intro" />
  <Leader label="2. Thinking in dots" value="7" href="#dots" />
</DotLeaders>`}
      >
        <div style={{ width: 260 }}>
          <span className="eyebrow">Contents</span>
          <DotLeaders as="ol" style={{ marginTop: 12 }}>
            <Leader label="1. Introduction" value="1" href="#leaders" />
            <Leader label="2. Thinking in dots" value="7" href="#leaders" />
            <Leader label="3. Two knobs" value="15" href="#leaders" />
            <Leader label="4. Halftone" value="28" href="#leaders" />
            <Leader label="Index" value="64" href="#leaders" />
          </DotLeaders>
        </div>
        <div style={{ width: 240 }} className="mono">
          <span className="eyebrow">Receipt</span>
          <DotLeaders style={{ marginTop: 12, fontSize: 13 }}>
            <Leader label="Espresso" value="¥480" />
            <Leader label="Flat white" value="¥620" />
            <Leader label="Croissant" value="¥380" />
          </DotLeaders>
          <Divider style={{ margin: "10px 0" }} />
          <DotLeaders color="var(--dk-ink)" style={{ fontSize: 13, fontWeight: 500 }}>
            <Leader label="Total" value="¥1,480" />
          </DotLeaders>
        </div>
      </Example>

      <h3 id="steps">Stepper <Since v="0.3" /></h3>
      <p>
        手順の進み具合を、ドットの印とドットの線で表します。<code>&lt;ol class="dk-steps"&gt;</code> の現在の項目に
        <code>aria-current="step"</code> を付けると、それより前の項目は自動で「完了」になります（<code>data-state="done"</code> で明示もできます）。
        <code>.dk-steps--vertical</code> で縦並びになります。
      </p>
      <Example
        align="left"
        previewStyle={{ display: "grid", gap: 36 }}
        html={`<ol class="dk-steps">
  <li>Account</li>
  <li>Plan</li>
  <li aria-current="step">Payment</li>
  <li>Done</li>
</ol>

<ol class="dk-steps dk-steps--vertical">
  <li>Build <small>1m 12s</small></li>
  <li aria-current="step">Deploy <small>running…</small></li>
  <li>Smoke test</li>
</ol>`}
        react={`<Steps items={["Account", "Plan", "Payment", "Done"]} current={2} aria-label="Checkout" />

<Steps
  vertical
  current={1}
  items={[
    { label: "Build", description: "1m 12s" },
    { label: "Deploy", description: "running…" },
    { label: "Smoke test" },
  ]}
/>`}
      >
        <Steps items={["Account", "Plan", "Payment", "Done"]} current={2} aria-label="Checkout" />
        <Steps
          vertical
          current={1}
          aria-label="Pipeline"
          items={[
            { label: "Build", description: "1m 12s" },
            { label: "Deploy", description: "running…" },
            { label: "Smoke test" },
          ]}
        />
      </Example>
    </>
  );
}
