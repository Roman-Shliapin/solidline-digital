import type { ReactNode } from "react";
import { templateAccentVars, DEFAULT_TEMPLATE_ACCENT } from "@/lib/brandColor";
import type { TemplateProps } from "./types";

export type { TemplateProps };

/**
 * Personal brand — calm typography, soft contrast, story-first layout.
 * @md: / @lg: прив’язані до контейнера (прев’ю телефона залишається читабельним).
 */
export function PersonalBrandTemplate({
  businessName = "Alex Morgan",
  tagline = "Strategy & creative direction for brands that want to be remembered",
  accentColor = DEFAULT_TEMPLATE_ACCENT,
}: TemplateProps): ReactNode {
  return (
    <div
      className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#222] bg-gradient-to-b from-[#121212] to-[#0A0A0A] text-[#E8E8E8]"
      style={templateAccentVars(accentColor)}
    >
      <header className="px-4 pt-10 pb-8 text-center @md:px-8 @md:pt-12 @md:pb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--tm-accent)] mb-4">Personal brand</p>
        <h1 className="text-2xl @md:text-4xl font-semibold tracking-tight text-white mb-4 break-words px-1">
          {businessName}
        </h1>
        <p className="text-[#9CA3AF] text-base @md:text-lg leading-relaxed break-words px-1">{tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 @md:gap-4">
          <span className="inline-flex items-center rounded-full bg-[var(--tm-accent-15)] px-4 py-2.5 @md:px-5 text-sm font-medium text-[var(--tm-accent-soft)] ring-1 ring-[var(--tm-accent-30)]">
            Book a discovery call
          </span>
          <span className="inline-flex items-center rounded-full border border-[#333] px-4 py-2.5 @md:px-5 text-sm text-[#888]">
            View selected work
          </span>
        </div>
      </header>

      <section className="border-t border-[#1F1F1F] px-4 py-8 @md:px-8 @md:py-10">
        <p className="text-sm text-[#6B7280] max-w-2xl mx-auto text-center leading-relaxed">
          I help founders and creators turn scattered ideas into one sharp narrative — the same clarity-first
          approach we love when partnering with{" "}
          <strong className="text-[var(--tm-accent-soft2)] font-medium">SolidLine Digital</strong>: fast pages, honest copy, no
          bloated frameworks. Your story stays human; the tech stays invisible.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 border-t border-[#1F1F1F] px-4 py-10 @md:grid-cols-3 @md:px-8 @md:py-12">
        {[
          {
            title: "Positioning",
            body: "We define what you stand for in one sentence — so visitors get it in three seconds.",
          },
          {
            title: "Visual rhythm",
            body: "Typography and spacing that feel intentional, not trendy. Built to age well.",
          },
          {
            title: "Launch calm",
            body: "Ship with confidence: performance checks and mobile polish before you go live.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="min-w-0 rounded-xl bg-[#161616] border border-[#252525] p-5 hover:border-[var(--tm-accent-25)] transition-colors"
          >
            <h3 className="text-white font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.body}</p>
          </div>
        ))}
      </section>

      <blockquote className="mx-4 mb-8 @md:mx-8 @md:mb-10 p-5 @md:p-6 rounded-xl bg-[#141414] border border-[#252525] border-l-4 border-l-[var(--tm-accent)]">
        <p className="text-[#D1D5DB] italic text-sm leading-relaxed">
          &ldquo;Our personal brand site finally matches how we show up in the room. The SolidLine team cut the
          noise and shipped something we&apos;re proud to share.&rdquo;
        </p>
        <footer className="mt-3 text-xs text-[#6B7280]">— Sample client story (placeholder)</footer>
      </blockquote>

      <footer className="border-t border-[#1F1F1F] px-4 py-6 text-center text-xs text-[#4B5563] @md:px-8">
        Concept layout · Inspired by clarity-first builds with SolidLine Digital
      </footer>
    </div>
  );
}
