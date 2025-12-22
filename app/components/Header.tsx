"use client";

import React from "react";
import type { Translations } from "../lib/i18n";

type HeaderProps = {
  currentStep?: "upload" | "analyze" | "result";
  isInitialUpload?: boolean;
  onReset?: () => void;
  translations: Translations;
  activeTab?: "preview" | "result";
  onTabChange?: (tab: "preview" | "result") => void;
};
export default function Header({
  isInitialUpload = false,
  onReset,
  translations,
  activeTab,
  onTabChange,
}: HeaderProps) {
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
              className="mr-2 p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors flex items-center"
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
          <h1 className="text-sm font-semibold text-gray-800 truncate max-w-[150px] md:max-w-none">
            {translations.title}
          </h1>
        </div>
      )}

      {/* Mobile Tabs */}
      {!isInitialUpload && activeTab && onTabChange && (
        <div className="flex md:hidden bg-gray-100 rounded-lg p-0.5 mx-2">
          <button
            onClick={() => onTabChange("preview")}
            className={`
              px-3 py-1 text-xs font-medium rounded-md transition-all
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
              px-3 py-1 text-xs font-medium rounded-md transition-all
              ${activeTab === "result" 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-500 hover:text-gray-700"}
            `}
          >
            Markdown
          </button>
        </div>
      )}

      {isInitialUpload && (
        <h1 className="text-xl font-bold text-gray-800 align-middle">
          {translations.title}
        </h1>
      )}

      {!isInitialUpload && <div className="w-8" />}
    </header>
  );
}
