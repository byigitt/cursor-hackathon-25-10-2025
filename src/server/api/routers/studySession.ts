import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  generateStudySessionSchema,
  updateRsvpSpeedSchema,
  getStudySessionByDeckIdSchema,
} from "~/server/schemas/deck";
import { generateSummary } from "~/server/lib/gemini";

export const studySessionRouter = createTRPCRouter({
  // CREATE/UPDATE: Generate AI-powered study session summary
  generate: protectedProcedure
    .input(generateStudySessionSchema)
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
          message: "You don't have permission to generate a study session for this deck",
        });
      }

      // Check if deck has documents
      if (deck.documents.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot generate study session: deck has no documents",
        });
      }

      // Generate summary using Gemini AI with native file processing
      let summary: string;
      try {
        summary = await generateSummary(deck.documents);
      } catch (error) {
        console.error("Summary generation failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to generate summary: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      // Create or update study session
      const studySession = await ctx.db.studySession.upsert({
        where: {
          deckId: input.deckId,
        },
        create: {
          deckId: input.deckId,
          summary,
          rsvpSpeedWPM: 300,
        },
        update: {
          summary,
        },
      });

      return studySession;
    }),

  // READ: Get study session for a deck
  getByDeckId: protectedProcedure
    .input(getStudySessionByDeckIdSchema)
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
          message: "You don't have permission to access this deck's study session",
        });
      }

      // Get study session
      const studySession = await ctx.db.studySession.findUnique({
        where: {
          deckId: input.deckId,
        },
      });

      if (!studySession) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Study session not found. Generate one first.",
        });
      }

      return studySession;
    }),

  // UPDATE: Update RSVP reading speed
  updateRsvpSpeed: protectedProcedure
    .input(updateRsvpSpeedSchema)
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
          message: "You don't have permission to update this deck's study session",
        });
      }

      // Check if study session exists
      const existingSession = await ctx.db.studySession.findUnique({
        where: {
          deckId: input.deckId,
        },
      });

      if (!existingSession) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Study session not found. Generate one first.",
        });
      }

      // Update RSVP speed
      const updatedSession = await ctx.db.studySession.update({
        where: {
          deckId: input.deckId,
        },
        data: {
          rsvpSpeedWPM: input.rsvpSpeedWPM,
        },
      });

      return updatedSession;
    }),

  // UPDATE: Regenerate study session summary
  regenerate: protectedProcedure
    .input(generateStudySessionSchema)
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
          message: "You don't have permission to regenerate this study session",
        });
      }

      // Check if deck has documents
      if (deck.documents.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot regenerate study session: deck has no documents",
        });
      }

      // Check if study session exists
      const existingSession = await ctx.db.studySession.findUnique({
        where: {
          deckId: input.deckId,
        },
      });

      if (!existingSession) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Study session not found. Use generate instead.",
        });
      }

      // Generate new summary using Gemini AI with native file processing
      let summary: string;
      try {
        summary = await generateSummary(deck.documents);
      } catch (error) {
        console.error("Summary regeneration failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to regenerate summary: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      // Update study session with new summary
      const updatedSession = await ctx.db.studySession.update({
        where: {
          deckId: input.deckId,
        },
        data: {
          summary,
        },
      });

      return updatedSession;
    }),
});
