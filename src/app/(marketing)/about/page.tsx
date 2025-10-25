import Link from "next/link";
import { BookOpenCheck, Zap, Brain, Target } from "lucide-react";
import { ThemeToggle } from "~/components/theme-toggle";

export default function AboutPage() {
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
              About
            </h1>
            
            <div className="max-w-4xl">
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
                Synapp is an innovative platform that offers AI-powered solutions to accelerate your learning process and increase your productivity.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-16">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-500/10 w-12 h-12 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Artificial intelligence technology that automatically summarizes your documents and makes content easier to understand.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-indigo-50 dark:bg-indigo-500/10 w-12 h-12 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">RSVP Technique</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Multiply your reading speed with Rapid Serial Visual Presentation technique and learn more efficiently.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 w-12 h-12 flex items-center justify-center">
                      <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Set your own pace and create decks that fit your learning style.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-amber-50 dark:bg-amber-500/10 w-12 h-12 flex items-center justify-center">
                      <BookOpenCheck className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Interactive Tests</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Test your knowledge and track your progress.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                To use the power of technology to make the learning process faster, more efficient, and more enjoyable. To help everyone access information faster and learn more effectively.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Technology</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Developed using modern web technologies (Next.js, React, TypeScript) and artificial intelligence infrastructure. Continuous improvements are being made to provide a secure, fast, and user-friendly experience.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0f16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-6">
              <Link 
                href="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © 2025 Synapp. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
