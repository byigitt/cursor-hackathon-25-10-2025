"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Zap, Copy, Download, CheckCircle2, XCircle } from "lucide-react";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  const { data: quiz, isLoading } = api.quiz.getById.useQuery({ id: quizId });
  const submitMutation = api.quizAttempt.submit.useMutation({
    onSuccess: (data) => {
      router.push(`/dashboard/quizzes/${quizId}/results/${data.attemptId}`);
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Quiz bulunamadı.</AlertDescription>
      </Alert>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setShowFeedback((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (answeredCount !== totalQuestions) {
      alert("Lütfen tüm soruları cevaplayın.");
      return;
    }

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, optionId]) => ({
        questionId,
        selectedOptionId: optionId,
      })
    );

    submitMutation.mutate({
      quizId,
      answers: formattedAnswers,
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {quiz.deck.name}
        </h1>
        <Button variant="outline" onClick={() => router.push("/dashboard/quizzes")}>
          Quizlere Dön
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Summary */}
        <Card className="bg-white dark:bg-[#111a22] shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Belgenizin Yapay Zeka Özeti</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bu, yüklediğiniz belgenin bir özetidir. Yapay zeka kilit noktaları
              belirledi ve sizin için özetledi. Aşağıdaki özeti okuyabilir veya
              yüksek hızda okumak için RSVP özelliğini kullanabilirsiniz.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-96 overflow-y-auto space-y-4 text-gray-700 dark:text-gray-300">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Özet İçeriği
                </h3>
                <p>
                  Bu quiz, {quiz.deck.name} destesindeki belgelerden oluşturulmuştur.
                  Toplam {totalQuestions} soru içermektedir.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-[#233648]">
              <Button className="gap-2">
                <Zap className="h-4 w-4" />
                Hızlı Oku (RSVP)
              </Button>
              <Button variant="outline" className="gap-2">
                <Copy className="h-4 w-4" />
                Özeti Kopyala
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Özeti İndir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Quiz */}
        <Card className="bg-white dark:bg-[#111a22] shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Ön Değerlendirme Quizi</CardTitle>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Soru {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion && (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {currentQuestion.questionText}
                </p>
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected =
                      answers[currentQuestion.id] === option.id;
                    const showAnswer = showFeedback[currentQuestion.id];

                    return (
                      <label
                        key={option.id}
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion.id}`}
                          checked={isSelected}
                          onChange={() =>
                            handleAnswerSelect(currentQuestion.id, option.id)
                          }
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 dark:text-gray-300">
                          {option.optionText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-[#233648]">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Önceki
              </Button>
              {currentQuestionIndex < totalQuestions - 1 ? (
                <Button onClick={handleNext}>Sonraki</Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    answeredCount !== totalQuestions || submitMutation.isPending
                  }
                >
                  {submitMutation.isPending ? "Gönderiliyor..." : "Cevapla"}
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {answeredCount} / {totalQuestions} soru cevaplanmış
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

