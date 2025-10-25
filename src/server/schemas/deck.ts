import { z } from "zod";

// Create deck
export const createDeckSchema = z.object({
  name: z.string().min(1, "Deck name is required").max(100, "Deck name too long"),
});

// Update deck
export const updateDeckSchema = z.object({
  id: z.string().cuid("Invalid deck ID"),
  name: z.string().min(1, "Deck name is required").max(100, "Deck name too long"),
});

// Get deck by ID
export const getDeckByIdSchema = z.object({
  id: z.string().cuid("Invalid deck ID"),
});

// Delete deck
export const deleteDeckSchema = z.object({
  id: z.string().cuid("Invalid deck ID"),
});

// Add document to deck (with file metadata from UploadThing)
export const addDocumentSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
  name: z.string().min(1, "Document name is required").max(255, "Document name too long"),
  fileUrl: z.string().url("Invalid file URL"),
  fileKey: z.string().min(1, "File key is required"),
  fileType: z.enum(["pdf", "txt", "doc", "docx"], {
    errorMap: () => ({ message: "Unsupported file type. Please upload PDF, TXT, DOC, or DOCX files." }),
  }),
  fileSize: z.number().int().positive("File size must be positive"),
});

// Update document (only name can be changed - files are immutable)
export const updateDocumentSchema = z.object({
  id: z.string().cuid("Invalid document ID"),
  name: z.string().min(1, "Document name is required").max(255, "Document name too long"),
});

// Get document by ID
export const getDocumentByIdSchema = z.object({
  id: z.string().cuid("Invalid document ID"),
});

// Delete document
export const deleteDocumentSchema = z.object({
  id: z.string().cuid("Invalid document ID"),
});

// Get documents by deck ID
export const getDocumentsByDeckIdSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
});

// Generate study session
export const generateStudySessionSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
});

// Update RSVP speed
export const updateRsvpSpeedSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
  rsvpSpeedWPM: z.number().min(100, "Speed too slow").max(1000, "Speed too fast"),
});

// Get study session by deck ID
export const getStudySessionByDeckIdSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
});
