export type Service = {
  titleKey: string;
  descriptionKey: string;
  icon: string;
};

export const services: Service[] = [
  {
    titleKey: "sections.services.items.businessWebsites.title",
    descriptionKey: "sections.services.items.businessWebsites.description",
    icon: "globe",
  },
  {
    titleKey: "sections.services.items.leadCapture.title",
    descriptionKey: "sections.services.items.leadCapture.description",
    icon: "cursor",
  },
  {
    titleKey: "sections.services.items.telegramNotifications.title",
    descriptionKey: "sections.services.items.telegramNotifications.description",
    icon: "bell",
  },
  {
    titleKey: "sections.services.items.websiteOptimization.title",
    descriptionKey: "sections.services.items.websiteOptimization.description",
    icon: "bolt",
  },
];
