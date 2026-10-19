import { Primitives } from "./catalog/Primitives";
import { Techniques } from "./catalog/Techniques";
import { Forms } from "./catalog/Forms";
import { DataDisplay } from "./catalog/DataDisplay";
import { Navigation } from "./catalog/Navigation";
import { Feedback } from "./catalog/Feedback";
import { Display } from "./catalog/Display";

type Item = [id: string, label: string, since?: string];
const groups: { id: string; label: string; items: Item[] }[] = [
  { id: "primitives", label: "Primitives", items: [["dots", "Dots"], ["shape", "Shape"], ["fade", "Fade"]] },
  {
    id: "techniques", label: "Techniques",
    items: [["border", "Border"], ["halftone", "Halftone"], ["halftoneimg", "Image halftone", "0.2"], ["text", "Dot text"], ["icon", "Icon"], ["loader", "Loader"]],
  },
  { id: "forms", label: "Forms", items: [["button", "Button"], ["input", "Input"], ["choice", "Checkbox / Radio / Switch", "0.2"]] },
  { id: "data", label: "Data display", items: [["meter", "Meter"], ["chart", "Bar chart"], ["heatmap", "Heatmap", "0.2"], ["uptime", "Uptime bar", "0.2"]] },
  { id: "navigation", label: "Navigation", items: [["leaders", "Dot leaders", "0.2"]] },
  { id: "feedback", label: "Feedback", items: [["typing", "Typing indicator", "0.2"]] },
  { id: "display", label: "Display", items: [["badge", "Badge"], ["divider", "Divider"], ["card", "Card"], ["compose", "Composition"]] },
];
const count = groups.reduce((n, g) => n + g.items.length, 0);

function jump(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Catalog() {
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Design Catalog</h1>
      <p className="muted">
        dotkit で描けるすべての表現（{count} 項目）と、その書き方です。プレビューはすべて実際の dotkit で描画しています。
        HTML（クラス）と React の両方のコードを載せています。見出しの <span className="dk-badge since">v0.x</span> は追加されたバージョンです。
      </p>
      <nav className="catalog-toc" aria-label="Catalog contents">
        {groups.map((g) => (
          <div key={g.id} className="catalog-toc-group">
            <a className="eyebrow" href={`#${g.id}`} onClick={(e) => jump(e, g.id)}>{g.label}</a>
            <div className="toc">
              {g.items.map(([id, label, since]) => (
                <a key={id} href={`#${id}`} className={since ? "dk-badge dk-badge--solid" : "dk-badge"} onClick={(e) => jump(e, id)}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <Primitives />
      <Techniques />
      <Forms />
      <DataDisplay />
      <Navigation />
      <Feedback />
      <Display />
    </>
  );
}
