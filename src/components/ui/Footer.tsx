import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-sky-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-sky-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-sky-700">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-sky-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-sky-700">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-sky-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-sky-700">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-600 hover:text-sky-700">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-sky-700">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-sky-900 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/discord" className="text-gray-600 hover:text-sky-700">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="/twitter" className="text-gray-600 hover:text-sky-700">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/github" className="text-gray-600 hover:text-sky-700">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-sky-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-gray-600 hover:text-sky-700">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/sales" className="text-gray-600 hover:text-sky-700">
                  Sales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-sky-100">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} NoCode.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 