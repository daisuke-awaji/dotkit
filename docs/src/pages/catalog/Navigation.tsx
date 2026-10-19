import {
  Card,
  Divider,
  DotLeaders,
  Leader,
  PaginationDots,
  Steps,
  Tab,
  TabList,
} from "dotkit/react";
import { Example } from "../../ui";
import { Since } from "./shared";
import { useState } from "react";
import { useT } from "../../i18n";

function TabsDemo() {
  const [tab, setTab] = useState(0);
  const tabs = ["Overview", "Deployments", "Analytics", "Settings"];
  return (
    <div>
      <TabList aria-label="Project">
        {tabs.map((t, i) => (
          <Tab key={t} id={`tab-${i}`} aria-controls="tab-panel" selected={tab === i} onClick={() => setTab(i)}
            onKeyDown={(e) => {
              const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
              if (!d) return;
              const n = (tab + d + tabs.length) % tabs.length;
              setTab(n);
              document.getElementById(`tab-${n}`)?.focus();
            }}
          >{t}</Tab>
        ))}
      </TabList>
      <div id="tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} style={{ padding: "18px 4px 4px", fontSize: 14 }} className="muted">
        {tabs[tab]} panel — the selected tab is underlined with ink dots.
      </div>
    </div>
  );
}

function PagerDemo() {
  const [i, setI] = useState(1);
  const slides = ["Dots", "Halftone", "Patterns", "Digits", "Themes"];
  return (
    <>
      <Card style={{ width: 300, height: 120, display: "grid", placeItems: "center", padding: 0, overflow: "hidden" }}>
        <span className="mono" style={{ fontSize: 13 }}>{i + 1} / {slides.length} — {slides[i]}</span>
      </Card>
      <PaginationDots count={slides.length} current={i} onSelect={setI} aria-label="Slides" />
    </>
  );
}

export function Navigation() {
  const t = useT();
  return (
    <>
      <h2 id="navigation">Navigation</h2>
      <p className="muted">{t(<>項目どうしをつなぎ、現在地を示す部品。</>, <>Parts that connect items and show where you are.</>)}</p>

      <h3 id="tabs">Tabs <Since v="0.4" /></h3>
      <p>
        {t(
          <>
            選んでいるタブの下にだけ、濃いドットの線が付きます。<code>.dk-tabs</code>（<code>role="tablist"</code>）の中の
            <code>[aria-selected="true"]</code>（リンクの場合は <code>[aria-current="page"]</code>）が選択中の見た目になります。
            dotkit は見た目だけを担当し、選択状態とパネルの切り替えは利用側で行います（React 版の <code>&lt;Tab&gt;</code> はロービング tabIndex だけ付けます）。
          </>,
          <>
            Only the selected tab gets a line of dark dots beneath it. Inside <code>.dk-tabs</code> (<code>role="tablist"</code>),
            <code>[aria-selected="true"]</code> (or <code>[aria-current="page"]</code> for links) gets the selected look.
            dotkit handles only the look; you manage selection and panel switching (the React <code>&lt;Tab&gt;</code> just adds a roving tabIndex).
          </>,
        )}
      </p>
      <Example
        align="left"
        previewStyle={{ display: "block" }}
        html={`<div class="dk-tabs" role="tablist" aria-label="Project">
  <button role="tab" aria-selected="true" aria-controls="p-overview">Overview</button>
  <button role="tab" aria-selected="false" tabindex="-1">Deployments</button>
  <button role="tab" aria-selected="false" tabindex="-1">Settings</button>
</div>

<!-- links -->
<nav class="dk-tabs"><a href="/docs" aria-current="page">Docs</a><a href="/blog">Blog</a></nav>`}
        react={`const [tab, setTab] = useState(0);

<TabList aria-label="Project">
  {["Overview", "Deployments", "Settings"].map((t, i) => (
    <Tab key={t} selected={tab === i} onClick={() => setTab(i)}>{t}</Tab>
  ))}
</TabList>`}
      >
        <TabsDemo />
      </Example>

      <h3 id="pager">Pagination dots <Since v="0.4" /></h3>
      <p>
        {t(
          <>
            カルーセルなどの現在位置を示すドットです。今いる位置のドットだけが横に伸びて 3 つのドットになります。
            <code>.dk-pager</code> の中のボタン（またはリンク）に <code>aria-current="true"</code> を付けます。各ボタンには「3 枚目」のような名前を付けてください。
          </>,
          <>
            Dots that show the current position in a carousel or similar. Only the current dot stretches sideways into three dots.
            Put <code>aria-current="true"</code> on a button (or link) inside <code>.dk-pager</code>, and give each button a name such as “Slide 3”.
          </>,
        )}
      </p>
      <Example
        previewStyle={{ flexDirection: "column", gap: 16 }}
        html={`<nav class="dk-pager" aria-label="Slides">
  <button aria-label="Slide 1"></button>
  <button aria-label="Slide 2" aria-current="true"></button>
  <button aria-label="Slide 3"></button>
</nav>`}
        react={`<PaginationDots count={5} current={i} onSelect={setI} aria-label="Slides" />
<PaginationDots count={8} current={3} size={6} />`}
      >
        <PagerDemo />
      </Example>

      <h3 id="steps">Stepper <Since v="0.3" /></h3>
      <p>
        {t(
          <>
            手順の進み具合を、ドットの印とドットの線で表します。<code>&lt;ol class="dk-steps"&gt;</code> の現在の項目に
            <code>aria-current="step"</code> を付けると、それより前の項目は自動で「完了」になります（<code>data-state="done"</code> で明示もできます）。
            <code>.dk-steps--vertical</code> で縦並びになります。
          </>,
          <>
            Shows progress through steps with dot markers and dotted lines. Put <code>aria-current="step"</code> on the current item of
            <code>&lt;ol class="dk-steps"&gt;</code> and the earlier items automatically become “done” (you can also set <code>data-state="done"</code> explicitly).
            <code>.dk-steps--vertical</code> stacks them vertically.
          </>,
        )}
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

      <h3 id="leaders">Dot leaders <Since v="0.2" /></h3>
      <p>
        {t(
          <>
            目次やレシート、料金表で「項目 ……… 値」をつなぐ点線です。<code>.dk-leaders</code> の子要素が 1 行になり、
            行の最初の要素と最後の要素のあいだをドットで埋めます。リンクにするときは
            <code>&lt;li&gt;&lt;a class="dk-leader"&gt;</code> のように、行にあたる要素へ <code>.dk-leader</code> を付けます。
          </>,
          <>
            The dotted line that joins “item ……… value” in tables of contents, receipts and price lists. Each child of <code>.dk-leaders</code> becomes a row,
            and dots fill the space between the row's first and last elements. For links, add <code>.dk-leader</code> to the element that forms the row,
            as in <code>&lt;li&gt;&lt;a class="dk-leader"&gt;</code>.
          </>,
        )}
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
