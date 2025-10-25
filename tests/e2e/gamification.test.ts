import { createAuthenticatedCaller, createUnauthenticatedCaller } from '../utils/trpc-helpers';
import { createTestUser, cleanupUserData, testDb } from '../setup/db.setup';
import { type User } from '@prisma/client';

describe('Gamification Router E2E Tests', () => {
  let testUser: User;
  let authenticatedCaller: Awaited<ReturnType<typeof createAuthenticatedCaller>>;
  let unauthenticatedCaller: Awaited<ReturnType<typeof createUnauthenticatedCaller>>;

  beforeAll(async () => {
    testUser = await createTestUser({
      email: 'gamification-test@example.com',
      name: 'Gamification Test User',
    });
    authenticatedCaller = await createAuthenticatedCaller(testUser.id);
    unauthenticatedCaller = await createUnauthenticatedCaller();
  });

  afterAll(async () => {
    await cleanupUserData(testUser.id);
  });

  describe('getMyStreak', () => {
    it('should return current user streak', async () => {
      const result = await authenticatedCaller.gamification.getMyStreak();

      expect(result).toBeDefined();
      expect(result.userId).toBe(testUser.id);
      expect(result.currentStreak).toBeGreaterThanOrEqual(0);
      expect(result.longestStreak).toBeGreaterThanOrEqual(0);
      expect(result.lastActivityDate).toBeInstanceOf(Date);
    });

    it('should create streak if it does not exist', async () => {
      // Create a new user without a streak
      const newUser = await createTestUser({
        email: 'no-streak@example.com',
        name: 'No Streak User',
      });
      const newCaller = await createAuthenticatedCaller(newUser.id);

      // First call should create the streak
      const result = await newCaller.gamification.getMyStreak();

      expect(result).toBeDefined();
      expect(result.userId).toBe(newUser.id);
      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(0);

      // Verify streak was created in database
      const streak = await testDb.streak.findUnique({
        where: { userId: newUser.id },
      });
      expect(streak).toBeDefined();

      await cleanupUserData(newUser.id);
    });

    it('should require authentication', async () => {
      await expect(
        unauthenticatedCaller.gamification.getMyStreak()
      ).rejects.toThrow(/UNAUTHORIZED|Unauthorized/);
    });
  });

  describe('getLeaderboard', () => {
    it('should return top users by longest streak', async () => {
      // Create test users with different streaks
      const user1 = await createTestUser({
        email: 'leader1@example.com',
        name: 'Leader 1',
      });
      const user2 = await createTestUser({
        email: 'leader2@example.com',
        name: 'Leader 2',
      });
      const user3 = await createTestUser({
        email: 'leader3@example.com',
        name: 'Leader 3',
      });

      // Create streaks with different values
      await testDb.streak.create({
        data: {
          userId: user1.id,
          currentStreak: 10,
          longestStreak: 15,
          lastActivityDate: new Date(),
        },
      });
      await testDb.streak.create({
        data: {
          userId: user2.id,
          currentStreak: 5,
          longestStreak: 20,
          lastActivityDate: new Date(),
        },
      });
      await testDb.streak.create({
        data: {
          userId: user3.id,
          currentStreak: 8,
          longestStreak: 8,
          lastActivityDate: new Date(),
        },
      });

      const result = await unauthenticatedCaller.gamification.getLeaderboard({
        limit: 10,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(3);

      // Find our test users in the leaderboard
      const leader2Entry = result.find((entry: any) => entry.userId === user2.id);
      const leader1Entry = result.find((entry: any) => entry.userId === user1.id);

      expect(leader2Entry).toBeDefined();
      expect(leader1Entry).toBeDefined();

      // Verify ordering (user2 should be higher than user1)
      if (leader2Entry && leader1Entry) {
        expect(leader2Entry.rank).toBeLessThan(leader1Entry.rank);
        expect(leader2Entry.longestStreak).toBe(20);
        expect(leader1Entry.longestStreak).toBe(15);
      }

      // Clean up test users
      await cleanupUserData(user1.id);
      await cleanupUserData(user2.id);
      await cleanupUserData(user3.id);
    });

    it('should respect limit parameter', async () => {
      const result = await unauthenticatedCaller.gamification.getLeaderboard({
        limit: 5,
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it('should only include users with streaks > 0', async () => {
      const result = await unauthenticatedCaller.gamification.getLeaderboard({
        limit: 100,
      });

      result.forEach((entry: any) => {
        expect(entry.longestStreak).toBeGreaterThan(0);
      });
    });

    it('should work for unauthenticated users', async () => {
      // This is a public endpoint
      const result = await unauthenticatedCaller.gamification.getLeaderboard({
        limit: 10,
      });

      expect(Array.isArray(result)).toBe(true);
    });

    it('should include user details in leaderboard', async () => {
      // Create a user with a good streak
      const leaderUser = await createTestUser({
        email: 'detailed-leader@example.com',
        name: 'Detailed Leader',
      });

      await testDb.streak.create({
        data: {
          userId: leaderUser.id,
          currentStreak: 25,
          longestStreak: 30,
          lastActivityDate: new Date(),
        },
      });

      const result = await unauthenticatedCaller.gamification.getLeaderboard({
        limit: 50,
      });

      const leaderEntry = result.find((entry: any) => entry.userId === leaderUser.id);

      expect(leaderEntry).toBeDefined();
      if (leaderEntry) {
        expect(leaderEntry.userName).toBe('Detailed Leader');
        expect(leaderEntry.userImage).toBeDefined(); // Can be null
        expect(leaderEntry.currentStreak).toBe(25);
        expect(leaderEntry.longestStreak).toBe(30);
        expect(leaderEntry.lastActivityDate).toBeDefined();
        expect(leaderEntry.rank).toBeGreaterThanOrEqual(1);
      }

      await cleanupUserData(leaderUser.id);
    });

    it('should use default limit when not provided', async () => {
      const result = await unauthenticatedCaller.gamification.getLeaderboard({});

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(10); // Default limit
    });
  });
});

