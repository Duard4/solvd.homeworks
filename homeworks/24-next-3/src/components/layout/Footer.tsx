/**
 * @fileoverview Footer component with links and attribution
 */

import { JSX } from 'react';

/**
 * Footer component with attribution and links
 * @returns JSX.Element The footer component
 */
export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Next.js
            </a>{' '}
            and{' '}
            <a
              href="https://restcountries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              REST Countries API
            </a>
          </p>
          <p className="text-sm">© {currentYear} Country Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
