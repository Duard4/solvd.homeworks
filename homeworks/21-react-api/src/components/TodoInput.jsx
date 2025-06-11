import { useCallback } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useFocus } from '../hooks/useFocus';

const TodoInput = () => {
  const { dispatch, newTodo, setNewTodo, error, setError, validateTodo } = useTodos();
  const [inputRef, focusInput] = useFocus();

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
