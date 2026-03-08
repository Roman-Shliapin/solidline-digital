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
  // Крок 1
  name: string;
  email: string;
  businessName: string;
  location: string;
  businessType: BusinessType;
  // Крок 2
  description: string;
  services: string[];
  customers: string;
  differentiation: string;
  // Крок 3
  hasLogo: boolean;
  brandColors?: string;
  stylePreference: StylePreference;
  competitors?: string[];
  // Крок 4
  phone?: string;
  instagram?: string;
  website?: string;
  notes?: string;
}
