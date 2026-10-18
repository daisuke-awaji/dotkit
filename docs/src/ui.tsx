import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Card, DotIcon } from "dotkit/react";

/* ---------- copy-to-clipboard with toast ---------- */
const ToastCtx = createContext<(msg: string) => void>(() => {});
export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 1400);
    return () => clearTimeout(t);
  }, [msg]);
  return (
    <ToastCtx.Provider value={setMsg}>
      {children}
      {msg && <div className="toast" role="status">{msg}</div>}
    </ToastCtx.Provider>
  );
}
export function useCopy() {
  const toast = useContext(ToastCtx);
  return useCallback(
    (text: string, label = "Copied") => {
      navigator.clipboard?.writeText(text).then(() => toast(label), () => toast("Copy failed"));
    },
    [toast],
  );
}

export function CopyButton({ text }: { text: string }) {
  const copy = useCopy();
  return (
    <button className="dk-btn dk-btn--ghost dk-btn--sm copy" aria-label="Copy code" onClick={() => copy(text)}>
      <DotIcon name="copy" step={2} />
    </button>
  );
}

export function Code({ children, lang }: { children: string; lang?: string }) {
  const text = children.replace(/^\n/, "").replace(/\s+$/, "");
  return (
    <div className="code-wrap">
      <pre className="code" data-lang={lang}><code>{text}</code></pre>
      <CopyButton text={text} />
    </div>
  );
}

/** A standalone code block with a dotted frame. */
export function CodeBlock({ children, lang }: { children: string; lang?: string }) {
  return (
    <Card className="standalone" style={{ padding: 0, overflow: "hidden" }}>
      <Code lang={lang}>{children}</Code>
    </Card>
  );
}

/* ---------- live example ---------- */
export function Example({
  children,
  html,
  react,
  align,
  previewStyle,
}: {
  children: ReactNode;
  html?: string;
  react?: string;
  align?: "left";
  previewStyle?: React.CSSProperties;
}) {
  const tabs = [html && ["HTML", html], react && ["React", react]].filter(Boolean) as [string, string][];
  const [tab, setTab] = useState(0);
  return (
    <Card className="example" style={{ padding: 0 }}>
      <div className={`example-preview ${align ?? ""}`} style={previewStyle}>{children}</div>
      {tabs.length > 0 && (
        <>
          <hr className="dk-divider" style={{ margin: 0 }} />
          <div className="example-bar" role="tablist">
            {tabs.map(([name], i) => (
              <button key={name} role="tab" aria-selected={tab === i} className="tab" onClick={() => setTab(i)}>
                {name}
              </button>
            ))}
          </div>
          <Code lang={tabs[tab][0].toLowerCase()}>{tabs[tab][1]}</Code>
        </>
      )}
    </Card>
  );
}

/* ---------- props table ---------- */
export type PropRow = [name: string, type: string, def: string, desc: string];
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <table>
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Default</th><th>説明</th></tr>
      </thead>
      <tbody>
        {rows.map(([n, t, d, desc]) => (
          <tr key={n}>
            <td><code>{n}</code></td>
            <td><code>{t}</code></td>
            <td>{d === "-" ? <span className="muted">—</span> : <code>{d}</code>}</td>
            <td>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Toc({ items }: { items: [id: string, label: string][] }) {
  return (
    <nav className="toc" aria-label="On this page">
      {items.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className="dk-badge"
          style={{ textDecoration: "none" }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
