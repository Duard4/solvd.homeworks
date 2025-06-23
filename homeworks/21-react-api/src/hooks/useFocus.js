import { useRef } from 'react';

/**
 * Custom hook for managing input focus
 *
 * Provides a ref and focus function for managing input field focus state.
 * Useful for automatically focusing inputs after certain actions.
 *
 * @hook
 * @returns {Array} Array containing [inputRef, focusInput] where:
 *   - inputRef: React ref to attach to input element
 *   - focusInput: Function to programmatically focus the input
 *
 * @example
 * const [inputRef, focusInput] = useFocus();
 *
 * // In JSX:
 * <input ref={inputRef} />
 *
 * // To focus:
 * focusInput();
 */
export const useFocus = () => {
  const inputRef = useRef(null);

  /**
   * Focuses the input element if it exists
   *
   * @function
   */
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return [inputRef, focusInput];
};
