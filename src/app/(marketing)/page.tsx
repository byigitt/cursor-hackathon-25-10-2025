import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  Zap, 
  Brain, 
  Target, 
  Trophy,
  Upload,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";

export default async function MarketingPage() {
  const session = await auth();

  // Redirect authenticated users to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <HydrateClient>
      <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#0a0f16]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-[#0a0f16]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <img 
                  src="/synapp-logo-white.svg" 
                  alt="Synapp" 
                  className="h-8 w-8 dark:invert-0 invert" 
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Synapp
                </span>
              </div>
              <div className="flex items-center gap-4">
              <ThemeToggle />
                  <Link href="/auth/signin">
                    <Button
                    variant="ghost" 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                    Sign In
                    </Button>
                  </Link>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Free Trial
                    </Button>
                  </Link>
                </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4" />
                AI-powered learning platform
              </div>
              
              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Learn{" "}
                <span className="text-blue-600 dark:text-blue-500">
                  20x Faster
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto">
                Analyze your documents with AI, speed read with RSVP technology,
                and reinforce your knowledge with smart quizzes and flashcards.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/auth/signup">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-14 px-8 text-lg border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                  >
                    How it Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Subtle Background Accent */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl opacity-50" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gray-50 dark:bg-[#101922]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                The Future of Learning
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Optimize your learning experience with modern technologies and artificial intelligence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="group p-8 rounded-xl bg-white dark:bg-[#1a2633] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-sm">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Upload
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Upload your PDF, Word or text files, let AI automatically analyze them
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-xl bg-white dark:bg-[#1a2633] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-sm">
                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Speed Reading
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Read and comprehend 20x faster with RSVP technology
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-xl bg-white dark:bg-[#1a2633] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-sm">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  AI Quizzes
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  AI automatically creates quizzes from your documents
                </p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 rounded-xl bg-white dark:bg-[#1a2633] border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 hover:shadow-sm">
                <div className="rounded-lg bg-amber-50 dark:bg-amber-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-amber-600 dark:text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Flashcards
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Make your knowledge permanent with intelligent repetition system
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Transform your learning experience in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-600 dark:bg-blue-500 w-14 h-14 flex items-center justify-center text-white text-xl font-bold mb-6 shadow-sm">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Upload Document
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Upload your PDF, Word or text file with drag and drop
                  </p>
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-7 left-full w-full h-px bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-600 dark:bg-blue-500 w-14 h-14 flex items-center justify-center text-white text-xl font-bold mb-6 shadow-sm">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    AI Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    AI analyzes the document and creates summaries, quizzes, and flashcards
                  </p>
                </div>
                {/* Connector Line */}
                <div className="hidden md:block absolute top-7 left-full w-full h-px bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-600 dark:bg-blue-500 w-14 h-14 flex items-center justify-center text-white text-xl font-bold mb-6 shadow-sm">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Learn Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Speed read with RSVP, take quizzes, and reinforce with flashcards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gray-50 dark:bg-[#101922]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Synapp?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  Traditional learning methods are slow and inefficient. Synapp optimizes learning with a science and technology-backed approach.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Save Time
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Increase your reading speed 20x, learn more content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Better Understanding
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Deepen your comprehension with AI-powered summaries and quizzes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Permanent Learning
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Transfer knowledge to long-term memory with flashcard system
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-xl bg-blue-600 dark:bg-blue-500 p-8 text-white shadow-lg">
                  <Trophy className="h-10 w-10 mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold mb-3">
                    Track Your Success
                  </h3>
                  <p className="mb-6 text-blue-50 text-sm leading-relaxed">
                    See your progress with gamification features, earn badges, and climb the leaderboard.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold mb-1">1,250</div>
                      <div className="text-xs text-blue-100">XP Earned</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold mb-1">12</div>
                      <div className="text-xs text-blue-100">Badges</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0f16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="/synapp-logo-white.svg" 
                    alt="Synapp" 
                    className="h-8 w-8 dark:invert-0 invert" 
                  />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Synapp
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-4">
                  AI-powered learning platform. Read faster, learn better.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://github.com/byigitt/synapp" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
    </div>
    </HydrateClient>
  );
}