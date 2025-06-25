/**
 * @fileoverview Home page displaying all countries with search and filter functionality
 * Uses /api/region endpoint for region filtering
 */

import { useState, useMemo, JSX } from 'react';
import { GetStaticProps } from 'next';
import { useFavorites } from '@/hooks/useFavorites';
import { useRegionFilter } from '@/hooks/useRegionFilter';
import { getAllCountries } from '@/utils/api';
import { Country } from '@/types/country';
import Head from 'next/head';
import CountryCard from '@/components/country/CountryCard';
import SearchBar from '@/components/controls/SearchBar';
import RegionFilter from '@/components/controls/RegionFilter';
import CountryGrid from '@/components/country/CountryGrid';
import PageHeading from '@/components/layout/PageHeading';
import ResultsSummary from '@/components/home/ResultsSummary';
import ErrorMessage from '@/components/home/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/home/EmptyState';

/**
 * Props for the Home page component
 */
interface HomeProps {
  /** Array of all countries */
  countries: Country[];
}

/**
 * Home page component displaying all countries
 * @param props - The component props
 * @returns JSX.Element The home page component
 */
export default function Home({ countries }: HomeProps): JSX.Element {
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
    <>
      <Head>
        <title>All Countries - Country Explorer</title>
        <meta
          name="description"
          content="Explore all countries around the world. Search, filter by region, and save your favorites."
        />
      </Head>

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
    </>
  );
}

/**
 * Static generation: fetch all countries at build time
 * @returns GetStaticPropsResult with countries data
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const countries = await getAllCountries();

    return {
      props: {
        countries,
      },
      // Revalidate every 24 hours
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error('Error fetching countries for homepage:', error);

    return {
      props: {
        countries: [],
      },
      // Retry more frequently on error
      revalidate: 60 * 5, // 5 minutes
    };
  }
};
