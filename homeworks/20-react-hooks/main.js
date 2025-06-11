const { useState, useEffect, createContext, useContext } = React;

// Create Context
const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  const MAX_TODO_LENGTH = 50;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const validateTodo = (text, indexToExclude = null) => {
    if (text.trim() === '') return 'To-Do cannot be empty.';
    if (text.length > MAX_TODO_LENGTH) return `To-Do cannot exceed ${MAX_TODO_LENGTH} characters.`;
    if (!/^[\w\s]+$/.test(text)) return 'To-Do can only contain letters, numbers, and spaces.';
    if (
      todos.some(
        (todo, i) => todo.text.toLowerCase() === text.toLowerCase() && i !== indexToExclude
      )
    ) {
      return 'Duplicate To-Do item.';
    }
    return '';
  };

  const addTodo = () => {
    const validationError = validateTodo(newTodo);
    if (validationError) {
      setError(validationError);
      return;
    }

    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
    setError('');
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    setError('');
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const updateTodo = (index, newText) => {
    const validationError = validateTodo(newText, index);
    if (validationError) {
      setError(validationError);
      return false;
    }

    const updatedTodos = todos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo));
    setTodos(updatedTodos);
    setError('');
    return true;
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        newTodo,
        setNewTodo,
        error,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Main App Component
const ToDoApp = () => {
  return (
    <TodoProvider>
      <div className="container">
        <TodoInput />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

// Input Component
const TodoInput = () => {
  const { newTodo, setNewTodo, addTodo, error } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
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
    </React.Fragment>
  );
};

// List Component
const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <ul className="todoList">
      {todos.map(({ text, completed }, index) => (
        <TodoItem key={index} index={index} text={text} completed={completed} />
      ))}
    </ul>
  );
};

// Single Item Component
const TodoItem = ({ index, text, completed }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(text);

  const handleSave = () => {
    const success = updateTodo(index, editingText);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <li className="todoItem">
      <label className="custom-checkbox" name="isDone">
        <input
          name="isDone"
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(index)}
        />
        <span className="checkmark"></span>
      </label>

      {isEditing ? (
        <React.Fragment>
          <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
          <button onClick={handleSave} className="btn">
            Save
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span className={completed ? 'completed' : ''}>{text}</span>
          <button className="icon-btn" onClick={() => setIsEditing(true)} title="Edit">
            <img
              src="https://img.icons8.com/?size=100&id=vRz3xtiAd6de&format=png&color=000000"
              width="30"
              height="30"
              alt="Edit Icon"
            />
          </button>
          <button className="icon-btn" onClick={() => deleteTodo(index)} title="Delete">
            <img
              src="https://img.icons8.com/?size=100&id=4887&format=png&color=000000"
              width="30"
              height="30"
              alt="Bin Icon"
            />
          </button>
        </React.Fragment>
      )}
    </li>
  );
};

// Render App
ReactDOM.render(<ToDoApp />, document.getElementById('root'));
