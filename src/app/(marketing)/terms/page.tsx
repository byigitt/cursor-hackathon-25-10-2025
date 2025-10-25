import Link from "next/link";
import { ThemeToggle } from "~/components/theme-toggle";

export default function TermsPage() {
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
              Terms of Service
            </h1>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
              Last Updated: October 25, 2025
            </p>

            <div className="max-w-4xl space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">1. Service Description</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Synapp is a web platform that provides users with services such as AI-powered document summarization, speed reading with RSVP (Rapid Serial Visual Presentation) technique, interactive quizzes, and learning tracking. By accepting these Terms of Service, you gain the right to use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">2. Account Creation and Responsibilities</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  You must create an account to use our platform:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>You must provide accurate and current information when creating an account</li>
                  <li>You are responsible for the security of your account</li>
                  <li>You must not share your password with anyone</li>
                  <li>You are responsible for all activities on your account</li>
                  <li>You cannot use our platform if you are under 13 years of age</li>
                  <li>You must immediately report unauthorized use of your account to us</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">3. Acceptable Use</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  You must comply with the following rules when using our platform:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>Uploading or sharing illegal content is prohibited</li>
                  <li>Do not upload copyrighted content without permission</li>
                  <li>Files containing malware, viruses, or malicious code must not be uploaded</li>
                  <li>Do not attempt to disrupt the security or operation of the platform</li>
                  <li>Avoid behavior that harms other users</li>
                  <li>Do not create spam, harassment, or misleading content</li>
                  <li>Do not use the platform for commercial purposes without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">4. Content and Intellectual Property</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  The following provisions apply regarding content rights and intellectual property:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li><strong>Platform Content:</strong> The platform's design, logo, software, and all content belong to Synapp</li>
                  <li><strong>User Content:</strong> Ownership of documents you upload belongs to you</li>
                  <li><strong>Processing License:</strong> By uploading your content, you grant our platform permission to process this content to provide services</li>
                  <li><strong>AI Processing:</strong> Uploaded content may be processed by AI systems for summary creation and analysis</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">5. Service Availability</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Although we strive to provide platform services without interruption and error-free, we are not responsible for the following situations:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>Interruptions due to technical failures or maintenance work</li>
                  <li>Internet connection issues</li>
                  <li>Problems arising from third-party service providers</li>
                  <li>Scheduled updates and improvements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">6. Pricing</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  The platform is currently offered free of charge. Paid subscription plans or premium features may be added in the future. If paid services are added, users will be informed in advance.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">7. Account Suspension and Termination</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  We may suspend or terminate your account in the following cases:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>Violation of Terms of Service</li>
                  <li>Engaging in illegal activities</li>
                  <li>Harming other users</li>
                  <li>Compromising platform security</li>
                  <li>Not using your account for an extended period (inactive accounts)</li>
                </ul>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  You can also close your account at any time. When an account is closed, your data will be processed in accordance with our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">8. Disclaimer</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  The platform is provided "as is". By using our services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>No guarantee is given that the platform will be uninterrupted, error-free, or secure</li>
                  <li>AI-generated summaries are not guaranteed to be 100% accurate</li>
                  <li>We are not responsible for direct or indirect damages arising from the use of the platform</li>
                  <li>We are not responsible for the accuracy or quality of user content</li>
                  <li>We are not responsible for problems arising from third-party services (Google OAuth, etc.)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">9. Indemnification</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  You agree to indemnify Synapp for any damages, lawsuits, and costs arising from your use of the platform in violation of the Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">10. Changes</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  We may update these Terms of Service from time to time. We will inform you when significant changes occur. Your continued use of the platform after changes means you accept the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">11. Governing Law</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  These Terms of Service are governed by the laws of the Republic of Turkey. Disputes arising from the use of the platform will be resolved in Turkish courts.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">12. Contact</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you have questions about the Terms of Service, please contact us through our{" "}
                  <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                    contact page
                  </Link>
                  .
                </p>
              </section>

              <section className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  By using this platform, you declare that you have read, understood, and agree to the above Terms of Service.
                </p>
              </section>
            </div>
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
