/**
 * @fileoverview Custom hook for managing region filtering functionality
 * Handles API calls, URL parameters, and state management for region filtering
 */

import { useState, useEffect } from 'react';
import { Country, Region } from '@/types/country';

/**
 * Hook return type
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
 * Custom hook for managing region filtering
 * @param allCountries - Array of all countries (fallback data)
 * @returns Object with state and handlers for region filtering
 */
export function useRegionFilter(allCountries: Country[]): UseRegionFilterReturn {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [displayCountries, setDisplayCountries] = useState<Country[]>(allCountries);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch countries by region from API or fallback to all
   */
  const fetchCountriesByRegion = async (region: Region | 'all') => {
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
      console.error('Error fetching countries by region:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unexpected error';
      setError(errorMessage);
      setDisplayCountries(allCountries);
      setSelectedRegion('all');

      // Remove invalid param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('region');
      window.history.replaceState({}, '', url.toString());
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle region selection change
   */
  const handleRegionChange = async (region: Region | 'all') => {
    setSelectedRegion(region);
    setError(null);

    // Update the URL param
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
   * Clear the error message
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * On mount: read URL param and fetch data accordingly
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
