'use client';
/**
 * @fileoverview Client component for country detail page
 */

import { JSX } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { CountryPageClientProps } from '@/types/props';
import CountryDetails from '@/components/country/CountryDetails';
import CountryShortNav from '@/components/controls/ShortNav';

/**
 * Client component for country detail page
 * @param props - The component props
 * @returns JSX.Element The country page client component
 */
export default function CountryPageClient({
  country,
  allCountries,
}: CountryPageClientProps): JSX.Element {
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  return (
    <div className="space-y-6">
      <CountryShortNav />
      {/* Country Details */}
      <CountryDetails
        country={country}
        isFavorite={checkIsFavorite(country.name.common)}
        onToggleFavorite={toggleFavorite}
        allCountries={allCountries}
      />
    </div>
  );
}
