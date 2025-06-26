/**
 * @fileoverview Reusable empty state component
 */

import { EmptyStateProps } from '@/types/props';
import { JSX } from 'react';
import { FaDizzy } from 'react-icons/fa';

/**
 * EmptyState component for displaying no results states
 * @param props - The component props
 * @returns JSX.Element The empty state component
 */
export default function EmptyState({
  onClearFilters,
  title = 'No countries found',
  description = 'Try adjusting your search term or region filter.',
  buttonText = 'Clear filters',
}: EmptyStateProps): JSX.Element {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400 dark:text-gray-500 mb-4">
        <FaDizzy className="h-14 w-14 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <button
        onClick={onClearFilters}
        className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
