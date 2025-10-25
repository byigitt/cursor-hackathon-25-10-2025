"use client";

import { Zap, Play, Pause, RotateCcw, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { useState } from "react";

export default function FastReadingPage() {
  const [wpm, setWpm] = useState([300]);

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Fast Reading (RSVP)
          </p>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            Increase your reading speed 2-3x with RSVP technology.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-6 mb-8">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              What is RSVP?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Rapid Serial Visual Presentation (RSVP) is a technique that increases your reading speed 
              by displaying words one at a time on screen. This feature will be active soon!
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Reading Speed Settings
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Words Per Minute (WPM)
              </label>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                {wpm[0]}
              </span>
            </div>
            <Slider
              value={wpm}
              onValueChange={setWpm}
              min={100}
              max={800}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>100 WPM (Slow)</span>
              <span>800 WPM (Very Fast)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Interface - Coming Soon */}
      <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-[#324d67] bg-gray-50 dark:bg-[#1a2633] p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="rounded-full bg-blue-100 dark:bg-blue-500/20 p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Zap className="h-10 w-10 text-blue-600 dark:text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Coming Soon!
          </h3>
          <p className="text-gray-600 dark:text-[#92adc9] mb-6">
            The fast reading feature is currently in development. 
            First, upload your documents and let AI create summaries.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Upload Document
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 Tip 1
          </h4>
          <p className="text-sm text-gray-600 dark:text-[#92adc9]">
            Start with 250-300 WPM initially, then gradually increase.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 Tip 2
          </h4>
          <p className="text-sm text-gray-600 dark:text-[#92adc9]">
            Keep your eyes fixed on the center of the screen, let the words come to you.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 Tip 3
          </h4>
          <p className="text-sm text-gray-600 dark:text-[#92adc9]">
            You can double your reading speed by practicing 15-20 minutes daily.
          </p>
        </div>
      </div>
    </>
  );
}

