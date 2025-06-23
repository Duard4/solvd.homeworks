import { useCallback, useMemo } from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoItem from '@/components/TodoItem';

/**
 * TodoList component that displays all todo items
 *
 * Renders a list of TodoItem components and provides functionality
 * to clear all completed todos. Shows clear button only when there
 * are completed todos.
 *
 * @component
 * @example
 * return (
 *   <TodoList />
 * )
 */
const TodoList = () => {
  const { todos, dispatch } = useTodos();

  /**
   * Clears all completed todo items
   *
   * @function
   */
  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, [dispatch]);

  /**
   * Memoized count of completed todos
   *
   * @type {number}
   */
  const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  return (
    <div style={{ display: 'grid' }}>
      <ul className="todoList">
        {todos.map(({ text, completed }, index) => (
          <TodoItem key={index} index={index} text={text} completed={completed} />
        ))}
      </ul>
      {completedCount > 0 && (
        <button onClick={clearCompleted} className="btn clear-btn">
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default TodoList;
