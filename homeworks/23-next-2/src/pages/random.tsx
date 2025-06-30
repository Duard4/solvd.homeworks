/**
 * @fileoverview Random country page with server-side rendering
 */

import { JSX } from 'react';
import { GetServerSideProps } from 'next';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllCountries, getRandomCountry } from '@/utils/api';
import { CountryPageProps } from '@/types/props';
import Head from 'next/head';
import CountryDetails from '@/components/country/CountryDetails';
import PageHeading from '@/components/layout/PageHeading';
import CountryShortNav from '@/components/controls/ShortNav';

/**
 * Random country page component
 * @param props - The component props
 * @returns JSX.Element The random country page component
 */
export default function RandomCountryPage({
  country,
  allCountries,
}: CountryPageProps): JSX.Element {
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  return (
    <>
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
        <meta property="og:image" content={country.flags.png} />
      </Head>

      <div className="space-y-6">
        {/* Page Header */}
        <PageHeading
          title="Random Country Discovery"
          semititle="Explore the world one random country at a time!"
        />
        <CountryShortNav />
        <CountryDetails
          country={country}
          isFavorite={checkIsFavorite(country.name.common)}
          onToggleFavorite={toggleFavorite}
          allCountries={allCountries}
        />
      </div>
    </>
  );
}

/**
 * Server-side rendering: fetch random country data on each request
 * @returns GetServerSidePropsResult with random country data
 */
export const getServerSideProps: GetServerSideProps<CountryPageProps> = async () => {
  try {
    // Fetch all countries
    const allCountries = await getAllCountries();

    if (allCountries.length === 0) {
      throw new Error('No countries available');
    }

    const randomCountry = getRandomCountry(allCountries);

    return {
      props: {
        country: randomCountry,
        allCountries,
      },
    };
  } catch (error) {
    console.error('Error fetching random country:', error);

    return {
      notFound: true,
    };
  }
};
