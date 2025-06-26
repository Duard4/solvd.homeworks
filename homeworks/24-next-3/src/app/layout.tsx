/**
 * @fileoverview Root layout for the Next.js app, wraps all pages with Layout component
 */

import { ChildrenProps } from '@/types/props';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
