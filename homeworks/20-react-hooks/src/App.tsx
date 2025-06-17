import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';

/**
 * Main app component.
 */
const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="container">
        <TodoInput />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
