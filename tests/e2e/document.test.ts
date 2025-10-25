import { createAuthenticatedCaller, expectUnauthorized, expectForbidden } from '../utils/trpc-helpers';
import { createTestUser, cleanupUserData, createTestDeck, testDb } from '../setup/db.setup';
import { testDocuments } from '../fixtures/documents.fixture';
import { type User } from '@prisma/client';

describe('Document Router E2E Tests', () => {
  let testUser: User;
  let testDeck: any;
  let authenticatedCaller: Awaited<ReturnType<typeof createAuthenticatedCaller>>;

  beforeAll(async () => {
    // Create test user and authenticated caller
    testUser = await createTestUser({
      email: 'document-test@example.com',
      name: 'Document Test User',
    });
    authenticatedCaller = await createAuthenticatedCaller(testUser.id);
    
    // Create a test deck for document operations
    testDeck = await createTestDeck(testUser.id, { name: 'Document Test Deck' });
  });

  afterAll(async () => {
    // Clean up test data
    await cleanupUserData(testUser.id);
  });

  describe('create', () => {
    it('should add a document to a deck', async () => {
      const documentData = {
        deckId: testDeck.id,
        name: testDocuments.science.name,
        fileUrl: testDocuments.science.fileUrl,
        fileKey: testDocuments.science.fileKey,
        fileType: testDocuments.science.fileType,
        fileSize: testDocuments.science.fileSize,
      };

      const result = await authenticatedCaller.document.create(documentData);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(documentData.name);
      expect(result.fileUrl).toBe(documentData.fileUrl);
      expect(result.deckId).toBe(testDeck.id);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should validate document data', async () => {
      await expect(
        authenticatedCaller.document.create({
          deckId: testDeck.id,
          name: '',
          fileUrl: testDocuments.science.fileUrl,
          fileKey: testDocuments.science.fileKey,
          fileType: testDocuments.science.fileType,
          fileSize: testDocuments.science.fileSize,
        })
      ).rejects.toThrow('Document name is required');

      await expect(
        authenticatedCaller.document.create({
          deckId: testDeck.id,
          name: 'Test Doc',
          fileUrl: 'not-a-url',
          fileKey: testDocuments.science.fileKey,
          fileType: testDocuments.science.fileType,
          fileSize: testDocuments.science.fileSize,
        })
      ).rejects.toThrow('Invalid file URL');
    });

    it('should throw NOT_FOUND for non-existent deck', async () => {
      await expect(
        authenticatedCaller.document.create({
          deckId: 'non-existent-deck',
          name: testDocuments.science.name,
          fileUrl: testDocuments.science.fileUrl,
          fileKey: testDocuments.science.fileKey,
          fileType: testDocuments.science.fileType,
          fileSize: testDocuments.science.fileSize,
        })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'other-document@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, { name: 'Other User Deck' });

      await expect(
        authenticatedCaller.document.create({
          deckId: otherDeck.id,
          name: testDocuments.science.name,
          fileUrl: testDocuments.science.fileUrl,
          fileKey: testDocuments.science.fileKey,
          fileType: testDocuments.science.fileType,
          fileSize: testDocuments.science.fileSize,
        })
      ).rejects.toThrow('FORBIDDEN');

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getByDeckId', () => {
    it('should return all documents for a deck', async () => {
      // Create a deck with documents
      const deckWithDocs = await createTestDeck(testUser.id, {
        name: 'Deck with Documents',
        withDocuments: true,
        documentCount: 3,
      });

      // Also add a document with file metadata
      await testDb.document.create({
        data: {
          name: testDocuments.math.name,
          fileUrl: testDocuments.math.fileUrl,
          fileKey: testDocuments.math.fileKey,
          fileType: testDocuments.math.fileType,
          fileSize: testDocuments.math.fileSize,
          deckId: deckWithDocs.id,
        },
      });

      const result = await authenticatedCaller.document.getByDeckId({
        deckId: deckWithDocs.id,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(4); // 3 from createTestDeck + 1 we added
      expect(result[0]!.deckId).toBe(deckWithDocs.id);
      
      // Check that documents are ordered by creation
      for (let i = 1; i < result.length; i++) {
        expect(result[i]!.createdAt.getTime()).toBeGreaterThanOrEqual(
          result[i - 1]!.createdAt.getTime()
        );
      }
    });

    it('should return empty array for deck with no documents', async () => {
      const emptyDeck = await createTestDeck(testUser.id, { name: 'Empty Deck' });
      
      const result = await authenticatedCaller.document.getByDeckId({
        deckId: emptyDeck.id,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should throw FORBIDDEN for other user deck', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-docs@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Private Deck',
        withDocuments: true,
      });

      await expectForbidden(() =>
        authenticatedCaller.document.getByDeckId({ deckId: otherDeck.id })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('getById', () => {
    it('should return a specific document', async () => {
      const deckWithDoc = await createTestDeck(testUser.id, {
        name: 'Get By ID Deck',
        withDocuments: true,
        documentCount: 1,
      });

      const documents = await testDb.document.findMany({
        where: { deckId: deckWithDoc.id },
      });
      const documentId = documents[0]!.id;

      const result = await authenticatedCaller.document.getById({ id: documentId });

      expect(result).toBeDefined();
      expect(result.id).toBe(documentId);
      expect(result.deck).toBeDefined();
      expect(result.deck.id).toBe(deckWithDoc.id);
    });

    it('should throw NOT_FOUND for non-existent document', async () => {
      await expect(
        authenticatedCaller.document.getById({ id: 'non-existent-doc' })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user document', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-get@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Other Deck',
        withDocuments: true,
      });
      const otherDocs = await testDb.document.findMany({
        where: { deckId: otherDeck.id },
      });

      await expectForbidden(() =>
        authenticatedCaller.document.getById({ id: otherDocs[0]!.id })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('update', () => {
    it('should update document name', async () => {
      const deckWithDoc = await createTestDeck(testUser.id, {
        name: 'Update Test Deck',
        withDocuments: true,
      });
      const docs = await testDb.document.findMany({
        where: { deckId: deckWithDoc.id },
      });
      const docToUpdate = docs[0]!;

      const result = await authenticatedCaller.document.update({
        id: docToUpdate.id,
        name: 'Updated Document Name',
      });

      expect(result.name).toBe('Updated Document Name');
      expect(result.id).toBe(docToUpdate.id);
    });

    it('should throw NOT_FOUND for non-existent document', async () => {
      await expect(
        authenticatedCaller.document.update({
          id: 'non-existent-doc',
          name: 'New Name',
        })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user document', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-update@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Protected Deck',
        withDocuments: true,
      });
      const otherDocs = await testDb.document.findMany({
        where: { deckId: otherDeck.id },
      });

      await expectForbidden(() =>
        authenticatedCaller.document.update({
          id: otherDocs[0]!.id,
          name: 'Hacked Name',
        })
      );

      await cleanupUserData(otherUser.id);
    });
  });

  describe('delete', () => {
    it('should delete a document', async () => {
      const deckWithDoc = await createTestDeck(testUser.id, {
        name: 'Delete Test Deck',
        withDocuments: true,
      });
      const docs = await testDb.document.findMany({
        where: { deckId: deckWithDoc.id },
      });
      const docToDelete = docs[0]!;

      const result = await authenticatedCaller.document.delete({
        id: docToDelete.id,
      });

      expect(result.success).toBe(true);

      // Verify document is deleted
      const deletedDoc = await testDb.document.findUnique({
        where: { id: docToDelete.id },
      });
      expect(deletedDoc).toBeNull();
    });

    it('should throw NOT_FOUND for non-existent document', async () => {
      await expect(
        authenticatedCaller.document.delete({ id: 'non-existent-doc' })
      ).rejects.toThrow('NOT_FOUND');
    });

    it('should throw FORBIDDEN for other user document', async () => {
      const otherUser = await createTestUser({
        email: 'forbidden-delete@example.com',
      });
      const otherDeck = await createTestDeck(otherUser.id, {
        name: 'Protected Delete Deck',
        withDocuments: true,
      });
      const otherDocs = await testDb.document.findMany({
        where: { deckId: otherDeck.id },
      });

      await expectForbidden(() =>
        authenticatedCaller.document.delete({ id: otherDocs[0]!.id })
      );

      // Verify document still exists
      const doc = await testDb.document.findUnique({
        where: { id: otherDocs[0]!.id },
      });
      expect(doc).toBeDefined();

      await cleanupUserData(otherUser.id);
    });
  });
});
