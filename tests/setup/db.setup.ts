import { PrismaClient } from '@prisma/client';
import { type User } from '@prisma/client';

const prisma = new PrismaClient();

export const testDb = prisma;

/**
 * Create a test user for authenticated tests
 */
export async function createTestUser(data?: Partial<User>): Promise<User> {
  const user = await prisma.user.create({
    data: {
      id: data?.id || 'test-user-' + Date.now(),
      email: data?.email || `test-${Date.now()}@example.com`,
      name: data?.name || 'Test User',
      ...data,
    },
  });
  return user;
}

/**
 * Clean up test data for a specific user
 */
export async function cleanupUserData(userId: string): Promise<void> {
  // Delete in order of dependencies
  await prisma.userAnswer.deleteMany({
    where: { quizAttempt: { userId } },
  });
  
  await prisma.quizAttempt.deleteMany({
    where: { userId },
  });
  
  await prisma.streak.deleteMany({
    where: { userId },
  });
  
  // Delete deck-related data
  const userDecks = await prisma.deck.findMany({
    where: { userId },
    select: { id: true },
  });
  
  for (const deck of userDecks) {
    await cleanupDeckData(deck.id);
  }
  
  await prisma.deck.deleteMany({
    where: { userId },
  });
  
  // Delete the user
  await prisma.user.delete({
    where: { id: userId },
  });
}

/**
 * Clean up all data for a specific deck
 */
export async function cleanupDeckData(deckId: string): Promise<void> {
  // Delete quiz attempts and answers
  const quizzes = await prisma.quiz.findMany({
    where: { deckId },
    select: { id: true },
  });
  
  for (const quiz of quizzes) {
    await prisma.userAnswer.deleteMany({
      where: { quizAttempt: { quizId: quiz.id } },
    });
    await prisma.quizAttempt.deleteMany({
      where: { quizId: quiz.id },
    });
  }
  
  // Delete quiz questions and options
  await prisma.option.deleteMany({
    where: { question: { quiz: { deckId } } },
  });
  
  await prisma.question.deleteMany({
    where: { quiz: { deckId } },
  });
  
  await prisma.quiz.deleteMany({
    where: { deckId },
  });
  
  // Delete other deck-related data
  await prisma.flashcard.deleteMany({
    where: { deckId },
  });
  
  await prisma.studySession.deleteMany({
    where: { deckId },
  });
  
  await prisma.document.deleteMany({
    where: { deckId },
  });
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

