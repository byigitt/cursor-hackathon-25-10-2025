import { PrismaClient } from '@prisma/client';
import { type User } from '@prisma/client';

const prisma = new PrismaClient();

export const testDb = prisma;

/**
 * Create a test user for authenticated tests with retry logic for unique constraint violations
 */
export async function createTestUser(data?: Partial<User>): Promise<User> {
  const maxAttempts = 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      const pid = process.pid;
      const uniqueId = `test-user-${timestamp}-${random}-${pid}-${attempt}`;
      
      // For retries, always generate a new unique email to avoid constraint conflicts
      const baseEmail = data?.email || `test-${timestamp}-${random}-${pid}@example.com`;
      const email = attempt > 0 
        ? `test-${timestamp}-${random}-${pid}-${attempt}@example.com`
        : baseEmail;
      
      const user = await prisma.user.create({
        data: {
          id: data?.id || uniqueId,
          email: email,
          name: data?.name || 'Test User',
          // Spread data but override email to ensure uniqueness on retries
          ...(data && { ...data, email }),
        },
      });
      return user;
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a unique constraint violation
      if (error?.code === 'P2002' && attempt < maxAttempts - 1) {
        // Wait a bit before retrying to reduce collision probability
        await new Promise(resolve => setTimeout(resolve, 50 * (attempt + 1)));
        continue;
      }
      
      // If it's not a unique constraint error or we've exhausted attempts, throw
      throw error;
    }
  }
  
  throw lastError || new Error('Failed to create test user after multiple attempts');
}

/**
 * Clean up test data for a specific user
 */
export async function cleanupUserData(userId: string): Promise<void> {
  try {
    // Delete deck-related data first (before deleting decks)
    const userDecks = await prisma.deck.findMany({
      where: { userId },
      select: { id: true },
    });
    
    for (const deck of userDecks) {
      await cleanupDeckData(deck.id);
    }
    
    // Delete user answers (must be before quiz attempts)
    await prisma.userAnswer.deleteMany({
      where: { quizAttempt: { userId } },
    });
    
    // Delete quiz attempts
    await prisma.quizAttempt.deleteMany({
      where: { userId },
    });
    
    // Delete user streak
    await prisma.streak.deleteMany({
      where: { userId },
    });
    
    // Delete decks
    await prisma.deck.deleteMany({
      where: { userId },
    });
    
    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    }).catch(() => {
      // User might already be deleted, that's ok
    });
  } catch (error) {
    console.error(`Error cleaning up user data for ${userId}:`, error);
    // Don't throw - allow tests to continue
  }
}

/**
 * Clean up all data for a specific deck
 */
export async function cleanupDeckData(deckId: string): Promise<void> {
  try {
    // Get all quizzes for this deck
    const quizzes = await prisma.quiz.findMany({
      where: { deckId },
      select: { id: true },
    });
    
    // Delete quiz attempts and answers first (deepest level)
    for (const quiz of quizzes) {
      // Delete user answers first (they depend on quiz attempts)
      await prisma.userAnswer.deleteMany({
        where: { quizAttempt: { quizId: quiz.id } },
      });
      // Then delete quiz attempts
      await prisma.quizAttempt.deleteMany({
        where: { quizId: quiz.id },
      });
    }
    
    // Delete quiz options (they depend on questions)
    await prisma.option.deleteMany({
      where: { question: { quiz: { deckId } } },
    });
    
    // Delete quiz questions
    await prisma.question.deleteMany({
      where: { quiz: { deckId } },
    });
    
    // Delete quizzes
    await prisma.quiz.deleteMany({
      where: { deckId },
    });
    
    // Delete other deck-related data (no foreign key dependencies)
    await prisma.flashcard.deleteMany({
      where: { deckId },
    });
    
    await prisma.studySession.deleteMany({
      where: { deckId },
    });
    
    await prisma.document.deleteMany({
      where: { deckId },
    });
  } catch (error) {
    console.error(`Error cleaning up deck data for ${deckId}:`, error);
    // Don't throw - allow tests to continue
  }
}

/**
 * Create a test deck with optional documents
 */
export async function createTestDeck(
  userId: string,
  options?: {
    name?: string;
    withDocuments?: boolean;
    documentCount?: number;
  }
): Promise<any> {
  const deck = await prisma.deck.create({
    data: {
      name: options?.name || 'Test Deck ' + Date.now(),
      userId,
    },
  });

  if (options?.withDocuments) {
    const documentCount = options.documentCount || 2;
    for (let i = 0; i < documentCount; i++) {
      await prisma.document.create({
        data: {
          name: `Test Document ${i + 1}`,
          fileUrl: `https://test.example.com/documents/test-${i + 1}.pdf`,
          fileKey: `test-file-key-${i + 1}`,
          fileType: 'pdf',
          fileSize: 1024 * (i + 1),
          deckId: deck.id,
        },
      });
    }
  }

  return prisma.deck.findUnique({
    where: { id: deck.id },
    include: {
      documents: true,
    },
  });
}

/**
 * Disconnect database after tests
 */
export async function disconnectDb(): Promise<void> {
  await prisma.$disconnect();
}

