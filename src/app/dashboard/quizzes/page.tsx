"use client";

import { HelpCircle, Plus, Clock, Trophy, Target } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

const mockQuizzes = [
  {
    id: "1",
    title: "Fotosentez ve Bitki Biyolojisi",
    questions: 15,
    averageScore: 85,
    lastAttempt: "2 gün önce",
    completed: true,
  },
  {
    id: "2",
    title: "Newton'un Hareket Yasaları",
    questions: 20,
    averageScore: 72,
    lastAttempt: "1 hafta önce",
    completed: true,
  },
  {
    id: "3",
    title: "Osmanlı İmparatorluğu Tarihi",
    questions: 25,
    averageScore: 0,
    lastAttempt: null,
    completed: false,
  },
];

export default function QuizzesPage() {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Testler
          </p>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            AI tarafından oluşturulan testlerle bilginizi ölçün ve geliştirin.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Test Oluştur
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-3">
              <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tamamlanan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 dark:bg-green-500/20 p-3">
              <Target className="h-6 w-6 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ortalama Skor</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 dark:bg-purple-500/20 p-3">
              <HelpCircle className="h-6 w-6 text-purple-600 dark:text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toplam Soru</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">240</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-6 mb-8">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              AI Destekli Test Oluşturma
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Dokümanlarınızdan otomatik olarak çoktan seçmeli testler oluşturuyoruz. 
              AI, içeriğin en önemli noktalarını belirleyerek anlamlı sorular hazırlar.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Mevcut Testler
        </h2>
        {mockQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {quiz.title}
                  </h3>
                  {quiz.completed && (
                    <span className="rounded-full bg-green-100 dark:bg-green-500/20 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                      Tamamlandı
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="h-4 w-4" />
                    {quiz.questions} soru
                  </span>
                  {quiz.lastAttempt && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.lastAttempt}
                    </span>
                  )}
                </div>
                {quiz.completed && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        En iyi skorunuz
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {quiz.averageScore}%
                      </span>
                    </div>
                    <Progress value={quiz.averageScore} className="h-2" />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={quiz.completed ? "outline" : "default"}
                  className={
                    quiz.completed
                      ? ""
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                >
                  {quiz.completed ? "Tekrar Çöz" : "Teste Başla"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockQuizzes.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-[#324d67] bg-gray-50 dark:bg-[#1a2633] p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="rounded-full bg-blue-100 dark:bg-blue-500/20 p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <HelpCircle className="h-10 w-10 text-blue-600 dark:text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Henüz test yok
            </h3>
            <p className="text-gray-600 dark:text-[#92adc9] mb-6">
              Dokümanlarınızdan AI ile otomatik test oluşturmak için önce doküman yüklemelisiniz.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Doküman Yükle
            </Button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Test Çözme İpuçları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              📚 Önce Oku, Sonra Test Çöz
            </h4>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              Dokümanı okumadan teste başlamayın. Önce hızlı okuma ile içeriği öğrenin.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              🔄 Düzenli Tekrar
            </h4>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              Testleri düzenli aralıklarla tekrar çözerek bilgilerinizi pekiştirin.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              ⏱️ Zaman Yönetimi
            </h4>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              Her soru için makul bir süre ayırın ve tüm soruları cevaplamaya çalışın.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              📊 Sonuçları İnceleyin
            </h4>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              Test sonuçlarınızı inceleyin ve yanlış yaptığınız konuları tekrar çalışın.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

