import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-sky-600">
                NoCode.AI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/features"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-sky-900"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-sky-900"
              >
                Pricing
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-sky-900"
              >
                Docs
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-sky-900"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 