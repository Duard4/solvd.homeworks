import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '@/types/todo';
import { validateTodo } from '@/helpers/validation';

interface TodoContextType {
  todos: Todo[];
  newTodo: string;
  error: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => boolean;
}

/**
 * React context for managing and accessing to-do list state.
 */
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * Generates a unique ID for todo items
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /** Adds a new to-do item to the list */
  const addTodo = () => {
    const validationError = validateTodo(newTodo, todos);
    if (validationError) {
      setError(validationError);
      return;
    }

    setTodos([...todos, { id: generateId(), text: newTodo, completed: false }]);
    setNewTodo('');
    setError('');
  };

  /**
   * Deletes a to-do item by id.
   * @param id - ID of the to-do to delete.
   */
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setError('');
  };

  /**
   * Toggles the completion status of a to-do item.
   * @param id - ID of the to-do to toggle.
   */
  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  /**
   * Updates the text of a to-do item.
   * @param id - ID of the to-do to update.
   * @param newText - New text for the to-do.
   * @returns Whether the update was successful.
   */
  const updateTodo = (id: string, newText: string): boolean => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const validationError = validateTodo(newText, todos, todoIndex);
    if (validationError) {
      setError(validationError);
      return false;
    }

    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo));
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
