# React To-Do App

A simple and efficient To-Do list application built with **React**, using **Vite** for fast development and **useReducer** for state management. The app supports adding, editing, deleting, toggling, and clearing completed tasks. It also includes input validation and local storage persistence.

## Features

- ✅ Add new to-do items with validation
- ✏️ Edit existing to-do items
- ✔️ Mark to-dos as completed or not completed
- 🗑️ Delete to-do items
- 🧹 Clear all completed tasks
- 💾 Save to-dos in local storage for persistence
- 🔍 Duplicate and special character prevention

## Technologies Used

- React
- Vite
- React Hooks (`useReducer`, `useState`, `useContext`, `useCallback`, `useMemo`, `useRef`)

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-todo-vite.git
   ```
   Navigate to the project folder:
   ```bash
   cd react-todo-vite
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Running the App
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173.

### Folder Structure

```bash
src/
│
├── components/    # React components (Input, List, Item)
├── context/       # Todo context and reducer
├── hooks/         # Custom hooks (validation, focus)
├── App.jsx        # Main app layout
└── main.jsx       # React entry point
```

### Notes

- To-do items are saved in localStorage so they persist after refreshing the page.
- Basic input validation ensures tasks are unique, under 50 characters, and only contain letters, numbers, and spaces.
