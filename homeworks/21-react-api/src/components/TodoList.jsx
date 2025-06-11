import { useCallback, useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, dispatch } = useTodos();

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, [dispatch]);

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
