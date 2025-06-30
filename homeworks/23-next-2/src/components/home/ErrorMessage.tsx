/**
 * @fileoverview Reusable error message component
 */

import { ErrorMessageProps } from '@/types/props';
import { JSX } from 'react';

/**
 * ErrorMessage component for displaying error states
 * @param props - The component props
 * @returns JSX.Element The error message component
 */
export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps): JSX.Element {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
      <div className="flex items-center justify-between">
        <p className="text-red-800 dark:text-red-200 text-sm">⚠️ {message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm underline"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
