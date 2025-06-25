/**
 * @fileoverview Empty state component for favorites page
 */

import { FavoritesEmptyStateProps } from '@/types/props';
import { JSX } from 'react';

/**
 * Empty state component for when user has no favorites
 * @param props - The component props
 * @returns JSX.Element The favorites empty state component
 */
export default function FavoritesEmptyState({
  onBrowseAll,
  onRandomCountry,
}: FavoritesEmptyStateProps): JSX.Element {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 dark:text-gray-500 mb-6">
        <svg
          className="mx-auto h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        No favorites yet
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Start exploring countries and click the heart icon to add them to your favorites. Your
        favorites will be saved and accessible across sessions.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onBrowseAll}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5v6l3-3 3 3V5"
            />
          </svg>
          Browse All Countries
        </button>
        <button
          onClick={onRandomCountry}
          className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Random Country
        </button>
      </div>
    </div>
  );
}
