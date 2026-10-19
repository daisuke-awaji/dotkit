import {
  BarChart,
  DotDigits,
  Heatmap,
  Meter,
  Pictogram,
  RingMeter,
  Sparkline,
  UptimeBar,
} from "dotkit/react";
import { Example } from "../../ui";
import { Tile, Since, rand, contributions, week } from "./shared";
import { useT } from "../../i18n";
const heat = contributions(26);
const r = rand(3);
const uptimeA = Array.from({ length: 90 }, (_, i) => (i === 61 ? "down" : i === 23 || i === 62 ? "warn" : "ok") as "ok" | "warn" | "down");
const uptimeB = Array.from({ length: 90 }, (_, i) => (i < 6 ? "none" : r() < 0.04 ? "down" : r() < 0.08 ? "warn" : "ok") as "ok" | "warn" | "down" | "none");
const wave = (n: number, seed: number, f: (i: number, r: () => number) => number) => { const rr = rand(seed); return Array.from({ length: n }, (_, i) => f(i, rr)); };
const series1 = wave(40, 11, (i, rr) => 20 + i * 1.2 + Math.sin(i / 3) * 6 + rr() * 6);
const series2 = wave(40, 12, (i, rr) => 180 + Math.sin(i / 5) * 30 + rr() * 25 - (i > 30 ? 20 : 0));
const series3 = wave(40, 13, (i, rr) => (rr() < 0.12 ? 2 + rr() * 3 : rr() * 0.8));

export function DataDisplay() {
  const t = useT();
  return (
    <>
      <h2 id="data">Data display</h2>
      <p className="muted">{t(<>ドットの数・大きさ・濃さで値を表す部品。</>, <>Parts that show values through the number, size and tone of dots.</>)}</p>

      <h3 id="meter">Meter</h3>
      <p>
        {t(
          <>
            値は <code>round()</code> でドット単位に切り捨てられ、半端なドットが出ません。
            React 版は <code>role="meter"</code> と <code>aria-valuenow</code> を自動で付けます。
          </>,
          <>
            Values are rounded down to whole dots with <code>round()</code>, so you never get a partial dot.
            The React version adds <code>role="meter"</code> and <code>aria-valuenow</code> automatically.
          </>,
        )}
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

      <h3 id="ring">Ring meter <Since v="0.4" /></h3>
      <p>
        {t(
          <>
            円周上に並んだドットで進み具合を表すメーターです。<code>--dk-value</code>（0〜1）に応じて、ドットが 1 つずつ点きます（端数は切り捨て）。
            中には <code>--dk-count</code> 個（最大 60）の <code>&lt;i&gt;</code> を置き、それ以外の要素は中央のラベルになります。
            大きさは <code>--dk-diameter</code>、ドット径は <code>--dk-size</code> です。
          </>,
          <>
            A meter that shows progress with dots around a circle. Dots light up one at a time with <code>--dk-value</code> (0–1), rounding down.
            Place <code>--dk-count</code> <code>&lt;i&gt;</code> elements inside (up to 60); any other element becomes the centered label.
            Set the size with <code>--dk-diameter</code> and the dot diameter with <code>--dk-size</code>.
          </>,
        )}
      </p>
      <Example
        html={`<div class="dk-ring-meter" style="--dk-value: .62" role="meter"
     aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" aria-label="Context window">
  <i></i><i></i><i></i> <!-- … 24 <i> in total -->
  <span>62%</span>
</div>`}
        react={`<RingMeter value={0.62} label="Context window">62%</RingMeter>
<RingMeter value={0.35} count={60} size={3} diameter={120} color="var(--dk-info)" />
<RingMeter value={0.9} count={12} size={10} shape="square" />`}
      >
        <RingMeter value={0.62} label="Context window"><b style={{ fontSize: 20 }}>62%</b><br /><span className="muted" style={{ fontSize: 11 }}>context</span></RingMeter>
        <RingMeter value={0.35} count={60} size={3} diameter={120} color="var(--dk-info)" label="Seconds"><DotDigits value="21" step={3} /></RingMeter>
        <RingMeter value={0.9} count={12} size={10} diameter={88} shape="square" color="var(--dk-ok)" label="Health" />
      </Example>

      <h3 id="chart">Bar chart</h3>
      <p>{t(<>バーはドットの積み重ね。高さもドット単位にスナップします。</>, <>Bars are stacks of dots, and their height snaps to whole dots too.</>)}</p>
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

      <h3 id="sparkline">Sparkline <Since v="0.3" /></h3>
      <p>
        {t(
          <>
            値ごとに 1 つのドットを、その高さに置いた小さな折れ線です。最新の値には輪が付きます。
            <code>.dk-spark--area</code> で各点の下を薄いドットで埋めます。値は Heatmap と同じく <code>--dk-value</code>（0〜1）です。
          </>,
          <>
            A tiny line chart that places one dot per value at its height. The latest value gets a ring.
            <code>.dk-spark--area</code> fills below each point with faint dots. Values use <code>--dk-value</code> (0–1), like Heatmap.
          </>,
        )}
      </p>
      <Example
        align="left"
        previewStyle={{ gap: 40 }}
        html={`<div class="dk-spark" role="img" aria-label="Requests, last 30 days">
  <i style="--dk-value: .2"></i>
  <i style="--dk-value: .35"></i>
  <i style="--dk-value: .3"></i>
  <!-- … -->
</div>

<div class="dk-spark dk-spark--area" style="--dk-color: var(--dk-info); height: 56px">…</div>`}
        react={`<Sparkline data={requests} label="Requests, last 30 days" />
<Sparkline data={latency} area color="var(--dk-info)" height={56} />`}
      >
        <div className="spark-card">
          <span className="eyebrow">Requests</span>
          <div className="spark-row"><b>12.4k</b><Sparkline data={series1} label="Requests, last 40 days" style={{ width: 180 }} /></div>
        </div>
        <div className="spark-card">
          <span className="eyebrow">p95 latency</span>
          <div className="spark-row"><b>182ms</b><Sparkline data={series2} area color="var(--dk-info)" height={56} label="p95 latency, last 40 days" style={{ width: 200 }} /></div>
        </div>
        <div className="spark-card">
          <span className="eyebrow">Errors</span>
          <div className="spark-row"><b>0.3%</b><Sparkline data={series3} shape="square" size={3} color="var(--dk-danger)" label="Error rate" style={{ width: 160 }} /></div>
        </div>
      </Example>

      <h3 id="heatmap">Heatmap <Since v="0.2" /></h3>
      <p>
        {t(
          <>
            GitHub の草のような、1 セルに 1 ドットのヒートマップです。値（<code>--dk-value</code>、0〜1）がドットの大きさと濃さの両方に効きます。
            <code>.dk-heatmap--tone</code> は濃さだけ、<code>.dk-heatmap--size</code> は大きさだけで値を表します。
            セルは列ごとに上から下へ並ぶので、<code>--dk-rows: 7</code>（既定値）なら 1 列が 1 週間になります。
          </>,
          <>
            A heatmap with one dot per cell, like GitHub's contribution graph. The value (<code>--dk-value</code>, 0–1) drives both dot size and tone.
            <code>.dk-heatmap--tone</code> encodes it in tone only, <code>.dk-heatmap--size</code> in size only.
            Cells run top to bottom in each column, so with <code>--dk-rows: 7</code> (the default) each column is one week.
          </>,
        )}
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
        {t(
          <>
            ステータスページでおなじみの「過去 90 日の稼働状況」です。1 期間を縦 1 列のドットで表し、
            <code>data-state</code>（<code>ok</code> / <code>warn</code> / <code>down</code> / <code>none</code>）で色と高さが変わります。
            色だけに頼らないよう、障害の重さは列の高さ（5 / 3 / 1 ドット）でも表しています。
          </>,
          <>
            The familiar “last 90 days” bar from status pages. Each period is one vertical column of dots, and
            <code>data-state</code> (<code>ok</code> / <code>warn</code> / <code>down</code> / <code>none</code>) changes its color and height.
            So that color is never the only signal, severity is also shown by column height (5 / 3 / 1 dots).
          </>,
        )}
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

      <h3 id="pictogram">Pictogram <Since v="0.3" /></h3>
      <p>
        {t(
          <>
            アイコン 1 つを 1 単位として数を表すグラフ（アイソタイプ）です。各アイコンの <code>--dk-value</code>（0〜1）が塗る割合で、
            端数はドットの列単位で切り替わります。残りは薄く表示します。
          </>,
          <>
            A chart where one icon stands for one unit (an isotype). Each icon's <code>--dk-value</code> (0–1) is how much of it is filled,
            with fractions switching by dot column. The remainder is shown faintly.
          </>,
        )}
      </p>
      <Example
        align="left"
        previewStyle={{ display: "grid", gap: 24 }}
        html={`<div class="dk-pictogram" role="img" aria-label="7.4 of 10 users">
  <span class="dk-icon dk-icon--user"></span>              <!-- full -->
  <span class="dk-icon dk-icon--user" style="--dk-value: .4"></span>
  <span class="dk-icon dk-icon--user" style="--dk-value: 0"></span>
</div>`}
        react={`<Pictogram icon="user" value={7.4} total={10} label="7.4 of 10 users" />
<Pictogram icon="heart" value={3.5} total={5} step={4} color="var(--dk-danger)" />`}
      >
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>74% of users finished onboarding</div>
          <Pictogram icon="user" value={7.4} total={10} step={4} label="7.4 of 10 users finished onboarding" />
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Rating 3.5 / 5</div>
          <Pictogram icon="heart" value={3.5} total={5} step={4} color="var(--dk-danger)" label="Rating 3.5 out of 5" />
        </div>
      </Example>
    </>
  );
}
