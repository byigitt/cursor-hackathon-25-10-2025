"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement sign in logic
    // 1. Validate form inputs
    //    - Check if email is valid format
    //    - Check if password is not empty
    // 
    // 2. Call NextAuth signIn function
    //    import { signIn } from "next-auth/react"
    //    const result = await signIn("credentials", {
    //      email,
    //      password,
    //      redirect: false,
    //    })
    //
    // 3. Handle response
    //    - If successful: redirect to dashboard or home page
    //    - If error: display error message to user
    //
    // 4. If "Remember Me" is checked, consider storing a longer session
    //    This might need backend configuration in NextAuth
    
    console.log("Sign in attempt:", { email, password, rememberMe });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect would happen here after successful login
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hoş Geldiniz
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Hesabınıza giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                E-posta
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Şifre
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
                  Beni hatırla
                </Label>
              </div>
              <Link 
                href="/auth/forgot-password"
                className="text-sm text-[#007BFF] hover:underline"
              >
                Şifremi unuttum
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#007BFF] hover:bg-[#007BFF]/90 text-white font-bold transition-transform duration-200 hover:scale-[1.02] h-12"
              disabled={isLoading}
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Hesabınız yok mu?{" "}
            <Link 
              href="/auth/signup"
              className="text-[#007BFF] hover:underline font-semibold"
            >
              Kayıt Ol
            </Link>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-[#101922] px-4 text-gray-500 dark:text-gray-400">
                  veya
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 font-medium border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                disabled={isLoading}
                onClick={() => {
                  // TODO: Implement Google Sign In
                  // Call signIn("google") from next-auth/react
                  console.log("Google sign in");
                }}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google ile Giriş Yap
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
