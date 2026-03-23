import en from "../../locales/en.json";
import pl from "../../locales/pl.json";
import ua from "../../locales/ua.json";

export type Lang = "en" | "pl" | "ua";

const LOCALES: Record<Lang, unknown> = {
  en,
  pl,
  ua,
};

function getNestedValue(obj: unknown, parts: string[]): unknown {
  let cur: unknown = obj;
  for (const part of parts) {
    if (!cur || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

export function t(key: string, lang: string): string {
  const wantedLang = (lang === "pl" || lang === "ua" ? (lang as Lang) : "en") satisfies Lang;
  const parts = key.split(".").filter(Boolean);
  const val = getNestedValue(LOCALES[wantedLang], parts);
  if (typeof val === "string") return val;

  const fallback = getNestedValue(LOCALES.en, parts);
  if (typeof fallback === "string") return fallback;

  return key;
}

