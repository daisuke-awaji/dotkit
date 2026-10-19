import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/* Documentation language (ja / en). Not part of the dotkit package. */
export type Lang = "ja" | "en";
const KEY = "dk-lang";

const isLang = (v: unknown): v is Lang => v === "ja" || v === "en";

/** ?lang=en (shareable) → saved choice → browser language. Mirrors the inline script in index.html. */
export function initialLang(): Lang {
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (isLang(q)) return q;
    const saved = localStorage.getItem(KEY);
    if (isLang(saved)) return saved;
  } catch {}
  return /^ja\b/i.test(navigator.language) ? "ja" : "en";
}

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "ja", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
      const url = new URL(location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", l);
        history.replaceState(null, "", url);
      }
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

/** `const t = useT(); t("日本語", "English")` — works for strings and JSX alike. */
export function useT() {
  const { lang } = useLang();
  return useCallback(<T,>(ja: T, en: T): T => (lang === "ja" ? ja : en), [lang]);
}

/** Inline helper for JSX: <L ja={<>…</>} en={<>…</>} /> */
export function L({ ja, en }: { ja: ReactNode; en: ReactNode }) {
  return <>{useT()(ja, en)}</>;
}
