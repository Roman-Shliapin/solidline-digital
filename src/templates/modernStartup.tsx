import type { ReactNode } from "react";
import { templateAccentVars, DEFAULT_TEMPLATE_ACCENT } from "@/lib/brandColor";
import type { TemplateProps } from "./types";

export type { TemplateProps };

/**
 * Modern startup — bold hero, metric-style chips, product-launch energy.
 * Container queries (@md:) для коректного вигляду в прев’ю телефона.
 */
export function ModernStartupTemplate({
  businessName = "Nimbus Labs",
  tagline = "Ship the MVP your users actually open on Monday morning",
  accentColor = DEFAULT_TEMPLATE_ACCENT,
}: TemplateProps): ReactNode {
  return (
    <div
      className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-[#222] bg-[#0C0C0C] text-[#F3F4F6]"
      style={templateAccentVars(accentColor)}
    >
      <div className="relative px-4 pt-10 pb-10 @md:px-12 @md:pt-14 @md:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--tm-accent-glow),transparent)] pointer-events-none" />
        <div className="relative min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="rounded-md bg-[var(--tm-accent-15)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--tm-accent-soft)]">
              Modern startup
            </span>
            <span className="text-[11px] text-[#6B7280]">Early access · Q2 roadmap</span>
          </div>
          <h1 className="text-3xl @md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl break-words">
            {businessName}
          </h1>
          <p className="text-base @md:text-xl text-[#9CA3AF] max-w-2xl leading-snug break-words">{tagline}</p>
          <div className="mt-8 @md:mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-full bg-[var(--tm-accent)] px-5 py-2.5 @md:px-6 @md:py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--tm-accent-shadow)] hover:bg-[var(--tm-accent-hover)] transition-colors"
            >
              Start free trial
            </button>
            <button
              type="button"
              className="rounded-full border border-[#333] px-5 py-2.5 @md:px-6 @md:py-3 text-sm font-medium text-[#D1D5DB] hover:border-[#444] transition-colors"
            >
              Watch 90s demo
            </button>
          </div>
          <dl className="mt-10 @md:mt-14 grid grid-cols-2 @md:grid-cols-4 gap-4 @md:gap-6 border-t border-[#1F1F1F] pt-8 @md:pt-10">
            {[
              { k: "Time to first pixel", v: "< 48h" },
              { k: "Stack", v: "Next.js-ready" },
              { k: "Focus", v: "Conversion" },
              { k: "Partner", v: "SolidLine" },
            ].map((row) => (
              <div key={row.k} className="min-w-0">
                <dt className="text-[10px] @md:text-[11px] uppercase tracking-wider text-[#6B7280] break-words">{row.k}</dt>
                <dd className="mt-1 text-sm @md:text-lg font-semibold text-white break-words">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="border-t border-[#1A1A1A] bg-[#080808] px-4 py-8 @md:px-12 @md:py-10">
        <h2 className="text-sm font-semibold text-white mb-4">Why teams pick SolidLine Digital</h2>
        <ul className="space-y-3 text-sm text-[#9CA3AF] max-w-2xl">
          <li className="flex gap-2 min-w-0">
            <span className="text-[var(--tm-accent)] shrink-0">→</span>
            <span>One codebase you can grow — no mystery plugins or page builders locking you in.</span>
          </li>
          <li className="flex gap-2 min-w-0">
            <span className="text-[var(--tm-accent)] shrink-0">→</span>
            <span>Landing pages that load fast on mobile, because your first impression is the ad you didn&apos;t pay for.</span>
          </li>
          <li className="flex gap-2 min-w-0">
            <span className="text-[var(--tm-accent)] shrink-0">→</span>
            <span>Direct communication: you talk to builders, not a ticket queue that forgets your brand name.</span>
          </li>
        </ul>
      </section>

      <section className="border-t border-[#1A1A1A] px-4 py-8 @md:px-12 @md:py-10">
        <div className="rounded-xl border border-dashed border-[#333] bg-[#0F0F0F] p-5 @md:p-8 text-center">
          <p className="text-[#D1D5DB] text-sm max-w-lg mx-auto">
            This block is placeholder UI — swap in your product screenshot, pricing table, or changelog. SolidLine
            Digital can wire it to your domain and analytics when you&apos;re ready to go live.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-3 border-t border-[#1A1A1A] px-4 py-6 @md:flex-row @md:flex-wrap @md:items-center @md:justify-between @md:gap-4 @md:px-8 text-xs text-[#6B7280]">
        <span className="break-words">© {new Date().getFullYear()} {businessName} — demo template</span>
        <span className="text-[#4B5563] shrink-0">Built with clarity · SolidLine Digital</span>
      </footer>
    </div>
  );
}
