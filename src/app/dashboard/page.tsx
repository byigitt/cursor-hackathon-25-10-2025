"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  Zap,
  HelpCircle,
  CreditCard,
  Upload,
  ArrowRight,
  Rocket,
  GraduationCap
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gray-50 dark:bg-[#101922]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-[#233648] bg-gray-50 dark:bg-[#101922] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Learnify
            </h1>
          </div>
        </div>

        <div className="flex flex-1 justify-center px-4 sm:px-8 lg:px-16">
          <div className="flex w-full max-w-lg items-stretch">
            <div className="flex items-center justify-center pl-3 rounded-l-lg bg-white dark:bg-[#233648] text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <Input
              className="flex-1 rounded-none rounded-r-lg border-0 bg-white dark:bg-[#233648] placeholder:text-gray-400 focus:outline-none focus:ring-0"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-white dark:bg-[#233648] text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a4158] transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 bg-gray-300 dark:bg-gray-700" />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 flex-col justify-between bg-gray-50 dark:bg-[#101922] p-4 border-r border-gray-200 dark:border-[#233648] hidden lg:flex">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-600 dark:bg-blue-500/20 dark:text-blue-500"
              >
                <LayoutDashboard className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </Link>
              <Link
                href="/dashboard/documents"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <FileText className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Documents</p>
              </Link>
              <Link
                href="/dashboard/fast-reading"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <Zap className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Fast Reading</p>
              </Link>
              <Link
                href="/dashboard/quizzes"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Quizzes</p>
              </Link>
              <Link
                href="/dashboard/flashcards"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Flashcards</p>
              </Link>
            </div>
          </div>

          <Link href="/dashboard/knowledge-base" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
              <Upload className="h-5 w-5" />
              <span>Knowledge Base</span>
            </Button>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap justify-between gap-3 mb-6">
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Welcome back, John!
              </p>
              <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
                Here's a summary of your learning activity.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
              <p className="text-base font-medium text-gray-600 dark:text-gray-400">Daily Streak</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">5 days</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
              <p className="text-base font-medium text-gray-600 dark:text-gray-400">Documents Read</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
              <p className="text-base font-medium text-gray-600 dark:text-gray-400">Quiz Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">88%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Documents */}
            <div className="lg:col-span-2">
              <h2 className="text-[22px] font-bold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
                Recent Documents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">The Psychology of Money</h3>
                  <Progress value={75} className="h-2" />
                  <Button
                    variant="secondary"
                    className="mt-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-500"
                  >
                    Continue Reading
                  </Button>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Atomic Habits</h3>
                  <Progress value={40} className="h-2" />
                  <Button
                    variant="secondary"
                    className="mt-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-500"
                  >
                    Continue Reading
                  </Button>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] flex flex-col gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Sapiens: A Brief History</h3>
                  <Progress value={15} className="h-2" />
                  <Button
                    variant="secondary"
                    className="mt-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-500"
                  >
                    Continue Reading
                  </Button>
                </div>
              </div>
            </div>

            {/* Upcoming Flashcards */}
            <div>
              <h2 className="text-[22px] font-bold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
                Upcoming Flashcards
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Cognitive Biases</h3>
                    <p className="text-sm text-gray-500 dark:text-[#92adc9]">Due Today</p>
                  </div>
                  <button className="text-blue-600 dark:text-blue-500">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Economic Principles</h3>
                    <p className="text-sm text-gray-500 dark:text-[#92adc9]">Due in 2 days</p>
                  </div>
                  <button className="text-blue-600 dark:text-blue-500">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Get Started */}
          <div>
            <h2 className="text-[22px] font-bold leading-tight tracking-tight mb-4 text-gray-900 dark:text-white">
              Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-blue-600/50 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/60 dark:text-blue-500 text-center cursor-pointer hover:bg-blue-600/20 dark:hover:bg-blue-500/30 transition-colors">
                <Rocket className="h-10 w-10 mb-2" />
                <p className="font-semibold">Start Fast Reading</p>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-blue-600/50 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/60 dark:text-blue-500 text-center cursor-pointer hover:bg-blue-600/20 dark:hover:bg-blue-500/30 transition-colors">
                <GraduationCap className="h-10 w-10 mb-2" />
                <p className="font-semibold">Take a Quiz</p>
              </div>
              <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-blue-600/50 bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:border-blue-500/60 dark:text-blue-500 text-center cursor-pointer hover:bg-blue-600/20 dark:hover:bg-blue-500/30 transition-colors">
                <CreditCard className="h-10 w-10 mb-2" />
                <p className="font-semibold">Review Flashcards</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}