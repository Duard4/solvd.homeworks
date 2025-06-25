/**
 * @fileoverview Random country page with server-side rendering.
 */

import { JSX } from 'react';
import { getAllCountries } from '@/utils/api';
import { Country } from '@/types/country';
import Head from 'next/head';
import RandomCountryClient from './RandomCountryClient';

/**
 * Server Component for the random country page.
 *
 * @returns {Promise<JSX.Element>} A Promise resolving to the JSX element for the page.
 */
export default async function RandomCountryPage(): Promise<JSX.Element> {
  const allCountries: Country[] = await getAllCountries();
  const country: Country = allCountries[Math.floor(Math.random() * allCountries.length)];

  return (
    <>
      {/* Head component for SEO metadata */}
      <Head>
        <title>Random Country: {country.name.common} - Country Explorer</title>
        <meta
          name="description"
          content={`Discover a random country: ${country.name.common}. Learn about its capital, population, languages, and more.`}
        />
        <meta
          property="og:title"
          content={`Random Country: ${country.name.common} - Country Explorer`}
        />
        <meta
          property="og:description"
          content={`Randomly selected: ${country.name.common}. Capital: ${
            country.capital?.[0] || 'N/A'
          }, Region: ${country.region}`}
        />
        {/* Open Graph image for social media sharing */}
        <meta property="og:image" content={country.flags.png} />
      </Head>

      <RandomCountryClient country={country} allCountries={allCountries} />
    </>
  );
}
