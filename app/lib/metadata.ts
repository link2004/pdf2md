import { Metadata } from "next";
import { Language, supportedLanguages } from "./i18n";

interface LanguageMetadata {
  title: string;
  description: string;
  keywords: string[];
  locale: string;
  hrefLang: string;
  ogImage: string;
  currency: string;
  featureList: string[];
  structuredDataName: string;
  structuredDataDescription: string;
  canonicalPath: string;
}

export const languageMetadata: Record<Language, LanguageMetadata> = {
  en: {
    title: "PDF to Markdown - Free Online OCR Text Extraction Tool",
    description:
      "Convert PDF files to Markdown format with our free online tool. High-precision OCR text extraction that converts PDFs to text and outputs in Markdown format. Perfect for document digitization and text editing.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "text extraction",
      "PDF conversion",
      "document conversion",
      "PDF to Markdown",
      "online converter",
      "free tool",
      "free",
      "no cost",
      "gratis",
      "digitization",
      "document processing",
      "text editing",
      "transcription",
    ],
    locale: "en_US",
    hrefLang: "en",
    ogImage: "/og-image-en.png",
    currency: "USD",
    featureList: [
      "PDF text extraction",
      "OCR conversion",
      "Markdown output",
      "Text extraction",
      "Free online tool",
      "No cost",
      "Gratis",
    ],
    structuredDataName: "PDF to Markdown - Free Online OCR Text Extraction Tool",
    structuredDataDescription:
      "Convert PDF files to Markdown format with our free online tool. High-precision OCR text extraction that converts PDFs to text and outputs in Markdown format.",
    canonicalPath: "/en",
  },
  ja: {
    title: "PDF to Markdown - PDF文字起こし・OCR変換ツール | 無料オンライン",
    description:
      "PDFファイルをマークダウン形式に変換する無料オンラインツール。OCR技術を使用した高精度な文字起こしで、PDFからテキストを抽出し、Markdown形式で出力します。文書のデジタル化やテキスト編集に最適です。",
    keywords: [
      "PDF",
      "マークダウン",
      "Markdown",
      "文字起こし",
      "OCR",
      "PDF変換",
      "テキスト抽出",
      "文書変換",
      "PDF to Markdown",
      "オンライン変換",
      "無料ツール",
      "無料",
      "フリー",
      "タダ",
      "コスト0",
      "デジタル化",
      "文書処理",
      "テキスト編集",
    ],
    locale: "ja_JP",
    hrefLang: "ja",
    ogImage: "/og-image.png",
    currency: "JPY",
    featureList: [
      "PDF文字起こし",
      "OCR変換",
      "マークダウン出力",
      "テキスト抽出",
      "無料オンラインツール",
      "無料",
      "フリー",
      "タダ",
    ],
    structuredDataName: "PDF to Markdown - PDF文字起こし・OCR変換ツール",
    structuredDataDescription:
      "PDFファイルをマークダウン形式に変換する無料オンラインツール。OCR技術を使用した高精度な文字起こしで、PDFからテキストを抽出し、Markdown形式で出力します。",
    canonicalPath: "/ja",
  },
  ru: {
    title: "PDF to Markdown - Бесплатный онлайн-инструмент извлечения текста OCR",
    description:
      "Конвертируйте PDF-файлы в формат Markdown с помощью нашего бесплатного онлайн-инструмента. Высокоточное извлечение текста OCR, которое преобразует PDF в текст и выводит в формате Markdown. Идеально подходит для оцифровки документов и редактирования текста.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "извлечение текста",
      "конвертация PDF",
      "конвертация документов",
      "PDF to Markdown",
      "онлайн-конвертер",
      "бесплатный инструмент",
      "бесплатно",
      "без стоимости",
      "оцифровка",
      "обработка документов",
      "редактирование текста",
    ],
    locale: "ru_RU",
    hrefLang: "ru",
    ogImage: "/og-image-ru.png",
    currency: "RUB",
    featureList: [
      "Извлечение текста PDF",
      "OCR конвертация",
      "Вывод Markdown",
      "Извлечение текста",
      "Бесплатный онлайн-инструмент",
      "Бесплатно",
      "Без стоимости",
    ],
    structuredDataName: "PDF to Markdown - Бесплатный онлайн-инструмент извлечения текста OCR",
    structuredDataDescription:
      "Конвертируйте PDF-файлы в формат Markdown с помощью нашего бесплатного онлайн-инструмента. Высокоточное извлечение текста OCR, которое преобразует PDF в текст и выводит в формате Markdown.",
    canonicalPath: "/ru",
  },
  ko: {
    title: "PDF to Markdown - 무료 온라인 OCR 텍스트 추출 도구",
    description:
      "무료 온라인 도구로 PDF 파일을 마크다운 형식으로 변환하세요. 고정밀 OCR 텍스트 추출로 PDF를 텍스트로 변환하고 마크다운 형식으로 출력합니다. 문서 디지털화와 텍스트 편집에 최적입니다.",
    keywords: [
      "PDF",
      "마크다운",
      "Markdown",
      "텍스트 추출",
      "OCR",
      "PDF 변환",
      "문서 변환",
      "PDF to Markdown",
      "온라인 변환기",
      "무료 도구",
      "무료",
      "공짜",
      "디지털화",
      "문서 처리",
      "텍스트 편집",
    ],
    locale: "ko_KR",
    hrefLang: "ko",
    ogImage: "/og-image-ko.png",
    currency: "KRW",
    featureList: [
      "PDF 텍스트 추출",
      "OCR 변환",
      "마크다운 출력",
      "텍스트 추출",
      "무료 온라인 도구",
      "무료",
      "공짜",
    ],
    structuredDataName: "PDF to Markdown - 무료 온라인 OCR 텍스트 추출 도구",
    structuredDataDescription:
      "무료 온라인 도구로 PDF 파일을 마크다운 형식으로 변환하세요. 고정밀 OCR 텍스트 추출로 PDF를 텍스트로 변환하고 마크다운 형식으로 출력합니다.",
    canonicalPath: "/ko",
  },
  nl: {
    title: "PDF to Markdown - Gratis Online OCR Tekstextractie Tool",
    description:
      "Converteer PDF-bestanden naar Markdown-formaat met onze gratis online tool. Hoogwaardige OCR tekstextractie die PDF's omzet naar tekst en uitvoert in Markdown-formaat. Perfect voor documentdigitalisering en tekstbewerking.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "tekstextractie",
      "PDF conversie",
      "document conversie",
      "PDF to Markdown",
      "online converter",
      "gratis tool",
      "gratis",
      "kosteloos",
      "digitalisering",
      "documentverwerking",
      "tekstbewerking",
    ],
    locale: "nl_NL",
    hrefLang: "nl",
    ogImage: "/og-image-nl.png",
    currency: "EUR",
    featureList: [
      "PDF tekstextractie",
      "OCR conversie",
      "Markdown output",
      "Tekstextractie",
      "Gratis online tool",
      "Gratis",
      "Kosteloos",
    ],
    structuredDataName: "PDF to Markdown - Gratis Online OCR Tekstextractie Tool",
    structuredDataDescription:
      "Converteer PDF-bestanden naar Markdown-formaat met onze gratis online tool. Hoogwaardige OCR tekstextractie die PDF's omzet naar tekst en uitvoert in Markdown-formaat.",
    canonicalPath: "/nl",
  },
  de: {
    title: "PDF to Markdown - Kostenloses Online-OCR-Textextraktionstool",
    description:
      "Konvertieren Sie PDF-Dateien mit unserem kostenlosen Online-Tool in das Markdown-Format. Hochpräzise OCR-Textextraktion, die PDFs in Text umwandelt und im Markdown-Format ausgibt. Perfekt für Dokumentendigitalisierung und Textbearbeitung.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "Textextraktion",
      "PDF-Konvertierung",
      "Dokumentenkonvertierung",
      "PDF to Markdown",
      "Online-Konverter",
      "kostenloses Tool",
      "kostenlos",
      "gratis",
      "Digitalisierung",
      "Dokumentenverarbeitung",
      "Textbearbeitung",
    ],
    locale: "de_DE",
    hrefLang: "de",
    ogImage: "/og-image-de.png",
    currency: "EUR",
    featureList: [
      "PDF-Textextraktion",
      "OCR-Konvertierung",
      "Markdown-Ausgabe",
      "Textextraktion",
      "Kostenloses Online-Tool",
      "Kostenlos",
      "Gratis",
    ],
    structuredDataName: "PDF to Markdown - Kostenloses Online-OCR-Textextraktionstool",
    structuredDataDescription:
      "Konvertieren Sie PDF-Dateien mit unserem kostenlosen Online-Tool in das Markdown-Format. Hochpräzise OCR-Textextraktion, die PDFs in Text umwandelt und im Markdown-Format ausgibt.",
    canonicalPath: "/de",
  },
  zh: {
    title: "PDF to Markdown - 免费在线OCR文字识别工具",
    description:
      "使用我们的免费在线工具将PDF文件转换为Markdown格式。高精度OCR文字识别，将PDF转换为文本并输出为Markdown格式。非常适合文档数字化和文本编辑。",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "文字识别",
      "PDF转换",
      "文档转换",
      "PDF to Markdown",
      "在线转换器",
      "免费工具",
      "免费",
      "零成本",
      "数字化",
      "文档处理",
      "文本编辑",
    ],
    locale: "zh_CN",
    hrefLang: "zh",
    ogImage: "/og-image-zh.png",
    currency: "CNY",
    featureList: [
      "PDF文字提取",
      "OCR转换",
      "Markdown输出",
      "文字识别",
      "免费在线工具",
      "免费",
      "零成本",
    ],
    structuredDataName: "PDF to Markdown - 免费在线OCR文字识别工具",
    structuredDataDescription:
      "使用我们的免费在线工具将PDF文件转换为Markdown格式。高精度OCR文字识别，将PDF转换为文本并输出为Markdown格式。",
    canonicalPath: "/zh",
  },
  fr: {
    title: "PDF to Markdown - Outil gratuit d'extraction de texte OCR en ligne",
    description:
      "Convertissez les fichiers PDF au format Markdown avec notre outil en ligne gratuit. Extraction de texte OCR haute précision qui convertit les PDF en texte et les sort au format Markdown. Parfait pour la numérisation de documents et l'édition de texte.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "extraction de texte",
      "conversion PDF",
      "conversion de documents",
      "PDF to Markdown",
      "convertisseur en ligne",
      "outil gratuit",
      "gratuit",
      "sans coût",
      "numérisation",
      "traitement de documents",
      "édition de texte",
    ],
    locale: "fr_FR",
    hrefLang: "fr",
    ogImage: "/og-image-fr.png",
    currency: "EUR",
    featureList: [
      "Extraction de texte PDF",
      "Conversion OCR",
      "Sortie Markdown",
      "Extraction de texte",
      "Outil en ligne gratuit",
      "Gratuit",
      "Sans coût",
    ],
    structuredDataName: "PDF to Markdown - Outil gratuit d'extraction de texte OCR en ligne",
    structuredDataDescription:
      "Convertissez les fichiers PDF au format Markdown avec notre outil en ligne gratuit. Extraction de texte OCR haute précision qui convertit les PDF en texte et les sort au format Markdown.",
    canonicalPath: "/fr",
  },
  es: {
    title: "PDF to Markdown - Herramienta gratuita de extracción de texto OCR en línea",
    description:
      "Convierte archivos PDF a formato Markdown con nuestra herramienta en línea gratuita. Extracción de texto OCR de alta precisión que convierte PDFs a texto y los exporta en formato Markdown. Perfecto para digitalización de documentos y edición de texto.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "extracción de texto",
      "conversión PDF",
      "conversión de documentos",
      "PDF to Markdown",
      "convertidor en línea",
      "herramienta gratuita",
      "gratis",
      "sin costo",
      "digitalización",
      "procesamiento de documentos",
      "edición de texto",
    ],
    locale: "es_ES",
    hrefLang: "es",
    ogImage: "/og-image-es.png",
    currency: "EUR",
    featureList: [
      "Extracción de texto PDF",
      "Conversión OCR",
      "Salida Markdown",
      "Extracción de texto",
      "Herramienta en línea gratuita",
      "Gratis",
      "Sin costo",
    ],
    structuredDataName:
      "PDF to Markdown - Herramienta gratuita de extracción de texto OCR en línea",
    structuredDataDescription:
      "Convierte archivos PDF a formato Markdown con nuestra herramienta en línea gratuita. Extracción de texto OCR de alta precisión que convierte PDFs a texto y los exporta en formato Markdown.",
    canonicalPath: "/es",
  },
  it: {
    title: "PDF to Markdown - Strumento gratuito di estrazione testo OCR online",
    description:
      "Converti file PDF in formato Markdown con il nostro strumento online gratuito. Estrazione testo OCR ad alta precisione che converte PDF in testo e li esporta in formato Markdown. Perfetto per digitalizzazione documenti e modifica testo.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "estrazione testo",
      "conversione PDF",
      "conversione documenti",
      "PDF to Markdown",
      "convertitore online",
      "strumento gratuito",
      "gratis",
      "senza costi",
      "digitalizzazione",
      "elaborazione documenti",
      "modifica testo",
    ],
    locale: "it_IT",
    hrefLang: "it",
    ogImage: "/og-image-it.png",
    currency: "EUR",
    featureList: [
      "Estrazione testo PDF",
      "Conversione OCR",
      "Output Markdown",
      "Estrazione testo",
      "Strumento online gratuito",
      "Gratis",
      "Senza costi",
    ],
    structuredDataName: "PDF to Markdown - Strumento gratuito di estrazione testo OCR online",
    structuredDataDescription:
      "Converti file PDF in formato Markdown con il nostro strumento online gratuito. Estrazione testo OCR ad alta precisione che converte PDF in testo e li esporta in formato Markdown.",
    canonicalPath: "/it",
  },
  pt: {
    title: "PDF to Markdown - Ferramenta gratuita de extração de texto OCR online",
    description:
      "Converta arquivos PDF para formato Markdown com nossa ferramenta online gratuita. Extração de texto OCR de alta precisão que converte PDFs em texto e os exporta em formato Markdown. Perfeito para digitalização de documentos e edição de texto.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "extração de texto",
      "conversão PDF",
      "conversão de documentos",
      "PDF to Markdown",
      "conversor online",
      "ferramenta gratuita",
      "grátis",
      "sem custo",
      "digitalização",
      "processamento de documentos",
      "edição de texto",
    ],
    locale: "pt_BR",
    hrefLang: "pt",
    ogImage: "/og-image-pt.png",
    currency: "BRL",
    featureList: [
      "Extração de texto PDF",
      "Conversão OCR",
      "Saída Markdown",
      "Extração de texto",
      "Ferramenta online gratuita",
      "Grátis",
      "Sem custo",
    ],
    structuredDataName: "PDF to Markdown - Ferramenta gratuita de extração de texto OCR online",
    structuredDataDescription:
      "Converta arquivos PDF para formato Markdown com nossa ferramenta online gratuita. Extração de texto OCR de alta precisão que converte PDFs em texto e os exporta em formato Markdown.",
    canonicalPath: "/pt",
  },
  ar: {
    title: "PDF to Markdown - أداة مجانية لاستخراج النص OCR عبر الإنترنت",
    description:
      "حول ملفات PDF إلى تنسيق Markdown باستخدام أداتنا المجانية عبر الإنترنت. استخراج نص OCR عالي الدقة يحول ملفات PDF إلى نص ويخرجها بتنسيق Markdown. مثالي لرقمنة المستندات وتحرير النصوص.",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "استخراج النص",
      "تحويل PDF",
      "تحويل المستندات",
      "PDF to Markdown",
      "محول عبر الإنترنت",
      "أداة مجانية",
      "مجاني",
      "بدون تكلفة",
      "رقمنة",
      "معالجة المستندات",
      "تحرير النص",
    ],
    locale: "ar_SA",
    hrefLang: "ar",
    ogImage: "/og-image-ar.png",
    currency: "SAR",
    featureList: [
      "استخراج نص PDF",
      "تحويل OCR",
      "إخراج Markdown",
      "استخراج النص",
      "أداة مجانية عبر الإنترنت",
      "مجاني",
      "بدون تكلفة",
    ],
    structuredDataName: "PDF to Markdown - أداة مجانية لاستخراج النص OCR عبر الإنترنت",
    structuredDataDescription:
      "حول ملفات PDF إلى تنسيق Markdown باستخدام أداتنا المجانية عبر الإنترنت. استخراج نص OCR عالي الدقة يحول ملفات PDF إلى نص ويخرجها بتنسيق Markdown.",
    canonicalPath: "/ar",
  },
  hi: {
    title: "PDF to Markdown - मुफ्त ऑनलाइन OCR टेक्स्ट निष्कर्षण उपकरण",
    description:
      "हमारे मुफ्त ऑनलाइन उपकरण के साथ PDF फाइलों को Markdown प्रारूप में बदलें। उच्च-सटीकता OCR टेक्स्ट निष्कर्षण जो PDF को टेक्स्ट में बदलता है और Markdown प्रारूप में आउटपुट करता है। दस्तावेज़ डिजिटलीकरण और टेक्स्ट संपादन के लिए बिल्कुल सही।",
    keywords: [
      "PDF",
      "Markdown",
      "OCR",
      "टेक्स्ट निष्कर्षण",
      "PDF रूपांतरण",
      "दस्तावेज़ रूपांतरण",
      "PDF to Markdown",
      "ऑनलाइन कनवर्टर",
      "मुफ्त उपकरण",
      "मुफ्त",
      "बिना लागत",
      "डिजिटलीकरण",
      "दस्तावेज़ प्रसंस्करण",
      "टेक्स्ट संपादन",
    ],
    locale: "hi_IN",
    hrefLang: "hi",
    ogImage: "/og-image-hi.png",
    currency: "INR",
    featureList: [
      "PDF टेक्स्ट निष्कर्षण",
      "OCR रूपांतरण",
      "Markdown आउटपुट",
      "टेक्स्ट निष्कर्षण",
      "मुफ्त ऑनलाइन उपकरण",
      "मुफ्त",
      "बिना लागत",
    ],
    structuredDataName: "PDF to Markdown - मुफ्त ऑनलाइन OCR टेक्स्ट निष्कर्षण उपकरण",
    structuredDataDescription:
      "हमारे मुफ्त ऑनलाइन उपकरण के साथ PDF फाइलों को Markdown प्रारूप में बदलें। उच्च-सटीकता OCR टेक्स्ट निष्कर्षण जो PDF को टेक्स्ट में बदलता है और Markdown प्रारूप में आउटपुट करता है।",
    canonicalPath: "/hi",
  },
};

export function generateMetadataForLanguage(lang: Language): Metadata {
  const meta = languageMetadata[lang] || languageMetadata.en;

  const languageAlternates = supportedLanguages.reduce(
    (acc, langCode) => {
      const langMeta = languageMetadata[langCode];
      acc[langMeta.hrefLang] = new URL(langMeta.canonicalPath, "https://pdf2md.app").toString();
      return acc;
    },
    {} as Record<string, string>
  );

  languageAlternates["x-default"] = "https://pdf2md.app/en";

  const openGraphAlternateLocales = supportedLanguages
    .map((langCode) => languageMetadata[langCode].locale)
    .filter((locale) => locale !== meta.locale);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "PDF2MD" }],
    creator: "PDF2MD",
    publisher: "PDF2MD",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://pdf2md.app"),
    alternates: {
      canonical: meta.canonicalPath,
      languages: languageAlternates,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://pdf2md.app${meta.canonicalPath}`,
      siteName: "PDF2MD",
      images: [
        {
          url: meta.ogImage,
          width: 1200,
          height: 630,
          alt: `PDF to Markdown ${lang.toUpperCase()}`,
        },
      ],
      locale: meta.locale,
      alternateLocale: openGraphAlternateLocales,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export function generateStructuredDataForLanguage(lang: Language) {
  const meta = languageMetadata[lang] || languageMetadata.en;
  const availableLanguages = supportedLanguages.map(
    (langCode) => languageMetadata[langCode].hrefLang
  );

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.structuredDataName,
    description: meta.structuredDataDescription,
    url: `https://pdf2md.app${meta.canonicalPath}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    inLanguage: meta.hrefLang,
    availableLanguage: availableLanguages,
    image: meta.ogImage,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: meta.currency,
    },
    featureList: meta.featureList,
    author: {
      "@type": "Organization",
      name: "PDF2MD",
    },
    publisher: {
      "@type": "Organization",
      name: "PDF2MD",
    },
    potentialAction: {
      "@type": "UseAction",
      name: "Convert PDF to Markdown",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://pdf2md.app${meta.canonicalPath}`,
        inLanguage: meta.hrefLang,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
    },
  };
}

export function getLanguageCode(lang: Language): string {
  return lang;
}
