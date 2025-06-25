/**
 * @fileoverview API utility functions for fetching country data from REST Countries API
 */

import { Country, Region } from '@/types/country';

/**
 * Base URL for REST Countries API v3.1
 */
const BASE_URL = 'https://restcountries.com/v3.1';

/**
 * Fields to fetch from the API to optimize response size
 */
const FIELDS = 'name,flags,region,capital,population,languages,currencies,borders,cca3,cca2';

/**
 * Fetches all countries from the REST Countries API
 * @returns Promise<Country[]> Array of all countries
 * @throws Error if the API request fails
 */
export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/all?fields=${FIELDS}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
    }

    const countries: Country[] = await response.json();
    return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
}

/**
 * Fetches a single country by its name
 * @param name - The country name to search for
 * @returns Promise<Country | null> The country data or null if not found
 */
export async function getCountryByName(name: string): Promise<Country | null> {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}?fullText=true&fields=${FIELDS}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch country: ${response.status} ${response.statusText}`);
    }

    const countries: Country[] = await response.json();
    return countries[0] || null;
  } catch (error) {
    console.error(`Error fetching country by name "${name}":`, error);
    return null;
  }
}

/**
 * Fetches countries by region
 * @param region - The region to filter by
 * @returns Promise<Country[]> Array of countries in the specified region
 */
export async function getCountriesByRegion(region: Region): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}?fields=${FIELDS}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch countries by region: ${response.status} ${response.statusText}`
      );
    }

    const countries: Country[] = await response.json();
    return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error(`Error fetching countries by region "${region}":`, error);
    throw error;
  }
}

/**
 * Selects a random country from the provided list
 * @param countries - Array of countries to choose from
 * @returns Country A randomly selected country
 */
export function getRandomCountry(countries: Country[]): Country {
  if (countries.length === 0) {
    throw new Error('Cannot select random country from empty array');
  }

  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

/**
 * Formats population number with thousand separators
 * @param population - The population number
 * @returns string Formatted population string
 */
export function formatPopulation(population: number): string {
  return population.toLocaleString();
}

/**
 * Extracts currency names from country currency object
 * @param currencies - The currencies object from country data
 * @returns string Comma-separated currency names
 */
export function formatCurrencies(currencies?: {
  [key: string]: { name: string; symbol: string };
}): string {
  if (!currencies) return 'N/A';

  return Object.values(currencies)
    .map((currency) => currency.name)
    .join(', ');
}

/**
 * Extracts language names from country languages object
 * @param languages - The languages object from country data
 * @returns string Comma-separated language names
 */
export function formatLanguages(languages?: { [key: string]: string }): string {
  if (!languages) return 'N/A';

  return Object.values(languages).join(', ');
}

/**
 * Gets border country names by their codes
 * @param borderCodes - Array of country codes (cca3)
 * @param allCountries - Array of all countries to search in
 * @returns string[] Array of border country names
 */
export function getBorderCountryNames(borderCodes?: string[], allCountries?: Country[]): string[] {
  if (!borderCodes || !allCountries) return [];

  return borderCodes
    .map((code) => {
      const country = allCountries.find((c) => c.cca3 === code);
      return country?.name.common || code;
    })
    .sort();
}
