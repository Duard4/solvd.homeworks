import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';

/**
 * List of all to-do items.
 * Displays each item using the TodoItem component.
 *
 * @returns JSX.Element
 */
export const TodoList: React.FC = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoContext not found');

  const { todos } = context;

  return (
    <ul className="todoList">
      {todos.map(({ text, completed }, index) => (
        <TodoItem key={index} index={index} text={text} completed={completed} />
      ))}
    </ul>
  );
};
