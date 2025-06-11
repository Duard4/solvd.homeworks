export const useValidation = (todos) => {
  const MAX_TODO_LENGTH = 50;

  return (text, indexToExclude = null) => {
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
};
