"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Settings,
  Upload,
  Plus,
  Search,
  Grid3x3,
  List,
  FileText,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function DocumentsPage() {
  const [activeWorkspace, setActiveWorkspace] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const workspaces = [
    { id: "all", label: "All Documents" },
    { id: "workspace1", label: "Workspace 1" },
    { id: "workspace2", label: "Workspace 2" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gray-50 dark:bg-[#101922]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-[#233648] bg-white dark:bg-[#101922] px-4 md:px-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Learnify
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-gray-100 dark:bg-[#233648] text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#2a4158] transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 lg:px-20 xl:px-40 py-5">
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

          {/* Drag and Drop Area */}
          <div className="flex flex-col p-4">
            <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-[#324d67] px-6 py-14 bg-white dark:bg-[#101922]/50">
              <div className="flex max-w-[480px] flex-col items-center gap-2">
                <p className="text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center text-gray-900 dark:text-white">
                  Drag and drop files here or click to select
                </p>
                <p className="text-sm font-normal leading-normal max-w-[480px] text-center text-gray-500 dark:text-white/70">
                  Supported formats: PDF, DOCX, TXT.
                </p>
              </div>
              <Button 
                variant="secondary"
                className="flex min-w-[84px] max-w-[480px] items-center justify-center h-10 px-4 bg-gray-200 dark:bg-[#233648] text-gray-800 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-[#324d67]"
              >
                <span className="truncate">Select Files</span>
              </Button>
            </div>
          </div>

          {/* My Workspaces Section */}
          <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-gray-900 dark:text-white">
            My Workspaces
          </h2>
          
          <div className="p-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              {/* Workspace Tabs */}
              <div className="flex items-center gap-2">
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => setActiveWorkspace(workspace.id)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      activeWorkspace === workspace.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {workspace.label}
                  </button>
                ))}
                <button className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400 transition-colors">
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

            {/* Empty State */}
            <div className="text-center py-16">
              <div className="inline-block p-4 bg-gray-200 dark:bg-[#233648] rounded-full mb-4">
                <FileText className="h-12 w-12 text-blue-600 dark:text-blue-500" />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                No documents yet
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Upload your first document to get started.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
