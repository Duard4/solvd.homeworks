'use client';

import { useState } from 'react';
import { Avatar } from '@/types/avatar';
import { fetchSingleAvatar } from '@/lib/avatarApi';
import Image from 'next/image';

/**
 * Props for the AvatarGrid component
 * @typedef {Object} AvatarGridProps
 * @property {Avatar[]} initialAvatars - Array of avatars to initialize the grid
 */
interface AvatarGridProps {
  initialAvatars: Avatar[];
}

/**
 * A component that displays a grid of avatars with interactive controls
 * @component
 * @param {AvatarGridProps} props - Component props
 * @returns {JSX.Element} Rendered avatar grid
 */
export default function AvatarGrid({ initialAvatars }: AvatarGridProps) {
  const [avatars, setAvatars] = useState<Avatar[]>(initialAvatars);
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);
  const [refreshingTiles, setRefreshingTiles] = useState<Set<number>>(new Set());

  /**
   * Adds a new avatar tile to the grid
   * @async
   * @function handleAddTile
   */
  const handleAddTile = async () => {
    try {
      const avatarUrl = await fetchSingleAvatar();
      setAvatars((prev) => [...prev, { id: Date.now(), url: avatarUrl }]);
    } catch (error) {
      console.log('Failed to add avatar tile:', error);
    }
  };

  /**
   * Refreshes a specific avatar tile
   * @async
   * @function handleRefreshTile
   * @param {number} id - ID of the avatar to refresh
   */
  const handleRefreshTile = async (id: number) => {
    setRefreshingTiles((prev) => new Set([...prev, id]));
    try {
      const avatarUrl = await fetchSingleAvatar();
      setAvatars((prev) =>
        prev.map((avatar) => (avatar.id === id ? { ...avatar, url: avatarUrl } : avatar))
      );
    } catch (error) {
      console.error('Failed to refresh avatar tile:', error);
    } finally {
      setRefreshingTiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  /**
   * Refreshes all avatar tiles simultaneously
   * @async
   * @function handleRefreshAll
   */
  const handleRefreshAll = async () => {
    setIsRefreshingAll(true);
    try {
      const updatedAvatars = await Promise.all(
        avatars.map(async (avatar) => ({
          ...avatar,
          url: await fetchSingleAvatar(),
        }))
      );
      setAvatars(updatedAvatars);
    } catch (error) {
      console.error('Failed to refresh avatar tiles:', error);
    } finally {
      setIsRefreshingAll(false);
    }
  };

  return (
    <div className="container">
      <ul className="avatar-grid">
        {avatars.map((avatar) => (
          <li key={avatar.id} className="tile">
            <Image
              src={avatar.url}
              alt="Avatar"
              width={240}
              height={240}
              style={{
                cursor: 'pointer',
                opacity: refreshingTiles.has(avatar.id) ? 0.5 : 1,
                transition: 'opacity 0.3s ease',
              }}
              onClick={() => handleRefreshTile(avatar.id)}
              title="Click to refresh this avatar"
            />
            {refreshingTiles.has(avatar.id) && (
              <div className="loading-overlay">
                <div className="spinner"></div>
              </div>
            )}
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
          {' '}
          {isRefreshingAll ? 'Refreshing...' : 'Refresh All'}
        </button>
      )}
    </div>
  );
}
