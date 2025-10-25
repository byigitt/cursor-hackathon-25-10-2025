"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { CheckCircle2, XCircle, RefreshCw, Home, Zap, BookOpen, ThumbsUp, ThumbsDown } from "lucide-react";

export default function QuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params.attemptId as string;
  const quizId = params.quizId as string;

  const { data: attempt, isLoading } = api.quizAttempt.getById.useQuery({
    id: attemptId,
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-12 w-96" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!attempt) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Quiz sonuçları bulunamadı.</AlertDescription>
      </Alert>
    );
  }

  const correctCount = attempt.detailedResults.filter(
    (result) => result.isCorrect
  ).length;
  const wrongCount = attempt.detailedResults.length - correctCount;
  const totalQuestions = attempt.detailedResults.length;
  const score = Math.round(attempt.score);

  // Calculate completion time (if available)
  const completionTime = "5:23"; // Placeholder - you can calculate this from createdAt if you track startTime

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Heading */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white">
          Quiz Sonuçları: {attempt.quiz.deck.name}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Success Rate */}
        <Card className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#324d67]">
          <CardContent className="p-6 space-y-2">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Başarı Oranı
            </p>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-green-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${score}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-900 dark:text-white">
                  {score}%
                </p>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {totalQuestions} Sorudan {correctCount}'i Doğru
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Correct Answers */}
        <Card className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#324d67]">
          <CardContent className="p-6 space-y-2">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Doğru
            </p>
            <p className="text-4xl font-bold text-green-500">{correctCount}</p>
          </CardContent>
        </Card>

        {/* Wrong Answers */}
        <Card className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#324d67]">
          <CardContent className="p-6 space-y-2">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Yanlış
            </p>
            <p className="text-4xl font-bold text-red-500">{wrongCount}</p>
          </CardContent>
        </Card>

        {/* Completion Time */}
        <Card className="bg-white dark:bg-[#1a2632] border border-gray-200 dark:border-[#324d67]">
          <CardContent className="p-6 space-y-2">
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Tamamlama Süresi
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {completionTime}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary Section */}
      {wrongCount > 0 && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-blue-900 dark:text-white text-xl font-bold">
              Geliştirmen Gereken Konular için Yapay Zeka Özeti
            </h2>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              Quiz sonuçlarınıza göre, bazı konuları tekrar gözden geçirmeniz
              faydalı olabilir. Yanlış cevapladığınız sorular, bu alanlarda daha
              fazla çalışmanız gerektiğini gösteriyor. Aşağıdaki cevap analizinde
              detayları görebilirsiniz.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Button className="gap-2">
                <Zap className="h-4 w-4" />
                Bu Özeti Hızlı Oku (RSVP)
              </Button>
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Dokümana Geri Dön
              </Button>
              <div className="flex-grow" />
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bu özet faydalı mıydı?
                </p>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Answers Analysis */}
      <Card className="bg-white dark:bg-[#111a22]">
        <CardHeader className="border-b border-gray-200 dark:border-[#324d67]">
          <CardTitle className="text-xl">Cevaplarının Analizi</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-[#324d67]">
            {attempt.detailedResults.map((result, index) => (
              <div
                key={result.question.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div
                  className={`flex items-center justify-center rounded-lg shrink-0 w-12 h-12 ${
                    result.isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {result.isCorrect ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <XCircle className="h-6 w-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 dark:text-white line-clamp-1">
                    Soru {index + 1}: {result.question.questionText}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    Cevabın: {result.selectedOption.optionText}
                  </p>
                </div>
                <div className="hidden md:block shrink-0">
                  <p
                    className={`text-base font-medium ${
                      result.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.isCorrect
                      ? "Doğru!"
                      : `Doğru Cevap: ${result.correctOption?.optionText}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 py-8">
        <Button
          className="gap-2"
          onClick={() => router.push(`/dashboard/quizzes/${quizId}`)}
        >
          <RefreshCw className="h-4 w-4" />
          Quizi Tekrarla
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="gap-2"
        >
          <Home className="h-4 w-4" />
          Anasayfa
        </Button>
      </div>
    </div>
  );
}

