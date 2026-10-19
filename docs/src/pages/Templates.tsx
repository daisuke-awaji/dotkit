import { useState } from "react";
import StatusPage from "../templates/StatusPage";
import statusSrc from "../templates/StatusPage.tsx?raw";
import AiChat from "../templates/AiChat";
import aiSrc from "../templates/AiChat.tsx?raw";
import { Card } from "dotkit/react";
import { Code } from "../ui";
import { useT } from "../i18n";

function Template({ id, title, lead, src, children }: { id: string; title: string; lead: string; src: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const t = useT();
  return (
    <section>
      <h2 id={id}>{title} <span className="dk-badge since">v0.4</span></h2>
      <p className="muted">{lead}</p>
      <div className="template-frame">{children}</div>
      <Card className="example" style={{ padding: 0, marginTop: 12 }}>
        <div className="example-bar" style={{ padding: "8px 10px" }}>
          <button className="tab" aria-expanded={show} onClick={() => setShow((s) => !s)}>{show ? t("コードを隠す", "Hide code") : t("コードを表示（React + CSS）", "Show code (React + CSS)")}</button>
        </div>
        {show && <Code lang="tsx">{src}</Code>}
      </Card>
    </section>
  );
}

export function Templates() {
  const t = useT();
  return (
    <>
      <span className="eyebrow">Reference</span>
      <h1 style={{ fontSize: 44, margin: "8px 0 12px" }}>Templates</h1>
      <p className="muted">
        {t(
          <>
            dotkit の部品だけで組み立てた画面の完成例です。コードは 1 ファイルで完結しているので、そのままコピーして使えます（ページ固有の CSS はファイル内の
            <code>&lt;style&gt;</code> にまとめています）。データはすべてサンプルです。
          </>,
          <>
            Complete screens assembled from nothing but dotkit parts. Each one is a single self-contained file you can copy as-is (page-specific CSS sits in a
            {" "}<code>&lt;style&gt;</code> block inside the file). All data is sample data.
          </>,
        )}
      </p>

      <Template
        id="status-page"
        title="Status page"
        lead={t(
          "Uptime bar・Status dot・Alert・Stepper・Ring meter・Sparkline・Dot-matrix digits・Dot leaders を組み合わせたステータスページ。",
          "A status page combining Uptime bar, Status dot, Alert, Stepper, Ring meter, Sparkline, Dot-matrix digits and Dot leaders.",
        )}
        src={statusSrc}
      >
        <StatusPage />
      </Template>

      <Template
        id="ai-chat"
        title="AI chat UI"
        lead={t(
          "Tabs・Identicon・Typing indicator・Skeleton・Stepper・Ring meter（コンテキスト使用率）・Switch・Range・Dialog を組み合わせたチャット画面。",
          "A chat screen combining Tabs, Identicon, Typing indicator, Skeleton, Stepper, Ring meter (context usage), Switch, Range and Dialog.",
        )}
        src={aiSrc}
      >
        <AiChat />
      </Template>
    </>
  );
}
