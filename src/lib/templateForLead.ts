import type { TemplateId } from "@/templates";
import type { BusinessType } from "@/types/lead";

/** Який демо-шаблон показувати в прев’ю залежно від типу бізнесу в анкеті */
export function templateIdForBusinessType(businessType: BusinessType): TemplateId {
  switch (businessType) {
    case "personal-brand":
      return "personal-brand";
    case "online-business":
    case "small-company":
      return "modern-startup";
    case "local-service":
      return "local-business";
    default:
      return "modern-startup";
  }
}

/** Короткий підзаголовок для шаблону з полів форми (обрізка по словах, без обриву посередині) */
export function taglineFromForm(description: string, differentiation: string): string {
  const raw = description.trim() || differentiation.trim();
  if (!raw) return "Your story, one clear page — built for real clients.";
  const max = 140;
  if (raw.length <= max) return raw;
  const sliced = raw.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  const safe = lastSpace > 32 ? sliced.slice(0, lastSpace) : sliced.trimEnd();
  return `${safe}…`;
}
