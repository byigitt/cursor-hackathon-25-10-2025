import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  generateFlashcardsSchema,
  createFlashcardSchema,
  updateFlashcardSchema,
  getFlashcardsByDeckIdSchema,
  getFlashcardByIdSchema,
  deleteFlashcardSchema,
} from "~/server/schemas/flashcard";
import { generateFlashcards } from "~/server/lib/gemini";

export const flashcardRouter = createTRPCRouter({
  // CREATE: Generate AI-powered flashcards for a deck
  generate: protectedProcedure
    .input(generateFlashcardsSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify deck ownership and fetch documents
      const deck = await ctx.db.deck.findUnique({
        where: {
          id: input.deckId,
        },
        include: {
          documents: {
            select: {
              name: true,
              fileUrl: true,
            },
          },
        },
      });

      if (!deck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      if (deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to generate flashcards for this deck",
        });
      }

      // Check if deck has documents
      if (deck.documents.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot generate flashcards: deck has no documents",
        });
      }

      // Generate flashcards using Gemini AI with native file processing
      let flashcardsData;
      try {
        flashcardsData = await generateFlashcards(deck.documents, input.cardCount);
      } catch (error) {
        console.error("Flashcard generation failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to generate flashcards: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      // Create flashcards atomically
      const flashcards = await ctx.db.$transaction(
        flashcardsData.map((card) =>
          ctx.db.flashcard.create({
            data: {
              deckId: input.deckId,
              frontText: card.frontText,
              backText: card.backText,
            },
          })
        )
      );

      return flashcards;
    }),

  // CREATE: Create a flashcard
  create: protectedProcedure
    .input(createFlashcardSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify deck ownership
      const deck = await ctx.db.deck.findUnique({
        where: {
          id: input.deckId,
        },
      });

      if (!deck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      if (deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to add flashcards to this deck",
        });
      }

      // Create the flashcard
      const flashcard = await ctx.db.flashcard.create({
        data: {
          frontText: input.frontText,
          backText: input.backText,
          deckId: input.deckId,
        },
      });

      return flashcard;
    }),

  // READ: Get all flashcards for a deck
  getByDeckId: protectedProcedure
    .input(getFlashcardsByDeckIdSchema)
    .query(async ({ ctx, input }) => {
      // Verify deck ownership
      const deck = await ctx.db.deck.findUnique({
        where: {
          id: input.deckId,
        },
      });

      if (!deck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      if (deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access flashcards in this deck",
        });
      }

      // Get all flashcards
      const flashcards = await ctx.db.flashcard.findMany({
        where: {
          deckId: input.deckId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return flashcards;
    }),

  // READ: Get a specific flashcard by ID
  getById: protectedProcedure
    .input(getFlashcardByIdSchema)
    .query(async ({ ctx, input }) => {
      const flashcard = await ctx.db.flashcard.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
        },
      });

      if (!flashcard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flashcard not found",
        });
      }

      // Verify ownership through deck
      if (flashcard.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access this flashcard",
        });
      }

      return flashcard;
    }),

  // UPDATE: Update a flashcard
  update: protectedProcedure
    .input(updateFlashcardSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if flashcard exists and user owns it
      const existingFlashcard = await ctx.db.flashcard.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
        },
      });

      if (!existingFlashcard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flashcard not found",
        });
      }

      if (existingFlashcard.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this flashcard",
        });
      }

      // Build update data
      const updateData: { frontText?: string; backText?: string } = {};
      if (input.frontText !== undefined) updateData.frontText = input.frontText;
      if (input.backText !== undefined) updateData.backText = input.backText;

      // Update the flashcard
      const updatedFlashcard = await ctx.db.flashcard.update({
        where: {
          id: input.id,
        },
        data: updateData,
      });

      return updatedFlashcard;
    }),

  // DELETE: Delete a flashcard
  delete: protectedProcedure
    .input(deleteFlashcardSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if flashcard exists and user owns it
      const existingFlashcard = await ctx.db.flashcard.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
        },
      });

      if (!existingFlashcard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Flashcard not found",
        });
      }

      if (existingFlashcard.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this flashcard",
        });
      }

      // Delete the flashcard
      await ctx.db.flashcard.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),
});
