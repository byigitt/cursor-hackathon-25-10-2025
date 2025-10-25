"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Search,
  Settings,
  LayoutDashboard,
  FileText,
  Zap,
  HelpCircle,
  CreditCard,
  Upload,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gray-50 dark:bg-[#101922]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-[#233648] bg-gray-50 dark:bg-[#101922] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Learnify
            </h1>
          </div>
        </div>

        <div className="flex flex-1 justify-center px-4 sm:px-8 lg:px-16">
          <div className="flex w-full max-w-lg items-stretch">
            <div className="flex items-center justify-center pl-3 rounded-l-lg bg-white dark:bg-[#233648] text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <Input
              className="flex-1 rounded-none rounded-r-lg border-0 bg-white dark:bg-[#233648] placeholder:text-gray-400 focus:outline-none focus:ring-0"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-white dark:bg-[#233648] text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a4158] transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-3 h-auto p-2">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 bg-gray-300 dark:bg-gray-700" />
                <span className="text-sm font-medium">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                <span>Knowledge Base</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 flex-col justify-between bg-gray-50 dark:bg-[#101922] p-4 border-r border-gray-200 dark:border-[#233648] hidden lg:flex">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Dashboard</p>
              </Link>
              <Link
                href="/dashboard/documents"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <FileText className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Documents</p>
              </Link>
              <Link
                href="/dashboard/fast-reading"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <Zap className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Fast Reading</p>
              </Link>
              <Link
                href="/dashboard/quizzes"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Quizzes</p>
              </Link>
              <Link
                href="/dashboard/flashcards"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Flashcards</p>
              </Link>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-2">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 bg-gray-300 dark:bg-gray-700" />
                <span className="text-sm font-medium">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                <span>Knowledge Base</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

