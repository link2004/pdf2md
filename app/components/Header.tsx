"use client";

import React, { useState, useRef, useEffect } from "react";
import type { Translations } from "../lib/i18n";
import { Copy, Check, Download } from "lucide-react";
import type { OCRResponse } from "@mistralai/mistralai/src/models/components/ocrresponse.js";

type HeaderProps = {
  currentStep?: "upload" | "analyze" | "result";
  isInitialUpload?: boolean;
  onReset?: () => void;
  translations: Translations;
  activeTab?: "preview" | "result" | "text";
  onTabChange?: (tab: "preview" | "result" | "text") => void;
  ocrResult?: OCRResponse | { success: false; error: string } | null;
  onCopyAll?: () => void;
  onDownloadZip?: () => void;
  onDownloadMarkdown?: () => void;
  isDownloading?: boolean;
  copyingAll?: boolean;
};
export default function Header({
  isInitialUpload = false,
  onReset,
  translations,
  activeTab,
  onTabChange,
  ocrResult,
  onCopyAll,
  onDownloadZip,
  onDownloadMarkdown,
  isDownloading = false,
  copyingAll = false,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ドロップダウンの外側をクリックしたときに閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const hasOcrResult = ocrResult && !("error" in ocrResult) && ocrResult.pages && ocrResult.pages.length > 0;
  return (
    <header
      className={`
        flex select-none border-b border-gray-200 bg-white
        ${isInitialUpload ? "justify-center" : "justify-between items-center"}
        h-10 px-3
      `}
    >
      {!isInitialUpload && (
        <div className="flex items-center">
          {onReset && (
            <button
              onClick={onReset}
              className="p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors flex items-center"
              aria-label={translations.backButton}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Mobile Tabs */}
      {!isInitialUpload && activeTab && onTabChange && (
        <div className="flex md:hidden items-center gap-2 mx-2 flex-1">
          <div className="flex bg-gray-100 rounded-lg p-0.5 flex-1">
            <button
              onClick={() => onTabChange("preview")}
              className={`
                flex-1 py-1 text-xs font-medium rounded-md transition-all
                ${activeTab === "preview" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"}
              `}
            >
              PDF
            </button>
            <button
              onClick={() => onTabChange("result")}
              className={`
                flex-1 py-1 text-xs font-medium rounded-md transition-all
                ${activeTab === "result" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"}
              `}
            >
              Markdown
            </button>
            <button
              onClick={() => onTabChange("text")}
              className={`
                flex-1 py-1 text-xs font-medium rounded-md transition-all
                ${activeTab === "text" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"}
              `}
            >
              Text
            </button>
          </div>
          {hasOcrResult && (
            <>
              {/* ドロップダウンメニュー */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`text-xs px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors flex items-center ${
                    isDownloading ? "opacity-70 cursor-wait" : ""
                  }`}
                  disabled={isDownloading}
                  title="エクスポート"
                >
                  {isDownloading ? (
                    <svg
                      className="animate-spin h-4 w-4"
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
                    <Download className="h-4 w-4" />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onDownloadZip?.();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        disabled={isDownloading}
                        title={translations.downloadZip}
                      >
                        <Download className="h-4 w-4" />
                        <span>{translations.downloadZip}</span>
                      </button>
                      <button
                        onClick={() => {
                          onDownloadMarkdown?.();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        disabled={isDownloading}
                        title={translations.downloadMarkdown}
                      >
                        <Download className="h-4 w-4" />
                        <span>{translations.downloadMarkdown}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* コピーボタン */}
              <button
                onClick={onCopyAll}
                className={`text-xs px-2 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors flex items-center ${copyingAll ? 'justify-center w-auto sm:min-w-[60px]' : 'w-auto sm:min-w-[100px]'}`}
                title={translations.copyAll}
              >
                {copyingAll ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <>
                    <Copy className="h-4 w-4 sm:mr-1" />
                    <span className="text-xs whitespace-nowrap hidden sm:inline">{translations.copyAll}</span>
                  </>
                )}
                {copyingAll && (
                  <span className="text-xs whitespace-nowrap ml-1 hidden sm:inline">{translations.copied}</span>
                )}
              </button>
            </>
          )}
        </div>
      )}

      {isInitialUpload && (
        <h1 className="text-xl font-bold text-gray-800 leading-10">
          {translations.title}
        </h1>
      )}

      {!isInitialUpload && (
        <div className="flex items-center gap-2">
          {hasOcrResult && (
            <>
              {/* デスクトップ: ドロップダウンメニュー */}
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`text-sm px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors flex items-center ${
                    isDownloading ? "opacity-70 cursor-wait" : ""
                  }`}
                  disabled={isDownloading}
                  title="エクスポート"
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
                    <Download className="h-5 w-5" />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onDownloadZip?.();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        disabled={isDownloading}
                        title={translations.downloadZip}
                      >
                        <Download className="h-5 w-5" />
                        <span>{translations.downloadZip}</span>
                      </button>
                      <button
                        onClick={() => {
                          onDownloadMarkdown?.();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        disabled={isDownloading}
                        title={translations.downloadMarkdown}
                      >
                        <Download className="h-5 w-5" />
                        <span>{translations.downloadMarkdown}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* デスクトップ: コピーボタン */}
              <button
                onClick={onCopyAll}
                className={`hidden md:flex text-sm px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors items-center ${copyingAll ? 'justify-center w-auto lg:min-w-[120px]' : 'w-auto lg:min-w-[120px]'}`}
                title={translations.copyAll}
              >
                {copyingAll ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="whitespace-nowrap ml-1 hidden lg:inline">{translations.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 lg:mr-1" />
                    <span className="whitespace-nowrap hidden lg:inline">{translations.copyAll}</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
