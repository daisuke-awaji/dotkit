import {
  Dots,
  Duotone,
  Pattern,
} from "dotkit/react";
import { Example } from "../../ui";
import { Tile, Since } from "./shared";

export function Primitives() {
  return (
    <>
      <h2 id="primitives">Primitives</h2>
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

      <h3 id="duotone">Duotone — 2 色のドット <Since v="0.4" /></h3>
      <p>
        <code>.dk-duotone</code> は <code>--dk-color</code> と <code>--dk-color-2</code> の 2 色のドットを、半ピッチずらして交互に並べます。
        <code>.dk-duotone--ramp</code> は 1 枚のグラデーション（<code>--dk-angle</code> の向き）をドットの穴から覗かせる表現で、色が場所によって移り変わります。
      </p>
      <Example
        html={`<div class="dk-duotone" style="--dk-color: #2649d0; --dk-color-2: #ff48b0; --dk-size: 4px; --dk-gap: 10px"></div>
<div class="dk-duotone dk-duotone--ramp" style="--dk-color: #ff48b0; --dk-color-2: #2649d0; --dk-angle: 135deg"></div>`}
        react={`<Duotone color="#2649d0" color2="#ff48b0" size={4} gap={10} />
<Duotone ramp color="#ff48b0" color2="#2649d0" angle="135deg" size={4} gap={8} />`}
      >
        <Tile label=".dk-duotone"><Duotone color="#2649d0" color2="#ff48b0" size={4} gap={10} className="tile-stage" /></Tile>
        <Tile label="square + mute"><Duotone shape="square" size={3} gap={8} className="tile-stage" /></Tile>
        <Tile label="--ramp 135deg"><Duotone ramp color="#ff48b0" color2="#2649d0" angle="135deg" size={4} gap={8} className="tile-stage" /></Tile>
        <Tile label="--ramp ok → info"><Duotone ramp color="var(--dk-ok)" color2="var(--dk-info)" density="dense" className="tile-stage" /></Tile>
      </Example>

      <h3 id="pattern">Pattern — ドットの並べ方 <Since v="0.4" /></h3>
      <p>
        同じドットの並べ方を変えた柄です。<code>.dk-pattern</code> に <code>--checker</code>（市松）/ <code>--stripes</code>（横縞）/ <code>--grid</code>（方眼）/
        <code>--diagonal</code>（斜線）/ <code>--cross</code>（十字）/ <code>--stipple</code>（不規則な点描）を組み合わせます。大きさと色はいつもの 3 つの変数です。
      </p>
      <Example
        html={`<div class="dk-pattern dk-pattern--checker"></div>
<div class="dk-pattern dk-pattern--grid" style="--dk-gap: 5px"></div>
<div class="dk-pattern dk-pattern--stipple" style="--dk-size: 2.5px"></div>`}
        react={`<Pattern kind="checker" />
<Pattern kind="grid" gap={5} />
<Pattern kind="stipple" size={2.5} />`}
      >
        {(["checker", "stripes", "grid", "diagonal", "cross", "stipple"] as const).map((k) => (
          <Tile key={k} label={`--${k}`}><Pattern kind={k} size={k === "stipple" ? 3 : 2.5} gap={k === "grid" ? 5 : 7} className="tile-stage" /></Tile>
        ))}
      </Example>
    </>
  );
}
