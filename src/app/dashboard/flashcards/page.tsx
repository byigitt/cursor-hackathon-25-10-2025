"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

type Flashcard = {
  id: string;
  frontText: string;
  backText: string;
};

const mockFlashcards: Flashcard[] = [
  {
    id: "1",
    frontText: "Fotosentez nedir?",
    backText:
      "Bitkilerin ve bazı organizmaların ışık enerjisini kimyasal enerjiye dönüştürme süreci.",
  },
  {
    id: "2",
    frontText: "Mitoz bölünme nedir?",
    backText:
      "Bir hücrenin kromozomlarını kopyalayarak iki özdeş yavru hücreye bölünmesi süreci.",
  },
  {
    id: "3",
    frontText: "Yerçekimi kanunu kim tarafından keşfedildi?",
    backText: "Isaac Newton tarafından keşfedilmiştir.",
  },
];

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [formData, setFormData] = useState({ frontText: "", backText: "" });

  const filteredFlashcards = flashcards.filter(
    (card) =>
      card.frontText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.backText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    const newCard: Flashcard = {
      id: Date.now().toString(),
      frontText: formData.frontText,
      backText: formData.backText,
    };
    setFlashcards([newCard, ...flashcards]);
    setFormData({ frontText: "", backText: "" });
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setFormData({ frontText: card.frontText, backText: card.backText });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingCard) return;
    setFlashcards(
      flashcards.map((card) =>
        card.id === editingCard.id
          ? { ...card, frontText: formData.frontText, backText: formData.backText }
          : card
      )
    );
    setFormData({ frontText: "", backText: "" });
    setEditingCard(null);
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const handleStartPractice = () => {
    alert("Alıştırma modu yakında eklenecek!");
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Bilgi Kartlarım
          </p>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            Yapay zeka tarafından oluşturulan bilgi kartlarınızı buradan yönetebilirsiniz. Kartları düzenleyebilir, silebilir veya yenilerini ekleyebilirsiniz.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-start">
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            + Yeni Kart Ekle
          </Button>
          <Button 
            variant="secondary"
            onClick={handleStartPractice}
            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-500"
          >
            Alıştırma Başlat
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Kart destesi içinde ara"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 pl-12 bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67]"
          />
        </div>
      </div>

      {/* Flashcards List */}
      <div className="flex flex-col gap-4">
        {filteredFlashcards.map((card) => (
          <div
            key={card.id}
            className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]"
          >
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <div className="flex flex-col gap-1 border-b border-gray-200 dark:border-[#324d67] py-4 pr-2 md:border-b-0 md:border-r">
                <p className="text-sm font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
                  Ön Yüz
                </p>
                <p className="text-base font-normal leading-normal text-gray-900 dark:text-white">
                  {card.frontText}
                </p>
              </div>
              <div className="flex flex-col gap-1 py-4 pl-0 md:pl-4">
                <p className="text-sm font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
                  Arka Yüz
                </p>
                <p className="text-base font-normal leading-normal text-gray-900 dark:text-white">
                  {card.backText}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-[#324d67] px-4 py-3">
              <button
                onClick={() => handleEdit(card)}
                className="p-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="p-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#1a2633] border-gray-200 dark:border-[#324d67]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Yeni Kart Ekle</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-[#92adc9]">
              Yeni bir bilgi kartı oluşturun. Ön ve arka yüz alanlarını doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="frontText" className="text-gray-900 dark:text-white">Ön Yüz</Label>
              <Textarea
                id="frontText"
                placeholder="Soru veya konu"
                value={formData.frontText}
                onChange={(e) =>
                  setFormData({ ...formData, frontText: e.target.value })
                }
                className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="backText" className="text-gray-900 dark:text-white">Arka Yüz</Label>
              <Textarea
                id="backText"
                placeholder="Cevap veya açıklama"
                value={formData.backText}
                onChange={(e) =>
                  setFormData({ ...formData, backText: e.target.value })
                }
                className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67] text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setFormData({ frontText: "", backText: "" });
              }}
              className="border-gray-200 dark:border-[#324d67]"
            >
              İptal
            </Button>
            <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
              Oluştur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#1a2633] border-gray-200 dark:border-[#324d67]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Kartı Düzenle</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-[#92adc9]">
              Bilgi kartınızı güncelleyin. Değişiklikleri kaydetmeyi unutmayın.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editFrontText" className="text-gray-900 dark:text-white">Ön Yüz</Label>
              <Textarea
                id="editFrontText"
                placeholder="Soru veya konu"
                value={formData.frontText}
                onChange={(e) =>
                  setFormData({ ...formData, frontText: e.target.value })
                }
                className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editBackText" className="text-gray-900 dark:text-white">Arka Yüz</Label>
              <Textarea
                id="editBackText"
                placeholder="Cevap veya açıklama"
                value={formData.backText}
                onChange={(e) =>
                  setFormData({ ...formData, backText: e.target.value })
                }
                className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67] text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setFormData({ frontText: "", backText: "" });
                setEditingCard(null);
              }}
              className="border-gray-200 dark:border-[#324d67]"
            >
              İptal
            </Button>
            <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

