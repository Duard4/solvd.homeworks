/**
 * Validation utilities for todo items
 */

export const MAX_TODO_LENGTH = 50;

/**
 * Validates a to-do text before adding or updating.
 *
 * @param text - To-do text to validate.
 * @param existingTodos - Array of existing todos to check for duplicates.
 * @param indexToExclude - Index to ignore for duplicate checking during update.
 * @returns Error message string or empty if valid.
 */
export const validateTodo = (
  text: string,
  existingTodos: Array<{ text: string }>,
  indexToExclude: number | null = null
): string => {
  if (text.trim() === '') return 'To-Do cannot be empty.';
  if (text.length > MAX_TODO_LENGTH) return `To-Do cannot exceed ${MAX_TODO_LENGTH} characters.`;
  if (!/^[\w\s]+$/.test(text)) return 'To-Do can only contain letters, numbers, and spaces.';
  if (
    existingTodos.some(
      (todo, i) => todo.text.toLowerCase() === text.toLowerCase() && i !== indexToExclude
    )
  ) {
    return 'Duplicate To-Do item.';
  }
  return '';
};
