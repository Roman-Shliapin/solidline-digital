/** Типи бізнесу (крок 1) */
export type BusinessType =
  | "local-service"
  | "online-business"
  | "personal-brand"
  | "small-company";

/** Стиль сайту (крок 3) */
export type StylePreference = "modern" | "minimal" | "bold" | "unsure";

/** Відповіді форми для API /api/leads/create */
export interface LeadFormData {
  name: string;
  email: string;
  businessName: string;
  businessType: BusinessType;
  description: string;

  // Step 3 (optional)
  services?: string[];
  customers?: string;
  stylePreference?: StylePreference;
  phone?: string;
  instagram?: string;
  website?: string;
}
