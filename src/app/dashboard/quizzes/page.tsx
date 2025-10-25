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
import { Search, BookOpen, Clock, TrendingUp, PlayCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";

export default function QuizzesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: decks, isLoading: decksLoading } = api.deck.getAll.useQuery();
  const { data: attempts, isLoading: attemptsLoading } =
    api.quizAttempt.getMyAttempts.useQuery({});

  type QuizAttempt = NonNullable<typeof attempts>[number];
  type Deck = NonNullable<typeof decks>[number];

  const isLoading = decksLoading || attemptsLoading;

  // Group attempts by deck
  const attemptsByDeck = attempts?.reduce(
    (acc: Record<string, QuizAttempt[]>, attempt: QuizAttempt) => {
      const deckId = attempt.quiz.deck.id;
      if (!acc[deckId]) {
        acc[deckId] = [];
      }
      acc[deckId].push(attempt);
      return acc;
    },
    {} as Record<string, QuizAttempt[]>
  );

  const getAverageScore = (deckId: string) => {
    const deckAttempts = attemptsByDeck?.[deckId] || [];
    if (deckAttempts.length === 0) return null;
    const sum = deckAttempts.reduce((acc: number, attempt: QuizAttempt) => acc + attempt.score, 0);
    return Math.round(sum / deckAttempts.length);
  };

  const filteredDecks = decks?.filter((deck: Deck) =>
    deck.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Decks Grid */}
      {!filteredDecks || filteredDecks.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Henüz quiz bulunamadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Destelerinizden quiz oluşturarak başlayın.
          </p>
          <Button onClick={() => router.push("/dashboard/documents")}>
            Belge Yükle
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck: Deck) => {
            const averageScore = getAverageScore(deck.id);
            const attemptCount = attemptsByDeck?.[deck.id]?.length || 0;

            return (
              <Card
                key={deck.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => {
                  // Navigate to the first available quiz or prompt to create one
                  router.push(`/dashboard/documents`);
                }}
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
                    {deck.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
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
                      router.push(`/dashboard/documents`);
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
