# 📝 Todo App with Next.js

This is a simple Todo application built with Next.js and React. It allows users to add, delete, and update todos. The todos are divided into two categories: incomplete and complete.

## 🚀 Features

- **Add Todo**: Users can add a new todo by typing in the input field and pressing enter. The new todo will appear at the top of the list of incomplete todos.

- **Delete Todo**: Users can delete a todo by clicking on the delete button associated with each todo.

- **Update Todo**: Users can mark a todo as complete by clicking on the checkbox associated with each todo. Once a todo is marked as complete, it moves to the completed todos section.

- **Completion Status**: The app shows a completion status message. If all todos are complete, it displays a "All done for today! 🎉" message. If there are any completed todos, it shows a divider separating the incomplete and complete todos.

## 📦 Installation

Before running the app, you need to install the necessary dependencies. Navigate to the directory containing the app in your terminal and run the following command:

```bash
npm install
```

## 🏃‍♀️ Running the App
To run the app, navigate to the directory containing the app in your terminal and run the following command:

```bash
npm run dev
```

This will start the app in development mode. Open http://localhost:3000 to view it in the browser.

## 📚 Dependencies
This app uses the following packages:

### Dependencies

- `next`: For the Next.js framework
- `react`: For building the user interface
- `react-dom`: For rendering the React components

### Dev Dependencies
- `@heroicons/react`: For using Heroicons in React
- `@types/lodash`: TypeScript definitions for Lodash
- `@types/node`: TypeScript definitions for Node.js
- `@types/react`: TypeScript definitions for React
- `@types/react-dom`: TypeScript definitions for ReactDOM
- `autoprefixer`: For adding vendor prefixes to CSS
- `daisyui`: For using DaisyUI with Tailwind CSS
- `eslint`: For linting JavaScript and TypeScript code
- `eslint-config-next`: ESLint configuration for Next.js
- `lodash`: For using Lodash utility functions
- `postcss`: For processing CSS
- `tailwindcss`: For using Tailwind CSS
- `typescript`: For using TypeScript