"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Zap,
  HelpCircle,
  CreditCard,
  Info,
  Settings,
  Upload,
  User,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface DashboardSidebarProps {
  user: {
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  return (
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
        
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-[#233648]">
          <Link
            href="/dashboard/how-to-use"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-white transition-colors"
          >
            <Info className="h-5 w-5" />
            <p className="text-sm font-medium leading-normal">How to Use?</p>
          </Link>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-2">
            {user.image ? (
              <img 
                src={user.image} 
                alt={user.name || "User"} 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
              />
            ) : (
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 bg-gray-300 dark:bg-gray-700" />
            )}
            <span className="text-sm font-medium">{user.name || user.email}</span>
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
          <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-500" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
}
