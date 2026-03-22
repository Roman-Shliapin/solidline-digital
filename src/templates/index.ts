import { PersonalBrandTemplate } from "./personalBrand";
import { ModernStartupTemplate } from "./modernStartup";
import { LocalBusinessTemplate } from "./localBusiness";

export type { TemplateProps } from "./types";
export { PersonalBrandTemplate } from "./personalBrand";
export { ModernStartupTemplate } from "./modernStartup";
export { LocalBusinessTemplate } from "./localBusiness";

export type TemplateId = "personal-brand" | "modern-startup" | "local-business";

/** Map id → component for dynamic rendering */
export const templatesById = {
  "personal-brand": PersonalBrandTemplate,
  "modern-startup": ModernStartupTemplate,
  "local-business": LocalBusinessTemplate,
} as const;
