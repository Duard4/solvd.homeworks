/**
 * @fileoverview LocalStorage utility functions for managing favorites
 */

/**
 * Keys used for localStorage items
 */
const STORAGE_KEYS = {
  FAVORITES: 'country-explorer-favorites',
} as const;

/**
 * Safely checks if localStorage is available
 * @returns boolean True if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Gets favorite countries from localStorage
 * @returns string[] Array of favorite country names
 */
export function getFavorites(): string[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
}

/**
 * Adds a country to favorites in localStorage
 * @param countryName - The name of the country to add to favorites
 * @returns boolean True if successfully added
 */
export function addToFavorites(countryName: string): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const favorites = getFavorites();
    if (!favorites.includes(countryName)) {
      favorites.push(countryName);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

/**
 * Removes a country from favorites in localStorage
 * @param countryName - The name of the country to remove from favorites
 * @returns boolean True if successfully removed
 */
export function removeFromFavorites(countryName: string): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const favorites = getFavorites();
    const filteredFavorites = favorites.filter((name) => name !== countryName);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filteredFavorites));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}

/**
 * Checks if a country is in favorites
 * @param countryName - The name of the country to check
 * @returns boolean True if the country is in favorites
 */
export function isFavorite(countryName: string): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const favorites = getFavorites();
    return favorites.includes(countryName);
  } catch (error) {
    console.error('Error checking if country is favorite:', error);
    return false;
  }
}

/**
 * Clears all favorites from localStorage
 * @returns boolean True if successfully cleared
 */
export function clearFavorites(): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}
