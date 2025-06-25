/**
 * @fileoverview API route for filtering countries by region using the Next.js App Router.
 * Endpoint: /api/region?region=<regionName>
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCountriesByRegion } from '@/utils/api';
import { Country, Region } from '@/types/country';

/**
 * Defines the standardized API response structure for the region endpoint.
 */
interface RegionApiResponse {
  success: boolean;
  data?: Country[];
  error?: string;
  count?: number;
  region?: string;
}

/**
 * A list of valid region names (in lowercase) for request validation.
 */
const VALID_REGIONS: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

/**
 * Maps lowercase region names from the request to their proper cased equivalents
 * required by the `getCountriesByRegion` utility function.
 */
const REGION_MAP: Record<string, Region> = {
  africa: 'Africa',
  americas: 'Americas',
  asia: 'Asia',
  europe: 'Europe',
  oceania: 'Oceania',
};

/**
 * Handles GET requests to filter countries by a specified region.
 * Validates the 'region' query parameter and fetches data accordingly.
 *
 * @param request The Next.js `NextRequest` object containing the incoming request details.
 * @returns A `NextResponse` object with the filtered country data or an error message.
 */
export async function GET(request: NextRequest): Promise<NextResponse<RegionApiResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');

    if (!region || typeof region !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Region parameter is required and must be a string.',
        },
        { status: 400 }
      );
    }

    const normalizedRegion = region.toLowerCase();
    if (!VALID_REGIONS.includes(normalizedRegion)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid region '${normalizedRegion}'. Valid regions are: ${Object.values(REGION_MAP).join(', ')}.`,
        },
        { status: 400 }
      );
    }

    const properRegion = REGION_MAP[normalizedRegion];
    const filteredCountries = await getCountriesByRegion(properRegion);

    return NextResponse.json({
      success: true,
      data: filteredCountries,
      count: filteredCountries.length,
      region: properRegion,
    });
  } catch (error) {
    console.error('Error fetching countries by region in App Router API:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Failed to fetch countries by region.',
      },
      { status: 500 }
    );
  }
}
