/**
 * @fileoverview Home page displaying all countries with search and filter functionality
 * Uses /api/region endpoint for region filtering
 */

import { useState, useMemo, JSX } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import CountryCard from '@/components/CountryCard';
import SearchBar from '@/components/SearchBar';
import RegionFilter from '@/components/RegionFilter';
import { useFavorites } from '@/hooks/useFavorites';
import { useRegionFilter } from '@/hooks/useRegionFilter';
import { getAllCountries } from '@/utils/api';
import { Country } from '@/types/country';
import CountryGrid from '@/components/CountryGrid';
import PageHeading from '@/components/PageHeading';
import { FaDizzy } from 'react-icons/fa';

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
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
            <div className="flex items-center justify-between">
              <p className="text-red-800 dark:text-red-200 text-sm">⚠️ {error}</p>
              <button
                onClick={clearError}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoading ? (
              'Loading countries...'
            ) : (
              <>
                Showing {filteredCountries.length} of {displayCountries.length} countries
                {selectedRegion !== 'all' && ` in ${selectedRegion}`}
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedRegion !== 'all' && ' (via API)'}
              </>
            )}
          </p>
          {favorites.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Countries Grid */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <div className="animate-spin h-8 w-8 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Loading countries...</p>
          </div>
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
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <FaDizzy className="h-14 w-14 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No countries found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search term or region filter.
            </p>
            <button
              onClick={clearFilters}
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              Clear filters
            </button>
          </div>
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
