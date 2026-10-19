import { useState } from "react";
import {
  Badge,
  BarChart,
  Button,
  Card,
  DotIcon,
  DotText,
  Input,
  Meter,
  buttonClassName,
  type Shape,
} from "dotkit/react";
import { CodeBlock } from "../ui";
import pkg from "../../../package.json";

const week = [
  { label: "M", value: 32 },
  { label: "T", value: 48 },
  { label: "W", value: 41 },
  { label: "T", value: 66 },
  { label: "F", value: 90 },
  { label: "S", value: 58 },
  { label: "S", value: 37 },
];

export function Home() {
  return (
    <>
      <section className="hero">
        <span className="eyebrow">Zero-runtime CSS · React bindings · GitHub-only distribution</span>
        <h1 className="hero-title">
          <DotText gap={5} size={4}>dotkit</DotText>
        </h1>
        <p className="hero-lead">
          UI のすべてを<b>ドットの集まり</b>で表現する CSS フレームワーク。
          見た目は <code>--dk-size</code> と <code>--dk-gap</code> の<b>2 つのつまみ</b>だけで決まり、
          JavaScript なしで動きます。
        </p>
        <div className="hero-actions">
          <a className={buttonClassName({ variant: "solid", size: "lg" })} href="#/getting-started">
            Get started <DotIcon name="arrow-right" step={2} />
          </a>
          <a className={buttonClassName({ variant: "outline", size: "lg" })} href="#/catalog">
            Design Catalog
          </a>
          <a className={buttonClassName({ variant: "outline", size: "lg" })} href="#/templates">
            Templates
          </a>
          <a className={buttonClassName({ variant: "ghost", size: "lg" })} href="https://github.com/daisuke-awaji/dotkit">
            <DotIcon name="github" step={2} /> GitHub
          </a>
        </div>
      </section>

      <h2>Why dotkit</h2>
      <div className="grid grid-3">
        <Card className="feature">
          <DotIcon name="star" step={3} />
          <h3>Zero runtime</h3>
          <p>本体は 1 枚の CSS。React コンポーネントは props をクラスと CSS 変数に変換するだけなので、Server Components にもそのまま置けます。</p>
        </Card>
        <Card className="feature">
          <DotIcon name="plus" step={3} />
          <h3>Two knobs</h3>
          <p><code>--dk-size</code>（ドット径）と <code>--dk-gap</code>（間隔）。<code>@property</code> 登録済みなので hover でドットが膨らむ遷移も CSS だけで書けます。</p>
        </Card>
        <Card className="feature">
          <DotIcon name="github" step={3} />
          <h3>GitHub only</h3>
          <p>npm には公開しません。GitHub Releases の tarball、git タグ（semver）、jsDelivr / Pages の CDN から導入できます。</p>
        </Card>
      </div>

      <h2>Two knobs, live</h2>
      <p className="muted">スライダーで、ドット面・枠線・グラフ・メーターの size / gap を同時に変えられます（ボタンと入力欄は shape だけ連動）。</p>
      <Playground />

      <h2>Install in 10 seconds</h2>
      <CodeBlock lang="sh">{`npm i https://github.com/daisuke-awaji/dotkit/releases/download/v${pkg.version}/dotkit-${pkg.version}.tgz`}</CodeBlock>
      <CodeBlock lang="tsx">{`import "dotkit/css";
import { Button, Card, Meter } from "dotkit/react";

export default function Page() {
  return (
    <Card>
      <Meter value={0.62} label="Storage" />
      <Button variant="solid">Deploy</Button>
    </Card>
  );
}`}</CodeBlock>
      <p>
        詳しくは <a href="#/getting-started">Getting Started</a> へ。
      </p>
    </>
  );
}

function Playground() {
  const [size, setSize] = useState(2);
  const [gap, setGap] = useState(6);
  const [shape, setShape] = useState<Shape>("round");
  const vars = { "--dk-size": `${size}px`, "--dk-gap": `${gap}px` } as React.CSSProperties;
  const shapeCls = shape === "round" ? "" : `dk-${shape}`;

  return (
    <Card className="playground" style={{ padding: 0 }}>
      <div className="controls">
        <div className="control">
          <label htmlFor="pg-size"><span>--dk-size</span><span>{size}px</span></label>
          <input id="pg-size" type="range" min={1} max={8} step={0.5} value={size} onChange={(e) => setSize(+e.target.value)} />
        </div>
        <div className="control">
          <label htmlFor="pg-gap"><span>--dk-gap</span><span>{gap}px</span></label>
          <input id="pg-gap" type="range" min={3} max={16} step={1} value={gap} onChange={(e) => setGap(+e.target.value)} />
        </div>
        <div className="control">
          <label><span>shape</span></label>
          <div className="seg">
            {(["round", "square", "ring"] as const).map((s) => (
              <button key={s} aria-pressed={shape === s} onClick={() => setShape(s)}>{s}</button>
            ))}
          </div>
        </div>
        <CodeBlock lang="css">{`:root {\n  --dk-size: ${size}px;\n  --dk-gap: ${gap}px;\n}`}</CodeBlock>
      </div>
      <div className="stage" style={vars}>
        <div className={`dk-dots ${shapeCls}`} style={{ height: 72, borderRadius: 8, color: "var(--dk-ink)" }} />
        <div className={`dk-border ${shapeCls}`} style={{ padding: "16px 18px", borderRadius: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div className="eyebrow">Requests</div>
              <div style={{ font: "800 34px/1.1 Doto, monospace" }}>12.4k</div>
            </div>
            <Badge variant="solid">+8.2%</Badge>
          </div>
          <div className={shapeCls} style={{ marginTop: 12 }}>
            <BarChart data={week} height={72} size={size * 1.6} gap={gap} shape={shape} label="Weekly requests" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Input placeholder="Search…" leading={<DotIcon name="search" step={2} />} fieldClassName={shapeCls} />
          <Button variant="solid" shape={shape}>Deploy</Button>
          <Button variant="outline" shape={shape}>Cancel</Button>
        </div>
        <Meter value={0.62} label="Storage" shape={shape} size={size * 2.5} gap={gap * 1.6} />
      </div>
    </Card>
  );
}
