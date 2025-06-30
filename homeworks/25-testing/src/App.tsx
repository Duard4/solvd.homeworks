import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const AVATAR_API_URL = 'https://tinyfac.es/api/data?lmit=50&quality=0';

interface Avatar {
  id: number;
  url: string;
}

/**
 * React component displaying a grid of avatar tiles.
 * Users can add new avatars, refresh individual tiles, or refresh all at once.
 */
const AvatarApp = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);
  const id = useRef(0);

  /**
   * function for id generation
   */
  const generateId = () => {
    id.current++;
    return  Number(`${Date.now()}${id.current}`);
  }

  /**
   * Fetches a random avatar URL from the API.
   * @returns {Promise<string>} A promise that resolves with the avatar URL.
   * @throws {Error} If the API request fails.
   */
  const fetchAvatar = async (): Promise<string> => {
    try {
      const response = await fetch(AVATAR_API_URL);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      if (!data.length) {
        toast.error('No avatars found in the API response');
        throw new Error('No avatars returned from the API');
      }
      return data[Math.floor(Math.random() * data.length)].url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch avatar';
      toast.error(message);
      throw new Error(message);
    }
  };

  /**
   * Adds a new avatar tile to the grid.
   */
  const handleAddTile = async () => {
    try {
      const avatarUrl = await fetchAvatar();
      setAvatars((prev) => [...prev, { id: generateId(), url: avatarUrl }]);
    } catch {
      throw new Error('Failed to add avatar tile');
    }
  };

  /**
   * Refreshes the avatar image for a specific tile.
   * @param {number} id - The ID of the avatar tile to refresh.
   */
  const handleRefreshTile = async (id: number) => {
    try {
      const avatarUrl = await fetchAvatar();
      setAvatars((prev) =>
        prev.map((avatar) => (avatar.id === id ? { ...avatar, url: avatarUrl } : avatar))
      );
    } catch {
      throw new Error('Failed to refresh avatar tile');
    }
  };
  /**
   * Refreshes all avatar tiles.
   */
  const handleRefreshAll = async () => {
    setIsRefreshingAll(true);
    try {
      const updatedAvatars = await Promise.all(
        avatars.map(async (avatar) => ({
          ...avatar,
          url: await fetchAvatar(),
        }))
      );
      setAvatars(updatedAvatars);
    } catch {
      throw new Error('Failed to refresh avatar tiles');
    } finally {
      setIsRefreshingAll(false);
    }
  };

  return (
    <div className="container">
      <ul className="avatar-grid">
        {avatars.map((avatar) => (
          <li key={avatar.id} data-testid={avatar.id} className="tile">
            <img
              src={avatar.url}
              alt="Avatar"
              style={{ cursor: 'pointer' }}
              onClick={() => handleRefreshTile(avatar.id)}
              title="Click to refresh this avatar"
            />
          </li>
        ))}

        <li>
          <button className="add-btn tile" onClick={handleAddTile}>
            +
          </button>
        </li>
      </ul>

      {avatars.length > 0 && (
        <button onClick={handleRefreshAll} className="refresh-btn" disabled={isRefreshingAll}>
          {isRefreshingAll ? 'Refreshing...' : 'Refresh All'}
        </button>
      )}
    </div>
  );
};

export default AvatarApp;
