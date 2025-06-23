import React, { useState } from 'react';
import { useTodoContext } from '@/hooks/useTodoContext';

/**
 * Individual todo item component.
 * Displays a checkbox, text, and buttons for editing and deleting the item.
 *
 * @returns JSX.Element
 */
export const TodoItem: React.FC<{
  id: string;
  text: string;
  completed: boolean;
}> = ({ id, text, completed }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(text);

  const handleSave = () => {
    const success = updateTodo(id, editingText);
    if (success) setIsEditing(false);
  };

  return (
    <li className="todoItem">
      <label className="custom-checkbox">
        <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)} />
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
          <button className="icon-btn" onClick={() => deleteTodo(id)}>
            🗑️
          </button>
        </>
      )}
    </li>
  );
};
