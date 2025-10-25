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
  User,
  LogOut,
  Upload,
  Camera,
  Bell,
  Shield,
  Mail,
  Smartphone,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("Alex Doe");
  const [username, setUsername] = useState("alexdoe");
  const [email, setEmail] = useState("alex.doe@example.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);

  const [leaderboardTab, setLeaderboardTab] = useState("weekly");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile save logic here
    console.log("Saving profile...", { name, username, email });
  };

  const stats = [
    {
      label: "Daily Streak",
      value: "15 Days",
      change: "+2%",
      isPositive: true,
    },
    {
      label: "Total Points",
      value: "12,500",
      change: "+150",
      isPositive: true,
    },
    {
      label: "Global Ranking",
      value: "#8",
      change: "-1",
      isPositive: false,
    },
  ];

  const leaderboardData = {
    weekly: [
      { position: 1, name: "Jane Doe", points: 15300, avatar: "JD", isCurrentUser: false },
      { position: 8, name: "Alex Doe (You)", points: 12500, avatar: "AD", isCurrentUser: true },
      { position: 9, name: "John Smith", points: 12100, avatar: "JS", isCurrentUser: false },
    ],
    monthly: [
      { position: 1, name: "Michael Chen", points: 48500, avatar: "MC", isCurrentUser: false },
      { position: 5, name: "Sarah Wilson", points: 31200, avatar: "SW", isCurrentUser: false },
      { position: 12, name: "Alex Doe (You)", points: 25800, avatar: "AD", isCurrentUser: true },
    ],
    allTime: [
      { position: 1, name: "Emma Thompson", points: 125000, avatar: "ET", isCurrentUser: false },
      { position: 15, name: "Alex Doe (You)", points: 42300, avatar: "AD", isCurrentUser: true },
      { position: 16, name: "David Lee", points: 42100, avatar: "DL", isCurrentUser: false },
    ],
  };

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
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                <span className="text-sm font-medium">{name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
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
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-600 dark:bg-blue-500/20 dark:text-blue-500"
              >
                <User className="h-5 w-5" />
                <p className="text-sm font-medium leading-normal">Profile</p>
              </Link>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-2">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                <span className="text-sm font-medium">{name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8 p-6 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                AD
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{name}</h1>
              <p className="text-gray-600 dark:text-[#92adc9] mb-1">@{username}</p>
              <p className="text-gray-600 dark:text-[#92adc9]">{email}</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-gray-600 dark:text-[#92adc9]">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <span
                        className={`text-sm font-medium ${
                          stat.isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Leaderboard */}
            <Card className="border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={leaderboardTab} onValueChange={setLeaderboardTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="allTime">All Time</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weekly" className="space-y-2">
                    {leaderboardData.weekly.map((user) => (
                      <div
                        key={user.position}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.isCurrentUser
                            ? "bg-blue-600/20 dark:bg-blue-500/20 border border-blue-600 dark:border-blue-500"
                            : "bg-gray-100 dark:bg-[#233648]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-bold w-6 text-center ${
                              user.position === 1
                                ? "text-yellow-500"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {user.position}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {user.avatar}
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        </div>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {user.points.toLocaleString()} Points
                        </p>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="monthly" className="space-y-2">
                    {leaderboardData.monthly.map((user) => (
                      <div
                        key={user.position}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.isCurrentUser
                            ? "bg-blue-600/20 dark:bg-blue-500/20 border border-blue-600 dark:border-blue-500"
                            : "bg-gray-100 dark:bg-[#233648]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-bold w-6 text-center ${
                              user.position === 1
                                ? "text-yellow-500"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {user.position}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {user.avatar}
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        </div>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {user.points.toLocaleString()} Points
                        </p>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="allTime" className="space-y-2">
                    {leaderboardData.allTime.map((user) => (
                      <div
                        key={user.position}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.isCurrentUser
                            ? "bg-blue-600/20 dark:bg-blue-500/20 border border-blue-600 dark:border-blue-500"
                            : "bg-gray-100 dark:bg-[#233648]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-bold w-6 text-center ${
                              user.position === 1
                                ? "text-yellow-500"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          >
                            {user.position}
                          </span>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {user.avatar}
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        </div>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {user.points.toLocaleString()} Points
                        </p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Edit Profile */}
            <Card className="border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white dark:bg-[#233648] border-gray-300 dark:border-[#324d67]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white dark:bg-[#233648] border-gray-300 dark:border-[#324d67]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white dark:bg-[#233648] border-gray-300 dark:border-[#324d67]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Account Settings */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notifications */}
            <Card className="border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  <Bell className="inline-block h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <Label htmlFor="email-notifications" className="text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <Label htmlFor="app-notifications" className="text-gray-700 dark:text-gray-300">
                      In-App Notifications
                    </Label>
                  </div>
                  <Switch
                    id="app-notifications"
                    checked={appNotifications}
                    onCheckedChange={setAppNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Security */}
            <Card className="border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  <Shield className="inline-block h-5 w-5 mr-2" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-blue-600 dark:text-blue-500 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 dark:text-red-500 border-red-600 dark:border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}