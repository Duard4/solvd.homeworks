import AvatarGrid from '@/components/AvatarGrid';
import { fetchAvatars } from '@/lib/avatarApi';
import { Avatar } from '@/types/avatar';
import Link from 'next/link';
import { JSX } from 'react';

/**
 * SSG (Static Site Generation) Page Component
 * @module SSGPage
 * @description Page that demonstrates Static Site Generation in Next.js.
 * Pre-renders the page at build time with avatar data.
 * @exports SSGPage
 */

/**
 * Configures the page to opt out of dynamic behavior (SSG)
 * @constant {string}
 * @default 'force-static'
 */
export const dynamic = 'force-static';

/**
 * SSG Page Component
 * @async
 * @function SSGPage
 * @returns {Promise<JSX.Element>} The pre-rendered static page
 * @example
 * // Renders the page with build-time data
 * <SSGPage />
 */
export default async function SSGPage(): Promise<JSX.Element> {
  /**
   * Fetches initial avatars data at build time
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
        <h1>Avatar App - SSG</h1>
        <p>This page uses Static Site Generation. Avatars are pre-rendered at build time.</p>
      </div>
      <AvatarGrid initialAvatars={initialAvatars} />
    </div>
  );
}
