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
  const router = useRouter();

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
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
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

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully!");

      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.info("Please sign in with your new account");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Start your speed reading journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your Full Name"
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
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
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
                Password
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
                Confirm Password
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
                  I have read and accept the{" "}
                  <Link href="/terms" className="text-[#007BFF] hover:underline">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#007BFF] hover:underline">
                    Privacy Policy
                  </Link>
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
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link 
              href="/auth/signin"
              className="text-[#007BFF] hover:underline font-semibold"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
