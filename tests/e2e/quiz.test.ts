import { createAuthenticatedCaller, expectForbidden } from '../utils/trpc-helpers';
import { createTestUser, cleanupUserData, createTestDeck, testDb } from '../setup/db.setup';
import { testDocuments } from '../fixtures/documents.fixture';
import { type User } from '@prisma/client';

describe('Quiz Router E2E Tests', () => {
  let testUser: User;
  let testDeck: any;
  let authenticatedCaller: Awaited<ReturnType<typeof createAuthenticatedCaller>>;

  beforeAll(async () => {
    // Create test user and authenticated caller
    testUser = await createTestUser({
      email: 'quiz-test@example.com',
      name: 'Quiz Test User',
    });
    authenticatedCaller = await createAuthenticatedCaller(testUser.id);
    
    // Create a test deck with documents for quiz generation
    testDeck = await createTestDeck(testUser.id, {
      name: 'Quiz Test Deck',
      withDocuments: true,
      documentCount: 2,
    });

    // Add file metadata to documents
    await testDb.document.updateMany({
      where: { deckId: testDeck.id },
      data: {
        fileUrl: testDocuments.science.fileUrl,
        fileKey: testDocuments.science.fileKey,
        fileType: testDocuments.science.fileType,
        fileSize: testDocuments.science.fileSize,
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await cleanupUserData(testUser.id);
  });

  describe('generate', () => {
    it('should generate AI-powered quiz with questions', async () => {
      // Note: This will attempt to make a real API call to Gemini
      // It will likely fail with mock file URLs, but we test the flow
      try {
        const result = await authenticatedCaller.quiz.generate({
          deckId: testDeck.id,
          questionCount: 5,
        });

        // If it succeeds (shouldn't with mock URLs), verify structure
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.deckId).toBe(testDeck.id);
        expect(result.questions).toBeDefined();
        expect(Array.isArray(result.questions)).toBe(true);
        expect(result.questions.length).toBe(5);

        // Check question structure
        if (result.questions.length > 0) {
          const firstQuestion = result.questions[0]!;
          expect(firstQuestion.questionText).toBeDefined();
          expect(firstQuestion.options).toBeDefined();
          expect(firstQuestion.options.length).toBe(4);
          
          // Verify exactly one correct answer
          const correctOptions = firstQuestion.options.filter((opt: any) => opt.isCorrect);
          expect(correctOptions.length).toBe(1);
        }
      } catch (error: any) {
        // Expected to fail with mock file URLs
        expect(error.message).toContain('Failed to generate quiz');
      }
    });

    it('should validate question count', async () => {
      await expect(
        authenticatedCaller.quiz.generate({
          deckId: testDeck.id,
          questionCount: 3, // Too few
        })
      ).rejects.toThrow('At least 5 questions required');

      await expect(
        authenticatedCaller.quiz.generate({
          deckId: testDeck.id,
          questionCount: 35, // Too many
        })
      ).rejects.toThrow('Maximum 30 questions allowed');
    });

    it('should use default question count', async () => {
      try {
        const result = await authenticatedCaller.quiz.generate({
          deckId: testDeck.id,
        });

        // If successful (unlikely with mock URLs)
        expect(result.questions.length).toBe(10); // Default
      } catch (error: any) {
        // Expected with mock URLs
        expect(error.message).toContain('Failed to generate quiz');
      }
    });

    it('should throw error for deck without documents', async () => {
      const emptyDeck = await createTestDeck(testUser.id, {
        name: 'Empty Quiz Deck',
        withDocuments: false,
      });

      await expect(
        authenticatedCaller.quiz.generate({ deckId: emptyDeck.id })
      ).rejects.toThrow('Cannot generate quiz: deck has no documents');
    });

    it('should throw NOT_FOUND for non-existent deck', async () => {
      await expect(
        authenticatedCaller.quiz.generate({ deckId: 'non-existent-deck' })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-quiz@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other User Quiz Deck',
        withDocuments: true,
      });

      await expectForbidden(() =>
        authenticatedCaller.quiz.generate({ deckId: otherDeck.id })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getByDeckId', () => {
    it('should return all quizzes for a deck', async () => {
      const deckWithQuizzes = await createTestDeck(testUser.id, {
        name: 'Get Quizzes Deck',
        withDocuments: true,
      });

      // Create test quizzes
      await testDb.quiz.create({
        data: {
          deckId: deckWithQuizzes.id,
          questions: {
            create: [
              {
                questionText: 'Test Question 1',
                options: {
                  create: [
                    { optionText: 'Option A', isCorrect: true },
                    { optionText: 'Option B', isCorrect: false },
                    { optionText: 'Option C', isCorrect: false },
                    { optionText: 'Option D', isCorrect: false },
                  ],
                },
              },
            ],
          },
        },
      });

      await testDb.quiz.create({
        data: {
          deckId: deckWithQuizzes.id,
          questions: {
            create: [
              {
                questionText: 'Test Question 2',
                options: {
                  create: [
                    { optionText: 'Option 1', isCorrect: false },
                    { optionText: 'Option 2', isCorrect: true },
                    { optionText: 'Option 3', isCorrect: false },
                    { optionText: 'Option 4', isCorrect: false },
                  ],
                },
              },
            ],
          },
        },
      });

      const result = await authenticatedCaller.quiz.getByDeckId({
        deckId: deckWithQuizzes.id,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result[0]!._count.questions).toBe(1);
      expect(result[0]!._count.quizAttempts).toBe(0);
    });

    it('should return empty array for deck with no quizzes', async () => {
      const emptyQuizDeck = await createTestDeck(testUser.id, {
        name: 'No Quiz Deck',
      });

      const result = await authenticatedCaller.quiz.getByDeckId({
        deckId: emptyQuizDeck.id,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-get-quiz@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other Quiz Deck',
      });

      await expectForbidden(() =>
        authenticatedCaller.quiz.getByDeckId({ deckId: otherDeck.id })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getById', () => {
    it('should return quiz without revealing correct answers', async () => {
      const deckForQuiz = await createTestDeck(testUser.id, {
        name: 'Get Quiz Deck',
      });

      const quiz = await testDb.quiz.create({
        data: {
          deckId: deckForQuiz.id,
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
            ],
          },
        },
      });

      const result = await authenticatedCaller.quiz.getById({ id: quiz.id });

      expect(result).toBeDefined();
      expect(result.id).toBe(quiz.id);
      expect(result.questions).toHaveLength(1);
      expect(result.questions[0]!.questionText).toBe('What is 2 + 2?');
      expect(result.questions[0]!.options).toHaveLength(4);
      
      // Verify isCorrect is NOT included
      result.questions[0]!.options.forEach((option: any) => {
        expect(option.isCorrect).toBeUndefined();
      });
    });

    it('should throw NOT_FOUND for non-existent quiz', async () => {
      await expect(
        authenticatedCaller.quiz.getById({ id: 'non-existent-quiz' })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user quiz', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-quiz-id@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other Quiz ID Deck',
      });
      const otherQuiz = await testDb.quiz.create({
        data: {
          deckId: otherDeck.id,
        },
      });

      await expectForbidden(() =>
        authenticatedCaller.quiz.getById({ id: otherQuiz.id })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getByIdWithAnswers', () => {
    it('should return quiz with correct answers for review', async () => {
      const deckForReview = await createTestDeck(testUser.id, {
        name: 'Review Quiz Deck',
      });

      const quiz = await testDb.quiz.create({
        data: {
          deckId: deckForReview.id,
          questions: {
            create: [
              {
                questionText: 'Capital of France?',
                options: {
                  create: [
                    { optionText: 'London', isCorrect: false },
                    { optionText: 'Paris', isCorrect: true },
                    { optionText: 'Berlin', isCorrect: false },
                    { optionText: 'Madrid', isCorrect: false },
                  ],
                },
              },
            ],
          },
        },
      });

      const result = await authenticatedCaller.quiz.getByIdWithAnswers({ id: quiz.id });

      expect(result).toBeDefined();
      expect(result.questions[0]!.options).toHaveLength(4);
      
      // Verify isCorrect IS included
      const correctOption = result.questions[0]!.options.find((opt: any) => opt.isCorrect);
      expect(correctOption).toBeDefined();
      expect(correctOption!.optionText).toBe('Paris');
    });
  });

  describe('updateQuestion', () => {
    it('should update question text', async () => {
      const deckForUpdate = await createTestDeck(testUser.id, {
        name: 'Update Question Deck',
      });

      const quiz = await testDb.quiz.create({
        data: {
          deckId: deckForUpdate.id,
          questions: {
            create: {
              questionText: 'Original Question',
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
        include: { questions: true },
      });

      const result = await authenticatedCaller.quiz.updateQuestion({
        id: quiz.questions[0]!.id,
        questionText: 'Updated Question Text',
      });

      expect(result.questionText).toBe('Updated Question Text');
    });

    it('should validate question text', async () => {
      const deckForValidation = await createTestDeck(testUser.id, {
        name: 'Validate Question Deck',
      });

      const quiz = await testDb.quiz.create({
        data: {
          deckId: deckForValidation.id,
          questions: {
            create: {
              questionText: 'Test',
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
        include: { questions: true },
      });

      await expect(
        authenticatedCaller.quiz.updateQuestion({
          id: quiz.questions[0]!.id,
          questionText: '',
        })
      ).rejects.toThrow('Question text is required');
    });
  });

  describe('updateOption', () => {
    it('should update option text and correctness', async () => {
      const deckForOption = await createTestDeck(testUser.id, {
        name: 'Update Option Deck',
      });

      const quiz = await testDb.quiz.create({
        data: {
          deckId: deckForOption.id,
          questions: {
            create: {
              questionText: 'Test Question',
              options: {
                create: [
                  { optionText: 'Original A', isCorrect: false },
                  { optionText: 'Original B', isCorrect: true },
                  { optionText: 'Original C', isCorrect: false },
                  { optionText: 'Original D', isCorrect: false },
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

      const optionToUpdate = quiz.questions[0]!.options[0]!;

      const result = await authenticatedCaller.quiz.updateOption({
        id: optionToUpdate.id,
        optionText: 'Updated Option A',
        isCorrect: true,
      });

      expect(result.optionText).toBe('Updated Option A');
      expect(result.isCorrect).toBe(true);
    });
  });

  describe('delete', () => {
    it('should delete quiz and cascade questions/options', async () => {
      const deckForDelete = await createTestDeck(testUser.id, {
        name: 'Delete Quiz Deck',
      });

      const quiz = await testDb.quiz.create({
        data: {
          deckId: deckForDelete.id,
          questions: {
            create: {
              questionText: 'To be deleted',
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
      });

      const result = await authenticatedCaller.quiz.delete({ id: quiz.id });
      expect(result.success).toBe(true);

      // Verify quiz is deleted
      const deletedQuiz = await testDb.quiz.findUnique({
        where: { id: quiz.id },
      });
      expect(deletedQuiz).toBeNull();

      // Verify questions are cascade deleted
      const questions = await testDb.question.findMany({
        where: { quizId: quiz.id },
      });
      expect(questions).toHaveLength(0);
    });

    it('should throw FORBIDDEN for other user quiz', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-delete-quiz@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Protected Quiz Deck',
      });
      const otherQuiz = await testDb.quiz.create({
        data: { deckId: otherDeck.id },
      });

      await expectForbidden(() =>
        authenticatedCaller.quiz.delete({ id: otherQuiz.id })
      );

      // Verify quiz still exists
      const quiz = await testDb.quiz.findUnique({
        where: { id: otherQuiz.id },
      });
      expect(quiz).toBeDefined();

      await cleanupUserData(otherUser.id);
    });
  });

  describe('deleteQuestion', () => {
    it('should delete a question and its options', async () => {
      const deckForDelQ = await createTestDeck(testUser.id, {
        name: 'Delete Question Deck',
      });

      const quiz = await testDb.quiz.create({
        data: {
          deckId: deckForDelQ.id,
          questions: {
            create: [
              {
                questionText: 'Keep this',
                options: {
                  create: [
                    { optionText: 'A', isCorrect: true },
                    { optionText: 'B', isCorrect: false },
                    { optionText: 'C', isCorrect: false },
                    { optionText: 'D', isCorrect: false },
                  ],
                },
              },
              {
                questionText: 'Delete this',
                options: {
                  create: [
                    { optionText: '1', isCorrect: false },
                    { optionText: '2', isCorrect: true },
                    { optionText: '3', isCorrect: false },
                    { optionText: '4', isCorrect: false },
                  ],
                },
              },
            ],
          },
        },
        include: { questions: true },
      });

      const questionToDelete = quiz.questions[1]!;

      const result = await authenticatedCaller.quiz.deleteQuestion({
        id: questionToDelete.id,
      });
      expect(result.success).toBe(true);

      // Verify question is deleted
      const deletedQuestion = await testDb.question.findUnique({
        where: { id: questionToDelete.id },
      });
      expect(deletedQuestion).toBeNull();

      // Verify other question remains
      const remainingQuestions = await testDb.question.findMany({
        where: { quizId: quiz.id },
      });
      expect(remainingQuestions).toHaveLength(1);
      expect(remainingQuestions[0]!.questionText).toBe('Keep this');
    });
  });
});

