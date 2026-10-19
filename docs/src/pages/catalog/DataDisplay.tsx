import {
  BarChart,
  Heatmap,
  Meter,
  UptimeBar,
} from "dotkit/react";
import { Example } from "../../ui";
import { Tile, Since, rand, contributions, week } from "./shared";
const heat = contributions(26);
const r = rand(3);
const uptimeA = Array.from({ length: 90 }, (_, i) => (i === 61 ? "down" : i === 23 || i === 62 ? "warn" : "ok") as "ok" | "warn" | "down");
const uptimeB = Array.from({ length: 90 }, (_, i) => (i < 6 ? "none" : r() < 0.04 ? "down" : r() < 0.08 ? "warn" : "ok") as "ok" | "warn" | "down" | "none");

export function DataDisplay() {
  return (
    <>
      <h2 id="data">Data display</h2>
      <p className="muted">ドットの数・大きさ・濃さで値を表す部品。</p>

      <h3 id="meter">Meter</h3>
      <p>
        値は <code>round()</code> でドット単位に切り捨てられ、半端なドットが出ません。
        React 版は <code>role="meter"</code> と <code>aria-valuenow</code> を自動で付けます。
      </p>
      <Example
        align="left"
        previewStyle={{ display: "grid", gap: 18 }}
        html={`<div class="dk-meter" style="--dk-value: .62" role="meter"
     aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="Storage"></div>
<div class="dk-meter dk-square" style="--dk-value: .3; --dk-size: 4px; --dk-gap: 6px"></div>`}
        react={`<Meter value={0.62} label="Storage" />
<Meter value={0.3} shape="square" size={4} gap={6} label="CPU" />
<Meter value={0.85} shape="ring" size={10} gap={14} label="Memory" />`}
      >
        <Meter value={0.62} label="Storage" />
        <Meter value={0.3} shape="square" size={4} gap={6} label="CPU" />
        <Meter value={0.85} shape="ring" size={10} gap={14} label="Memory" />
      </Example>

      <h3 id="chart">Bar chart</h3>
      <p>バーはドットの積み重ね。高さもドット単位にスナップします。</p>
      <Example
        html={`<div class="dk-chart">
  <i class="dk-bar" style="--dk-value: .35"></i>
  <i class="dk-bar" style="--dk-value: .72"></i>
  <i class="dk-bar" style="--dk-value: 1"></i>
</div>`}
        react={`<BarChart
  label="Weekly requests"
  data={[{ label: "M", value: 32 }, { label: "T", value: 48 }, /* … */]}
/>`}
      >
        <div style={{ width: 260 }}>
          <BarChart label="Weekly requests" data={week.map((value, i) => ({ value, label: "MTWTFSS"[i] }))} />
        </div>
        <div style={{ width: 260 }}>
          <BarChart label="Weekly requests (square)" shape="square" size={5} gap={6} data={week.map((value) => ({ value }))} />
        </div>
      </Example>

      <h3 id="heatmap">Heatmap <Since v="0.2" /></h3>
      <p>
        GitHub の草のような、1 セルに 1 ドットのヒートマップです。値（<code>--dk-value</code>、0〜1）がドットの大きさと濃さの両方に効きます。
        <code>.dk-heatmap--tone</code> は濃さだけ、<code>.dk-heatmap--size</code> は大きさだけで値を表します。
        セルは列ごとに上から下へ並ぶので、<code>--dk-rows: 7</code>（既定値）なら 1 列が 1 週間になります。
      </p>
      <Example
        align="left"
        previewStyle={{ display: "grid", gap: 28, justifyItems: "start" }}
        html={`<div class="dk-heatmap" role="img" aria-label="1,284 contributions in the last 26 weeks">
  <i style="--dk-value: 0"></i>
  <i style="--dk-value: .4"></i>
  <i style="--dk-value: 1"></i>
  <!-- … one <i> per day, column by column -->
</div>

<div class="dk-heatmap dk-heatmap--tone" style="--dk-color: var(--dk-ok)">…</div>
<div class="dk-heatmap dk-heatmap--size dk-square" style="--dk-cell: 10px">…</div>`}
        react={`<Heatmap data={counts} label="1,284 contributions in the last 26 weeks" />
<Heatmap data={counts} encode="tone" color="var(--dk-ok)" />
<Heatmap data={counts} encode="size" shape="square" cell={10} />

// objects add a tooltip per cell
<Heatmap data={days.map((d) => ({ value: d.count, label: \`\${d.date}: \${d.count}\` }))} />`}
      >
        <Heatmap data={heat} label="Contributions in the last 26 weeks" />
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <Tile label="--tone + --dk-ok"><Heatmap data={heat.slice(0, 84)} encode="tone" color="var(--dk-ok)" /></Tile>
          <Tile label="--size + square"><Heatmap data={heat.slice(84, 168)} encode="size" shape="square" cell={10} /></Tile>
          <Tile label="ring"><Heatmap data={heat.slice(40, 124)} shape="ring" /></Tile>
        </div>
      </Example>

      <h3 id="uptime">Uptime bar <Since v="0.2" /></h3>
      <p>
        ステータスページでおなじみの「過去 90 日の稼働状況」です。1 期間を縦 1 列のドットで表し、
        <code>data-state</code>（<code>ok</code> / <code>warn</code> / <code>down</code> / <code>none</code>）で色と高さが変わります。
        色だけに頼らないよう、障害の重さは列の高さ（5 / 3 / 1 ドット）でも表しています。
      </p>
      <Example
        align="left"
        previewStyle={{ display: "block" }}
        html={`<div class="dk-uptime" role="img" aria-label="API: 99.92% uptime over the last 90 days">
  <i></i>                    <!-- ok (default) -->
  <i data-state="warn"></i>
  <i data-state="down"></i>
  <i data-state="none"></i>  <!-- no data -->
  <!-- … -->
</div>`}
        react={`<UptimeBar
  label="API: 99.92% uptime over the last 90 days"
  data={days.map((d) => ({ state: d.state, label: \`\${d.date}: \${d.state}\` }))}
/>`}
      >
        <div className="uptime-demo">
          <div className="uptime-head"><b>API</b><span className="muted mono">99.92% uptime</span></div>
          <UptimeBar data={uptimeA} label="API: 99.92% uptime over the last 90 days" />
          <div className="uptime-head" style={{ marginTop: 20 }}><b>Dashboard</b><span className="muted mono">99.41% uptime</span></div>
          <UptimeBar data={uptimeB} label="Dashboard: 99.41% uptime over the last 90 days" />
          <div className="uptime-foot mono"><span>90 days ago</span><span>Today</span></div>
        </div>
      </Example>
    </>
  );
}
