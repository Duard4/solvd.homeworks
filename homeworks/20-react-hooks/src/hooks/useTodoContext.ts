import { useContext } from 'react';
import { TodoContext } from '@/context/TodoContext';

/**
 * Custom hook to use TodoContext with built-in error checking
 * @returns TodoContext value
 * @throws Error if used outside of TodoProvider
 */
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
