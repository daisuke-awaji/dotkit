import { Primitives } from "./catalog/Primitives";
import { Techniques } from "./catalog/Techniques";
import { Forms } from "./catalog/Forms";
import { DataDisplay } from "./catalog/DataDisplay";
import { Navigation } from "./catalog/Navigation";
import { Feedback } from "./catalog/Feedback";
import { Display } from "./catalog/Display";
import { Themes } from "./catalog/Themes";
import { useT } from "../i18n";

export function Catalog() {
  const t = useT();
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Design Catalog</h1>
      <p className="muted">
        {t(
          <>
            dotkit で描けるすべての表現と、その書き方です。プレビューはすべて実際の dotkit で描画しています。
            HTML（クラス）と React の両方のコードを載せています。見出しの <span className="dk-badge since">v0.x</span> は追加されたバージョンです。
            部品を組み合わせた完成例は <a href="#/templates">Templates</a> にあります。
          </>,
          <>
            Everything dotkit can draw, and how to write it. Every preview is rendered with the real dotkit,
            and each comes with both HTML (classes) and React code. A <span className="dk-badge since">v0.x</span> badge on a heading marks the version it arrived in.
            Complete screens built from these parts live in <a href="#/templates">Templates</a>.
          </>,
        )}
      </p>

      <Primitives />
      <Techniques />
      <Forms />
      <DataDisplay />
      <Navigation />
      <Feedback />
      <Display />
      <Themes />
    </>
  );
}
