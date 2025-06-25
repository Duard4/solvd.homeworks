/**
 * @fileoverview Dynamic route page for individual country details
 */

import { JSX } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllCountries, getCountryByName } from '@/utils/api';
import { CountryPageProps } from '@/types/props';
import Head from 'next/head';
import CountryShortNav from '@/components/controls/ShortNav';
import CountryDetails from '@/components/country/CountryDetails';

/**
 * Country detail page component
 * @param props - The component props
 * @returns JSX.Element The country page component
 */
export default function CountryPage({ country, allCountries }: CountryPageProps): JSX.Element {
  const router = useRouter();
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  // Handle loading state
  if (router.isFallback) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Handle country not found
  if (!country) {
    router.push('/404');
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{country.name.common} - Country Explorer</title>
        <meta
          name="description"
          content={`Learn about ${country.name.common}. Discover its capital, population, languages, currencies, and more.`}
        />
        <meta property="og:title" content={`${country.name.common} - Country Explorer`} />
        <meta
          property="og:description"
          content={`Learn about ${country.name.common}. Capital: ${
            country.capital?.[0] || 'N/A'
          }, Region: ${country.region}`}
        />
        <meta property="og:image" content={country.flags.png} />
      </Head>

      <div className="space-y-6">
        <CountryShortNav />
        {/* Country Details */}
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
 * Generate static paths for all countries
 * @returns GetStaticPathsResult with country name paths
 */
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const countries = await getAllCountries();

    // Generate paths for all countries
    const paths = countries.map((country) => ({
      params: {
        name: encodeURIComponent(country.name.common),
      },
    }));

    return {
      paths,
      // Enable ISR for countries not pre-generated
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating static paths:', error);

    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

/**
 * Static generation: fetch country data at build time
 * @param context - Static generation context with params
 * @returns GetStaticPropsResult with country data
 */
export const getStaticProps: GetStaticProps<CountryPageProps> = async ({ params }) => {
  try {
    if (!params?.name || typeof params.name !== 'string') {
      return {
        notFound: true,
      };
    }

    const countryName = decodeURIComponent(params.name);

    // Fetch both the specific country and all countries (for borders)
    const [country, allCountries] = await Promise.all([
      getCountryByName(countryName),
      getAllCountries(),
    ]);

    if (!country) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        country,
        allCountries,
      },
      // Revalidate every 24 hours
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error('Error fetching country data:', error);

    return {
      notFound: true,
    };
  }
};
