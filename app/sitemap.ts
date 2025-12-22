import { MetadataRoute } from "next";
import { supportedLanguages } from "./lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdf2md.app";

  // Priority based on traffic data
  const priorityMap: Record<string, number> = {
    en: 1.0,    // Default + US 15%
    ru: 0.95,   // Russia 26%
    ja: 0.9,    // Japan 17%
    ko: 0.85,   // South Korea 11%
    nl: 0.8,    // Netherlands 7%
    de: 0.75,   // Germany 3%
    zh: 0.7,
    fr: 0.7,
    es: 0.7,
    it: 0.65,
    pt: 0.65,
    ar: 0.6,
    hi: 0.6,
  };

  return supportedLanguages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: priorityMap[lang] || 0.5,
  }));
}
