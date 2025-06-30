/**
 * @fileoverview Country card component for displaying country information in a grid
 */

import { MouseEvent, JSX } from 'react';
import Link from 'next/link';
import { Card } from 'flowbite-react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { CountryCardProps } from '@/types/props';
import { formatPopulation } from '@/utils/api';
import Image from 'next/image';

/**
 * Country card component displaying basic country information
 * @param props - The component props
 * @returns JSX.Element The country card component
 */
export default function CountryCard({
  country,
  isFavorite,
  onToggleFavorite,
  className = '',
}: CountryCardProps): JSX.Element {
  /**
   * Handles favorite button click
   * @param event - The click event
   */
  const handleFavoriteClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFavorite(country.name.common);
  };

  return (
    <div className={`relative ${className}`}>
      <Link href={`/countries/${encodeURIComponent(country.name.common)}`}>
        <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute cursor-pointer top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FaHeart className="h-4 w-4 text-red-500" />
            ) : (
              <FaRegHeart className="h-4 w-4 text-gray-400 hover:text-red-500" />
            )}
          </button>

          {/* Country Flag */}
          <div className="relative h-48 w-full overflow-hidden rounded-lg">
            <Image
              width={200}
              height={200}
              src={country.flags.png}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Country Information */}
          <div className="p-4">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
              {country.name.common}
            </h3>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span className="font-medium">Region:</span>
                <span className="text-gray-900 dark:text-gray-300">{country.region}</span>
              </div>

              {country.capital && country.capital.length > 0 && (
                <div className="flex justify-between">
                  <span className="font-medium">Capital:</span>
                  <span className="text-gray-900 dark:text-gray-300">{country.capital[0]}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="font-medium">Population:</span>
                <span className="text-gray-900 dark:text-gray-300">
                  {formatPopulation(country.population)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
