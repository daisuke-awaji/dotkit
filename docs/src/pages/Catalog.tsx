import { Primitives } from "./catalog/Primitives";
import { Techniques } from "./catalog/Techniques";
import { Forms } from "./catalog/Forms";
import { DataDisplay } from "./catalog/DataDisplay";
import { Navigation } from "./catalog/Navigation";
import { Feedback } from "./catalog/Feedback";
import { Display } from "./catalog/Display";
import { Themes } from "./catalog/Themes";

export function Catalog() {
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Design Catalog</h1>
      <p className="muted">
        dotkit で描けるすべての表現と、その書き方です。プレビューはすべて実際の dotkit で描画しています。
        HTML（クラス）と React の両方のコードを載せています。見出しの <span className="dk-badge since">v0.x</span> は追加されたバージョンです。
        部品を組み合わせた完成例は <a href="#/templates">Templates</a> にあります。
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
