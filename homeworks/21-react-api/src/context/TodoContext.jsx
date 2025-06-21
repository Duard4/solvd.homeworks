import { createContext, useReducer, useState, useEffect } from 'react';
import { useValidation } from '@/hooks/useValidation';

/**
 * Context for managing todo state across the application
 *
 * @typedef {Object} TodoContextType
 * @property {Array} todos - Array of todo items
 * @property {Function} dispatch - Reducer dispatch function
 * @property {string} newTodo - Current new todo input value
 * @property {Function} setNewTodo - Setter for new todo input
 * @property {string} error - Current error message
 * @property {Function} setError - Setter for error message
 * @property {Function} validateTodo - Todo validation function
 */
const TodoContext = createContext();

/**
 * Todo item structure
 *
 * @typedef {Object} Todo
 * @property {string} text - The todo text content
 * @property {boolean} completed - Whether the todo is completed
 */

/**
 * Reducer action types
 *
 * @typedef {Object} TodoAction
 * @property {'ADD_TODO'|'DELETE_TODO'|'TOGGLE_TODO'|'UPDATE_TODO'|'CLEAR_COMPLETED'} type
 * @property {any} payload - Action payload data
 */

/**
 * Reducer function for managing todo state
 *
 * Handles all todo operations including add, delete, toggle, update, and clear completed.
 *
 * @param {Todo[]} state - Current todos array
 * @param {TodoAction} action - Action object with type and payload
 * @returns {Todo[]} - New todos array
 */
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.payload, completed: false }];
    case 'DELETE_TODO':
      return state.filter((_, index) => index !== action.payload);
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'UPDATE_TODO':
      return state.map((todo, index) =>
        index === action.payload.index ? { ...todo, text: action.payload.newText } : todo
      );
    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
};

/**
 * TodoProvider component that provides todo context to children
 *
 * Manages the global todo state, handles localStorage persistence,
 * and provides validation functionality to child components.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 *
 * @example
 * return (
 *   <TodoProvider>
 *     <App />
 *   </TodoProvider>
 * )
 */
const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  const validateTodo = useValidation(todos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, dispatch, newTodo, setNewTodo, error, setError, validateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoProvider, TodoContext };
