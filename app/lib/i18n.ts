export type Language =
  | "ja"
  | "en"
  | "ko"
  | "zh"
  | "de"
  | "fr"
  | "es"
  | "it"
  | "pt"
  | "ru"
  | "ar"
  | "hi";

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  backButton: string;

  // Upload section
  dragDropText: string;
  dragDropSubtext: string;
  dragDropNote: string;
  selectFileButton: string;
  dropHereText: string;

  // File info
  uploadedFile: string;
  noFile: string;
  uploading: string;

  // Analysis section
  converting: string;
  convertingSubtext: string;
  noConversionResult: string;

  // File types
  pdf: string;
  image: string;

  // Alerts & validations
  onlyPdfFiles: string;
  fileSizeExceeded: string;
  uploadError: string;
  analysisError: string;

  // Upload result
  uploadSuccessTitle: string;
  uploadSuccessMessagePdf: string;
  uploadSuccessMessageImage: string;
  uploadErrorTitle: string;
  tryAgain: string;
  cancel: string;
  openPdf: string;
  analyzeWithAI: string;
  analyzing: string;

  // OCR result actions
  copyAll: string;
  copy: string;
  copied: string;
  copyFailed: string;
  downloadFailed: string;
  downloadZip: string;
  downloadMarkdown: string;

  // OCR result status
  analysisInProgress: string;
  analysisInProgressDescription: string;
  analysisErrorSuggestion: string;
  noPageData: string;
  ocrResultsTitle: string;
  enterPageNumber: string;
  enterValidPageNumber: string;
  noTextOnPage: string;
  showingPageStatus: string;
  goToTop: string;
  goToBottom: string;
  pageIndicator: string;

  // Footer
  footerText: string;
  footerBuiltWith: string;
  footerSource: string;
}

const enTranslations: Translations = {
  title: "PDF to Markdown",
  subtitle: "OCR Text Extraction Tool",
  backButton: "Return",

  dragDropText: "Drag & Drop PDF File",
  dragDropSubtext: "Drop or click to upload PDF file",
  dragDropNote: "(PDF only, max 20MB)",
  selectFileButton: "Select File",
  dropHereText: "Drop here",

  uploadedFile: "Uploaded File",
  noFile: "No File",
  uploading: "Uploading...",

  converting: "Converting...",
  convertingSubtext: "Converting PDF to text",
  noConversionResult: "No Conversion Result",

  pdf: "PDF",
  image: "Image",

  onlyPdfFiles: "Only PDF files can be uploaded",
  fileSizeExceeded: "File size exceeds the 20MB limit. Please upload a smaller file.",
  uploadError: "Error during upload",
  analysisError: "Error during analysis",

  uploadSuccessTitle: "Upload Successful",
  uploadSuccessMessagePdf: "PDF upload successful!",
  uploadSuccessMessageImage: "Image upload successful!",
  uploadErrorTitle: "Upload Error",
  tryAgain: "Try Again",
  cancel: "Cancel",
  openPdf: "Open PDF",
  analyzeWithAI: "Analyze with AI",
  analyzing: "Analyzing...",

  copyAll: "Copy All",
  copy: "Copy",
  copied: "Copied",
  copyFailed: "Copy failed",
  downloadFailed: "Download failed",
  downloadZip: "Images + Markdown (ZIP)",
  downloadMarkdown: "Markdown only",

  analysisInProgress: "Analyzing PDF. Please wait...",
  analysisInProgressDescription: "Identifying document structure and images",
  analysisErrorSuggestion: "Please try another PDF or contact support for assistance.",
  noPageData: "No page data found. Please try another PDF.",
  ocrResultsTitle: "OCR Analysis Results",
  enterPageNumber: "Enter page number",
  enterValidPageNumber: "Enter a valid page number",
  noTextOnPage: "No text could be extracted from this page",
  showingPageStatus: "Showing page {pages} of {total} pages",
  goToTop: "Go to Top",
  goToBottom: "Go to Bottom",
  pageIndicator: "Page {current}/{total}",

  footerText: "© 2025 riku ogawa.",
  footerBuiltWith: "powered by",
  footerSource: "Source",
};

const translations: Record<Language, Partial<Translations>> = {
  en: enTranslations,
  ja: {
    title: "PDF to Markdown",
    subtitle: "PDF文字起こし・OCR変換ツール",
    backButton: "戻る",

    dragDropText: "PDFファイルをドラッグ&ドロップ",
    dragDropSubtext: "PDFファイルをドロップまたはクリックしてアップロード",
    dragDropNote: "(PDFのみ・最大20MB)",
    selectFileButton: "ファイルを選択",
    dropHereText: "ここにドロップ",

    uploadedFile: "アップロードされたファイル",
    noFile: "ファイルなし",
    uploading: "アップロード中...",

    converting: "変換中...",
    convertingSubtext: "PDFをテキストに変換中",
    noConversionResult: "変換結果なし",

    pdf: "PDF",
    image: "画像",

    onlyPdfFiles: "PDFファイルのみアップロード可能です",
    fileSizeExceeded:
      "ファイルサイズが20MB制限を超えています。より小さなファイルをアップロードしてください。",
    uploadError: "アップロード中にエラーが発生しました",
    analysisError: "分析中にエラーが発生しました",

    uploadSuccessTitle: "アップロード成功",
    uploadSuccessMessagePdf: "PDFのアップロードに成功しました！",
    uploadSuccessMessageImage: "画像のアップロードに成功しました！",
    uploadErrorTitle: "アップロードエラー",
    tryAgain: "再試行",
    cancel: "キャンセル",
    openPdf: "PDFを開く",
    analyzeWithAI: "AIで解析",
    analyzing: "解析中...",

    copyAll: "すべてコピー",
    copy: "コピー",
    copied: "コピーしました",
    copyFailed: "コピーに失敗しました",
    downloadFailed: "ダウンロードに失敗しました",
    downloadZip: "画像+MarkdownをZIPで保存",
    downloadMarkdown: "Markdownのみ保存",

    analysisInProgress: "PDFを解析しています。しばらくお待ちください...",
    analysisInProgressDescription: "ドキュメントの構造と画像を解析しています",
    analysisErrorSuggestion: "別のPDFを試すか、サポートへご連絡ください。",
    noPageData: "ページデータが見つかりません。別のPDFをお試しください。",
    ocrResultsTitle: "OCR解析結果",
    enterPageNumber: "ページ番号を入力",
    enterValidPageNumber: "有効なページ番号を入力してください",
    noTextOnPage: "このページからテキストを抽出できませんでした",
    showingPageStatus: "表示中のページ: {pages}/{total}",
    goToTop: "先頭へ",
    goToBottom: "末尾へ",
    pageIndicator: "ページ {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "ソース",
  },
  ko: {
    title: "PDF to Markdown",
    subtitle: "PDF 텍스트 추출·OCR 변환 도구",

    dragDropText: "PDF 파일을 드래그&드롭",
    dragDropSubtext: "PDF 파일을 드롭하거나 클릭하여 업로드",
    selectFileButton: "파일 선택",
    dropHereText: "여기에 드롭",

    uploadedFile: "업로드된 파일",
    noFile: "파일 없음",
    uploading: "업로드 중...",

    converting: "변환 중...",
    convertingSubtext: "PDF를 텍스트로 변환 중",
    noConversionResult: "변환 결과 없음",

    pdf: "PDF",
    image: "이미지",

    onlyPdfFiles: "PDF 파일만 업로드 가능합니다",
    fileSizeExceeded: "파일 크기가 20MB 제한을 초과했습니다. 더 작은 파일을 업로드해 주세요.",
    uploadError: "업로드 중 오류가 발생했습니다",
    analysisError: "분석 중 오류가 발생했습니다",

    footerText: "© 2025 riku ogawa.",
  },
  zh: {
    title: "PDF to Markdown",
    subtitle: "PDF文字识别·OCR转换工具",

    dragDropText: "拖拽PDF文件",
    dragDropSubtext: "拖拽或点击上传PDF文件",
    selectFileButton: "选择文件",
    dropHereText: "拖拽到这里",

    uploadedFile: "已上传文件",
    noFile: "无文件",
    uploading: "上传中...",

    converting: "转换中...",
    convertingSubtext: "正在将PDF转换为文本",
    noConversionResult: "无转换结果",

    pdf: "PDF",
    image: "图片",

    onlyPdfFiles: "只能上传PDF文件",
    fileSizeExceeded: "文件大小超过20MB限制。请上传更小的文件。",
    uploadError: "上传时发生错误",
    analysisError: "分析时发生错误",

    footerText: "© 2025 riku ogawa.",
  },
  de: {
    title: "PDF to Markdown",
    subtitle: "PDF-Text-Extraktion·OCR-Konvertierungstool",

    dragDropText: "PDF-Datei ziehen & ablegen",
    dragDropSubtext: "PDF-Datei ablegen oder klicken zum Hochladen",
    selectFileButton: "Datei auswählen",
    dropHereText: "Hier ablegen",

    uploadedFile: "Hochgeladene Datei",
    noFile: "Keine Datei",
    uploading: "Hochladen...",

    converting: "Konvertieren...",
    convertingSubtext: "PDF in Text konvertieren",
    noConversionResult: "Kein Konvertierungsergebnis",

    pdf: "PDF",
    image: "Bild",

    onlyPdfFiles: "Nur PDF-Dateien können hochgeladen werden",
    fileSizeExceeded:
      "Dateigröße überschreitet das 20MB-Limit. Bitte laden Sie eine kleinere Datei hoch.",
    uploadError: "Fehler beim Hochladen",
    analysisError: "Fehler bei der Analyse",

    footerText: "© 2025 riku ogawa.",
  },
  fr: {
    title: "PDF to Markdown",
    subtitle: "Outil d'extraction de texte PDF·Conversion OCR",

    dragDropText: "Glisser-déposer le fichier PDF",
    dragDropSubtext: "Glisser-déposer ou cliquer pour télécharger le fichier PDF",
    selectFileButton: "Sélectionner le fichier",
    dropHereText: "Déposer ici",

    uploadedFile: "Fichier téléchargé",
    noFile: "Aucun fichier",
    uploading: "Téléchargement...",

    converting: "Conversion...",
    convertingSubtext: "Conversion du PDF en texte",
    noConversionResult: "Aucun résultat de conversion",

    pdf: "PDF",
    image: "Image",

    onlyPdfFiles: "Seuls les fichiers PDF peuvent être téléchargés",
    fileSizeExceeded:
      "La taille du fichier dépasse la limite de 20MB. Veuillez télécharger un fichier plus petit.",
    uploadError: "Erreur lors du téléchargement",
    analysisError: "Erreur lors de l'analyse",

    footerText: "© 2025 riku ogawa.",
  },
  es: {
    title: "PDF to Markdown",
    subtitle: "Herramienta de extracción de texto PDF·Conversión OCR",

    dragDropText: "Arrastrar y soltar archivo PDF",
    dragDropSubtext: "Arrastrar y soltar o hacer clic para subir archivo PDF",
    selectFileButton: "Seleccionar archivo",
    dropHereText: "Soltar aquí",

    uploadedFile: "Archivo subido",
    noFile: "Sin archivo",
    uploading: "Subiendo...",

    converting: "Convirtiendo...",
    convertingSubtext: "Convirtiendo PDF a texto",
    noConversionResult: "Sin resultado de conversión",

    pdf: "PDF",
    image: "Imagen",

    onlyPdfFiles: "Solo se pueden subir archivos PDF",
    fileSizeExceeded:
      "El tamaño del archivo excede el límite de 20MB. Por favor, suba un archivo más pequeño.",
    uploadError: "Error durante la subida",
    analysisError: "Error durante el análisis",

    footerText: "© 2025 riku ogawa.",
  },
  it: {
    title: "PDF to Markdown",
    subtitle: "Strumento di estrazione testo PDF·Conversione OCR",

    dragDropText: "Trascina e rilascia file PDF",
    dragDropSubtext: "Trascina e rilascia o clicca per caricare file PDF",
    selectFileButton: "Seleziona file",
    dropHereText: "Rilascia qui",

    uploadedFile: "File caricato",
    noFile: "Nessun file",
    uploading: "Caricamento...",

    converting: "Conversione...",
    convertingSubtext: "Conversione PDF in testo",
    noConversionResult: "Nessun risultato di conversione",

    pdf: "PDF",
    image: "Immagine",

    onlyPdfFiles: "Solo i file PDF possono essere caricati",
    fileSizeExceeded:
      "La dimensione del file supera il limite di 20MB. Si prega di caricare un file più piccolo.",
    uploadError: "Errore durante il caricamento",
    analysisError: "Errore durante l'analisi",

    footerText: "© 2025 riku ogawa.",
  },
  pt: {
    title: "PDF to Markdown",
    subtitle: "Ferramenta de extração de texto PDF·Conversão OCR",

    dragDropText: "Arrastar e soltar arquivo PDF",
    dragDropSubtext: "Arrastar e soltar ou clicar para enviar arquivo PDF",
    selectFileButton: "Selecionar arquivo",
    dropHereText: "Soltar aqui",

    uploadedFile: "Arquivo enviado",
    noFile: "Nenhum arquivo",
    uploading: "Enviando...",

    converting: "Convertendo...",
    convertingSubtext: "Convertendo PDF para texto",
    noConversionResult: "Nenhum resultado de conversão",

    pdf: "PDF",
    image: "Imagem",

    onlyPdfFiles: "Apenas arquivos PDF podem ser enviados",
    fileSizeExceeded:
      "O tamanho do arquivo excede o limite de 20MB. Por favor, envie um arquivo menor.",
    uploadError: "Erro durante o envio",
    analysisError: "Erro durante a análise",

    footerText: "© 2025 riku ogawa.",
  },
  ru: {
    title: "PDF to Markdown",
    subtitle: "Инструмент извлечения текста PDF·OCR конвертация",

    dragDropText: "Перетащите PDF файл",
    dragDropSubtext: "Перетащите или нажмите для загрузки PDF файла",
    selectFileButton: "Выбрать файл",
    dropHereText: "Перетащите сюда",

    uploadedFile: "Загруженный файл",
    noFile: "Нет файла",
    uploading: "Загрузка...",

    converting: "Конвертация...",
    convertingSubtext: "Конвертация PDF в текст",
    noConversionResult: "Нет результата конвертации",

    pdf: "PDF",
    image: "Изображение",

    onlyPdfFiles: "Можно загружать только PDF файлы",
    fileSizeExceeded:
      "Размер файла превышает лимит 20MB. Пожалуйста, загрузите файл меньшего размера.",
    uploadError: "Ошибка при загрузке",
    analysisError: "Ошибка при анализе",

    footerText: "© 2025 riku ogawa.",
  },
  ar: {
    title: "PDF to Markdown",
    subtitle: "أداة استخراج النص من PDF·تحويل OCR",

    dragDropText: "اسحب وأفلت ملف PDF",
    dragDropSubtext: "اسحب وأفلت أو انقر لرفع ملف PDF",
    selectFileButton: "اختر الملف",
    dropHereText: "أفلت هنا",

    uploadedFile: "الملف المرفوع",
    noFile: "لا يوجد ملف",
    uploading: "جاري الرفع...",

    converting: "جاري التحويل...",
    convertingSubtext: "تحويل PDF إلى نص",
    noConversionResult: "لا توجد نتيجة تحويل",

    pdf: "PDF",
    image: "صورة",

    onlyPdfFiles: "يمكن رفع ملفات PDF فقط",
    fileSizeExceeded: "حجم الملف يتجاوز حد 20MB. يرجى رفع ملف أصغر.",
    uploadError: "خطأ أثناء الرفع",
    analysisError: "خطأ أثناء التحليل",

    footerText: "© 2025 riku ogawa.",
  },
  hi: {
    title: "PDF to Markdown",
    subtitle: "PDF टेक्स्ट निष्कर्षण·OCR रूपांतरण उपकरण",

    dragDropText: "PDF फाइल खींचें और छोड़ें",
    dragDropSubtext: "PDF फाइल अपलोड करने के लिए खींचें या क्लिक करें",
    selectFileButton: "फाइल चुनें",
    dropHereText: "यहाँ छोड़ें",

    uploadedFile: "अपलोड की गई फाइल",
    noFile: "कोई फाइल नहीं",
    uploading: "अपलोड हो रहा है...",

    converting: "रूपांतरण हो रहा है...",
    convertingSubtext: "PDF को टेक्स्ट में रूपांतरित कर रहे हैं",
    noConversionResult: "कोई रूपांतरण परिणाम नहीं",

    pdf: "PDF",
    image: "छवि",

    onlyPdfFiles: "केवल PDF फाइलें अपलोड की जा सकती हैं",
    fileSizeExceeded: "फाइल का आकार 20MB सीमा से अधिक है। कृपया छोटी फाइल अपलोड करें।",
    uploadError: "अपलोड के दौरान त्रुटि",
    analysisError: "विश्लेषण के दौरान त्रुटि",

    footerText: "© 2025 riku ogawa.",
  },
};

const supportedLanguages: Language[] = [
  "ja",
  "en",
  "ko",
  "zh",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "ru",
  "ar",
  "hi",
];

export function getTranslations(lang: Language): Translations {
  if (lang === "en") {
    return enTranslations;
  }

  const overrides = translations[lang];
  if (!overrides) {
    return enTranslations;
  }

  return { ...enTranslations, ...overrides } as Translations;
}

export function getLanguageFromSearchParams(searchParams: URLSearchParams): Language {
  const lang = searchParams.get("lang");
  return supportedLanguages.includes(lang as Language) ? (lang as Language) : "en";
}

export function formatTranslation(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in params ? String(params[key]) : `{${key}}`
  );
}
