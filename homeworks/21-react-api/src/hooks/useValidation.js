/**
 * Custom hook for todo validation logic
 *
 * Provides a validation function that checks todo text against
 * various rules including emptiness, length, character restrictions,
 * and duplicate detection.
 *
 * @hook
 * @param {Todo[]} todos - Array of existing todos for duplicate checking
 * @returns {Function} Validation function that takes (text, indexToExclude) and returns error string or empty string
 *
 * @example
 * const validateTodo = useValidation(todos);
 * const error = validateTodo("New todo text", 0); // excludes index 0 from duplicate check
 */
export const useValidation = (todos) => {
  /** @constant {number} Maximum allowed characters for todo text */
  const MAX_TODO_LENGTH = 50;

  /**
   * Validates todo text against all validation rules
   *
   * @param {string} text - Todo text to validate
   * @param {number|null} [indexToExclude=null] - Index to exclude from duplicate check (for editing)
   * @returns {string} Error message if validation fails, empty string if valid
   *
   * Validation rules:
   * - Text cannot be empty (after trimming)
   * - Text cannot exceed MAX_TODO_LENGTH characters
   * - Text can only contain letters, numbers, and spaces
   * - Text cannot be a duplicate of existing todos
   */
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
