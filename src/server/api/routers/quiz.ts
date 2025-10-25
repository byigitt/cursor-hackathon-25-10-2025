import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  generateQuizSchema,
  getQuizzesByDeckIdSchema,
  getQuizByIdSchema,
  deleteQuizSchema,
  updateQuestionSchema,
  deleteQuestionSchema,
  updateOptionSchema,
} from "~/server/schemas/quiz";
import { generateQuizQuestions } from "~/server/lib/gemini";

export const quizRouter = createTRPCRouter({
  // CREATE: Generate AI-powered quiz for a deck
  generate: protectedProcedure
    .input(generateQuizSchema)
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
          message: "You don't have permission to generate a quiz for this deck",
        });
      }

      // Check if deck has documents
      if (deck.documents.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot generate quiz: deck has no documents",
        });
      }

      // Generate quiz questions using Gemini AI with native file processing
      let quizQuestions;
      try {
        quizQuestions = await generateQuizQuestions(deck.documents, input.questionCount);
      } catch (error) {
        console.error("Quiz generation failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to generate quiz: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }

      // Create quiz with questions and options atomically
      const quiz = await ctx.db.quiz.create({
        data: {
          deckId: input.deckId,
          questions: {
            create: quizQuestions.map((q) => ({
              questionText: q.questionText,
              options: {
                create: q.options.map((opt) => ({
                  optionText: opt.optionText,
                  isCorrect: opt.isCorrect,
                })),
              },
            })),
          },
        },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      return quiz;
    }),

  // READ: Get all quizzes for a deck (metadata only)
  getByDeckId: protectedProcedure
    .input(getQuizzesByDeckIdSchema)
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
          message: "You don't have permission to access quizzes for this deck",
        });
      }

      // Get all quizzes with metadata
      const quizzes = await ctx.db.quiz.findMany({
        where: {
          deckId: input.deckId,
        },
        include: {
          _count: {
            select: {
              questions: true,
              quizAttempts: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return quizzes;
    }),

  // READ: Get quiz by ID (without revealing correct answers)
  getById: protectedProcedure
    .input(getQuizByIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        const quiz = await ctx.db.quiz.findUnique({
          where: {
            id: input.id,
          },
          include: {
            deck: {
              select: {
                id: true,
                name: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            questions: {
              include: {
                options: {
                  select: {
                    id: true,
                    optionText: true,
                    // Do NOT include isCorrect - hide correct answers
                  },
                },
              },
              orderBy: {
                id: 'asc',
              },
            },
          },
        });

        if (!quiz) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Quiz not found",
          });
        }

        // Verify ownership through deck
        if (quiz.deck.userId !== ctx.session.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You don't have permission to access this quiz",
          });
        }

        // Ensure questions exist
        if (!quiz.questions || quiz.questions.length === 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Quiz has no questions",
          });
        }

        // Log for debugging
        console.log(`📚 Fetched quiz ${quiz.id} with ${quiz.questions.length} questions`);

        return quiz;
      } catch (error) {
        console.error("Error fetching quiz:", error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch quiz",
        });
      }
    }),

  // READ: Get quiz by ID with correct answers (for review)
  getByIdWithAnswers: protectedProcedure
    .input(getQuizByIdSchema)
    .query(async ({ ctx, input }) => {
      const quiz = await ctx.db.quiz.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
          questions: {
            include: {
              options: true, // Include isCorrect for review
            },
          },
        },
      });

      if (!quiz) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Quiz not found",
        });
      }

      // Verify ownership through deck
      if (quiz.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access this quiz",
        });
      }

      return quiz;
    }),

  // UPDATE: Update a question's text
  updateQuestion: protectedProcedure
    .input(updateQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if question exists and user owns it
      const existingQuestion = await ctx.db.question.findUnique({
        where: {
          id: input.id,
        },
        include: {
          quiz: {
            include: {
              deck: true,
            },
          },
        },
      });

      if (!existingQuestion) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Question not found",
        });
      }

      if (existingQuestion.quiz.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this question",
        });
      }

      // Update the question
      const updatedQuestion = await ctx.db.question.update({
        where: {
          id: input.id,
        },
        data: {
          questionText: input.questionText,
        },
      });

      return updatedQuestion;
    }),

  // UPDATE: Update an option
  updateOption: protectedProcedure
    .input(updateOptionSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if option exists and user owns it
      const existingOption = await ctx.db.option.findUnique({
        where: {
          id: input.id,
        },
        include: {
          question: {
            include: {
              quiz: {
                include: {
                  deck: true,
                },
              },
            },
          },
        },
      });

      if (!existingOption) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Option not found",
        });
      }

      if (existingOption.question.quiz.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this option",
        });
      }

      // Build update data
      const updateData: { optionText?: string; isCorrect?: boolean } = {};
      if (input.optionText !== undefined) updateData.optionText = input.optionText;
      if (input.isCorrect !== undefined) updateData.isCorrect = input.isCorrect;

      // Update the option
      const updatedOption = await ctx.db.option.update({
        where: {
          id: input.id,
        },
        data: updateData,
      });

      return updatedOption;
    }),

  // DELETE: Delete a quiz (cascades to questions and options)
  delete: protectedProcedure
    .input(deleteQuizSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if quiz exists and user owns it
      const existingQuiz = await ctx.db.quiz.findUnique({
        where: {
          id: input.id,
        },
        include: {
          deck: true,
        },
      });

      if (!existingQuiz) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Quiz not found",
        });
      }

      if (existingQuiz.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this quiz",
        });
      }

      // Delete the quiz (Prisma will cascade delete related records)
      await ctx.db.quiz.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),

  // DELETE: Delete a question (cascades to options)
  deleteQuestion: protectedProcedure
    .input(deleteQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if question exists and user owns it
      const existingQuestion = await ctx.db.question.findUnique({
        where: {
          id: input.id,
        },
        include: {
          quiz: {
            include: {
              deck: true,
            },
          },
        },
      });

      if (!existingQuestion) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Question not found",
        });
      }

      if (existingQuestion.quiz.deck.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this question",
        });
      }

      // Delete the question (Prisma will cascade delete options)
      await ctx.db.question.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),
});
