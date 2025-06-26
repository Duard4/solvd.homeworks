'use client';
/**
 * @fileoverview Client component for home page with interactive functionality
 */

import { useState, useMemo, JSX } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { useRegionFilter } from '@/hooks/useRegionFilter';
import { CountriesListProps } from '@/types/props';
import CountryCard from '@/components/country/CountryCard';
import SearchBar from '@/components/controls/SearchBar';
import RegionFilter from '@/components/controls/RegionFilter';
import CountryGrid from '@/components/country/CountryGrid';
import PageHeading from '@/components/layout/PageHeading';
import ErrorMessage from '@/components/home/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/home/EmptyState';
import ResultsSummary from '@/components/home/ResultsSummary';

/**
 * Client component handling all interactive functionality
 * @param props - The component props
 * @returns JSX.Element The home client component
 */
export default function HomeClient({ countries }: CountriesListProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, toggleFavorite, checkIsFavorite } = useFavorites();
  const { displayCountries, selectedRegion, isLoading, error, handleRegionChange, clearError } =
    useRegionFilter(countries);

  /**
   * Filtered countries based on search term
   */
  const filteredCountries = useMemo(() => {
    return displayCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [displayCountries, searchTerm]);

  /**
   * Clear all filters and errors
   */
  const clearFilters = () => {
    setSearchTerm('');
    clearError();
    handleRegionChange('all');
  };

  return (
    <div className="space-y-6">
      <PageHeading
        title="Explore Countries"
        semititle="Discover detailed information about countries around the world. Search by name, filter
          by region, and save your favorites."
      />

      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="w-full lg:w-1/2">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search countries..."
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-auto">
          <RegionFilter
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} onDismiss={clearError} />}

      {/* Results Summary */}
      <ResultsSummary
        isLoading={isLoading}
        filteredCount={filteredCountries.length}
        totalCount={displayCountries.length}
        selectedRegion={selectedRegion}
        searchTerm={searchTerm}
        favoritesCount={favorites.length}
      />

      {/* Countries Grid */}
      {isLoading ? (
        <LoadingSpinner message="Loading countries..." />
      ) : filteredCountries.length > 0 ? (
        <CountryGrid>
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavorite={checkIsFavorite(country.name.common)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </CountryGrid>
      ) : (
        <EmptyState onClearFilters={clearFilters} />
      )}
    </div>
  );
}
