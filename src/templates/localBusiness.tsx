import type { ReactNode } from "react";
import { templateAccentVars, DEFAULT_TEMPLATE_ACCENT } from "@/lib/brandColor";
import type { TemplateProps } from "./types";

export type { TemplateProps };

/**
 * Local business — warm, trustworthy, neighborhood-first layout.
 * Використовує @md: / @sm: (container queries), щоб у вузькому прев’ю телефона
 * лишалась одна колонка, а не «десктопний» рядок від ширини вікна браузера.
 */
export function LocalBusinessTemplate({
  businessName = "Harbor Street Bakery",
  tagline = "Fresh bread, real coffee, and a counter that knows your name",
  accentColor = DEFAULT_TEMPLATE_ACCENT,
}: TemplateProps): ReactNode {
  return (
    <div
      className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#222] bg-gradient-to-br from-[#141414] to-[#0D0D0D] text-[#E5E7EB]"
      style={templateAccentVars(accentColor)}
    >
      <div className="flex flex-col gap-8 px-4 pt-8 pb-6 @md:flex-row @md:items-start @md:justify-between @md:gap-8 @md:px-8 @md:pt-10 @md:pb-8">
        <div className="min-w-0 max-w-full flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--tm-accent)] mb-2">Local business</p>
          <h1 className="text-2xl @md:text-4xl font-bold text-white mb-3 break-words">{businessName}</h1>
          <p className="text-[#9CA3AF] leading-relaxed text-sm @md:text-base break-words">{tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <span className="rounded-lg bg-[#1F1F1F] px-3 py-1.5 text-[#D1D5DB] ring-1 ring-[#2A2A2A]">
              Open Tue–Sun 7am–6pm
            </span>
            <span className="rounded-lg bg-[#1F1F1F] px-3 py-1.5 text-[#D1D5DB] ring-1 ring-[#2A2A2A]">
              12 Harbor Street
            </span>
          </div>
        </div>
        <div className="w-full min-w-0 shrink-0 @md:mt-0 @md:w-48 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] p-4 text-center">
          <p className="text-[10px] uppercase text-[#6B7280] mb-1">Call us</p>
          <p className="text-base @md:text-lg font-semibold text-white break-all">(555) 014-2290</p>
          <p className="text-xs text-[#6B7280] mt-2">Same-day orders welcome</p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-6 border-t border-[#1F1F1F] px-4 py-8 @md:grid-cols-2 @md:px-8">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white mb-3">Why locals trust us</h2>
          <ul className="space-y-2 text-sm text-[#9CA3AF]">
            <li>Ingredients we&apos;d serve our own family — nothing hidden on the label.</li>
            <li>Parking out back; wheelchair-friendly entrance on Main.</li>
            <li>Catering trays for offices — ask about our Tuesday discount.</li>
          </ul>
        </div>
        <div className="min-w-0 rounded-xl bg-[#161616] border border-[#252525] p-5">
          <h2 className="text-sm font-semibold text-white mb-2">Your website matters too</h2>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">
            Customers Google you before they walk in. A clean, fast site built with{" "}
            <strong className="text-[var(--tm-accent-soft)]">SolidLine Digital</strong> helps first-time visitors see your hours,
            menu, and reviews without the clutter — so the phone rings for the right reasons.
          </p>
        </div>
      </section>

      <section className="border-t border-[#1F1F1F] px-4 py-8 @md:px-8">
        <h2 className="text-sm font-semibold text-white mb-4">Popular this week</h2>
        <div className="grid grid-cols-1 gap-3 @sm:grid-cols-3">
          {[
            { name: "Sourdough round", note: "Sold out by noon most Saturdays" },
            { name: "House latte", note: "Beans roasted 20 minutes away" },
            { name: "Kids’ cocoa", note: "Small wins, big smiles" },
          ].map((item) => (
            <div key={item.name} className="min-w-0 rounded-lg border border-[#2A2A2A] bg-[#121212] p-4">
              <p className="font-medium text-white text-sm break-words">{item.name}</p>
              <p className="text-xs text-[#6B7280] mt-1 break-words">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#1F1F1F] px-4 py-6 text-center text-xs text-[#6B7280] @md:px-8">
        <p className="break-words">
          Demo layout for local shops & services · When you&apos;re ready for a site that matches your storefront,
          talk to <span className="text-[#9CA3AF]">SolidLine Digital</span>
        </p>
      </footer>
    </div>
  );
}
