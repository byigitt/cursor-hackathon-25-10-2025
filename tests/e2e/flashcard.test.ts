import { createAuthenticatedCaller, expectForbidden } from '../utils/trpc-helpers';
import { createTestUser, cleanupUserData, createTestDeck, testDb } from '../setup/db.setup';
import { type User } from '@prisma/client';

describe('Flashcard Router E2E Tests', () => {
  let testUser: User;
  let testDeck: any;
  let authenticatedCaller: Awaited<ReturnType<typeof createAuthenticatedCaller>>;

  beforeAll(async () => {
    testUser = await createTestUser({
      email: 'flashcard-test@example.com',
      name: 'Flashcard Test User',
    });
    authenticatedCaller = await createAuthenticatedCaller(testUser.id);
    testDeck = await createTestDeck(testUser.id, { name: 'Flashcard Test Deck' });
  });

  afterAll(async () => {
    await cleanupUserData(testUser.id);
  });

  describe('create', () => {
    it('should create a flashcard', async () => {
      const result = await authenticatedCaller.flashcard.create({
        deckId: testDeck.id,
        frontText: 'What is the capital of France?',
        backText: 'Paris',
      });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.frontText).toBe('What is the capital of France?');
      expect(result.backText).toBe('Paris');
      expect(result.deckId).toBe(testDeck.id);
    });

    it('should validate flashcard text', async () => {
      await expect(
        authenticatedCaller.flashcard.create({
          deckId: testDeck.id,
          frontText: '',
          backText: 'Answer',
        })
      ).rejects.toThrow('Front text is required');

      await expect(
        authenticatedCaller.flashcard.create({
          deckId: testDeck.id,
          frontText: 'Question',
          backText: '',
        })
      ).rejects.toThrow('Back text is required');

      const longText = 'a'.repeat(501);
      await expect(
        authenticatedCaller.flashcard.create({
          deckId: testDeck.id,
          frontText: longText,
          backText: 'Answer',
        })
      ).rejects.toThrow('Front text too long');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'other-flashcard@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, { name: 'Other Flashcard Deck' });

      await expectForbidden(() =>
        authenticatedCaller.flashcard.create({
          deckId: otherDeck.id,
          frontText: 'Q',
          backText: 'A',
        })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getByDeckId', () => {
    it('should return all flashcards for a deck', async () => {
      const deckWithCards = await createTestDeck(testUser.id, {
        name: 'Deck with Flashcards',
      });

      // Create multiple flashcards
      await testDb.flashcard.createMany({
        data: [
          { deckId: deckWithCards.id, frontText: 'Q1', backText: 'A1' },
          { deckId: deckWithCards.id, frontText: 'Q2', backText: 'A2' },
          { deckId: deckWithCards.id, frontText: 'Q3', backText: 'A3' },
        ],
      });

      const result = await authenticatedCaller.flashcard.getByDeckId({
        deckId: deckWithCards.id,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
      expect(result[0]!.deckId).toBe(deckWithCards.id);
    });

    it('should return empty array for deck with no flashcards', async () => {
      const emptyDeck = await createTestDeck(testUser.id, { name: 'Empty Flashcard Deck' });
      
      const result = await authenticatedCaller.flashcard.getByDeckId({
        deckId: emptyDeck.id,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('getById', () => {
    it('should return a specific flashcard', async () => {
      const flashcard = await testDb.flashcard.create({
        data: {
          deckId: testDeck.id,
          frontText: 'Specific Question',
          backText: 'Specific Answer',
        },
      });

      const result = await authenticatedCaller.flashcard.getById({ id: flashcard.id });

      expect(result).toBeDefined();
      expect(result.id).toBe(flashcard.id);
      expect(result.frontText).toBe('Specific Question');
      expect(result.deck).toBeDefined();
    });

    it('should throw NOT_FOUND for non-existent flashcard', async () => {
      await expect(
        authenticatedCaller.flashcard.getById({ id: 'cltest000000000000000003' })
      ).rejects.toThrow(/NOT_FOUND|not found/i);
    });
  });

  describe('update', () => {
    it('should update flashcard text', async () => {
      const flashcard = await testDb.flashcard.create({
        data: {
          deckId: testDeck.id,
          frontText: 'Original Front',
          backText: 'Original Back',
        },
      });

      const result = await authenticatedCaller.flashcard.update({
        id: flashcard.id,
        frontText: 'Updated Front',
        backText: 'Updated Back',
      });

      expect(result.frontText).toBe('Updated Front');
      expect(result.backText).toBe('Updated Back');
    });

    it('should allow partial updates', async () => {
      const flashcard = await testDb.flashcard.create({
        data: {
          deckId: testDeck.id,
          frontText: 'Keep Front',
          backText: 'Change Back',
        },
      });

      const result = await authenticatedCaller.flashcard.update({
        id: flashcard.id,
        backText: 'New Back',
      });

      expect(result.frontText).toBe('Keep Front');
      expect(result.backText).toBe('New Back');
    });
  });

  describe('delete', () => {
    it('should delete a flashcard', async () => {
      const flashcard = await testDb.flashcard.create({
        data: {
          deckId: testDeck.id,
          frontText: 'Delete Me',
          backText: 'Please',
        },
      });

      const result = await authenticatedCaller.flashcard.delete({ id: flashcard.id });
      expect(result.success).toBe(true);

      const deleted = await testDb.flashcard.findUnique({
        where: { id: flashcard.id },
      });
      expect(deleted).toBeNull();
    });
  });
});

