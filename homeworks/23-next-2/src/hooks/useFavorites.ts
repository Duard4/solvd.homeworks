/**
 * @fileoverview Custom hook for managing favorite countries with localStorage
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  clearFavorites,
} from '@/utils/localStorageUtils';

/**
 * Return type for the useFavorites hook
 */
interface UseFavoritesReturn {
  /** Array of favorite country names */
  favorites: string[];
  /** Function to add a country to favorites */
  addFavorite: (countryName: string) => void;
  /** Function to remove a country from favorites */
  removeFavorite: (countryName: string) => void;
  /** Function to toggle a country's favorite status */
  toggleFavorite: (countryName: string) => void;
  /** Function to check if a country is favorited */
  checkIsFavorite: (countryName: string) => boolean;
  /** Function to clear all favorites */
  clearAllFavorites: () => void;
  /** Whether the favorites are currently being loaded */
  isLoading: boolean;
}

/**
 * Custom hook for managing favorite countries
 * Handles localStorage operations and provides reactive state
 * @returns UseFavoritesReturn Object with favorites state and management functions
 */
export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Loads favorites from localStorage on component mount
   */
  useEffect(() => {
    try {
      const savedFavorites = getFavorites();
      setFavorites(savedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Adds a country to favorites
   * @param countryName - Name of the country to add
   */
  const addFavorite = useCallback((countryName: string) => {
    if (addToFavorites(countryName)) {
      setFavorites((prev) => {
        if (!prev.includes(countryName)) {
          return [...prev, countryName];
        }
        return prev;
      });
    }
  }, []);

  /**
   * Removes a country from favorites
   * @param countryName - Name of the country to remove
   */
  const removeFavorite = useCallback((countryName: string) => {
    if (removeFromFavorites(countryName)) {
      setFavorites((prev) => prev.filter((name) => name !== countryName));
    }
  }, []);

  /**
   * Toggles a country's favorite status
   * @param countryName - Name of the country to toggle
   */
  const toggleFavorite = useCallback(
    (countryName: string) => {
      const isCurrentlyFavorite = isFavorite(countryName);

      if (isCurrentlyFavorite) {
        removeFavorite(countryName);
      } else {
        addFavorite(countryName);
      }
    },
    [addFavorite, removeFavorite]
  );

  /**
   * Checks if a country is currently favorited
   * @param countryName - Name of the country to check
   * @returns boolean True if the country is favorited
   */
  const checkIsFavorite = useCallback(
    (countryName: string): boolean => {
      return favorites.includes(countryName);
    },
    [favorites]
  );

  /**
   * Clears all favorites
   */
  const clearAllFavorites = useCallback(() => {
    if (clearFavorites()) {
      setFavorites([]);
    }
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    checkIsFavorite,
    clearAllFavorites,
    isLoading,
  };
}
