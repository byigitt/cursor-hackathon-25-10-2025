import { createAuthenticatedCaller } from '../utils/trpc-helpers';
import { createTestUser, cleanupUserData, createTestDeck, testDb } from '../setup/db.setup';
import { type User } from '@prisma/client';

describe('QuizAttempt Router E2E Tests', () => {
  let testUser: User;
  let testQuiz: any;
  let authenticatedCaller: Awaited<ReturnType<typeof createAuthenticatedCaller>>;

  beforeAll(async () => {
    // Create test user and authenticated caller
    testUser = await createTestUser({
      email: 'quiz-attempt-test@example.com',
      name: 'Quiz Attempt Test User',
    });
    authenticatedCaller = await createAuthenticatedCaller(testUser.id);
    
    // Create a test deck with a quiz
    const testDeck = await createTestDeck(testUser.id, {
      name: 'Quiz Attempt Test Deck',
    });

    // Create a quiz with multiple questions
    testQuiz = await testDb.quiz.create({
      data: {
        deckId: testDeck.id,
        questions: {
          create: [
            {
              questionText: 'What is 2 + 2?',
              options: {
                create: [
                  { optionText: '3', isCorrect: false },
                  { optionText: '4', isCorrect: true },
                  { optionText: '5', isCorrect: false },
                  { optionText: '6', isCorrect: false },
                ],
              },
            },
            {
              questionText: 'What is the capital of France?',
              options: {
                create: [
                  { optionText: 'London', isCorrect: false },
                  { optionText: 'Paris', isCorrect: true },
                  { optionText: 'Berlin', isCorrect: false },
                  { optionText: 'Madrid', isCorrect: false },
                ],
              },
            },
            {
              questionText: 'What color is the sky?',
              options: {
                create: [
                  { optionText: 'Red', isCorrect: false },
                  { optionText: 'Green', isCorrect: false },
                  { optionText: 'Blue', isCorrect: true },
                  { optionText: 'Yellow', isCorrect: false },
                ],
              },
            },
          ],
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
  });

  afterAll(async () => {
    // Clean up test data
    if (testUser?.id) {
      await cleanupUserData(testUser.id);
    }
  });

  describe('submit', () => {
    it('should submit quiz attempt and calculate score', async () => {
      const answers = testQuiz.questions.map((question: any) => {
        // Select the correct option for each question
        const correctOption = question.options.find((opt: any) => opt.isCorrect);
        return {
          questionId: question.id,
          selectedOptionId: correctOption.id,
        };
      });

      const result = await authenticatedCaller.quizAttempt.submit({
        quizId: testQuiz.id,
        answers,
      });

      expect(result).toBeDefined();
      expect(result.attemptId).toBeDefined();
      expect(result.score).toBe(100); // All answers correct
      expect(result.correctCount).toBe(3);
      expect(result.totalCount).toBe(3);
      expect(result.createdAt).toBeInstanceOf(Date);

      // Verify streak was updated
      const streak = await testDb.streak.findUnique({
        where: { userId: testUser.id },
      });
      expect(streak).toBeDefined();
      expect(streak?.currentStreak).toBeGreaterThanOrEqual(1);
    });

    it('should calculate partial score correctly', async () => {
      // Submit with one wrong answer
      const answers = testQuiz.questions.map((question: any, index: number) => {
        const option = index === 0 
          ? question.options.find((opt: any) => !opt.isCorrect) // Wrong answer for first question
          : question.options.find((opt: any) => opt.isCorrect); // Correct for others
        return {
          questionId: question.id,
          selectedOptionId: option.id,
        };
      });

      const result = await authenticatedCaller.quizAttempt.submit({
        quizId: testQuiz.id,
        answers,
      });

      expect(result.score).toBeCloseTo(66.67, 1); // 2 out of 3 correct
      expect(result.correctCount).toBe(2);
      expect(result.totalCount).toBe(3);
    });

    it('should validate all questions are answered', async () => {
      const incompleteAnswers = [
        {
          questionId: testQuiz.questions[0].id,
          selectedOptionId: testQuiz.questions[0].options[0].id,
        },
        // Missing answers for other questions
      ];

      await expect(
        authenticatedCaller.quizAttempt.submit({
          quizId: testQuiz.id,
          answers: incompleteAnswers,
        })
      ).rejects.toThrow(`Quiz has ${testQuiz.questions.length} questions but you provided 1 answers`);
    });

    it('should validate answer options belong to questions', async () => {
      const invalidAnswers = [
        {
          questionId: testQuiz.questions[0].id,
          selectedOptionId: testQuiz.questions[1].options[0].id, // Wrong question's option
        },
        {
          questionId: testQuiz.questions[1].id,
          selectedOptionId: testQuiz.questions[1].options[0].id,
        },
        {
          questionId: testQuiz.questions[2].id,
          selectedOptionId: testQuiz.questions[2].options[0].id,
        },
      ];

      await expect(
        authenticatedCaller.quizAttempt.submit({
          quizId: testQuiz.id,
          answers: invalidAnswers,
        })
      ).rejects.toThrow(/Option .* not found in question/);
    });

    it('should throw NOT_FOUND for non-existent quiz', async () => {
      await expect(
        authenticatedCaller.quizAttempt.submit({
          quizId: 'cltest000000000000000004',
          answers: [{ questionId: 'cltest000000000000000006', selectedOptionId: 'cltest000000000000000007' }],
        })
      ).rejects.toThrow(/NOT_FOUND|not found/i);
    });

    it('should throw FORBIDDEN for other user quiz', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-attempt@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other User Attempt Deck',
      });
      const otherQuiz = await testDb.quiz.create({
        data: {
          deckId: otherDeck.id,
          questions: {
            create: {
              questionText: 'Private Question',
              options: {
                create: [
                  { optionText: 'A', isCorrect: true },
                  { optionText: 'B', isCorrect: false },
                  { optionText: 'C', isCorrect: false },
                  { optionText: 'D', isCorrect: false },
                ],
              },
            },
          },
        },
        include: {
          questions: {
            include: { options: true },
          },
        },
      });

      await expect(
        authenticatedCaller.quizAttempt.submit({
          quizId: otherQuiz.id,
          answers: [{
            questionId: otherQuiz.questions[0]!.id,
            selectedOptionId: otherQuiz.questions[0]!.options[0]!.id,
          }],
        })
      ).rejects.toThrow(/FORBIDDEN|don't have permission|Forbidden/i);

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getMyAttempts', () => {
    it('should return user quiz attempts', async () => {
      // Submit an attempt first
      const answers = testQuiz.questions.map((q: any) => ({
        questionId: q.id,
        selectedOptionId: q.options.find((o: any) => o.isCorrect).id,
      }));

      await authenticatedCaller.quizAttempt.submit({
        quizId: testQuiz.id,
        answers,
      });

      const result = await authenticatedCaller.quizAttempt.getMyAttempts({});

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      const attempt = result[0]!;
      expect(attempt.userId).toBe(testUser.id);
      expect(attempt.quiz).toBeDefined();
      expect(attempt.quiz.deck).toBeDefined();
      expect(attempt.quiz._count.questions).toBe(3);
    });

    it('should filter by quiz ID', async () => {
      const result = await authenticatedCaller.quizAttempt.getMyAttempts({
        quizId: testQuiz.id,
      });

      result.forEach((attempt: any) => {
        expect(attempt.quizId).toBe(testQuiz.id);
      });
    });

    it('should return empty array when no attempts exist', async () => {
      // Create a new deck and quiz with no attempts
      const newDeck = await createTestDeck(testUser.id, {
        name: 'No Attempts Deck',
      });
      const newQuiz = await testDb.quiz.create({
        data: { deckId: newDeck.id },
      });

      const result = await authenticatedCaller.quizAttempt.getMyAttempts({
        quizId: newQuiz.id,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('getById', () => {
    it('should return specific attempt with detailed results', async () => {
      // Submit an attempt
      const answers = testQuiz.questions.map((q: any) => ({
        questionId: q.id,
        selectedOptionId: q.options[0].id, // Just pick first option
      }));

      const submitResult = await authenticatedCaller.quizAttempt.submit({
        quizId: testQuiz.id,
        answers,
      });

      const result = await authenticatedCaller.quizAttempt.getById({
        id: submitResult.attemptId,
      });

      expect(result).toBeDefined();
      expect(result.id).toBe(submitResult.attemptId);
      expect(result.quiz).toBeDefined();
      expect(result.answers).toHaveLength(3);
      expect(result.detailedResults).toHaveLength(3);

      // Check detailed results structure
      const firstResult = result.detailedResults[0]!;
      expect(firstResult.question).toBeDefined();
      expect(firstResult.selectedOption).toBeDefined();
      expect(firstResult.correctOption).toBeDefined();
      expect(firstResult.isCorrect).toBeDefined();
      expect(firstResult.allOptions).toHaveLength(4);
    });

    it('should throw NOT_FOUND for non-existent attempt', async () => {
      await expect(
        authenticatedCaller.quizAttempt.getById({ id: 'cltest000000000000000005' })
      ).rejects.toThrow(/NOT_FOUND|not found/i);
    });

    it('should throw FORBIDDEN for other user attempt', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-get-attempt@example.com',
      });
      const otherCaller = await createAuthenticatedCaller(otherUser.id);
      
      // Create attempt for other user
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other Attempt Deck',
      });
      const otherQuiz = await testDb.quiz.create({
        data: {
          deckId: otherDeck.id,
          questions: {
            create: {
              questionText: 'Q',
              options: {
                create: [
                  { optionText: 'A', isCorrect: true },
                  { optionText: 'B', isCorrect: false },
                  { optionText: 'C', isCorrect: false },
                  { optionText: 'D', isCorrect: false },
                ],
              },
            },
          },
        },
        include: {
          questions: {
            include: { options: true },
          },
        },
      });

      const otherAttempt = await otherCaller.quizAttempt.submit({
        quizId: otherQuiz.id,
        answers: [{
          questionId: otherQuiz.questions[0]!.id,
          selectedOptionId: otherQuiz.questions[0]!.options[0]!.id,
        }],
      });

      await expect(
        authenticatedCaller.quizAttempt.getById({ id: otherAttempt.attemptId })
      ).rejects.toThrow(/FORBIDDEN|don't have permission|Forbidden/i);

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getStats', () => {
    it('should return user quiz statistics', async () => {
      const result = await authenticatedCaller.quizAttempt.getStats({});

      expect(result).toBeDefined();
      expect(result.totalAttempts).toBeGreaterThanOrEqual(0);
      expect(result.averageScore).toBeGreaterThanOrEqual(0);
      expect(result.bestScore).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(result.recentAttempts)).toBe(true);
    });

    it('should return zero stats when no attempts exist', async () => {
      // Create a new user with no attempts
      const newUser = await createTestUser({
        email: 'no-stats@example.com',
      });
      const newCaller = await createAuthenticatedCaller(newUser.id);

      const result = await newCaller.quizAttempt.getStats({});

      expect(result.totalAttempts).toBe(0);
      expect(result.averageScore).toBe(0);
      expect(result.bestScore).toBe(0);
      expect(result.recentAttempts).toHaveLength(0);

      await cleanupUserData(newUser.id);
    });
  });

  describe('delete', () => {
    it('should delete a quiz attempt', async () => {
      // Submit an attempt to delete
      const answers = testQuiz.questions.map((q: any) => ({
        questionId: q.id,
        selectedOptionId: q.options[0].id,
      }));

      const submitResult = await authenticatedCaller.quizAttempt.submit({
        quizId: testQuiz.id,
        answers,
      });

      const result = await authenticatedCaller.quizAttempt.delete({
        id: submitResult.attemptId,
      });

      expect(result.success).toBe(true);

      // Verify attempt is deleted
      const deletedAttempt = await testDb.quizAttempt.findUnique({
        where: { id: submitResult.attemptId },
      });
      expect(deletedAttempt).toBeNull();
    });

    it('should throw NOT_FOUND for non-existent attempt', async () => {
      await expect(
        authenticatedCaller.quizAttempt.delete({ id: 'cltest000000000000000005' })
      ).rejects.toThrow(/NOT_FOUND|not found/i);
    });
  });
});

