import Link from "next/link";
import { BookOpenCheck, Zap, Brain, Target } from "lucide-react";
import { ThemeToggle } from "~/components/theme-toggle";

export default function AboutPage() {
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
                Hakkında
              </h1>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Synapp, öğrenme sürecinizi hızlandırmak ve verimliliğinizi artırmak için yapay zeka destekli çözümler sunan yenilikçi bir platformdur.
                </p>

                <div className="grid gap-6 md:grid-cols-2 my-10">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#007BFF]/10">
                        <Brain className="h-6 w-6 text-[#007BFF]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Yapay Zeka Destekli</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Dokümanlarınızı otomatik olarak özetleyen ve içeriği anlamanızı kolaylaştıran yapay zeka teknolojisi.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#007BFF]/10">
                        <Zap className="h-6 w-6 text-[#007BFF]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">RSVP Tekniği</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Rapid Serial Visual Presentation tekniği ile okuma hızınızı katlayın ve daha verimli öğrenin.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#007BFF]/10">
                        <Target className="h-6 w-6 text-[#007BFF]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Kişiselleştirilmiş</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Kendi hızınızı ayarlayın ve öğrenme stilinize uygun deck'ler oluşturun.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#007BFF]/10">
                        <BookOpenCheck className="h-6 w-6 text-[#007BFF]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Etkileşimli Testler</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Öğrendiklerinizi test edin ve ilerlemenizi takip edin.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">Misyonumuz</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Öğrenme sürecini daha hızlı, verimli ve keyifli hale getirmek için teknolojinin gücünü kullanmak. Herkesin bilgiye daha hızlı ulaşmasını ve daha etkili öğrenmesini sağlamak.
                </p>

                <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">Teknoloji</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Modern web teknolojileri (Next.js, React, TypeScript) ve yapay zeka altyapısı kullanılarak geliştirilmiştir. Güvenli, hızlı ve kullanıcı dostu bir deneyim sunmak için sürekli olarak iyileştirmeler yapılmaktadır.
                </p>
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
                © 2023 Synapp. All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
