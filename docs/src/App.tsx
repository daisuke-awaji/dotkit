import { useEffect, useState, type ReactNode } from "react";
import { Badge, Dots, DotIcon, type IconName } from "dotkit/react";
import { ToastProvider } from "./ui";
import { Home } from "./pages/Home";
import { GettingStarted } from "./pages/GettingStarted";
import { Catalog } from "./pages/Catalog";
import { Templates } from "./pages/Templates";
import { Icons } from "./pages/Icons";
import { ReactApi } from "./pages/ReactApi";
import { Accessibility } from "./pages/Accessibility";
import pkg from "../../package.json";

type Route = { path: string; label: string; icon: IconName; render: () => ReactNode; group: "Guide" | "Reference" };
const routes: Route[] = [
  { path: "/", label: "Overview", icon: "home", render: () => <Home />, group: "Guide" },
  { path: "/getting-started", label: "Getting Started", icon: "arrow-right", render: () => <GettingStarted />, group: "Guide" },
  { path: "/catalog", label: "Design Catalog", icon: "star", render: () => <Catalog />, group: "Reference" },
  { path: "/templates", label: "Templates", icon: "play", render: () => <Templates />, group: "Reference" },
  { path: "/icons", label: "Icons", icon: "heart", render: () => <Icons />, group: "Reference" },
  { path: "/react", label: "React API", icon: "menu", render: () => <ReactApi />, group: "Reference" },
  { path: "/accessibility", label: "Accessibility & Support", icon: "info", render: () => <Accessibility />, group: "Reference" },
];

const current = () => (location.hash.replace(/^#/, "") || "/").split("?")[0];

export function App() {
  const [path, setPath] = useState(current);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dk-theme-dark"));

  useEffect(() => {
    const on = () => {
      setPath(current());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dk-theme-dark", dark);
    try { localStorage.setItem("dk-theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  const route = routes.find((r) => r.path === path) ?? routes[0];
  useEffect(() => {
    document.title = route.path === "/" ? "dotkit — UI made of dots" : `${route.label} — dotkit`;
  }, [route]);

  return (
    <ToastProvider>
      <div className="layout">
        <aside className="sidebar">
          <a className="logo" href="#/">
            <b>dotkit</b>
          </a>
          <nav className="nav" aria-label="Main">
            {(["Guide", "Reference"] as const).map((g) => (
              <div key={g} style={{ display: "contents" }}>
                <span className="eyebrow nav-title">{g}</span>
                {routes.filter((r) => r.group === g).map((r) => (
                  <a key={r.path} href={`#${r.path}`} aria-current={r.path === route.path ? "page" : undefined}>
                    <DotIcon name={r.icon} step={2} />
                    {r.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
          <div className="side-foot">
            <button
              className="dk-btn dk-btn--outline dk-btn--sm"
              onClick={() => setDark((d) => !d)}
              aria-label={dark ? "ライトテーマに切り替え" : "ダークテーマに切り替え"}
            >
              <DotIcon name={dark ? "sun" : "moon"} step={2} />
            </button>
            <a className="dk-btn dk-btn--outline dk-btn--sm" href="https://github.com/daisuke-awaji/dotkit" aria-label="GitHub repository">
              <DotIcon name="github" step={2} />
            </a>
            <Badge className="version">v{pkg.version}</Badge>
          </div>
          <Dots className="side-rule" gap={6} size={1.5} color="var(--dk-mute)" aria-hidden="true" />
        </aside>
        <main className="main">
          <div className="content">
            {route.render()}
            <footer className="footer">
              <hr className="dk-divider" />
              MIT License · Built with dotkit itself ·{" "}
              <a href="https://github.com/daisuke-awaji/dotkit">github.com/daisuke-awaji/dotkit</a>
            </footer>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
