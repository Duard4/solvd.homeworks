import { TodoProvider } from './context/TodoContext';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const ToDoApp = () => (
  <TodoProvider>
    <div className="container">
      <TodoInput />
      <TodoList />
    </div>
  </TodoProvider>
);

export default ToDoApp;
