import todos from "../utils/data";
import { AAState, ReducerAction } from "../utils/types";
export const initialState: AAState = {
  todos: {
    completed: [],
    incomplete: [],
    // completed: todos.filter((todo) => todo.completed),
    // incomplete: todos.filter((todo) => !todo.completed),
  },
};

export const reducer = (state: AAState, action: ReducerAction) => {
  const todo = action.payload;
  const { completed, sortOrder, id } = todo;
  const {
    completed: completedTodos,
    incomplete: incompleteTodos,
  } = state.todos;
  const previousTodo = completed
    ? state.todos.completed.find((td) => td.sortOrder === sortOrder - 1)
    : state.todos.incomplete.find((td) => td.sortOrder === sortOrder - 1);
  const nextTodo = completed
    ? state.todos.completed.find((td) => td.sortOrder === sortOrder + 1)
    : state.todos.incomplete.find((td) => td.sortOrder === sortOrder + 1);
  const movedUpTodo = { ...todo, sortOrder: sortOrder - 1 };
  const movedDownTodo = { ...todo, sortOrder: sortOrder + 1 };

  switch (action.type) {
    case "createTodo":
      return {
        ...state,
        todos: {
          ...state.todos,
          incomplete: [...incompleteTodos, todo],
        },
      };
    case "markTodoComplete":
      return {
        ...state,
        todos: {
          completed: [...completedTodos, { ...todo, completed: true }],
          incomplete: incompleteTodos.filter(
            (incompleteTodo) => incompleteTodo.id !== id
          ),
        },
      };
    case "markTodoIncomplete":
      return {
        ...state,
        todos: {
          completed: completedTodos.filter(
            (completedTodo) => completedTodo.id !== id
          ),
          incomplete: [...incompleteTodos, { ...todo, completed: false }],
        },
      };
    case "moveTodoUp":
      if (previousTodo) {
        if (!completed) {
          const newMovedUpState = {
            ...state,
            todos: {
              ...state.todos,
              incomplete: [
                ...incompleteTodos.filter(
                  (incompleteTodo) =>
                    incompleteTodo.id !== id &&
                    incompleteTodo.sortOrder !== sortOrder - 1
                ),
                movedUpTodo,
                { ...previousTodo, sortOrder: previousTodo.sortOrder + 1 },
              ],
            },
          };
          return newMovedUpState;
        }
      } else {
        return { ...state };
      }
    case "moveTodoDown":
      if (nextTodo && !completed) {
        const newMovedUpState = {
          ...state,
          todos: {
            ...state.todos,
            incomplete: [
              ...incompleteTodos.filter(
                (incompleteTodo) =>
                  incompleteTodo.id !== id &&
                  incompleteTodo.sortOrder !== sortOrder + 1
              ),
              movedDownTodo,
              { ...nextTodo, sortOrder: nextTodo.sortOrder - 1 },
            ],
          },
        };
        return newMovedUpState;
      } else {
        return { ...state };
      }
    case "deleteTodo":
      if (completed) {
        return {
          ...state,
          todos: {
            ...state.todos,
            completed: [...state.todos.completed.filter((td) => td.id !== id)],
          },
        };
      } else {
        return {
          ...state,
          todos: {
            ...state.todos,
            incomplete: [
              ...state.todos.incomplete.filter((td) => td.id !== id),
            ],
          },
        };
      }
    default:
      throw new Error("action not found");
  }
};
