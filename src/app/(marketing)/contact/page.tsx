"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement API endpoint for contact form
    // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })
    console.log("Contact form submission:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#0a0f16]">
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-[#0a0f16]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/synapp-logo-white.svg" 
                  alt="Synapp" 
                  className="h-8 w-8 dark:invert-0 invert" 
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Synapp
                </span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Contact
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              Get in touch with us for questions, suggestions, or feedback.
            </p>

            {isSubmitted && (
              <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg max-w-2xl">
                <p className="text-green-800 dark:text-green-300 font-medium">
                  Your message has been sent successfully! We'll get back to you as soon as possible.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={isSubmitting}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isSubmitting}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject of your message"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  disabled={isSubmitting}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  disabled={isSubmitting}
                  className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0f16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-6">
              <Link 
                href="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
              <Link 
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              © 2025 Synapp. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
