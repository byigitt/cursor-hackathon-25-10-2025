import { z } from "zod";

// Get leaderboard
export const getLeaderboardSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
});

// Internal: Update streak (used internally, not exposed directly)
export const updateStreakSchema = z.object({
  userId: z.string().cuid("Invalid user ID"),
});
