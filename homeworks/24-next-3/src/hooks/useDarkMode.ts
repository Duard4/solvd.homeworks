/**
 * @fileoverview Custom hook for managing dark mode state
 * @returns Object containing dark mode state and toggle function
 */
import { useEffect, useState } from 'react';

/**
 * A custom hook to manage the dark mode state of the application.
 * It checks localStorage for a saved theme preference and respects the user's system preference.
 * It also handles updating the `dark` class on the `documentElement` and saving the preference to localStorage.
 *
 * @returns {object} An object containing isDark state and toggleDark function:
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initial = stored === 'dark' || (!stored && prefersDark);
    setIsDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return { isDark, toggleDark };
}
