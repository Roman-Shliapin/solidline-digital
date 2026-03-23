export type Currency = "PLN" | "EUR";

export type PricingOption = {
  id: string;
  labelKey: string;
  price: Record<Currency, number>;
};

export type PricingCategory = {
  id: string;
  titleKey: string;
  type: "radio" | "checkbox";
  options: PricingOption[];
};

export const currencySymbol: Record<Currency, string> = {
  PLN: "zł",
  EUR: "€",
};

export const pricingCategories: PricingCategory[] = [
  {
    id: "website-type",
    titleKey: "sections.pricing.categories.websiteType.title",
    type: "radio",
    options: [
      { id: "landing", labelKey: "sections.pricing.options.landingPage", price: { PLN: 1000, EUR: 230 } },
      {
        id: "multipage",
        labelKey: "sections.pricing.options.multiPageWebsite",
        price: { PLN: 1600, EUR: 370 },
      },
      { id: "ecommerce", labelKey: "sections.pricing.options.ecommerce", price: { PLN: 2800, EUR: 650 } },
    ],
  },
  {
    id: "design",
    titleKey: "sections.pricing.categories.design.title",
    type: "radio",
    options: [
      { id: "template", labelKey: "sections.pricing.options.templateBased", price: { PLN: 0, EUR: 0 } },
      { id: "custom", labelKey: "sections.pricing.options.customDesign", price: { PLN: 500, EUR: 115 } },
    ],
  },
  {
    id: "features",
    titleKey: "sections.pricing.categories.features.title",
    type: "checkbox",
    options: [
      { id: "contact-form", labelKey: "sections.pricing.options.contactForm", price: { PLN: 0, EUR: 0 } },
      {
        id: "telegram-bot",
        labelKey: "sections.pricing.options.telegramBot",
        price: { PLN: 250, EUR: 60 },
      },
      { id: "seo", labelKey: "sections.pricing.options.seoOptimization", price: { PLN: 400, EUR: 95 } },
      {
        id: "analytics",
        labelKey: "sections.pricing.options.analyticsSetup",
        price: { PLN: 200, EUR: 45 },
      },
    ],
  },
  {
    id: "support",
    titleKey: "sections.pricing.categories.support.title",
    type: "radio",
    options: [
      { id: "no-support", labelKey: "sections.pricing.options.noSupport", price: { PLN: 0, EUR: 0 } },
      { id: "monthly", labelKey: "sections.pricing.options.monthlySupport", price: { PLN: 150, EUR: 35 } },
    ],
  },
  {
    id: "delivery",
    titleKey: "sections.pricing.categories.delivery.title",
    type: "radio",
    options: [
      { id: "standard", labelKey: "sections.pricing.options.standard", price: { PLN: 0, EUR: 0 } },
      { id: "rush", labelKey: "sections.pricing.options.rushTwoWeeks", price: { PLN: 400, EUR: 95 } },
    ],
  },
];
