"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface RsvpReaderProps {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

const RsvpReader: React.FC<RsvpReaderProps> = ({ text, isOpen, onClose }) => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse text into words
  useEffect(() => {
    if (text) {
      const parsedWords = text
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(word => word.length > 0);
      setWords(parsedWords);
    }
  }, [text]);

  // Calculate interval based on WPM
  const getInterval = useCallback(() => {
    return 60000 / wpm; // Convert WPM to milliseconds per word
  }, [wpm]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying && words.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          if (prevIndex >= words.length - 1) {
            setIsPlaying(false);
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, getInterval());
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, words, getInterval]);

  // Stop playing when reaching the end
  useEffect(() => {
    if (currentWordIndex >= words.length - 1 && words.length > 0) {
      setIsPlaying(false);
    }
  }, [currentWordIndex, words.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setIsPlaying(false);
  };

  const handleWpmChange = (newWpm: number) => {
    setWpm(newWpm);
    // If playing, restart the interval with new speed
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 10);
    }
  };

  const calculateProgress = () => {
    if (words.length === 0) return 0;
    return ((currentWordIndex + 1) / words.length) * 100;
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 bg-gray-900 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={onClose}
          className="p-2 text-gray-200 hover:bg-gray-800 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-8 pb-4">
        <div className="h-2 bg-gray-700 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {/* Word display */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="text-center">
          {words.length > 0 ? (
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white">
              {currentWordIndex === 0 && !isPlaying ? (
                <span className="text-gray-500">Başla</span>
              ) : (
                <>
                  {words[currentWordIndex]?.split('').map((char, idx) => {
                    const currentWord = words[currentWordIndex];
                    if (!currentWord) return null;
                    const midPoint = Math.floor(currentWord.length / 2);
                    return (
                      <span
                        key={idx}
                        className={idx === midPoint ? 'text-blue-500' : 'text-white'}
                      >
                        {char}
                      </span>
                    );
                  })}
                </>
              )}
            </h1>
          ) : (
            <p className="text-gray-500 text-2xl">Metin yükleniyor...</p>
          )}
        </div>
      </div>

      {/* Speed control */}
      <div className="px-8 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm font-medium">Okuma Hızı</span>
            <span className="text-gray-400 text-sm">{wpm} WPM</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={wpm}
              onChange={(e) => handleWpmChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((wpm - 100) / 900) * 100}%, #374151 ${((wpm - 100) / 900) * 100}%, #374151 100%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 px-8 py-6">
        <button
          onClick={handleRestart}
          className="p-3 text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800/50 rounded-full transition-colors"
        >
          <RotateCcw className="w-8 h-8" />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-10 h-10" />
          ) : (
            <Play className="w-10 h-10 ml-1" />
          )}
        </button>
        <div className="w-14 h-14" /> {/* Spacer for balance */}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3B82F6;
          border: 4px solid #111827;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3B82F6;
          border: 4px solid #111827;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );

  // Use portal to render outside of parent component
  return createPortal(modalContent, document.body);
};

export default RsvpReader;