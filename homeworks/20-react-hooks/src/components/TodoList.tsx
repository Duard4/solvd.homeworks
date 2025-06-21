import React from 'react';
import { useTodoContext } from '@/hooks/useTodoContext';
import { TodoItem } from '@/components/TodoItem';

/**
 * List of all to-do items.
 * Displays each item using the TodoItem component.
 *
 * @returns JSX.Element
 */
export const TodoList: React.FC = () => {
  const { todos } = useTodoContext();

  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
      ))}
    </ul>
  );
};
