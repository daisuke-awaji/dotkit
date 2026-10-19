import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./layers.css";
import "dotkit/css";
import "./site.css";
import { App } from "./App";
import { LangProvider } from "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
);
