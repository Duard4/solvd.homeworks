import { Avatar } from '@/types/avatar';
/**
 * Base URL for the avatar API with default query parameters
 * @constant {string}
 */
const AVATAR_API_URL = 'https://tinyfac.es/api/data?limit=50&quality=0';

/**
 * Fetches an array of random avatars from the API
 * @async
 * @function fetchAvatars
 * @param {number} [count=5] - Number of avatars to fetch (default: 5)
 * @returns {Promise<Avatar[]>} Array of avatar objects
 * @throws {Error} When API request fails or no avatars are returned
 * @example
 * const avatars = await fetchAvatars(3);
 */
export async function fetchAvatars(count: number = 5): Promise<Avatar[]> {
  try {
    const response = await fetch(AVATAR_API_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.length) {
      throw new Error('No avatars returned from the API');
    }

    // Get random avatars
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    return selected.map((avatar: any, index: number) => ({
      id: Date.now() + index,
      url: avatar.url,
    }));
  } catch (error) {
    console.error('Failed to fetch avatars:', error);
    throw error;
  }
}

/**
 * Fetches a single random avatar URL from the API
 * @async
 * @function fetchSingleAvatar
 * @returns {Promise<string>} URL of a random avatar
 * @throws {Error} When API request fails or no avatars are returned
 * @example
 * const avatarUrl = await fetchSingleAvatar();
 */
export async function fetchSingleAvatar(): Promise<string> {
  try {
    const response = await fetch(AVATAR_API_URL);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!data.length) {
      throw new Error('No avatars returned from the API');
    }
    return data[Math.floor(Math.random() * data.length)].url;
  } catch (error) {
    console.error('Failed to fetch single avatar:', error);
    throw error;
  }
}
