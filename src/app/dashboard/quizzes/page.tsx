"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Search, BookOpen, Clock, TrendingUp, PlayCircle, Plus, Sparkles } from "lucide-react";
import { Badge } from "~/components/ui/badge";

// Component to fetch and display quizzes for a single deck
function DeckQuizzes({ deck, onGenerateQuiz, generatingQuizFor, attemptsByQuiz, getAverageScore, router }: {
  deck: any;
  onGenerateQuiz: (deckId: string) => void;
  generatingQuizFor: string | null;
  attemptsByQuiz: Record<string, any[]>;
  getAverageScore: (quizId: string) => number | null;
  router: ReturnType<typeof useRouter>;
}) {
  const { data: quizzes, isLoading } = api.quiz.getByDeckId.useQuery({ deckId: deck.id });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </Card>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {deck.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bu deste için henüz quiz oluşturulmamış
            </p>
          </div>
          <Button
            onClick={() => onGenerateQuiz(deck.id)}
            disabled={generatingQuizFor === deck.id || deck._count.documents === 0}
            className="gap-2"
          >
            {generatingQuizFor === deck.id ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Oluşturuluyor...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Quiz Oluştur
              </>
            )}
          </Button>
        </div>
        {deck._count.documents === 0 && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            Quiz oluşturmak için önce belge yüklemelisiniz.
          </p>
        )}
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {deck.name}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onGenerateQuiz(deck.id)}
          disabled={generatingQuizFor === deck.id || deck._count.documents === 0}
          className="gap-2"
        >
          {generatingQuizFor === deck.id ? (
            <>
              <Sparkles className="h-4 w-4 animate-pulse" />
              Oluşturuluyor...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Yeni Quiz
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => {
          const averageScore = getAverageScore(quiz.id);
          const attemptCount = attemptsByQuiz?.[quiz.id]?.length || 0;
          const questionCount = quiz._count.questions;

          return (
            <Card
              key={quiz.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => router.push(`/dashboard/quizzes/${quiz.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                  {averageScore !== null && (
                    <Badge
                      variant={
                        averageScore >= 80
                          ? "default"
                          : averageScore >= 60
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {averageScore}%
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4 line-clamp-2">
                  Quiz #{quiz.id.slice(-6)}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(quiz.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Soru Sayısı</span>
                    </div>
                    <span className="font-medium">{questionCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Deneme</span>
                    </div>
                    <span className="font-medium">{attemptCount}</span>
                  </div>
                  {averageScore !== null && (
                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Ortalama</span>
                      </div>
                      <span className="font-medium">{averageScore}%</span>
                    </div>
                  )}
                </div>
                <Button
                  className="w-full gap-2 group-hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/quizzes/${quiz.id}`);
                  }}
                >
                  <PlayCircle className="h-4 w-4" />
                  Quiz Çöz
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function QuizzesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [generatingQuizFor, setGeneratingQuizFor] = useState<string | null>(null);

  const { data: decks, isLoading: decksLoading, refetch: decksRefetch } = api.deck.getAll.useQuery();
  const { data: attempts, isLoading: attemptsLoading } =
    api.quizAttempt.getMyAttempts.useQuery({});

  const generateQuizMutation = api.quiz.generate.useMutation({
    onSuccess: (quiz) => {
      setGeneratingQuizFor(null);
      // Refresh decks to show new quiz
      void decksRefetch();
      // Navigate to the newly created quiz
      router.push(`/dashboard/quizzes/${quiz.id}`);
    },
    onError: (error) => {
      alert(`Quiz oluşturulamadı: ${error.message || "Bilinmeyen bir hata oluştu"}`);
      setGeneratingQuizFor(null);
    },
  });

  type QuizAttempt = NonNullable<typeof attempts>[number];
  type Deck = NonNullable<typeof decks>[number];

  const isLoading = decksLoading || attemptsLoading;

  // Group attempts by quiz
  const attemptsByQuiz = attempts?.reduce(
    (acc: Record<string, QuizAttempt[]>, attempt: QuizAttempt) => {
      const quizId = attempt.quizId;
      if (!acc[quizId]) {
        acc[quizId] = [];
      }
      acc[quizId].push(attempt);
      return acc;
    },
    {} as Record<string, QuizAttempt[]>
  );

  const getAverageScore = (quizId: string) => {
    const quizAttempts = attemptsByQuiz?.[quizId] || [];
    if (quizAttempts.length === 0) return null;
    const sum = quizAttempts.reduce((acc: number, attempt: QuizAttempt) => acc + attempt.score, 0);
    return Math.round(sum / quizAttempts.length);
  };

  const handleGenerateQuiz = async (deckId: string) => {
    setGeneratingQuizFor(deckId);
    generateQuizMutation.mutate({
      deckId,
      questionCount: 10,
    });
  };

  // Filter decks by search query
  const filteredDecks = decks?.filter((deck: Deck) =>
    deck.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count total quizzes across all filtered decks
  const totalQuizCount = filteredDecks?.reduce((sum, deck) => sum + deck._count.quizzes, 0) || 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quizlerim
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Destelerinizdeki quizleri görüntüleyin ve çözün
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Deste ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Desteler</SelectItem>
            <SelectItem value="completed">Çözülmüş</SelectItem>
            <SelectItem value="pending">Bekleyen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quizzes by Deck */}
      {!filteredDecks || filteredDecks.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Henüz deste bulunamadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Önce bir deste oluşturup belge yükleyin, sonra quiz oluşturabilirsiniz.
          </p>
          <Button onClick={() => router.push("/dashboard/documents")}>
            Belge Yükle
          </Button>
        </Card>
      ) : totalQuizCount === 0 ? (
        <Card className="p-12 text-center">
          <Sparkles className="h-12 w-12 mx-auto text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Henüz quiz oluşturulmamış
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Destelerinizden AI destekli quiz oluşturarak başlayın.
          </p>
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            {filteredDecks.map((deck: Deck) => (
              <Button
                key={deck.id}
                onClick={() => handleGenerateQuiz(deck.id)}
                disabled={generatingQuizFor === deck.id || deck._count.documents === 0}
                className="gap-2"
              >
                {generatingQuizFor === deck.id ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    Quiz oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    {deck.name} için Quiz Oluştur
                  </>
                )}
              </Button>
            ))}
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          {filteredDecks.map((deck: Deck) => (
            <DeckQuizzes
              key={deck.id}
              deck={deck}
              onGenerateQuiz={handleGenerateQuiz}
              generatingQuizFor={generatingQuizFor}
              attemptsByQuiz={attemptsByQuiz || {}}
              getAverageScore={getAverageScore}
              router={router}
            />
          ))}
        </div>
      )}

      {/* Recent Attempts */}
      {attempts && attempts.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Son Denemeler
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {attempts.slice(0, 5).map((attempt: QuizAttempt) => (
                  <div
                    key={attempt.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() =>
                      router.push(
                        `/dashboard/quizzes/${attempt.quizId}/results/${attempt.id}`
                      )
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {attempt.quiz.deck.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(attempt.createdAt).toLocaleDateString("tr-TR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge
                        variant={
                          attempt.score >= 80
                            ? "default"
                            : attempt.score >= 60
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {Math.round(attempt.score)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
