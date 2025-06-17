import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';

/**
 * Individual todo item component.
 * Displays a checkbox, text, and buttons for editing and deleting the item.
 *
 * @returns JSX.Element
 */
export const TodoItem: React.FC<{
  index: number;
  text: string;
  completed: boolean;
}> = ({ index, text, completed }) => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoContext not found');

  const { toggleTodo, deleteTodo, updateTodo } = context;

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(text);

  const handleSave = () => {
    const success = updateTodo(index, editingText);
    if (success) setIsEditing(false);
  };

  return (
    <li className="todoItem">
      <label className="custom-checkbox">
        <input type="checkbox" checked={completed} onChange={() => toggleTodo(index)} />
        <span className="checkmark"></span>
      </label>
      {isEditing ? (
        <>
          <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <span className={completed ? 'completed' : ''}>{text}</span>
          <button className="icon-btn" onClick={() => setIsEditing(true)}>
            ✏️
          </button>
          <button className="icon-btn" onClick={() => deleteTodo(index)}>
            🗑️
          </button>
        </>
      )}
    </li>
  );
};
