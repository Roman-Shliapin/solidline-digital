"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";

const STORAGE_KEY = "solidline-lang";
const SUPPORTED: Lang[] = ["en", "pl", "ua"];

function normalizeLang(raw: string | undefined | null): Lang | null {
  const v = (raw ?? "").toLowerCase();
  if (!v) return null;
  if (v.startsWith("pl")) return "pl";
  if (v.startsWith("ua") || v.startsWith("uk")) return "ua";
  if (v.startsWith("en")) return "en";
  return null;
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const fromStorage = normalizeLang(stored);
      if (fromStorage && SUPPORTED.includes(fromStorage)) {
        setLangState(fromStorage);
        return;
      }

      const detected =
        normalizeLang(navigator.languages?.[0] ?? navigator.language ?? undefined) ?? "en";
      setLangState(detected);
    } catch {
      setLangState("en");
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguageContext must be used within <LanguageProvider />");
  }
  return ctx;
}

