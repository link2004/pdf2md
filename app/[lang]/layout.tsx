import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import {
  Language,
  supportedLanguages,
  isValidLanguage,
  defaultLanguage,
} from "../lib/i18n";
import {
  generateMetadataForLanguage,
  generateStructuredDataForLanguage,
  getLanguageCode,
  languageMetadata,
} from "../lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const validLang: Language = isValidLanguage(lang) ? lang : defaultLanguage;
  return generateMetadataForLanguage(validLang);
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const validLang: Language = isValidLanguage(lang) ? lang : defaultLanguage;

  const structuredData = generateStructuredDataForLanguage(validLang);
  const langCode = getLanguageCode(validLang);

  return (
    <html lang={langCode} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="alternate" hrefLang="x-default" href="https://pdf2md.app/en" />
        {supportedLanguages.map((supportedLang) => {
          const meta = languageMetadata[supportedLang];
          return (
            <link
              key={meta.hrefLang}
              rel="alternate"
              hrefLang={meta.hrefLang}
              href={`https://pdf2md.app${meta.canonicalPath}`}
            />
          );
        })}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

