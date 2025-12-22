"use client";

import { useState, useRef, useEffect } from "react";
import { processPdfWithMistral, processImageWithMistral } from "./action/mistral";
import { OCRResponse } from "@mistralai/mistralai/src/models/components/ocrresponse.js";
import OcrResultView from "./components/OcrResultView";
import UploadResult from "./components/UploadResult";
import Header from "./components/Header";
import { useDropzone } from "react-dropzone";
import Footer from "./components/Footer";
import { useSearchParams } from "next/navigation";
import { getTranslations, getLanguageFromSearchParams } from "./lib/i18n";

export default function FileUploader() {
  const searchParams = useSearchParams();
  const lang = getLanguageFromSearchParams(searchParams);
  const t = getTranslations(lang);

  const [file, setFile] = useState<File | null>(null);
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    url?: string;
    fileType?: "pdf" | "image";
    errorMessage?: string;
  } | null>(null);
  const [ocrResult, setOcrResult] = useState<
    OCRResponse | { success: false; error: string } | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState<"upload" | "analyze" | "result">("upload");
  const [activeTab, setActiveTab] = useState<"preview" | "result">("preview");

  // Supported file types
  const acceptedFileTypes = {
    "application/pdf": [".pdf"],
  };

  // Check if file type is valid
  const isValidFileType = (file: File): boolean => {
    return file.type === "application/pdf";
  };

  // Check if file size is valid (under 20MB)
  const isValidFileSize = (file: File): boolean => {
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes
    return file.size <= MAX_FILE_SIZE;
  };

  // Get file type
  const getFileType = (file: File): "pdf" | null => {
    if (file.type === "application/pdf") return "pdf";
    return null;
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      if (!isValidFileType(newFile)) {
        alert(t.onlyPdfFiles);
        return;
      }

      if (!isValidFileSize(newFile)) {
        alert(t.fileSizeExceeded);
        return;
      }

      setFile(newFile);
      setUploadResult(null);
      setOcrResult(null);
      handleProcess(newFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: 1,
    noClick: false,
    noKeyboard: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!isValidFileType(selectedFile)) {
        alert(t.onlyPdfFiles);
        return;
      }

      if (!isValidFileSize(selectedFile)) {
        alert(t.fileSizeExceeded);
        return;
      }

      setFile(selectedFile);
      setUploadResult(null);
      setOcrResult(null);
      handleProcess(selectedFile);
    }
  };

  // Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProcess = async (selectedFile?: File) => {
    const fileToProcess = selectedFile || file;
    if (!fileToProcess) return;

    setProcessing(true);
    setUploadResult(null);
    setOcrResult(null);
    setCurrentStep("analyze");
    // 分析開始時からmarkdownタブを表示
    setActiveTab("result");

    // Create local URL for preview
    const objectUrl = URL.createObjectURL(fileToProcess);
    setLocalFileUrl(objectUrl);

    try {
      const fileType = getFileType(fileToProcess);
      if (!fileType) {
        throw new Error("Unsupported file format");
      }

      // Set upload result for preview
      setUploadResult({
        success: true,
        url: objectUrl,
        fileType: fileType,
      });

      // Convert file to base64
      const base64Data = await fileToBase64(fileToProcess);

      let response;

      if (fileType === "pdf") {
        // PDF: Upload to S3, process OCR, then delete
        response = await processPdfWithMistral(base64Data, fileToProcess.name, true);
      } else {
        // Image: Process directly with Base64 Data URL (no storage needed)
        response = await processImageWithMistral(base64Data, fileToProcess.type, true);
      }

      if (response.error) {
        throw response.error;
      }

      if (response.result) {
        console.log(`${fileType === "pdf" ? t.pdf : t.image} analysis result:`, response.result);
        setOcrResult(response.result);
        setCurrentStep("result");
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Processing error:", error);
      setUploadResult({
        success: false,
        errorMessage: error instanceof Error ? error.message : undefined,
      });
      setOcrResult({
        success: false,
        error:
          error instanceof Error
            ? `${t.analysisError}: ${error.message}`
            : t.analysisError,
      });
    } finally {
      setProcessing(false);
    }
  };

  // OCR結果が設定されたらmarkdownタブに切り替え
  useEffect(() => {
    if (ocrResult && !processing) {
      setActiveTab("result");
    }
  }, [ocrResult, processing]);

  const handleReset = () => {
    // Clean up object URL to prevent memory leaks
    if (localFileUrl) {
      URL.revokeObjectURL(localFileUrl);
    }
    setFile(null);
    setLocalFileUrl(null);
    setUploadResult(null);
    setOcrResult(null);
    setCurrentStep("upload");
    setActiveTab("preview");
  };

  // Initial upload state
  if (currentStep === "upload" && !file) {
    return (
      <div className="flex flex-col w-full h-screen">
        <Header isInitialUpload={true} translations={t} />

        <div
          {...getRootProps()}
          className={`flex-1 flex flex-col items-center justify-center p-8 mt-[10px] mr-[10px] ml-[10px] mb-[10px] border-2 border-dashed rounded-xl transition-all duration-200 ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50"
          } cursor-pointer`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input {...getInputProps()} ref={fileInputRef} onChange={handleFileChange} />
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {isDragActive ? t.dropHereText : t.dragDropText}
            </h2>

            <p className="text-gray-500 max-w-md mx-auto">
              {t.dragDropSubtext}
              <span className="block text-xs mt-1">{t.dragDropNote}</span>
            </p>

            <button
              type="button"
              className="mt-2 inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              {t.selectFileButton}
            </button>
          </div>
        </div>
        <Footer translations={t} />
      </div>
    );
  }

  // Upload, analysis, or result display state
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      <Header 
        currentStep={currentStep} 
        onReset={handleReset} 
        translations={t} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main content: 2-column layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left side: File preview */}
        <div className={`w-full md:w-1/2 p-0 md:p-2 overflow-auto bg-gray-100 border-r border-gray-200 ${
          activeTab === 'preview' ? 'block h-full' : 'hidden md:block'
        }`}>
          {uploadResult?.url ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-2 py-1 bg-white border-b border-gray-200">
                <h2 className="text-xs font-semibold text-gray-700 truncate">
                  {file?.name || t.uploadedFile}
                </h2>
                {file && (
                  <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                )}
              </div>
              <div className="flex-1 relative bg-gray-200 overflow-hidden">
                {uploadResult.fileType === "pdf" ? (
                  <iframe
                    src={uploadResult.url}
                    className="w-full h-full border-0"
                    title={t.pdf}
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={uploadResult.url}
                      alt={t.image}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              {processing && !uploadResult?.url ? (
                <div className="text-center">
                  <svg
                    className="animate-spin h-8 w-8 text-orange-500 mx-auto mb-2"
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
                  <p className="text-sm font-medium">{t.uploading}</p>
                </div>
              ) : (
                <p className="text-sm">{t.noFile}</p>
              )}
            </div>
          )}
        </div>

        {/* Right side: OCR results */}
        <div className={`w-full md:w-1/2 p-0 md:p-2 overflow-auto bg-white md:bg-gray-50 ${
          activeTab === 'result' ? 'block h-full' : 'hidden md:block'
        }`}>
          {processing ? (
            <div className="h-full flex flex-col items-center justify-center">
              <svg
                className="animate-spin h-10 w-10 text-orange-500 mb-4"
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
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{t.converting}</h3>
              <p className="text-gray-500 text-sm text-center max-w-xs">{t.convertingSubtext}</p>
            </div>
          ) : ocrResult ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-auto">
                <OcrResultView
                  ocrResult={ocrResult}
                  analyzing={false}
                  translations={t}
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p className="text-sm">{t.noConversionResult}</p>
            </div>
          )}
        </div>
      </div>


      {/* Upload result (displayed only for errors) */}
      {uploadResult && !uploadResult.success && (
        <div className="fixed bottom-4 right-4 max-w-md">
          <UploadResult
            uploadResult={uploadResult}
            analyzing={processing}
            onAnalyze={() => {}}
            translations={t}
          />
        </div>
      )}
      <Footer translations={t} />
    </div>
  );
}
