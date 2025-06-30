/**
 * @fileoverview Favorites page with server-side data fetching
 */

import Head from 'next/head';
import { JSX } from 'react';
import { getAllCountries } from '@/utils/api';
import { Country } from '@/types/country';
import FavoritesClient from './FavoritesClient';

/**
 * Server component for favorites page
 * Handles data fetching on the server side
 * @returns {Promise<JSX.Element>} The favorites page component
 */
export default async function FavoritesPage(): Promise<JSX.Element> {
  const allCountries: Country[] = await getAllCountries();

  return (
    <>
      <Head>
        <title>My Favorites - Country Explorer</title>
        <meta name="description" content="Your favorite countries from around the world." />
        <meta property="og:title" content="My Favorites - Country Explorer" />
        <meta property="og:description" content="Your favorite countries from around the world." />
      </Head>

      <FavoritesClient countries={allCountries} />
    </>
  );
}
