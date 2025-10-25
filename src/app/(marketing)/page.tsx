import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { HydrateClient, api } from "~/trpc/server";
import { auth } from "~/server/auth";

export default async function MarketingPage() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#101922]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-5xl flex-1 px-4">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap py-3">
              <div className="flex items-center gap-3">
                <BookOpenCheck className="h-6 w-6 text-[#007BFF]" />
                <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  Hızlı Okuma Platformu
                </h2>
              </div>
              <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col items-center justify-center text-center py-20">
              <div className="flex flex-col gap-6 max-w-2xl">
                <div className="flex flex-col gap-4">
                  <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white">
                    Öğrenme Hızınızı Katlayın.
                  </h1>
                  <p className="text-lg md:text-xl font-normal leading-normal text-gray-600 dark:text-gray-400">
                    Yapay zeka ile dokümanlarınızı özetleyin ve RSVP tekniğiyle ışık hızında okuyun.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                  <Link href="/api/auth/signin">
                    <Button 
                      size="lg"
                      className="min-w-[140px] bg-[#007BFF] hover:bg-[#007BFF]/90 text-white text-lg font-bold transition-transform duration-200 hover:scale-105 h-12 px-8"
                    >
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/api/auth/signin">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="min-w-[140px] border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white text-lg font-bold transition-colors duration-200 h-12 px-8"
                    >
                      Hesap Oluştur
                    </Button>
                  </Link>
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <Link 
                  href="#"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Hakkında
                </Link>
                <Link 
                  href="#"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  İletişim
                </Link>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                © 2023 Hızlı Okuma Platformu. All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
    </HydrateClient>
  );
}
