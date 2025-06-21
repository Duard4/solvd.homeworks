import { useContext } from 'react';
import { TodoContext } from '@/context/TodoContext';

/**
 * Custom hook for accessing todo context
 *
 * Provides access to the TodoContext values including todos state,
 * dispatch function, form state, and validation utilities.
 *
 * @hook
 * @returns {TodoContextType} Todo context object
 * @throws {Error} When used outside of TodoProvider
 *
 * @example
 * const { todos, dispatch, newTodo, setNewTodo, error, setError, validateTodo } = useTodos();
 */
export const useTodos = () => useContext(TodoContext);
