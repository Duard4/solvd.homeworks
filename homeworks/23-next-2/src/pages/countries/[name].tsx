/**
 * @fileoverview Dynamic route page for individual country details
 */

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CountryDetails from '@/components/CountryDetails';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllCountries, getCountryByName } from '@/utils/api';
import { Country } from '@/types/country';
import { JSX } from 'react';
import CountryShortNav from '@/components/CountryShortNav';

/**
 * Props for the CountryPage component
 */
interface CountryPageProps {
  /** Country data to display */
  country: Country | null;
  /** Array of all countries for border resolution */
  allCountries: Country[];
}

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
    return (
      <>
        <Head>
          <title>Country Not Found - Country Explorer</title>
          <meta name="description" content="The requested country could not be found." />
        </Head>

        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 8h6m6-20a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Country Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The country you're looking for doesn't exist or couldn't be loaded.
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to All Countries
          </button>
        </div>
      </>
    );
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
