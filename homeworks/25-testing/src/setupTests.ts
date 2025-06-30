import '@testing-library/jest-dom';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    success: jest.fn(),
  },
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock fetch globally
global.fetch = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
