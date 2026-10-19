import {
  Button,
  Checkbox,
  DotIcon,
  Input,
  Radio,
  Range,
  Switch,
  buttonClassName,
} from "dotkit/react";
import { Example } from "../../ui";
import { Since } from "./shared";
import { useState } from "react";

function RangeDemo() {
  const [v, setV] = useState(40);
  const [t, setT] = useState(0.7);
  return (
    <>
      <label className="dk-choice" style={{ gap: 16 }}>
        <span style={{ width: 92 }}>Volume</span>
        <Range min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} style={{ width: 260 }} />
        <span className="mono" style={{ width: 32 }}>{v}</span>
      </label>
      <label className="dk-choice" style={{ gap: 16 }}>
        <span style={{ width: 92 }}>Temperature</span>
        <Range min={0} max={2} step={0.1} value={t} onChange={(e) => setT(+e.target.value)} dotSize={3} gap={6} style={{ width: 260 }} />
        <span className="mono" style={{ width: 32 }}>{t.toFixed(1)}</span>
      </label>
      <label className="dk-choice" style={{ gap: 16 }}>
        <span style={{ width: 92 }}>Disabled</span>
        <Range min={0} max={100} defaultValue={25} disabled style={{ width: 260 }} />
      </label>
    </>
  );
}

export function Forms() {
  return (
    <>
      <h2 id="forms">Forms</h2>
      <p className="muted">操作できる部品。どれもネイティブ要素の見た目だけを変えています。</p>

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

      <h3 id="choice">Checkbox / Radio / Switch <Since v="0.2" /></h3>
      <p>
        ネイティブの <code>&lt;input&gt;</code> に <code>appearance: none</code> を当て、見た目だけをドットで描き直しています。
        キーボード操作・フォーム送信・読み上げはブラウザ標準のままです。
        チェックボックスはチェックすると面がドットで埋まり、ラジオボタンは 1 点が膨らみ、スイッチはドットのつまみが移動します。
        大きさは <code>--dk-control</code>（既定値 18px）で変えられます。
      </p>
      <Example
        align="left"
        previewStyle={{ alignItems: "flex-start", gap: 40 }}
        html={`<label class="dk-choice">
  <input type="checkbox" class="dk-check" checked> Email notifications
</label>

<label class="dk-choice">
  <input type="radio" class="dk-radio" name="plan" checked> Hobby
</label>

<label class="dk-choice">
  <input type="checkbox" class="dk-switch" role="switch"> Airplane mode
</label>

<!-- size -->
<input type="checkbox" class="dk-switch" role="switch" style="--dk-control: 26px" aria-label="Large">`}
        react={`<Checkbox defaultChecked>Email notifications</Checkbox>
<Checkbox ref={(el) => { if (el) el.indeterminate = true; }}>Select all</Checkbox>

<Radio name="plan" defaultChecked>Hobby</Radio>
<Radio name="plan">Pro</Radio>

<Switch>Airplane mode</Switch>
<Switch controlSize={26} aria-label="Large" />`}
      >
        <div className="stack">
          <Checkbox defaultChecked>Email notifications</Checkbox>
          <Checkbox>Weekly digest</Checkbox>
          <Checkbox ref={(el) => { if (el) el.indeterminate = true; }}>Select all</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
        </div>
        <div className="stack" role="radiogroup" aria-label="Plan">
          <Radio name="plan-demo" defaultChecked>Hobby</Radio>
          <Radio name="plan-demo">Pro</Radio>
          <Radio name="plan-demo">Team</Radio>
          <Radio name="plan-demo" disabled>Enterprise</Radio>
        </div>
        <div className="stack">
          <Switch defaultChecked>Dark dots</Switch>
          <Switch>Airplane mode</Switch>
          <Switch controlSize={26} defaultChecked>Large</Switch>
          <Checkbox controlSize={24} defaultChecked>Large checkbox</Checkbox>
        </div>
      </Example>

      <h3 id="range">Range <Since v="0.4" /></h3>
      <p>
        ネイティブの <code>&lt;input type="range"&gt;</code> をドットの目盛りの上に載せた部品です。つまみは 1 つの大きなドットで、選んだ値までのドットが濃くなります。
        CSS からは input の値を読めないので、塗りの位置は外側の <code>.dk-range</code> に <code>--dk-value</code>（0〜1）で渡します。
        React 版は <code>value</code>（または <code>defaultValue</code>）から自動で計算するので、制御コンポーネントとして使ってください。
      </p>
      <Example
        align="left"
        previewStyle={{ display: "grid", gap: 20, justifyItems: "start" }}
        html={`<label class="dk-choice">
  Volume
  <span class="dk-range" style="--dk-value: .4">
    <input type="range" min="0" max="100" value="40"
           oninput="this.parentNode.style.setProperty('--dk-value', this.value / 100)">
  </span>
</label>`}
        react={`const [v, setV] = useState(40);

<Range min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} aria-label="Volume" />
<Range min={0} max={2} step={0.1} value={t} onChange={…} dotSize={3} gap={6} style={{ width: 240 }} />`}
      >
        <RangeDemo />
      </Example>
    </>
  );
}
