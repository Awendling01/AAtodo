export type AAState = {
  todos: { completed: TodoType[]; incomplete: TodoType[] };
};

export type User = {
  firstName: string;
  lastName?: string;
  username: string;
};

export type ReducerAction = {
  type:
    | "markTodoComplete"
    | "markTodoIncomplete"
    | "createTodo"
    | "deleteTodo"
    | "moveTodoUp"
    | "moveTodoDown";
  payload: TodoType;
};

export type TodoType = {
  id: number;
  sortOrder: number;
  name: string;
  dueDate: Date;
  completed: boolean;
  category: string;
};
