"use client";

import { OCRResponse } from "@mistralai/mistralai/src/models/components/ocrresponse.js";
import { OCRPageObject } from "@mistralai/mistralai/src/models/components/ocrpageobject.js";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import type { Translations } from "../lib/i18n";

type OcrResultViewProps = {
  ocrResult: OCRResponse | { success: false; error: string } | null;
  analyzing: boolean;
  translations: Translations;
};

export default function OcrResultView({ ocrResult, analyzing, translations }: OcrResultViewProps) {
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [copyingPage, setCopyingPage] = useState<number | null>(null);

  // クリップボードにコピーする関数
  const copyToClipboard = async (text: string, pageIndex?: number | null) => {
    try {
      await navigator.clipboard.writeText(text);

      if (pageIndex !== undefined && pageIndex !== null) {
        // 個別ページコピーの場合
        setCopyingPage(pageIndex);
        setTimeout(() => {
          setCopyingPage(null);
        }, 3000);
      }
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

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


      {/* コンテンツ部分 - すべてのページをスクロール表示 */}
      <div ref={containerRef} className="flex-1 overflow-y-auto bg-white scroll-smooth p-1">
        {ocrResult.pages.map((page: OCRPageObject, index: number) => (
          <div
            key={`page-${index}`}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            data-page-index={index}
            className="m-1"
          >
            {/* カード */}
            <div className="bg-muted rounded-lg p-1">
              {/* マークダウンコンテンツ */}
              {page.markdown ? (
                <div className="prose prose-sm prose-gray max-w-none text-xs p-1">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ children }) => <p className="my-2 whitespace-pre-line text-xs">{children}</p>,
                    h1: ({ children }) => (
                      <h1 className="text-base font-bold mt-4 mb-2 pb-1 border-b">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-sm font-bold mt-3 mb-2">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xs font-bold mt-3 mb-1">{children}</h3>
                    ),
                    ul: ({ children }) => <ul className="my-2 pl-6 list-disc text-xs">{children}</ul>,
                    ol: ({ children }) => <ol className="my-2 pl-6 list-decimal text-xs">{children}</ol>,
                    li: ({ children }) => <li className="my-1 text-xs">{children}</li>,
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
                      <th className="px-1 py-0.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r last:border-r-0">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-1 py-0.5 text-xs text-gray-600 border-r last:border-r-0 whitespace-pre-wrap">
                        {children}
                      </td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-200 pl-4 py-1 my-2 text-gray-600 italic text-xs">
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
                            } text-xs overflow-auto`}
                          >
                            <code className={className}>{children}</code>
                          </pre>
                        </div>
                      );
                    },
                    hr: () => (
                      <hr className="border-gray-200 my-4" />
                    ),
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
            {/* ページ番号表示とコピーボタン */}
            <div className="flex justify-between items-center px-1 py-1 border-t border-gray-200">
              <div className="flex-1"></div>
              <span className="text-xs text-gray-500">
                {page.index + 1}/{ocrResult.pages.length}
              </span>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => page.markdown && copyToClipboard(page.markdown, page.index)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  title={translations.copy}
                  disabled={!page.markdown}
                >
                  {copyingPage === page.index ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            </div>
            {/* 区切り線 */}
            <hr className="border-black my-2" />
          </div>
        ))}
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
