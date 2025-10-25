"use client";

import {
  BookOpen,
  Upload,
  Zap,
  HelpCircle,
  CreditCard,
  Target,
  Trophy,
  FileText,
  Lightbulb,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function HowToUsePage() {
  return (
    <>
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Synapp'ı Nasıl Kullanırım?
          </h1>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            Öğrenme deneyiminizi maksimize etmek için platformumuzu kullanmanın tüm yollarını keşfedin.
          </p>
        </div>

        {/* Welcome Banner */}
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-white/20 p-3">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Hoş Geldiniz!</h2>
              <p className="text-white/90">
                Synapp, yapay zeka destekli bir öğrenme platformudur. Dokümanlarınızı yükleyin,
                hızlı okuma ile öğrenin, testler çözün ve bilgi kartlarıyla pekiştirin!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Hızlı Başlangıç Rehberi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-500/20 p-4">
                <div className="rounded-full bg-blue-600 dark:bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold text-base">
                  1
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Doküman Yükleyin
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                PDF, Word veya metin dosyalarınızı sisteme yükleyin
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-500/20 p-4">
                <div className="rounded-full bg-blue-600 dark:bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold text-base">
                  2
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                AI İle Analiz Edin
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                Gemini AI dokümanınızı analiz edip özet çıkarır
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-500/20 p-4">
                <div className="rounded-full bg-blue-600 dark:bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold text-base">
                  3
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Hızlı Okuyun
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                RSVP teknolojisi ile 2-3x daha hızlı okuyun
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-500/20 p-4">
                <div className="rounded-full bg-blue-600 dark:bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold text-base">
                  4
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Test Çözün
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                AI tarafından oluşturulan testlerle bilginizi ölçün
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Details */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Özellikler ve Kullanımları
        </h2>

        <div className="space-y-6">
          {/* Documents */}
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-3">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  📄 Doküman Yönetimi
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  Öğrenmek istediğiniz her türlü dokümanı sisteme yükleyebilirsiniz.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Desteklenen formatlar:</strong> PDF, DOCX, TXT ve daha fazlası
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Organizasyon:</strong> Dokümanlarınızı desteler (decks) halinde düzenleyin
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Arama:</strong> Tüm dokümanlarınızda hızlıca arama yapın
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/documents">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Dokümanları Görüntüle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Fast Reading */}
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-3">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  ⚡ Hızlı Okuma (RSVP)
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  RSVP (Rapid Serial Visual Presentation) teknolojisi ile okuma hızınızı 2-3 kat artırın.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Ayarlanabilir hız:</strong> Dakikada 200-800 kelime arasında okuma hızı
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Odaklanma:</strong> Tek kelime odaklanma ile daha iyi konsantrasyon
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>AI Özeti:</strong> Gemini AI tarafından oluşturulan özetleri okuyun
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>💡 İpucu:</strong> Başlangıçta 300 WPM (kelime/dakika) ile başlayıp 
                    yavaş yavaş hızınızı artırın. Beyin bu tekniğe hızla adapte olur!
                  </p>
                </div>
                <Link href="/dashboard/fast-reading">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Hızlı Okumaya Başla
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quizzes */}
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-3">
                <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  ❓ Testler ve Sınavlar
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  AI, dokümanlarınızdan otomatik olarak çoktan seçmeli testler oluşturur.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Otomatik oluşturma:</strong> Her doküman için AI testler hazırlar
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Anında geri bildirim:</strong> Cevaplarınızı hemen değerlendirin
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>İlerleme takibi:</strong> Test sonuçlarınızı kaydedin ve gelişiminizi izleyin
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/quizzes">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Testleri Görüntüle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Flashcards */}
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-3">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🎴 Bilgi Kartları (Flashcards)
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  Spaced repetition tekniği ile bilgilerinizi uzun süreli hafızaya aktarın.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>AI destekli:</strong> Dokümanlarınızdan otomatik kart oluşturma
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Manuel ekleme:</strong> Kendi kartlarınızı da oluşturabilirsiniz
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Alıştırma modu:</strong> Kartlarınızı çalışma oturumlarında gözden geçirin
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/flashcards">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Bilgi Kartlarını Görüntüle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Gamification */}
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-500/20 p-3">
                <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  🏆 Oyunlaştırma ve Serilər
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  Günlük çalışma serilerinizi koruyun ve lider tablosunda yükselın!
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Günlük seriler:</strong> Her gün çalışarak serinizi koruyun
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Başarı rozetleri:</strong> Hedeflerinize ulaştıkça rozetler kazanın
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Lider tablosu:</strong> Diğer öğrencilerle rekabet edin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          En İyi Kullanım İpuçları
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Düzenli Çalışma
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Her gün en az 15-20 dakika çalışarak öğrenme seriliğinizi koruyun. 
                  Kısa ama düzenli çalışma, uzun ama düzensiz çalışmadan daha etkilidir.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Doğru Hız
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Hızlı okumada başlangıçta yavaş başlayıp kademeli olarak hızınızı artırın. 
                  Anlamayı feda etmeden en yüksek hızı hedefleyin.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Aktif Tekrar
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Öğrendiklerinizi testler ve flashcard'larla düzenli olarak tekrar edin. 
                  Spaced repetition hafızanızı güçlendirir.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Organize Olun
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Dokümanlarınızı konulara göre ayırın ve her konu için ayrı desteler oluşturun. 
                  Bu, bilgilere daha kolay erişmenizi sağlar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sık Sorulan Sorular
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              RSVP (Hızlı Okuma) nedir ve nasıl çalışır?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              RSVP (Rapid Serial Visual Presentation), kelimeleri ekranda tek tek, hızlı bir şekilde 
              göstererek okuma hızınızı artıran bir tekniktir. Gözleriniz sabit kalırken kelimeler 
              sizin için hareket eder, bu da göz hareketini ortadan kaldırarak okuma hızınızı 2-3 kat artırır.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              AI nasıl test ve flashcard oluşturuyor?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              Gemini AI, yüklediğiniz dokümanları analiz ederek içeriğin en önemli noktalarını belirler. 
              Bu noktalardan anlamlı çoktan seçmeli sorular ve flashcard'lar oluşturur. AI, konunun 
              anlaşılması için gereken anahtar kavramları otomatik olarak tespit eder.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Hangi dosya formatlarını yükleyebilirim?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              Şu anda PDF, Microsoft Word (.docx) ve düz metin (.txt) dosyalarını destekliyoruz. 
              Yakında daha fazla format desteği eklenecek!
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Günlük serim nasıl korunur?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              Her gün en az bir aktivite (doküman okuma, test çözme veya flashcard çalışması) 
              yaparak serinizi koruyabilirsiniz. Bir günü atlarsanız, seriniz sıfırlanır ve 
              yeniden başlamanız gerekir.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Öğrenmeye Başlamaya Hazır mısınız?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          İlk dokümanınızı yükleyin ve yapay zeka destekli öğrenme deneyimini keşfedin!
        </p>
        <Link href="/dashboard/documents">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            <Upload className="mr-2 h-5 w-5" />
            İlk Dokümanımı Yükle
          </Button>
        </Link>
      </section>
    </>
  );
}

