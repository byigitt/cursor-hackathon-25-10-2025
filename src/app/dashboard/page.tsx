import { ArrowRight, Rocket, GraduationCap, CreditCard } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  const [streak, deckCount, quizStats, recentDecks, upcomingFlashcards] = await Promise.all([
    db.streak.findUnique({
      where: { userId: session.user.id },
      select: { currentStreak: true },
    }),
    db.deck.count({
      where: { userId: session.user.id },
    }),
    db.quizAttempt.aggregate({
      where: { userId: session.user.id },
      _avg: { score: true },
      _count: true,
    }),
    db.deck.findMany({
      where: { userId: session.user.id },
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        studySession: {
          select: {
            id: true,
          },
        },
      },
    }),
    db.flashcard.findMany({
      where: {
        deck: {
          userId: session.user.id,
        },
      },
      take: 2,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        frontText: true,
        deck: {
          select: {
            name: true,
          },
        },
      },
    }),
  ]);

  const firstName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  const currentStreak = streak?.currentStreak ?? 0;
  const avgScore = quizStats._avg.score ? Math.round(quizStats._avg.score) : 0;

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Welcome back, {firstName}!
          </p>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            Here's a summary of your learning activity.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">Daily Streak</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{currentStreak} days</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">Documents Read</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{deckCount}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
          <p className="text-base font-medium text-gray-600 dark:text-gray-400">Quiz Success Rate</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgScore}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Documents */}
        <div className="lg:col-span-2">
          <h2 className="text-[22px] font-bold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
            Recent Documents
          </h2>
          {recentDecks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentDecks.map((deck) => (
                <div key={deck.id} className="p-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{deck.name}</h3>
                  <Progress value={deck.studySession ? 50 : 0} className="h-2" />
                  <Button
                    variant="secondary"
                    className="mt-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-500"
                  >
                    {deck.studySession ? 'Continue Reading' : 'Start Reading'}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] text-center">
              <p className="text-gray-500 dark:text-gray-400">No documents yet. Upload your first document to get started!</p>
            </div>
          )}
        </div>

        {/* Upcoming Flashcards */}
        <div>
          <h2 className="text-[22px] font-bold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
            Recent Flashcards
          </h2>
          {upcomingFlashcards.length > 0 ? (
            <div className="space-y-4">
              {upcomingFlashcards.map((flashcard) => (
                <div key={flashcard.id} className="p-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{flashcard.frontText.slice(0, 30)}...</h3>
                    <p className="text-sm text-gray-500 dark:text-[#92adc9]">{flashcard.deck.name}</p>
                  </div>
                  <button className="text-blue-600 dark:text-blue-500">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] text-center">
              <p className="text-gray-500 dark:text-gray-400">No flashcards yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Get Started */}
      <div>
        <h2 className="text-[22px] font-bold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
          Get Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-blue-600/50 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/60 dark:text-blue-500 text-center cursor-pointer hover:bg-blue-600/20 dark:hover:bg-blue-500/30 transition-colors">
            <Rocket className="h-10 w-10 mb-2" />
            <p className="font-semibold">Start Fast Reading</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-blue-600/50 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/60 dark:text-blue-500 text-center cursor-pointer hover:bg-blue-600/20 dark:hover:bg-blue-500/30 transition-colors">
            <GraduationCap className="h-10 w-10 mb-2" />
            <p className="font-semibold">Take a Quiz</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-blue-600/50 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/60 dark:text-blue-500 text-center cursor-pointer hover:bg-blue-600/20 dark:hover:bg-blue-500/30 transition-colors">
            <CreditCard className="h-10 w-10 mb-2" />
            <p className="font-semibold">Review Flashcards</p>
          </div>
        </div>
      </div>
    </>
  );
}