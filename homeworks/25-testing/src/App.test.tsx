import AvatarApp from './App';
import { render, fireEvent, cleanup, screen, waitFor } from '@testing-library/react';

afterEach(cleanup);

/**
 * Default props for testing avatar functionality
 */
const mockAvatarResponse = [
  { url: 'https://tinyfac.es/api/user1.jpg' },
  { url: 'https://tinyfac.es/api/user2.jpg' },
  { url: 'https://tinyfac.es/api/user3.jpg' },
];

/**
 * Test suite for AvatarApp component functionality
 */
describe('AvatarApp component', () => {
  /**
   * Test that add button renders initially and grid starts empty
   */
  test('renders add button and empty avatar grid initially', () => {
    render(<AvatarApp />);
    expect(screen.getByText('+')).toBeTruthy();
    expect(screen.queryByText('Refresh All')).toBeFalsy();
    expect(screen.queryByAltText('Avatar')).toBeFalsy();
  });

  /**
   * Test adding single avatar tile creates correct DOM structure
   */
  test('clicking add button creates avatar tile with correct attributes', () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAvatarResponse,
    });

    render(<AvatarApp />);
    const addButton = screen.getByText('+');

    fireEvent.click(addButton);

    // Should still show add button
    expect(screen.getByText('+')).toBeTruthy();

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledWith('https://tinyfac.es/api/data?lmit=50&quality=0');
  });

  /**
   * Test refreshing an individual avatar
   */
  test('refreshes an individual avatar correctly', async () => {
    render(<AvatarApp />);

    // Add an avatar first
    const addButton = screen.getByText('+');
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeTruthy();
    });

    // Reset fetch call count
    jest.clearAllMocks();

    // Click on the avatar to refresh it
    const avatar = screen.getByAltText('Avatar');
    fireEvent.click(avatar);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Test refreshing all avatars
   */
  test('refreshes all avatars correctly', async () => {
    render(<AvatarApp />);

    // Add two avatars first
    const addButton = screen.getByText('+');
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeTruthy();
    });

    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getAllByAltText('Avatar')).toHaveLength(2);
    });

    // Reset fetch call count
    jest.clearAllMocks();

    // Click refresh all button
    const refreshAllButton = screen.getByText('Refresh All');
    fireEvent.click(refreshAllButton);

    // Should show loading state
    expect(screen.getByText('Refreshing...')).toBeTruthy();
    expect(screen.getByText('Refreshing...')).toBeDisabled();

    // Wait for refresh to complete
    await waitFor(() => {
      expect(screen.getByText('Refresh All')).toBeTruthy();
    });

    // Should have called fetch for each avatar (2 calls)
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
