import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "~/server/uploadthing";

/**
 * React helpers for UploadThing
 * Usage:
 * 
 * const { startUpload, isUploading } = useUploadThing("documentUploader", {
 *   onClientUploadComplete: (files) => {
 *     // Handle upload complete
 *   },
 * });
 */
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
