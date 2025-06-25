'use client';

/**
 * @fileoverview Client component for favorites page
 */

import { useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { Country } from '@/types/country';
import { CountriesListProps } from '@/types/props';
import CountryCard from '@/components/country/CountryCard';
import CountryGrid from '@/components/country/CountryGrid';
import PageHeading from '@/components/layout/PageHeading';
import LoadingSpinner from '@/components/LoadingSpinner';
import FavoritesEmptyState from '@/components/favorites/FavoritesEmptyState';
import FavoritesActionBar from '@/components/favorites/FavoritesActionBar';
import FavoritesFooterStats from '@/components/favorites/FavoritesFooterStats';

/**
 * Client component for favorites page
 * @param props - The component props
 * @returns JSX.Element The favorites client component
 */
export default function FavoritesClient({ countries }: CountriesListProps): JSX.Element {
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
    return <LoadingSpinner message="Loading your favorites..." />;
  }

  return (
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
  );
}
