/**
 * @fileoverview Custom 404 page for Country Explorer
 */

import { JSX } from 'react';
import { FaGlobe } from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link';
import PageHeading from '@/components/layout/PageHeading';
import CountryShortNav from '@/components/controls/ShortNav';

/**
 * Custom 404 Not Found page component
 * @returns JSX.Element The 404 page component
 */
export default function Custom404(): JSX.Element {
  return (
    <>
      <Head>
        <title>Country Not Found - Country Explorer</title>
        <meta
          name="description"
          content="The country you're looking for could not be found. Explore other countries instead."
        />
      </Head>

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-4">
            <FaGlobe className="h-30 w-30 mx-auto mb-3 text-blue-500" />
            <PageHeading
              title="404 Country Not Found"
              semititle=" Oops! The country you're looking for seems to have disappeared from our map."
            />
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <p className="text-gray-500 dark:text-gray-500">
              It might have been misspelled, moved to a different dimension, or simply doesn&apos;t
              exist.
            </p>
          </div>
          <CountryShortNav />

          {/* Additional Help */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Looking for something specific?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try browsing by region or use our search feature to find the country you&apos;re
              looking for.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((region) => (
                <Link
                  key={region}
                  href={`/?region=${region.toLowerCase()}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                >
                  {region}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
