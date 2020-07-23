export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
  todos: TodoType[];
};

export type UserListResponse = {
  users: User[];
};

export type TodoType = {
  id: number;
  sortOrder: number;
  name: string;
  dueDate: Date;
  completed: boolean;
  category: string;
  userId: number;
};

export type TodoListResponse = {
  todos: { completed: TodoType[]; incomplete: TodoType[] };
};
