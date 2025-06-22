/**
 * @fileoverview Navigation component with header and mobile menu
 */

import React, { JSX, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaGlobe, FaHeart, FaRandom, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';

/**
 * Navigation link interface
 * @property href - link address
 * @property icon - respective icon of page, which link lead to
 * @property label - name of page, which link lead to
 */
interface NavLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

/**
 * Navigation links configuration
 */
const navLinks: NavLink[] = [
  { href: '/', icon: FaHome, label: 'All Countries' },
  { href: '/random', icon: FaRandom, label: 'Random Country' },
  { href: '/favorites', icon: FaHeart, label: 'Favorites' },
];

/**
 * Navigation component with responsive design
 * @returns JSX.Element The navigation component
 */
export default function Navigation(): JSX.Element {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Checks if the current route matches the given path
   * @param path - The path to check against
   * @returns boolean True if the current route matches
   */
  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  /**
   * Gets CSS classes for navigation links
   * @param path - The path to check
   * @returns CSS classes for the link
   */
  const getLinkClasses = (path: string): string => {
    const baseClasses =
      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors';
    const activeClasses = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900';
    const inactiveClasses =
      'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700';

    return `${baseClasses} ${isActivePath(path) ? activeClasses : inactiveClasses}`;
  };

  /**
   * Gets CSS classes for mobile navigation links
   * @param path - The path to check
   * @returns string CSS classes for the mobile link
   */
  const getMobileLinkClasses = (path: string): string => {
    const baseClasses = 'flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium';
    const activeClasses = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900';
    const inactiveClasses =
      'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700';

    return `${baseClasses} ${isActivePath(path) ? activeClasses : inactiveClasses}`;
  };

  /**
   * Closes mobile menu
   */
  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
              <FaGlobe className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Country Explorer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className={getLinkClasses(href)}>
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={getMobileLinkClasses(href)}
                onClick={closeMobileMenu}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
