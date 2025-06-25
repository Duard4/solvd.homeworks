/**
 * @fileoverview Home page displaying all countries with search and filter functionality
 */

import { Metadata } from 'next';
import { getAllCountries } from '@/utils/api';
import { Country } from '@/types/country';
import HomeClient from './HomeClient';

/**
 * Generate metadata for the home page
 */
export const metadata: Metadata = {
  title: 'All Countries - Country Explorer',
  description:
    'Explore all countries around the world. Search, filter by region, and save your favorites.',
};

/**
 * Server component for the home page
 * Fetches countries data and passes to client component
 */
export default async function HomePage() {
  let countries: Country[] = [];

  try {
    countries = await getAllCountries();
  } catch (error) {
    console.error('Error fetching countries for homepage:', error);
  }

  return <HomeClient countries={countries} />;
}
