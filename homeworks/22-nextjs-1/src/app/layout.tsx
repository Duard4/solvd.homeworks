import type { Metadata } from 'next';
import './globals.css';
import './page.css';

/**
 * Metadata for the application
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: 'Avatar App',
  description: 'A Next.js app for managing avatar tiles',
};

/**
 * Root layout component for the application
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Root layout structure
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
