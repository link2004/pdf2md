"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

/**
 * Get S3 client instance
 */
function getS3Client(): S3Client {
  const region = process.env.AWS_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS credentials are not set in environment variables (AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)"
    );
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Get S3 bucket name from environment
 */
function getBucketName(): string {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME is not set in environment variables");
  }
  return bucketName;
}

/**
 * Upload a file to S3
 * @param fileData Base64 encoded file data
 * @param fileName Original file name
 * @param contentType MIME type of the file
 * @returns Upload result with S3 key
 */
export async function uploadFileToS3(
  fileData: string,
  fileName: string,
  contentType: string = "application/pdf"
): Promise<{ key: string; error: Error | null }> {
  try {
    const client = getS3Client();
    const bucketName = getBucketName();

    // Generate unique key
    const key = `temp-ocr/${uuidv4()}_${fileName}`;

    // Convert base64 to Buffer
    const buffer = Buffer.from(fileData, "base64");

    // Upload to S3
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    return { key, error: null };
  } catch (error) {
    console.error("S3 upload error:", error);
    return {
      key: "",
      error: error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

/**
 * Get a signed URL for a file in S3
 * @param key S3 object key
 * @param expiresIn Expiry time in seconds (default: 3600 = 1 hour)
 * @returns Signed URL
 */
export async function getS3SignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<{ url: string; error: Error | null }> {
  try {
    const client = getS3Client();
    const bucketName = getBucketName();

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const url = await getSignedUrl(client, command, { expiresIn });

    return { url, error: null };
  } catch (error) {
    console.error("S3 get signed URL error:", error);
    return {
      url: "",
      error: error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}

/**
 * Delete a file from S3
 * @param key S3 object key
 * @returns Delete result
 */
export async function deleteFileFromS3(
  key: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const client = getS3Client();
    const bucketName = getBucketName();

    await client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );

    return { success: true, error: null };
  } catch (error) {
    console.error("S3 delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}


