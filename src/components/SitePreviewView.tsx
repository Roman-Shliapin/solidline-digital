"use client";

import type { LeadFormData } from "@/types/lead";
import { templatesById, type TemplateId } from "@/templates";
import { taglineFromForm } from "@/lib/templateForLead";
import { resolveBrandColor } from "@/lib/brandColor";

type SitePreviewViewProps = {
  form: LeadFormData;
  templateId: TemplateId;
};

/**
 * Макет iPhone + шаблон (без модалки). Використовується на /get-started/preview.
 */
export default function SitePreviewView({ form, templateId }: SitePreviewViewProps) {
  const Template = templatesById[templateId];
  const businessName = form.businessName.trim() || "Your business";
  const tagline = taglineFromForm(form.description, form.differentiation);
  const accentColor = resolveBrandColor(form.brandColors);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative shrink-0 p-1 sm:p-1.5">
        <div
          className="rounded-[2.85rem] p-[3px] shadow-[0_32px_100px_-24px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
          style={{
            background:
              "linear-gradient(145deg, #52525b 0%, #27272a 40%, #18181b 60%, #3f3f46 100%)",
          }}
        >
          <div className="rounded-[2.65rem] bg-[#0c0c0e] p-[10px] ring-1 ring-black/50">
            <div className="flex justify-center pb-2 pt-1">
              <div className="h-[28px] w-[100px] rounded-full bg-black shadow-inner ring-1 ring-white/[0.08]" />
            </div>

            <div
              className="@container mx-auto mb-2 w-[min(100vw-2.5rem,300px)] max-w-[300px] min-w-0 overflow-hidden rounded-[1.35rem] border border-zinc-800/80 bg-zinc-950 shadow-[inset_0_0_60px_rgba(0,0,0,0.45)]"
              style={{ maxHeight: "min(62vh, 580px)" }}
            >
              <div className="max-h-[min(62vh,580px)] overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:thin] [scrollbar-color:#3f3f46_transparent]">
                <div className="box-border min-w-0 w-full p-1.5 sm:p-2">
                  <Template businessName={businessName} tagline={tagline} accentColor={accentColor} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute -left-[2px] top-[108px] h-9 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-sm"
          aria-hidden
        />
        <div
          className="absolute -left-[2px] top-[156px] h-14 w-[3px] rounded-l-sm bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-sm"
          aria-hidden
        />
        <div
          className="absolute -right-[2px] top-[132px] h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-sm"
          aria-hidden
        />
      </div>
    </div>
  );
}
