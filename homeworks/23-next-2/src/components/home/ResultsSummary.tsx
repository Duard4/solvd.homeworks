/**
 * @fileoverview Reusable results summary component
 */

import { ResultsSummaryProps } from '@/types/props';
import { JSX } from 'react';

/**
 * ResultsSummary component for displaying search/filter results summary
 * @param props - The component props
 * @returns JSX.Element The results summary component
 */
export default function ResultsSummary({
  isLoading,
  filteredCount,
  totalCount,
  selectedRegion,
  searchTerm,
  favoritesCount,
}: ResultsSummaryProps): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {isLoading ? (
          'Loading countries...'
        ) : (
          <>
            Showing {filteredCount} of {totalCount} countries
            {selectedRegion !== 'all' && ` in ${selectedRegion}`}
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedRegion !== 'all' && ' (via API)'}
          </>
        )}
      </p>
      {favoritesCount > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {favoritesCount} favorite{favoritesCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
