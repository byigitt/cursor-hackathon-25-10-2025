"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    console.log("Attempting to sign in with email:", email);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Sign in result:", result);

      if (result?.error) {
        console.error("Sign in failed:", result.error);
        toast.error("Invalid email or password");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        console.log("Sign in successful! Redirecting to dashboard...");
        toast.success("Signed in successfully!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link 
                href="/auth/forgot-password"
                className="text-sm text-[#007BFF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#007BFF] hover:bg-[#007BFF]/90 text-white font-bold transition-transform duration-200 hover:scale-[1.02] h-12"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              href="/auth/signup"
              className="text-[#007BFF] hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
