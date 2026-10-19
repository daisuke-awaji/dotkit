import {
  Divider,
  DotLeaders,
  Leader,
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
    </>
  );
}
