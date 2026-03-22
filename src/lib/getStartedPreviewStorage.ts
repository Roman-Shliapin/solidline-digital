import type { LeadFormData } from "@/types/lead";

const STORAGE_KEY = "solidline-get-started-preview";

/** Зберегти дані форми перед переходом на /get-started/preview */
export function saveLeadFormForPreview(form: LeadFormData): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  } catch {
    /* ignore quota / private mode */
  }
}

/** Прочитати збережену форму (після повернення з прев’ю дані лишаються до сабміту) */
export function loadLeadFormFromPreviewStorage(): LeadFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LeadFormData;
    if (!parsed || typeof parsed !== "object" || !parsed.businessType) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearLeadFormPreviewStorage(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
