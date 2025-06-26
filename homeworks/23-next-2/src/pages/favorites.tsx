/**
 * @fileoverview Favorites page displaying user's favorite countries
 */

import { JSX, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllCountries } from '@/utils/api';
import { Country } from '@/types/country';
import { CountriesListProps } from '@/types/props';
import Head from 'next/head';
import CountryCard from '@/components/country/CountryCard';
import CountryGrid from '@/components/country/CountryGrid';
import PageHeading from '@/components/layout/PageHeading';
import FavoritesEmptyState from '@/components/favorites/FavoritesEmptyState';
import FavoritesActionBar from '@/components/favorites/FavoritesActionBar';
import FavoritesFooterStats from '@/components/favorites/FavoritesFooterStats';
import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * Favorites page component
 * @param props - The component props
 * @returns JSX.Element The favorites page component
 */
export default function FavoritesPage({ countries }: CountriesListProps): JSX.Element {
  const router = useRouter();
  const { favorites, toggleFavorite, checkIsFavorite } = useFavorites();
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Filter countries to show only favorites
   */
  useEffect(() => {
    if (countries.length > 0) {
      const filtered = countries.filter((country) => favorites.includes(country.name.common));
      setFavoriteCountries(filtered);
      setIsLoading(false);
    }
  }, [countries, favorites]);

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

        <LoadingSpinner />
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
          <FavoritesEmptyState
            onBrowseAll={() => router.push('/')}
            onRandomCountry={() => router.push('/random')}
          />
        ) : (
          <>
            {/* Action Bar */}
            <FavoritesActionBar
              favoriteCount={favoriteCountries.length}
              onAddMore={() => router.push('/')}
              onClearAll={handleClearAllFavorites}
            />

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
            <FavoritesFooterStats
              favoriteCount={favoriteCountries.length}
              totalCount={countries.length}
            />
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
export const getStaticProps: GetStaticProps<CountriesListProps> = async () => {
  try {
    const countries = await getAllCountries();

    return {
      props: {
        countries,
      },
      // Revalidate every 24 hours to get fresh country data
      revalidate: 86400,
    };
  } catch (error) {
    console.error('Error fetching countries for favorites page:', error);

    return {
      props: {
        countries: [],
      },
      // Retry after 5 minutes if there was an error
      revalidate: 300,
    };
  }
};
