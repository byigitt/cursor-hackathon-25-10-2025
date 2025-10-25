import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { ThemeToggle } from "~/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#101922]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-5xl flex-1 px-4">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap py-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <BookOpenCheck className="h-6 w-6 text-[#007BFF]" />
                <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  Hızlı Okuma Platformu
                </h2>
              </Link>
              <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col items-center justify-center py-12">
              {children}
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
                <Link 
                  href="#"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Gizlilik Politikası
                </Link>
                <Link 
                  href="#"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Kullanım Koşulları
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
  );
}
