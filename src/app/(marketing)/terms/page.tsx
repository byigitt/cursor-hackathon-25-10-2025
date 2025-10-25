import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { ThemeToggle } from "~/components/theme-toggle";

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#101922]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-4xl flex-1 px-4">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap py-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <BookOpenCheck className="h-6 w-6 text-[#007BFF]" />
                <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  Synapp
                </h2>
              </Link>
              <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12">
              <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Kullanım Koşulları
              </h1>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Son Güncellenme: 25 Ekim 2025
              </p>

              <div className="prose dark:prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Hizmet Tanımı</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Synapp, kullanıcılara yapay zeka destekli doküman özetleme, RSVP (Rapid Serial Visual Presentation) tekniği ile hızlı okuma, etkileşimli quizler ve öğrenme takibi gibi hizmetler sunan bir web platformudur. Bu Kullanım Koşullarını kabul ederek, platformumuzu kullanma hakkı elde edersiniz.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Hesap Oluşturma ve Sorumluluklar</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Platformumuzu kullanmak için bir hesap oluşturmanız gerekmektedir:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li>Hesap oluştururken doğru ve güncel bilgiler vermelisiniz</li>
                    <li>Hesabınızın güvenliğinden siz sorumlusunuz</li>
                    <li>Şifrenizi kimseyle paylaşmamalısınız</li>
                    <li>Hesabınızda gerçekleşen tüm aktivitelerden sorumlusunuz</li>
                    <li>13 yaşından küçükseniz platformumuzu kullanamazsınız</li>
                    <li>Yetkisiz hesap kullanımını derhal bize bildirmelisiniz</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Kabul Edilebilir Kullanım</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Platformumuzu kullanırken aşağıdaki kurallara uymanız gerekmektedir:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li>Yasadışı içerik yüklemek veya paylaşmak yasaktır</li>
                    <li>Telif hakkı korumalı içerikleri izinsiz yüklemeyiniz</li>
                    <li>Zararlı yazılım, virüs veya kötü amaçlı kod içeren dosyalar yüklenmemelidir</li>
                    <li>Platformun güvenliğini veya işleyişini bozmaya çalışmayınız</li>
                    <li>Diğer kullanıcılara zarar verecek davranışlardan kaçınınız</li>
                    <li>Spam, taciz veya yanıltıcı içerik oluşturmayınız</li>
                    <li>Platformu ticari amaçlarla izinsiz kullanmayınız</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. İçerik ve Fikri Mülkiyet</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    İçerik hakları ve fikri mülkiyet konusunda aşağıdaki hükümler geçerlidir:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li><strong>Platform İçeriği:</strong> Platformun tasarımı, logosu, yazılımı ve tüm içeriği Synapp'na aittir</li>
                    <li><strong>Kullanıcı İçeriği:</strong> Yüklediğiniz dokümanların mülkiyeti size aittir</li>
                    <li><strong>İşleme Lisansı:</strong> İçeriğinizi yükleyerek, platformumuzun hizmetleri sağlamak için bu içeriği işlemesine izin verirsiniz</li>
                    <li><strong>Yapay Zeka İşleme:</strong> Yüklenen içerikler, özet oluşturma ve analiz için AI sistemleri tarafından işlenebilir</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Hizmet Kullanılabilirliği</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Platform hizmetlerini kesintisiz ve hatasız sunmaya çalışsak da, aşağıdaki durumlardan sorumlu değiliz:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 mt-3">
                    <li>Teknik arızalar veya bakım çalışmaları nedeniyle oluşan kesintiler</li>
                    <li>İnternet bağlantısı sorunları</li>
                    <li>Üçüncü taraf hizmet sağlayıcılardan kaynaklanan sorunlar</li>
                    <li>Planlanmış güncellemeler ve iyileştirmeler</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Ücretlendirme</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Platform şu anda ücretsiz olarak sunulmaktadır. Gelecekte ücretli abonelik planları veya premium özellikler eklenebilir. Ücretli hizmetler eklenmesi durumunda, kullanıcılar önceden bilgilendirilecektir.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Hesap Askıya Alma ve Sonlandırma</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Aşağıdaki durumlarda hesabınızı askıya alabilir veya sonlandırabiliriz:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li>Kullanım Koşullarını ihlal etmeniz</li>
                    <li>Yasadışı faaliyetlerde bulunmanız</li>
                    <li>Diğer kullanıcılara zarar vermeniz</li>
                    <li>Platform güvenliğini tehlikeye atmanız</li>
                    <li>Uzun süre hesabınızı kullanmamanız (inaktif hesaplar)</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mt-3">
                    Siz de dilediğiniz zaman hesabınızı kapatabilirsiniz. Hesap kapatıldığında verileriniz Gizlilik Politikamıza uygun olarak işlenir.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Sorumluluk Reddi</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Platform "olduğu gibi" sunulmaktadır. Hizmetlerimizi kullanarak:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 mt-3">
                    <li>Platformun kesintisiz, hatasız veya güvenli olacağına dair garanti verilmemektedir</li>
                    <li>AI tarafından oluşturulan özetlerin %100 doğru olacağı garanti edilmez</li>
                    <li>Platformun kullanımından kaynaklanan doğrudan veya dolaylı zararlardan sorumlu değiliz</li>
                    <li>Kullanıcı içeriğinin doğruluğundan veya kalitesinden sorumlu değiliz</li>
                    <li>Üçüncü taraf hizmetlerden (Google OAuth vb.) kaynaklanan sorunlardan sorumlu değiliz</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">9. Tazminat</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Platformu Kullanım Koşullarını ihlal ederek kullanmanız durumunda, bundan doğacak her türlü zarar, dava ve masraftan Synapp'nu tazmin etmeyi kabul edersiniz.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">10. Değişiklikler</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu Kullanım Koşullarını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda sizi bilgilendireceğiz. Değişikliklerden sonra platformu kullanmaya devam etmeniz, yeni koşulları kabul ettiğiniz anlamına gelir.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">11. Uygulanacak Hukuk</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu Kullanım Koşulları Türkiye Cumhuriyeti yasalarına tabidir. Platformun kullanımından kaynaklanan uyuşmazlıklar Türkiye mahkemelerinde çözülecektir.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">12. İletişim</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Kullanım Koşulları hakkında sorularınız varsa, lütfen{" "}
                    <Link href="/contact" className="text-[#007BFF] hover:underline">
                      iletişim sayfamız
                    </Link>{" "}
                    üzerinden bizimle iletişime geçin.
                  </p>
                </section>

                <section className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Bu platformu kullanarak yukarıdaki Kullanım Koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
                  </p>
                </section>
              </div>
            </main>

            {/* Footer */}
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <Link 
                  href="/about"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Hakkında
                </Link>
                <Link 
                  href="/contact"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  İletişim
                </Link>
                <Link 
                  href="/privacy"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Gizlilik Politikası
                </Link>
                <Link 
                  href="/terms"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Kullanım Koşulları
                </Link>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                © 2025 Synapp. All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
