import {
  Button,
  DotDigits,
  Heatmap,
  Meter,
  StatusDot,
} from "dotkit/react";
import { Example } from "../../ui";
import { Since, contributions } from "./shared";
const heatSmall = contributions(12, 21);

export function Themes() {
  return (
    <>
      <h2 id="theming">Themes</h2>
      <p className="muted">配色のプリセット。トークンの組み合わせなので、自分のテーマも同じ方法で作れます。</p>

      <h3 id="themes">Theme presets <Since v="0.3" /></h3>
      <p>
        配色のプリセットです。<code>.dk-theme-gameboy</code> / <code>-amber</code> / <code>-newsprint</code> / <code>-riso</code> / <code>-blueprint</code>。
        <code>&lt;html&gt;</code> に付ければページ全体、任意の要素に付ければその中だけが切り替わります（テーマのクラスは自分の背景色と文字色も塗ります）。
        中身はトークン（<code>--dk-ink</code> / <code>--dk-paper</code> / <code>--dk-mute</code> / <code>--dk-subtle</code> と状態の色）の組み合わせなので、同じ方法で自分のテーマも作れます。
      </p>
      <Example
        align="left"
        previewStyle={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16, padding: 20 }}
        html={`<html class="dk-theme-newsprint"> … </html>

<section class="dk-theme-amber"> … </section>

/* your own */
.my-theme { --dk-ink: #3b0764; --dk-paper: #faf5ff; --dk-mute: #d8b4fe; --dk-subtle: #7e22ce; }`}
        react={`<section className="dk-theme-gameboy">
  <Button>Start</Button>
  <Meter value={0.62} />
</section>`}
      >
        {(["light", "dark", "gameboy", "amber", "newsprint", "riso", "blueprint"] as const).map((t) => (
          <div key={t} className={`theme-card ${t === "light" ? "" : `dk-theme-${t}`}`}>
            <div className="theme-head">
              <span className="mono">{t === "light" ? "default" : `.dk-theme-${t}`}</span>
              <DotDigits value="12:48" step={2} />
            </div>
            <Meter value={0.62} label="Quota" />
            <Heatmap data={heatSmall} cell={10} label="Activity" />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Button size="sm">Deploy</Button>
              <Button size="sm" variant="outline">Cancel</Button>
              <StatusDot>OK</StatusDot>
            </div>
          </div>
        ))}
      </Example>
    </>
  );
}
