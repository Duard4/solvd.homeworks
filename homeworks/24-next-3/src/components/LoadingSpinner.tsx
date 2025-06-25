/**
 * @fileoverview Reusable loading spinner component
 */

import { LoadingSpinnerProps } from '@/types/props';
import { JSX } from 'react';

/**
 * LoadingSpinner component for displaying loading states
 * @param props - The component props
 * @returns JSX.Element The loading spinner component
 */
export default function LoadingSpinner({
  message = 'Loading...',
}: LoadingSpinnerProps): JSX.Element {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400 dark:text-gray-500 mb-4">
        <div className="animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}
