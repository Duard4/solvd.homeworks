'use client';

/**
 * @fileoverview Client component for displaying a random country with favorite support.
 */

import { JSX } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import { CountryPageClientProps } from '@/types/props';
import CountryDetails from '@/components/country/CountryDetails';
import PageHeading from '@/components/layout/PageHeading';
import CountryShortNav from '@/components/controls/ShortNav';

/**
 * Client Component for the random country page.
 *
 * @param {CountryPageClientProps} props - The props for the component.
 * @param {Country} props.country - The randomly selected country data.
 * @param {Country[]} props.allCountries - The list of all countries (potentially used for related links/suggestions).
 * @returns {JSX.Element} The rendered client-side component.
 */
export default function RandomCountryClient({
  country,
  allCountries,
}: CountryPageClientProps): JSX.Element {
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeading
        title="Random Country Discovery"
        semititle="Explore the world one random country at a time!"
      />
      {/* Short Navigation */}
      <CountryShortNav />

      {/* CountryDetails */}
      <CountryDetails
        country={country}
        isFavorite={checkIsFavorite(country.name.common)}
        onToggleFavorite={toggleFavorite}
        allCountries={allCountries}
      />
    </div>
  );
}
