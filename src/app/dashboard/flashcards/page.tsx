"use client";

import { useState, useMemo } from "react";
import { Search, Pencil, Trash2, Sparkles, X, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
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
import { Progress } from "~/components/ui/progress";

type Flashcard = {
  id: string;
  frontText: string;
  backText: string;
};

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

export default function FlashcardsPage() {
  const utils = api.useUtils();
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [formData, setFormData] = useState({ frontText: "", backText: "" });
  const [cardCount, setCardCount] = useState(10);
  
  // Practice mode state
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [practiceCards, setPracticeCards] = useState<Flashcard[]>([]);
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set());

  // Fetch all decks
  const { data: decks, isLoading: decksLoading } = api.deck.getAll.useQuery();

  // Fetch flashcards for the selected deck
  const { data: flashcards, isLoading: flashcardsLoading } = api.flashcard.getByDeckId.useQuery(
    { deckId: activeDeckId! },
    { enabled: !!activeDeckId }
  );

  // Get active deck info
  const activeDeck = decks?.find((deck) => deck.id === activeDeckId);
  const hasDocuments = (activeDeck?._count?.documents ?? 0) > 0;

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

  // Generate flashcards mutation
  const generateFlashcards = api.flashcard.generate.useMutation({
    onSuccess: (flashcards) => {
      void utils.flashcard.getByDeckId.invalidate();
      setIsGenerateDialogOpen(false);
      setCardCount(10);
      toast.success(`Successfully generated ${flashcards.length} flashcards!`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to generate flashcards");
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
    if (filteredFlashcards.length === 0) {
      toast.error("No flashcards to practice");
      return;
    }
    
    // Shuffle cards and start practice session
    const shuffled = shuffleArray(filteredFlashcards);
    setPracticeCards(shuffled);
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setReviewedCards(new Set());
    setIsPracticing(true);
  };

  const handleFlipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleNextCard = () => {
    if (currentCardIndex < practiceCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsCardFlipped(false);
      if (practiceCards[currentCardIndex]) {
        setReviewedCards(new Set(reviewedCards).add(practiceCards[currentCardIndex]!.id));
      }
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsCardFlipped(false);
    }
  };

  const handleEndPractice = () => {
    setIsPracticing(false);
    setPracticeCards([]);
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setReviewedCards(new Set());
    toast.success(`Practice session completed! Reviewed ${reviewedCards.size + 1} cards.`);
  };

  const handleGenerate = () => {
    if (!activeDeckId) {
      toast.error("Please select a deck first");
      return;
    }
    if (!hasDocuments) {
      toast.error("This deck has no documents. Please upload documents first.");
      return;
    }
    if (cardCount < 5 || cardCount > 50) {
      toast.error("Card count must be between 5 and 50");
      return;
    }
    generateFlashcards.mutate({
      deckId: activeDeckId,
      cardCount,
    });
  };

  const currentCard = practiceCards[currentCardIndex];
  const progressPercentage = practiceCards.length > 0 
    ? ((currentCardIndex + 1) / practiceCards.length) * 100 
    : 0;

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
            onClick={() => setIsGenerateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            disabled={!activeDeckId || !hasDocuments || generateFlashcards.isPending}
          >
            {generateFlashcards.isPending ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Flashcards
              </>
            )}
          </Button>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            variant="outline"
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
              : "Generate AI-powered flashcards or create manually"}
          </p>
          {!searchQuery && (
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsGenerateDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Generate Flashcards
              </Button>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                variant="outline"
              >
                + Create Manually
              </Button>
            </div>
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

      {/* Generate Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#1a2633] border-gray-200 dark:border-[#324d67]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Generate AI Flashcards
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-[#92adc9]">
              Generate flashcards from your deck's documents using AI. Choose how many cards you want to create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!hasDocuments && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  This deck has no documents. Please upload documents to the deck first before generating flashcards.
                </p>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="cardCount" className="text-gray-900 dark:text-white">
                Number of Flashcards (5-50)
              </Label>
              <Input
                id="cardCount"
                type="number"
                min={5}
                max={50}
                value={cardCount}
                onChange={(e) => setCardCount(Number(e.target.value))}
                className="bg-white dark:bg-[#233648] border-gray-200 dark:border-[#324d67] text-gray-900 dark:text-white"
                disabled={!hasDocuments}
              />
              <p className="text-sm text-gray-500 dark:text-[#92adc9]">
                AI will generate {cardCount} flashcards based on the content from your documents.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsGenerateDialogOpen(false);
                setCardCount(10);
              }}
              className="border-gray-200 dark:border-[#324d67]"
              disabled={generateFlashcards.isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleGenerate} 
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              disabled={!hasDocuments || generateFlashcards.isPending}
            >
              {generateFlashcards.isPending ? (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Practice Mode Dialog */}
      <Dialog open={isPracticing} onOpenChange={setIsPracticing}>
        <DialogContent className="max-w-4xl bg-white dark:bg-[#1a2633] border-gray-200 dark:border-[#324d67]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-gray-900 dark:text-white">Practice Mode</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEndPractice}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-gray-500 dark:text-[#92adc9]">
              Card {currentCardIndex + 1} of {practiceCards.length}
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Flashcard */}
          {currentCard && (
            <div className="py-8">
              <div
                onClick={handleFlipCard}
                className="relative min-h-[300px] cursor-pointer perspective-1000"
              >
                <div
                  className={`relative w-full h-full transition-all duration-500 transform-style-3d ${
                    isCardFlipped ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center p-8 rounded-xl border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-[#1a2633] backface-hidden ${
                      isCardFlipped ? "invisible" : "visible"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
                      Question
                    </p>
                    <p className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
                      {currentCard.frontText}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-[#92adc9] mt-8">
                      Click to reveal answer
                    </p>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center p-8 rounded-xl border-2 border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-[#1a2633] backface-hidden ${
                      isCardFlipped ? "visible" : "invisible"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-4">
                      Answer
                    </p>
                    <p className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
                      {currentCard.backText}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-[#92adc9] mt-8">
                      Click to see question
                    </p>
                  </div>
                </div>
              </div>

              {/* Flip Button (alternative to clicking card) */}
              <div className="flex justify-center mt-6">
                <Button
                  onClick={handleFlipCard}
                  variant="outline"
                  className="gap-2"
                >
                  <RotateCw className="h-4 w-4" />
                  {isCardFlipped ? "Show Question" : "Show Answer"}
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <DialogFooter className="flex-row justify-between items-center sm:justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousCard}
              disabled={currentCardIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="text-sm text-gray-500 dark:text-[#92adc9]">
              {currentCardIndex + 1} / {practiceCards.length}
            </div>

            {currentCardIndex < practiceCards.length - 1 ? (
              <Button
                onClick={handleNextCard}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleEndPractice}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Finish Practice
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

