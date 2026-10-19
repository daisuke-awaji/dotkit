import {
  Card,
  DotBorder,
  DotDigits,
  DotIcon,
  DotText,
  Halftone,
  HalftoneImage,
  Loader,
  Meter,
} from "dotkit/react";
import { Example } from "../../ui";
import { Tile, Since, sample } from "./shared";

export function Techniques() {
  return (
    <>
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

      <h3 id="march">Marching border — 枠のドットが回る <Since v="0.3" /></h3>
      <p>
        <code>.dk-march</code> を付けると、ドット枠のドットが時計回りに流れます。ファイルのドロップ先や、処理中・選択中の枠に使えます。
        <code>.dk-border</code> / <code>.dk-card</code> / <code>.dk-field</code> / <code>.dk-btn--outline</code> のように、ドット枠を持つ要素に付けてください。
        「動きを減らす」設定のときは止まります。
      </p>
      <Example
        html={`<div class="dk-border dk-march" style="padding: 28px; border-radius: 4px">
  Drop files here
</div>

<div class="dk-card dk-march" style="--dk-color: var(--dk-info)">Uploading…</div>`}
        react={`<DotBorder march style={{ padding: 28, borderRadius: 4 }}>Drop files here</DotBorder>
<Card march color="var(--dk-info)">Uploading…</Card>`}
      >
        <DotBorder march gap={8} size={3} style={{ padding: "36px 40px", borderRadius: 4, textAlign: "center" }}>
          <DotIcon name="arrow-down" step={3} />
          <div style={{ marginTop: 10, fontSize: 14 }}>Drop files here</div>
        </DotBorder>
        <Card march color="var(--dk-info)" style={{ width: 220, borderRadius: 4 }}>
          <span className="eyebrow">Uploading</span>
          <div style={{ marginTop: 10 }}><Meter value={0.48} label="Upload progress" /></div>
        </Card>
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

      <h3 id="halftoneimg">Image halftone — 写真を網点にする <Since v="0.2" /></h3>
      <p>
        <code>.dk-halftone-img</code> の中に <code>&lt;img&gt;</code>（または <code>&lt;picture&gt;</code> / <code>&lt;video&gt;</code> / <code>&lt;canvas&gt;</code>）を置くと、
        明るさをドットの大きさに置き換えた、新聞印刷のような見た目になります。仕組みは Halftone と同じで、画像そのものを階調として使っています。
        網の細かさは <code>--dk-gap</code>、明るさの調整は <code>--dk-tone-filter</code>（既定値 <code>grayscale(1) contrast(1.4) brightness(.75)</code>）で行います。
        ダークテーマでは白黒が反転します。
      </p>
      <Example
        html={`<div class="dk-halftone-img" style="width: 320px; aspect-ratio: 16 / 10">
  <img src="/photo.jpg" alt="Three spheres on a floor">
</div>

<!-- coarser grid, darker tone -->
<div class="dk-halftone-img" style="--dk-gap: 10px; --dk-tone-filter: grayscale(1) brightness(.6)">
  <img src="/photo.jpg" alt="">
</div>`}
        react={`<HalftoneImage src="/photo.jpg" alt="Three spheres on a floor" style={{ width: 320, aspectRatio: "16 / 10" }} />
<HalftoneImage src="/photo.jpg" alt="" gap={10} toneFilter="grayscale(1) brightness(.6)" />

{/* or wrap your own <picture> / <video> */}
<HalftoneImage><video src="/loop.mp4" autoPlay muted loop playsInline /></HalftoneImage>`}
      >
        <Tile label="original"><img src={sample} alt="" className="tile-photo" /></Tile>
        <Tile label="--dk-gap: 6px"><HalftoneImage src={sample} alt="Three spheres on a floor, halftone" className="tile-photo" /></Tile>
        <Tile label="--dk-gap: 10px"><HalftoneImage src={sample} alt="" gap={10} className="tile-photo" /></Tile>
        <Tile label="brightness(.6)"><HalftoneImage src={sample} alt="" toneFilter="grayscale(1) brightness(.6)" className="tile-photo" /></Tile>
      </Example>
      <p className="muted" style={{ fontSize: 14 }}>
        <code>alt</code> は中の <code>&lt;img&gt;</code> にそのまま付けてください。ハイコントラストモードでは網点をやめて元の画像を表示します。
      </p>

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

      <h3 id="digits">Dot-matrix digits — 5×7 の数字 <Since v="0.3" /></h3>
      <p>
        時計・カウンター・スコア向けの、5×7 ドットの数字です。<code>0</code>〜<code>9</code> と <code>: . , - + % /</code> と空白が使えます。
        アイコンと同じく <code>icons/glyphs.json</code> が元データで、CSS と型を自動生成しています。
        大きさは <code>--dk-icon-step</code>、色は <code>currentColor</code> です。<code>.dk-digits--grid</code> で消えているドットも薄く表示し、電光掲示板のような見た目にできます。
      </p>
      <Example
        html={`<span class="dk-digits" role="img" aria-label="12:48">
  <span class="dk-glyph dk-glyph--1"></span>
  <span class="dk-glyph dk-glyph--2"></span>
  <span class="dk-glyph dk-glyph--colon"></span>
  <span class="dk-glyph dk-glyph--4"></span>
  <span class="dk-glyph dk-glyph--8"></span>
</span>

<!-- LED look, square dots -->
<span class="dk-digits dk-digits--grid dk-digits--square" style="--dk-icon-step: 5px; color: var(--dk-danger)">…</span>`}
        react={`<DotDigits value="12:48" />
<DotDigits value="-3.5%" step={4} />
<DotDigits value={2048} step={5} grid square style={{ color: "var(--dk-danger)" }} />`}
      >
        <DotDigits value="12:48" step={6} />
        <DotDigits value="-3.5%" step={4} style={{ color: "var(--dk-ok)" }} />
        <DotDigits value="2048" step={5} grid square style={{ color: "var(--dk-danger)" }} />
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
    </>
  );
}
