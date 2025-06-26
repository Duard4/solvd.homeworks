/**
 * @fileoverview Custom hook for managing region filtering functionality.
 * Handles API calls, URL parameters, and state management for region filtering.
 */

import { useState, useEffect, useCallback } from 'react';
import { Country, Region } from '@/types/country';

/**
 * Return type for useRegionFilter hook.
 * @params displayCountries - array of countries to display based on current filter
 * @params selectedRegion - currently selected region or 'all'
 * @params isLoading - loading state for region filtering
 * @params error - error message if region filtering fails
 * @params handleRegionChange - handler to change region filter
 * @params clearError - handler to clear error state
 */
interface UseRegionFilterReturn {
  displayCountries: Country[];
  selectedRegion: Region | 'all';
  isLoading: boolean;
  error: string | null;
  handleRegionChange: (region: Region | 'all') => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for managing region filtering.
 * Handles fetching countries by region, updating URL params, and error state.
 *
 * @param allCountries - Array of all countries (fallback data)
 * @returns Object with state and handlers for region filtering
 */
export function useRegionFilter(allCountries: Country[]): UseRegionFilterReturn {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [displayCountries, setDisplayCountries] = useState<Country[]>(allCountries);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch countries by region from API or fallback to all.
   *
   * @param region - Region to filter by, or 'all' for all countries
   */
  const fetchCountriesByRegion = useCallback(
    async (region: Region | 'all') => {
      setIsLoading(true);
      setError(null);

      try {
        if (region === 'all') {
          setDisplayCountries(allCountries);
          return;
        }

        const response = await fetch(
          `/api/region?region=${encodeURIComponent(region.toLowerCase())}`
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to fetch countries by region');
        }

        setDisplayCountries(data.data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
        setError(errorMessage);
        setDisplayCountries(allCountries);
        setSelectedRegion('all');

        // Remove region param from URL on error
        const url = new URL(window.location.href);
        url.searchParams.delete('region');
        window.history.replaceState({}, '', url.toString());
      } finally {
        setIsLoading(false);
      }
    },
    [allCountries]
  );

  /**
   * Handles region selection change.
   * Updates selected region, URL param, and fetches countries.
   *
   * @param region - Region to select, or 'all'
   */
  const handleRegionChange = async (region: Region | 'all') => {
    setSelectedRegion(region);
    setError(null);

    const url = new URL(window.location.href);
    if (region === 'all') {
      url.searchParams.delete('region');
    } else {
      url.searchParams.set('region', region.toLowerCase());
    }
    window.history.replaceState({}, '', url.toString());

    await fetchCountriesByRegion(region);
  };

  /**
   * Clears the error message.
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * On mount: read URL param and fetch data accordingly.
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');

    if (regionParam) {
      const region = regionParam.toLowerCase();
      setSelectedRegion(region as Region);
      fetchCountriesByRegion(region as Region);
    } else {
      setDisplayCountries(allCountries);
    }
  }, [allCountries, fetchCountriesByRegion]);

  return {
    displayCountries,
    selectedRegion,
    isLoading,
    error,
    handleRegionChange,
    clearError,
  };
}
