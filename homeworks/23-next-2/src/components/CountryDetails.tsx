/**
 * @fileoverview Component for displaying detailed information about a country,
 * including flag, name, region, stats, and border countries.
 * Includes support for marking a country as a favorite.
 */

import React, { JSX } from 'react';
import Link from 'next/link';
import { Card, Badge } from 'flowbite-react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Country } from '@/types/country';
import {
  formatPopulation,
  formatCurrencies,
  formatLanguages,
  getBorderCountryNames,
} from '@/utils/api';
import Image from 'next/image';

/**
 * Props for the CountryDetails component
 *
 * @property country - The country to display details for
 * @property isFavorite - Whether the country is currently marked as a favorite
 * @property onToggleFavorite - Callback to toggle the favorite status of a country by name
 * @property allCountries - Optional list of all countries to resolve border names
 * @property className - Optional custom CSS classes for the wrapper
 */
interface CountryDetailsProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (countryName: string) => void;
  allCountries?: Country[];
  className?: string;
}

/**
 * Component for displaying country details with flag, statistics,
 * favorite button, and border countries.
 *
 * @param {CountryDetailsProps} props - Component props
 * @returns {JSX.Element} Rendered country details card
 */
export default function CountryDetails({
  country,
  isFavorite,
  onToggleFavorite,
  allCountries,
  className = '',
}: CountryDetailsProps): JSX.Element {
  /**
   * Handle clicking the favorite icon (heart)
   */
  const handleFavoriteClick = () => onToggleFavorite(country.name.common);

  /**
   * Get readable border country names from alpha codes
   */
  const borderCountries = getBorderCountryNames(country.borders, allCountries);

  /**
   * InfoRow subcomponent for displaying label-value pairs
   *
   * @param label - The label to display
   * @param value - The value to display (if null, row is hidden)
   * @returns JSX.Element or null
   */
  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | JSX.Element | null;
  }) =>
    value ? (
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <span className="font-medium text-gray-600 dark:text-gray-400">{label}:</span>
        <span className="text-gray-900 dark:text-white font-medium">{value}</span>
      </div>
    ) : null;

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Flag & Basic Info */}
        <Card className="h-fit">
          <div className="relative">
            <Image
              width={200}
              height={200}
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 shadow-lg"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <FaHeart className="h-6 w-6 text-red-500" />
              ) : (
                <FaRegHeart className="h-6 w-6 text-gray-400 hover:text-red-500" />
              )}
            </button>
          </div>

          <div className="pt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {country.name.common}
            </h1>

            {country.name.official !== country.name.common && (
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                Official: {country.name.official}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge color="info" size="lg">
                {country.region}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Detailed Stats */}
        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Country Information
          </h2>

          <div className="space-y-4">
            <InfoRow
              label="Capital"
              value={country.capital?.length ? country.capital.join(', ') : null}
            />
            <InfoRow label="Population" value={formatPopulation(country.population)} />
            <InfoRow
              label="Area"
              value={country.area ? `${country.area.toLocaleString()} km²` : null}
            />
            <InfoRow label="Languages" value={formatLanguages(country.languages)} />
            <InfoRow label="Currencies" value={formatCurrencies(country.currencies)} />
          </div>

          {/* Border Countries */}
          {borderCountries.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Border Countries
              </h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((borderCountry) => (
                  <Link
                    key={borderCountry}
                    href={`/countries/${encodeURIComponent(borderCountry)}`}
                  >
                    <Badge
                      color="blue"
                      className="cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                    >
                      {borderCountry}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
