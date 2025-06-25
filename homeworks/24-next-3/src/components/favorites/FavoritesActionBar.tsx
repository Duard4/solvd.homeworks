/**
 * @fileoverview Action bar component for favorites page
 */

import { FavoritesActionBarProps } from '@/types/props';
import { JSX } from 'react';

/**
 * Action bar component for favorites page
 * @param props - The component props
 * @returns JSX.Element The favorites action bar component
 */
export default function FavoritesActionBar({
  favoriteCount,
  onAddMore,
  onClearAll,
}: FavoritesActionBarProps): JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <svg className="mr-2 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        {favoriteCount} favorite{favoriteCount === 1 ? '' : 's'} country
        {favoriteCount === 1 ? '' : 'ies'}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAddMore}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add More
        </button>
        <button
          onClick={onClearAll}
          className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 rounded-md text-sm font-medium text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Clear All
        </button>
      </div>
    </div>
  );
}
