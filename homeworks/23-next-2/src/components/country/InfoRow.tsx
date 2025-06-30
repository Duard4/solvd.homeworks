/**
 * @fileoverview InfoRow component for displaying row of data about country
 */
import { InfoRowProps } from '@/types/props';
import { JSX } from 'react';

/**
 * Subcomponent for displaying label-value pairs.
 * Renders a row only if a value is provided.
 *
 * @param {InfoRowProps} props - Component props
 * @returns {JSX.Element | null} Rendered info row or null if no value
 */
export default function InfoRow({ label, value }: InfoRowProps): JSX.Element | null {
  if (value === null || value === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <span className="font-medium text-gray-600 dark:text-gray-400">{label}:</span>
      <span className="text-gray-900 dark:text-white font-medium">{value}</span>
    </div>
  );
}
