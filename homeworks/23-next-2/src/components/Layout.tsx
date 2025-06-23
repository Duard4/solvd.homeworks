/**
 * @fileoverview Main layout component with header, navigation and dark mode toggle
 */

import React, { JSX } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

/**
 * Props for the Layout component
 * @property children - child components to render
 * @property title - optional title for the page
 */
interface LayoutProps {
  /** Child components to render */
  children: React.ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Provides consistent navigation and theme switching
 * @param props - The component props
 * @returns JSX.Element The layout component
 */
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col justify-between">
      <Navigation />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
