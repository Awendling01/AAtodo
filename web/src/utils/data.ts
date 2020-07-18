import { User, TodoList } from "./types";

const api = async <T>(url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await (response.json() as Promise<T>);
  return data;
};

type UserResponse = {
  users: User[];
};

export const getUsers = async () => {
  const res = await api<UserResponse>("http://localhost:4000/users");
  return res.users;
};

type TodosResponse = { todos: TodoList };

export const getAllTodos = async () => {
  const res = await api<TodosResponse>("http://localhost:4000/todos");
  return res.todos;
};
