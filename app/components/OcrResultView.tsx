"use client";

import { OCRResponse } from "@mistralai/mistralai/src/models/components/ocrresponse.js";
import { OCRPageObject } from "@mistralai/mistralai/src/models/components/ocrpageobject.js";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { useState, useRef, useEffect } from "react";
import { Copy, Check, Download } from "lucide-react";
import { downloadAsZip } from "../action/downloadHelper";
import { formatTranslation, type Translations } from "../lib/i18n";

type OcrResultViewProps = {
  ocrResult: OCRResponse | { success: false; error: string } | null;
  analyzing: boolean;
  translations: Translations;
};

export default function OcrResultView({ ocrResult, analyzing, translations }: OcrResultViewProps) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [copyMessage, setCopyMessage] = useState<{
    text: string;
    pageIndex?: number | null;
  } | null>(null);
  const [copyingAll, setCopyingAll] = useState(false);
  const [copyingPage, setCopyingPage] = useState<number | null>(null);
  const [pageInputValue, setPageInputValue] = useState<string>("");
  const [isInputError, setIsInputError] = useState(false);
  const [currentPageDisplay, setCurrentPageDisplay] = useState<string>("1");
  const [isDownloading, setIsDownloading] = useState(false);
  const visiblePageLabels =
    visiblePages.length > 0 ? visiblePages.map((p) => p + 1).join(", ") : "-";

  // クリップボードにコピーする関数
  const copyToClipboard = async (text: string, pageIndex?: number | null) => {
    try {
      await navigator.clipboard.writeText(text);

      if (pageIndex === null) {
        // すべてコピーの場合
        setCopyingAll(true);
        setTimeout(() => {
          setCopyingAll(false);
        }, 3000);
      } else if (pageIndex !== undefined) {
        // 個別ページコピーの場合
        setCopyingPage(pageIndex);
        setTimeout(() => {
          setCopyingPage(null);
        }, 3000);
      }
    } catch (err) {
      console.error("Copy failed:", err);
      setCopyMessage({ text: translations.copyFailed, pageIndex });
      setTimeout(() => {
        setCopyMessage(null);
      }, 3000);
    }
  };

  // すべてのページのマークダウンを結合してコピーする関数
  const copyAllMarkdown = () => {
    if (!ocrResult || "error" in ocrResult || !ocrResult.pages) return;

    const allMarkdown = ocrResult.pages
      .map((page) => {
        const pageTitle = `# ${formatTranslation(translations.pageIndicator, {
          current: page.index + 1,
          total: ocrResult.pages?.length ?? 0,
        })}\n\n`;
        return pageTitle + (page.markdown || translations.noTextOnPage);
      })
      .join("\n\n---\n\n");

    copyToClipboard(allMarkdown, null);
  };

  // ZIPファイルとしてダウンロードする関数
  const handleDownloadZip = async () => {
    if (!ocrResult || "error" in ocrResult || !ocrResult.pages) return;

    try {
      setIsDownloading(true);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
      await downloadAsZip(ocrResult, `ocr-export-${timestamp}`);
    } catch (error) {
      console.error("ZIP download failed:", error);
      setCopyMessage({ text: translations.downloadFailed, pageIndex: null });
      setTimeout(() => {
        setCopyMessage(null);
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  // マークダウンのみをダウンロードする関数
  const handleDownloadMarkdown = async () => {
    if (!ocrResult || "error" in ocrResult || !ocrResult.pages) return;

    try {
      setIsDownloading(true);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
      await downloadAsZip(ocrResult, `ocr-markdown-${timestamp}`, true);
    } catch (error) {
      console.error("Markdown download failed:", error);
      setCopyMessage({ text: translations.downloadFailed, pageIndex: null });
      setTimeout(() => {
        setCopyMessage(null);
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  // スクロール時に表示中のページを検出
  useEffect(() => {
    if (!ocrResult || "error" in ocrResult || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pageIndex = Number(entry.target.getAttribute("data-page-index"));
          if (entry.isIntersecting) {
            setVisiblePages((prev) =>
              prev.includes(pageIndex) ? prev : [...prev, pageIndex].sort((a, b) => a - b)
            );
          } else {
            setVisiblePages((prev) => prev.filter((idx) => idx !== pageIndex));
          }
        });
      },
      { root: containerRef.current, threshold: 0.1 }
    );

    // ページ要素を監視
    Object.entries(pageRefs.current).forEach(([, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [ocrResult]);

  // 表示中のページが変わったら現在のページ表示を更新
  useEffect(() => {
    if (visiblePages.length > 0) {
      setCurrentPageDisplay(String(visiblePages[0] + 1));
    }
  }, [visiblePages]);

  if (analyzing) {
    return (
      <div className="mt-4 p-5 bg-gray-50 text-gray-800 rounded-md flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-600 mx-auto mb-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-800 font-medium">{translations.analysisInProgress}</p>
          <p className="text-gray-600 text-sm mt-1">{translations.analysisInProgressDescription}</p>
        </div>
      </div>
    );
  }

  if (!ocrResult) return null;

  // エラーオブジェクトかどうかをチェック
  if ("error" in ocrResult) {
    return (
      <div className="p-5 bg-red-50 text-red-800 rounded-md border border-red-200">
        <h3 className="font-bold text-lg mb-2">{translations.analysisError}</h3>
        <p className="text-red-700">{ocrResult.error}</p>
        <div className="mt-3 text-sm">
          <p className="text-red-600">{translations.analysisErrorSuggestion}</p>
        </div>
      </div>
    );
  }

  // ページが存在しない場合
  if (!ocrResult.pages || ocrResult.pages.length === 0) {
    return (
      <div className="p-5 rounded-md bg-yellow-50 border border-yellow-200">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-yellow-700 font-medium">{translations.noPageData}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:rounded-lg md:overflow-hidden md:border md:border-gray-200 h-full flex flex-col">
      {/* ヘッダー部分 */}
      <div className="bg-white border-b p-3 sticky top-0 z-10 shadow-sm">
        {/* デスクトップレイアウト */}
        <div className="hidden md:flex justify-between items-center">
          {/* タイトル部分 */}
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold">{translations.ocrResultsTitle}</h2>
          </div>

          {/* ページ入力フィールド */}
          <div className="relative flex items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // フォーム送信時のロジックは残しておく（バックアップとして）
                const pageNum = parseInt(pageInputValue);
                if (pageNum >= 1 && pageNum <= ocrResult.pages.length) {
                  // ページ番号は1から始まるが、インデックスは0から始まるため調整
                  const pageIndex = pageNum - 1;
                  const pageElement = pageRefs.current[pageIndex];
                  if (pageElement && containerRef.current) {
                    const containerRect = containerRef.current.getBoundingClientRect();
                    const pageRect = pageElement.getBoundingClientRect();
                    const relativeTop =
                      pageRect.top - containerRect.top + containerRef.current.scrollTop;
                    containerRef.current.scrollTo({
                      top: relativeTop,
                      behavior: "smooth",
                    });
                    setIsInputError(false);
                  }
                } else {
                  setIsInputError(true);
                  setTimeout(() => setIsInputError(false), 2000);
                }
                setPageInputValue(""); // 入力をクリア
              }}
              className="flex items-center"
            >
              <input
                type="text"
                min="1"
                max={ocrResult.pages.length}
                value={pageInputValue || currentPageDisplay}
                onChange={(e) => setPageInputValue(e.target.value)}
                onClick={(e) => {
                  // クリック時に全選択する
                  e.currentTarget.select();
                }}
                onFocus={(e) => {
                  // フォーカス時に全選択する
                  e.currentTarget.select();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.currentTarget;
                    const oldBg = input.style.backgroundColor;
                    input.style.backgroundColor = "rgba(209, 250, 229, 0.8)"; // 一時的に背景色を変更（薄い緑色）
                    setTimeout(() => {
                      input.style.backgroundColor = oldBg;
                    }, 300);

                    // ページ移動のロジックを直接実行
                    const pageNum = parseInt(pageInputValue || currentPageDisplay);
                    if (pageNum >= 1 && pageNum <= ocrResult.pages.length) {
                      // ページ番号は1から始まるが、インデックスは0から始まるため調整
                      const pageIndex = pageNum - 1;
                      const pageElement = pageRefs.current[pageIndex];
                      if (pageElement && containerRef.current) {
                        const containerRect = containerRef.current.getBoundingClientRect();
                        const pageRect = pageElement.getBoundingClientRect();
                        const relativeTop =
                          pageRect.top - containerRect.top + containerRef.current.scrollTop;
                        containerRef.current.scrollTo({
                          top: relativeTop,
                          behavior: "smooth",
                        });
                        setIsInputError(false);
                      }
                    } else {
                      setIsInputError(true);
                      setTimeout(() => setIsInputError(false), 2000);
                    }
                    setPageInputValue(""); // 入力をクリア
                  }
                }}
                className={`w-16 text-center text-sm px-2 py-1.5 bg-gray-50 text-gray-600 rounded-l border ${
                  isInputError ? "border-red-300" : "border-gray-200"
                }`}
                aria-label={translations.enterPageNumber}
                title={translations.enterPageNumber}
              />
              <span className="bg-gray-50 border border-l-0 border-gray-200 px-2 py-1.5 text-sm text-gray-600 rounded-r">
                /{ocrResult.pages.length}
              </span>
            </form>
            {isInputError && (
              <div className="absolute -bottom-6 left-0 text-xs text-red-500 bg-white px-2 py-1 rounded shadow-sm border border-red-100">
                {translations.enterValidPageNumber}
              </div>
            )}
          </div>

          {/* ダウンロードとすべてコピーボタンを右側に配置 */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadZip}
              className={`text-sm px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center ${
                isDownloading ? "opacity-70 cursor-wait" : ""
              }`}
              disabled={isDownloading}
              title={translations.downloadZip}
            >
              {isDownloading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <div className="flex items-center">
                  <Download className="h-5 w-5 mr-1" />
                  <span>{translations.downloadZip}</span>
                </div>
              )}
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className={`text-sm px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center ${
                isDownloading ? "opacity-70 cursor-wait" : ""
              }`}
              disabled={isDownloading}
              title={translations.downloadMarkdown}
            >
              {isDownloading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <div className="flex items-center">
                  <Download className="h-5 w-5 mr-1" />
                  <span>{translations.downloadMarkdown}</span>
                </div>
              )}
            </button>
            <button
              onClick={copyAllMarkdown}
              className={`text-sm px-3 py-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center`}
              title={translations.copyAll}
            >
              {copyingAll ? (
                <Check className="h-5 w-5 mr-1 text-green-500" />
              ) : (
                <Copy className="h-5 w-5 mr-1" />
              )}
              {copyingAll ? translations.copied : translations.copyAll}
            </button>
            {copyMessage && copyMessage.pageIndex === null && (
              <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded animate-pulse">
                {copyMessage.text}
              </span>
            )}
          </div>
        </div>

        {/* モバイルレイアウト */}
        <div className="md:hidden space-y-3">
          {/* タイトルとページ入力 */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{translations.ocrResultsTitle}</h2>
            <div className="relative flex items-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const pageNum = parseInt(pageInputValue);
                  if (pageNum >= 1 && pageNum <= ocrResult.pages.length) {
                    const pageIndex = pageNum - 1;
                    const pageElement = pageRefs.current[pageIndex];
                    if (pageElement && containerRef.current) {
                      const containerRect = containerRef.current.getBoundingClientRect();
                      const pageRect = pageElement.getBoundingClientRect();
                      const relativeTop =
                        pageRect.top - containerRect.top + containerRef.current.scrollTop;
                      containerRef.current.scrollTo({
                        top: relativeTop,
                        behavior: "smooth",
                      });
                      setIsInputError(false);
                    }
                  } else {
                    setIsInputError(true);
                    setTimeout(() => setIsInputError(false), 2000);
                  }
                  setPageInputValue("");
                }}
                className="flex items-center"
              >
                <input
                  type="text"
                  min="1"
                  max={ocrResult.pages.length}
                  value={pageInputValue || currentPageDisplay}
                  onChange={(e) => setPageInputValue(e.target.value)}
                  onClick={(e) => e.currentTarget.select()}
                  onFocus={(e) => e.currentTarget.select()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const pageNum = parseInt(pageInputValue || currentPageDisplay);
                      if (pageNum >= 1 && pageNum <= ocrResult.pages.length) {
                        const pageIndex = pageNum - 1;
                        const pageElement = pageRefs.current[pageIndex];
                        if (pageElement && containerRef.current) {
                          const containerRect = containerRef.current.getBoundingClientRect();
                          const pageRect = pageElement.getBoundingClientRect();
                          const relativeTop =
                            pageRect.top - containerRect.top + containerRef.current.scrollTop;
                          containerRef.current.scrollTo({
                            top: relativeTop,
                            behavior: "smooth",
                          });
                          setIsInputError(false);
                        }
                      } else {
                        setIsInputError(true);
                        setTimeout(() => setIsInputError(false), 2000);
                      }
                      setPageInputValue("");
                    }
                  }}
                  className={`w-12 text-center text-xs px-1 py-1 bg-gray-50 text-gray-600 rounded-l border ${
                    isInputError ? "border-red-300" : "border-gray-200"
                  }`}
                  aria-label={translations.enterPageNumber}
                  title={translations.enterPageNumber}
                />
                <span className="bg-gray-50 border border-l-0 border-gray-200 px-1 py-1 text-xs text-gray-600 rounded-r">
                  /{ocrResult.pages.length}
                </span>
              </form>
              {isInputError && (
                <div className="absolute -bottom-6 left-0 text-xs text-red-500 bg-white px-2 py-1 rounded shadow-sm border border-red-100">
                  {translations.enterValidPageNumber}
                </div>
              )}
            </div>
          </div>

          {/* ボタン群 */}
          <div className="flex flex-row gap-2">
            <button
              onClick={handleDownloadZip}
              className={`text-xs px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center justify-center w-full ${
                isDownloading ? "opacity-70 cursor-wait" : ""
              }`}
              disabled={isDownloading}
              title={translations.downloadZip}
            >
              {isDownloading ? (
                <svg
                  className="animate-spin h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              <span className="text-center leading-tight">{translations.downloadZip}</span>
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className={`text-xs px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center justify-center w-full ${
                isDownloading ? "opacity-70 cursor-wait" : ""
              }`}
              disabled={isDownloading}
              title={translations.downloadMarkdown}
            >
              {isDownloading ? (
                <svg
                  className="animate-spin h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              <span className="text-center leading-tight">{translations.downloadMarkdown}</span>
            </button>
            <button
              onClick={copyAllMarkdown}
              className={`text-xs px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center justify-center w-full`}
              title={translations.copyAll}
            >
              {copyingAll ? (
                <Check className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              <span className="text-center leading-tight">
                {copyingAll ? translations.copied : translations.copyAll}
              </span>
            </button>
          </div>
          {copyMessage && copyMessage.pageIndex === null && (
            <div className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded animate-pulse text-center">
              {copyMessage.text}
            </div>
          )}
        </div>
      </div>

      {/* プログレスバー（小画面向け） */}
      <div className="md:hidden bg-gray-100 h-1 w-full">
        {ocrResult.pages.map((_, idx) => (
          <div
            key={`progress-${idx}`}
            className={`h-full transition-colors ${
              visiblePages.includes(idx) ? "bg-gray-500" : "bg-gray-200"
            }`}
            style={{
              width: `${100 / ocrResult.pages.length}%`,
              display: "inline-block",
            }}
          />
        ))}
      </div>

      {/* コンテンツ部分 - すべてのページをスクロール表示 */}
      <div ref={containerRef} className="flex-1 overflow-y-auto bg-gray-50 scroll-smooth">
        {ocrResult.pages.map((page: OCRPageObject, index: number) => (
          <div
            key={`page-${index}`}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            data-page-index={index}
            className={`bg-white m-3 p-4 rounded-lg shadow-sm border border-gray-100 transition-all ${
              visiblePages.includes(index) ? "ring-2 ring-gray-200" : ""
            }`}
          >
            {/* ページヘッダー */}
            <div className="pb-2 mb-3 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                  {page.index + 1}
                </span>
                <h3 className="text-sm font-medium text-gray-700">
                  {formatTranslation(translations.pageIndicator, {
                    current: page.index + 1,
                    total: ocrResult.pages.length,
                  })}
                </h3>
              </div>
              <div className="flex items-center">
                {copyMessage && copyMessage.pageIndex === page.index && (
                  <span className="mr-2 text-xs bg-green-50 text-green-600 px-2 py-1 rounded animate-pulse">
                    {copyMessage.text}
                  </span>
                )}
                <button
                  onClick={() => page.markdown && copyToClipboard(page.markdown, page.index)}
                  className={`text-sm px-2 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center`}
                  title={translations.copy}
                  disabled={!page.markdown}
                >
                  {copyingPage === page.index ? (
                    <Check className="h-5 w-5 mr-1 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 mr-1" />
                  )}
                  {copyingPage === page.index ? translations.copied : translations.copy}
                </button>
              </div>
            </div>

            {/* マークダウンコンテンツ */}
            {page.markdown ? (
              <div className="prose prose-sm prose-gray max-w-none bg-white rounded-md">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ children }) => <p className="my-2 whitespace-pre-line">{children}</p>,
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mt-4 mb-2 pb-1 border-b">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mt-3 mb-2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-bold mt-3 mb-1">{children}</h3>
                    ),
                    ul: ({ children }) => <ul className="my-2 pl-6 list-disc">{children}</ul>,
                    ol: ({ children }) => <ol className="my-2 pl-6 list-decimal">{children}</ol>,
                    li: ({ children }) => <li className="my-1">{children}</li>,
                    br: () => <br />,
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-4">
                        <table className="min-w-full divide-y divide-gray-200 border">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>
                    ),
                    tbody: ({ children }) => (
                      <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
                    ),
                    tr: ({ children }) => <tr className="hover:bg-gray-50">{children}</tr>,
                    th: ({ children }) => (
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r last:border-r-0">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-3 py-2 text-sm text-gray-600 border-r last:border-r-0 whitespace-pre-wrap">
                        {children}
                      </td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-200 pl-4 py-1 my-2 text-gray-600 italic">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      return (
                        <div
                          className={`my-2 overflow-auto rounded-md ${
                            match ? "bg-gray-800" : "bg-gray-100"
                          }`}
                        >
                          <pre
                            className={`${
                              match ? "text-gray-200 p-4" : "text-gray-800 p-3"
                            } text-sm overflow-auto`}
                          >
                            <code className={className}>{children}</code>
                          </pre>
                        </div>
                      );
                    },
                    img: ({ src, alt }) => {
                      // マークダウン内の画像参照とページの画像データを照合
                      const srcString = typeof src === "string" ? src : "";
                      const fileName = srcString?.split("/").pop() || "";
                      // 現在のページから一致する画像IDを持つ画像を探す
                      const matchedImage = page.images?.find((img) => img.id === fileName);

                      if (matchedImage?.imageBase64) {
                        // base64データの形式を取得
                        const base64Src = getImageFormat(matchedImage.imageBase64);
                        return (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={base64Src}
                            alt={alt || ""}
                            className="max-w-full h-auto rounded shadow-sm my-3 mx-auto block"
                          />
                        );
                      }

                      // 画像が見つからない場合は元のsrcを使用
                      return (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={srcString}
                          alt={alt || ""}
                          className="max-w-full h-auto rounded shadow-sm my-3 mx-auto block"
                        />
                      );
                    },
                  }}
                >
                  {page.markdown}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p>{translations.noTextOnPage}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* フッターナビゲーション */}
      <div className="bg-white border-t p-2 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {formatTranslation(translations.showingPageStatus, {
            pages: visiblePageLabels,
            total: ocrResult.pages.length,
          })}
        </div>

        <div className="flex gap-2">
          <button
            className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {translations.goToTop}
          </button>

          <button
            className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            onClick={() =>
              containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            {translations.goToBottom}
          </button>
        </div>
      </div>
    </div>
  );
}

// base64データの先頭バイトを確認して画像形式を自動判別
const getImageFormat = (base64String: string) => {
  try {
    // base64データが先頭に「data:image/...;base64,」形式を含む場合は処理
    if (base64String.startsWith("data:image/")) {
      return base64String;
    }

    // 先頭バイトからMIMEタイプを判定
    const byte = atob(base64String.substring(0, 4));

    // 一般的な画像形式のシグネチャ
    if (byte.startsWith("\xFF\xD8\xFF")) return `data:image/jpeg;base64,${base64String}`;
    if (byte.startsWith("\x89PNG")) return `data:image/png;base64,${base64String}`;
    if (byte.startsWith("GIF8")) return `data:image/gif;base64,${base64String}`;
    if (byte.startsWith("RIFF")) return `data:image/webp;base64,${base64String}`;

    // 判別できない場合はpngとして扱う
    return `data:image/png;base64,${base64String}`;
  } catch (e) {
    console.error("Failed to get image format:", e);
    // エラーが発生した場合はpngとして扱う
    return `data:image/png;base64,${base64String}`;
  }
};
