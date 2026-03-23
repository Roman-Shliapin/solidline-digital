"use client";

import { useMemo } from "react";
import { t as tRaw } from "@/lib/i18n";
import { useLanguage } from "./useLanguage";

export function useT() {
  const { lang } = useLanguage();

  return useMemo(() => {
    return (key: string) => tRaw(key, lang);
  }, [lang]);
}

