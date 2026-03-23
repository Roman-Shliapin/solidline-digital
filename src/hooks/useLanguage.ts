"use client";

import { useLanguageContext } from "@/components/i18n/LanguageProvider";

export function useLanguage() {
  const { lang, setLang } = useLanguageContext();
  return { lang, setLang };
}

