import { z } from "zod";

// Create flashcard
export const createFlashcardSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
  frontText: z.string().min(1, "Front text is required").max(500, "Front text too long"),
  backText: z.string().min(1, "Back text is required").max(1000, "Back text too long"),
});

// Update flashcard
export const updateFlashcardSchema = z.object({
  id: z.string().cuid("Invalid flashcard ID"),
  frontText: z.string().min(1).max(500).optional(),
  backText: z.string().min(1).max(1000).optional(),
});

// Get flashcards by deck ID
export const getFlashcardsByDeckIdSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
});

// Get flashcard by ID
export const getFlashcardByIdSchema = z.object({
  id: z.string().cuid("Invalid flashcard ID"),
});

// Delete flashcard
export const deleteFlashcardSchema = z.object({
  id: z.string().cuid("Invalid flashcard ID"),
});
