"use client";

import { useState, useCallback, useEffect } from "react";
import { Plus, Search, Grid3x3, List, FileText, Trash2, Edit2, Download, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { useUploadThing } from "~/lib/uploadthing";
import { toast } from "sonner";

type Document = {
  id: string;
  name: string;
  fileUrl: string;
  fileKey: string;
  fileType: string;
  fileSize: number;
  createdAt: Date;
  deckId: string;
};

type Deck = {
  id: string;
  name: string;
  _count: {
    documents: number;
    quizzes: number;
    flashcards: number;
  };
};

export default function DocumentsPage() {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ id: string; name: string } | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const utils = api.useUtils();

  // Fetch decks
  const { data: decks, isLoading: decksLoading } = api.deck.getAll.useQuery();

  // Fetch documents for selected deck
  const { data: documents, isLoading: documentsLoading } = api.document.getByDeckId.useQuery(
    { deckId: activeDeckId! },
    { enabled: !!activeDeckId }
  );

  // Create deck mutation
  const createDeck = api.deck.create.useMutation({
    onSuccess: (newDeck) => {
      void utils.deck.getAll.invalidate();
      setActiveDeckId(newDeck.id);
      setShowCreateDeck(false);
      setNewDeckName("");
      toast.success("Deck created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create deck");
    },
  });

  // Create document mutation
  const createDocument = api.document.create.useMutation({
    onSuccess: () => {
      void utils.document.getByDeckId.invalidate();
      toast.success("Document uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create document");
    },
  });

  // Update document mutation
  const updateDocument = api.document.update.useMutation({
    onSuccess: () => {
      void utils.document.getByDeckId.invalidate();
      setShowRenameDialog(false);
      setSelectedDocument(null);
      setRenameValue("");
      toast.success("Document renamed successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to rename document");
    },
  });

  // Delete document mutation
  const deleteDocument = api.document.delete.useMutation({
    onSuccess: () => {
      void utils.document.getByDeckId.invalidate();
      setShowDeleteDialog(false);
      setSelectedDocument(null);
      toast.success("Document deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete document");
    },
  });

  // UploadThing integration
  const { startUpload, isUploading } = useUploadThing("documentUploader", {
    onClientUploadComplete: (files) => {
      if (!activeDeckId) {
        toast.error("Please select a deck first");
        setUploadingFiles(false);
        return;
      }

      // Process each uploaded file
      const documentPromises = files.map((file) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        let fileType: "pdf" | "txt" | "doc" | "docx" = "txt";

        if (fileExtension === "pdf") fileType = "pdf";
        else if (fileExtension === "doc") fileType = "doc";
        else if (fileExtension === "docx") fileType = "docx";
        else if (fileExtension === "txt") fileType = "txt";

        return createDocument.mutateAsync({
          deckId: activeDeckId,
          name: file.name,
          fileUrl: file.url,
          fileKey: file.key,
          fileType,
          fileSize: file.size,
        });
      });

      // Wait for all documents to be created
      Promise.all(documentPromises)
        .then(() => {
          toast.success(`Successfully uploaded ${files.length} document(s)`);
          setUploadingFiles(false);
        })
        .catch((error) => {
          console.error("Error creating documents:", error);
          toast.error("Some documents failed to save");
          setUploadingFiles(false);
        });
    },
    onUploadError: (error) => {
      toast.error(error.message || "Upload failed");
      setUploadingFiles(false);
    },
    onUploadBegin: () => {
      setUploadingFiles(true);
    },
  });

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!activeDeckId) {
      toast.error("Please select a deck first");
      return;
    }

    void startUpload(Array.from(files));
  }, [activeDeckId, startUpload]);

  // Handle drag & drop
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeDeckId) {
      setIsDragging(true);
    }
  }, [activeDeckId]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!activeDeckId) {
      toast.error("Please select a deck first");
      return;
    }

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    // Validate file types
    const allowedTypes = ['.pdf', '.txt', '.doc', '.docx'];
    const validFiles = files.filter(file => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      return allowedTypes.includes(ext);
    });

    if (validFiles.length === 0) {
      toast.error("Please upload PDF, TXT, DOC, or DOCX files");
      return;
    }

    if (validFiles.length < files.length) {
      toast.warning(`${files.length - validFiles.length} file(s) skipped - unsupported format`);
    }

    void startUpload(validFiles);
  }, [activeDeckId, startUpload]);

  // Handle deck creation
  const handleCreateDeck = () => {
    if (!newDeckName.trim()) {
      toast.error("Please enter a deck name");
      return;
    }
    createDeck.mutate({ name: newDeckName });
  };

  // Handle document rename
  const handleRename = () => {
    if (!selectedDocument || !renameValue.trim()) {
      toast.error("Please enter a document name");
      return;
    }
    updateDocument.mutate({ id: selectedDocument.id, name: renameValue });
  };

  // Handle document delete
  const handleDelete = () => {
    if (!selectedDocument) return;
    deleteDocument.mutate({ id: selectedDocument.id });
  };

  // Filter documents based on search
  const filteredDocuments = documents?.filter((doc: Document) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  // Format date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: new Date(date).getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  // Get file name without extension for better display
  const getDisplayName = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex > 0) {
      return fileName.substring(0, lastDotIndex);
    }
    return fileName;
  };

  // Set initial active deck when decks are loaded
  useEffect(() => {
    if (decks && decks.length > 0 && !activeDeckId) {
      setActiveDeckId(decks[0]!.id);
    }
  }, [decks, activeDeckId]);

  return (
    <div className="flex flex-col max-w-[960px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4">
        <div className="flex min-w-72 flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">
            My Documents
          </h1>
          <p className="text-base font-normal leading-normal text-gray-500 dark:text-[#92adc9]">
            Upload new documents or start working with existing ones.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex flex-col p-4">
        <div 
          className={`flex flex-col items-center gap-6 rounded-xl border-2 border-dashed px-6 py-14 transition-all ${
            isDragging 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
              : "border-gray-300 dark:border-[#324d67] bg-white dark:bg-[#101922]/50"
          } ${!activeDeckId ? "opacity-50 cursor-not-allowed" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex max-w-[480px] flex-col items-center gap-2">
            <p className="text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center text-gray-900 dark:text-white">
              {isDragging 
                ? "Drop files here" 
                : activeDeckId 
                  ? "Drag and drop files here or click to select" 
                  : "Please select a deck first"}
            </p>
            <p className="text-sm font-normal leading-normal max-w-[480px] text-center text-gray-500 dark:text-white/70">
              Supported formats: PDF, DOCX, TXT, DOC (max 10 files)
            </p>
          </div>
          <label>
            <input
              type="file"
              multiple
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileSelect}
              disabled={!activeDeckId || isUploading || uploadingFiles}
              className="hidden"
            />
            <Button 
              variant="secondary"
              disabled={!activeDeckId || isUploading || uploadingFiles}
              className="flex min-w-[84px] max-w-[480px] items-center justify-center h-10 px-4 bg-gray-200 dark:bg-[#233648] text-gray-800 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-[#324d67] disabled:opacity-50"
            >
              {isUploading || uploadingFiles ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <span className="truncate">Select Files</span>
              )}
            </Button>
          </label>
        </div>
      </div>

      {/* Decks Section */}
      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-gray-900 dark:text-white">
        My Decks
      </h2>
      
      <div className="p-4">
        {decksLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : decks && decks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No decks yet. Create your first deck to get started.</p>
            <Button onClick={() => setShowCreateDeck(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Deck
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 mb-4">
              {/* Deck Tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                {decks?.map((deck: Deck) => (
                  <button
                    key={deck.id}
                    onClick={() => setActiveDeckId(deck.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                      activeDeckId === deck.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <span>{deck.name}</span>
                    {deck._count.documents > 0 && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeDeckId === deck.id
                          ? "bg-white/20"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}>
                        {deck._count.documents}
                      </span>
                    )}
                  </button>
                ))}
                <button
                  onClick={() => setShowCreateDeck(true)}
                  className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Search and View Toggle */}
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-[#324d67] rounded-lg bg-white dark:bg-[#111a22] text-gray-900 dark:text-white focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Search in documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-200 dark:bg-[#233648] text-blue-600"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#233648]"
                  }`}
                >
                  <Grid3x3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-200 dark:bg-[#233648] text-blue-600"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#233648]"
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Documents List/Grid */}
            {documentsLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : !filteredDocuments || filteredDocuments.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-block p-4 bg-gray-200 dark:bg-[#233648] rounded-full mb-4">
                  <FileText className="h-12 w-12 text-blue-600 dark:text-blue-500" />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {searchQuery ? "No documents found" : "No documents yet"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {searchQuery ? "Try a different search term" : "Upload your first document to get started."}
                </p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-2"}>
                {filteredDocuments.map((doc: Document) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633] hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate" title={doc.name}>
                        {getDisplayName(doc.name)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(doc.fileSize)} • {doc.fileType.toUpperCase()} • {formatDate(doc.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(doc.fileUrl, "_blank")}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#233648] text-gray-500 dark:text-gray-400 transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDocument({ id: doc.id, name: doc.name });
                          setRenameValue(doc.name);
                          setShowRenameDialog(true);
                        }}
                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#233648] text-gray-500 dark:text-gray-400 transition-colors"
                        title="Rename"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDocument({ id: doc.id, name: doc.name });
                          setShowDeleteDialog(true);
                        }}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Deck Dialog */}
      <Dialog open={showCreateDeck} onOpenChange={setShowCreateDeck}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
            <DialogDescription>Enter a name for your new deck.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Deck name"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateDeck()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDeck(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDeck} disabled={createDeck.isPending}>
              {createDeck.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Document Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>Enter a new name for the document.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Document name"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={updateDocument.isPending}>
              {updateDocument.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Document Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedDocument?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteDocument.isPending}>
              {deleteDocument.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
