import React from 'react';
import { useTodoContext } from '@/hooks/useTodoContext';

/**
 * Input component for creating a new to-do item.
 * Displays validation errors and handles form submission.
 *
 * @returns JSX.Element
 */
export const TodoInput: React.FC = () => {
  const { newTodo, setNewTodo, addTodo, error } = useTodoContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Create Todo-Task"
        />
        <button type="submit" className="btn add-btn">
          Add
        </button>
      </form>
      {error && (
        <p style={{ color: 'red' }} className="error">
          {error}
        </p>
      )}
    </>
  );
};
