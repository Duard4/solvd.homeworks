import { useCallback } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useFocus } from '@/hooks/useFocus';

/**
 * TodoInput component for adding new todo items
 *
 * Provides a form interface for creating new todos with validation and error handling.
 * Automatically focuses the input field after successful todo creation.
 *
 * @component
 * @example
 * return (
 *   <TodoInput />
 * )
 */
const TodoInput = () => {
  const { dispatch, newTodo, setNewTodo, error, setError, validateTodo } = useTodos();
  const [inputRef, focusInput] = useFocus();

  /**
   * Adds a new todo item after validation
   *
   * Validates the todo text, dispatches ADD_TODO action if valid,
   * clears the input field, and focuses the input for next entry.
   *
   * @function
   */
  const addTodo = useCallback(() => {
    const validationError = validateTodo(newTodo);
    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch({ type: 'ADD_TODO', payload: newTodo });
    setNewTodo('');
    setError('');
    focusInput();
  }, [newTodo, validateTodo, dispatch, focusInput, setError]);

  /**
   * Handles form submission
   *
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
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
        <p className="error" style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </>
  );
};

export default TodoInput;
