import { createContext, useReducer, useState, useEffect } from 'react';
import { useValidation } from '../hooks/useValidation';

const TodoContext = createContext();

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
