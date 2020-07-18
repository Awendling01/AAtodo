import express from "express";
import cors from "cors";
import { UserListResponse, TodoListResponse } from "./types";
import { users, todos } from "./data";

const app = express();
app.use(cors());
const port = 4000;

app.get("/users", (_req, res) => {
  const usersList: UserListResponse = {
    users,
  };
  res.send(usersList);
});

app.get("/todos", (_req, res) => {
  const todosList: TodoListResponse = {
    todos: {
      completed: todos.filter((todo) => todo.completed),
      incomplete: todos.filter((todo) => !todo.completed),
    },
  };
  res.send(todosList);
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
