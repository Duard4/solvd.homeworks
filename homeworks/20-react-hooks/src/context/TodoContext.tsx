import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types/todo';

interface TodoContextType {
  todos: Todo[];
  newTodo: string;
  error: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
  deleteTodo: (index: number) => void;
  toggleTodo: (index: number) => void;
  updateTodo: (index: number, newText: string) => boolean;
}

/**
 * React context for managing and accessing to-do list state.
 */
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * Provider component that supplies to-do state and actions to the component tree.
 *
 * @param children - React child elements.
 * @returns JSX.Element
 */
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  const MAX_TODO_LENGTH = 50;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * Validates a to-do text before adding or updating.
   *
   * @param text - To-do text to validate.
   * @param indexToExclude - Index to ignore for duplicate checking during update.
   * @returns Error message string or empty if valid.
   */
  const validateTodo = (text: string, indexToExclude: number | null = null): string => {
    if (text.trim() === '') return 'To-Do cannot be empty.';
    if (text.length > MAX_TODO_LENGTH) return `To-Do cannot exceed ${MAX_TODO_LENGTH} characters.`;
    if (!/^[\w\s]+$/.test(text)) return 'To-Do can only contain letters, numbers, and spaces.';
    if (
      todos.some(
        (todo, i) => todo.text.toLowerCase() === text.toLowerCase() && i !== indexToExclude
      )
    ) {
      return 'Duplicate To-Do item.';
    }
    return '';
  };

  /** Adds a new to-do item to the list */
  const addTodo = () => {
    const validationError = validateTodo(newTodo);
    if (validationError) {
      setError(validationError);
      return;
    }

    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
    setError('');
  };

  /**
   * Deletes a to-do item by index.
   * @param index - Index of the to-do to delete.
   */
  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
    setError('');
  };

  /**
   * Toggles the completion status of a to-do item.
   * @param index - Index of the to-do to toggle.
   */
  const toggleTodo = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  /**
   * Updates the text of a to-do item.
   * @param index - Index of the to-do to update.
   * @param newText - New text for the to-do.
   * @returns Whether the update was successful.
   */
  const updateTodo = (index: number, newText: string): boolean => {
    const validationError = validateTodo(newText, index);
    if (validationError) {
      setError(validationError);
      return false;
    }

    const updatedTodos = todos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo));
    setTodos(updatedTodos);
    setError('');
    return true;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        newTodo,
        setNewTodo,
        error,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
