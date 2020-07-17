// const sortDescByDueDate = (todos: TodoType[]) => {
//   return todos.sort((a, b) => Number(b.dueDate) - Number(a.dueDate));
// };

import { TodoType } from "./types";

export const sortAscBySortOrder = (todos: TodoType[]) => {
  return todos.sort((a, b) => a.sortOrder - b.sortOrder);
};
