import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  submitQuizAttemptSchema,
  getQuizAttemptsSchema,
  getQuizAttemptByIdSchema,
  deleteQuizAttemptSchema,
  getQuizAttemptStatsSchema,
} from "~/server/schemas/quiz";

// Helper function to update user streak
async function updateUserStreak(userId: string, db: any) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Get or create streak
  let streak = await db.streak.findUnique({
    where: { userId },
  });

  if (!streak) {
    // Create new streak
    streak = await db.streak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: now,
      },
    });
    return streak;
  }

  // Check last activity date
  const lastActivity = new Date(streak.lastActivityDate);
  const lastActivityDay = new Date(
    lastActivity.getFullYear(),
    lastActivity.getMonth(),
    lastActivity.getDate()
  );

  const daysDiff = Math.floor(
    (today.getTime() - lastActivityDay.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff === 0) {
    // Same day - no change to streak
    return streak;
  } else if (daysDiff === 1) {
    // Next day - increment streak
    const newCurrentStreak = streak.currentStreak + 1;
    const newLongestStreak = Math.max(newCurrentStreak, streak.longestStreak);

    streak = await db.streak.update({
      where: { userId },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: now,
      },
    });
    return streak;
  } else {
    // Gap detected - reset streak
    streak = await db.streak.update({
      where: { userId },
      data: {
        currentStreak: 1,
        longestStreak: Math.max(1, streak.longestStreak),
        lastActivityDate: now,
      },
    });
    return streak;
  }
}

export const quizAttemptRouter = createTRPCRouter({
  // CREATE: Submit a quiz attempt with answers
  submit: protectedProcedure
    .input(submitQuizAttemptSchema)
    .mutation(async ({ ctx, input }) => {
      // Get quiz with all questions and correct answers
      const quiz = await ctx.db.quiz.findUnique({
        where: {
          id: input.quizId,
        },
        include: {
          deck: true,
          questions: {
            include: {
              options: true,
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
          message: "You don't have permission to submit this quiz",
        });
      }

      // Validate that all questions are answered
      if (input.answers.length !== quiz.questions.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Quiz has ${quiz.questions.length} questions but you provided ${input.answers.length} answers`,
        });
      }

      // Calculate score
      let correctCount = 0;
      const answerValidations = [];

      for (const answer of input.answers) {
        const question = quiz.questions.find((q) => q.id === answer.questionId);

        if (!question) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Question ${answer.questionId} not found in quiz`,
          });
        }

        const selectedOption = question.options.find(
          (opt) => opt.id === answer.selectedOptionId
        );

        if (!selectedOption) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Option ${answer.selectedOptionId} not found in question ${answer.questionId}`,
          });
        }

        if (selectedOption.isCorrect) {
          correctCount++;
        }

        answerValidations.push({
          questionId: answer.questionId,
          selectedOptionId: answer.selectedOptionId,
          isCorrect: selectedOption.isCorrect,
        });
      }

      const score = (correctCount / quiz.questions.length) * 100;

      // Create quiz attempt with answers
      const quizAttempt = await ctx.db.quizAttempt.create({
        data: {
          userId: ctx.session.user.id,
          quizId: input.quizId,
          score,
          answers: {
            create: input.answers.map((answer) => ({
              questionId: answer.questionId,
              selectedOptionId: answer.selectedOptionId,
            })),
          },
        },
        include: {
          answers: true,
        },
      });

      // Update user streak
      await updateUserStreak(ctx.session.user.id, ctx.db);

      return {
        attemptId: quizAttempt.id,
        score,
        correctCount,
        totalCount: quiz.questions.length,
        createdAt: quizAttempt.createdAt,
      };
    }),

  // READ: Get user's quiz attempts
  getMyAttempts: protectedProcedure
    .input(getQuizAttemptsSchema)
    .query(async ({ ctx, input }) => {
      const whereClause: any = {
        userId: ctx.session.user.id,
      };

      if (input.quizId) {
        whereClause.quizId = input.quizId;
      }

      const attempts = await ctx.db.quizAttempt.findMany({
        where: whereClause,
        include: {
          quiz: {
            include: {
              deck: {
                select: {
                  id: true,
                  name: true,
                },
              },
              _count: {
                select: {
                  questions: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return attempts;
    }),

  // READ: Get specific quiz attempt with detailed results
  getById: protectedProcedure
    .input(getQuizAttemptByIdSchema)
    .query(async ({ ctx, input }) => {
      const attempt = await ctx.db.quizAttempt.findUnique({
        where: {
          id: input.id,
        },
        include: {
          quiz: {
            include: {
              deck: true,
              questions: {
                include: {
                  options: true,
                },
              },
            },
          },
          answers: {
            include: {
              question: true,
              selectedOption: true,
            },
          },
        },
      });

      if (!attempt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Quiz attempt not found",
        });
      }

      // Verify ownership
      if (attempt.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to access this quiz attempt",
        });
      }

      // Build detailed results with correct/incorrect information
      const detailedResults = attempt.answers.map((answer) => {
        const question = attempt.quiz.questions.find(
          (q) => q.id === answer.questionId
        );
        const correctOption = question?.options.find((opt) => opt.isCorrect);

        return {
          question: answer.question,
          selectedOption: answer.selectedOption,
          correctOption,
          isCorrect: answer.selectedOption.isCorrect,
          allOptions: question?.options || [],
        };
      });

      return {
        ...attempt,
        detailedResults,
      };
    }),

  // READ: Get quiz attempt statistics
  getStats: protectedProcedure
    .input(getQuizAttemptStatsSchema)
    .query(async ({ ctx, input }) => {
      const userId = input.userId || ctx.session.user.id;

      // Verify permission if requesting another user's stats
      if (userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only view your own statistics",
        });
      }

      const attempts = await ctx.db.quizAttempt.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      });

      if (attempts.length === 0) {
        return {
          totalAttempts: 0,
          averageScore: 0,
          bestScore: 0,
          recentAttempts: [],
        };
      }

      const totalAttempts = attempts.length;
      const averageScore =
        attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts;
      const bestScore = Math.max(...attempts.map((attempt) => attempt.score));

      return {
        totalAttempts,
        averageScore,
        bestScore,
        recentAttempts: attempts.slice(0, 5),
      };
    }),

  // DELETE: Delete a quiz attempt
  delete: protectedProcedure
    .input(deleteQuizAttemptSchema)
    .mutation(async ({ ctx, input }) => {
      // First, check if attempt exists and user owns it
      const existingAttempt = await ctx.db.quizAttempt.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!existingAttempt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Quiz attempt not found",
        });
      }

      if (existingAttempt.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this quiz attempt",
        });
      }

      // Delete the quiz attempt (Prisma will cascade delete answers)
      await ctx.db.quizAttempt.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
    }),
});
