import {
  Badge,
  BarChart,
  Button,
  Card,
  Divider,
  DotBorder,
  DotIcon,
  DotText,
  Dots,
  Halftone,
  Input,
  Loader,
  Meter,
} from "dotkit/react";
import { Example, Toc } from "../ui";

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="tile">
      {children}
      <span className="tile-label">{label}</span>
    </div>
  );
}

const week = [32, 48, 41, 66, 90, 58, 37];

export function Catalog() {
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Design Catalog</h1>
      <p className="muted">
        dotkit で描けるすべての表現と、その書き方。各プレビューは実際の dotkit で描画されています。
        HTML（クラス）と React の両方のコードを載せています。
      </p>
      <Toc
        items={[
          ["dots", "Dots"],
          ["shape", "Shape"],
          ["fade", "Fade"],
          ["border", "Border"],
          ["halftone", "Halftone"],
          ["text", "Dot text"],
          ["icon", "Icon"],
          ["loader", "Loader"],
          ["button", "Button"],
          ["badge", "Badge"],
          ["input", "Input"],
          ["divider", "Divider"],
          ["meter", "Meter"],
          ["chart", "Bar chart"],
          ["card", "Card"],
          ["compose", "Composition"],
        ]}
      />

      {/* ================= Primitives ================= */}
      <h2 id="primitives" style={{ marginTop: 48 }}>Primitives</h2>
      <p className="muted">すべての土台。ドット面・形・濃度の 3 要素です。</p>

      <h3 id="dots">Dots — ドット面と密度</h3>
      <p>
        <code>.dk-dots</code> は要素をドットのグリッドで塗ります。密度は <code>.dk-sparse</code> /{" "}
        <code>.dk-normal</code> / <code>.dk-dense</code> のプリセットか、<code>--dk-size</code> と <code>--dk-gap</code> で直接指定します。
        <code>background-repeat: space</code> なので端でドットが欠けません。
      </p>
      <Example
        html={`<div class="dk-dots dk-sparse"></div>
<div class="dk-dots dk-normal"></div>
<div class="dk-dots dk-dense"></div>
<div class="dk-dots" style="--dk-size: 5px; --dk-gap: 12px"></div>`}
        react={`<Dots density="sparse" />
<Dots density="normal" />
<Dots density="dense" />
<Dots size={5} gap={12} />`}
      >
        <Tile label=".dk-sparse"><Dots density="sparse" className="tile-stage" /></Tile>
        <Tile label=".dk-normal"><Dots density="normal" className="tile-stage" /></Tile>
        <Tile label=".dk-dense"><Dots density="dense" className="tile-stage" /></Tile>
        <Tile label="size 5 / gap 12"><Dots size={5} gap={12} className="tile-stage" /></Tile>
      </Example>

      <h3 id="shape">Shape — 形</h3>
      <p><code>.dk-square</code> と <code>.dk-ring</code> は、その要素とドット枠（<code>::before</code>）のドット形状を切り替えます。</p>
      <Example
        html={`<div class="dk-dots" style="--dk-size: 4px; --dk-gap: 9px"></div>
<div class="dk-dots dk-square" style="--dk-size: 4px; --dk-gap: 9px"></div>
<div class="dk-dots dk-ring" style="--dk-size: 7px; --dk-gap: 11px"></div>`}
        react={`<Dots size={4} gap={9} />
<Dots shape="square" size={4} gap={9} />
<Dots shape="ring" size={7} gap={11} />`}
      >
        <Tile label="round"><Dots size={4} gap={9} className="tile-stage" /></Tile>
        <Tile label=".dk-square"><Dots shape="square" size={4} gap={9} className="tile-stage" /></Tile>
        <Tile label=".dk-ring"><Dots shape="ring" size={7} gap={11} className="tile-stage" /></Tile>
      </Example>

      <h3 id="fade">Fade — 濃度のグラデーション</h3>
      <p>
        マスクでドット面を消していきます。<code>.dk-fade-r</code> / <code>-l</code> / <code>-t</code> / <code>-b</code> /{" "}
        <code>-radial</code>。背景の「気配」づくりに。
      </p>
      <Example
        html={`<div class="dk-dots dk-dense dk-fade-r"></div>
<div class="dk-dots dk-dense dk-fade-b"></div>
<div class="dk-dots dk-dense dk-fade-radial"></div>`}
        react={`<Dots density="dense" fade="r" />
<Dots density="dense" fade="b" />
<Dots density="dense" fade="radial" />`}
      >
        <Tile label=".dk-fade-r"><Dots density="dense" fade="r" className="tile-stage" /></Tile>
        <Tile label=".dk-fade-b"><Dots density="dense" fade="b" className="tile-stage" /></Tile>
        <Tile label=".dk-fade-radial"><Dots density="dense" fade="radial" className="tile-stage" /></Tile>
      </Example>

      {/* ================= Techniques ================= */}
      <h2 id="techniques">Techniques</h2>
      <p className="muted">プリミティブの組み合わせで描く、dotkit らしい表現。</p>

      <h3 id="border">Border — ドットの枠線</h3>
      <p>
        <code>.dk-border</code> は 1 列のドットで枠を描きます（<code>::before</code> + mask）。角丸は親の{" "}
        <code>border-radius</code> を継承します。
      </p>
      <Example
        html={`<div class="dk-border" style="padding: 20px; border-radius: 10px">Default</div>
<div class="dk-border dk-square" style="--dk-gap: 8px; --dk-size: 3px">Square</div>
<div class="dk-border" style="--dk-gap: 10px; --dk-size: 4px; --dk-color: #0070f3">Brand</div>`}
        react={`<DotBorder style={{ padding: 20, borderRadius: 10 }}>Default</DotBorder>
<DotBorder shape="square" gap={8} size={3}>Square</DotBorder>
<DotBorder gap={10} size={4} color="#0070f3">Brand</DotBorder>`}
      >
        <DotBorder style={{ padding: "20px 28px", borderRadius: 10 }}>Default</DotBorder>
        <DotBorder shape="square" gap={8} size={3} style={{ padding: "20px 28px" }}>Square</DotBorder>
        <DotBorder gap={10} size={4} color="#0070f3" style={{ padding: "20px 28px", borderRadius: 999 }}>Brand</DotBorder>
      </Example>

      <h3 id="halftone">Halftone — 大きさで階調を表す</h3>
      <p>
        ぼかした点と階調を重ね、<code>filter: contrast()</code> で二値化して「ドットの大きさ」で濃淡を表現します。
        方向は <code>--to-bottom</code> / <code>--to-left</code> / <code>--radial</code>、または <code>--dk-tone</code> に任意のグラデーション（黒 = 最大）を指定できます。
        装飾専用なので中に要素を入れないでください。
      </p>
      <Example
        html={`<div class="dk-halftone"></div>
<div class="dk-halftone dk-halftone--to-bottom"></div>
<div class="dk-halftone dk-halftone--radial" style="--dk-gap: 10px"></div>
<div class="dk-halftone" style="--dk-tone: linear-gradient(90deg, #8a8a8a, #000, #8a8a8a)"></div>`}
        react={`<Halftone />
<Halftone direction="to-bottom" />
<Halftone direction="radial" gap={10} />
<Halftone tone="linear-gradient(90deg, #8a8a8a, #000, #8a8a8a)" />`}
      >
        <Tile label="to-right"><Halftone className="tile-stage" /></Tile>
        <Tile label="--to-bottom"><Halftone direction="to-bottom" className="tile-stage" /></Tile>
        <Tile label="--radial"><Halftone direction="radial" gap={10} className="tile-stage" /></Tile>
        <Tile label="custom --dk-tone"><Halftone tone="linear-gradient(90deg, #8a8a8a, #000, #8a8a8a)" className="tile-stage" /></Tile>
      </Example>

      <h3 id="text">Dot text — 文字をドットで塗る</h3>
      <p>
        <code>.dk-text</code> は <code>background-clip: text</code> でグリフをドットで塗ります。どんなフォントでも使えます。
        ドットマトリクス書体（例: Google Fonts の Doto）と組み合わせると、さらにらしくなります。
      </p>
      <Example
        html={`<span class="dk-text" style="font: 800 72px/1 Geist; --dk-gap: 4px; --dk-size: 3.4px">Aa 01</span>
<span style="font: 800 64px/1 Doto">12:48</span>`}
        react={`<DotText gap={4} size={3.4} style={{ font: "800 72px/1 Geist" }}>Aa 01</DotText>
<span style={{ font: "800 64px/1 Doto" }}>12:48</span>`}
      >
        <DotText gap={4} size={3.4} style={{ font: "800 72px/1 Geist, sans-serif", letterSpacing: "-.03em" }}>Aa 01</DotText>
        <span style={{ font: "800 64px/1 Doto, monospace" }}>12:48</span>
      </Example>

      <h3 id="icon">Icon — 7×7 ドットマトリクス</h3>
      <p>
        <code>.dk-icon .dk-icon--{"{name}"}</code>。色は <code>currentColor</code>、大きさは <code>--dk-icon-step</code> × 7。
        全 {""}<a href="#/icons">アイコン一覧</a>はこちら。
      </p>
      <Example
        html={`<span class="dk-icon dk-icon--arrow-right" aria-hidden="true"></span>
<span class="dk-icon dk-icon--heart" style="--dk-icon-step: 5px; color: #e00"></span>
<span class="dk-icon dk-icon--star dk-icon--square" style="--dk-icon-step: 5px"></span>`}
        react={`<DotIcon name="arrow-right" />
<DotIcon name="heart" step={5} style={{ color: "#e00" }} />
<DotIcon name="star" step={5} square label="Favorite" />`}
      >
        <DotIcon name="arrow-right" />
        <DotIcon name="check" />
        <DotIcon name="search" />
        <DotIcon name="heart" step={5} style={{ color: "#e00" }} />
        <DotIcon name="star" step={5} square label="Favorite" />
        <DotIcon name="github" step={6} />
      </Example>

      <h3 id="loader">Loader — ドットの波</h3>
      <p><code>prefers-reduced-motion: reduce</code> では停止します。</p>
      <Example
        html={`<span class="dk-loader" role="status" aria-label="Loading">
  <i></i><i></i><i></i><i></i><i></i>
</span>`}
        react={`<Loader />
<Loader count={8} size={4} />`}
      >
        <Loader />
        <Loader count={8} size={4} />
        <Loader count={3} size={10} />
      </Example>

      {/* ================= Components ================= */}
      <h2 id="components">Components</h2>
      <p className="muted">最小セット。操作系の複雑なコンポーネントは今後ヘッドレス UI の上に載せる予定です。</p>

      <h3 id="button">Button</h3>
      <p>
        <code>solid</code> / <code>outline</code> / <code>ghost</code> × <code>sm</code> / <code>md</code> / <code>lg</code>。
        hover でドットが膨らみ面が「詰まる」のは <code>@property</code> による <code>--dk-size</code> の遷移です。
        リンク等には <code>buttonClassName()</code> を使います。
      </p>
      <Example
        html={`<button class="dk-btn dk-btn--solid">Deploy</button>
<button class="dk-btn dk-btn--outline">Cancel</button>
<button class="dk-btn dk-btn--ghost">Ghost</button>
<button class="dk-btn dk-btn--outline dk-square dk-btn--sm">Small</button>
<a class="dk-btn dk-btn--solid dk-btn--lg" href="/docs">Large link</a>`}
        react={`<Button variant="solid">Deploy <DotIcon name="arrow-right" step={2} /></Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline" shape="square" size="sm">Small</Button>
<a className={buttonClassName({ variant: "solid", size: "lg" })} href="/docs">Large link</a>`}
      >
        <Button variant="solid">Deploy <DotIcon name="arrow-right" step={2} /></Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline" shape="square" size="sm">Small</Button>
        <Button variant="solid" size="lg">Large</Button>
        <Button variant="solid" disabled>Disabled</Button>
      </Example>

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

      <h3 id="input">Input</h3>
      <p>ドット枠の入力欄。フォーカスで枠のドットが濃く・大きくなります。</p>
      <Example
        html={`<label class="dk-field">
  <span class="dk-icon dk-icon--search" style="--dk-icon-step: 2px" aria-hidden="true"></span>
  <input class="dk-input" placeholder="Search…">
</label>`}
        react={`<Input placeholder="Search…" leading={<DotIcon name="search" step={2} />} />
<Input placeholder="you@example.com" type="email" fieldClassName="dk-square" />`}
      >
        <Input placeholder="Search…" leading={<DotIcon name="search" step={2} />} aria-label="Search" />
        <Input placeholder="you@example.com" type="email" fieldClassName="dk-square" aria-label="Email" />
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
