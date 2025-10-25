import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getLeaderboardSchema } from "~/server/schemas/gamification";

export const gamificationRouter = createTRPCRouter({
  // READ: Get current user's streak
  getMyStreak: protectedProcedure
    .query(async ({ ctx }) => {
      let streak = await ctx.db.streak.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      });

      // Create streak if it doesn't exist
      if (!streak) {
        streak = await ctx.db.streak.create({
          data: {
            userId: ctx.session.user.id,
            currentStreak: 0,
            longestStreak: 0,
            lastActivityDate: new Date(),
          },
        });
      }

      return streak;
    }),

  // READ: Get leaderboard (top users by longest streak)
  getLeaderboard: publicProcedure
    .input(getLeaderboardSchema)
    .query(async ({ ctx, input }) => {
      const topStreaks = await ctx.db.streak.findMany({
        where: {
          longestStreak: {
            gt: 0, // Only include users with at least 1 day streak
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          longestStreak: "desc",
        },
        take: input.limit,
      });

      return topStreaks.map((streak, index) => ({
        rank: index + 1,
        userId: streak.user.id,
        userName: streak.user.name || "Anonymous",
        userImage: streak.user.image,
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastActivityDate: streak.lastActivityDate,
      }));
    }),
});
