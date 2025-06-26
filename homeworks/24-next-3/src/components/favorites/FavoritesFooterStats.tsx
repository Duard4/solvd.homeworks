/**
 * @fileoverview Footer stats component for favorites page
 */

import { FavoritesFooterStatsProps } from '@/types/props';
import { JSX } from 'react';

/**
 * Footer stats component for favorites page
 * @param props - The component props
 * @returns JSX.Element The favorites footer stats component
 */
export default function FavoritesFooterStats({
  favoriteCount,
  totalCount,
}: FavoritesFooterStatsProps): JSX.Element {
  const percentage = totalCount > 0 ? ((favoriteCount / totalCount) * 100).toFixed(1) : '0';

  return (
    <div className="text-center py-8">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You&apos;ve favorited {favoriteCount} out of {totalCount} countries
        {favoriteCount > 0 && <span className="ml-2">({percentage}% of the world!)</span>}
      </p>
    </div>
  );
}
