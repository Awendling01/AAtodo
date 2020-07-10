export type AAState = {
  todos: { completed: TodoType[]; incomplete: TodoType[] };
  categories: string[];
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
};
