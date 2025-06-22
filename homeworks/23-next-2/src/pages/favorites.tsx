/**
 * @fileoverview Favorites page displaying user's favorite countries
 */

import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { JSX, useEffect, useState } from 'react';
import CountryCard from '@/components/CountryCard';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllCountries } from '@/utils/api';
import { Country } from '@/types/country';
import CountryGrid from '@/components/CountryGrid';
import PageHeading from '@/components/PageHeading';

/**
 * Props for the FavoritesPage component
 */
interface FavoritesPageProps {
  /** Array of all countries for filtering favorites */
  allCountries: Country[];
}

/**
 * Favorites page component
 * @param props - The component props
 * @returns JSX.Element The favorites page component
 */
export default function FavoritesPage({ allCountries }: FavoritesPageProps): JSX.Element {
  const router = useRouter();
  const { favorites, toggleFavorite, checkIsFavorite } = useFavorites();
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Filter countries to show only favorites
   */
  useEffect(() => {
    if (allCountries.length > 0) {
      const filtered = allCountries.filter((country) => favorites.includes(country.name.common));
      setFavoriteCountries(filtered);
      setIsLoading(false);
    }
  }, [allCountries, favorites]);

  /**
   * Handles removing all favorites
   */
  const handleClearAllFavorites = (): void => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      favoriteCountries.forEach((country) => {
        toggleFavorite(country.name.common);
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Favorites - Country Explorer</title>
          <meta name="description" content="Your favorite countries from around the world." />
        </Head>

        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>My Favorites ({favoriteCountries.length}) - Country Explorer</title>
        <meta
          name="description"
          content={`Your ${favoriteCountries.length} favorite countries from around the world.`}
        />
      </Head>

      <div className="space-y-6">
        {/* Page Header */}
        <PageHeading
          title="My Favorite Countries"
          semititle={
            favoriteCountries.length === 0
              ? "You haven't added any countries to your favorites yet."
              : `You have ${favoriteCountries.length} favorite ${favoriteCountries.length === 1 ? 'country' : 'countries'}.`
          }
        />
        {favoriteCountries.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-6">
              <svg
                className="mx-auto h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Start exploring countries and click the heart icon to add them to your favorites. Your
              favorites will be saved and accessible across sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5v6l3-3 3 3V5"
                  />
                </svg>
                Browse All Countries
              </button>
              <button
                onClick={() => router.push('/random')}
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Random Country
              </button>
            </div>
          </div>
        ) : (
          /* Favorites Content */
          <>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="mr-2 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {favoriteCountries.length} favorite{' '}
                {favoriteCountries.length === 1 ? 'country' : 'countries'}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add More
                </button>
                <button
                  onClick={handleClearAllFavorites}
                  className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-600 rounded-md text-sm font-medium text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear All
                </button>
              </div>
            </div>

            {/* Countries Grid */}
            <CountryGrid>
              {favoriteCountries.map((country) => (
                <CountryCard
                  key={country.name.common}
                  country={country}
                  isFavorite={checkIsFavorite(country.name.common)}
                  onToggleFavorite={() => toggleFavorite(country.name.common)}
                />
              ))}
            </CountryGrid>

            {/* Footer Stats */}
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You&apos;ve favorited {favoriteCountries.length} out of {allCountries.length}{' '}
                countries
                {favoriteCountries.length > 0 && (
                  <span className="ml-2">
                    ({((favoriteCountries.length / allCountries.length) * 100).toFixed(1)}% of the
                    world!)
                  </span>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/**
 * Static props generation for the favorites page
 * @returns GetStaticProps result with all countries data
 */
export const getStaticProps: GetStaticProps<FavoritesPageProps> = async () => {
  try {
    const allCountries = await getAllCountries();

    return {
      props: {
        allCountries,
      },
      // Revalidate every 24 hours to get fresh country data
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error fetching countries for favorites page:', error);

    return {
      props: {
        allCountries: [],
      },
      // Retry after 5 minutes if there was an error
      revalidate: 300,
    };
  }
};
