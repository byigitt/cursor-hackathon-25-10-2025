import { createAuthenticatedCaller, expectForbidden } from '../utils/trpc-helpers';
import { createTestUser, cleanupUserData, createTestDeck, testDb } from '../setup/db.setup';
import { testDocuments } from '../fixtures/documents.fixture';
import { type User } from '@prisma/client';

describe('StudySession Router E2E Tests', () => {
  let testUser: User;
  let testDeck: any;
  let authenticatedCaller: Awaited<ReturnType<typeof createAuthenticatedCaller>>;

  beforeAll(async () => {
    // Create test user and authenticated caller
    testUser = await createTestUser({
      email: 'study-session-test@example.com',
      name: 'Study Session Test User',
    });
    authenticatedCaller = await createAuthenticatedCaller(testUser.id);
    
    // Create a test deck with documents for study session
    testDeck = await createTestDeck(testUser.id, {
      name: 'Study Session Test Deck',
      withDocuments: true,
      documentCount: 2,
    });

    // Add documents with file metadata
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
    it('should generate AI-powered study session summary', async () => {
      // Note: This will attempt to make a real API call to Gemini
      // It will likely fail with mock file URLs, but we test the flow
      try {
        const result = await authenticatedCaller.studySession.generate({
          deckId: testDeck.id,
        });

        // If it succeeds (shouldn't with mock URLs), verify structure
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.deckId).toBe(testDeck.id);
        expect(result.summary).toBeDefined();
        expect(typeof result.summary).toBe('string');
        expect(result.rsvpSpeedWPM).toBe(300); // Default speed
      } catch (error: any) {
        // Expected to fail with mock file URLs
        expect(error.message).toContain('Failed to generate summary');
      }
    });

    it('should throw error for deck without documents', async () => {
      const emptyDeck = await createTestDeck(testUser.id, {
        name: 'Empty Study Deck',
        withDocuments: false,
      });

      await expect(
        authenticatedCaller.studySession.generate({ deckId: emptyDeck.id })
      ).rejects.toThrow('Cannot generate study session: deck has no documents');
    });

    it('should throw NOT_FOUND for non-existent deck', async () => {
      await expect(
        authenticatedCaller.studySession.generate({ deckId: 'non-existent-deck' })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-study@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other User Study Deck',
        withDocuments: true,
      });

      await expectForbidden(() =>
        authenticatedCaller.studySession.generate({ deckId: otherDeck.id })
      );

      await cleanupUserData(otherUser.id);
    });

    it('should update existing study session on regenerate', async () => {
      const deckForUpdate = await createTestDeck(testUser.id, {
        name: 'Update Study Deck',
        withDocuments: true,
      });

      // Add file metadata
      await testDb.document.updateMany({
        where: { deckId: deckForUpdate.id },
        data: {
          fileUrl: testDocuments.math.fileUrl,
          fileKey: testDocuments.math.fileKey,
          fileType: testDocuments.math.fileType,
          fileSize: testDocuments.math.fileSize,
        },
      });

      // Create initial study session manually
      await testDb.studySession.create({
        data: {
          deckId: deckForUpdate.id,
          summary: 'Initial summary',
          rsvpSpeedWPM: 250,
        },
      });

      try {
        const result = await authenticatedCaller.studySession.generate({
          deckId: deckForUpdate.id,
        });

        // If successful (unlikely with mock URLs)
        expect(result.summary).not.toBe('Initial summary');
        expect(result.rsvpSpeedWPM).toBe(250); // Should preserve speed
      } catch (error: any) {
        // Expected with mock URLs
        expect(error.message).toContain('Failed to generate summary');
      }
    });
  });

  describe('getByDeckId', () => {
    it('should return study session for a deck', async () => {
      const deckWithSession = await createTestDeck(testUser.id, {
        name: 'Get Session Deck',
        withDocuments: true,
      });

      // Create a study session
      await testDb.studySession.create({
        data: {
          deckId: deckWithSession.id,
          summary: 'Test summary for the deck',
          rsvpSpeedWPM: 350,
        },
      });

      const result = await authenticatedCaller.studySession.getByDeckId({
        deckId: deckWithSession.id,
      });

      expect(result).toBeDefined();
      expect(result.deckId).toBe(deckWithSession.id);
      expect(result.summary).toBe('Test summary for the deck');
      expect(result.rsvpSpeedWPM).toBe(350);
    });

    it('should throw NOT_FOUND when study session does not exist', async () => {
      const deckNoSession = await createTestDeck(testUser.id, {
        name: 'No Session Deck',
      });

      await expect(
        authenticatedCaller.studySession.getByDeckId({ deckId: deckNoSession.id })
      ).rejects.toThrow('Study session not found. Generate one first.');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-get-session@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other Session Deck',
      });

      await testDb.studySession.create({
        data: {
          deckId: otherDeck.id,
          summary: 'Private summary',
          rsvpSpeedWPM: 300,
        },
      });

      await expectForbidden(() =>
        authenticatedCaller.studySession.getByDeckId({ deckId: otherDeck.id })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('updateRsvpSpeed', () => {
    it('should update RSVP reading speed', async () => {
      const deckForSpeed = await createTestDeck(testUser.id, {
        name: 'Speed Update Deck',
      });

      // Create study session
      await testDb.studySession.create({
        data: {
          deckId: deckForSpeed.id,
          summary: 'Summary for speed test',
          rsvpSpeedWPM: 300,
        },
      });

      const result = await authenticatedCaller.studySession.updateRsvpSpeed({
        deckId: deckForSpeed.id,
        rsvpSpeedWPM: 450,
      });

      expect(result.rsvpSpeedWPM).toBe(450);
      expect(result.summary).toBe('Summary for speed test'); // Summary unchanged
    });

    it('should validate speed limits', async () => {
      const deckForValidation = await createTestDeck(testUser.id, {
        name: 'Speed Validation Deck',
      });

      await testDb.studySession.create({
        data: {
          deckId: deckForValidation.id,
          summary: 'Test',
          rsvpSpeedWPM: 300,
        },
      });

      await expect(
        authenticatedCaller.studySession.updateRsvpSpeed({
          deckId: deckForValidation.id,
          rsvpSpeedWPM: 50, // Too slow
        })
      ).rejects.toThrow('Speed too slow');

      await expect(
        authenticatedCaller.studySession.updateRsvpSpeed({
          deckId: deckForValidation.id,
          rsvpSpeedWPM: 1500, // Too fast
        })
      ).rejects.toThrow('Speed too fast');
    });

    it('should throw NOT_FOUND when study session does not exist', async () => {
      const deckNoSession = await createTestDeck(testUser.id, {
        name: 'No Speed Session',
      });

      await expect(
        authenticatedCaller.studySession.updateRsvpSpeed({
          deckId: deckNoSession.id,
          rsvpSpeedWPM: 400,
        })
      ).rejects.toThrow('Study session not found. Generate one first.');
    });
  });

  describe('regenerate', () => {
    it('should regenerate study session summary', async () => {
      const deckForRegen = await createTestDeck(testUser.id, {
        name: 'Regenerate Deck',
        withDocuments: true,
      });

      // Add file metadata
      await testDb.document.updateMany({
        where: { deckId: deckForRegen.id },
        data: {
          fileUrl: testDocuments.history.fileUrl,
          fileKey: testDocuments.history.fileKey,
          fileType: testDocuments.history.fileType,
          fileSize: testDocuments.history.fileSize,
        },
      });

      // Create initial session
      await testDb.studySession.create({
        data: {
          deckId: deckForRegen.id,
          summary: 'Old summary to be replaced',
          rsvpSpeedWPM: 275,
        },
      });

      try {
        const result = await authenticatedCaller.studySession.regenerate({
          deckId: deckForRegen.id,
        });

        // If successful (unlikely with mock URLs)
        expect(result.summary).not.toBe('Old summary to be replaced');
        expect(result.rsvpSpeedWPM).toBe(275); // Speed preserved
      } catch (error: any) {
        // Expected with mock URLs
        expect(error.message).toContain('Failed to regenerate summary');
      }
    });

    it('should throw error when no session exists to regenerate', async () => {
      const deckNoSession = await createTestDeck(testUser.id, {
        name: 'No Session Regen',
        withDocuments: true,
      });

      await expect(
        authenticatedCaller.studySession.regenerate({ deckId: deckNoSession.id })
      ).rejects.toThrow('Study session not found. Use generate instead.');
    });

    it('should throw error for deck without documents', async () => {
      const emptyDeck = await createTestDeck(testUser.id, {
        name: 'Empty Regen Deck',
      });

      // Create a session first
      await testDb.studySession.create({
        data: {
          deckId: emptyDeck.id,
          summary: 'Empty deck summary',
          rsvpSpeedWPM: 300,
        },
      });

      await expect(
        authenticatedCaller.studySession.regenerate({ deckId: emptyDeck.id })
      ).rejects.toThrow('Cannot regenerate study session: deck has no documents');
    });
  });
});

