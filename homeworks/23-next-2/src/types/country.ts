/**
 * @fileoverview TypeScript interfaces for Country data from REST Countries API
 */

/**
 * Currency information for a country
 */
export interface Currency {
  name: string;
  symbol: string;
}

/**
 * Language information for a country
 */
export interface Language {
  [key: string]: string;
}

/**
 * Country name information with common and official names
 */
export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

/**
 * Flag information with PNG and SVG URLs
 */
export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

/**
 * Main Country interface matching REST Countries API v3.1
 */
export interface Country {
  name: CountryName;
  flags: CountryFlags;
  region: string;
  cca3: string;
  currencies?: {
    [key: string]: Currency;
  };
  capital?: string[];
  languages?: Language;
  borders?: string[];
  area?: number;
  population: number;
}

/**
 * Available regions for filtering
 */
export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
