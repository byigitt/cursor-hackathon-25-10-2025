import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  createDeckSchema,
  updateDeckSchema,
  getDeckByIdSchema,
  deleteDeckSchema,
} from "~/server/schemas/deck";

export const deckRouter = createTRPCRouter({
  // CREATE: Create a new deck
  create: protectedProcedure
    .input(createDeckSchema)
    .mutation(async ({ ctx, input }) => {
      const deck = await ctx.db.deck.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });

      return deck;
    }),

  // READ: Get all user's decks with metadata
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const decks = await ctx.db.deck.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          _count: {
            select: {
              documents: true,
              quizzes: true,
              flashcards: true,
            },
          },
          studySession: {
            select: {
              id: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      return decks;
    }),

  // READ: Get a specific deck by ID with all related data
  getById: protectedProcedure
    .input(getDeckByIdSchema)
    .query(async ({ ctx, input }) => {
      const deck = await ctx.db.deck.findUnique({
        where: {
          id: input.id,
        },
        include: {
          documents: {
            orderBy: {
              createdAt: "asc",
            },
          },
          studySession: true,
          quizzes: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              _count: {
                select: {
                  questions: true,
                  quizAttempts: true,
                },
              },
            },
          },
          flashcards: {
            orderBy: {
              createdAt: "asc",
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

      // Validate ownership
      if (deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access this deck",
        });
      }

      return deck;
    }),

  // READ: Get deck with statistics
  getWithStats: protectedProcedure
    .input(getDeckByIdSchema)
    .query(async ({ ctx, input }) => {
      const deck = await ctx.db.deck.findUnique({
        where: {
          id: input.id,
        },
        include: {
          _count: {
            select: {
              documents: true,
              quizzes: true,
              flashcards: true,
            },
          },
          studySession: true,
          quizzes: {
            include: {
              quizAttempts: {
                where: {
                  userId: ctx.session.user.id,
                },
                select: {
                  score: true,
                  createdAt: true,
                },
                orderBy: {
                  createdAt: "desc",
                },
                take: 5,
              },
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

      // Validate ownership
      if (deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access this deck",
        });
      }

      // Calculate stats
      const allAttempts = deck.quizzes.flatMap((quiz) => quiz.quizAttempts);
      const averageScore = allAttempts.length > 0
        ? allAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / allAttempts.length
        : 0;

      return {
        ...deck,
        stats: {
          averageScore,
          totalAttempts: allAttempts.length,
          recentAttempts: allAttempts.slice(0, 5),
        },
      };
    }),

  // UPDATE: Update deck name
  update: protectedProcedure
    .input(updateDeckSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if deck exists and user owns it
      const existingDeck = await ctx.db.deck.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!existingDeck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      if (existingDeck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this deck",
        });
      }

      // Update the deck
      const updatedDeck = await ctx.db.deck.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });

      return updatedDeck;
    }),

  // DELETE: Delete a deck (cascades to all related data)
  delete: protectedProcedure
    .input(deleteDeckSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if deck exists and user owns it
      const existingDeck = await ctx.db.deck.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!existingDeck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      if (existingDeck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this deck",
        });
      }

      // Delete the deck (Prisma will cascade delete related records)
      await ctx.db.deck.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),
});
