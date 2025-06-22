/**
 * @fileoverview Search bar component for filtering countries by name
 */

import React, { JSX } from 'react';
import { TextInput } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';

/**
 * Props for the SearchBar component
 * @property value - current search value,
 * @property placeholder - placeholder text for the input,
 * @property className - optional CSS class names
 */
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
