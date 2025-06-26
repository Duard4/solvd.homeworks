/**
 * @fileoverview Search bar component for filtering countries by name
 */

import { ChangeEvent, JSX } from 'react';
import { TextInput } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import { SearchBarProps } from '@/types/props';

/**
 * Search bar component for filtering countries
 * @param props - The component props
 * @returns JSX.Element The search bar component
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search for a country...',
  className = '',
}: SearchBarProps): JSX.Element {
  /**
   * Handles input change events
   * @param event - The input change event
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <TextInput
        id="country-search"
        type="text"
        icon={FaSearch}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        sizing="lg"
        className="w-full"
      />
    </div>
  );
}
