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
  | "hi"
  | "nl";

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
    backButton: "돌아가기",

    dragDropText: "PDF 파일을 드래그&드롭",
    dragDropSubtext: "PDF 파일을 드롭하거나 클릭하여 업로드",
    dragDropNote: "(PDF만, 최대 20MB)",
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

    uploadSuccessTitle: "업로드 성공",
    uploadSuccessMessagePdf: "PDF 업로드에 성공했습니다!",
    uploadSuccessMessageImage: "이미지 업로드에 성공했습니다!",
    uploadErrorTitle: "업로드 오류",
    tryAgain: "다시 시도",
    cancel: "취소",
    openPdf: "PDF 열기",
    analyzeWithAI: "AI로 분석",
    analyzing: "분석 중...",

    copyAll: "모두 복사",
    copy: "복사",
    copied: "복사됨",
    copyFailed: "복사 실패",
    downloadFailed: "다운로드 실패",
    downloadZip: "이미지+Markdown (ZIP)",
    downloadMarkdown: "Markdown만",

    analysisInProgress: "PDF를 분석하고 있습니다. 잠시만 기다려 주세요...",
    analysisInProgressDescription: "문서 구조와 이미지를 식별하고 있습니다",
    analysisErrorSuggestion: "다른 PDF를 시도하거나 지원팀에 문의하세요.",
    noPageData: "페이지 데이터를 찾을 수 없습니다. 다른 PDF를 시도해 주세요.",
    ocrResultsTitle: "OCR 분석 결과",
    enterPageNumber: "페이지 번호 입력",
    enterValidPageNumber: "유효한 페이지 번호를 입력하세요",
    noTextOnPage: "이 페이지에서 텍스트를 추출할 수 없습니다",
    showingPageStatus: "페이지 {pages}/{total} 표시 중",
    goToTop: "맨 위로",
    goToBottom: "맨 아래로",
    pageIndicator: "페이지 {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "소스",
  },
  zh: {
    title: "PDF to Markdown",
    subtitle: "PDF文字识别·OCR转换工具",
    backButton: "返回",

    dragDropText: "拖拽PDF文件",
    dragDropSubtext: "拖拽或点击上传PDF文件",
    dragDropNote: "(仅PDF，最大20MB)",
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

    uploadSuccessTitle: "上传成功",
    uploadSuccessMessagePdf: "PDF上传成功！",
    uploadSuccessMessageImage: "图片上传成功！",
    uploadErrorTitle: "上传错误",
    tryAgain: "重试",
    cancel: "取消",
    openPdf: "打开PDF",
    analyzeWithAI: "AI分析",
    analyzing: "分析中...",

    copyAll: "复制全部",
    copy: "复制",
    copied: "已复制",
    copyFailed: "复制失败",
    downloadFailed: "下载失败",
    downloadZip: "图片+Markdown (ZIP)",
    downloadMarkdown: "仅Markdown",

    analysisInProgress: "正在分析PDF，请稍候...",
    analysisInProgressDescription: "正在识别文档结构和图片",
    analysisErrorSuggestion: "请尝试其他PDF或联系支持团队。",
    noPageData: "未找到页面数据。请尝试其他PDF。",
    ocrResultsTitle: "OCR分析结果",
    enterPageNumber: "输入页码",
    enterValidPageNumber: "请输入有效的页码",
    noTextOnPage: "无法从此页面提取文本",
    showingPageStatus: "显示第{pages}页，共{total}页",
    goToTop: "返回顶部",
    goToBottom: "转到底部",
    pageIndicator: "第{current}/{total}页",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "源代码",
  },
  de: {
    title: "PDF to Markdown",
    subtitle: "PDF-Text-Extraktion·OCR-Konvertierungstool",
    backButton: "Zurück",

    dragDropText: "PDF-Datei ziehen & ablegen",
    dragDropSubtext: "PDF-Datei ablegen oder klicken zum Hochladen",
    dragDropNote: "(Nur PDF, max. 20MB)",
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

    uploadSuccessTitle: "Upload erfolgreich",
    uploadSuccessMessagePdf: "PDF erfolgreich hochgeladen!",
    uploadSuccessMessageImage: "Bild erfolgreich hochgeladen!",
    uploadErrorTitle: "Upload-Fehler",
    tryAgain: "Erneut versuchen",
    cancel: "Abbrechen",
    openPdf: "PDF öffnen",
    analyzeWithAI: "Mit KI analysieren",
    analyzing: "Analysieren...",

    copyAll: "Alles kopieren",
    copy: "Kopieren",
    copied: "Kopiert",
    copyFailed: "Kopieren fehlgeschlagen",
    downloadFailed: "Download fehlgeschlagen",
    downloadZip: "Bilder + Markdown (ZIP)",
    downloadMarkdown: "Nur Markdown",

    analysisInProgress: "PDF wird analysiert. Bitte warten...",
    analysisInProgressDescription: "Dokumentstruktur und Bilder werden identifiziert",
    analysisErrorSuggestion: "Bitte versuchen Sie ein anderes PDF oder kontaktieren Sie den Support.",
    noPageData: "Keine Seitendaten gefunden. Bitte versuchen Sie ein anderes PDF.",
    ocrResultsTitle: "OCR-Analyseergebnisse",
    enterPageNumber: "Seitennummer eingeben",
    enterValidPageNumber: "Geben Sie eine gültige Seitennummer ein",
    noTextOnPage: "Von dieser Seite konnte kein Text extrahiert werden",
    showingPageStatus: "Seite {pages} von {total} wird angezeigt",
    goToTop: "Nach oben",
    goToBottom: "Nach unten",
    pageIndicator: "Seite {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "Quelle",
  },
  fr: {
    title: "PDF to Markdown",
    subtitle: "Outil d'extraction de texte PDF·Conversion OCR",
    backButton: "Retour",

    dragDropText: "Glisser-déposer le fichier PDF",
    dragDropSubtext: "Glisser-déposer ou cliquer pour télécharger le fichier PDF",
    dragDropNote: "(PDF uniquement, max 20Mo)",
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
      "La taille du fichier dépasse la limite de 20Mo. Veuillez télécharger un fichier plus petit.",
    uploadError: "Erreur lors du téléchargement",
    analysisError: "Erreur lors de l'analyse",

    uploadSuccessTitle: "Téléchargement réussi",
    uploadSuccessMessagePdf: "PDF téléchargé avec succès !",
    uploadSuccessMessageImage: "Image téléchargée avec succès !",
    uploadErrorTitle: "Erreur de téléchargement",
    tryAgain: "Réessayer",
    cancel: "Annuler",
    openPdf: "Ouvrir le PDF",
    analyzeWithAI: "Analyser avec l'IA",
    analyzing: "Analyse en cours...",

    copyAll: "Tout copier",
    copy: "Copier",
    copied: "Copié",
    copyFailed: "Échec de la copie",
    downloadFailed: "Échec du téléchargement",
    downloadZip: "Images + Markdown (ZIP)",
    downloadMarkdown: "Markdown uniquement",

    analysisInProgress: "Analyse du PDF en cours. Veuillez patienter...",
    analysisInProgressDescription: "Identification de la structure du document et des images",
    analysisErrorSuggestion: "Veuillez essayer un autre PDF ou contacter le support.",
    noPageData: "Aucune donnée de page trouvée. Veuillez essayer un autre PDF.",
    ocrResultsTitle: "Résultats de l'analyse OCR",
    enterPageNumber: "Entrer le numéro de page",
    enterValidPageNumber: "Entrez un numéro de page valide",
    noTextOnPage: "Aucun texte n'a pu être extrait de cette page",
    showingPageStatus: "Affichage de la page {pages} sur {total}",
    goToTop: "Haut de page",
    goToBottom: "Bas de page",
    pageIndicator: "Page {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "Source",
  },
  es: {
    title: "PDF to Markdown",
    subtitle: "Herramienta de extracción de texto PDF·Conversión OCR",
    backButton: "Volver",

    dragDropText: "Arrastrar y soltar archivo PDF",
    dragDropSubtext: "Arrastrar y soltar o hacer clic para subir archivo PDF",
    dragDropNote: "(Solo PDF, máx. 20MB)",
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

    uploadSuccessTitle: "Subida exitosa",
    uploadSuccessMessagePdf: "¡PDF subido con éxito!",
    uploadSuccessMessageImage: "¡Imagen subida con éxito!",
    uploadErrorTitle: "Error de subida",
    tryAgain: "Reintentar",
    cancel: "Cancelar",
    openPdf: "Abrir PDF",
    analyzeWithAI: "Analizar con IA",
    analyzing: "Analizando...",

    copyAll: "Copiar todo",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "Error al copiar",
    downloadFailed: "Error de descarga",
    downloadZip: "Imágenes + Markdown (ZIP)",
    downloadMarkdown: "Solo Markdown",

    analysisInProgress: "Analizando PDF. Por favor espere...",
    analysisInProgressDescription: "Identificando estructura del documento e imágenes",
    analysisErrorSuggestion: "Por favor intente otro PDF o contacte al soporte.",
    noPageData: "No se encontraron datos de página. Por favor intente otro PDF.",
    ocrResultsTitle: "Resultados del análisis OCR",
    enterPageNumber: "Ingrese número de página",
    enterValidPageNumber: "Ingrese un número de página válido",
    noTextOnPage: "No se pudo extraer texto de esta página",
    showingPageStatus: "Mostrando página {pages} de {total}",
    goToTop: "Ir arriba",
    goToBottom: "Ir abajo",
    pageIndicator: "Página {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "Fuente",
  },
  it: {
    title: "PDF to Markdown",
    subtitle: "Strumento di estrazione testo PDF·Conversione OCR",
    backButton: "Indietro",

    dragDropText: "Trascina e rilascia file PDF",
    dragDropSubtext: "Trascina e rilascia o clicca per caricare file PDF",
    dragDropNote: "(Solo PDF, max 20MB)",
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

    uploadSuccessTitle: "Caricamento riuscito",
    uploadSuccessMessagePdf: "PDF caricato con successo!",
    uploadSuccessMessageImage: "Immagine caricata con successo!",
    uploadErrorTitle: "Errore di caricamento",
    tryAgain: "Riprova",
    cancel: "Annulla",
    openPdf: "Apri PDF",
    analyzeWithAI: "Analizza con IA",
    analyzing: "Analisi in corso...",

    copyAll: "Copia tutto",
    copy: "Copia",
    copied: "Copiato",
    copyFailed: "Copia fallita",
    downloadFailed: "Download fallito",
    downloadZip: "Immagini + Markdown (ZIP)",
    downloadMarkdown: "Solo Markdown",

    analysisInProgress: "Analisi PDF in corso. Attendere prego...",
    analysisInProgressDescription: "Identificazione struttura documento e immagini",
    analysisErrorSuggestion: "Provare un altro PDF o contattare il supporto.",
    noPageData: "Nessun dato di pagina trovato. Provare un altro PDF.",
    ocrResultsTitle: "Risultati analisi OCR",
    enterPageNumber: "Inserire numero pagina",
    enterValidPageNumber: "Inserire un numero di pagina valido",
    noTextOnPage: "Impossibile estrarre testo da questa pagina",
    showingPageStatus: "Visualizzazione pagina {pages} di {total}",
    goToTop: "Vai in alto",
    goToBottom: "Vai in basso",
    pageIndicator: "Pagina {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "Fonte",
  },
  pt: {
    title: "PDF to Markdown",
    subtitle: "Ferramenta de extração de texto PDF·Conversão OCR",
    backButton: "Voltar",

    dragDropText: "Arrastar e soltar arquivo PDF",
    dragDropSubtext: "Arrastar e soltar ou clicar para enviar arquivo PDF",
    dragDropNote: "(Apenas PDF, máx. 20MB)",
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

    uploadSuccessTitle: "Upload bem-sucedido",
    uploadSuccessMessagePdf: "PDF enviado com sucesso!",
    uploadSuccessMessageImage: "Imagem enviada com sucesso!",
    uploadErrorTitle: "Erro de upload",
    tryAgain: "Tentar novamente",
    cancel: "Cancelar",
    openPdf: "Abrir PDF",
    analyzeWithAI: "Analisar com IA",
    analyzing: "Analisando...",

    copyAll: "Copiar tudo",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "Falha ao copiar",
    downloadFailed: "Falha no download",
    downloadZip: "Imagens + Markdown (ZIP)",
    downloadMarkdown: "Apenas Markdown",

    analysisInProgress: "Analisando PDF. Por favor aguarde...",
    analysisInProgressDescription: "Identificando estrutura do documento e imagens",
    analysisErrorSuggestion: "Por favor tente outro PDF ou entre em contato com o suporte.",
    noPageData: "Nenhum dado de página encontrado. Por favor tente outro PDF.",
    ocrResultsTitle: "Resultados da análise OCR",
    enterPageNumber: "Digite o número da página",
    enterValidPageNumber: "Digite um número de página válido",
    noTextOnPage: "Não foi possível extrair texto desta página",
    showingPageStatus: "Exibindo página {pages} de {total}",
    goToTop: "Ir para o topo",
    goToBottom: "Ir para o final",
    pageIndicator: "Página {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "Fonte",
  },
  ru: {
    title: "PDF to Markdown",
    subtitle: "Инструмент извлечения текста PDF·OCR конвертация",
    backButton: "Назад",

    dragDropText: "Перетащите PDF файл",
    dragDropSubtext: "Перетащите или нажмите для загрузки PDF файла",
    dragDropNote: "(Только PDF, макс. 20МБ)",
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
      "Размер файла превышает лимит 20МБ. Пожалуйста, загрузите файл меньшего размера.",
    uploadError: "Ошибка при загрузке",
    analysisError: "Ошибка при анализе",

    uploadSuccessTitle: "Загрузка успешна",
    uploadSuccessMessagePdf: "PDF успешно загружен!",
    uploadSuccessMessageImage: "Изображение успешно загружено!",
    uploadErrorTitle: "Ошибка загрузки",
    tryAgain: "Повторить",
    cancel: "Отмена",
    openPdf: "Открыть PDF",
    analyzeWithAI: "Анализ с ИИ",
    analyzing: "Анализ...",

    copyAll: "Копировать всё",
    copy: "Копировать",
    copied: "Скопировано",
    copyFailed: "Ошибка копирования",
    downloadFailed: "Ошибка загрузки",
    downloadZip: "Изображения + Markdown (ZIP)",
    downloadMarkdown: "Только Markdown",

    analysisInProgress: "Анализ PDF. Пожалуйста, подождите...",
    analysisInProgressDescription: "Определение структуры документа и изображений",
    analysisErrorSuggestion: "Попробуйте другой PDF или обратитесь в поддержку.",
    noPageData: "Данные страницы не найдены. Попробуйте другой PDF.",
    ocrResultsTitle: "Результаты OCR анализа",
    enterPageNumber: "Введите номер страницы",
    enterValidPageNumber: "Введите корректный номер страницы",
    noTextOnPage: "Не удалось извлечь текст с этой страницы",
    showingPageStatus: "Показана страница {pages} из {total}",
    goToTop: "В начало",
    goToBottom: "В конец",
    pageIndicator: "Страница {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "Исходный код",
  },
  ar: {
    title: "PDF to Markdown",
    subtitle: "أداة استخراج النص من PDF·تحويل OCR",
    backButton: "رجوع",

    dragDropText: "اسحب وأفلت ملف PDF",
    dragDropSubtext: "اسحب وأفلت أو انقر لرفع ملف PDF",
    dragDropNote: "(PDF فقط، الحد الأقصى 20 ميجابايت)",
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
    fileSizeExceeded: "حجم الملف يتجاوز حد 20 ميجابايت. يرجى رفع ملف أصغر.",
    uploadError: "خطأ أثناء الرفع",
    analysisError: "خطأ أثناء التحليل",

    uploadSuccessTitle: "تم الرفع بنجاح",
    uploadSuccessMessagePdf: "تم رفع PDF بنجاح!",
    uploadSuccessMessageImage: "تم رفع الصورة بنجاح!",
    uploadErrorTitle: "خطأ في الرفع",
    tryAgain: "حاول مرة أخرى",
    cancel: "إلغاء",
    openPdf: "فتح PDF",
    analyzeWithAI: "تحليل بالذكاء الاصطناعي",
    analyzing: "جاري التحليل...",

    copyAll: "نسخ الكل",
    copy: "نسخ",
    copied: "تم النسخ",
    copyFailed: "فشل النسخ",
    downloadFailed: "فشل التنزيل",
    downloadZip: "صور + Markdown (ZIP)",
    downloadMarkdown: "Markdown فقط",

    analysisInProgress: "جاري تحليل PDF. يرجى الانتظار...",
    analysisInProgressDescription: "تحديد بنية المستند والصور",
    analysisErrorSuggestion: "يرجى تجربة PDF آخر أو الاتصال بالدعم.",
    noPageData: "لم يتم العثور على بيانات الصفحة. يرجى تجربة PDF آخر.",
    ocrResultsTitle: "نتائج تحليل OCR",
    enterPageNumber: "أدخل رقم الصفحة",
    enterValidPageNumber: "أدخل رقم صفحة صالح",
    noTextOnPage: "لا يمكن استخراج نص من هذه الصفحة",
    showingPageStatus: "عرض الصفحة {pages} من {total}",
    goToTop: "إلى الأعلى",
    goToBottom: "إلى الأسفل",
    pageIndicator: "صفحة {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "المصدر",
  },
  hi: {
    title: "PDF to Markdown",
    subtitle: "PDF टेक्स्ट निष्कर्षण·OCR रूपांतरण उपकरण",
    backButton: "वापस",

    dragDropText: "PDF फाइल खींचें और छोड़ें",
    dragDropSubtext: "PDF फाइल अपलोड करने के लिए खींचें या क्लिक करें",
    dragDropNote: "(केवल PDF, अधिकतम 20MB)",
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

    uploadSuccessTitle: "अपलोड सफल",
    uploadSuccessMessagePdf: "PDF सफलतापूर्वक अपलोड हुआ!",
    uploadSuccessMessageImage: "छवि सफलतापूर्वक अपलोड हुई!",
    uploadErrorTitle: "अपलोड त्रुटि",
    tryAgain: "पुनः प्रयास करें",
    cancel: "रद्द करें",
    openPdf: "PDF खोलें",
    analyzeWithAI: "AI से विश्लेषण",
    analyzing: "विश्लेषण हो रहा है...",

    copyAll: "सभी कॉपी करें",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    copyFailed: "कॉपी विफल",
    downloadFailed: "डाउनलोड विफल",
    downloadZip: "छवियाँ + Markdown (ZIP)",
    downloadMarkdown: "केवल Markdown",

    analysisInProgress: "PDF का विश्लेषण हो रहा है। कृपया प्रतीक्षा करें...",
    analysisInProgressDescription: "दस्तावेज़ संरचना और छवियों की पहचान",
    analysisErrorSuggestion: "कृपया अन्य PDF आज़माएं या सहायता से संपर्क करें।",
    noPageData: "पृष्ठ डेटा नहीं मिला। कृपया अन्य PDF आज़माएं।",
    ocrResultsTitle: "OCR विश्लेषण परिणाम",
    enterPageNumber: "पृष्ठ संख्या दर्ज करें",
    enterValidPageNumber: "मान्य पृष्ठ संख्या दर्ज करें",
    noTextOnPage: "इस पृष्ठ से टेक्स्ट निकालने में असमर्थ",
    showingPageStatus: "पृष्ठ {pages}/{total} दिखाया जा रहा है",
    goToTop: "शीर्ष पर जाएं",
    goToBottom: "नीचे जाएं",
    pageIndicator: "पृष्ठ {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "स्रोत",
  },
  nl: {
    title: "PDF to Markdown",
    subtitle: "PDF Tekstextractie·OCR Conversietool",
    backButton: "Terug",

    dragDropText: "Sleep PDF bestand hier",
    dragDropSubtext: "Sleep of klik om PDF bestand te uploaden",
    dragDropNote: "(Alleen PDF, max 20MB)",
    selectFileButton: "Bestand selecteren",
    dropHereText: "Hier neerzetten",

    uploadedFile: "Geüpload bestand",
    noFile: "Geen bestand",
    uploading: "Uploaden...",

    converting: "Converteren...",
    convertingSubtext: "PDF naar tekst converteren",
    noConversionResult: "Geen conversieresultaat",

    pdf: "PDF",
    image: "Afbeelding",

    onlyPdfFiles: "Alleen PDF bestanden kunnen worden geüpload",
    fileSizeExceeded:
      "Bestandsgrootte overschrijdt de 20MB limiet. Upload een kleiner bestand.",
    uploadError: "Fout tijdens uploaden",
    analysisError: "Fout tijdens analyse",

    uploadSuccessTitle: "Upload geslaagd",
    uploadSuccessMessagePdf: "PDF succesvol geüpload!",
    uploadSuccessMessageImage: "Afbeelding succesvol geüpload!",
    uploadErrorTitle: "Upload fout",
    tryAgain: "Opnieuw proberen",
    cancel: "Annuleren",
    openPdf: "PDF openen",
    analyzeWithAI: "Analyseren met AI",
    analyzing: "Analyseren...",

    copyAll: "Alles kopiëren",
    copy: "Kopiëren",
    copied: "Gekopieerd",
    copyFailed: "Kopiëren mislukt",
    downloadFailed: "Download mislukt",
    downloadZip: "Afbeeldingen + Markdown (ZIP)",
    downloadMarkdown: "Alleen Markdown",

    analysisInProgress: "PDF wordt geanalyseerd. Even geduld...",
    analysisInProgressDescription: "Documentstructuur en afbeeldingen worden geïdentificeerd",
    analysisErrorSuggestion: "Probeer een andere PDF of neem contact op met support.",
    noPageData: "Geen paginagegevens gevonden. Probeer een andere PDF.",
    ocrResultsTitle: "OCR Analyseresultaten",
    enterPageNumber: "Voer paginanummer in",
    enterValidPageNumber: "Voer een geldig paginanummer in",
    noTextOnPage: "Er kon geen tekst worden geëxtraheerd van deze pagina",
    showingPageStatus: "Pagina {pages} van {total} wordt weergegeven",
    goToTop: "Naar boven",
    goToBottom: "Naar beneden",
    pageIndicator: "Pagina {current}/{total}",

    footerText: "© 2025 riku ogawa.",
    footerBuiltWith: "Powered by",
    footerSource: "Bron",
  },
};

export const supportedLanguages: Language[] = [
  "en",
  "ja",
  "ru",
  "ko",
  "nl",
  "de",
  "zh",
  "fr",
  "es",
  "it",
  "pt",
  "ar",
  "hi",
];

export const defaultLanguage: Language = "en";

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

export function isValidLanguage(lang: string): lang is Language {
  return supportedLanguages.includes(lang as Language);
}

export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLanguage(firstSegment)) {
    return firstSegment;
  }
  
  return defaultLanguage;
}

// Legacy function for backward compatibility
export function getLanguageFromSearchParams(searchParams: URLSearchParams): Language {
  const lang = searchParams.get("lang");
  return supportedLanguages.includes(lang as Language) ? (lang as Language) : defaultLanguage;
}

export function formatTranslation(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in params ? String(params[key]) : `{${key}}`
  );
}
