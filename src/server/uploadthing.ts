import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "~/server/auth";

const f = createUploadthing();

/**
 * UploadThing File Router
 * Defines file upload endpoints and their configurations
 */
export const ourFileRouter = {
  /**
   * Document uploader for study materials
   * Supports: PDF, TXT, DOC, DOCX
   * Max size: 32MB for PDFs, 16MB for docs, 4MB for text
   */
  documentUploader: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 10 },
    "text/plain": { maxFileSize: "4MB", maxFileCount: 10 },
    "application/msword": { maxFileSize: "16MB", maxFileCount: 10 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "16MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      // Verify user is authenticated
      const session = await auth();
      
      if (!session?.user) {
        throw new UploadThingError("Unauthorized - Please sign in to upload files");
      }

      // Return metadata that will be available in onUploadComplete
      return {
        userId: session.user.id,
        userName: session.user.name || "Anonymous",
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This runs after upload is complete
      console.log("✅ Upload complete for user:", metadata.userId);
      console.log("📄 File name:", file.name);
      console.log("🔗 File URL:", file.url);
      console.log("🔑 File key:", file.key);
      console.log("📏 File size:", file.size, "bytes");

      // Return data that will be sent to client
      return {
        url: file.url,
        key: file.key,
        name: file.name,
        size: file.size,
        uploadedBy: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
