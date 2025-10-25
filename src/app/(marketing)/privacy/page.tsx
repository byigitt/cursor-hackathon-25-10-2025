import Link from "next/link";
import { ThemeToggle } from "~/components/theme-toggle";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
              Last Updated: October 25, 2025
            </p>

            <div className="max-w-4xl space-y-12">
              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">1. Introduction</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  At Synapp, we respect your privacy and are committed to protecting your personal data. This Privacy Policy aims to inform you about the information collected, processed, and stored when you use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">2. Data We Collect</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Our platform may collect the following personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li><strong>Identity Information:</strong> First name, last name, email address</li>
                  <li><strong>Account Information:</strong> Username, password (encrypted)</li>
                  <li><strong>Usage Data:</strong> Platform usage statistics, session information</li>
                  <li><strong>Uploaded Content:</strong> Documents you upload for educational purposes</li>
                  <li><strong>Progress Data:</strong> Quiz results, study sessions, streak information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">3. Purpose of Data Use</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  The collected data is used for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>To create and manage your user account</li>
                  <li>To provide and improve platform services</li>
                  <li>To perform AI-powered document summarization and content analysis</li>
                  <li>To provide a personalized learning experience</li>
                  <li>To track and report your progress</li>
                  <li>To provide technical support</li>
                  <li>To maintain platform security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">4. Data Storage and Security</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  The security of your data is our priority:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>Passwords are protected with strong encryption algorithms</li>
                  <li>Data is stored on secure servers</li>
                  <li>Data transmission is encrypted with HTTPS protocol</li>
                  <li>Regular security updates are performed</li>
                  <li>Protection measures are taken against unauthorized access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">5. Data Sharing</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  Your personal data is not shared with third parties. Data sharing may only occur in the following cases:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li>When required by law</li>
                  <li>With your explicit consent</li>
                  <li>With technical service providers necessary to provide platform services (under data processing agreements)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">6. Cookies</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our platform uses cookies to improve user experience. Cookies are used for session management, preference storage, and usage analysis. You can manage or disable cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">7. User Rights</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  As users, you have the following rights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4 text-lg leading-relaxed">
                  <li><strong>Right of Access:</strong> You can request access to your personal data</li>
                  <li><strong>Right to Rectification:</strong> You can request correction of incorrect data</li>
                  <li><strong>Right to Erasure:</strong> You can request deletion of your account and data</li>
                  <li><strong>Right to Data Portability:</strong> You can request a copy of your data</li>
                  <li><strong>Right to Object:</strong> You can object to data processing activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">8. Third-Party Services</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our platform may use third-party authentication services such as Google. These services have their own privacy policies, and the relevant service's privacy policy applies during their use.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">9. Children's Privacy</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our platform is not intended for children under 13 years of age. We do not knowingly collect personal data from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">10. Policy Changes</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  This Privacy Policy may be updated from time to time. We will inform you when significant changes occur. We recommend that you regularly review the current policy.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">11. Contact</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  If you have questions about our privacy policy or your personal data, please contact us through our{" "}
                  <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                    contact page
                  </Link>
                  .
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
