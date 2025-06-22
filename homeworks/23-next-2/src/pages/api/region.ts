/**
 * @fileoverview API route for filtering countries by region
 * Endpoint: /api/region?region=<regionName>
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getCountriesByRegion } from '@/utils/api';
import { Country, Region } from '@/types/country';

/**
 * API response type for region endpoint
 */
interface RegionApiResponse {
  success: boolean;
  data?: Country[];
  error?: string;
  count?: number;
  region?: string;
}

/**
 * Valid regions that can be filtered (lowercase for comparison)
 */
const VALID_REGIONS: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

/**
 * Map lowercase region names to proper case for API calls
 */
const REGION_MAP: Record<string, Region> = {
  africa: 'Africa',
  americas: 'Americas',
  asia: 'Asia',
  europe: 'Europe',
  oceania: 'Oceania',
};

/**
 * API handler for filtering countries by region
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegionApiResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only GET requests are supported.',
    });
  }

  try {
    const { region } = req.query;

    // Validate region parameter
    if (!region || typeof region !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Region parameter is required and must be a string.',
      });
    }

    // Normalize region to lowercase for comparison
    const normalizedRegion = region.toLowerCase();

    // Check if region is valid
    if (!VALID_REGIONS.includes(normalizedRegion)) {
      return res.status(400).json({
        success: false,
        error: `Invalid region '${normalizedRegion}'. Valid regions are: ${Object.values(REGION_MAP).join(', ')}.`,
      });
    }

    // Get the properly cased region name for the API call
    const properRegion = REGION_MAP[normalizedRegion];

    // Fetch countries by region using the existing utility function
    const filteredCountries = await getCountriesByRegion(properRegion);

    // Return filtered results
    return res.status(200).json({
      success: true,
      data: filteredCountries,
      count: filteredCountries.length,
      region: properRegion,
    });
  } catch (error) {
    console.error('Error in /api/region:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error. Failed to fetch countries by region.',
    });
  }
}
