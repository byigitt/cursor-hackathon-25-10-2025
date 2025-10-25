"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "İsim gereklidir";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "İsim en az 2 karakter olmalıdır";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "E-posta gereklidir";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 8) {
      newErrors.password = "Şifre en az 8 karakter olmalıdır";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı gereklidir";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = "Kullanım koşullarını kabul etmelisiniz";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // TODO: Implement sign up logic
    // 1. Additional client-side validation
    //    - Password strength check (uppercase, lowercase, numbers, special chars)
    //    - Email uniqueness check (optional, can be done server-side)
    //
    // 2. Prepare data for API
    //    const userData = {
    //      name: formData.name,
    //      email: formData.email,
    //      password: formData.password,
    //    }
    //
    // 3. Call registration API endpoint
    //    const response = await fetch("/api/auth/register", {
    //      method: "POST",
    //      headers: { "Content-Type": "application/json" },
    //      body: JSON.stringify(userData)
    //    })
    //
    // 4. Handle response
    //    - If successful: 
    //      * Optionally auto-login user using signIn from next-auth
    //      * Or redirect to login page with success message
    //      * Or redirect to email verification page
    //    - If error:
    //      * Display specific error message (email already exists, etc.)
    //      * Keep form data for correction
    //
    // 5. Consider email verification flow
    //    - Send verification email
    //    - Show "check your email" message
    //    - Redirect to verification pending page
    
    console.log("Sign up attempt:", {
      ...formData,
      acceptTerms
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect would happen here after successful registration
      // For example: router.push("/auth/verify-email")
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hesap Oluştur
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Hızlı okuma yolculuğunuza başlayın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Ad Soyad
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Adınız Soyadınız"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                E-posta
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Şifre
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                Şifre Tekrarı
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(checked as boolean);
                    if (checked && errors.terms) {
                      setErrors(prev => ({
                        ...prev,
                        terms: ""
                      }));
                    }
                  }}
                  disabled={isLoading}
                  className="mt-1"
                />
                <Label 
                  htmlFor="terms" 
                  className="text-sm font-normal text-gray-600 dark:text-gray-400 cursor-pointer leading-relaxed"
                >
                  <Link href="/terms" className="text-[#007BFF] hover:underline">
                    Kullanım Koşulları
                  </Link>
                  {" "}ve{" "}
                  <Link href="/privacy" className="text-[#007BFF] hover:underline">
                    Gizlilik Politikası
                  </Link>
                  'nı okudum ve kabul ediyorum
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#007BFF] hover:bg-[#007BFF]/90 text-white font-bold transition-transform duration-200 hover:scale-[1.02] h-12"
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? "Hesap oluşturuluyor..." : "Kayıt Ol"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Zaten hesabınız var mı?{" "}
            <Link 
              href="/auth/signin"
              className="text-[#007BFF] hover:underline font-semibold"
            >
              Giriş Yap
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
                  // TODO: Implement Google Sign Up
                  // Call signIn("google") from next-auth/react
                  // This will handle both sign in and sign up for Google OAuth
                  console.log("Google sign up");
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
                Google ile Kayıt Ol
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
