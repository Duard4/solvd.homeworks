/**
 * @fileoverview TypeScript interfaces for props to components
 */

import { ReactNode, JSX } from 'react';
import { Country, Region } from './country';

/** PAGE PROPS */
/**
 * Props for components that need to render child elements
 */
export interface ChildrenProps {
  /** Child components to render */
  children: ReactNode;
}

/**
 * Props for components that receive a list of countries
 */
export interface CountriesListProps {
  /** Array of all countries */
  countries: Country[];
}

/**
 * Props for the CountryPage component
 */
export interface CountryPageProps {
  /** Country data to display */
  country: Country;
  /** Array of all countries for border resolution */
  allCountries: Country[];
}

/** COUNTRY COMPONENT PROPS */
/**
 * Props for the CountryDetails component
 *
 * @property country - The country to display details for
 * @property isFavorite - Whether the country is currently marked as a favorite
 * @property onToggleFavorite - Callback to toggle the favorite status of a country by name
 * @property allCountries - Optional list of all countries to resolve border names
 * @property className - Optional custom CSS classes for the wrapper
 */
export interface CountryDetailsProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (countryName: string) => void;
  allCountries?: Country[];
  className?: string;
}

/**
 * Props for the CountryCard component
 * @property country - country data to display
 * @property isFavorite - whether this country is favorited
 * @property onToggleFavorite - callback function to toggle favorite status
 * @property className - optional CSS class names
 */
export interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (countryName: string) => void;
  className?: string;
}

/**
 * Props for the InfoRow component
 */
export interface InfoRowProps {
  /** The label to display */
  label: string;
  /** The value to display (if null, row is hidden) */
  value: string | number | JSX.Element | null | undefined;
}

/** REST */
/**
 * Props for the ResultsSummary component
 */
export interface ResultsSummaryProps {
  /** Whether data is currently loading */
  isLoading: boolean;
  /** Number of filtered countries */
  filteredCount: number;
  /** Total number of countries */
  totalCount: number;
  /** Currently selected region */
  selectedRegion: string;
  /** Current search term */
  searchTerm: string;
  /** Number of favorites */
  favoritesCount: number;
}

/**
 * Props for the ErrorMessage component
 */
export interface ErrorMessageProps {
  /** Error message to display */
  message: string;
  /** Optional callback when dismiss button is clicked */
  onDismiss?: () => void;
}

/**
 * Props for the EmptyState component
 */
export interface EmptyStateProps {
  /** Callback when clear filters button is clicked */
  onClearFilters: () => void;
  /** Optional title override */
  title?: string;
  /** Optional description override */
  description?: string;
  /** Optional button text override */
  buttonText?: string;
}

/**
 * Props for the FavoritesEmptyState component
 */
export interface FavoritesEmptyStateProps {
  /** Callback when browse all button is clicked */
  onBrowseAll: () => void;
  /** Callback when random country button is clicked */
  onRandomCountry: () => void;
}

/**
 * Props for the FavoritesActionBar component
 */
export interface FavoritesActionBarProps {
  /** Number of favorite countries */
  favoriteCount: number;
  /** Callback when add more button is clicked */
  onAddMore: () => void;
  /** Callback when clear all button is clicked */
  onClearAll: () => void;
}

/**
 * Props for the FavoritesFooterStats component
 */
export interface FavoritesFooterStatsProps {
  /** Number of favorite countries */
  favoriteCount: number;
  /** Total number of countries */
  totalCount: number;
}

/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  /** Current search value */
  value: string;
  /** Callback when search value changes */
  onChange: (value: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Optional CSS class names */
  className?: string;
}

/**
 * Props for the RegionFilter component
 */
export interface RegionFilterProps {
  /** Currently selected region */
  selectedRegion: Region | 'all';
  /** Callback when region selection changes */
  onRegionChange: (region: Region | 'all') => void;
  /** Optional CSS class names */
  className?: string;
  /** Loading state passed from parent */
  isLoading?: boolean;
}

/**
 * Props for the page params
 */
export interface PageProps {
  /** Page parameters containing route data */
  params: Promise<{
    name: string;
  }>;
}

/**
 * Props for the LoadingSpinner component
 */
export interface LoadingSpinnerProps {
  /** Optional message to display below spinner */
  message?: string;
}

/**
 * Props for the Layout component
 */
export interface LayoutProps {
  /** Child components to render */
  children: React.ReactNode;
}

/**
 * Props for PageHeader component
 */
export interface PageHeaderProps {
  title: string;
  semititle: string;
}
