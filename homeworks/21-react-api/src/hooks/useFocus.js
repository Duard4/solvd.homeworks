import { useRef } from 'react';

export const useFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return [inputRef, focusInput];
};
