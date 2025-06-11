import { useState, useCallback } from 'react';
import { useTodos } from '../hooks/useTodos';

const TodoItem = ({ index, text, completed }) => {
  const { dispatch, validateTodo, setError } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(text);

  const toggleTodo = useCallback(() => {
    dispatch({ type: 'TOGGLE_TODO', payload: index });
  }, [dispatch, index]);

  const deleteTodo = useCallback(() => {
    dispatch({ type: 'DELETE_TODO', payload: index });
  }, [dispatch, index]);

  const handleSave = () => {
    const validationError = validateTodo(editingText, index);
    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch({ type: 'UPDATE_TODO', payload: { index, newText: editingText } });
    setIsEditing(false);
    setError('');
  };

  return (
    <li className="todoItem">
      <label className="custom-checkbox">
        <input type="checkbox" checked={completed} onChange={toggleTodo} />
        <span className="checkmark"></span>
      </label>

      {isEditing ? (
        <>
          <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
          <button onClick={handleSave} className="btn">
            Save
          </button>
        </>
      ) : (
        <>
          <span className={completed ? 'completed' : ''}>{text}</span>
          <button className="icon-btn" onClick={() => setIsEditing(true)} title="Edit">
            <img
              src="https://img.icons8.com/?size=100&id=vRz3xtiAd6de&format=png&color=000000"
              width="30"
              height="30"
              alt="Edit Icon"
            />
          </button>
          <button className="icon-btn" onClick={deleteTodo} title="Delete">
            <img
              src="https://img.icons8.com/?size=100&id=4887&format=png&color=000000"
              width="30"
              height="30"
              alt="Bin Icon"
            />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
