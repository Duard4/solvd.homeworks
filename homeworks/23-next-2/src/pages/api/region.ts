/**
 * @fileoverview API route for filtering countries by region using the Next.js Pages Router.
 * Endpoint: /api/region?region=<regionName>
 */

import { NextApiRequest, NextApiResponse } from 'next';
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
 * Main API handler for filtering countries by region.
 * It first checks the HTTP method, then validates the 'region' query parameter,
 * and finally fetches and returns the relevant country data.
 *
 * @param req The Next.js `NextApiRequest` object for the incoming request.
 * @param res The Next.js `NextApiResponse` object for sending the response.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegionApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only GET requests are supported.',
    });
  }

  try {
    const { region } = req.query;
    if (!region || typeof region !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Region parameter is required and must be a string.',
      });
    }

    const normalizedRegion = region.toLowerCase();
    if (!VALID_REGIONS.includes(normalizedRegion)) {
      return res.status(400).json({
        success: false,
        error: `Invalid region '${normalizedRegion}'. Valid regions are: ${Object.values(REGION_MAP).join(', ')}.`,
      });
    }

    const properRegion = REGION_MAP[normalizedRegion];
    const filteredCountries = await getCountriesByRegion(properRegion);

    return res.status(200).json({
      success: true,
      data: filteredCountries,
      count: filteredCountries.length,
      region: properRegion,
    });
  } catch (error) {
    console.error('Error fetching countries by region in Pages Router API:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error. Failed to fetch countries by region.',
    });
  }
}
