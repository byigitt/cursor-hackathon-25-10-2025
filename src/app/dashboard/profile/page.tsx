"use client";

import { useState, useEffect } from "react";
import { Camera, Bell, Shield, Mail, Smartphone } from "lucide-react";
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
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);

  const [leaderboardTab, setLeaderboardTab] = useState("weekly");

  // Fetch user data
  const { data: user, isLoading: isLoadingUser } = api.user.getCurrentUser.useQuery();
  
  // Fetch streak data
  const { data: streak, isLoading: isLoadingStreak } = api.gamification.getMyStreak.useQuery();
  
  // Fetch leaderboard data
  const { data: leaderboard, isLoading: isLoadingLeaderboard } = api.gamification.getLeaderboard.useQuery({ limit: 10 });
  
  // Fetch quiz stats
  const { data: quizStats, isLoading: isLoadingStats } = api.quizAttempt.getStats.useQuery({});

  // Update profile mutation
  const updateProfile = api.user.updateProfile.useMutation({
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      setName(data.name || "");
      setEmail(data.email || "");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({ name, email });
  };

  // Calculate stats from real data
  const stats = [
    {
      label: "Current Streak",
      value: streak ? `${streak.currentStreak} Days` : "0 Days",
      change: streak?.longestStreak ? `Best: ${streak.longestStreak}` : "N/A",
      isPositive: true,
    },
    {
      label: "Total Attempts",
      value: quizStats?.totalAttempts?.toString() || "0",
      change: quizStats?.recentAttempts?.length ? `${quizStats.recentAttempts.length} recent` : "No attempts",
      isPositive: true,
    },
    {
      label: "Average Score",
      value: quizStats?.averageScore ? `${quizStats.averageScore.toFixed(1)}%` : "N/A",
      change: quizStats?.bestScore ? `Best: ${quizStats.bestScore.toFixed(1)}%` : "N/A",
      isPositive: true,
    },
  ];

  // Get user's initials for avatar
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const userInitials = user?.name ? getInitials(user.name) : "?";

  // Process leaderboard data to show all in one list (we'll keep the same UI but use real data)
  const leaderboardUsers = leaderboard?.map((entry) => ({
    position: entry.rank,
    name: entry.userId === user?.id ? `${entry.userName} (You)` : entry.userName,
    points: entry.longestStreak,
    avatar: getInitials(entry.userName),
    isCurrentUser: entry.userId === user?.id,
  })) || [];

  const leaderboardData = {
    weekly: leaderboardUsers,
    monthly: leaderboardUsers,
    allTime: leaderboardUsers,
  };

  if (isLoadingUser || isLoadingStreak || isLoadingStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <>
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 p-6 rounded-xl border border-gray-200 dark:border-[#324d67] bg-white dark:bg-[#1a2633]">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            {userInitials}
          </div>
          <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{user?.name || "Anonymous"}</h1>
          <p className="text-gray-600 dark:text-[#92adc9]">{user?.email || "No email"}</p>
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
                {leaderboardData.weekly.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">No leaderboard data yet</p>
                ) : (
                  leaderboardData.weekly.map((user) => (
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
                        {user.points} Day Streak
                      </p>
                    </div>
                  ))
                )}
              </TabsContent>
              <TabsContent value="monthly" className="space-y-2">
                {leaderboardData.monthly.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">No leaderboard data yet</p>
                ) : (
                  leaderboardData.monthly.map((user) => (
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
                        {user.points} Day Streak
                      </p>
                    </div>
                  ))
                )}
              </TabsContent>
              <TabsContent value="allTime" className="space-y-2">
                {leaderboardData.allTime.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">No leaderboard data yet</p>
                ) : (
                  leaderboardData.allTime.map((user) => (
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
                        {user.points} Day Streak
                      </p>
                    </div>
                  ))
                )}
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
                  disabled={updateProfile.isPending}
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
                  disabled={updateProfile.isPending}
                  className="bg-white dark:bg-[#233648] border-gray-300 dark:border-[#324d67]"
                />
              </div>
              <Button
                type="submit"
                disabled={updateProfile.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
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
    </>
  );
}