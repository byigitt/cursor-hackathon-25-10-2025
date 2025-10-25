import {
  createDeckSchema,
  updateDeckSchema,
  getDeckByIdSchema,
  deleteDeckSchema,
  addDocumentSchema,
  updateDocumentSchema,
  getDocumentByIdSchema,
  deleteDocumentSchema,
  getDocumentsByDeckIdSchema,
  generateStudySessionSchema,
  updateRsvpSpeedSchema,
  getStudySessionByDeckIdSchema,
} from '~/server/schemas/deck';

import {
  createFlashcardSchema,
  updateFlashcardSchema,
  getFlashcardsByDeckIdSchema,
  getFlashcardByIdSchema,
  deleteFlashcardSchema,
} from '~/server/schemas/flashcard';

import {
  getLeaderboardSchema,
  updateStreakSchema,
} from '~/server/schemas/gamification';

import {
  generateQuizSchema,
  getQuizzesByDeckIdSchema,
  getQuizByIdSchema,
  deleteQuizSchema,
  updateQuestionSchema,
  deleteQuestionSchema,
  updateOptionSchema,
  submitQuizAttemptSchema,
  getQuizAttemptsSchema,
  getQuizAttemptByIdSchema,
  deleteQuizAttemptSchema,
  getQuizAttemptStatsSchema,
} from '~/server/schemas/quiz';

describe('Schema Validation Tests', () => {
  describe('Deck Schemas', () => {
    describe('createDeckSchema', () => {
      it('should validate valid deck name', () => {
        const result = createDeckSchema.safeParse({
          name: 'My Study Deck',
        });
        expect(result.success).toBe(true);
      });

      it('should reject empty name', () => {
        const result = createDeckSchema.safeParse({
          name: '',
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Deck name is required');
      });

      it('should reject name that is too long', () => {
        const result = createDeckSchema.safeParse({
          name: 'a'.repeat(101),
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Deck name too long');
      });
    });

    describe('updateDeckSchema', () => {
      it('should validate valid update', () => {
        const result = updateDeckSchema.safeParse({
          id: 'cuid123',
          name: 'Updated Deck Name',
        });
        expect(result.success).toBe(true);
      });

      it('should reject invalid ID', () => {
        const result = updateDeckSchema.safeParse({
          id: 'invalid-id!',
          name: 'Valid Name',
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Invalid deck ID');
      });
    });

    describe('addDocumentSchema', () => {
      it('should validate valid document', () => {
        const result = addDocumentSchema.safeParse({
          deckId: 'cuid123',
          name: 'Study Guide.pdf',
          fileUrl: 'https://uploadthing.com/file.pdf',
          fileKey: 'file-key-123',
          fileType: 'pdf',
          fileSize: 1024000,
        });
        expect(result.success).toBe(true);
      });

      it('should reject invalid file type', () => {
        const result = addDocumentSchema.safeParse({
          deckId: 'cuid123',
          name: 'Study Guide.exe',
          fileUrl: 'https://uploadthing.com/file.exe',
          fileKey: 'file-key-123',
          fileType: 'exe',
          fileSize: 1024000,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Unsupported file type. Please upload PDF, TXT, DOC, or DOCX files.');
      });

      it('should reject invalid URL', () => {
        const result = addDocumentSchema.safeParse({
          deckId: 'cuid123',
          name: 'Study Guide.pdf',
          fileUrl: 'not-a-url',
          fileKey: 'file-key-123',
          fileType: 'pdf',
          fileSize: 1024000,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Invalid file URL');
      });

      it('should reject negative file size', () => {
        const result = addDocumentSchema.safeParse({
          deckId: 'cuid123',
          name: 'Study Guide.pdf',
          fileUrl: 'https://uploadthing.com/file.pdf',
          fileKey: 'file-key-123',
          fileType: 'pdf',
          fileSize: -100,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('File size must be positive');
      });
    });

    describe('updateRsvpSpeedSchema', () => {
      it('should validate valid speed', () => {
        const result = updateRsvpSpeedSchema.safeParse({
          deckId: 'cuid123',
          rsvpSpeedWPM: 300,
        });
        expect(result.success).toBe(true);
      });

      it('should reject speed too slow', () => {
        const result = updateRsvpSpeedSchema.safeParse({
          deckId: 'cuid123',
          rsvpSpeedWPM: 50,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Speed too slow');
      });

      it('should reject speed too fast', () => {
        const result = updateRsvpSpeedSchema.safeParse({
          deckId: 'cuid123',
          rsvpSpeedWPM: 1500,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Speed too fast');
      });
    });
  });

  describe('Flashcard Schemas', () => {
    describe('createFlashcardSchema', () => {
      it('should validate valid flashcard', () => {
        const result = createFlashcardSchema.safeParse({
          deckId: 'cuid123',
          frontText: 'What is the capital of France?',
          backText: 'Paris',
        });
        expect(result.success).toBe(true);
      });

      it('should reject empty front text', () => {
        const result = createFlashcardSchema.safeParse({
          deckId: 'cuid123',
          frontText: '',
          backText: 'Answer',
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Front text is required');
      });

      it('should reject text that is too long', () => {
        const result = createFlashcardSchema.safeParse({
          deckId: 'cuid123',
          frontText: 'a'.repeat(501),
          backText: 'Answer',
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Front text too long');
      });
    });

    describe('updateFlashcardSchema', () => {
      it('should allow partial updates', () => {
        const result = updateFlashcardSchema.safeParse({
          id: 'cuid123',
          frontText: 'Updated front',
        });
        expect(result.success).toBe(true);
      });

      it('should allow updating only back text', () => {
        const result = updateFlashcardSchema.safeParse({
          id: 'cuid123',
          backText: 'Updated back',
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Quiz Schemas', () => {
    describe('generateQuizSchema', () => {
      it('should validate valid quiz generation', () => {
        const result = generateQuizSchema.safeParse({
          deckId: 'cuid123',
          questionCount: 10,
        });
        expect(result.success).toBe(true);
      });

      it('should use default question count', () => {
        const result = generateQuizSchema.safeParse({
          deckId: 'cuid123',
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.questionCount).toBe(10);
        }
      });

      it('should reject too few questions', () => {
        const result = generateQuizSchema.safeParse({
          deckId: 'cuid123',
          questionCount: 3,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('At least 5 questions required');
      });

      it('should reject too many questions', () => {
        const result = generateQuizSchema.safeParse({
          deckId: 'cuid123',
          questionCount: 35,
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Maximum 30 questions allowed');
      });
    });

    describe('submitQuizAttemptSchema', () => {
      it('should validate valid submission', () => {
        const result = submitQuizAttemptSchema.safeParse({
          quizId: 'cuid123',
          answers: [
            {
              questionId: 'question1',
              selectedOptionId: 'option1',
            },
            {
              questionId: 'question2',
              selectedOptionId: 'option2',
            },
          ],
        });
        expect(result.success).toBe(true);
      });

      it('should require at least one answer', () => {
        const result = submitQuizAttemptSchema.safeParse({
          quizId: 'cuid123',
          answers: [],
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('At least one answer is required');
      });

      it('should validate answer structure', () => {
        const result = submitQuizAttemptSchema.safeParse({
          quizId: 'cuid123',
          answers: [
            {
              questionId: 'invalid!',
              selectedOptionId: 'option1',
            },
          ],
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Invalid question ID');
      });
    });

    describe('updateQuestionSchema', () => {
      it('should validate question update', () => {
        const result = updateQuestionSchema.safeParse({
          id: 'cuid123',
          questionText: 'Updated question text?',
        });
        expect(result.success).toBe(true);
      });

      it('should reject empty question text', () => {
        const result = updateQuestionSchema.safeParse({
          id: 'cuid123',
          questionText: '',
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Question text is required');
      });

      it('should reject question text that is too long', () => {
        const result = updateQuestionSchema.safeParse({
          id: 'cuid123',
          questionText: 'a'.repeat(501),
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Question text too long');
      });
    });

    describe('updateOptionSchema', () => {
      it('should allow partial option updates', () => {
        const result = updateOptionSchema.safeParse({
          id: 'cuid123',
          optionText: 'Updated option',
        });
        expect(result.success).toBe(true);
      });

      it('should allow updating only correctness', () => {
        const result = updateOptionSchema.safeParse({
          id: 'cuid123',
          isCorrect: true,
        });
        expect(result.success).toBe(true);
      });

      it('should allow updating both fields', () => {
        const result = updateOptionSchema.safeParse({
          id: 'cuid123',
          optionText: 'New text',
          isCorrect: false,
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Gamification Schemas', () => {
    describe('getLeaderboardSchema', () => {
      it('should validate valid limit', () => {
        const result = getLeaderboardSchema.safeParse({
          limit: 25,
        });
        expect(result.success).toBe(true);
      });

      it('should use default limit', () => {
        const result = getLeaderboardSchema.safeParse({});
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.limit).toBe(10);
        }
      });

      it('should reject limit too small', () => {
        const result = getLeaderboardSchema.safeParse({
          limit: 0,
        });
        expect(result.success).toBe(false);
      });

      it('should reject limit too large', () => {
        const result = getLeaderboardSchema.safeParse({
          limit: 101,
        });
        expect(result.success).toBe(false);
      });
    });

    describe('updateStreakSchema', () => {
      it('should validate user ID', () => {
        const result = updateStreakSchema.safeParse({
          userId: 'cuid123',
        });
        expect(result.success).toBe(true);
      });

      it('should reject invalid user ID', () => {
        const result = updateStreakSchema.safeParse({
          userId: 'invalid!',
        });
        expect(result.success).toBe(false);
        expect(result.error?.issues[0]!.message).toBe('Invalid user ID');
      });
    });
  });

  describe('ID Validation Schemas', () => {
    const idSchemas = [
      { schema: getDeckByIdSchema, name: 'getDeckByIdSchema' },
      { schema: deleteDeckSchema, name: 'deleteDeckSchema' },
      { schema: getDocumentByIdSchema, name: 'getDocumentByIdSchema' },
      { schema: deleteDocumentSchema, name: 'deleteDocumentSchema' },
      { schema: getFlashcardByIdSchema, name: 'getFlashcardByIdSchema' },
      { schema: deleteFlashcardSchema, name: 'deleteFlashcardSchema' },
      { schema: getQuizByIdSchema, name: 'getQuizByIdSchema' },
      { schema: deleteQuizSchema, name: 'deleteQuizSchema' },
      { schema: deleteQuestionSchema, name: 'deleteQuestionSchema' },
      { schema: getQuizAttemptByIdSchema, name: 'getQuizAttemptByIdSchema' },
      { schema: deleteQuizAttemptSchema, name: 'deleteQuizAttemptSchema' },
    ];

    idSchemas.forEach(({ schema, name }) => {
      describe(name, () => {
        it('should validate valid CUID', () => {
          const result = schema.safeParse({
            id: 'cuid123456789',
          });
          expect(result.success).toBe(true);
        });

        it('should reject invalid ID format', () => {
          const result = schema.safeParse({
            id: 'invalid-id!@#',
          });
          expect(result.success).toBe(false);
        });

        it('should require ID field', () => {
          const result = schema.safeParse({});
          expect(result.success).toBe(false);
        });
      });
    });
  });

  describe('DeckId Validation Schemas', () => {
    const deckIdSchemas = [
      { schema: getDocumentsByDeckIdSchema, name: 'getDocumentsByDeckIdSchema' },
      { schema: generateStudySessionSchema, name: 'generateStudySessionSchema' },
      { schema: getStudySessionByDeckIdSchema, name: 'getStudySessionByDeckIdSchema' },
      { schema: getFlashcardsByDeckIdSchema, name: 'getFlashcardsByDeckIdSchema' },
      { schema: getQuizzesByDeckIdSchema, name: 'getQuizzesByDeckIdSchema' },
    ];

    deckIdSchemas.forEach(({ schema, name }) => {
      describe(name, () => {
        it('should validate valid deck ID', () => {
          const result = schema.safeParse({
            deckId: 'cuid123456789',
          });
          expect(result.success).toBe(true);
        });

        it('should reject invalid deck ID format', () => {
          const result = schema.safeParse({
            deckId: 'invalid!',
          });
          expect(result.success).toBe(false);
        });

        it('should require deckId field', () => {
          const result = schema.safeParse({});
          expect(result.success).toBe(false);
        });
      });
    });
  });
});

