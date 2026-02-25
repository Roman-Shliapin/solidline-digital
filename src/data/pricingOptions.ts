export type Currency = "PLN" | "EUR";

export type PricingOption = {
  id: string;
  label: string;
  price: Record<Currency, number>;
};

export type PricingCategory = {
  id: string;
  title: string;
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
    title: "website type",
    type: "radio",
    options: [
      { id: "landing", label: "Landing Page", price: { PLN: 1000, EUR: 230 } },
      {
        id: "multipage",
        label: "Multi-page Website",
        price: { PLN: 1600, EUR: 370 },
      },
      { id: "ecommerce", label: "E-commerce", price: { PLN: 2800, EUR: 650 } },
    ],
  },
  {
    id: "design",
    title: "design",
    type: "radio",
    options: [
      { id: "template", label: "Template-based", price: { PLN: 0, EUR: 0 } },
      { id: "custom", label: "Custom Design", price: { PLN: 500, EUR: 115 } },
    ],
  },
  {
    id: "features",
    title: "features",
    type: "checkbox",
    options: [
      { id: "contact-form", label: "Contact Form", price: { PLN: 0, EUR: 0 } },
      {
        id: "telegram-bot",
        label: "Telegram Bot",
        price: { PLN: 250, EUR: 60 },
      },
      { id: "seo", label: "SEO Optimization", price: { PLN: 400, EUR: 95 } },
      {
        id: "analytics",
        label: "Analytics Setup",
        price: { PLN: 200, EUR: 45 },
      },
    ],
  },
  {
    id: "support",
    title: "ongoing support",
    type: "radio",
    options: [
      { id: "no-support", label: "No Support", price: { PLN: 0, EUR: 0 } },
      { id: "monthly", label: "Monthly Support", price: { PLN: 150, EUR: 35 } },
    ],
  },
  {
    id: "delivery",
    title: "delivery speed",
    type: "radio",
    options: [
      { id: "standard", label: "Standard", price: { PLN: 0, EUR: 0 } },
      { id: "rush", label: "Rush (2 weeks)", price: { PLN: 400, EUR: 95 } },
    ],
  },
];
