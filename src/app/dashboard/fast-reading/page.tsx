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
            Hızlı Okuma (RSVP)
          </p>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            RSVP teknolojisi ile okuma hızınızı 2-3 kat artırın.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-6 mb-8">
        <div className="flex items-start gap-3">
          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              RSVP Nedir?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Rapid Serial Visual Presentation (RSVP), kelimeleri ekranda tek tek göstererek 
              okuma hızınızı artıran bir tekniktir. Bu özellik yakında aktif olacak!
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Okuma Hızı Ayarları
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Kelime/Dakika (WPM)
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
              <span>100 WPM (Yavaş)</span>
              <span>800 WPM (Çok Hızlı)</span>
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
            Yakında Geliyor!
          </h3>
          <p className="text-gray-600 dark:text-[#92adc9] mb-6">
            Hızlı okuma özelliği şu anda geliştirme aşamasındadır. 
            Önce dokümanlarınızı yükleyin, AI özetler oluştursun.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Doküman Yükle
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 İpucu 1
          </h4>
          <p className="text-sm text-gray-600 dark:text-[#92adc9]">
            Başlangıçta 250-300 WPM ile başlayın, daha sonra kademeli olarak artırın.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 İpucu 2
          </h4>
          <p className="text-sm text-gray-600 dark:text-[#92adc9]">
            Gözlerinizi ekranın ortasına sabitleyin, kelimeler size gelsin.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            💡 İpucu 3
          </h4>
          <p className="text-sm text-gray-600 dark:text-[#92adc9]">
            Günde 15-20 dakika pratik yaparak okuma hızınızı ikiye katlayabilirsiniz.
          </p>
        </div>
      </div>
    </>
  );
}

