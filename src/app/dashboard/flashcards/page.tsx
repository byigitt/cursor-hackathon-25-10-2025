"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";

type Flashcard = {
  id: string;
  frontText: string;
  backText: string;
};

export default function FlashcardsPage() {
  const utils = api.useUtils();
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [formData, setFormData] = useState({ frontText: "", backText: "" });

  // Fetch all decks
  const { data: decks, isLoading: decksLoading } = api.deck.getAll.useQuery();

  // Fetch flashcards for the selected deck
  const { data: flashcards, isLoading: flashcardsLoading } = api.flashcard.getByDeckId.useQuery(
    { deckId: activeDeckId! },
    { enabled: !!activeDeckId }
  );

  // Create flashcard mutation
  const createFlashcard = api.flashcard.create.useMutation({
    onSuccess: () => {
      void utils.flashcard.getByDeckId.invalidate();
      setFormData({ frontText: "", backText: "" });
      setIsCreateDialogOpen(false);
      toast.success("Flashcard created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create flashcard");
    },
  });

  // Update flashcard mutation
  const updateFlashcard = api.flashcard.update.useMutation({
    onSuccess: () => {
      void utils.flashcard.getByDeckId.invalidate();
      setFormData({ frontText: "", backText: "" });
      setEditingCard(null);
      setIsEditDialogOpen(false);
      toast.success("Flashcard updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update flashcard");
    },
  });

  // Delete flashcard mutation
  const deleteFlashcard = api.flashcard.delete.useMutation({
    onSuccess: () => {
      void utils.flashcard.getByDeckId.invalidate();
      toast.success("Flashcard deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete flashcard");
    },
  });

  const filteredFlashcards = (flashcards ?? []).filter(
    (card) =>
      card.frontText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.backText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    if (!activeDeckId) {
      toast.error("Please select a deck first");
      return;
    }
    if (!formData.frontText || !formData.backText) {
      toast.error("Please fill in both front and back text");
      return;
    }
    createFlashcard.mutate({
      deckId: activeDeckId,
      frontText: formData.frontText,
      backText: formData.backText,
    });
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setFormData({ frontText: card.frontText, backText: card.backText });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!editingCard) return;
    if (!formData.frontText || !formData.backText) {
      toast.error("Please fill in both front and back text");
      return;
    }
    updateFlashcard.mutate({
      id: editingCard.id,
      frontText: formData.frontText,
      backText: formData.backText,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this flashcard?")) {
      deleteFlashcard.mutate({ id });
    }
  };

  const handleStartPractice = () => {
    alert("Practice mode coming soon!");
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            My Flashcards
          </p>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            Manage your AI-generated flashcards here. You can edit, delete, or add new cards.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-start">
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!activeDeckId || createFlashcard.isPending}
          >
            + Add New Card
          </Button>
          <Button 
            variant="secondary"
            onClick={handleStartPractice}
            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-600 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-500"
            disabled={!activeDeckId || filteredFlashcards.length === 0}
          >
            Start Practice
          </Button>
        </div>
      </div>

      {/* Deck Selector */}
      <div className="mb-6">
        <Label htmlFor="deck-select" className="mb-2 block text-gray-900 dark:text-white">
          Select Deck
        </Label>
        {decksLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <Select value={activeDeckId ?? ""} onValueChange={setActiveDeckId}>
            <SelectTrigger className="h-12 bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67]">
              <SelectValue placeholder="Choose a deck to view flashcards" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67]">
              {decks?.map((deck) => (
                <SelectItem key={deck.id} value={deck.id} className="text-gray-900 dark:text-white">
                  {deck.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Search Bar */}
      {activeDeckId && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search within deck"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67]"
            />
          </div>
        </div>
      )}

      {/* Empty State - No Deck Selected */}
      {!activeDeckId && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No deck selected
          </p>
          <p className="text-base text-gray-500 dark:text-[#92adc9]">
            Please select a deck from the dropdown above to view and manage flashcards
          </p>
        </div>
      )}

      {/* Loading State */}
      {activeDeckId && flashcardsLoading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      )}

      {/* Empty State - No Flashcards */}
      {activeDeckId && !flashcardsLoading && filteredFlashcards.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {searchQuery ? "No flashcards found" : "No flashcards yet"}
          </p>
          <p className="text-base text-gray-500 dark:text-[#92adc9] mb-4">
            {searchQuery 
              ? "Try adjusting your search query" 
              : "Create your first flashcard to get started"}
          </p>
          {!searchQuery && (
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              + Create Flashcard
            </Button>
          )}
        </div>
      )}

      {/* Flashcards List */}
      {activeDeckId && !flashcardsLoading && filteredFlashcards.length > 0 && (
        <div className="flex flex-col gap-4">
          {filteredFlashcards.map((card) => (
          <div
            key={card.id}
            className="rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]"
          >
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <div className="flex flex-col gap-1 border-b border-gray-200 dark:border-[#324d67] py-4 pr-2 md:border-b-0 md:border-r">
                <p className="text-sm font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
                  Front
                </p>
                <p className="text-base font-normal leading-normal text-gray-900 dark:text-white">
                  {card.frontText}
                </p>
              </div>
              <div className="flex flex-col gap-1 py-4 pl-0 md:pl-4">
                <p className="text-sm font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
                  Back
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
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#1a2633] border-gray-200 dark:border-[#324d67]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Add New Card</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-[#92adc9]">
              Create a new flashcard. Fill in both front and back fields.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="frontText" className="text-gray-900 dark:text-white">Front</Label>
              <Textarea
                id="frontText"
                placeholder="Question or topic"
                value={formData.frontText}
                onChange={(e) =>
                  setFormData({ ...formData, frontText: e.target.value })
                }
                className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="backText" className="text-gray-900 dark:text-white">Back</Label>
              <Textarea
                id="backText"
                placeholder="Answer or explanation"
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
              disabled={createFlashcard.isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreate} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={createFlashcard.isPending}
            >
              {createFlashcard.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#1a2633] border-gray-200 dark:border-[#324d67]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Edit Card</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-[#92adc9]">
              Update your flashcard. Don't forget to save your changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="editFrontText" className="text-gray-900 dark:text-white">Front</Label>
              <Textarea
                id="editFrontText"
                placeholder="Question or topic"
                value={formData.frontText}
                onChange={(e) =>
                  setFormData({ ...formData, frontText: e.target.value })
                }
                className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67] text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editBackText" className="text-gray-900 dark:text-white">Back</Label>
              <Textarea
                id="editBackText"
                placeholder="Answer or explanation"
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
              disabled={updateFlashcard.isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={updateFlashcard.isPending}
            >
              {updateFlashcard.isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

