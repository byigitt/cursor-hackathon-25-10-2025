"use client";

import { ArrowRight, Rocket, GraduationCap, CreditCard } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

export default function DashboardPage() {
  return (
    <>
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
    </>
  );
}