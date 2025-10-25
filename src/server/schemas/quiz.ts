import { z } from "zod";

// Generate quiz
export const generateQuizSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
  questionCount: z.number().min(5, "At least 5 questions required").max(30, "Maximum 30 questions allowed").default(10),
});

// Get quizzes by deck ID
export const getQuizzesByDeckIdSchema = z.object({
  deckId: z.string().cuid("Invalid deck ID"),
});

// Get quiz by ID
export const getQuizByIdSchema = z.object({
  id: z.string().cuid("Invalid quiz ID"),
});

// Delete quiz
export const deleteQuizSchema = z.object({
  id: z.string().cuid("Invalid quiz ID"),
});

// Update question
export const updateQuestionSchema = z.object({
  id: z.string().cuid("Invalid question ID"),
  questionText: z.string().min(1, "Question text is required").max(500, "Question text too long"),
});

// Delete question
export const deleteQuestionSchema = z.object({
  id: z.string().cuid("Invalid question ID"),
});

// Update option
export const updateOptionSchema = z.object({
  id: z.string().cuid("Invalid option ID"),
  optionText: z.string().min(1).max(200).optional(),
  isCorrect: z.boolean().optional(),
});

// Submit quiz attempt
export const submitQuizAttemptSchema = z.object({
  quizId: z.string().cuid("Invalid quiz ID"),
  answers: z.array(
    z.object({
      questionId: z.string().cuid("Invalid question ID"),
      selectedOptionId: z.string().cuid("Invalid option ID"),
    })
  ).min(1, "At least one answer is required"),
});

// Get quiz attempts
export const getQuizAttemptsSchema = z.object({
  quizId: z.string().cuid("Invalid quiz ID").optional(),
});

// Get quiz attempt by ID
export const getQuizAttemptByIdSchema = z.object({
  id: z.string().cuid("Invalid attempt ID"),
});

// Delete quiz attempt
export const deleteQuizAttemptSchema = z.object({
  id: z.string().cuid("Invalid attempt ID"),
});

// Get quiz attempt stats
export const getQuizAttemptStatsSchema = z.object({
  userId: z.string().cuid("Invalid user ID").optional(),
});
