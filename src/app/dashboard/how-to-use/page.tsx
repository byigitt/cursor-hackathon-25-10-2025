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
            How to Use Synapp?
          </h1>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            Discover all the ways to use our platform to maximize your learning experience.
          </p>
        </div>

        {/* Welcome Banner */}
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-white/20 p-3">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Welcome!</h2>
              <p className="text-white/90">
                Synapp is an AI-powered learning platform. Upload your documents,
                learn with fast reading, solve quizzes, and reinforce with flashcards!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Start Guide
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
                Upload Document
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                Upload your PDF, Word, or text files to the system
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
                AI Analysis
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                AI analyzes your document and creates summaries
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
                Speed Read
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                Read 20x faster with RSVP technology
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
                Take Quizzes
              </h3>
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                Test your knowledge with AI-generated quizzes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Details */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Features and Usage
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
                  📄 Document Management
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  Upload any type of document you want to learn from to the system.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Supported formats:</strong> PDF, DOCX, TXT and more
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Organization:</strong> Organize your documents in decks
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Search:</strong> Quickly search across all your documents
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/documents">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    View Documents
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
                  ⚡ Speed Reading (RSVP)
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  Increase your reading speed by 20x with RSVP (Rapid Serial Visual Presentation) technology.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Adjustable speed:</strong> Reading speed between 200-800 words per minute
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Focus:</strong> Better concentration with single-word focus
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>AI Summary:</strong> Read summaries generated by AI
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>💡 Tip:</strong> Start with 300 WPM (words per minute) and gradually 
                    increase your speed. Your brain adapts to this technique quickly!
                  </p>
                </div>
                <Link href="/dashboard/fast-reading">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Speed Reading
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
                  ❓ Quizzes and Tests
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  AI automatically generates multiple-choice quizzes from your documents.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Auto-generation:</strong> AI prepares quizzes for each document
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Instant feedback:</strong> Evaluate your answers immediately
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Progress tracking:</strong> Save your quiz results and track your improvement
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/quizzes">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    View Quizzes
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
                  🎴 Flashcards
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  Transfer your knowledge to long-term memory with spaced repetition technique.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>AI-powered:</strong> Automatic card generation from your documents
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Manual creation:</strong> You can also create your own cards
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Practice mode:</strong> Review your cards in study sessions
                    </p>
                  </div>
                </div>
                <Link href="/dashboard/flashcards">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    View Flashcards
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
                  🏆 Gamification and Streaks
                </h3>
                <p className="text-gray-600 dark:text-[#92adc9] mb-4">
                  Maintain your daily study streaks and climb the leaderboard!
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Daily streaks:</strong> Study every day to maintain your streak
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Achievement badges:</strong> Earn badges as you reach your goals
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Leaderboard:</strong> Compete with other learners
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
          Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Consistent Study
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Maintain your learning continuity by studying at least 15-20 minutes every day. 
                  Short but regular study is more effective than long but irregular sessions.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Right Speed
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Start slowly in speed reading and gradually increase your speed. 
                  Aim for the highest speed without sacrificing comprehension.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Active Recall
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Regularly review what you've learned with quizzes and flashcards. 
                  Spaced repetition strengthens your memory.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Stay Organized
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Organize your documents by topic and create separate decks for each subject. 
                  This makes it easier to access information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              What is RSVP (Speed Reading) and how does it work?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              RSVP (Rapid Serial Visual Presentation) is a technique that increases your reading speed 
              by displaying words one at a time rapidly on the screen. Your eyes stay fixed while the words 
              move for you, eliminating eye movement and increasing your reading speed by 20x.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              How does AI create quizzes and flashcards?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              AI analyzes your uploaded documents to identify the most important points in the content. 
              It creates meaningful multiple-choice questions and flashcards from these points. The AI 
              automatically detects key concepts needed to understand the subject.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              What file formats can I upload?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              We currently support PDF, Microsoft Word (.docx), and plain text (.txt) files. 
              More format support coming soon!
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              How do I maintain my daily streak?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#92adc9]">
              You can maintain your streak by doing at least one activity each day (reading documents, 
              taking quizzes, or studying flashcards). If you miss a day, your streak resets and 
              you'll need to start over.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Start Learning?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Upload your first document and discover the AI-powered learning experience!
        </p>
        <Link href="/dashboard/documents">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            <Upload className="mr-2 h-5 w-5" />
            Upload My First Document
          </Button>
        </Link>
      </section>
    </>
  );
}

