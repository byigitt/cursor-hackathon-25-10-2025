import Link from "next/link";
import { ThemeToggle } from "~/components/theme-toggle";

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#0a0f16]">
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-[#0a0f16]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/synapp-logo-white.svg" 
                  alt="Synapp" 
                  className="h-8 w-8 dark:invert-0 invert" 
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Synapp
                </span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
              Last Updated: October 25, 2025
            </p>

            <div className="max-w-4xl space-y-12">
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Giriş</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Synapp olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, platformumuzu kullanırken toplanan, işlenen ve saklanan bilgiler hakkında sizi bilgilendirmeyi amaçlamaktadır.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Toplanan Veriler</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Platformumuz aşağıdaki kişisel verileri toplayabilir:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, e-posta adresi</li>
                    <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre (şifrelenmiş)</li>
                    <li><strong>Kullanım Verileri:</strong> Platform kullanım istatistikleri, oturum bilgileri</li>
                    <li><strong>Yüklenen İçerik:</strong> Eğitim amaçlı yüklediğiniz dokümanlar</li>
                    <li><strong>İlerleme Verileri:</strong> Quiz sonuçları, çalışma oturumları, streak bilgileri</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Verilerin Kullanım Amacı</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Toplanan veriler aşağıdaki amaçlarla kullanılır:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li>Kullanıcı hesabınızı oluşturmak ve yönetmek</li>
                    <li>Platform hizmetlerini sağlamak ve iyileştirmek</li>
                    <li>Yapay zeka ile doküman özetleme ve içerik analizi yapmak</li>
                    <li>Kişiselleştirilmiş öğrenme deneyimi sunmak</li>
                    <li>İlerlemenizi takip etmek ve raporlamak</li>
                    <li>Teknik destek sağlamak</li>
                    <li>Platform güvenliğini korumak</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Veri Saklama ve Güvenlik</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Verilerinizin güvenliği bizim için önceliklidir:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li>Şifreler güçlü şifreleme algoritmaları ile korunur</li>
                    <li>Veriler güvenli sunucularda saklanır</li>
                    <li>HTTPS protokolü ile veri iletimi şifrelenir</li>
                    <li>Düzenli güvenlik güncellemeleri yapılır</li>
                    <li>Yetkisiz erişime karşı koruma önlemleri alınır</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Veri Paylaşımı</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Kişisel verileriniz üçüncü şahıslarla paylaşılmaz. Yalnızca aşağıdaki durumlarda veri paylaşımı yapılabilir:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 mt-3">
                    <li>Yasal zorunluluklar gereği</li>
                    <li>Kullanıcının açık onayı ile</li>
                    <li>Platform hizmetlerini sağlamak için gerekli teknik hizmet sağlayıcılar ile (veri işleme anlaşmaları çerçevesinde)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Çerezler (Cookies)</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Platformumuz, kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezler, oturum yönetimi, tercih saklama ve kullanım analizi için kullanılır. Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Kullanıcı Hakları</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Kullanıcılar olarak aşağıdaki haklara sahipsiniz:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li><strong>Erişim Hakkı:</strong> Kişisel verilerinize erişim talep edebilirsiniz</li>
                    <li><strong>Düzeltme Hakkı:</strong> Hatalı verilerin düzeltilmesini isteyebilirsiniz</li>
                    <li><strong>Silme Hakkı:</strong> Hesabınızı ve verilerinizi silme talebinde bulunabilirsiniz</li>
                    <li><strong>Veri Taşınabilirliği:</strong> Verilerinizin bir kopyasını talep edebilirsiniz</li>
                    <li><strong>İtiraz Hakkı:</strong> Veri işleme faaliyetlerine itiraz edebilirsiniz</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Üçüncü Taraf Hizmetler</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Platformumuz, Google gibi üçüncü taraf kimlik doğrulama hizmetlerini kullanabilir. Bu hizmetlerin kendi gizlilik politikaları vardır ve kullanımları sırasında ilgili hizmetin gizlilik politikası geçerli olur.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">9. Çocukların Gizliliği</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Platformumuz 13 yaşın altındaki çocuklara yönelik değildir. Bilerek 13 yaşın altındaki çocuklardan kişisel veri toplamıyoruz. Eğer bir ebeveyn veya vasiyseniz ve çocuğunuzun bize kişisel bilgi verdiğini düşünüyorsanız, lütfen bizimle iletişime geçin.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">10. Politika Değişiklikleri</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda sizi bilgilendireceğiz. Güncel politikayı düzenli olarak gözden geçirmenizi öneririz.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">11. İletişim</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Gizlilik politikamız veya kişisel verileriniz hakkında sorularınız varsa, lütfen{" "}
                    <Link href="/contact" className="text-[#007BFF] hover:underline">
                      iletişim sayfamız
                    </Link>{" "}
                    üzerinden bizimle iletişime geçin.
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
