"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, LANG_STORAGE_KEY, type AppLang, t as translate } from "@/lib/i18n";

type LanguageContextValue = {
  lang: AppLang;
  setLang: (lang: AppLang) => void;
  toggleLang: () => void;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLang(lang: AppLang) {
  if (typeof document === "undefined") return;

  const html = document.documentElement;
  const dir: "rtl" | "ltr" = lang === "ckb" ? "rtl" : "ltr";

  html.setAttribute("data-lang", lang);
  html.setAttribute("lang", lang === "ckb" ? "ckb" : "en");
  html.setAttribute("dir", dir);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AppLang>(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;

    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as AppLang | null;
      if (saved === "ckb" || saved === "en") return saved;
    } catch {
      // ignore
    }

    return DEFAULT_LANG;
  });

  useEffect(() => {
    applyDocumentLang(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const setLang = useCallback((next: AppLang) => {
    setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "ckb" ? "en" : "ckb"));
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dir: "rtl" | "ltr" = lang === "ckb" ? "rtl" : "ltr";
    return {
      lang,
      setLang,
      toggleLang,
      dir,
      t: (key: string) => translate(lang, key),
    };
  }, [lang, setLang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
