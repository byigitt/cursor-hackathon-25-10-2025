import { createAuthenticatedCaller, createUnauthenticatedCaller, expectUnauthorized } from '../utils/trpc-helpers';
import { createTestUser, cleanupUserData, createTestDeck, testDb } from '../setup/db.setup';
import { type User } from '@prisma/client';

describe('Deck Router E2E Tests', () => {
  let testUser: User;
  let authenticatedCaller: Awaited<ReturnType<typeof createAuthenticatedCaller>>;

  beforeAll(async () => {
    // Create test user and authenticated caller
    testUser = await createTestUser({
      email: 'deck-test@example.com',
      name: 'Deck Test User',
    });
    authenticatedCaller = await createAuthenticatedCaller(testUser.id);
  });

  afterAll(async () => {
    // Clean up test data
    await cleanupUserData(testUser.id);
  });

  describe('create', () => {
    it('should create a new deck for authenticated user', async () => {
      const deckName = 'Test Deck Creation';
      const result = await authenticatedCaller.deck.create({
        name: deckName,
      });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(deckName);
      expect(result.userId).toBe(testUser.id);
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should require authentication', async () => {
      const unauthenticatedCaller = await createUnauthenticatedCaller();
      await expectUnauthorized(() =>
        unauthenticatedCaller.deck.create({ name: 'Unauthorized Deck' })
      );
    });

    it('should validate deck name', async () => {
      await expect(
        authenticatedCaller.deck.create({ name: '' })
      ).rejects.toThrow('Deck name is required');

      const longName = 'a'.repeat(101);
      await expect(
        authenticatedCaller.deck.create({ name: longName })
      ).rejects.toThrow('Deck name too long');
    });
  });

  describe('getAll', () => {
    it('should return all user decks with metadata', async () => {
      // Create test decks
      const deck1 = await createTestDeck(testUser.id, { name: 'Deck 1' });
      const deck2 = await createTestDeck(testUser.id, { 
        name: 'Deck 2',
        withDocuments: true,
        documentCount: 2
      });

      const result = await authenticatedCaller.deck.getAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(2);

      // Find our test decks
      const foundDeck1 = result.find(d => d.id === deck1.id);
      const foundDeck2 = result.find(d => d.id === deck2.id);

      expect(foundDeck1).toBeDefined();
      expect(foundDeck2).toBeDefined();

      // Check metadata
      expect(foundDeck1!._count.documents).toBe(0);
      expect(foundDeck2!._count.documents).toBe(2);
      expect(foundDeck1!._count.quizzes).toBe(0);
      expect(foundDeck1!._count.flashcards).toBe(0);
    });

    it('should only return current user decks', async () => {
      // Create another user with decks
      const otherUser = await createTestUser({
        email: 'other-deck-user@example.com',
      });
      await createTestDeck(otherUser.id, { name: 'Other User Deck' });

      const result = await authenticatedCaller.deck.getAll();

      // Should not contain other user's deck
      const otherUserDeck = result.find(d => d.name === 'Other User Deck');
      expect(otherUserDeck).toBeUndefined();

      // Clean up other user
      await cleanupUserData(otherUser.id);
    });

    it('should require authentication', async () => {
      const unauthenticatedCaller = await createUnauthenticatedCaller();
      await expectUnauthorized(() => unauthenticatedCaller.deck.getAll());
    });
  });

  describe('getById', () => {
    it('should return deck with all related data', async () => {
      const deck = await createTestDeck(testUser.id, {
        name: 'Detailed Deck',
        withDocuments: true,
        documentCount: 3,
      });

      const result = await authenticatedCaller.deck.getById({ id: deck.id });

      expect(result).toBeDefined();
      expect(result.id).toBe(deck.id);
      expect(result.name).toBe('Detailed Deck');
      expect(result.documents).toHaveLength(3);
      expect(result.quizzes).toBeDefined();
      expect(result.flashcards).toBeDefined();
      expect(result.studySession).toBeNull();
    });

    it('should throw NOT_FOUND for non-existent deck', async () => {
      await expect(
        authenticatedCaller.deck.getById({ id: 'non-existent-id' })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-test@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, { name: 'Forbidden Deck' });

      await expect(
        authenticatedCaller.deck.getById({ id: otherDeck.id })
      ).rejects.toThrow('FORBIDDEN');

      await cleanupUserData(otherUser.id);
    });
  });

  describe('update', () => {
    it('should update deck name', async () => {
      const deck = await createTestDeck(testUser.id, { name: 'Original Name' });
      
      const result = await authenticatedCaller.deck.update({
        id: deck.id,
        name: 'Updated Name',
      });

      expect(result.name).toBe('Updated Name');
      expect(result.id).toBe(deck.id);
      expect(result.updatedAt.getTime()).toBeGreaterThan(deck.updatedAt.getTime());
    });

    it('should validate updated name', async () => {
      const deck = await createTestDeck(testUser.id, { name: 'Valid Name' });

      await expect(
        authenticatedCaller.deck.update({ id: deck.id, name: '' })
      ).rejects.toThrow('Deck name is required');
    });

    it('should throw NOT_FOUND for non-existent deck', async () => {
      await expect(
        authenticatedCaller.deck.update({
          id: 'non-existent-id',
          name: 'New Name',
        })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'update-forbidden@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, { name: 'Other Deck' });

      await expect(
        authenticatedCaller.deck.update({
          id: otherDeck.id,
          name: 'Hacked Name',
        })
      ).rejects.toThrow('FORBIDDEN');

      await cleanupUserData(otherUser.id);
    });
  });

  describe('delete', () => {
    it('should delete deck and cascade related data', async () => {
      const deck = await createTestDeck(testUser.id, {
        name: 'Deck to Delete',
        withDocuments: true,
      });

      const result = await authenticatedCaller.deck.delete({ id: deck.id });
      expect(result.success).toBe(true);

      // Verify deck is deleted
      const deletedDeck = await testDb.deck.findUnique({
        where: { id: deck.id },
      });
      expect(deletedDeck).toBeNull();

      // Verify documents are cascade deleted
      const documents = await testDb.document.findMany({
        where: { deckId: deck.id },
      });
      expect(documents).toHaveLength(0);
    });

    it('should throw NOT_FOUND for non-existent deck', async () => {
      await expect(
        authenticatedCaller.deck.delete({ id: 'non-existent-id' })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'delete-forbidden@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, { name: 'Protected Deck' });

      await expect(
        authenticatedCaller.deck.delete({ id: otherDeck.id })
      ).rejects.toThrow('FORBIDDEN');

      // Verify deck still exists
      const deck = await testDb.deck.findUnique({
        where: { id: otherDeck.id },
      });
      expect(deck).toBeDefined();

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getWithStats', () => {
    it('should return deck with statistics', async () => {
      const deck = await createTestDeck(testUser.id, {
        name: 'Stats Deck',
        withDocuments: true,
      });

      const result = await authenticatedCaller.deck.getWithStats({ id: deck.id });

      expect(result).toBeDefined();
      expect(result.stats).toBeDefined();
      expect(result.stats.averageScore).toBe(0); // No quiz attempts yet
      expect(result.stats.totalAttempts).toBe(0);
      expect(result.stats.recentAttempts).toHaveLength(0);
      expect(result._count.documents).toBe(2);
    });
  });
});

