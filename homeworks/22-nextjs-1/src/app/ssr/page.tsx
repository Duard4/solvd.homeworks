import AvatarGrid from '@/components/AvatarGrid';
import { fetchAvatars } from '@/lib/avatarApi';
import { Avatar } from '@/types/avatar';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * SSR (Server-Side Rendering) Page Component
 * @module SSRPage
 * @description Page that demonstrates Server-Side Rendering in Next.js.
 * Fetches avatar data on each request and renders the page dynamically.
 * @exports SSRPage
 */

/**
 * Configures the page to opt into dynamic behavior (SSR)
 * @constant {string}
 * @default 'force-dynamic'
 */
export const dynamic = 'force-dynamic';

/**
 * SSR Page Component
 * @async
 * @function SSRPage
 * @returns {Promise<JSX.Element>} The rendered SSR page
 * @example
 * // Renders the page with fresh data on each request
 * <SSRPage />
 */
export default async function SSRPage(): Promise<JSX.Element> {
  /**
   * Fetches initial avatars data
   * @type {Avatar[]}
   */
  let initialAvatars: Avatar[];

  try {
    initialAvatars = await fetchAvatars(5);
  } catch (error) {
    console.error('Failed to fetch initial avatars:', error);
    initialAvatars = [];
  }

  return (
    <div>
      <div className="header">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        <h1>Avatar App - SSR</h1>
        <p>This page uses Server-Side Rendering. Avatars are fetched on each request.</p>
      </div>
      <AvatarGrid initialAvatars={initialAvatars} />
    </div>
  );
}
