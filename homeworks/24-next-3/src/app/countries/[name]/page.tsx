/**
 * @fileoverview Dynamic route page for individual country details
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCountries, getCountryByName } from '@/utils/api';
import { Country } from '@/types/country';
import { PageProps } from '@/types/props';
import CountryPageClient from './CountryPageClient';

/**
 * Generate metadata for the country page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { name } = await params;
    const countryName = decodeURIComponent(name);
    const country = await getCountryByName(countryName);

    if (!country) {
      return {
        title: 'Country Not Found - Country Explorer',
        description: 'The requested country could not be found.',
      };
    }

    return {
      title: `${country.name.common} - Country Explorer`,
      description: `Learn about ${country.name.common}. Discover its capital, population, languages, currencies, and more.`,
      openGraph: {
        title: `${country.name.common} - Country Explorer`,
        description: `Learn about ${country.name.common}. Capital: ${
          country.capital?.[0] || 'N/A'
        }, Region: ${country.region}`,
        images: [country.flags.png],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Country Not Found - Country Explorer',
      description: 'The requested country could not be found.',
    };
  }
}

/**
 * Generate static params for all countries
 * This enables static generation for all country pages at build time
 */
export async function generateStaticParams() {
  try {
    const countries = await getAllCountries();

    return countries.map((country: Country) => ({
      name: encodeURIComponent(country.name.common),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Country detail page component
 */
export default async function CountryPage({ params }: PageProps) {
  try {
    const { name } = await params;
    const countryName = decodeURIComponent(name);

    // Fetch both the specific country and all countries (for borders)
    const [country, allCountries] = await Promise.all([
      getCountryByName(countryName),
      getAllCountries(),
    ]);

    if (!country) {
      notFound();
    }

    return <CountryPageClient country={country} allCountries={allCountries} />;
  } catch (error) {
    console.error('Error fetching country data:', error);
    notFound();
  }
}
