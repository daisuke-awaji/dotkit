import {
  Button,
  DotDigits,
  Heatmap,
  Meter,
  StatusDot,
} from "dotkit/react";
import { Example } from "../../ui";
import { Since, contributions } from "./shared";
import { useT } from "../../i18n";
const heatSmall = contributions(12, 21);

export function Themes() {
  const t = useT();
  return (
    <>
      <h2 id="theming">Themes</h2>
      <p className="muted">{t(<>配色のプリセット。トークンの組み合わせなので、自分のテーマも同じ方法で作れます。</>, <>Color presets. They are just combinations of tokens, so you can build your own theme the same way.</>)}</p>

      <h3 id="themes">Theme presets <Since v="0.3" /></h3>
      <p>
        {t(
          <>
            配色のプリセットです。<code>.dk-theme-gameboy</code> / <code>-amber</code> / <code>-newsprint</code> / <code>-riso</code> / <code>-blueprint</code>。
            <code>&lt;html&gt;</code> に付ければページ全体、任意の要素に付ければその中だけが切り替わります（テーマのクラスは自分の背景色と文字色も塗ります）。
            中身はトークン（<code>--dk-ink</code> / <code>--dk-paper</code> / <code>--dk-mute</code> / <code>--dk-subtle</code> と状態の色）の組み合わせなので、同じ方法で自分のテーマも作れます。
          </>,
          <>
            Color presets: <code>.dk-theme-gameboy</code> / <code>-amber</code> / <code>-newsprint</code> / <code>-riso</code> / <code>-blueprint</code>.
            Put one on <code>&lt;html&gt;</code> to switch the whole page, or on any element to switch just its contents (a theme class also paints its own background and text color).
            Each is a combination of tokens (<code>--dk-ink</code> / <code>--dk-paper</code> / <code>--dk-mute</code> / <code>--dk-subtle</code> and the status colors), so you can make your own theme the same way.
          </>,
        )}
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
