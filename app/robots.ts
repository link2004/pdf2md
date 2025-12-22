import { MetadataRoute } from "next";
import { supportedLanguages } from "./lib/i18n";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://pdf2md.app";

  // Generate allow rules for all language paths
  const allowPaths = ["/", ...supportedLanguages.map((lang) => `/${lang}`)];

  return {
    rules: {
      userAgent: "*",
      allow: allowPaths,
      disallow: ["/api/", "/_next/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
