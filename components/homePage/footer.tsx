// Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-200 grainy-light py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Quickline. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <Link
              href="/privacypolicy"
              className="text-sm text-green-600 hover:underline"
            >
              Privacy Policy
            </Link>
            {/* <Link
              href="/terms-of-service"
              className="text-sm text-green-600 hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-green-600 hover:underline"
            >
              Contact Us
            </Link> */}
          </nav>
        </div>
      </div>
    </footer>
  );
}
