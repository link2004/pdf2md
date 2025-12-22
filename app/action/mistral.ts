"use server";

import { Mistral } from "@mistralai/mistralai";
import { OCRResponse } from "@mistralai/mistralai/src/models/components/ocrresponse.js";
import { uploadFileToS3, getS3SignedUrl, deleteFileFromS3 } from "./s3";

/**
 * Get Mistral client instance
 */
function getMistralClient(): Mistral {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    throw new Error("MISTRAL_API_KEY is not set in environment variables");
  }
  return new Mistral({ apiKey });
}

/**
 * Process PDF with Mistral OCR (uploads to S3, processes, then deletes)
 * @param fileData Base64 encoded PDF data
 * @param fileName File name
 * @param includeImageBase64 Whether to include Base64 encoded image data
 * @returns OCR processing result
 */
export async function processPdfWithMistral(
  fileData: string,
  fileName: string,
  includeImageBase64: boolean = true
): Promise<{ result: OCRResponse | null; error: Error | null }> {
  let s3Key: string | null = null;

  try {
    // 1. Upload file to S3
    const uploadResult = await uploadFileToS3(fileData, fileName, "application/pdf");
    if (uploadResult.error) {
      throw uploadResult.error;
    }
    s3Key = uploadResult.key;

    // 2. Get signed URL from S3
    const signedUrlResult = await getS3SignedUrl(s3Key);
    if (signedUrlResult.error) {
      throw signedUrlResult.error;
    }

    // 3. Process OCR with Mistral
    const client = getMistralClient();
    const ocrResponse = await client.ocr.process({
      model: "mistral-ocr-latest",
      document: {
        type: "document_url",
        documentUrl: signedUrlResult.url,
      },
      includeImageBase64,
    });

    return { result: ocrResponse, error: null };
  } catch (error) {
    console.error("Error occurred during PDF OCR processing:", error);
    return {
      result: null,
      error: error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  } finally {
    // 4. Clean up: Delete file from S3
    if (s3Key) {
      try {
        await deleteFileFromS3(s3Key);
      } catch (deleteError) {
        console.error("Failed to delete file from S3:", deleteError);
      }
    }
  }
}

/**
 * Process image with Mistral OCR using Base64 Data URL (no storage needed)
 * @param imageData Base64 encoded image data
 * @param mimeType Image MIME type (e.g., 'image/png', 'image/jpeg')
 * @param includeImageBase64 Whether to include Base64 encoded image data
 * @returns OCR processing result
 */
export async function processImageWithMistral(
  imageData: string,
  mimeType: string,
  includeImageBase64: boolean = true
): Promise<{ result: OCRResponse | null; error: Error | null }> {
  try {
    const client = getMistralClient();
    const dataUrl = `data:${mimeType};base64,${imageData}`;

    const ocrResponse = await client.ocr.process({
      model: "mistral-ocr-latest",
      document: {
        type: "image_url",
        imageUrl: dataUrl,
      },
      includeImageBase64,
    });

    return { result: ocrResponse, error: null };
  } catch (error) {
    console.error("Error occurred during image OCR processing:", error);
    return {
      result: null,
      error: error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}
