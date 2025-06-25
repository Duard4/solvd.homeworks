/**
 * @fileoverview Region filter component for filtering countries by continent
 */

import { JSX } from 'react';
import { Button } from 'flowbite-react';
import { FaGlobe, FaSpinner } from 'react-icons/fa';
import { Region } from '@/types/country';
import { RegionFilterProps } from '@/types/props';

/**
 * Available regions for filtering
 */
const REGIONS: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

/**
 * Region filter component with buttons for each continent
 * @param props - The component props
 * @returns JSX.Element The region filter component
 */
export default function RegionFilter({
  selectedRegion,
  onRegionChange,
  className = '',
  isLoading = false,
}: RegionFilterProps): JSX.Element {
  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-2">
        <Button
          color={selectedRegion === 'all' ? 'blue' : 'gray'}
          size="sm"
          onClick={() => onRegionChange('all')}
          disabled={isLoading}
          className="flex items-center cursor-pointer"
        >
          {isLoading && selectedRegion === 'all' ? (
            <FaSpinner className="mr-2 h-3 w-3 animate-spin" />
          ) : (
            <FaGlobe className="mr-2 h-3 w-3" />
          )}
          All Regions
        </Button>

        {REGIONS.map((region) => (
          <Button
            key={region}
            color={selectedRegion === region ? 'blue' : 'gray'}
            size="sm"
            className="cursor-pointer flex items-center"
            onClick={() => onRegionChange(region)}
            disabled={isLoading}
          >
            {isLoading && selectedRegion === region && (
              <FaSpinner className="mr-2 h-3 w-3 animate-spin" />
            )}
            {region}
          </Button>
        ))}
      </div>
    </div>
  );
}
