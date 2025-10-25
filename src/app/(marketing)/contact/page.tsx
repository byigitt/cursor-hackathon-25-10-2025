"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpenCheck } from "lucide-react";
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
      newErrors.name = "İsim gereklidir";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Konu gereklidir";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesaj gereklidir";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalıdır";
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
    <div className="relative flex min-h-screen w-full flex-col bg-white dark:bg-[#101922]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-4xl flex-1 px-4">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap py-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <BookOpenCheck className="h-6 w-6 text-[#007BFF]" />
                <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  Hızlı Okuma Platformu
                </h2>
              </Link>
              <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12">
              <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                İletişim
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 font-medium">
                    Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    İsim <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Adınız Soyadınız"
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
                    E-posta <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
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
                    Konu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Mesajınızın konusu"
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
                    Mesaj <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Mesajınızı buraya yazın..."
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
                  className="bg-[#007BFF] hover:bg-[#007BFF]/90 text-white font-bold transition-transform duration-200 hover:scale-[1.02] h-12 px-8"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </main>

            {/* Footer */}
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <Link 
                  href="/about"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Hakkında
                </Link>
                <Link 
                  href="/contact"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  İletişim
                </Link>
                <Link 
                  href="/privacy"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Gizlilik Politikası
                </Link>
                <Link 
                  href="/terms"
                  className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal hover:text-[#007BFF] dark:hover:text-[#007BFF]"
                >
                  Kullanım Koşulları
                </Link>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                © 2023 Hızlı Okuma Platformu. All Rights Reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
