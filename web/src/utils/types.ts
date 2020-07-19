export type TodoList = {
  completed: TodoType[];
  incomplete: TodoType[];
};

export type AAState = {
  todos: TodoList;
};

export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
};

export type NewUser = Omit<User, "id">;

export type TodoAction = {
  type:
    | "markTodoComplete"
    | "markTodoIncomplete"
    | "createTodo"
    | "deleteTodo"
    | "moveTodoUp"
    | "moveTodoDown";
  payload: TodoType;
};

export type TodoListAction = {
  type: "initializeTodos";
  payload: TodoList;
};

export type ReducerAction = TodoAction | TodoListAction;

export type TodoType = {
  id: number;
  sortOrder: number;
  name: string;
  dueDate: Date;
  completed: boolean;
  category: string;
};
