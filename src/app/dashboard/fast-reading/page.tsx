"use client";

import { Zap, Play, Pause, RotateCcw, Settings, FileText, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { useState } from "react";
import RsvpReader from "~/components/shared/RsvpReader";

const SAMPLE_TEXTS = {
  news: "Artificial intelligence continues to transform industries worldwide. Recent studies show that AI adoption has increased by 45% in the past year. Companies are leveraging machine learning algorithms to improve customer experience and operational efficiency. Experts predict that by 2025, AI will be integrated into most business processes. However, concerns about job displacement and ethical considerations remain at the forefront of discussions. Organizations are now focusing on responsible AI development and ensuring transparency in automated decision-making systems.",
  story: "The old lighthouse stood tall against the crashing waves. Sarah had visited this place countless times as a child, but today felt different. She climbed the spiral staircase, each step echoing memories of her grandfather. At the top, she found his journal, exactly where he said it would be. The first page read: 'To my dearest Sarah, some stories are worth keeping, others are worth sharing.' She smiled, knowing this was the beginning of a new chapter in her life.",
  education: "Photosynthesis is the process by which plants convert light energy into chemical energy. During this process, plants absorb carbon dioxide from the atmosphere and water from the soil. Using chlorophyll in their leaves, they capture sunlight and convert it into glucose and oxygen. This process is essential for life on Earth, as it produces the oxygen we breathe and forms the base of most food chains. Understanding photosynthesis helps us appreciate the delicate balance of our ecosystem."
};

export default function FastReadingPage() {
  const [wpm, setWpm] = useState([300]);
  const [text, setText] = useState("");
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const words = newText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleSampleSelect = (sampleKey: keyof typeof SAMPLE_TEXTS) => {
    const sampleText = SAMPLE_TEXTS[sampleKey];
    setText(sampleText);
    const words = sampleText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleClearText = () => {
    setText("");
    setWordCount(0);
  };

  const handleStartReading = () => {
    if (wordCount >= 5) {
      setIsRsvpOpen(true);
    }
  };

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

      {/* Text Input Area */}
      <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Text
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {wordCount} words
            </span>
            {text && (
              <Button
                onClick={handleClearText}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 dark:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your text here or select a sample below..."
          className="w-full h-48 p-4 rounded-lg border border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#0f1a24] text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Quick samples:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleSampleSelect("news")}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              AI News Article
            </Button>
            <Button
              onClick={() => handleSampleSelect("story")}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Short Story
            </Button>
            <Button
              onClick={() => handleSampleSelect("education")}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Educational Text
            </Button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleStartReading}
            disabled={wordCount < 5}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed gap-2 px-8 py-6 text-lg"
          >
            <Play className="h-5 w-5" />
            Start Fast Reading
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

      {/* RSVP Reader Modal */}
      <RsvpReader
        text={text}
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
      />
    </>
  );
}

