import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLanguages, defaultLanguage, type Language } from "./app/lib/i18n";

// Browser language to supported language mapping
const browserLangMap: Record<string, Language> = {
  // Russian Federation - 26%
  ru: "ru",
  "ru-RU": "ru",
  // Japan - 17%
  ja: "ja",
  "ja-JP": "ja",
  // USA / English - 15%
  en: "en",
  "en-US": "en",
  "en-GB": "en",
  "en-AU": "en",
  "en-CA": "en",
  // South Korea - 11%
  ko: "ko",
  "ko-KR": "ko",
  // Netherlands - 7%
  nl: "nl",
  "nl-NL": "nl",
  "nl-BE": "nl",
  // Germany - 3%
  de: "de",
  "de-DE": "de",
  "de-AT": "de",
  "de-CH": "de",
  // Chinese
  zh: "zh",
  "zh-CN": "zh",
  "zh-TW": "zh",
  "zh-HK": "zh",
  // French
  fr: "fr",
  "fr-FR": "fr",
  "fr-CA": "fr",
  "fr-BE": "fr",
  "fr-CH": "fr",
  // Spanish
  es: "es",
  "es-ES": "es",
  "es-MX": "es",
  "es-AR": "es",
  // Italian
  it: "it",
  "it-IT": "it",
  // Portuguese
  pt: "pt",
  "pt-BR": "pt",
  "pt-PT": "pt",
  // Arabic
  ar: "ar",
  "ar-SA": "ar",
  "ar-AE": "ar",
  "ar-EG": "ar",
  // Hindi
  hi: "hi",
  "hi-IN": "hi",
};

function getPreferredLanguage(request: NextRequest): Language {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, priority] = lang.trim().split(";q=");
        return {
          code: code.trim(),
          priority: priority ? parseFloat(priority) : 1,
        };
      })
      .sort((a, b) => b.priority - a.priority);

    for (const { code } of languages) {
      // Try exact match first
      if (browserLangMap[code]) {
        return browserLangMap[code];
      }
      // Try language code without region
      const langCode = code.split("-")[0];
      if (browserLangMap[langCode]) {
        return browserLangMap[langCode];
      }
    }
  }

  return defaultLanguage;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid language prefix
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathnameSegments[0];

  if (firstSegment && supportedLanguages.includes(firstSegment as Language)) {
    // Language is already in the path, continue
    return NextResponse.next();
  }

  // Handle legacy query parameter URLs (redirect to new path-based URLs)
  const langParam = request.nextUrl.searchParams.get("lang");
  if (langParam && supportedLanguages.includes(langParam as Language)) {
    const newUrl = new URL(`/${langParam}`, request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Root path or path without language - redirect to appropriate language
  if (pathname === "/" || !firstSegment) {
    const preferredLanguage = getPreferredLanguage(request);
    const newUrl = new URL(`/${preferredLanguage}`, request.url);
    return NextResponse.redirect(newUrl, { status: 307 });
  }

  // For other paths without language prefix, redirect to default language
  const preferredLanguage = getPreferredLanguage(request);
  const newUrl = new URL(`/${preferredLanguage}${pathname}`, request.url);
  return NextResponse.redirect(newUrl, { status: 307 });
}

export const config = {
  matcher: [
    // Match all paths except static files and API
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};

