"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";

export default function ThankYouPage() {
  const t = useT();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F]">
      <div className="sticky top-0 z-10 flex items-center justify-between max-w-2xl mx-auto px-6 py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#222]">
        <Link href="/" className="font-bold text-lg transition-colors duration-300 hover:text-[#7C5CFF]">
          {t("common.brand")}
        </Link>
        <Link href="/" className="bg-[#7C5CFF] px-5 py-2 rounded-full text-sm font-semibold transition-all hover:bg-[#6B4FE0]">
          {t("common.home")}
        </Link>
      </div>
      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7C5CFF]/20 text-[#7C5CFF] text-3xl mb-6 shadow-[0_0_0_1px_rgba(124,92,255,0.25)]">
            🎉
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("thankyou.title")}</h1>
          <p className="text-[#888] text-lg mb-2">{t("thankyou.subtitle")}</p>
        </div>

        {/* Progress */}
        <section className="mt-10 rounded-2xl border border-[#222] bg-[#0C0C0C] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] p-6">
          <h2 className="text-sm font-semibold text-white mb-4">{t("thankyou.progressTitle")}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#7C5CFF]/15 text-[#7C5CFF] border border-[#7C5CFF]/25">
                ✅
              </span>
              <span className="text-[#E5E7EB]">{t("thankyou.progressReceived")}</span>
            </div>
            <div className="flex items-center gap-3 opacity-95">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#7C5CFF]/10 text-[#C4B5FD] border border-[#7C5CFF]/20">
                ⏳
              </span>
              <span className="text-[#E5E7EB]">{t("thankyou.progressDesign")}</span>
            </div>
            <div className="flex items-center gap-3 opacity-95">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#7C5CFF]/10 text-[#C4B5FD] border border-[#7C5CFF]/20">
                ⏳
              </span>
              <span className="text-[#E5E7EB]">{t("thankyou.progressDelivery")}</span>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="mt-8 rounded-2xl border border-[#222] bg-[#0C0C0C] p-6">
          <h2 className="text-lg font-semibold mb-3">{t("thankyou.nextTitle")}</h2>
          <ol className="text-[#888] space-y-2 list-decimal list-inside">
            <li>{t("thankyou.next1")}</li>
            <li>{t("thankyou.next2")}</li>
            <li>{t("thankyou.next3")}</li>
          </ol>
        </section>

        {/* Value reinforcement */}
        <section className="mt-8 rounded-2xl border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 p-6 shadow-[0_0_30px_rgba(124,92,255,0.08)]">
          <h2 className="text-sm font-semibold text-[#E5E7EB] mb-2">{t("thankyou.qualityTitle")}</h2>
          <p className="text-[#E5E7EB] font-medium">
            {t("thankyou.qualityText1")}
            <br />
            {t("thankyou.qualityText2")}
          </p>
        </section>

        {/* Contact reassurance */}
        <section className="mt-8 rounded-2xl border border-[#222] bg-[#0C0C0C] p-6">
          <h2 className="text-lg font-semibold mb-2">{t("thankyou.contactTitle")}</h2>
          <p className="text-[#888] leading-relaxed">
            {t("thankyou.contactText")}
          </p>
          <p className="text-[#888] leading-relaxed mt-3">
            {t("thankyou.questionsPrefix")}{" "}
            <a href={`mailto:${t("thankyou.email")}`} className="text-[#7C5CFF] hover:underline">
              {t("thankyou.email")}
            </a>
          </p>
        </section>

        {/* Fast contact CTA (optional) */}
        <section className="mt-8 rounded-2xl border border-[#222] bg-[#0C0C0C] p-6">
          <h2 className="text-lg font-semibold mb-4">{t("thankyou.fasterTitle")}</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://t.me/your_username"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full font-semibold border border-[#7C5CFF]/40 bg-[#7C5CFF]/10 text-[#C4B5FD] hover:bg-[#7C5CFF]/20 transition-all"
            >
              {t("thankyou.telegram")}
            </a>
            <a
              href="https://wa.me/your_number"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full font-semibold border border-[#222] bg-[#141414] text-[#E5E7EB] hover:border-[#333] hover:bg-[#161616] transition-all"
            >
              {t("thankyou.whatsapp")}
            </a>
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold transition-all bg-[#7C5CFF] hover:bg-[#6B4FE0]"
          >
            {t("thankyou.backHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
