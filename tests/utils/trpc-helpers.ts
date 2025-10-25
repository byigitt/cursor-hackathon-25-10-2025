import { type Session } from 'next-auth';
import { appRouter, type AppRouter } from '~/server/api/root';
import { createTRPCContext } from '~/server/api/trpc';
import { createCallerFactory } from '~/server/api/trpc';
import { testDb } from '../setup/db.setup';

/**
 * Create a test session for authenticated requests
 */
export function createTestSession(userId: string): Session {
  return {
    user: {
      id: userId,
      email: `test-${userId}@example.com`,
      name: 'Test User',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  };
}

/**
 * Create a test context for tRPC procedures
 */
export async function createTestContext(options?: {
  session?: Session | null;
}) {
  return createTRPCContext({
    headers: new Headers(),
  }).then(ctx => ({
    ...ctx,
    session: options?.session ?? null,
    db: testDb,
  }));
}

/**
 * Create an authenticated test caller
 */
export async function createAuthenticatedCaller(userId: string) {
  const session = createTestSession(userId);
  const context = await createTestContext({ session });
  const createCaller = createCallerFactory(appRouter);
  return createCaller(context);
}

/**
 * Create an unauthenticated test caller
 */
export async function createUnauthenticatedCaller() {
  const context = await createTestContext({ session: null });
  const createCaller = createCallerFactory(appRouter);
  return createCaller(context);
}

/**
 * Helper to test protected procedures without auth
 */
export async function expectUnauthorized(
  procedure: () => Promise<any>
): Promise<void> {
  await expect(procedure()).rejects.toThrow('UNAUTHORIZED');
}

/**
 * Helper to test not found errors
 */
export async function expectNotFound(
  procedure: () => Promise<any>
): Promise<void> {
  await expect(procedure()).rejects.toThrow('NOT_FOUND');
}

/**
 * Helper to test forbidden errors
 */
export async function expectForbidden(
  procedure: () => Promise<any>
): Promise<void> {
  await expect(procedure()).rejects.toThrow('FORBIDDEN');
}

