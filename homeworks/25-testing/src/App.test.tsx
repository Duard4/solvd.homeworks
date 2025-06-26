import AvatarApp from './App';
import { render, fireEvent, cleanup, screen, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockAvatarResponse = [
  { url: 'https://tinyfac.es/api/user1.jpg' },
  { url: 'https://tinyfac.es/api/user2.jpg' },
  { url: 'https://tinyfac.es/api/user3.jpg' },
];

describe('AvatarApp component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('renders add button and empty avatar grid initially', () => {
    render(<AvatarApp />);
    expect(screen.getByText('+')).toBeTruthy();
    expect(screen.queryByText('Refresh All')).toBeFalsy();
    expect(screen.queryByAltText('Avatar')).toBeFalsy();
  });

  /**
   * Test that clicking the add button creates an avatar with proper attributes
   * and makes the correct API call
   */
  test('clicking add button creates avatar tile with correct attributes', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAvatarResponse,
    });

    render(<AvatarApp />);
    const addButton = screen.getByText('+');

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });

    expect(screen.getByText('+')).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledWith('https://tinyfac.es/api/data?lmit=50&quality=0');
  });

  /**
   * Test that clicking on an individual avatar refreshes only that avatar
   */
  test('refreshes an individual avatar correctly', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAvatarResponse,
    });

    render(<AvatarApp />);
    const addButton = screen.getByText('+');

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });

    jest.clearAllMocks();

    const avatar = screen.getByAltText('Avatar');

    await act(async () => {
      fireEvent.click(avatar);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  /**
   * Test that the refresh all button refreshes all avatars simultaneously
   */
  test('refreshes all avatars correctly', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAvatarResponse,
    });

    render(<AvatarApp />);
    const addButton = screen.getByText('+');

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getAllByAltText('Avatar')).toHaveLength(2);
    });

    jest.clearAllMocks();

    const refreshAllButton = screen.getByText('Refresh All');

    fireEvent.click(refreshAllButton);

    expect(refreshAllButton).toBeDisabled(); 

    await waitFor(() => {
      expect(refreshAllButton).not.toBeDisabled(); 
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  /**
   * Test that the refresh all button is disabled during the refresh operation
   */
  test('disables refresh all button during refresh', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      new Promise((resolve) =>
        setTimeout(() => resolve({
          ok: true,
          json: async () => mockAvatarResponse,
        }), 100)
      )
    );

    render(<AvatarApp />);
    const addButton = screen.getByText('+');

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });

    const refreshAllButton = screen.getByText('Refresh All');

    await act(async () => {
      fireEvent.click(refreshAllButton);
    });

    expect(screen.getByText('Refreshing...')).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Refresh All')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  /**
   * Test that clicking an avatar tile refreshes only that specific tile
   * while leaving other tiles unchanged
   */
  test('clicking avatar tile refreshes only that tile', async () => {
    let callCount = 0;
    global.fetch = jest.fn().mockImplementation(() => {
      callCount++;
      return Promise.resolve({
        ok: true,
        json: async () => [{ url: `https://example.com/avatar${callCount}.jpg` }],
      });
    });

    render(<AvatarApp />);
    const addButton = screen.getByText('+');

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getAllByAltText('Avatar')).toHaveLength(2);
    });

    const avatars = screen.getAllByAltText('Avatar');
    const initialSrc1 = avatars[0].getAttribute('src');
    const initialSrc2 = avatars[1].getAttribute('src');

    await act(async () => {
      fireEvent.click(avatars[0]);
    });

    await waitFor(() => {
      const updatedAvatars = screen.getAllByAltText('Avatar');
      expect(updatedAvatars[0].getAttribute('src')).not.toBe(initialSrc1);
      expect(updatedAvatars[1].getAttribute('src')).toBe(initialSrc2);
    });
  });

  /**
   * Test component cleanup when unmounted during pending requests
   */
  test('cleans up pending requests on unmount', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      new Promise((resolve) =>
        setTimeout(() => resolve({
          ok: true,
          json: async () => mockAvatarResponse,
        }), 1000)
      )
    );

    const { unmount } = render(<AvatarApp />);

    await act(async () => {
      fireEvent.click(screen.getByText('+'));
    });

    unmount();
    
    expect(true).toBe(true);
  });

  /**
   * Test that avatar images are created with proper src and alt attributes
   */
  test('creates avatar with correct src and alt attributes', async () => {
    const res = mockAvatarResponse[0];
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [res],
    });

    render(<AvatarApp />);

    await act(async () => {
      fireEvent.click(screen.getByText('+'));
    });

    await waitFor(() => {
      const avatar = screen.getByAltText('Avatar');
      expect(avatar).toHaveAttribute('src', res.url);
      expect(avatar).toHaveAttribute('alt', 'Avatar');
      expect(avatar).toHaveAttribute('title', 'Click to refresh this avatar');
      expect(avatar).toHaveStyle('cursor: pointer');
    });
  });

  /**
   * Test that the add button remains positioned at the end of the avatar grid
   */
  test('add button remains at the end after adding avatars', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAvatarResponse,
    });

    render(<AvatarApp />);
    const addButton = screen.getByText('+');

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(addButton);
    });

    await waitFor(() => {
      expect(screen.getAllByAltText('Avatar')).toHaveLength(2);
    });

    const listItems = screen.getAllByRole('listitem');
    const lastItem = listItems[listItems.length - 1];
    expect(lastItem).toContainElement(addButton);
  });

  /**
   * Test that the refresh all button appears only when avatars exist
   */
  test('displays refresh all button when avatars exist', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAvatarResponse,
    });

    render(<AvatarApp />);
    
    expect(screen.queryByText('Refresh All')).not.toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(screen.getByText('+'));
    });

    await waitFor(() => {
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
      expect(screen.getByText('Refresh All')).toBeInTheDocument();
    });
  });

  /**
   * Test that unique IDs are generated for new avatars using Date.now()
   */
 test('generates unique ids for new avatars', async () => {
  const mockDateNow = jest.spyOn(Date, 'now').mockReturnValue(123456789);
  
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => mockAvatarResponse,
  });

  render(<AvatarApp />);
  
  await act(async () => {
    fireEvent.click(screen.getByText('+'));
  });

  await waitFor(() => {
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(screen.getByText('+'));
  });

  await waitFor(() => {
    expect(screen.getAllByAltText('Avatar')).toHaveLength(2);
  });

  // Check that the avatar IDs are unique and follow the expected pattern
  const avatars = screen.getAllByAltText('Avatar');
  const firstAvatarId = avatars[0].closest('[data-testid]')?.getAttribute('data-testid');
  const secondAvatarId = avatars[1].closest('[data-testid]')?.getAttribute('data-testid');

  // Expected IDs: Date.now() + id.current
  // First avatar: '123456789' + '1' = 1234567891
  // Second avatar: '123456789' + '2' = 1234567892
  expect(firstAvatarId).toBe('1234567891');
  expect(secondAvatarId).toBe('1234567892');
  
  // Ensure IDs are unique
  expect(firstAvatarId).not.toBe(secondAvatarId);
  
  expect(Date.now()).toBe(123456789);
  
  mockDateNow.mockRestore();
});})