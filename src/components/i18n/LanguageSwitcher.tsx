"use client";

import { useLanguage } from "@/hooks/useLanguage";

const LANGS = ["en", "pl", "ua"] as const;

export default function LanguageSwitcher({
  mode = "fixed",
}: {
  mode?: "fixed" | "inline";
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={mode === "fixed" ? "fixed right-2 top-4 sm:right-4 sm:top-4 z-50" : "flex"}>
      <div className="flex items-center gap-2 rounded-full border border-[#222] bg-[#0A0A0A]/70 backdrop-blur-md px-3 py-2">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={
            lang === l
              ? "text-[#C4B5FD] font-semibold text-sm"
              : "text-[#888] hover:text-[#E5E7EB] transition-colors text-sm"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
      </div>
    </div>
  );
}

