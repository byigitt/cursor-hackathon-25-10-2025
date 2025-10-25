import { postRouter } from "~/server/api/routers/post";
import { deckRouter } from "~/server/api/routers/deck";
import { documentRouter } from "~/server/api/routers/document";
import { studySessionRouter } from "~/server/api/routers/studySession";
import { quizRouter } from "~/server/api/routers/quiz";
import { quizAttemptRouter } from "~/server/api/routers/quizAttempt";
import { gamificationRouter } from "~/server/api/routers/gamification";
import { flashcardRouter } from "~/server/api/routers/flashcard";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  deck: deckRouter,
  document: documentRouter,
  studySession: studySessionRouter,
  quiz: quizRouter,
  quizAttempt: quizAttemptRouter,
  gamification: gamificationRouter,
  flashcard: flashcardRouter,
});

export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
